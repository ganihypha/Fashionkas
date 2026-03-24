# FashionKas v2.1
## Katalog + Kasir Digital + WhatsApp Bot + PWA untuk Fashion Reseller Indonesia

**Production**: https://fashionkas.pages.dev
**GitHub**: https://github.com/ganihypha/Fashionkas
**Webhook URL**: https://fashionkas.pages.dev/api/webhook/incoming
**Sandbox**: https://3000-i1uevkn4lzjwuc2yqlrjg-2b54fc91.sandbox.novita.ai

---

## Completed Features (v2.1)

### New in v2.1
- **PWA Support** - Install FashionKas langsung dari browser ke home screen HP
- **Onboarding Flow** - 4-step guided setup untuk user baru (add product > share catalog > done)
- **DP/Lunas Payment Status** - Support Down Payment (DP), Lunas, dan Belum Bayar di POS
- **Offline Support** - Service worker + cache fallback + offline page
- **Install Banner** - Auto-prompt install PWA di mobile
- **Order Bug Fix** - Bulletproof product_name resolution with DB fallback lookup

### Kasir Digital (POS) - 100%
- Tambah produk ke keranjang dengan size/color picker
- Hitung otomatis total, profit, stok
- Payment methods: Cash, Transfer, COD, Marketplace
- **Payment status: Lunas / DP / Belum Bayar** (NEW v2.1)
- Auto-kirim struk via WhatsApp (Fonnte)
- Quick discount & shipping buttons
- Product search & category filter
- Grid/list view toggle

### Katalog Digital - 100%
- Upload produk (nama, harga, foto, ukuran, warna)
- 1 link katalog shareable ke semua customer
- Public catalog: `https://fashionkas.pages.dev/catalog/{slug}`
- Tombol "Pesan" langsung buka WhatsApp
- Featured products, inventory value tracker

### WhatsApp Automation (Fonnte) - 100%
- Auto-kirim struk setelah transaksi
- Notifikasi pengiriman + tracking resi
- Broadcast promo ke segmen customer
- Kirim pesan custom + scheduling
- Validate nomor WhatsApp
- Message history & analytics
- Device status + quota monitoring

### WhatsApp Bot (Webhook) - 100%
Webhook auto-reply via Fonnte. Kirim command ke nomor WA toko:

**Customer Commands:**
| Command | Fungsi |
|---------|--------|
| `HELP` / `MENU` | Lihat semua perintah |
| `KATALOG` | Lihat semua produk + harga |
| `HARGA` | Daftar harga |
| `CARI [nama]` | Cari produk |
| `ORDER [produk]` | Pesan produk |
| `CEK [no order]` | Cek status pesanan |
| `KATEGORI` | Lihat kategori |
| `INFO` | Info toko |
| `PROMO` | Promo terbaru |

**Admin Commands (Owner Only):**
| Command | Fungsi |
|---------|--------|
| `STOK` | Alert stok rendah/habis |
| `LAPORAN` | Ringkasan hari ini |
| `OMZET` | Omzet bulan ini + breakdown |
| `AUDIT` | Full audit toko lengkap |

### Dashboard & Analytics - 100%
- Pendapatan harian/mingguan/bulanan + all-time
- Produk terlaris (top 5)
- Alert stok rendah & habis
- Grafik revenue 7 hari (Chart.js)
- Recent orders list
- Quick action cards

### Scout AI (Lead Scoring) - 100%
- RFM scoring (Recency, Frequency, Monetary)
- Segment classification (VIP, Loyal, Warm, At Risk, Cold)
- Churn prediction
- Category preferences per customer

### Closer AI (WA Outreach) - 100%
- Smart follow-up suggestions
- Template messages (Thank You, Promo, Re-engage, VIP, Win Back)
- Bulk send via Fonnte with random delay (anti-ban)
- Auto-personalize per customer

### Reports - 100%
- Monthly revenue/profit breakdown
- Daily data for charts
- Payment method analysis
- Category breakdown
- CSV export (products, orders, customers)

### Auth System - 100%
- PIN-based registration (4-6 digit)
- JWT auth (30-day expiry)
- Store profile management (name, city, description)
- PIN change
- **Onboarding redirect after registration** (NEW v2.1)

### PWA (NEW v2.1) - 100%
- manifest.json for installability
- Service worker with network-first cache
- Offline page fallback
- Install prompt banner
- Apple mobile web app meta tags

---

## Pages & Routes

| # | Page | URL | Auth |
|---|------|-----|------|
| 1 | Landing | `/` | No |
| 2 | Login | `/login` | No |
| 3 | Register | `/register` | No |
| 4 | **Onboarding** | `/fashionkas/onboarding` | JWT |
| 5 | Dashboard | `/fashionkas/dashboard` | JWT |
| 6 | POS / Kasir | `/fashionkas/sale` | JWT |
| 7 | Catalog Manager | `/fashionkas/catalog` | JWT |
| 8 | Orders | `/fashionkas/orders` | JWT |
| 9 | Settings | `/fashionkas/settings` | JWT |
| 10 | WA Automation | `/fashionkas/wa` | JWT |
| 11 | Reports | `/fashionkas/reports` | JWT |
| 12 | Scout AI | `/fashionkas/scout` | JWT |
| 13 | Closer AI | `/fashionkas/closer` | JWT |
| 14 | Public Catalog | `/catalog/:slug` | No |

---

## API Endpoints (30+)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/health` | No | Health check (v2.1) |
| POST | `/api/auth/register` | No | Daftar toko baru |
| POST | `/api/auth/login` | No | Login (phone+PIN) |
| GET | `/api/auth/me` | JWT | Get current user |
| PUT | `/api/auth/store` | JWT | Update store profile |
| PUT | `/api/auth/change-pin` | JWT | Change PIN |
| GET | `/api/products` | JWT | List produk |
| POST | `/api/products` | JWT | Tambah produk |
| PUT | `/api/products/:id` | JWT | Update produk |
| DELETE | `/api/products/:id` | JWT | Hapus produk |
| GET | `/api/products/public/:slug` | No | Katalog publik |
| GET | `/api/orders` | JWT | List pesanan |
| POST | `/api/orders` | JWT | Buat pesanan (DP/Lunas/Pending) |
| PUT | `/api/orders/:id` | JWT | Update status |
| GET | `/api/customers` | JWT | List customers |
| POST | `/api/customers` | JWT | Add customer |
| GET | `/api/dashboard/stats` | JWT | Dashboard stats |
| GET | `/api/wa/status` | JWT | Fonnte device status |
| GET | `/api/wa/devices` | JWT | List devices |
| POST | `/api/wa/validate` | JWT | Validate WA number |
| POST | `/api/wa/send-receipt` | JWT | Kirim struk WA |
| POST | `/api/wa/send-shipping` | JWT | Notif pengiriman |
| POST | `/api/wa/broadcast` | JWT | Broadcast promo |
| POST | `/api/wa/send-custom` | JWT | Pesan custom |
| GET | `/api/wa/history` | JWT | Riwayat WA |
| GET | `/api/wa/quota` | JWT | Check quota |
| GET | `/api/ai/scout/scores` | JWT | Customer scores |
| GET | `/api/ai/scout/insights` | JWT | Business insights |
| GET | `/api/ai/closer/suggestions` | JWT | Follow-up suggestions |
| POST | `/api/ai/closer/send` | JWT | Send follow-up |
| POST | `/api/ai/closer/send-bulk` | JWT | Bulk follow-up |
| GET | `/api/ai/closer/templates` | JWT | Message templates |
| POST | `/api/images/upload` | JWT | Upload image (R2/base64) |
| GET | `/api/images/serve/*` | No | Serve image from R2 |
| GET | `/api/reports/monthly` | JWT | Laporan bulanan |
| **POST** | **`/api/webhook/incoming`** | **Fonnte** | **Webhook incoming** |
| **POST** | **`/api/webhook/status`** | **Fonnte** | **Delivery status** |
| GET | `/manifest.json` | No | PWA manifest |
| GET | `/sw.js` | No | Service worker |

---

## Data Architecture

### Database: Supabase PostgreSQL
| Table | Description | Key Fields |
|-------|-------------|------------|
| `stores` | Store/toko data | id, name, slug, owner_phone, pin_code, tier |
| `products` | Product catalog | id, store_id, name, price, cost_price, stock, sizes, colors |
| `orders` | Sales orders | id, store_id, order_number, total_amount, payment_status (paid/dp/pending) |
| `order_items` | Order line items | id, order_id, product_name, quantity, unit_price, size, color |
| `customers` | Customer CRM | id, store_id, name, phone, total_orders, segment |
| `wa_messages` | WA message log | id, store_id, phone, message_type, status |

### Storage Services
- **Supabase PostgreSQL** - All relational data with RLS
- **Cloudflare R2** - Product images (when configured)
- **Fonnte API** - WhatsApp gateway

---

## Setup Fonnte Webhook

1. Login ke https://md.fonnte.com
2. Device > Edit Device
3. Set field berikut:

| Setting | Value |
|---------|-------|
| **Webhook** | `https://fashionkas.pages.dev/api/webhook/incoming` |
| **Webhook Connect** | `https://fashionkas.pages.dev/api/webhook/incoming` |
| **Webhook Message Status** | `https://fashionkas.pages.dev/api/webhook/status` |
| **autoread** | ON |
| **Response Source** | Autoreply |
| **Personal** | ON |
| **Group** | ON |

---

## Tech Stack
- **Backend**: Hono v4 (TypeScript) on Cloudflare Workers
- **Frontend**: TailwindCSS CDN + Font Awesome + Chart.js
- **Database**: Supabase (PostgreSQL) with RLS
- **WhatsApp**: Fonnte API (auto-reply + webhook + bulk send)
- **Storage**: Cloudflare R2 (images)
- **Deploy**: Cloudflare Pages
- **PWA**: manifest.json + service worker + install prompt
- **Design**: Dark glassmorphism, purple accent (#A855F7)
- **Auth**: PIN-based (SHA-256 + salt) + JWT (HS256, 30-day)

---

## Credentials (in wrangler.jsonc)
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anon JWT
- `SUPABASE_SERVICE_KEY` - Supabase service role JWT
- `JWT_SECRET` - Custom JWT secret
- `FONNTE_TOKEN` - Fonnte device token
- `FONNTE_ACCOUNT_TOKEN` - Fonnte account token
- `SCRAPERAPI_KEY` - ScraperAPI key

---

## Completion Score

| Module | Score | Notes |
|--------|-------|-------|
| Backend API | 100% | 30+ endpoints, all functional |
| WhatsApp Bot | 100% | 15+ commands, webhook active |
| Fonnte Integration | 95% | Connected, quota 985 (free plan blocks images) |
| Frontend UI | 95% | 13 pages, dark glassmorphism |
| Database | 100% | 6 tables, RLS, indexes |
| Auth | 100% | PIN + JWT + onboarding |
| AI Agents | 90% | Scout + Closer working |
| **Onboarding** | **100%** | **4-step guided setup (NEW)** |
| **PWA** | **100%** | **Installable + offline (NEW)** |
| **DP/Lunas** | **100%** | **Full payment status flow (NEW)** |
| Subscriptions | 0% | Not implemented |
| Payment Gateway | 0% | Not implemented |
| **Overall** | **~85%** | GTM-ready for pilot |

---

## GTM Roadmap

### Phase 1: Pilot Ready (DONE - v2.1)
- [x] Fix order bug
- [x] Onboarding flow
- [x] PWA manifest + SW
- [x] DP/Lunas payment status
- [x] Deploy to production
- [x] Push to GitHub

### Phase 2: First 10 Users (1-2 weeks)
- [ ] R2 image upload UI integration
- [ ] WhatsApp OTP PIN reset
- [ ] Stock +/- quick buttons on catalog
- [ ] Per-store webhook config (multi-store)
- [ ] Fonnte Super plan upgrade (images)
- [ ] Referral invite link

### Phase 3: Revenue (2-4 weeks)
- [ ] Subscription tiers (Free/Basic Rp49K/Pro Rp99K)
- [ ] Usage limits per tier
- [ ] Midtrans/Xendit payment gateway
- [ ] CSV/PDF export reports
- [ ] Multi-admin support

### Phase 4: Scale (1-2 months)
- [ ] Advanced analytics
- [ ] Automated marketing sequences
- [ ] Shopee/Tokopedia integration
- [ ] Multi-language support
- [ ] Customer testimonial system

---

## Deploy Commands
```bash
# Build
npm run build

# Deploy to Cloudflare Pages
export CLOUDFLARE_API_TOKEN="your-token"
npx wrangler pages deploy dist --project-name fashionkas

# Local dev
npm run build && pm2 start ecosystem.config.cjs
```

---

**v2.1** | 24 Maret 2026 | Built with GenSpark.AI
**Sovereign Empire** | FashionKas Module
