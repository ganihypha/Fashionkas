// Report Routes - PDF & Analytics
// FashionKas v1.2 - Monthly/Daily reports, exportable
import { Hono } from 'hono'
import { createSupabaseClient, verifyJWT } from '../lib/supabase'

type Bindings = { SUPABASE_URL: string; SUPABASE_SERVICE_KEY: string; JWT_SECRET: string }

export const reportRoutes = new Hono<{ Bindings: Bindings }>()

async function getStoreData(c: any): Promise<{ store_id: string; store: any }> {
  const auth = c.req.header('Authorization')
  if (!auth) throw new Error('No token')
  const payload = await verifyJWT(auth.replace('Bearer ', ''), c.env.JWT_SECRET)
  const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
  const stores = await db.query('stores', { eq: [['id', payload.store_id]], limit: 1 })
  if (!stores || stores.length === 0) throw new Error('Store not found')
  return { store_id: payload.store_id, store: stores[0] }
}

// Monthly report data
reportRoutes.get('/monthly', async (c) => {
  try {
    const { store_id, store } = await getStoreData(c)
    const month = c.req.query('month') // YYYY-MM format
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    
    const now = new Date()
    const targetMonth = month || `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    const [year, mon] = targetMonth.split('-').map(Number)
    const monthStart = new Date(year, mon - 1, 1).toISOString()
    const monthEnd = new Date(year, mon, 0, 23, 59, 59).toISOString()
    
    const orders = await db.query('orders', { eq: [['store_id', store_id]], order: ['created_at', true] })
    const monthOrders = orders.filter((o: any) => o.created_at >= monthStart && o.created_at <= monthEnd)
    const products = await db.query('products', { eq: [['store_id', store_id]] })
    const customers = await db.query('customers', { eq: [['store_id', store_id]] })
    
    // Get items for month orders
    let allItems: any[] = []
    for (const order of monthOrders) {
      const items = await db.query('order_items', { eq: [['order_id', order.id]] })
      order.items = items
      allItems = allItems.concat(items)
    }
    
    const sum = (arr: any[], f: string) => arr.reduce((s: number, o: any) => s + (o[f] || 0), 0)
    
    // Daily breakdown
    const daysInMonth = new Date(year, mon, 0).getDate()
    const dailyData: any[] = []
    for (let d = 1; d <= daysInMonth; d++) {
      const dayStr = `${targetMonth}-${String(d).padStart(2, '0')}`
      const dayOrders = monthOrders.filter((o: any) => o.created_at?.startsWith(dayStr))
      dailyData.push({
        date: dayStr,
        day: d,
        revenue: sum(dayOrders, 'total_amount'),
        profit: sum(dayOrders, 'total_profit'),
        orders: dayOrders.length,
        items: dayOrders.reduce((s: number, o: any) => s + (o.items || []).reduce((ss: number, i: any) => ss + i.quantity, 0), 0)
      })
    }
    
    // Top products this month
    const productSales: Record<string, { name: string; qty: number; revenue: number }> = {}
    allItems.forEach((i: any) => {
      const key = i.product_name || i.product_id
      if (!productSales[key]) productSales[key] = { name: i.product_name, qty: 0, revenue: 0 }
      productSales[key].qty += i.quantity
      productSales[key].revenue += i.subtotal
    })
    const topProducts = Object.values(productSales).sort((a, b) => b.revenue - a.revenue).slice(0, 10)
    
    // Payment method breakdown
    const paymentBreakdown: Record<string, { count: number; total: number }> = {}
    monthOrders.forEach((o: any) => {
      const m = o.payment_method || 'other'
      if (!paymentBreakdown[m]) paymentBreakdown[m] = { count: 0, total: 0 }
      paymentBreakdown[m].count++
      paymentBreakdown[m].total += o.total_amount || 0
    })
    
    // Category breakdown
    const categoryBreakdown: Record<string, { qty: number; revenue: number }> = {}
    allItems.forEach((i: any) => {
      const product = products.find((p: any) => p.id === i.product_id)
      const cat = product?.category || 'lainnya'
      if (!categoryBreakdown[cat]) categoryBreakdown[cat] = { qty: 0, revenue: 0 }
      categoryBreakdown[cat].qty += i.quantity
      categoryBreakdown[cat].revenue += i.subtotal
    })
    
    // New customers this month
    const newCustomers = customers.filter((c: any) => {
      const created = c.created_at || c.last_order_at
      return created && created >= monthStart && created <= monthEnd
    })
    
    const avgOrderValue = monthOrders.length > 0 ? Math.round(sum(monthOrders, 'total_amount') / monthOrders.length) : 0
    
    return c.json({
      success: true,
      data: {
        store: { name: store.name, slug: store.slug, city: store.city, owner_name: store.owner_name },
        period: { month: targetMonth, year, mon, monthName: new Date(year, mon - 1).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }) },
        summary: {
          totalRevenue: sum(monthOrders, 'total_amount'),
          totalProfit: sum(monthOrders, 'total_profit'),
          totalOrders: monthOrders.length,
          totalItemsSold: allItems.reduce((s: number, i: any) => s + i.quantity, 0),
          avgOrderValue,
          totalProducts: products.length,
          totalCustomers: customers.length,
          newCustomers: newCustomers.length
        },
        dailyData,
        topProducts,
        paymentBreakdown,
        categoryBreakdown
      }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})
