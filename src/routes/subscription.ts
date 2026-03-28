// Subscription & Payment Routes - FashionKas v3.1
// Pricing Tiers: FREE (beta), BASIC (Rp 49-99K), PRO (Rp 149-249K), ENTERPRISE (Rp 499K)
// Payment Gateway: Duitku (placeholder - requires API key setup)
// Enforcement: tier-based feature gating

import { Hono } from 'hono'
import { createSupabaseClient, verifyJWT } from '../lib/supabase'

type Bindings = {
  SUPABASE_URL: string
  SUPABASE_SERVICE_KEY: string
  JWT_SECRET: string
  DUITKU_MERCHANT_CODE?: string
  DUITKU_API_KEY?: string
}

export const subscriptionRoutes = new Hono<{ Bindings: Bindings }>()

// Tier definitions
const TIERS = {
  beta: {
    name: 'BETA (Gratis)',
    price: 0,
    maxProducts: 999,
    maxOrders: 999,
    maxCustomers: 999,
    features: ['catalog', 'kasir', 'orders', 'customers', 'wa-automation', 'reports', 'followup', 'ai-agents'],
    waMessagesPerDay: 50,
    imageUpload: true
  },
  starter: {
    name: 'STARTER',
    price: 0,
    maxProducts: 20,
    maxOrders: 50,
    maxCustomers: 100,
    features: ['catalog', 'kasir', 'orders', 'customers'],
    waMessagesPerDay: 10,
    imageUpload: false
  },
  basic: {
    name: 'BASIC',
    price: 99000,
    maxProducts: 100,
    maxOrders: 500,
    maxCustomers: 500,
    features: ['catalog', 'kasir', 'orders', 'customers', 'wa-automation', 'reports', 'followup'],
    waMessagesPerDay: 100,
    imageUpload: true
  },
  pro: {
    name: 'PRO',
    price: 249000,
    maxProducts: 500,
    maxOrders: 5000,
    maxCustomers: 5000,
    features: ['catalog', 'kasir', 'orders', 'customers', 'wa-automation', 'reports', 'followup', 'ai-agents', 'broadcast', 'csv-export'],
    waMessagesPerDay: 1000,
    imageUpload: true
  },
  enterprise: {
    name: 'ENTERPRISE',
    price: 499000,
    maxProducts: 99999,
    maxOrders: 99999,
    maxCustomers: 99999,
    features: ['catalog', 'kasir', 'orders', 'customers', 'wa-automation', 'reports', 'followup', 'ai-agents', 'broadcast', 'csv-export', 'multi-store', 'priority-support'],
    waMessagesPerDay: 99999,
    imageUpload: true
  }
}

async function getStoreData(c: any): Promise<{ store_id: string; store: any; db: any }> {
  const auth = c.req.header('Authorization')
  if (!auth) throw new Error('No token')
  const payload = await verifyJWT(auth.replace('Bearer ', ''), c.env.JWT_SECRET)
  const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
  const stores = await db.query('stores', { eq: [['id', payload.store_id]], limit: 1 })
  if (!stores || stores.length === 0) throw new Error('Store not found')
  return { store_id: payload.store_id, store: stores[0], db }
}

// GET /tiers - Get available subscription tiers
subscriptionRoutes.get('/tiers', (c) => {
  const tierList = Object.entries(TIERS).map(([key, tier]) => ({
    id: key,
    ...tier,
    priceFormatted: tier.price === 0 ? 'Gratis' : `Rp ${tier.price.toLocaleString('id-ID')}/bulan`
  }))
  return c.json({ success: true, data: tierList })
})

// GET /current - Get current store's subscription status
subscriptionRoutes.get('/current', async (c) => {
  try {
    const { store, db } = await getStoreData(c)
    const tier = store.subscription_tier || 'beta'
    const tierInfo = TIERS[tier as keyof typeof TIERS] || TIERS.beta

    // Count current usage
    const products = await db.query('products', { eq: [['store_id', store.id]] })
    const orders = await db.query('orders', { eq: [['store_id', store.id]] })
    const customers = await db.query('customers', { eq: [['store_id', store.id]] })

    return c.json({
      success: true,
      data: {
        tier,
        tierInfo: { ...tierInfo, id: tier },
        usage: {
          products: products.length,
          orders: orders.length,
          customers: customers.length,
          productLimit: tierInfo.maxProducts,
          orderLimit: tierInfo.maxOrders,
          customerLimit: tierInfo.maxCustomers,
          productPercentage: Math.round((products.length / tierInfo.maxProducts) * 100),
          orderPercentage: Math.round((orders.length / tierInfo.maxOrders) * 100)
        },
        isBeta: tier === 'beta',
        canUpgrade: tier !== 'enterprise',
        message: tier === 'beta'
          ? 'Anda sedang menggunakan beta gratis. Semua fitur terbuka!'
          : `Anda menggunakan paket ${tierInfo.name}.`
      }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// POST /check-feature - Check if a feature is available for current tier
subscriptionRoutes.post('/check-feature', async (c) => {
  try {
    const { store } = await getStoreData(c)
    const { feature } = await c.req.json()
    if (!feature) return c.json({ success: false, message: 'feature required' }, 400)

    const tier = store.subscription_tier || 'beta'
    const tierInfo = TIERS[tier as keyof typeof TIERS] || TIERS.beta
    const hasFeature = tierInfo.features.includes(feature)

    return c.json({
      success: true,
      data: {
        feature,
        allowed: hasFeature,
        currentTier: tier,
        requiredTier: hasFeature ? tier : getMinTierForFeature(feature),
        message: hasFeature
          ? `Fitur "${feature}" tersedia di paket ${tierInfo.name}`
          : `Fitur "${feature}" membutuhkan upgrade ke paket yang lebih tinggi`
      }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// POST /create-payment - Create Duitku payment (placeholder)
subscriptionRoutes.post('/create-payment', async (c) => {
  try {
    const { store_id, store } = await getStoreData(c)
    const { target_tier } = await c.req.json()

    if (!target_tier || !TIERS[target_tier as keyof typeof TIERS]) {
      return c.json({ success: false, message: 'Tier tidak valid' }, 400)
    }

    const tierInfo = TIERS[target_tier as keyof typeof TIERS]
    if (tierInfo.price === 0) {
      return c.json({ success: false, message: 'Tier ini gratis, tidak perlu pembayaran' }, 400)
    }

    // TODO: Implement Duitku payment gateway
    // Requires: DUITKU_MERCHANT_CODE & DUITKU_API_KEY in env
    // API: https://docs.duitku.com/api/en/
    if (!c.env.DUITKU_MERCHANT_CODE || !c.env.DUITKU_API_KEY) {
      return c.json({
        success: false,
        message: 'Payment gateway belum dikonfigurasi. Hubungi admin untuk upgrade manual.',
        data: {
          target_tier,
          amount: tierInfo.price,
          contact: 'WA admin untuk upgrade manual',
          note: 'Duitku integration coming soon'
        }
      }, 503)
    }

    // Duitku payment creation will go here
    return c.json({
      success: true,
      data: {
        payment_url: null,
        reference: `FK-${store_id.slice(0, 8)}-${Date.now().toString(36)}`,
        amount: tierInfo.price,
        tier: target_tier,
        status: 'pending'
      },
      message: 'Payment gateway sedang dalam pengembangan'
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// POST /webhook/duitku - Duitku payment callback (placeholder)
subscriptionRoutes.post('/webhook/duitku', async (c) => {
  // TODO: Implement Duitku webhook handler
  // 1. Verify signature from Duitku
  // 2. Update store subscription_tier
  // 3. Log payment
  return c.json({ success: true, message: 'Webhook received' })
})

// Helper: find minimum tier that has a feature
function getMinTierForFeature(feature: string): string {
  const tierOrder = ['starter', 'basic', 'pro', 'enterprise']
  for (const tier of tierOrder) {
    if (TIERS[tier as keyof typeof TIERS].features.includes(feature)) {
      return tier
    }
  }
  return 'enterprise'
}
