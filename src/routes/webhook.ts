// Fonnte Webhook Handler - Auto-Reply Bot + CLI Commands
// FashionKas v2.0 - FULL WhatsApp Bot Integration
// Webhook URL: https://fashionkas.pages.dev/api/webhook/incoming
// Fonnte docs: https://docs.fonnte.com
//
// SETUP DI FONNTE:
// 1. Device > Edit > Webhook: https://fashionkas.pages.dev/api/webhook/incoming
// 2. Webhook Connect: https://fashionkas.pages.dev/api/webhook/incoming
// 3. Webhook Message Status: https://fashionkas.pages.dev/api/webhook/status
// 4. autoread: ON
// 5. Response Source: Autoreply
// 6. Personal: ON (autoreply to individual)
// 7. Group: ON (autoreply to group)

import { Hono } from 'hono'
import { createSupabaseClient } from '../lib/supabase'

type Bindings = {
  SUPABASE_URL: string
  SUPABASE_SERVICE_KEY: string
  FONNTE_TOKEN: string
  FONNTE_ACCOUNT_TOKEN: string
}

export const webhookRoutes = new Hono<{ Bindings: Bindings }>()

// ==========================================
// FONNTE SEND HELPER
// ==========================================
async function sendReply(token: string, target: string, message: string, options?: {
  url?: string; typing?: boolean; duration?: number
}): Promise<any> {
  const body = new URLSearchParams()
  body.append('target', target)
  body.append('message', message)
  body.append('countryCode', '62')
  body.append('typing', (options?.typing !== false).toString())
  body.append('duration', (options?.duration || 2).toString())
  if (options?.url) body.append('url', options.url)

  const res = await fetch('https://api.fonnte.com/send', {
    method: 'POST',
    headers: { 'Authorization': token },
    body
  })
  return res.json()
}

// ==========================================
// HELPER: Get store data from phone number
// ==========================================
async function findStoreByPhone(db: any, phone: string): Promise<any> {
  // Try to find a store owner matching this phone
  const stores = await db.query('stores', { limit: 10 })
  // Return first store (single-tenant mode for now)
  return stores?.[0] || null
}

async function getProducts(db: any, storeId: string, category?: string): Promise<any[]> {
  const products = await db.query('products', {
    eq: category
      ? [['store_id', storeId], ['is_active', true], ['category', category]]
      : [['store_id', storeId], ['is_active', true]],
    order: ['total_sold', true],
    limit: 20
  })
  return products || []
}

function formatRupiah(n: number): string {
  return 'Rp ' + (n || 0).toLocaleString('id-ID')
}

// ==========================================
// COMMAND PARSER
// ==========================================
interface ParsedCommand {
  command: string
  args: string[]
  rawArgs: string
}

function parseCommand(message: string): ParsedCommand {
  const trimmed = message.trim()
  const parts = trimmed.split(/\s+/)
  const command = (parts[0] || '').toUpperCase()
  const args = parts.slice(1)
  const rawArgs = parts.slice(1).join(' ')
  return { command, args, rawArgs }
}

// ==========================================
// COMMAND HANDLERS
// ==========================================

function helpMessage(storeName: string): string {
  return `*🤖 ${storeName} - Bot WhatsApp*

Hai! Selamat datang di *${storeName}*! 
Ketik salah satu perintah di bawah:

📋 *PERINTAH UTAMA:*
▫️ *HELP* - Menu bantuan ini
▫️ *KATALOG* - Lihat semua produk
▫️ *HARGA* - Daftar harga
▫️ *KATEGORI* - Lihat per kategori
▫️ *CARI [nama]* - Cari produk
▫️ *ORDER [produk]* - Pesan produk
▫️ *CEK [no order]* - Cek status pesanan

📍 *INFO TOKO:*
▫️ *INFO* - Info toko & kontak
▫️ *JAM* - Jam operasional
▫️ *PROMO* - Promo terbaru

🔧 *ADMIN (Owner Only):*
▫️ *STOK* - Lihat stok rendah
▫️ *LAPORAN* - Ringkasan hari ini
▫️ *OMZET* - Omzet bulan ini
▫️ *AUDIT* - Full audit toko

💜 Powered by FashionKas`
}

async function catalogMessage(db: any, store: any): Promise<string> {
  const products = await getProducts(db, store.id)
  if (products.length === 0) {
    return `*📦 ${store.name} - Katalog*\n\nBelum ada produk. Stay tuned! 😊\n\n💜 ${store.name}`
  }

  let msg = `*🛍️ ${store.name} - Katalog Digital*\n\n`
  
  // Group by category
  const grouped: Record<string, any[]> = {}
  products.forEach((p: any) => {
    const cat = p.category || 'lainnya'
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(p)
  })

  const catEmojis: Record<string, string> = {
    gamis: '👗', hijab: '🧕', daster: '👘', kemeja: '👔',
    rok: '👗', celana: '👖', aksesoris: '💍', lainnya: '📦'
  }

  for (const [cat, prods] of Object.entries(grouped)) {
    msg += `${catEmojis[cat] || '📦'} *${cat.toUpperCase()}*\n`
    prods.slice(0, 5).forEach((p: any) => {
      const sizeInfo = p.sizes && Array.isArray(p.sizes) && p.sizes.length > 0
        ? ` (${p.sizes.join(',')})` : ''
      const stockInfo = p.stock <= 3 ? ' ⚠️ Sisa ' + p.stock : ''
      msg += `  • ${p.name}${sizeInfo}\n    💰 ${formatRupiah(p.price)}${stockInfo}\n`
    })
    msg += '\n'
  }

  msg += `📲 *Lihat katalog lengkap:*\nhttps://fashionkas.pages.dev/catalog/${store.slug}\n\n`
  msg += `Mau order? Ketik: *ORDER [nama produk]*\nAtau chat langsung ke kami! 💬\n\n💜 ${store.name}`

  return msg
}

async function priceListMessage(db: any, store: any): Promise<string> {
  const products = await getProducts(db, store.id)
  if (products.length === 0) return `*${store.name}*\n\nBelum ada daftar harga. 😊`

  let msg = `*💰 ${store.name} - Daftar Harga*\n━━━━━━━━━━━━━━━\n\n`

  products.forEach((p: any) => {
    msg += `▫️ ${p.name} — *${formatRupiah(p.price)}*\n`
  })

  msg += `\n━━━━━━━━━━━━━━━\n📲 Katalog: https://fashionkas.pages.dev/catalog/${store.slug}\n\n💜 ${store.name}`
  return msg
}

async function searchProduct(db: any, store: any, query: string): Promise<string> {
  if (!query) return `Ketik: *CARI [nama produk]*\nContoh: CARI gamis tie dye`

  const products = await getProducts(db, store.id)
  const q = query.toLowerCase()
  const results = products.filter((p: any) =>
    p.name.toLowerCase().includes(q) ||
    (p.category || '').toLowerCase().includes(q) ||
    (p.description || '').toLowerCase().includes(q)
  )

  if (results.length === 0) {
    return `*🔍 Hasil Pencarian: "${query}"*\n\nMaaf, produk tidak ditemukan 😔\n\nCoba kata kunci lain atau ketik *KATALOG* untuk lihat semua produk.\n\n💜 ${store.name}`
  }

  let msg = `*🔍 Hasil Pencarian: "${query}"*\nDitemukan ${results.length} produk:\n\n`
  results.slice(0, 10).forEach((p: any) => {
    msg += `▫️ *${p.name}* — ${formatRupiah(p.price)}\n`
    if (p.sizes?.length > 0) msg += `   Ukuran: ${Array.isArray(p.sizes) ? p.sizes.join(', ') : p.sizes}\n`
    if (p.stock !== undefined) msg += `   Stok: ${p.stock > 0 ? p.stock : 'HABIS ❌'}\n`
    msg += '\n'
  })

  msg += `Mau order? Ketik: *ORDER ${results[0].name}*\n\n💜 ${store.name}`
  return msg
}

async function orderMessage(store: any, productName: string): Promise<string> {
  if (!productName) {
    return `Ketik: *ORDER [nama produk]*\nContoh: ORDER gamis tie dye\n\nAtau langsung klik "Pesan" di katalog:\nhttps://fashionkas.pages.dev/catalog/${store.slug}`
  }

  return `*🛒 Order Request*\n\nProduk: *${productName}*\nToko: ${store.name}\n\n✅ Pesanan kamu sudah kami terima!\n\nAdmin akan segera follow-up untuk:\n📐 Konfirmasi ukuran & warna\n💰 Total + ongkir\n💳 Cara pembayaran\n\nMohon tunggu sebentar ya! 🙏\n\n📲 Katalog: https://fashionkas.pages.dev/catalog/${store.slug}\n\n💜 ${store.name}`
}

async function checkOrderStatus(db: any, store: any, orderQuery: string): Promise<string> {
  if (!orderQuery) return `Ketik: *CEK [nomor order]*\nContoh: CEK FK-20260318-AB12`

  const orders = await db.query('orders', {
    eq: [['store_id', store.id]],
    order: ['created_at', true],
    limit: 50
  })

  const order = orders.find((o: any) =>
    o.order_number?.toUpperCase().includes(orderQuery.toUpperCase()) ||
    o.customer_phone?.includes(orderQuery)
  )

  if (!order) {
    return `*📦 Cek Pesanan: "${orderQuery}"*\n\nPesanan tidak ditemukan 😔\n\nPastikan nomor order benar.\nContoh: *CEK FK-20260318-AB12*\n\n💜 ${store.name}`
  }

  const statusEmoji: Record<string, string> = {
    pending: '⏳', processing: '🔄', shipped: '🚚', delivered: '✅', cancelled: '❌'
  }
  const statusLabel: Record<string, string> = {
    pending: 'Menunggu', processing: 'Diproses', shipped: 'Dikirim', delivered: 'Selesai', cancelled: 'Dibatalkan'
  }

  let msg = `*📦 Status Pesanan*\n━━━━━━━━━━━━━━━\n\n`
  msg += `No. Order: *${order.order_number}*\n`
  msg += `Customer: ${order.customer_name || '-'}\n`
  msg += `Total: *${formatRupiah(order.total_amount)}*\n`
  msg += `Bayar: ${(order.payment_method || '-').toUpperCase()} ${order.payment_status === 'paid' ? '✅' : '⏳'}\n\n`
  msg += `${statusEmoji[order.shipping_status] || '📦'} Status: *${statusLabel[order.shipping_status] || order.shipping_status}*\n`
  
  if (order.tracking_number) {
    msg += `\n📋 No. Resi: *${order.tracking_number}*\n`
    msg += `📍 Track: https://cekresi.com/?noresi=${encodeURIComponent(order.tracking_number)}\n`
  }

  msg += `\nTanggal: ${new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}\n\n💜 ${store.name}`
  return msg
}

async function categoryMessage(db: any, store: any, category?: string): Promise<string> {
  const products = await getProducts(db, store.id, category?.toLowerCase())

  if (category && products.length > 0) {
    let msg = `*${category.toUpperCase()} - ${store.name}*\n\n`
    products.forEach((p: any) => {
      msg += `▫️ *${p.name}* — ${formatRupiah(p.price)}\n`
      if (p.sizes?.length > 0) msg += `   Ukuran: ${Array.isArray(p.sizes) ? p.sizes.join(', ') : p.sizes}\n`
      msg += `   Stok: ${p.stock > 0 ? p.stock : 'HABIS ❌'}\n\n`
    })
    msg += `📲 Katalog: https://fashionkas.pages.dev/catalog/${store.slug}\n💜 ${store.name}`
    return msg
  }

  const allProducts = await getProducts(db, store.id)
  const categories: Record<string, number> = {}
  allProducts.forEach((p: any) => {
    const cat = p.category || 'lainnya'
    categories[cat] = (categories[cat] || 0) + 1
  })

  let msg = `*📂 Kategori Produk - ${store.name}*\n\n`
  const catEmojis: Record<string, string> = {
    gamis: '👗', hijab: '🧕', daster: '👘', kemeja: '👔',
    rok: '👗', celana: '👖', aksesoris: '💍', lainnya: '📦'
  }

  for (const [cat, count] of Object.entries(categories)) {
    msg += `${catEmojis[cat] || '📦'} *${cat.toUpperCase()}* (${count} produk)\n`
  }

  msg += `\nKetik: *KATEGORI [nama]*\nContoh: KATEGORI gamis\n\n💜 ${store.name}`
  return msg
}

function storeInfoMessage(store: any): string {
  return `*ℹ️ Info Toko*
━━━━━━━━━━━━━━━

🏪 *${store.name}*
${store.description || 'Toko Fashion Online'}

👤 Owner: ${store.owner_name || '-'}
📱 WA: ${store.owner_phone || '-'}
📍 Kota: ${store.city || '-'}

📲 Katalog: https://fashionkas.pages.dev/catalog/${store.slug}

💜 Powered by FashionKas`
}

// ==========================================
// ADMIN COMMANDS (Owner-only)
// ==========================================

async function stockAlertMessage(db: any, store: any): Promise<string> {
  const products = await db.query('products', { eq: [['store_id', store.id], ['is_active', true]] })
  
  const lowStock = products.filter((p: any) => p.stock > 0 && p.stock <= 5)
  const outOfStock = products.filter((p: any) => p.stock === 0)
  
  let msg = `*📊 Stok Alert - ${store.name}*\n━━━━━━━━━━━━━━━\n\n`

  if (outOfStock.length > 0) {
    msg += `❌ *HABIS (${outOfStock.length}):*\n`
    outOfStock.forEach((p: any) => { msg += `  • ${p.name}\n` })
    msg += '\n'
  }

  if (lowStock.length > 0) {
    msg += `⚠️ *MENIPIS (${lowStock.length}):*\n`
    lowStock.forEach((p: any) => { msg += `  • ${p.name} — Sisa ${p.stock}\n` })
    msg += '\n'
  }

  if (outOfStock.length === 0 && lowStock.length === 0) {
    msg += '✅ Semua stok aman! 👍\n\n'
  }

  msg += `Total produk: ${products.length}\n💜 FashionKas`
  return msg
}

async function todayReportMessage(db: any, store: any): Promise<string> {
  const today = new Date().toISOString().slice(0, 10)
  const orders = await db.query('orders', { eq: [['store_id', store.id]], order: ['created_at', true] })
  const todayOrders = orders.filter((o: any) => o.created_at?.startsWith(today))

  const revenue = todayOrders.reduce((s: number, o: any) => s + (o.total_amount || 0), 0)
  const profit = todayOrders.reduce((s: number, o: any) => s + (o.total_profit || 0), 0)

  let msg = `*📊 Laporan Hari Ini - ${store.name}*\n`
  msg += `📅 ${new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}\n`
  msg += `━━━━━━━━━━━━━━━\n\n`
  msg += `💰 Pendapatan: *${formatRupiah(revenue)}*\n`
  msg += `📈 Profit: *${formatRupiah(profit)}*\n`
  msg += `📦 Pesanan: *${todayOrders.length}*\n`

  if (todayOrders.length > 0) {
    msg += `\n📝 Detail:\n`
    todayOrders.slice(0, 10).forEach((o: any) => {
      msg += `  • ${o.customer_name || 'Walk-in'} — ${formatRupiah(o.total_amount)} (${o.payment_method})\n`
    })
  }

  msg += `\n💜 FashionKas`
  return msg
}

async function monthlyOmzetMessage(db: any, store: any): Promise<string> {
  const now = new Date()
  const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const orders = await db.query('orders', { eq: [['store_id', store.id]], order: ['created_at', true] })
  const monthOrders = orders.filter((o: any) => o.created_at?.startsWith(monthStart))

  const revenue = monthOrders.reduce((s: number, o: any) => s + (o.total_amount || 0), 0)
  const profit = monthOrders.reduce((s: number, o: any) => s + (o.total_profit || 0), 0)
  const customers = await db.query('customers', { eq: [['store_id', store.id]] })

  let msg = `*📊 Omzet Bulan Ini - ${store.name}*\n`
  msg += `📅 ${now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}\n`
  msg += `━━━━━━━━━━━━━━━\n\n`
  msg += `💰 Revenue: *${formatRupiah(revenue)}*\n`
  msg += `📈 Profit: *${formatRupiah(profit)}*\n`
  msg += `📦 Pesanan: *${monthOrders.length}*\n`
  msg += `👥 Total Customer: *${customers.length}*\n`
  msg += `📊 Avg. Order: *${formatRupiah(monthOrders.length > 0 ? Math.round(revenue / monthOrders.length) : 0)}*\n`

  // Payment breakdown
  const payments: Record<string, { count: number; total: number }> = {}
  monthOrders.forEach((o: any) => {
    const m = o.payment_method || 'other'
    if (!payments[m]) payments[m] = { count: 0, total: 0 }
    payments[m].count++
    payments[m].total += o.total_amount || 0
  })

  if (Object.keys(payments).length > 0) {
    msg += `\n💳 Metode Bayar:\n`
    for (const [method, data] of Object.entries(payments)) {
      msg += `  • ${method.toUpperCase()}: ${data.count}x — ${formatRupiah(data.total)}\n`
    }
  }

  msg += `\n💜 FashionKas`
  return msg
}

async function fullAuditMessage(db: any, store: any): Promise<string> {
  const products = await db.query('products', { eq: [['store_id', store.id]] })
  const orders = await db.query('orders', { eq: [['store_id', store.id]], order: ['created_at', true] })
  const customers = await db.query('customers', { eq: [['store_id', store.id]] })

  const now = new Date()
  const today = now.toISOString().slice(0, 10)
  const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  const todayOrders = orders.filter((o: any) => o.created_at?.startsWith(today))
  const monthOrders = orders.filter((o: any) => o.created_at?.startsWith(monthStart))

  const sum = (arr: any[], f: string) => arr.reduce((s: number, o: any) => s + (o[f] || 0), 0)

  const activeProducts = products.filter((p: any) => p.is_active)
  const outOfStock = activeProducts.filter((p: any) => p.stock === 0)
  const lowStock = activeProducts.filter((p: any) => p.stock > 0 && p.stock <= 5)
  const topProducts = [...products].sort((a: any, b: any) => (b.total_sold || 0) - (a.total_sold || 0)).slice(0, 5)

  let msg = `*🔍 FULL AUDIT - ${store.name}*\n`
  msg += `📅 ${now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}\n`
  msg += `━━━━━━━━━━━━━━━━━━━━\n\n`

  msg += `*📊 HARI INI:*\n`
  msg += `  Revenue: ${formatRupiah(sum(todayOrders, 'total_amount'))}\n`
  msg += `  Profit: ${formatRupiah(sum(todayOrders, 'total_profit'))}\n`
  msg += `  Pesanan: ${todayOrders.length}\n\n`

  msg += `*📊 BULAN INI:*\n`
  msg += `  Revenue: ${formatRupiah(sum(monthOrders, 'total_amount'))}\n`
  msg += `  Profit: ${formatRupiah(sum(monthOrders, 'total_profit'))}\n`
  msg += `  Pesanan: ${monthOrders.length}\n\n`

  msg += `*📊 ALL TIME:*\n`
  msg += `  Revenue: ${formatRupiah(sum(orders, 'total_amount'))}\n`
  msg += `  Profit: ${formatRupiah(sum(orders, 'total_profit'))}\n`
  msg += `  Total Pesanan: ${orders.length}\n`
  msg += `  Total Customer: ${customers.length}\n\n`

  msg += `*🏪 PRODUK:*\n`
  msg += `  Total: ${products.length} (Aktif: ${activeProducts.length})\n`
  msg += `  Habis: ${outOfStock.length} ❌\n`
  msg += `  Menipis: ${lowStock.length} ⚠️\n\n`

  if (topProducts.length > 0) {
    msg += `*🔥 TOP 5 TERLARIS:*\n`
    topProducts.forEach((p: any, i: number) => {
      msg += `  ${i + 1}. ${p.name} (${p.total_sold || 0}x)\n`
    })
    msg += '\n'
  }

  if (outOfStock.length > 0) {
    msg += `*❌ PERLU RESTOCK:*\n`
    outOfStock.forEach((p: any) => { msg += `  • ${p.name}\n` })
    msg += '\n'
  }

  msg += `📲 Dashboard: https://fashionkas.pages.dev/fashionkas/dashboard\n`
  msg += `📲 Katalog: https://fashionkas.pages.dev/catalog/${store.slug}\n\n`
  msg += `💜 FashionKas Audit System`

  return msg
}

// ==========================================
// MAIN WEBHOOK HANDLER - Incoming Messages
// ==========================================

// POST /incoming - Fonnte sends incoming WhatsApp messages here
// Fonnte webhook payload:
// {
//   sender: "628xxxxxxxxxx",     // sender phone number
//   message: "HELP",             // message text
//   member: "",                  // group member (if group message)
//   device: "628xxxxxxxxxx",     // your device number
//   url: "",                     // attachment URL (if any)
//   filename: "",                // attachment filename
//   extension: "",               // attachment extension
//   is_group: false,             // is group message
//   group_name: "",              // group name (if group)
//   reply_id: "",                // message ID being replied to
//   forwarded: false             // is forwarded message
// }
webhookRoutes.post('/incoming', async (c) => {
  try {
    const token = c.env.FONNTE_TOKEN
    if (!token) {
      return c.json({ status: true, message: 'No Fonnte token configured' })
    }

    // Parse webhook body - Fonnte sends form-encoded or JSON
    let sender = '', message = '', device = '', isGroup = false, member = ''
    
    const contentType = c.req.header('Content-Type') || ''
    if (contentType.includes('application/json')) {
      const body = await c.req.json()
      sender = body.sender || ''
      message = body.message || ''
      device = body.device || ''
      isGroup = body.is_group || false
      member = body.member || ''
    } else {
      // Form-encoded
      const formData = await c.req.parseBody()
      sender = (formData.sender as string) || ''
      message = (formData.message as string) || ''
      device = (formData.device as string) || ''
      isGroup = formData.is_group === 'true' || formData.is_group === true
      member = (formData.member as string) || ''
    }

    // Don't reply to self
    if (!sender || sender === device || !message) {
      return c.json({ status: true })
    }

    // Connect to Supabase
    const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
    const store = await findStoreByPhone(db, sender)

    if (!store) {
      // No store found, send generic welcome
      await sendReply(token, sender, `Halo! 👋\n\nSelamat datang di *FashionKas*!\nMaaf, toko belum terdaftar.\n\nDaftar gratis di:\nhttps://fashionkas.pages.dev/register\n\n💜 FashionKas`)
      return c.json({ status: true })
    }

    // Determine if sender is store owner (admin)
    const isOwner = sender.includes(store.owner_phone?.replace(/^0/, '62')?.replace(/^\+/, '') || 'NOMATCH')
      || store.owner_phone?.replace(/^0/, '')?.replace(/^\+62/, '') === sender.replace(/^62/, '')

    // Parse command
    const { command, rawArgs } = parseCommand(message)

    let reply = ''

    switch (command) {
      // Customer Commands
      case 'HELP':
      case 'MENU':
      case 'HI':
      case 'HALO':
      case 'HAI':
      case 'START':
        reply = helpMessage(store.name)
        break

      case 'KATALOG':
      case 'CATALOG':
      case 'PRODUK':
      case 'PRODUCT':
        reply = await catalogMessage(db, store)
        break

      case 'HARGA':
      case 'PRICE':
      case 'PRICELIST':
        reply = await priceListMessage(db, store)
        break

      case 'CARI':
      case 'SEARCH':
      case 'FIND':
        reply = await searchProduct(db, store, rawArgs)
        break

      case 'ORDER':
      case 'PESAN':
      case 'BELI':
      case 'BUY':
        reply = await orderMessage(store, rawArgs)
        break

      case 'CEK':
      case 'CHECK':
      case 'STATUS':
      case 'TRACK':
        reply = await checkOrderStatus(db, store, rawArgs)
        break

      case 'KATEGORI':
      case 'CATEGORY':
      case 'CAT':
        reply = await categoryMessage(db, store, rawArgs || undefined)
        break

      case 'INFO':
      case 'TOKO':
      case 'STORE':
        reply = storeInfoMessage(store)
        break

      case 'JAM':
        reply = `*🕐 Jam Operasional*\n\n${store.name}\nSenin - Sabtu: 09:00 - 21:00\nMinggu: 10:00 - 20:00\n\nChat kami kapan saja, bot auto-reply 24/7! 🤖\n\n💜 ${store.name}`
        break

      case 'PROMO':
      case 'DISKON':
      case 'SALE':
        reply = `*🔥 Promo Terbaru - ${store.name}*\n\n🎉 BETA GRATIS - Semua fitur Pro terbuka!\n\n📲 Cek katalog: https://fashionkas.pages.dev/catalog/${store.slug}\n\nChat kami untuk info promo lebih lanjut!\n\n💜 ${store.name}`
        break

      // Admin Commands (Owner-only)
      case 'STOK':
      case 'STOCK':
        if (isOwner) {
          reply = await stockAlertMessage(db, store)
        } else {
          reply = `Perintah ini hanya untuk admin toko. 🔒`
        }
        break

      case 'LAPORAN':
      case 'REPORT':
      case 'LAP':
        if (isOwner) {
          reply = await todayReportMessage(db, store)
        } else {
          reply = `Perintah ini hanya untuk admin toko. 🔒`
        }
        break

      case 'OMZET':
      case 'REVENUE':
      case 'INCOME':
        if (isOwner) {
          reply = await monthlyOmzetMessage(db, store)
        } else {
          reply = `Perintah ini hanya untuk admin toko. 🔒`
        }
        break

      case 'AUDIT':
      case 'FULLAUDIT':
      case 'REPORT-FULL':
        if (isOwner) {
          reply = await fullAuditMessage(db, store)
        } else {
          reply = `Perintah ini hanya untuk admin toko. 🔒`
        }
        break

      default:
        // Default response for unrecognized commands
        reply = `Halo! 👋 Selamat datang di *${store.name}*!\n\nKetik *HELP* untuk lihat semua perintah.\nKetik *KATALOG* untuk lihat produk.\nKetik *HARGA* untuk daftar harga.\n\n📲 Katalog: https://fashionkas.pages.dev/catalog/${store.slug}\n\n💜 ${store.name}`
        break
    }

    // Send reply
    if (reply) {
      await sendReply(token, sender, reply)

      // Log to database
      try {
        await db.insert('wa_messages', {
          store_id: store.id,
          phone: sender,
          message_type: 'bot_reply',
          message: `[${command}] ${reply.substring(0, 200)}...`,
          status: 'sent',
          fonnte_response: JSON.stringify({ incoming: message, command, isOwner })
        })
      } catch { /* non-critical */ }
    }

    // MUST return 200 with status true, otherwise Fonnte retries 15x
    return c.json({ status: true })
  } catch (e: any) {
    console.error('Webhook error:', e.message)
    // Still return 200 to prevent Fonnte retry loop
    return c.json({ status: true, error: e.message })
  }
})

// POST /status - Message delivery status webhook
// Fonnte sends delivery status updates here
webhookRoutes.post('/status', async (c) => {
  // Just acknowledge - we can add logging later
  return c.json({ status: true })
})

// GET /incoming - Health check (Fonnte also sends GET to verify)
webhookRoutes.get('/incoming', (c) => {
  return c.json({ 
    status: true, 
    app: 'FashionKas', 
    version: '2.0',
    webhook: 'active',
    message: 'Fonnte webhook is ready! Set this URL in your Fonnte device settings.'
  })
})

// GET /status - Health check for status webhook
webhookRoutes.get('/status', (c) => {
  return c.json({ status: true, type: 'message_status_webhook' })
})
