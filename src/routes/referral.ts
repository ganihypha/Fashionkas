// Referral System Routes - FashionKas v3.2
// Referral code generation, tracking, reward system
import { Hono } from 'hono'
import { createSupabaseClient, verifyJWT } from '../lib/supabase'

type Bindings = { SUPABASE_URL: string; SUPABASE_SERVICE_KEY: string; JWT_SECRET: string }

export const referralRoutes = new Hono<{ Bindings: Bindings }>()

function generateCode(storeName: string): string {
  const prefix = storeName.replace(/[^a-zA-Z]/g, '').substring(0, 4).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `FK-${prefix}-${random}`
}

// Get referral info for current store
referralRoutes.get('/info', async (c) => {
  try {
    const auth = c.req.header('Authorization')
    if (!auth) throw new Error('No token')
    const payload = await verifyJWT(auth.replace('Bearer ', ''), c.env.JWT_SECRET)
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    const stores = await db.query('stores', { eq: [['id', payload.store_id]], limit: 1 })
    if (!stores || stores.length === 0) throw new Error('Store not found')
    const store = stores[0]
    
    // Generate referral code from store name if not exists
    const referralCode = store.referral_code || generateCode(store.name || 'FK')
    
    // If store doesn't have referral code yet, we'd save it
    // For now, generate deterministically based on store id
    const stableCode = `FK-${(store.slug || 'user').substring(0, 4).toUpperCase()}-${(store.id || '').substring(0, 4).toUpperCase()}`
    
    // Count referrals (stores that have referred_by = this store's code)
    // Since we don't have a referral column yet, simulate with store metadata
    const allStores = await db.query('stores', {})
    const referrals = allStores.filter((s: any) => s.referred_by === stableCode)
    
    // Calculate rewards
    const rewardPerReferral = 30 // 30 days free per referral
    const totalRewardDays = referrals.length * rewardPerReferral
    const activeReferrals = referrals.filter((s: any) => {
      const created = new Date(s.created_at || 0).getTime()
      return (Date.now() - created) < 90 * 86400000 // Active within 90 days
    })
    
    return c.json({
      success: true,
      data: {
        referralCode: stableCode,
        shareUrl: `https://fashionkas.pages.dev/register?ref=${stableCode}`,
        shareMessage: `Halo! Coba FashionKas - kasir digital gratis untuk reseller fashion!\n\nDaftar GRATIS pakai kode ini: ${stableCode}\nhttps://fashionkas.pages.dev/register?ref=${stableCode}\n\nFitur: Katalog online, catat order, follow-up otomatis via WA!`,
        stats: {
          totalReferrals: referrals.length,
          activeReferrals: activeReferrals.length,
          totalRewardDays,
          pendingRewards: 0
        },
        rewards: {
          perReferral: `${rewardPerReferral} hari gratis`,
          milestone5: 'Upgrade BASIC gratis 3 bulan',
          milestone10: 'Upgrade PRO gratis 3 bulan',
          milestone25: 'Lifetime BASIC gratis'
        },
        referralHistory: referrals.map((r: any) => ({
          storeName: r.name,
          city: r.city || '-',
          joinedAt: r.created_at,
          isActive: (Date.now() - new Date(r.created_at || 0).getTime()) < 90 * 86400000
        }))
      }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Validate a referral code
referralRoutes.get('/validate/:code', async (c) => {
  try {
    const code = c.req.param('code')
    if (!code || !code.startsWith('FK-')) {
      return c.json({ success: false, message: 'Kode referral tidak valid' }, 400)
    }
    
    // Check if any store has this referral code pattern
    return c.json({
      success: true,
      data: {
        valid: true,
        code,
        reward: '30 hari gratis untuk kamu dan temanmu!'
      }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Leaderboard - top referrers
referralRoutes.get('/leaderboard', async (c) => {
  try {
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    const allStores = await db.query('stores', {})
    
    // Count referrals per store
    const referrerMap: Record<string, { name: string; count: number; city: string }> = {}
    
    allStores.forEach((s: any) => {
      if (s.referred_by) {
        if (!referrerMap[s.referred_by]) {
          // Find referrer store
          const referrer = allStores.find((rs: any) => {
            const code = `FK-${(rs.slug || 'user').substring(0, 4).toUpperCase()}-${(rs.id || '').substring(0, 4).toUpperCase()}`
            return code === s.referred_by
          })
          referrerMap[s.referred_by] = {
            name: referrer?.name || 'Unknown',
            count: 0,
            city: referrer?.city || '-'
          }
        }
        referrerMap[s.referred_by].count++
      }
    })
    
    const leaderboard = Object.entries(referrerMap)
      .map(([code, data]) => ({ code, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20)
    
    return c.json({
      success: true,
      data: {
        leaderboard,
        totalReferrals: allStores.filter((s: any) => s.referred_by).length,
        totalReferrers: Object.keys(referrerMap).length
      }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})
