// WhatsApp Automation Routes (Fonnte API)
// FashionKas v1.2 - Auto struk, shipping notif, broadcast
import { Hono } from 'hono'
import { createSupabaseClient, verifyJWT } from '../lib/supabase'

type Bindings = { SUPABASE_URL: string; SUPABASE_SERVICE_KEY: string; JWT_SECRET: string; FONNTE_TOKEN: string }

export const waRoutes = new Hono<{ Bindings: Bindings }>()

async function getStoreData(c: any): Promise<{ store_id: string; store: any }> {
  const auth = c.req.header('Authorization')
  if (!auth) throw new Error('No token')
  const payload = await verifyJWT(auth.replace('Bearer ', ''), c.env.JWT_SECRET)
  const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
  const stores = await db.query('stores', { eq: [['id', payload.store_id]], limit: 1 })
  if (!stores || stores.length === 0) throw new Error('Store not found')
  return { store_id: payload.store_id, store: stores[0] }
}

function formatRupiah(n: number): string {
  return 'Rp ' + (n || 0).toLocaleString('id-ID')
}

async function sendFonnte(token: string, target: string, message: string): Promise<any> {
  const res = await fetch('https://api.fonnte.com/send', {
    method: 'POST',
    headers: { 'Authorization': token },
    body: new URLSearchParams({ target, message, countryCode: '62' })
  })
  return res.json()
}

// Send order receipt via WhatsApp
waRoutes.post('/send-receipt', async (c) => {
  try {
    if (!c.env.FONNTE_TOKEN) return c.json({ success: false, message: 'Fonnte token belum dikonfigurasi. Setup di Settings > WhatsApp Automation.' }, 400)
    
    const { store_id, store } = await getStoreData(c)
    const { order_id } = await c.req.json()
    if (!order_id) return c.json({ success: false, message: 'order_id wajib' }, 400)
    
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    const orders = await db.query('orders', { eq: [['id', order_id], ['store_id', store_id]], limit: 1 })
    if (!orders || orders.length === 0) return c.json({ success: false, message: 'Pesanan tidak ditemukan' }, 404)
    
    const order = orders[0]
    if (!order.customer_phone) return c.json({ success: false, message: 'Nomor pelanggan kosong' }, 400)
    
    const items = await db.query('order_items', { eq: [['order_id', order.id]] })
    
    const msg = `*${store.name || 'FashionKas'} - Struk Pembelian*

No. Order: ${order.order_number}
Tanggal: ${new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}

${items.map((i: any) => `${i.product_name}${i.size ? ' ('+i.size+')' : ''}${i.color ? ' ['+i.color+']' : ''} x${i.quantity} = ${formatRupiah(i.subtotal)}`).join('\n')}
${order.discount > 0 ? '\nDiskon: -' + formatRupiah(order.discount) : ''}${order.shipping_cost > 0 ? '\nOngkir: +' + formatRupiah(order.shipping_cost) : ''}

*Total: ${formatRupiah(order.total_amount)}*
Bayar: ${order.payment_method?.toUpperCase()}

Terima kasih sudah berbelanja di ${store.name}! 🙏
Pertanyaan? Chat kami di ${store.owner_phone || 'WhatsApp ini'}`

    const result = await sendFonnte(c.env.FONNTE_TOKEN, order.customer_phone, msg)
    
    // Log WA message
    try {
      await db.insert('wa_messages', {
        store_id,
        order_id: order.id,
        phone: order.customer_phone,
        message_type: 'receipt',
        message: msg,
        status: result.status ? 'sent' : 'failed',
        fonnte_response: JSON.stringify(result)
      })
    } catch { /* non-critical */ }
    
    return c.json({ success: true, data: result, message: 'Struk WA berhasil dikirim!' })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Send shipping notification
waRoutes.post('/send-shipping', async (c) => {
  try {
    if (!c.env.FONNTE_TOKEN) return c.json({ success: false, message: 'Fonnte token belum dikonfigurasi' }, 400)
    
    const { store_id, store } = await getStoreData(c)
    const { order_id, tracking_number, courier } = await c.req.json()
    if (!order_id) return c.json({ success: false, message: 'order_id wajib' }, 400)
    
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    const orders = await db.query('orders', { eq: [['id', order_id], ['store_id', store_id]], limit: 1 })
    if (!orders || orders.length === 0) return c.json({ success: false, message: 'Pesanan tidak ditemukan' }, 404)
    
    const order = orders[0]
    if (!order.customer_phone) return c.json({ success: false, message: 'Nomor pelanggan kosong' }, 400)
    
    const resi = tracking_number || order.tracking_number || ''
    
    const msg = `*${store.name || 'FashionKas'} - Update Pengiriman* 📦

Halo ${order.customer_name}!

Pesanan *${order.order_number}* sudah dikirim! 🚚
${courier ? '\nKurir: ' + courier : ''}${resi ? '\nNo. Resi: *' + resi + '*' : ''}
${resi ? '\nCek status: https://cekresi.com/?noresi=' + encodeURIComponent(resi) : ''}

Total Belanja: ${formatRupiah(order.total_amount)}

Terima kasih sudah belanja di ${store.name}! 🛍️
Butuh bantuan? Chat kami di sini ya 😊`

    const result = await sendFonnte(c.env.FONNTE_TOKEN, order.customer_phone, msg)
    
    // Update order tracking if provided
    if (tracking_number) {
      await db.update('orders', order.id, { tracking_number, shipping_status: 'shipped' })
    }
    
    try {
      await db.insert('wa_messages', {
        store_id,
        order_id: order.id,
        phone: order.customer_phone,
        message_type: 'shipping',
        message: msg,
        status: result.status ? 'sent' : 'failed',
        fonnte_response: JSON.stringify(result)
      })
    } catch { /* non-critical */ }
    
    return c.json({ success: true, data: result, message: 'Notifikasi pengiriman WA dikirim!' })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Broadcast promo to all customers
waRoutes.post('/broadcast', async (c) => {
  try {
    if (!c.env.FONNTE_TOKEN) return c.json({ success: false, message: 'Fonnte token belum dikonfigurasi' }, 400)
    
    const { store_id, store } = await getStoreData(c)
    const { message, target_segment } = await c.req.json()
    if (!message) return c.json({ success: false, message: 'Pesan wajib diisi' }, 400)
    
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    
    // Get customers
    const filter: any = { eq: [['store_id', store_id]] }
    const customers = await db.query('customers', filter)
    
    if (!customers || customers.length === 0) return c.json({ success: false, message: 'Belum ada customer' }, 400)
    
    // Filter by segment if specified
    let targets = customers.filter((c: any) => c.phone)
    if (target_segment && target_segment !== 'all') {
      targets = targets.filter((c: any) => c.segment === target_segment)
    }
    
    if (targets.length === 0) return c.json({ success: false, message: 'Tidak ada target dengan nomor WA' }, 400)
    
    const catalogUrl = `https://fashionkas.pages.dev/catalog/${store.slug}`
    const fullMsg = `*${store.name}*\n\n${message}\n\n🛍️ Lihat katalog: ${catalogUrl}\n📱 Order via WA: ${store.owner_phone || 'link di atas'}`
    
    // Send to all targets (Fonnte supports comma-separated targets)
    const phoneList = targets.map((t: any) => t.phone).join(',')
    const result = await sendFonnte(c.env.FONNTE_TOKEN, phoneList, fullMsg)
    
    try {
      await db.insert('wa_messages', {
        store_id,
        phone: phoneList,
        message_type: 'broadcast',
        message: fullMsg,
        status: result.status ? 'sent' : 'failed',
        fonnte_response: JSON.stringify(result)
      })
    } catch { /* non-critical */ }
    
    return c.json({ success: true, data: { sent_to: targets.length, result }, message: `Broadcast dikirim ke ${targets.length} customer!` })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Get WA message history
waRoutes.get('/history', async (c) => {
  try {
    const { store_id } = await getStoreData(c)
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    const messages = await db.query('wa_messages', {
      eq: [['store_id', store_id]],
      order: ['created_at', true],
      limit: 50
    })
    return c.json({ success: true, data: messages })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Check Fonnte status
waRoutes.get('/status', async (c) => {
  try {
    if (!c.env.FONNTE_TOKEN) {
      return c.json({ success: true, data: { connected: false, message: 'Token belum dikonfigurasi' } })
    }
    const res = await fetch('https://api.fonnte.com/device', {
      method: 'POST',
      headers: { 'Authorization': c.env.FONNTE_TOKEN }
    })
    const data = await res.json()
    return c.json({ success: true, data: { connected: data.status || false, device: data } })
  } catch (e: any) {
    return c.json({ success: true, data: { connected: false, message: e.message } })
  }
})
