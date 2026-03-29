// Report Routes - CSV Export & Analytics
// FashionKas v3.2 - Monthly/Daily reports, CSV/JSON export, customer/product reports
import { Hono } from 'hono'
import { createSupabaseClient, verifyJWT } from '../lib/supabase'

type Bindings = { SUPABASE_URL: string; SUPABASE_SERVICE_KEY: string; JWT_SECRET: string }

export const reportRoutes = new Hono<{ Bindings: Bindings }>()

async function getStoreData(c: any): Promise<{ store_id: string; store: any; db: any }> {
  const auth = c.req.header('Authorization')
  if (!auth) throw new Error('No token')
  const payload = await verifyJWT(auth.replace('Bearer ', ''), c.env.JWT_SECRET)
  const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
  const stores = await db.query('stores', { eq: [['id', payload.store_id]], limit: 1 })
  if (!stores || stores.length === 0) throw new Error('Store not found')
  return { store_id: payload.store_id, store: stores[0], db }
}

function escapeCSV(val: any): string {
  const str = String(val ?? '')
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return '"' + str.replace(/"/g, '""') + '"'
  }
  return str
}

function toCSV(headers: string[], rows: any[][]): string {
  const headerLine = headers.map(h => escapeCSV(h)).join(',')
  const dataLines = rows.map(row => row.map(v => escapeCSV(v)).join(','))
  return [headerLine, ...dataLines].join('\n')
}

// Monthly report data (JSON)
reportRoutes.get('/monthly', async (c) => {
  try {
    const { store_id, store, db } = await getStoreData(c)
    const month = c.req.query('month')
    
    const now = new Date()
    const targetMonth = month || `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    const [year, mon] = targetMonth.split('-').map(Number)
    const monthStart = new Date(year, mon - 1, 1).toISOString()
    const monthEnd = new Date(year, mon, 0, 23, 59, 59).toISOString()
    
    const orders = await db.query('orders', { eq: [['store_id', store_id]], order: ['created_at', true] })
    const monthOrders = orders.filter((o: any) => o.created_at >= monthStart && o.created_at <= monthEnd)
    const products = await db.query('products', { eq: [['store_id', store_id]] })
    const customers = await db.query('customers', { eq: [['store_id', store_id]] })
    
    let allItems: any[] = []
    for (const order of monthOrders) {
      const items = await db.query('order_items', { eq: [['order_id', order.id]] })
      order.items = items
      allItems = allItems.concat(items)
    }
    
    const sum = (arr: any[], f: string) => arr.reduce((s: number, o: any) => s + (o[f] || 0), 0)
    
    const daysInMonth = new Date(year, mon, 0).getDate()
    const dailyData: any[] = []
    for (let d = 1; d <= daysInMonth; d++) {
      const dayStr = `${targetMonth}-${String(d).padStart(2, '0')}`
      const dayOrders = monthOrders.filter((o: any) => o.created_at?.startsWith(dayStr))
      dailyData.push({
        date: dayStr, day: d,
        revenue: sum(dayOrders, 'total_amount'),
        profit: sum(dayOrders, 'total_profit'),
        orders: dayOrders.length,
        items: dayOrders.reduce((s: number, o: any) => s + (o.items || []).reduce((ss: number, i: any) => ss + i.quantity, 0), 0)
      })
    }
    
    const productSales: Record<string, { name: string; qty: number; revenue: number }> = {}
    allItems.forEach((i: any) => {
      const key = i.product_name || i.product_id
      if (!productSales[key]) productSales[key] = { name: i.product_name, qty: 0, revenue: 0 }
      productSales[key].qty += i.quantity
      productSales[key].revenue += i.subtotal
    })
    const topProducts = Object.values(productSales).sort((a, b) => b.revenue - a.revenue).slice(0, 10)
    
    const paymentBreakdown: Record<string, { count: number; total: number }> = {}
    monthOrders.forEach((o: any) => {
      const m = o.payment_method || 'other'
      if (!paymentBreakdown[m]) paymentBreakdown[m] = { count: 0, total: 0 }
      paymentBreakdown[m].count++
      paymentBreakdown[m].total += o.total_amount || 0
    })
    
    const categoryBreakdown: Record<string, { qty: number; revenue: number }> = {}
    allItems.forEach((i: any) => {
      const product = products.find((p: any) => p.id === i.product_id)
      const cat = product?.category || 'lainnya'
      if (!categoryBreakdown[cat]) categoryBreakdown[cat] = { qty: 0, revenue: 0 }
      categoryBreakdown[cat].qty += i.quantity
      categoryBreakdown[cat].revenue += i.subtotal
    })
    
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
        dailyData, topProducts, paymentBreakdown, categoryBreakdown
      }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// === CSV EXPORT ENDPOINTS ===

// Export orders as CSV
reportRoutes.get('/export/orders', async (c) => {
  try {
    const { store_id, store, db } = await getStoreData(c)
    const month = c.req.query('month')
    
    let orders = await db.query('orders', { eq: [['store_id', store_id]], order: ['created_at', true] })
    
    if (month) {
      const [year, mon] = month.split('-').map(Number)
      const monthStart = new Date(year, mon - 1, 1).toISOString()
      const monthEnd = new Date(year, mon, 0, 23, 59, 59).toISOString()
      orders = orders.filter((o: any) => o.created_at >= monthStart && o.created_at <= monthEnd)
    }
    
    // Enrich orders with items
    for (const order of orders) {
      const items = await db.query('order_items', { eq: [['order_id', order.id]] })
      order.items_detail = items.map((i: any) => `${i.product_name}(${i.quantity}x)`).join('; ')
      order.items_count = items.reduce((s: number, i: any) => s + i.quantity, 0)
    }
    
    const headers = ['No', 'Tanggal', 'ID Order', 'Pelanggan', 'Telepon', 'Item', 'Jumlah Item', 'Total', 'Profit', 'Metode Bayar', 'Status', 'Catatan']
    const rows = orders.map((o: any, i: number) => [
      i + 1,
      new Date(o.created_at).toLocaleDateString('id-ID'),
      o.id?.substring(0, 8),
      o.customer_name || '-',
      o.customer_phone || '-',
      o.items_detail || '-',
      o.items_count || 0,
      o.total_amount || 0,
      o.total_profit || 0,
      o.payment_method || '-',
      o.status || 'pending',
      o.notes || '-'
    ])
    
    const csv = toCSV(headers, rows)
    const filename = `FashionKas_Pesanan_${store.name}_${month || 'semua'}.csv`
    
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache'
      }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Export products as CSV
reportRoutes.get('/export/products', async (c) => {
  try {
    const { store_id, store, db } = await getStoreData(c)
    const products = await db.query('products', { eq: [['store_id', store_id]] })
    
    const headers = ['No', 'Nama Produk', 'Kategori', 'Harga Jual', 'Harga Modal', 'Profit/pcs', 'Stok', 'Terjual', 'Status', 'Dibuat']
    const rows = products.map((p: any, i: number) => [
      i + 1,
      p.name,
      p.category || '-',
      p.price || 0,
      p.cost_price || 0,
      (p.price || 0) - (p.cost_price || 0),
      p.stock ?? 0,
      p.total_sold || 0,
      p.is_active ? 'Aktif' : 'Nonaktif',
      p.created_at ? new Date(p.created_at).toLocaleDateString('id-ID') : '-'
    ])
    
    const csv = toCSV(headers, rows)
    const filename = `FashionKas_Produk_${store.name}.csv`
    
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache'
      }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Export customers as CSV
reportRoutes.get('/export/customers', async (c) => {
  try {
    const { store_id, store, db } = await getStoreData(c)
    const customers = await db.query('customers', { eq: [['store_id', store_id]] })
    const orders = await db.query('orders', { eq: [['store_id', store_id]] })
    
    const headers = ['No', 'Nama', 'Telepon', 'Alamat', 'Total Order', 'Total Belanja', 'Order Terakhir', 'Segment', 'Catatan']
    const rows = customers.map((cust: any, i: number) => {
      const custOrders = orders.filter((o: any) => o.customer_phone === cust.phone)
      const totalSpent = custOrders.reduce((s: number, o: any) => s + (o.total_amount || 0), 0)
      const lastOrder = custOrders[0]?.created_at ? new Date(custOrders[0].created_at).toLocaleDateString('id-ID') : '-'
      const segment = totalSpent >= 1000000 ? 'VIP' : custOrders.length >= 3 ? 'Loyal' : custOrders.length >= 1 ? 'Aktif' : 'Baru'
      return [
        i + 1, cust.name || '-', cust.phone || '-', cust.address || '-',
        custOrders.length, totalSpent, lastOrder, segment, cust.notes || '-'
      ]
    })
    
    const csv = toCSV(headers, rows)
    const filename = `FashionKas_Pelanggan_${store.name}.csv`
    
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache'
      }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Export daily recap as CSV
reportRoutes.get('/export/daily', async (c) => {
  try {
    const { store_id, store, db } = await getStoreData(c)
    const month = c.req.query('month')
    
    const now = new Date()
    const targetMonth = month || `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    const [year, mon] = targetMonth.split('-').map(Number)
    const monthStart = new Date(year, mon - 1, 1).toISOString()
    const monthEnd = new Date(year, mon, 0, 23, 59, 59).toISOString()
    
    const orders = await db.query('orders', { eq: [['store_id', store_id]], order: ['created_at', true] })
    const monthOrders = orders.filter((o: any) => o.created_at >= monthStart && o.created_at <= monthEnd)
    
    for (const order of monthOrders) {
      const items = await db.query('order_items', { eq: [['order_id', order.id]] })
      order.items = items
    }
    
    const daysInMonth = new Date(year, mon, 0).getDate()
    const headers = ['Tanggal', 'Hari', 'Jumlah Order', 'Item Terjual', 'Revenue', 'Profit']
    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
    
    const rows: any[][] = []
    let totalRev = 0, totalProfit = 0, totalOrders = 0, totalItems = 0
    
    for (let d = 1; d <= daysInMonth; d++) {
      const dayStr = `${targetMonth}-${String(d).padStart(2, '0')}`
      const dayOrders = monthOrders.filter((o: any) => o.created_at?.startsWith(dayStr))
      const rev = dayOrders.reduce((s: number, o: any) => s + (o.total_amount || 0), 0)
      const profit = dayOrders.reduce((s: number, o: any) => s + (o.total_profit || 0), 0)
      const items = dayOrders.reduce((s: number, o: any) => s + (o.items || []).reduce((ss: number, i: any) => ss + i.quantity, 0), 0)
      const dayName = dayNames[new Date(year, mon - 1, d).getDay()]
      
      rows.push([dayStr, dayName, dayOrders.length, items, rev, profit])
      totalRev += rev; totalProfit += profit; totalOrders += dayOrders.length; totalItems += items
    }
    
    rows.push(['TOTAL', '-', totalOrders, totalItems, totalRev, totalProfit])
    
    const csv = toCSV(headers, rows)
    const filename = `FashionKas_Rekap_Harian_${store.name}_${targetMonth}.csv`
    
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache'
      }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})
