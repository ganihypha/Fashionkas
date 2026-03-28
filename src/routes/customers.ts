// Customer Routes v3.0 - Enhanced with search, segment, update, notes
import { Hono } from 'hono'
import { createSupabaseClient, verifyJWT } from '../lib/supabase'

type Bindings = { SUPABASE_URL: string; SUPABASE_SERVICE_KEY: string; JWT_SECRET: string; FONNTE_TOKEN: string }

export const customerRoutes = new Hono<{ Bindings: Bindings }>()

async function getStoreId(c: any): Promise<string> {
  const auth = c.req.header('Authorization')
  if (!auth) throw new Error('No token')
  const payload = await verifyJWT(auth.replace('Bearer ', ''), c.env.JWT_SECRET)
  return payload.store_id
}

// List customers with stats
customerRoutes.get('/', async (c) => {
  try {
    const storeId = await getStoreId(c)
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    const customers = await db.query('customers', {
      eq: [['store_id', storeId]],
      order: ['last_order_at', true]
    })

    // Calculate segments
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()
    
    const stats = {
      total: customers.length,
      active: customers.filter((c: any) => c.last_order_at && c.last_order_at >= thirtyDaysAgo).length,
      vip: customers.filter((c: any) => (c.total_orders || 0) >= 5).length,
      dormant: customers.filter((c: any) => !c.last_order_at || c.last_order_at < thirtyDaysAgo).length,
      total_revenue: customers.reduce((s: number, c: any) => s + (c.total_spent || 0), 0)
    }

    return c.json({ success: true, data: customers, stats })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Create customer
customerRoutes.post('/', async (c) => {
  try {
    const storeId = await getStoreId(c)
    const { name, phone, notes, segment, address } = await c.req.json()
    if (!name || !phone) return c.json({ success: false, message: 'Nama dan phone wajib' }, 400)
    
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    
    // Check duplicate phone
    const existing = await db.query('customers', { eq: [['store_id', storeId], ['phone', phone]], limit: 1 })
    if (existing && existing.length > 0) {
      return c.json({ success: false, message: 'Nomor WA sudah terdaftar' }, 400)
    }
    
    const [customer] = await db.insert('customers', {
      store_id: storeId, name, phone, 
      segment: segment || 'new',
      notes: notes || '',
      address: address || ''
    })
    return c.json({ success: true, data: customer, message: 'Customer berhasil ditambahkan!' })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Update customer
customerRoutes.put('/:id', async (c) => {
  try {
    const storeId = await getStoreId(c)
    const id = c.req.param('id')
    const body = await c.req.json()
    
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    const existing = await db.query('customers', { eq: [['id', id], ['store_id', storeId]], limit: 1 })
    if (!existing || existing.length === 0) return c.json({ success: false, message: 'Customer tidak ditemukan' }, 404)
    
    const updateData: any = {}
    if (body.name) updateData.name = body.name
    if (body.phone) updateData.phone = body.phone
    if (body.notes !== undefined) updateData.notes = body.notes
    if (body.segment) updateData.segment = body.segment
    if (body.address !== undefined) updateData.address = body.address
    
    const [updated] = await db.update('customers', id, updateData)
    return c.json({ success: true, data: updated, message: 'Customer diupdate!' })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Delete customer
customerRoutes.delete('/:id', async (c) => {
  try {
    const storeId = await getStoreId(c)
    const id = c.req.param('id')
    
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    const existing = await db.query('customers', { eq: [['id', id], ['store_id', storeId]], limit: 1 })
    if (!existing || existing.length === 0) return c.json({ success: false, message: 'Customer tidak ditemukan' }, 404)
    
    await db.remove('customers', id)
    return c.json({ success: true, message: 'Customer dihapus' })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Get customer order history
customerRoutes.get('/:id/orders', async (c) => {
  try {
    const storeId = await getStoreId(c)
    const customerId = c.req.param('id')
    
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    const customer = await db.query('customers', { eq: [['id', customerId], ['store_id', storeId]], limit: 1 })
    if (!customer || customer.length === 0) return c.json({ success: false, message: 'Customer tidak ditemukan' }, 404)
    
    // Get orders by phone
    const orders = await db.query('orders', { 
      eq: [['store_id', storeId], ['customer_phone', customer[0].phone]],
      order: ['created_at', true],
      limit: 50
    })
    
    return c.json({ success: true, data: { customer: customer[0], orders } })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})
