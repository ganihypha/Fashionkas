# FashionKas v2.5
## Katalog + Kasir Digital + WhatsApp Bot + R2 Upload + Subscription Tiers untuk Fashion Reseller Indonesia

**Production**: https://fashionkas.pages.dev
**GitHub**: https://github.com/ganihypha/Fashionkas
**Webhook URL**: https://fashionkas.pages.dev/api/webhook/incoming
**Deep Dive Doc**: [docs/FASHIONKAS_DEEP_DIVE_MASTER_DOC.md](docs/FASHIONKAS_DEEP_DIVE_MASTER_DOC.md)

---

## Completed Features (v2.5)

### New in v2.5
- **Critical Bug Fix: Script Loading** — Fixed `apiFetch is not defined` error that broke ALL pages (catalog, sale, orders). Root cause: helper functions in layout body were loading AFTER page scripts. Fix: moved all core helpers to `<head>`.
- **Critical Bug Fix: Syntax Error** — Fixed `Unexpected identifier 'w'` in catalog-manage.ts and kasir.ts caused by deeply nested escaped quotes in `onerror` attributes. Fix: replaced with `imgFallback()` function.
- **Service Worker v2.5** — Fixed stale cache issue where SW v2.1 was serving outdated HTML. New SW uses network-only for HTML, cache for assets.
- **Zero JS Errors** — All 8 pages verified with 0 JavaScript syntax/runtime errors

### Previous v2.2

### New in v2.2
- **R2 Image Upload UI** - Drag-drop + camera capture untuk upload foto produk langsung ke Cloudflare R2
- **Fonnte Device Status** - Real-time status Fonnte (kuota, paket, koneksi) di Settings
- **Webhook URL Helper** - Copy-paste webhook URL untuk setup Fonnte auto-reply bot
- **Subscription Tiers** - UI tiers Beta (gratis) / Pro (Rp49rb) / Enterprise (Rp149rb)
- **Image Sending Warning** - Alert jelas jika Fonnte paket Free (tidak bisa kirim gambar)
- **Better Error Handling** - apiFetch sekarang handle network error + response parsing robustly
- **Version 2.2 Health Check** - `/api/health` menampilkan semua fitur aktif

### Previous v2.1
- **PWA Support** - Install FashionKas langsung dari browser ke home screen HP
- **Onboarding Flow** - 4-step guided setup untuk user baru
- **DP/Lunas Payment Status** - Support Down Payment (DP), Lunas, dan Belum Bayar di POS
- **Offline Support** - Service worker + cache fallback

### Kasir Digital (POS) - 100%
- Tambah produk ke keranjang dengan size/color picker
- Hitung otomatis total, profit, stok
- Payment methods: Cash, Transfer, COD, Marketplace
- Payment status: Lunas / DP / Belum Bayar
- Auto-kirim struk via WhatsApp (Fonnte)
- Quick discount & shipping buttons
- Product search & category filter

### Katalog Online - 100%
- CRUD produk dengan gambar, ukuran, warna
- **R2 image upload with drag-drop & camera** (NEW v2.2)
- Category filter & search
- Featured product toggle
- Inventory value & profit calculator
- Share katalog via WhatsApp
- Public catalog page (no auth) `/catalog/:slug`

### Order Management - 100%
- List pesanan dengan filter status
- Update status: pending > processing > shipped > delivered
- Track resi otomatis
- Customer auto-create/update

### WhatsApp Automation (Fonnte) - 100%
- Auto-kirim struk WA dari POS
- Notifikasi pengiriman + tracking
- Broadcast promo ke customer segment
- Custom message sender
- Multi-step messages (data parameter)
- Poll & location sending
- **Real-time Fonnte status display** (NEW v2.2)
- **Webhook URL helper** (NEW v2.2)

### WhatsApp Auto-Reply Bot - 100%
- HELP/MENU - Menu bantuan
- KATALOG/HARGA - Daftar produk & harga
- CARI [keyword] - Pencarian produk
- ORDER [produk] - Request order
- CEK [no order] - Status pesanan
- KATEGORI [nama] - Browse per kategori
- Admin: STOK, LAPORAN, OMZET, AUDIT

### Dashboard & Reports - 100%
- Revenue, profit, orders per hari/minggu/bulan
- Top products & low stock alerts
- Customer analytics
- 7-day revenue chart
- Export CSV (produk, pesanan, customer)

### Settings - 100%
- Edit profil toko
- Share katalog link
- **Fonnte status + quota display** (NEW v2.2)
- **Webhook URL config** (NEW v2.2)
- **Subscription tiers UI** (NEW v2.2)
- Change PIN
- Data export (CSV)

### AI Agents (Basic) - 50%
- Scout Agent - Lead scoring interface
- Closer Agent - Follow-up outreach interface
- ScraperAPI integration for market research

---

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/health` | No | Health check + version |
| POST | `/api/auth/register` | No | Register new store |
| POST | `/api/auth/login` | No | Login with phone+PIN |
| GET | `/api/auth/me` | Yes | Get current store info |
| PUT | `/api/auth/store` | Yes | Update store profile |
| PUT | `/api/auth/change-pin` | Yes | Change PIN |
| GET | `/api/products` | Yes | List products |
| POST | `/api/products` | Yes | Create product |
| PUT | `/api/products/:id` | Yes | Update product |
| DELETE | `/api/products/:id` | Yes | Delete product |
| GET | `/api/products/public/:slug` | No | Public catalog |
| GET | `/api/orders` | Yes | List orders |
| POST | `/api/orders` | Yes | Create order |
| PUT | `/api/orders/:id` | Yes | Update order status |
| GET | `/api/customers` | Yes | List customers |
| POST | `/api/images/upload` | Yes | Upload image to R2 |
| GET | `/api/images/serve/*` | No | Serve image from R2 |
| GET | `/api/wa/status` | No | Fonnte device status |
| POST | `/api/wa/send-receipt` | Yes | Send WA receipt |
| POST | `/api/wa/send-shipping` | Yes | Send shipping notif |
| POST | `/api/wa/broadcast` | Yes | Broadcast to customers |
| POST | `/api/wa/send-custom` | Yes | Send custom WA message |
| GET | `/api/wa/history` | Yes | WA message history |
| POST | `/api/webhook/incoming` | No | Fonnte webhook receiver |
| GET | `/api/dashboard/stats` | Yes | Dashboard statistics |
| GET | `/api/reports/*` | Yes | Report endpoints |

---

## Data Architecture

- **Database**: Supabase PostgreSQL
- **Tables**: stores, products, orders, order_items, customers, wa_messages
- **Storage**: Cloudflare R2 (product images)
- **WhatsApp**: Fonnte API (Free plan: text only, Super+: with images)
- **Auth**: Custom JWT with SHA-256 PIN hashing

## Tech Stack
- **Backend**: Hono + TypeScript on Cloudflare Workers
- **Frontend**: Tailwind CSS (CDN) + Vanilla JS (inline)
- **Database**: Supabase (PostgreSQL + REST API)
- **Storage**: Cloudflare R2
- **WA API**: Fonnte.com
- **Build**: Vite + @hono/vite-cloudflare-pages
- **Deploy**: Cloudflare Pages

## Fonnte Setup Guide
1. Daftar di https://fonnte.com
2. Hubungkan nomor WA
3. Device > Edit > Webhook: `https://fashionkas.pages.dev/api/webhook/incoming`
4. Token sudah dikonfigurasi di wrangler.jsonc
5. **Note**: Free plan = text only. Upgrade ke Super (Rp45rb/bln) untuk kirim gambar

## Deep Dive Documentation
- **[Full Deep Dive & Research Master Document](docs/FASHIONKAS_DEEP_DIVE_MASTER_DOC.md)** — Comprehensive analysis covering:
  - Current state & feature inventory (7,851 lines of code, 52 modules)
  - Brand architecture (FashionKas by Sovereign)
  - Problem definition & market opportunity
  - User archetypes (5 personas researched)
  - Monetization & 4-layer revenue model
  - 30-day GTM roadmap with KPIs
  - 90-day execution roadmap (3 phases)
  - PMF scorecard (6.2/10)
  - Risk analysis & mitigation
  - Full implementation backlog (P0-P3)

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: ACTIVE
- **Version**: 2.5
- **Last Deploy**: 25 Maret 2026
