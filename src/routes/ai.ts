// AI Agent Routes - Scout (Lead Scoring) + Closer (WA Outreach)
// FashionKas v1.2 - AI-powered customer intelligence
import { Hono } from 'hono'
import { createSupabaseClient, verifyJWT } from '../lib/supabase'

type Bindings = { 
  SUPABASE_URL: string; SUPABASE_SERVICE_KEY: string; JWT_SECRET: string; 
  FONNTE_TOKEN: string 
}

export const aiRoutes = new Hono<{ Bindings: Bindings }>()

async function getStoreData(c: any): Promise<{ store_id: string; store: any; db: any }> {
  const auth = c.req.header('Authorization')
  if (!auth) throw new Error('No token')
  const payload = await verifyJWT(auth.replace('Bearer ', ''), c.env.JWT_SECRET)
  const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
  const stores = await db.query('stores', { eq: [['id', payload.store_id]], limit: 1 })
  if (!stores || stores.length === 0) throw new Error('Store not found')
  return { store_id: payload.store_id, store: stores[0], db }
}

// === SCOUT AI - Lead Scoring & Customer Analytics ===

// Get customer scores
aiRoutes.get('/scout/scores', async (c) => {
  try {
    const { store_id, db } = await getStoreData(c)
    
    const customers = await db.query('customers', { eq: [['store_id', store_id]] })
    const orders = await db.query('orders', { eq: [['store_id', store_id]], order: ['created_at', true] })
    
    // Fetch order items for category analysis
    let allItems: any[] = []
    for (const order of orders) {
      const items = await db.query('order_items', { eq: [['order_id', order.id]] })
      order.items = items
      allItems = allItems.concat(items.map((i: any) => ({ ...i, customer_phone: order.customer_phone, created_at: order.created_at })))
    }
    
    const now = Date.now()
    const DAY = 86400000
    
    const scoredCustomers = customers.map((cust: any) => {
      const custOrders = orders.filter((o: any) => o.customer_phone === cust.phone)
      const totalSpent = custOrders.reduce((s: number, o: any) => s + (o.total_amount || 0), 0)
      const orderCount = custOrders.length
      const lastOrderDate = custOrders.length > 0 ? new Date(custOrders[0].created_at).getTime() : 0
      const daysSinceLastOrder = lastOrderDate ? Math.floor((now - lastOrderDate) / DAY) : 999
      const avgOrderValue = orderCount > 0 ? Math.round(totalSpent / orderCount) : 0
      
      // RFM Score (Recency, Frequency, Monetary)
      const recencyScore = daysSinceLastOrder <= 7 ? 5 : daysSinceLastOrder <= 14 ? 4 : daysSinceLastOrder <= 30 ? 3 : daysSinceLastOrder <= 60 ? 2 : 1
      const frequencyScore = orderCount >= 10 ? 5 : orderCount >= 5 ? 4 : orderCount >= 3 ? 3 : orderCount >= 2 ? 2 : 1
      const monetaryScore = totalSpent >= 2000000 ? 5 : totalSpent >= 1000000 ? 4 : totalSpent >= 500000 ? 3 : totalSpent >= 200000 ? 2 : 1
      
      const totalScore = Math.round(((recencyScore * 3) + (frequencyScore * 2) + (monetaryScore * 2)) / 7 * 100)
      
      // Segment classification
      let segment = 'cold'
      let segmentLabel = 'Dingin'
      let segmentColor = 'gray'
      if (totalScore >= 80) { segment = 'vip'; segmentLabel = 'VIP'; segmentColor = 'amber' }
      else if (totalScore >= 60) { segment = 'loyal'; segmentLabel = 'Loyal'; segmentColor = 'green' }
      else if (totalScore >= 40) { segment = 'warm'; segmentLabel = 'Hangat'; segmentColor = 'blue' }
      else if (totalScore >= 20) { segment = 'at_risk'; segmentLabel = 'Beresiko'; segmentColor = 'red' }
      
      // Category preferences
      const custItems = allItems.filter((i: any) => i.customer_phone === cust.phone)
      const catCounts: Record<string, number> = {}
      custItems.forEach((i: any) => {
        const cat = i.category || 'lainnya'
        catCounts[cat] = (catCounts[cat] || 0) + i.quantity
      })
      const favCategory = Object.entries(catCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-'
      
      // Churn prediction
      const churnRisk = daysSinceLastOrder > 30 && orderCount >= 2 ? 'high' : daysSinceLastOrder > 14 ? 'medium' : 'low'
      
      return {
        id: cust.id,
        name: cust.name,
        phone: cust.phone,
        totalSpent,
        orderCount,
        avgOrderValue,
        daysSinceLastOrder,
        lastOrderDate: custOrders[0]?.created_at || null,
        recencyScore,
        frequencyScore, 
        monetaryScore,
        totalScore,
        segment,
        segmentLabel,
        segmentColor,
        favCategory,
        churnRisk
      }
    })
    
    // Sort by score descending
    scoredCustomers.sort((a: any, b: any) => b.totalScore - a.totalScore)
    
    // Summary stats
    const segments = { vip: 0, loyal: 0, warm: 0, at_risk: 0, cold: 0 }
    scoredCustomers.forEach((c: any) => { segments[c.segment as keyof typeof segments]++ })
    
    const totalCustomers = scoredCustomers.length
    const avgScore = totalCustomers > 0 ? Math.round(scoredCustomers.reduce((s: number, c: any) => s + c.totalScore, 0) / totalCustomers) : 0
    const churnRiskHigh = scoredCustomers.filter((c: any) => c.churnRisk === 'high').length
    const totalLifetimeValue = scoredCustomers.reduce((s: number, c: any) => s + c.totalSpent, 0)
    
    return c.json({
      success: true,
      data: {
        customers: scoredCustomers,
        summary: { totalCustomers, avgScore, churnRiskHigh, totalLifetimeValue, segments }
      }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Get insights/recommendations
aiRoutes.get('/scout/insights', async (c) => {
  try {
    const { store_id, db } = await getStoreData(c)
    
    const orders = await db.query('orders', { eq: [['store_id', store_id]], order: ['created_at', true] })
    const products = await db.query('products', { eq: [['store_id', store_id]] })
    const customers = await db.query('customers', { eq: [['store_id', store_id]] })
    
    const now = new Date()
    const thisMonth = orders.filter((o: any) => {
      const d = new Date(o.created_at)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    })
    const lastMonth = orders.filter((o: any) => {
      const d = new Date(o.created_at)
      const lm = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      return d.getMonth() === lm.getMonth() && d.getFullYear() === lm.getFullYear()
    })
    
    const thisRev = thisMonth.reduce((s: number, o: any) => s + (o.total_amount || 0), 0)
    const lastRev = lastMonth.reduce((s: number, o: any) => s + (o.total_amount || 0), 0)
    const growth = lastRev > 0 ? Math.round(((thisRev - lastRev) / lastRev) * 100) : 0
    
    const insights: any[] = []
    
    // Revenue insight
    if (growth > 10) {
      insights.push({ type: 'positive', icon: 'chart-line', title: 'Revenue Naik!', desc: `Revenue bulan ini naik ${growth}% vs bulan lalu. Mantap!`, priority: 1 })
    } else if (growth < -10) {
      insights.push({ type: 'warning', icon: 'chart-line', title: 'Revenue Turun', desc: `Revenue bulan ini turun ${Math.abs(growth)}%. Coba boost dengan promo!`, priority: 1 })
    }
    
    // Low stock alert
    const lowStock = products.filter((p: any) => p.is_active && p.stock > 0 && p.stock <= 5)
    if (lowStock.length > 0) {
      insights.push({ type: 'warning', icon: 'box', title: `${lowStock.length} Produk Stok Menipis`, desc: lowStock.map((p: any) => p.name).slice(0, 3).join(', '), priority: 2 })
    }
    
    // Inactive customers
    const DAY = 86400000
    const inactive = customers.filter((c: any) => {
      const last = c.last_order_at ? new Date(c.last_order_at).getTime() : 0
      return last > 0 && (Date.now() - last) > 30 * DAY
    })
    if (inactive.length > 0) {
      insights.push({ type: 'action', icon: 'user-clock', title: `${inactive.length} Customer Tidak Aktif`, desc: 'Belum order 30+ hari. Kirim broadcast promo untuk re-engage!', priority: 2 })
    }
    
    // Best seller suggestion
    const bestSellers = products.filter((p: any) => p.total_sold > 0).sort((a: any, b: any) => b.total_sold - a.total_sold)
    if (bestSellers.length > 0) {
      insights.push({ type: 'positive', icon: 'fire', title: 'Best Seller', desc: `"${bestSellers[0].name}" terjual ${bestSellers[0].total_sold}x. Pastikan stoknya cukup!`, priority: 3 })
    }
    
    // Out of stock
    const outOfStock = products.filter((p: any) => p.is_active && p.stock === 0)
    if (outOfStock.length > 0) {
      insights.push({ type: 'danger', icon: 'exclamation-triangle', title: `${outOfStock.length} Produk Habis`, desc: outOfStock.map((p: any) => p.name).slice(0, 3).join(', '), priority: 1 })
    }
    
    // Sort by priority
    insights.sort((a, b) => a.priority - b.priority)
    
    return c.json({ success: true, data: { insights, stats: { thisRev, lastRev, growth, totalOrders: thisMonth.length } } })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})


// === CLOSER AI - WhatsApp Outreach & Follow-up ===

// Get follow-up suggestions
aiRoutes.get('/closer/suggestions', async (c) => {
  try {
    const { store_id, store, db } = await getStoreData(c)
    
    const customers = await db.query('customers', { eq: [['store_id', store_id]] })
    const orders = await db.query('orders', { eq: [['store_id', store_id]], order: ['created_at', true] })
    
    const now = Date.now()
    const DAY = 86400000
    
    const suggestions: any[] = []
    
    for (const cust of customers) {
      if (!cust.phone) continue
      
      const custOrders = orders.filter((o: any) => o.customer_phone === cust.phone)
      const lastOrder = custOrders[0]
      const daysSinceLast = lastOrder ? Math.floor((now - new Date(lastOrder.created_at).getTime()) / DAY) : 999
      const totalSpent = custOrders.reduce((s: number, o: any) => s + (o.total_amount || 0), 0)
      const orderCount = custOrders.length
      
      let action: string | null = null
      let template: string = ''
      let urgency: string = 'low'
      let type: string = 'followup'
      
      // New customer - thank you + upsell
      if (orderCount === 1 && daysSinceLast <= 3) {
        action = 'Thank You + Promo'
        template = `Halo ${cust.name}! Terima kasih udah belanja di ${store.name} 😊\n\nSemoga suka ya! Btw, kami ada koleksi baru yang cocok buat kamu. Cek di sini:\nhttps://fashionkas.pages.dev/catalog/${store.slug}\n\nMau order lagi? Chat aja langsung ya 💜`
        urgency = 'medium'
        type = 'thankyou'
      }
      // Repeat buyer - loyalty offer
      else if (orderCount >= 3 && daysSinceLast <= 14) {
        action = 'Loyalty Reward'
        template = `Halo ${cust.name}! 🌟\n\nKamu udah jadi pelanggan setia ${store.name} (${orderCount}x order)! Sebagai apresiasi, kami kasih diskon spesial 10% untuk order berikutnya.\n\nGunakan kode: LOYAL10\n\nCek koleksi terbaru:\nhttps://fashionkas.pages.dev/catalog/${store.slug}\n\nTerima kasih selalu setia! 💜`
        urgency = 'low'
        type = 'loyalty'
      }
      // At risk - re-engagement
      else if (orderCount >= 2 && daysSinceLast > 30 && daysSinceLast <= 90) {
        action = 'Re-engage Customer'
        template = `Halo ${cust.name}! 👋\n\nKami kangen nih! Sudah ${daysSinceLast} hari belum belanja di ${store.name}.\n\nKabar baiknya, kami ada banyak produk baru yang keren!\n\n🛍️ Lihat di: https://fashionkas.pages.dev/catalog/${store.slug}\n\nYuk order lagi! 💜`
        urgency = 'high'
        type = 'reengage'
      }
      // Big spender - VIP treatment  
      else if (totalSpent >= 1000000 && daysSinceLast > 14) {
        action = 'VIP Follow-up'
        template = `Halo ${cust.name}! 👑\n\nSebagai VIP customer ${store.name}, kami mau kasih info spesial:\n\n✨ Pre-order koleksi eksklusif\n🎁 Free ongkir untuk pembelian berikutnya\n\nMau lihat dulu? Chat kami langsung ya!\n\n💜 ${store.name}`
        urgency = 'medium'
        type = 'vip'
      }
      // Cart abandonment / inactive
      else if (orderCount >= 1 && daysSinceLast > 60) {
        action = 'Win Back'
        template = `Halo ${cust.name}! 😊\n\n${store.name} punya banyak produk baru lho! Ada promo spesial juga untuk kamu.\n\n🛍️ Cek sekarang: https://fashionkas.pages.dev/catalog/${store.slug}\n\nKalau ada pertanyaan, chat aja langsung ya! 💜`
        urgency = 'medium'
        type = 'winback'
      }
      
      if (action) {
        suggestions.push({
          customer: { id: cust.id, name: cust.name, phone: cust.phone },
          action,
          template,
          urgency,
          type,
          stats: { orderCount, totalSpent, daysSinceLast, lastOrderDate: lastOrder?.created_at }
        })
      }
    }
    
    // Sort by urgency
    const urgencyOrder: Record<string, number> = { high: 0, medium: 1, low: 2 }
    suggestions.sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency])
    
    const summary = {
      totalSuggestions: suggestions.length,
      byType: {
        thankyou: suggestions.filter(s => s.type === 'thankyou').length,
        loyalty: suggestions.filter(s => s.type === 'loyalty').length,
        reengage: suggestions.filter(s => s.type === 'reengage').length,
        vip: suggestions.filter(s => s.type === 'vip').length,
        winback: suggestions.filter(s => s.type === 'winback').length
      },
      highUrgency: suggestions.filter(s => s.urgency === 'high').length
    }
    
    return c.json({ success: true, data: { suggestions, summary } })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Send follow-up message via Fonnte
aiRoutes.post('/closer/send', async (c) => {
  try {
    if (!c.env.FONNTE_TOKEN) return c.json({ success: false, message: 'Fonnte token belum dikonfigurasi' }, 400)
    
    const { store_id, db } = await getStoreData(c)
    const { phone, message, type } = await c.req.json()
    
    if (!phone || !message) return c.json({ success: false, message: 'phone & message wajib' }, 400)
    
    const res = await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: { 'Authorization': c.env.FONNTE_TOKEN },
      body: new URLSearchParams({ target: phone, message, countryCode: '62' })
    })
    const result: any = await res.json()
    
    // Log message
    try {
      await db.insert('wa_messages', {
        store_id,
        phone,
        message_type: type || 'closer_followup',
        message,
        status: result.status ? 'sent' : 'failed',
        fonnte_response: JSON.stringify(result)
      })
    } catch { /* non-critical */ }
    
    return c.json({ success: true, data: result, message: 'Pesan follow-up dikirim!' })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Get templates
aiRoutes.get('/closer/templates', async (c) => {
  const templates = [
    { id: 'thankyou', name: 'Thank You', icon: 'heart', color: 'pink', desc: 'Terima kasih + promo untuk customer baru', template: 'Halo {name}! Terima kasih udah belanja di {store}! 😊\nSemoga suka ya! Cek koleksi lainnya:\n{catalog_url}\nChat kami kalau mau order lagi! 💜' },
    { id: 'promo', name: 'Promo Spesial', icon: 'tag', color: 'amber', desc: 'Broadcast promo & diskon', template: 'Halo {name}! 🔥\n{store} lagi ada PROMO SPESIAL!\n\n[Tulis promo di sini]\n\n🛍️ Order: {catalog_url}\nBuruan sebelum kehabisan! 💜' },
    { id: 'newproduct', name: 'Produk Baru', icon: 'sparkles', color: 'purple', desc: 'Notifikasi koleksi/produk baru', template: 'Halo {name}! ✨\n{store} baru launching koleksi terbaru!\n\n[Nama produk/koleksi]\n\nCek langsung: {catalog_url}\nMau order? Chat kami ya! 💜' },
    { id: 'reengage', name: 'Re-Engage', icon: 'rotate', color: 'blue', desc: 'Ajak customer lama kembali', template: 'Halo {name}! 👋 Kangen nih!\nSudah lama nggak mampir ke {store}.\n\nKami ada banyak produk baru lho!\n🛍️ {catalog_url}\n\nYuk order lagi, ada diskon spesial! 💜' },
    { id: 'loyalty', name: 'Loyalty Reward', icon: 'crown', color: 'amber', desc: 'Apresiasi pelanggan setia', template: 'Halo {name}! 👑\nTerima kasih jadi pelanggan setia {store}!\n\nSebagai apresiasi, kamu dapat diskon 10% untuk order berikutnya.\nKode: LOYAL10\n\n🛍️ {catalog_url}\nChat kami untuk redeem! 💜' },
    { id: 'delivery', name: 'Update Pengiriman', icon: 'truck', color: 'cyan', desc: 'Info resi & tracking', template: 'Halo {name}! 📦\nPesanan dari {store} sudah dikirim!\n\nNo. Resi: [RESI]\nCek status: cekresi.com\n\nTerima kasih! 💜' }
  ]
  
  return c.json({ success: true, data: templates })
})
