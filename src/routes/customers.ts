// Customer Routes
import { Hono } from 'hono'
import { createSupabaseClient, verifyJWT } from '../lib/supabase'

type Bindings = { SUPABASE_URL: string; SUPABASE_SERVICE_KEY: string; JWT_SECRET: string }

export const customerRoutes = new Hono<{ Bindings: Bindings }>()

async function getStoreId(c: any): Promise<string> {
  const auth = c.req.header('Authorization')
  if (!auth) throw new Error('No token')
  const payload = await verifyJWT(auth.replace('Bearer ', ''), c.env.JWT_SECRET)
  return payload.store_id
}

// List customers
customerRoutes.get('/', async (c) => {
  try {
    const storeId = await getStoreId(c)
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    const customers = await db.query('customers', {
      eq: [['store_id', storeId]],
      order: ['last_order_at', true]
    })
    return c.json({ success: true, data: customers })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Create customer
customerRoutes.post('/', async (c) => {
  try {
    const storeId = await getStoreId(c)
    const { name, phone } = await c.req.json()
    if (!name || !phone) return c.json({ success: false, message: 'Nama dan phone wajib' }, 400)
    
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    const [customer] = await db.insert('customers', {
      store_id: storeId, name, phone, segment: 'new'
    })
    return c.json({ success: true, data: customer })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})
