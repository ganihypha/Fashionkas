// Product Routes (CRUD)
import { Hono } from 'hono'
import { createSupabaseClient, verifyJWT } from '../lib/supabase'

type Bindings = { SUPABASE_URL: string; SUPABASE_SERVICE_KEY: string; JWT_SECRET: string }

export const productRoutes = new Hono<{ Bindings: Bindings }>()

// Middleware: extract store_id from JWT
async function getStoreId(c: any): Promise<string> {
  const auth = c.req.header('Authorization')
  if (!auth) throw new Error('No token')
  const payload = await verifyJWT(auth.replace('Bearer ', ''), c.env.JWT_SECRET)
  return payload.store_id
}

// List products
productRoutes.get('/', async (c) => {
  try {
    const storeId = await getStoreId(c)
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    const products = await db.query('products', {
      eq: [['store_id', storeId]],
      order: ['created_at', true]
    })
    return c.json({ success: true, data: products })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Create product
productRoutes.post('/', async (c) => {
  try {
    const storeId = await getStoreId(c)
    const body = await c.req.json()
    const { name, category, price, cost_price, stock, sizes, colors, image_url, description } = body
    
    if (!name || !category || !price) {
      return c.json({ success: false, message: 'Nama, kategori, dan harga wajib diisi' }, 400)
    }
    
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    const [product] = await db.insert('products', {
      store_id: storeId,
      name,
      category: category.toLowerCase(),
      price: parseInt(price),
      cost_price: parseInt(cost_price) || 0,
      stock: parseInt(stock) || 0,
      sizes: sizes || [],
      colors: colors || [],
      image_url: image_url || '',
      description: description || '',
      is_active: true
    })
    
    return c.json({ success: true, data: product, message: 'Produk berhasil ditambahkan!' })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Update product
productRoutes.put('/:id', async (c) => {
  try {
    const storeId = await getStoreId(c)
    const id = c.req.param('id')
    const body = await c.req.json()
    
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    
    // Verify ownership
    const existing = await db.query('products', { eq: [['id', id], ['store_id', storeId]], limit: 1 })
    if (!existing || existing.length === 0) return c.json({ success: false, message: 'Produk tidak ditemukan' }, 404)
    
    const updateData: any = {}
    if (body.name !== undefined) updateData.name = body.name
    if (body.category !== undefined) updateData.category = body.category.toLowerCase()
    if (body.price !== undefined) updateData.price = parseInt(body.price)
    if (body.cost_price !== undefined) updateData.cost_price = parseInt(body.cost_price)
    if (body.stock !== undefined) updateData.stock = parseInt(body.stock)
    if (body.sizes !== undefined) updateData.sizes = body.sizes
    if (body.colors !== undefined) updateData.colors = body.colors
    if (body.image_url !== undefined) updateData.image_url = body.image_url
    if (body.description !== undefined) updateData.description = body.description
    if (body.is_active !== undefined) updateData.is_active = body.is_active
    if (body.is_featured !== undefined) updateData.is_featured = body.is_featured
    
    const [updated] = await db.update('products', id, updateData)
    return c.json({ success: true, data: updated, message: 'Produk berhasil diupdate!' })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Delete product
productRoutes.delete('/:id', async (c) => {
  try {
    const storeId = await getStoreId(c)
    const id = c.req.param('id')
    
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    const existing = await db.query('products', { eq: [['id', id], ['store_id', storeId]], limit: 1 })
    if (!existing || existing.length === 0) return c.json({ success: false, message: 'Produk tidak ditemukan' }, 404)
    
    await db.remove('products', id)
    return c.json({ success: true, message: 'Produk berhasil dihapus!' })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Public: Get products by store slug (no auth)
productRoutes.get('/public/:slug', async (c) => {
  try {
    const slug = c.req.param('slug')
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    
    const stores = await db.query('stores', { eq: [['slug', slug]], limit: 1 })
    if (!stores || stores.length === 0) return c.json({ success: false, message: 'Toko tidak ditemukan' }, 404)
    
    const store = stores[0]
    const products = await db.query('products', {
      eq: [['store_id', store.id], ['is_active', true]],
      order: ['is_featured', true]
    })
    
    return c.json({ success: true, data: { store: { name: store.name, slug: store.slug, description: store.description, phone: store.owner_phone, city: store.city }, products } })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})
