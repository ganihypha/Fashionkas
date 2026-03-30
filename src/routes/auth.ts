// Auth Routes - FashionKas
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
    // Guard: ensure env vars are available
    if (!c.env.SUPABASE_URL || !c.env.SUPABASE_SERVICE_KEY || !c.env.JWT_SECRET) {
      return c.json({ success: false, message: 'Server configuration error. Please contact admin.' }, 503)
    }
    
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
      data: {
        token,
        store: {
          id: store.id, name: store.name, slug: store.slug,
          tier: store.subscription_tier, city: store.city,
          owner_name: store.owner_name, owner_phone: store.owner_phone,
          description: store.description
        }
      },
      message: 'Toko berhasil didaftarkan!'
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message || 'Registration failed' }, 500)
  }
})

// Login with phone + PIN
authRoutes.post('/login', async (c) => {
  try {
    // Guard: ensure env vars are available
    if (!c.env.SUPABASE_URL || !c.env.SUPABASE_SERVICE_KEY || !c.env.JWT_SECRET) {
      return c.json({ success: false, message: 'Server configuration error. Please contact admin.' }, 503)
    }
    
    const { phone, pin } = await c.req.json()
    if (!phone || !pin) {
      return c.json({ success: false, message: 'Phone dan PIN wajib diisi' }, 400)
    }
    
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    const pinHash = await hashPin(pin)
    
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
      data: {
        token,
        store: {
          id: store.id, name: store.name, slug: store.slug,
          tier: store.subscription_tier, city: store.city,
          owner_name: store.owner_name, owner_phone: store.owner_phone,
          description: store.description
        }
      },
      message: 'Login berhasil!'
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message || 'Login failed' }, 500)
  }
})

// Verify token / get current store
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
      data: {
        store: {
          id: store.id, name: store.name, slug: store.slug,
          tier: store.subscription_tier, city: store.city,
          owner_name: store.owner_name, owner_phone: store.owner_phone,
          description: store.description
        }
      }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message || 'Auth failed' }, 401)
  }
})

// Update store profile
authRoutes.put('/store', async (c) => {
  try {
    const auth = c.req.header('Authorization')
    if (!auth) return c.json({ success: false, message: 'No token' }, 401)
    
    const token = auth.replace('Bearer ', '')
    const payload = await verifyJWT(token, c.env.JWT_SECRET)
    
    const body = await c.req.json()
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    
    const updateData: any = {}
    if (body.name !== undefined) updateData.name = body.name
    if (body.description !== undefined) updateData.description = body.description
    if (body.city !== undefined) updateData.city = body.city
    if (body.owner_name !== undefined) updateData.owner_name = body.owner_name
    
    const [updated] = await db.update('stores', payload.store_id, updateData)
    
    return c.json({
      success: true,
      data: {
        store: {
          id: updated.id, name: updated.name, slug: updated.slug,
          tier: updated.subscription_tier, city: updated.city,
          owner_name: updated.owner_name, owner_phone: updated.owner_phone,
          description: updated.description
        }
      },
      message: 'Profil toko berhasil diupdate!'
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message || 'Update failed' }, 500)
  }
})

// Change PIN
authRoutes.put('/change-pin', async (c) => {
  try {
    const auth = c.req.header('Authorization')
    if (!auth) return c.json({ success: false, message: 'No token' }, 401)
    
    const token = auth.replace('Bearer ', '')
    const payload = await verifyJWT(token, c.env.JWT_SECRET)
    
    const { current_pin, new_pin } = await c.req.json()
    if (!current_pin || !new_pin) return c.json({ success: false, message: 'PIN lama dan baru wajib diisi' }, 400)
    if (new_pin.length < 4) return c.json({ success: false, message: 'PIN baru minimal 4 digit' }, 400)
    
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    const currentHash = await hashPin(current_pin)
    
    const stores = await db.query('stores', {
      eq: [['id', payload.store_id], ['pin_code', currentHash]],
      limit: 1
    })
    
    if (!stores || stores.length === 0) {
      return c.json({ success: false, message: 'PIN lama salah' }, 401)
    }
    
    const newHash = await hashPin(new_pin)
    await db.update('stores', payload.store_id, { pin_code: newHash })
    
    return c.json({ success: true, message: 'PIN berhasil diubah!' })
  } catch (e: any) {
    return c.json({ success: false, message: e.message || 'Change PIN failed' }, 500)
  }
})
