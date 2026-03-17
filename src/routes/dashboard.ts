// Dashboard Routes - FashionKas
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
    
    const orders = await db.query('orders', { eq: [['store_id', storeId]], order: ['created_at', true] })
    const products = await db.query('products', { eq: [['store_id', storeId]] })
    const customers = await db.query('customers', { eq: [['store_id', storeId]] })
    
    // Get all order items for counting
    let allOrderItems: any[] = []
    for (const order of orders) {
      const items = await db.query('order_items', { eq: [['order_id', order.id]] })
      order.items = items
      allOrderItems = allOrderItems.concat(items)
    }
    
    const now = new Date()
    const todayStr = now.toISOString().slice(0, 10)
    const weekAgo = new Date(now.getTime() - 7 * 86400000).toISOString()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    
    const todayOrders = orders.filter((o: any) => o.created_at?.startsWith(todayStr))
    const weekOrders = orders.filter((o: any) => o.created_at >= weekAgo)
    const monthOrders = orders.filter((o: any) => o.created_at >= monthStart)
    
    const sum = (arr: any[], field: string) => arr.reduce((s: number, o: any) => s + (o[field] || 0), 0)
    
    // Calculate actual items sold per period
    const getItemsSold = (orderList: any[]) => {
      const orderIds = new Set(orderList.map((o: any) => o.id))
      return allOrderItems
        .filter((i: any) => orderIds.has(i.order_id))
        .reduce((s: number, i: any) => s + (i.quantity || 1), 0)
    }
    
    // Top products by total_sold
    const topProducts = [...products]
      .sort((a: any, b: any) => (b.total_sold || 0) - (a.total_sold || 0))
      .slice(0, 5)
      .map((p: any) => ({
        id: p.id, name: p.name, category: p.category,
        sold: p.total_sold || 0,
        revenue: (p.total_sold || 0) * p.price,
        image_url: p.image_url
      }))
    
    // Low stock alerts
    const lowStock = products
      .filter((p: any) => p.is_active && p.stock <= 5 && p.stock > 0)
      .map((p: any) => ({ name: p.name, stock: p.stock, id: p.id, category: p.category }))
    
    // Out of stock
    const outOfStock = products
      .filter((p: any) => p.is_active && p.stock === 0)
      .map((p: any) => ({ name: p.name, stock: 0, id: p.id, category: p.category }))
    
    // Categories breakdown
    const categories: Record<string, number> = {}
    products.forEach((p: any) => { categories[p.category] = (categories[p.category] || 0) + 1 })
    
    // Daily revenue for last 7 days (for chart)
    const dailyRevenue: { date: string, revenue: number, orders: number, profit: number }[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 86400000)
      const dStr = d.toISOString().slice(0, 10)
      const dayOrders = orders.filter((o: any) => o.created_at?.startsWith(dStr))
      dailyRevenue.push({
        date: dStr,
        revenue: sum(dayOrders, 'total_amount'),
        orders: dayOrders.length,
        profit: sum(dayOrders, 'total_profit')
      })
    }
    
    // Recent orders (last 10 with items)
    const recentOrders = orders.slice(0, 10).map((o: any) => ({
      id: o.id, order_number: o.order_number,
      customer_name: o.customer_name, customer_phone: o.customer_phone,
      total_amount: o.total_amount, total_profit: o.total_profit,
      payment_method: o.payment_method, payment_status: o.payment_status,
      shipping_status: o.shipping_status, created_at: o.created_at,
      items: (o.items || []).map((i: any) => ({
        product_name: i.product_name, quantity: i.quantity,
        unit_price: i.unit_price
      }))
    }))
    
    // Average order value
    const avgOrderValue = orders.length > 0 ? Math.round(sum(orders, 'total_amount') / orders.length) : 0
    
    return c.json({
      success: true,
      data: {
        today: {
          revenue: sum(todayOrders, 'total_amount'),
          profit: sum(todayOrders, 'total_profit'),
          orders: todayOrders.length,
          itemsSold: getItemsSold(todayOrders)
        },
        thisWeek: {
          revenue: sum(weekOrders, 'total_amount'),
          profit: sum(weekOrders, 'total_profit'),
          orders: weekOrders.length,
          itemsSold: getItemsSold(weekOrders)
        },
        thisMonth: {
          revenue: sum(monthOrders, 'total_amount'),
          profit: sum(monthOrders, 'total_profit'),
          orders: monthOrders.length,
          itemsSold: getItemsSold(monthOrders)
        },
        allTime: {
          revenue: sum(orders, 'total_amount'),
          profit: sum(orders, 'total_profit'),
          orders: orders.length,
          avgOrderValue
        },
        totalProducts: products.length,
        activeProducts: products.filter((p: any) => p.is_active).length,
        totalCustomers: customers.length,
        topProducts,
        lowStockAlerts: lowStock,
        outOfStock,
        categories,
        dailyRevenue,
        recentOrders
      }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})
