// Order Routes
import { Hono } from 'hono'
import { createSupabaseClient, verifyJWT } from '../lib/supabase'

type Bindings = { SUPABASE_URL: string; SUPABASE_SERVICE_KEY: string; JWT_SECRET: string; FONNTE_TOKEN: string }

export const orderRoutes = new Hono<{ Bindings: Bindings }>()

async function getStoreId(c: any): Promise<string> {
  const auth = c.req.header('Authorization')
  if (!auth) throw new Error('No token')
  const payload = await verifyJWT(auth.replace('Bearer ', ''), c.env.JWT_SECRET)
  return payload.store_id
}

function generateOrderNumber(): string {
  const d = new Date()
  const date = d.toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `FK-${date}-${rand}`
}

// List orders
orderRoutes.get('/', async (c) => {
  try {
    const storeId = await getStoreId(c)
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    const orders = await db.query('orders', {
      eq: [['store_id', storeId]],
      order: ['created_at', true],
      limit: 100
    })
    
    // Get order items for each order
    for (const order of orders) {
      const items = await db.query('order_items', { eq: [['order_id', order.id]] })
      order.items = items
    }
    
    return c.json({ success: true, data: orders })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Create order (with stock deduction)
orderRoutes.post('/', async (c) => {
  try {
    const storeId = await getStoreId(c)
    const body = await c.req.json()
    const { customer_name, customer_phone, items, payment_method, discount, shipping_cost, notes, send_wa } = body
    
    if (!items || items.length === 0) {
      return c.json({ success: false, message: 'Minimal 1 item dalam pesanan' }, 400)
    }
    if (!payment_method) {
      return c.json({ success: false, message: 'Metode bayar wajib dipilih' }, 400)
    }
    
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    
    // Calculate totals
    let totalAmount = 0
    let totalProfit = 0
    const orderItems: any[] = []
    
    for (const item of items) {
      const price = Number(item.price || item.unit_price || 0)
      const quantity = Number(item.quantity || 1)
      const costPrice = Number(item.cost_price || 0)
      const subtotal = price * quantity
      const profit = (price - costPrice) * quantity
      totalAmount += subtotal
      totalProfit += profit
      
      // Resolve product name - try item fields first, then lookup from DB if needed
      let productName = item.name || item.product_name || ''
      if (!productName && item.product_id) {
        try {
          const products = await db.query('products', { eq: [['id', item.product_id]], limit: 1 })
          if (products && products.length > 0) productName = products[0].name
        } catch { /* ignore lookup failure */ }
      }
      
      orderItems.push({
        product_id: item.product_id || null,
        product_name: productName || 'Produk',
        quantity,
        unit_price: price,
        cost_price: costPrice,
        size: item.size || '',
        color: item.color || '',
        subtotal
      })
    }
    
    totalAmount = totalAmount - (parseInt(discount) || 0) + (parseInt(shipping_cost) || 0)
    
    // Determine payment status: support dp (down payment), pending, paid
    let paymentStatus = 'paid'
    if (payment_method === 'cod') paymentStatus = 'pending'
    if (body.payment_status === 'dp') paymentStatus = 'dp'
    if (body.payment_status === 'pending') paymentStatus = 'pending'
    if (body.payment_status === 'paid') paymentStatus = 'paid'
    
    // Create order
    const [order] = await db.insert('orders', {
      store_id: storeId,
      order_number: generateOrderNumber(),
      customer_name: customer_name || 'Walk-in Customer',
      customer_phone: customer_phone || '',
      total_amount: totalAmount,
      total_profit: totalProfit,
      discount: parseInt(discount) || 0,
      shipping_cost: parseInt(shipping_cost) || 0,
      payment_method,
      payment_status: paymentStatus,
      shipping_status: 'pending',
      notes: notes || ''
    })
    
    // Create order items
    for (const item of orderItems) {
      await db.insert('order_items', { ...item, order_id: order.id })
    }
    
    // Deduct stock
    for (const item of items) {
      if (item.product_id) {
        const products = await db.query('products', { eq: [['id', item.product_id]], limit: 1 })
        if (products && products.length > 0) {
          const newStock = Math.max(0, (products[0].stock || 0) - item.quantity)
          const newSold = (products[0].total_sold || 0) + item.quantity
          await db.update('products', item.product_id, { stock: newStock, total_sold: newSold })
        }
      }
    }
    
    // Update/create customer
    if (customer_phone) {
      const existingCust = await db.query('customers', { eq: [['store_id', storeId], ['phone', customer_phone]], limit: 1 })
      if (existingCust && existingCust.length > 0) {
        await db.update('customers', existingCust[0].id, {
          total_orders: (existingCust[0].total_orders || 0) + 1,
          total_spent: (existingCust[0].total_spent || 0) + totalAmount,
          last_order_at: new Date().toISOString(),
          name: customer_name || existingCust[0].name
        })
      } else {
        await db.insert('customers', {
          store_id: storeId,
          name: customer_name || 'Unknown',
          phone: customer_phone,
          total_orders: 1,
          total_spent: totalAmount,
          segment: 'new',
          last_order_at: new Date().toISOString()
        })
      }
    }
    
    // Send WA receipt if requested
    if (send_wa && customer_phone && c.env.FONNTE_TOKEN) {
      try {
        const receiptMsg = `*FashionKas - Struk Pembelian*\n\nNo. Order: ${order.order_number}\n\n${orderItems.map(i => `${i.product_name} x${i.quantity} = Rp ${i.subtotal.toLocaleString('id-ID')}`).join('\n')}\n\nTotal: *Rp ${totalAmount.toLocaleString('id-ID')}*\nBayar: ${payment_method}\n\nTerima kasih sudah berbelanja! 🙏`
        
        await fetch('https://api.fonnte.com/send', {
          method: 'POST',
          headers: { 'Authorization': c.env.FONNTE_TOKEN },
          body: new URLSearchParams({ target: customer_phone, message: receiptMsg, countryCode: '62' })
        })
      } catch { /* WA send failure is non-critical */ }
    }
    
    return c.json({ success: true, data: { ...order, items: orderItems }, message: 'Pesanan berhasil disimpan!' })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Update order status
orderRoutes.put('/:id', async (c) => {
  try {
    const storeId = await getStoreId(c)
    const id = c.req.param('id')
    const body = await c.req.json()
    
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    const existing = await db.query('orders', { eq: [['id', id], ['store_id', storeId]], limit: 1 })
    if (!existing || existing.length === 0) return c.json({ success: false, message: 'Pesanan tidak ditemukan' }, 404)
    
    const updateData: any = {}
    if (body.shipping_status) updateData.shipping_status = body.shipping_status
    if (body.payment_status) updateData.payment_status = body.payment_status
    if (body.tracking_number) updateData.tracking_number = body.tracking_number
    
    const [updated] = await db.update('orders', id, updateData)
    return c.json({ success: true, data: updated, message: 'Status pesanan diupdate!' })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})
