// Dashboard Routes
import { Hono } from 'hono'
import { createSupabaseClient, verifyJWT } from '../lib/supabase'

type Bindings = { SUPABASE_URL: string; SUPABASE_SERVICE_KEY: string; JWT_SECRET: string }

export const dashboardRoutes = new Hono<{ Bindings: Bindings }>()

async function getStoreId(c: any): Promise<string> {
  const auth = c.req.header('Authorization')
  if (!auth) throw new Error('No token')
  const payload = await verifyJWT(auth.replace('Bearer ', ''), c.env.JWT_SECRET)
  return payload.store_id
}

// Dashboard stats
dashboardRoutes.get('/stats', async (c) => {
  try {
    const storeId = await getStoreId(c)
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    
    // Get all orders for this store
    const orders = await db.query('orders', { eq: [['store_id', storeId]], order: ['created_at', true] })
    const products = await db.query('products', { eq: [['store_id', storeId]] })
    const customers = await db.query('customers', { eq: [['store_id', storeId]] })
    
    const now = new Date()
    const todayStr = now.toISOString().slice(0, 10)
    const weekAgo = new Date(now.getTime() - 7 * 86400000).toISOString()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    
    const todayOrders = orders.filter((o: any) => o.created_at?.startsWith(todayStr))
    const weekOrders = orders.filter((o: any) => o.created_at >= weekAgo)
    const monthOrders = orders.filter((o: any) => o.created_at >= monthStart)
    
    const sum = (arr: any[], field: string) => arr.reduce((s: number, o: any) => s + (o[field] || 0), 0)
    
    // Top products by total_sold
    const topProducts = [...products]
      .sort((a: any, b: any) => (b.total_sold || 0) - (a.total_sold || 0))
      .slice(0, 5)
      .map((p: any) => ({ name: p.name, sold: p.total_sold || 0, revenue: (p.total_sold || 0) * p.price }))
    
    // Low stock alerts
    const lowStock = products
      .filter((p: any) => p.is_active && p.stock <= 5 && p.stock > 0)
      .map((p: any) => ({ name: p.name, stock: p.stock, id: p.id }))
    
    // Categories breakdown
    const categories: Record<string, number> = {}
    products.forEach((p: any) => { categories[p.category] = (categories[p.category] || 0) + 1 })
    
    return c.json({
      success: true,
      data: {
        today: {
          revenue: sum(todayOrders, 'total_amount'),
          profit: sum(todayOrders, 'total_profit'),
          orders: todayOrders.length,
          itemsSold: todayOrders.length // simplified
        },
        thisWeek: {
          revenue: sum(weekOrders, 'total_amount'),
          orders: weekOrders.length
        },
        thisMonth: {
          revenue: sum(monthOrders, 'total_amount'),
          profit: sum(monthOrders, 'total_profit'),
          orders: monthOrders.length,
          itemsSold: monthOrders.length
        },
        totalProducts: products.length,
        totalCustomers: customers.length,
        topProducts,
        lowStockAlerts: lowStock,
        categories,
        recentOrders: orders.slice(0, 5)
      }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})
