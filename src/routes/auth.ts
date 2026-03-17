// Auth Routes
import { Hono } from 'hono'
import { createSupabaseClient, createJWT, verifyJWT, hashPin } from '../lib/supabase'

type Bindings = {
  SUPABASE_URL: string
  SUPABASE_SERVICE_KEY: string
  JWT_SECRET: string
}

export const authRoutes = new Hono<{ Bindings: Bindings }>()

// Register new store
authRoutes.post('/register', async (c) => {
  try {
    const { store_name, owner_name, phone, pin, city, description } = await c.req.json()
    if (!store_name || !owner_name || !phone || !pin) {
      return c.json({ success: false, message: 'Semua field wajib diisi' }, 400)
    }
    if (pin.length < 4) {
      return c.json({ success: false, message: 'PIN minimal 4 digit' }, 400)
    }
    
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    const slug = store_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    const pinHash = await hashPin(pin)
    
    const [store] = await db.insert('stores', {
      name: store_name,
      slug: slug + '-' + Date.now().toString(36),
      owner_name,
      owner_phone: phone,
      pin_code: pinHash,
      city: city || '',
      description: description || '',
      subscription_tier: 'beta'
    })
    
    const token = await createJWT({ store_id: store.id, phone, tier: 'beta' }, c.env.JWT_SECRET)
    
    return c.json({
      success: true,
      data: { token, store: { id: store.id, name: store.name, slug: store.slug, tier: store.subscription_tier } },
      message: 'Toko berhasil didaftarkan!'
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message || 'Registration failed' }, 500)
  }
})

// Login with phone + PIN
authRoutes.post('/login', async (c) => {
  try {
    const { phone, pin } = await c.req.json()
    if (!phone || !pin) {
      return c.json({ success: false, message: 'Phone dan PIN wajib diisi' }, 400)
    }
    
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    const pinHash = await hashPin(pin)
    
    // Find store by phone and PIN
    const stores = await db.query('stores', {
      eq: [['owner_phone', phone], ['pin_code', pinHash]],
      limit: 1
    })
    
    if (!stores || stores.length === 0) {
      return c.json({ success: false, message: 'Phone atau PIN salah' }, 401)
    }
    
    const store = stores[0]
    const token = await createJWT({ store_id: store.id, phone, tier: store.subscription_tier }, c.env.JWT_SECRET)
    
    return c.json({
      success: true,
      data: { token, store: { id: store.id, name: store.name, slug: store.slug, tier: store.subscription_tier, city: store.city } },
      message: 'Login berhasil!'
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message || 'Login failed' }, 500)
  }
})

// Verify token
authRoutes.get('/me', async (c) => {
  try {
    const auth = c.req.header('Authorization')
    if (!auth) return c.json({ success: false, message: 'No token' }, 401)
    
    const token = auth.replace('Bearer ', '')
    const payload = await verifyJWT(token, c.env.JWT_SECRET)
    
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    const stores = await db.query('stores', { eq: [['id', payload.store_id]], limit: 1 })
    
    if (!stores || stores.length === 0) {
      return c.json({ success: false, message: 'Store not found' }, 404)
    }
    
    const store = stores[0]
    return c.json({
      success: true,
      data: { store: { id: store.id, name: store.name, slug: store.slug, tier: store.subscription_tier, city: store.city, owner_name: store.owner_name } }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message || 'Auth failed' }, 401)
  }
})
