// WhatsApp Automation Routes - FULL Fonnte API Integration
// FashionKas v1.2.1 - Deep dive Fonnte docs integration
// API Reference: https://docs.fonnte.com/api-send-message/
// Device Token: from env FONNTE_TOKEN
// Account Token: from env FONNTE_ACCOUNT_TOKEN

import { Hono } from 'hono'
import { createSupabaseClient, verifyJWT } from '../lib/supabase'

type Bindings = { 
  SUPABASE_URL: string; SUPABASE_SERVICE_KEY: string; JWT_SECRET: string; 
  FONNTE_TOKEN: string; FONNTE_ACCOUNT_TOKEN: string 
}

export const waRoutes = new Hono<{ Bindings: Bindings }>()

// ==========================================
// HELPER FUNCTIONS
// ==========================================

async function getStoreData(c: any): Promise<{ store_id: string; store: any; db: any }> {
  const auth = c.req.header('Authorization')
  if (!auth) throw new Error('No token')
  const payload = await verifyJWT(auth.replace('Bearer ', ''), c.env.JWT_SECRET)
  const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
  const stores = await db.query('stores', { eq: [['id', payload.store_id]], limit: 1 })
  if (!stores || stores.length === 0) throw new Error('Store not found')
  return { store_id: payload.store_id, store: stores[0], db }
}

function formatRupiah(n: number): string {
  return 'Rp ' + (n || 0).toLocaleString('id-ID')
}

function getDeviceToken(c: any): string {
  return c.env.FONNTE_TOKEN || ''
}

function getAccountToken(c: any): string {
  return c.env.FONNTE_ACCOUNT_TOKEN || ''
}

// Core Fonnte Send API - Full parameter support
// Docs: https://docs.fonnte.com/api-send-message/
async function fonnteSend(token: string, params: {
  target: string           // Required: phone number(s), comma separated, variable supported
  message?: string          // Optional: text message, supports variable {name} {var1}
  url?: string             // Optional: public URL for media (image/video/audio/file) - Super/Advanced/Ultra only
  filename?: string        // Optional: custom filename for file/audio
  schedule?: number        // Optional: unix timestamp for scheduled send
  delay?: string           // Optional: delay in seconds between targets (string! e.g. '2' or '2-10')
  countryCode?: string     // Optional: default '62', set '0' to disable replacement
  typing?: boolean         // Optional: show typing indicator
  followup?: number        // Optional: seconds before sending
  connectOnly?: boolean    // Optional: only send when device connected (default true)
  location?: string        // Optional: 'latitude,longitude'
  choices?: string         // Optional: poll choices, comma separated (min 2, max 12)
  select?: string          // Optional: 'single' or 'multiple' for poll
  pollname?: string        // Optional: poll name
  preview?: boolean        // Optional: link preview (default true)
  sequence?: boolean       // Optional: force sequential sending
  duration?: number        // Optional: custom typing duration in seconds
}): Promise<any> {
  const body = new URLSearchParams()
  body.append('target', params.target)
  if (params.message) body.append('message', params.message)
  if (params.url) body.append('url', params.url)
  if (params.filename) body.append('filename', params.filename)
  if (params.schedule) body.append('schedule', params.schedule.toString())
  if (params.delay) body.append('delay', params.delay)
  body.append('countryCode', params.countryCode || '62')
  if (params.typing !== undefined) body.append('typing', params.typing.toString())
  if (params.followup) body.append('followup', params.followup.toString())
  if (params.connectOnly !== undefined) body.append('connectOnly', params.connectOnly.toString())
  if (params.location) body.append('location', params.location)
  if (params.choices) body.append('choices', params.choices)
  if (params.select) body.append('select', params.select)
  if (params.pollname) body.append('pollname', params.pollname)
  if (params.preview !== undefined) body.append('preview', params.preview.toString())
  if (params.sequence !== undefined) body.append('sequence', params.sequence.toString())
  if (params.duration) body.append('duration', params.duration.toString())
  
  const res = await fetch('https://api.fonnte.com/send', {
    method: 'POST',
    headers: { 'Authorization': token },
    body
  })
  return res.json()
}

// Fonnte Send with Data parameter - for complex multi-message workflows
// Docs: https://docs.fonnte.com/api-send-message/#data
async function fonnteSendData(token: string, data: Array<{
  target: string; message?: string; url?: string; delay?: string; 
  typing?: boolean; countryCode?: string
}>): Promise<any> {
  const body = new URLSearchParams()
  body.append('data', JSON.stringify(data))
  
  const res = await fetch('https://api.fonnte.com/send', {
    method: 'POST',
    headers: { 'Authorization': token },
    body
  })
  return res.json()
}

// Fonnte Validate Number
// Docs: https://docs.fonnte.com/api-validate-number/
async function fonnteValidate(token: string, target: string, countryCode: string = '62'): Promise<any> {
  const res = await fetch('https://api.fonnte.com/validate', {
    method: 'POST',
    headers: { 'Authorization': token },
    body: new URLSearchParams({ target, countryCode })
  })
  return res.json()
}

// Fonnte Device Profile
// Docs: https://docs.fonnte.com/api-device-profile/
async function fonnteDeviceProfile(token: string): Promise<any> {
  const res = await fetch('https://api.fonnte.com/device', {
    method: 'POST',
    headers: { 'Authorization': token }
  })
  return res.json()
}

// Fonnte Get All Devices (Account Token)
// Docs: https://docs.fonnte.com/api-get-devices/
async function fonnteGetDevices(accountToken: string): Promise<any> {
  const res = await fetch('https://api.fonnte.com/get-devices', {
    method: 'POST',
    headers: { 'Authorization': accountToken }
  })
  return res.json()
}

async function logWaMessage(db: any, params: {
  store_id: string; order_id?: string; phone: string; 
  message_type: string; message: string; status: string; fonnte_response: any
}) {
  try {
    await db.insert('wa_messages', {
      store_id: params.store_id,
      ...(params.order_id ? { order_id: params.order_id } : {}),
      phone: params.phone,
      message_type: params.message_type,
      message: params.message,
      status: params.status,
      fonnte_response: JSON.stringify(params.fonnte_response)
    })
  } catch { /* non-critical logging */ }
}

// ==========================================
// DEVICE STATUS & INFO ENDPOINTS
// ==========================================

// GET /status - Device profile + connection status
waRoutes.get('/status', async (c) => {
  try {
    const token = getDeviceToken(c)
    if (!token) {
      return c.json({ success: true, data: { 
        connected: false, 
        message: 'Fonnte token belum dikonfigurasi',
        setup_guide: 'Masukkan Device Token di Settings > WhatsApp Automation'
      }})
    }
    
    const profile = await fonnteDeviceProfile(token)
    
    return c.json({ 
      success: true, 
      data: { 
        connected: profile.status && profile.device_status === 'connect',
        device: profile.device || null,
        device_status: profile.device_status || 'unknown',
        name: profile.name || null,
        package: profile.package || 'Unknown',
        quota: profile.quota || '0',
        messages: profile.messages || 0,
        expired: profile.expired || null,
        attachment: profile.attachment || false,
        raw: profile
      }
    })
  } catch (e: any) {
    return c.json({ success: true, data: { connected: false, message: e.message } })
  }
})

// GET /devices - All devices info (Account Token)
waRoutes.get('/devices', async (c) => {
  try {
    const accountToken = getAccountToken(c)
    if (!accountToken) {
      return c.json({ success: false, message: 'Account token belum dikonfigurasi' }, 400)
    }
    const devices = await fonnteGetDevices(accountToken)
    return c.json({ success: true, data: devices })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// POST /validate - Validate WhatsApp numbers
waRoutes.post('/validate', async (c) => {
  try {
    const token = getDeviceToken(c)
    if (!token) return c.json({ success: false, message: 'Fonnte token belum dikonfigurasi' }, 400)
    
    await getStoreData(c) // Auth check
    const { numbers } = await c.req.json()
    if (!numbers) return c.json({ success: false, message: 'numbers wajib (comma separated)' }, 400)
    
    const result = await fonnteValidate(token, numbers, '62')
    return c.json({ success: true, data: result })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// ==========================================
// SEND MESSAGE ENDPOINTS
// ==========================================

// POST /send-receipt - Send order receipt via WhatsApp
waRoutes.post('/send-receipt', async (c) => {
  try {
    const token = getDeviceToken(c)
    if (!token) return c.json({ success: false, message: 'Fonnte token belum dikonfigurasi. Setup di Settings > WhatsApp Automation.' }, 400)
    
    const { store_id, store, db } = await getStoreData(c)
    const { order_id } = await c.req.json()
    if (!order_id) return c.json({ success: false, message: 'order_id wajib' }, 400)
    
    const orders = await db.query('orders', { eq: [['id', order_id], ['store_id', store_id]], limit: 1 })
    if (!orders || orders.length === 0) return c.json({ success: false, message: 'Pesanan tidak ditemukan' }, 404)
    
    const order = orders[0]
    if (!order.customer_phone) return c.json({ success: false, message: 'Nomor pelanggan kosong' }, 400)
    
    const items = await db.query('order_items', { eq: [['order_id', order.id]] })
    
    // Build receipt message
    const itemLines = items.map((i: any) => {
      let line = `• ${i.product_name}`
      if (i.size) line += ` (${i.size})`
      if (i.color) line += ` [${i.color}]`
      line += ` x${i.quantity} = ${formatRupiah(i.subtotal)}`
      return line
    }).join('\n')
    
    const msg = `*🧾 ${store.name || 'FashionKas'} - Struk Pembelian*

No. Order: *${order.order_number}*
Tanggal: ${new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
${order.customer_name ? 'Customer: ' + order.customer_name : ''}

━━━━━━━━━━━━━━━
${itemLines}
━━━━━━━━━━━━━━━${order.discount > 0 ? '\nDiskon: -' + formatRupiah(order.discount) : ''}${order.shipping_cost > 0 ? '\nOngkir: +' + formatRupiah(order.shipping_cost) : ''}

*💰 Total: ${formatRupiah(order.total_amount)}*
Bayar: ${(order.payment_method || '').toUpperCase()}${order.payment_status === 'paid' ? ' ✅' : ' ⏳'}

Terima kasih sudah berbelanja di *${store.name}*! 🙏
Pertanyaan? Chat kami di sini ya 😊

🛍️ Katalog: https://fashionkas.pages.dev/catalog/${store.slug || ''}`

    const result = await fonnteSend(token, {
      target: order.customer_phone,
      message: msg,
      countryCode: '62',
      typing: true,
      duration: 2
    })
    
    await logWaMessage(db, {
      store_id, order_id: order.id, phone: order.customer_phone,
      message_type: 'receipt', message: msg,
      status: result.status ? 'sent' : 'failed',
      fonnte_response: result
    })
    
    return c.json({ 
      success: result.status !== false, 
      data: result, 
      message: result.status !== false ? 'Struk WA berhasil dikirim! 🎉' : `Gagal: ${result.reason || 'Unknown error'}`
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// POST /send-shipping - Send shipping notification with tracking
waRoutes.post('/send-shipping', async (c) => {
  try {
    const token = getDeviceToken(c)
    if (!token) return c.json({ success: false, message: 'Fonnte token belum dikonfigurasi' }, 400)
    
    const { store_id, store, db } = await getStoreData(c)
    const { order_id, tracking_number, courier } = await c.req.json()
    if (!order_id) return c.json({ success: false, message: 'order_id wajib' }, 400)
    
    const orders = await db.query('orders', { eq: [['id', order_id], ['store_id', store_id]], limit: 1 })
    if (!orders || orders.length === 0) return c.json({ success: false, message: 'Pesanan tidak ditemukan' }, 404)
    
    const order = orders[0]
    if (!order.customer_phone) return c.json({ success: false, message: 'Nomor pelanggan kosong' }, 400)
    
    const resi = tracking_number || order.tracking_number || ''
    const kurirName = courier || ''
    
    const msg = `*📦 ${store.name || 'FashionKas'} - Update Pengiriman*

Halo ${order.customer_name || 'Kakak'}! 👋

Pesanan *${order.order_number}* sudah dikirim! 🚚
${kurirName ? '\n📋 Kurir: *' + kurirName + '*' : ''}${resi ? '\n🔢 No. Resi: *' + resi + '*' : ''}
${resi ? '\n📍 Cek status pengiriman:\nhttps://cekresi.com/?noresi=' + encodeURIComponent(resi) : ''}

💰 Total Belanja: ${formatRupiah(order.total_amount)}

Terima kasih sudah belanja di *${store.name}*! 🛍️
Butuh bantuan? Chat kami di sini ya 😊`

    const result = await fonnteSend(token, {
      target: order.customer_phone,
      message: msg,
      countryCode: '62',
      typing: true,
      duration: 2
    })
    
    // Update order tracking & status
    if (tracking_number || courier) {
      const updateData: any = { shipping_status: 'shipped' }
      if (tracking_number) updateData.tracking_number = tracking_number
      await db.update('orders', order.id, updateData)
    }
    
    await logWaMessage(db, {
      store_id, order_id: order.id, phone: order.customer_phone,
      message_type: 'shipping', message: msg,
      status: result.status ? 'sent' : 'failed',
      fonnte_response: result
    })
    
    return c.json({ 
      success: result.status !== false, 
      data: result, 
      message: result.status !== false ? 'Notifikasi pengiriman WA dikirim! 📦' : `Gagal: ${result.reason || 'Unknown error'}`
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// POST /broadcast - Broadcast promo to customers
waRoutes.post('/broadcast', async (c) => {
  try {
    const token = getDeviceToken(c)
    if (!token) return c.json({ success: false, message: 'Fonnte token belum dikonfigurasi' }, 400)
    
    const { store_id, store, db } = await getStoreData(c)
    const { message, target_segment, image_url } = await c.req.json()
    if (!message) return c.json({ success: false, message: 'Pesan wajib diisi' }, 400)
    
    const customers = await db.query('customers', { eq: [['store_id', store_id]] })
    if (!customers || customers.length === 0) return c.json({ success: false, message: 'Belum ada customer' }, 400)
    
    let targets = customers.filter((c: any) => c.phone)
    if (target_segment && target_segment !== 'all') {
      targets = targets.filter((c: any) => c.segment === target_segment)
    }
    if (targets.length === 0) return c.json({ success: false, message: 'Tidak ada target dengan nomor WA' }, 400)
    
    const catalogUrl = `https://fashionkas.pages.dev/catalog/${store.slug || ''}`
    
    const fullMsg = `*${store.name}* 🛍️

${message}

📲 Lihat katalog: ${catalogUrl}
💬 Order langsung: Chat kami di sini!`
    
    // Fonnte supports comma-separated targets for bulk send
    const phoneList = targets.map((t: any) => t.phone).join(',')
    
    const sendParams: any = {
      target: phoneList,
      message: fullMsg,
      countryCode: '62',
      typing: true,
      delay: '2-5'  // Random 2-5 second delay between targets (string format per Fonnte docs)
    }
    
    // Add image if provided (only on paid plans with media support)
    if (image_url) {
      sendParams.url = image_url
    }
    
    const result = await fonnteSend(token, sendParams)
    
    await logWaMessage(db, {
      store_id, phone: phoneList,
      message_type: 'broadcast', message: fullMsg,
      status: result.status ? 'sent' : 'failed',
      fonnte_response: result
    })
    
    return c.json({ 
      success: result.status !== false, 
      data: { sent_to: targets.length, result }, 
      message: result.status !== false 
        ? `Broadcast dikirim ke ${targets.length} customer! 🎉` 
        : `Gagal: ${result.reason || 'Unknown error'}`
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// POST /send-custom - Send custom message to any number
waRoutes.post('/send-custom', async (c) => {
  try {
    const token = getDeviceToken(c)
    if (!token) return c.json({ success: false, message: 'Fonnte token belum dikonfigurasi' }, 400)
    
    const { store_id, db } = await getStoreData(c)
    const body = await c.req.json()
    const { phone, message, image_url, typing, schedule } = body
    
    if (!phone || !message) return c.json({ success: false, message: 'phone & message wajib' }, 400)
    
    const sendParams: any = {
      target: phone,
      message,
      countryCode: '62',
      typing: typing !== false,  // Default true
      duration: 2
    }
    if (image_url) sendParams.url = image_url
    if (schedule) sendParams.schedule = schedule
    
    const result = await fonnteSend(token, sendParams)
    
    await logWaMessage(db, {
      store_id, phone,
      message_type: 'custom', message,
      status: result.status ? 'sent' : 'failed',
      fonnte_response: result
    })
    
    return c.json({ 
      success: result.status !== false, 
      data: result, 
      message: result.status !== false ? 'Pesan WA dikirim!' : `Gagal: ${result.reason || 'Unknown error'}`
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// POST /send-multi - Send multi-step messages using Fonnte Data parameter
// Uses the data parameter for complex workflows (e.g. send image first, then text, then catalog link)
waRoutes.post('/send-multi', async (c) => {
  try {
    const token = getDeviceToken(c)
    if (!token) return c.json({ success: false, message: 'Fonnte token belum dikonfigurasi' }, 400)
    
    await getStoreData(c) // Auth check
    const { messages } = await c.req.json()
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return c.json({ success: false, message: 'messages array wajib' }, 400)
    }
    
    const result = await fonnteSendData(token, messages)
    return c.json({ success: result.status !== false, data: result })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// POST /send-poll - Send WhatsApp poll
waRoutes.post('/send-poll', async (c) => {
  try {
    const token = getDeviceToken(c)
    if (!token) return c.json({ success: false, message: 'Fonnte token belum dikonfigurasi' }, 400)
    
    await getStoreData(c) // Auth check
    const { phone, pollname, choices, select } = await c.req.json()
    
    if (!phone || !choices) return c.json({ success: false, message: 'phone & choices wajib' }, 400)
    
    const choicesArr = typeof choices === 'string' ? choices : choices.join(',')
    const choiceCount = choicesArr.split(',').length
    if (choiceCount < 2 || choiceCount > 12) {
      return c.json({ success: false, message: 'Pilihan harus 2-12 item' }, 400)
    }
    
    const result = await fonnteSend(token, {
      target: phone,
      pollname: pollname || 'FashionKas Poll',
      choices: choicesArr,
      select: select || 'single',
      countryCode: '62'
    })
    
    return c.json({ success: result.status !== false, data: result })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// POST /send-location - Send location via WhatsApp
waRoutes.post('/send-location', async (c) => {
  try {
    const token = getDeviceToken(c)
    if (!token) return c.json({ success: false, message: 'Fonnte token belum dikonfigurasi' }, 400)
    
    await getStoreData(c) // Auth check
    const { phone, latitude, longitude, message } = await c.req.json()
    
    if (!phone || !latitude || !longitude) return c.json({ success: false, message: 'phone, latitude, longitude wajib' }, 400)
    
    const result = await fonnteSend(token, {
      target: phone,
      message: message || '',
      location: `${latitude}, ${longitude}`,
      countryCode: '62'
    })
    
    return c.json({ success: result.status !== false, data: result })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// ==========================================
// HISTORY & ANALYTICS
// ==========================================

// GET /history - WA message history
waRoutes.get('/history', async (c) => {
  try {
    const { store_id, db } = await getStoreData(c)
    const messages = await db.query('wa_messages', {
      eq: [['store_id', store_id]],
      order: ['created_at', true],
      limit: 100
    })
    
    // Group stats
    const stats = {
      total: messages.length,
      sent: messages.filter((m: any) => m.status === 'sent').length,
      failed: messages.filter((m: any) => m.status === 'failed').length,
      byType: {} as Record<string, number>
    }
    messages.forEach((m: any) => {
      const t = m.message_type || 'unknown'
      stats.byType[t] = (stats.byType[t] || 0) + 1
    })
    
    return c.json({ success: true, data: { messages, stats } })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// GET /quota - Check remaining quota
waRoutes.get('/quota', async (c) => {
  try {
    const token = getDeviceToken(c)
    if (!token) return c.json({ success: false, message: 'Token belum dikonfigurasi' }, 400)
    
    const profile = await fonnteDeviceProfile(token)
    
    return c.json({ 
      success: true, 
      data: {
        quota: parseInt(profile.quota || '0'),
        messages: profile.messages || 0,
        package: profile.package || 'Unknown',
        expired: profile.expired || null,
        attachment: profile.attachment || false
      }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})
