# FashionKas Master Session Handoff
## Version 2.0 | 28 Maret 2026 | STATUS: ACTIVE

---

## 1. PROJECT SNAPSHOT

| Item | Value |
|------|-------|
| **Product** | FashionKas - Kasir Digital + Katalog Online + WA Automation |
| **Target** | Fashion reseller Indonesia (hijab, gamis, dll) |
| **Live URL** | https://fashionkas.pages.dev |
| **GitHub** | https://github.com/ganihypha/Fashionkas |
| **Branch** | `main` |
| **Version** | v3.1 |
| **LOC** | ~8,600+ (27 TS modules) |
| **Build Size** | ~410 KB worker |
| **Status** | Pre-revenue, 0 active users, PMF 6.2/10 |
| **Architecture** | 3-Layer: FashionKas (front) → ResellerKas (engine) → Sovereign (strategy) |

---

## 2. TECH STACK

| Component | Technology |
|-----------|-----------|
| **Backend** | Hono v4 + TypeScript on Cloudflare Workers |
| **Frontend** | Server-rendered HTML + Tailwind CSS (CDN) + Vanilla JS |
| **Database** | Supabase PostgreSQL (6 tables, RLS enabled) |
| **Storage** | Cloudflare R2 (primary), Supabase Storage (fallback), Base64 (last resort) |
| **WhatsApp** | Fonnte.com API (device token for messages, account token for management) |
| **Auth** | Custom JWT (HS256) + SHA-256 PIN hash, 30-day expiry |
| **Build** | Vite + @hono/vite-cloudflare-pages |
| **Deploy** | Cloudflare Pages (wrangler pages deploy) |
| **Dev Server** | PM2 + wrangler pages dev |
| **AI** | Scout (lead scoring), Closer (WA outreach) - 50% done |
| **PWA** | Service Worker v3.1, install prompt, offline fallback |

---

## 3. DATABASE SCHEMA (Supabase)

### Tables:
1. **stores** - Toko info (id, name, slug, owner_name, owner_phone, pin_code, city, description, subscription_tier)
2. **products** - Produk (id, store_id, name, category, price, cost_price, stock, sizes[], colors[], image_url, is_active, is_featured, total_sold)
3. **orders** - Pesanan (id, store_id, order_number, customer_name, customer_phone, total_amount, total_profit, discount, shipping_cost, payment_method, payment_status, shipping_status, tracking_number, notes)
4. **order_items** - Item pesanan (id, order_id, product_id, product_name, quantity, unit_price, cost_price, size, color, subtotal)
5. **customers** - Pelanggan (id, store_id, name, phone, total_orders, total_spent, segment, last_order_at, notes, address)
6. **wa_messages** - Log WA (id, store_id, order_id, phone, message_type, message, status, fonnte_response)

### Supabase Config:
- **Project URL**: https://pavkyexnqzfmdrbfzoht.supabase.co
- **RLS**: Enabled on all tables (service_role full access)
- **SQL Schema**: `/supabase-setup.sql`

---

## 4. API ROUTES (30+ endpoints)

### Auth (`/api/auth/*`)
- `POST /register` - Daftar toko baru
- `POST /login` - Login dengan phone + PIN
- `GET /me` - Verify token / get store info
- `PUT /store` - Update profil toko
- `PUT /change-pin` - Ganti PIN

### Products (`/api/products/*`)
- `GET /` - List semua produk
- `POST /` - Tambah produk baru
- `PUT /:id` - Update produk
- `DELETE /:id` - Hapus produk
- `GET /public/:slug` - Katalog publik (no auth)

### Orders (`/api/orders/*`)
- `GET /` - List pesanan + items
- `POST /` - Buat pesanan baru (auto stock deduction, customer upsert, optional WA receipt)
- `PUT /:id` - Update status pesanan

### Customers (`/api/customers/*`)
- `GET /` - List customers + stats
- `POST /` - Tambah customer
- `PUT /:id` - Update customer
- `DELETE /:id` - Hapus customer
- `GET /:id/orders` - Riwayat order customer

### Dashboard (`/api/dashboard/stats`)
- Today/week/month/alltime stats, top products, low stock alerts, daily revenue chart, recent orders

### WA Automation (`/api/wa/*`)
- `GET /status` - Fonnte device status
- `GET /devices` - All devices (account token)
- `POST /validate` - Validate WA numbers
- `POST /send-receipt` - Kirim struk WA
- `POST /send-shipping` - Notifikasi pengiriman
- `POST /broadcast` - Broadcast promo
- `POST /send-custom` - Kirim pesan custom
- `POST /send-multi` - Multi-step messages
- `POST /send-poll` - WA poll
- `POST /send-location` - Kirim lokasi
- `GET /history` - Message history + stats
- `GET /quota` - Sisa kuota Fonnte

### AI Agents (`/api/ai/*`)
- `GET /scout/scores` - Customer RFM scoring
- `GET /scout/insights` - Business insights
- `GET /closer/suggestions` - Follow-up suggestions
- `POST /closer/send` - Kirim follow-up WA
- `POST /closer/send-bulk` - Bulk follow-up
- `GET /closer/templates` - Message templates

### Webhook (`/api/webhook/*`)
- `POST /incoming` - Fonnte incoming message handler (auto-reply bot)
- `POST /status` - Delivery status webhook
- `GET /incoming` - Health check

### Subscription (`/api/subscription/*`) - NEW v3.1
- `GET /tiers` - Available tiers
- `GET /current` - Current subscription status
- `POST /check-feature` - Feature gating check
- `POST /create-payment` - Duitku payment (placeholder)
- `POST /webhook/duitku` - Payment callback

### Other
- `GET /api/health` - Health check
- `GET /api/images/upload` - R2 image upload
- `GET /api/images/serve/*` - Serve R2 images
- `GET /api/reports/monthly` - Monthly report data

---

## 5. PAGE ROUTES (15 pages)

| Route | Page | Auth |
|-------|------|------|
| `/` | Landing page | No |
| `/login` | Login | No |
| `/register` | Register (3-step) | No |
| `/catalog/:slug` | Public catalog | No |
| `/fashionkas/dashboard` | Dashboard | Yes |
| `/fashionkas/sale` | Kasir/POS | Yes |
| `/fashionkas/catalog` | Catalog management | Yes |
| `/fashionkas/orders` | Order management | Yes |
| `/fashionkas/customers` | Customer database | Yes |
| `/fashionkas/followup` | Follow-up reminders | Yes |
| `/fashionkas/wa` | WA automation | Yes |
| `/fashionkas/reports` | Reports | Yes |
| `/fashionkas/scout` | Scout AI agent | Yes |
| `/fashionkas/closer` | Closer AI agent | Yes |
| `/fashionkas/settings` | Settings | Yes |
| `/fashionkas/onboarding` | 4-step onboarding | Yes |

---

## 6. ENVIRONMENT VARIABLES (SECRETS)

Required in Cloudflare Pages > Settings > Environment Variables:

```
SUPABASE_URL=https://pavkyexnqzfmdrbfzoht.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_KEY=eyJhbGciOi...
JWT_SECRET=<random-256-bit-secret>
FONNTE_TOKEN=<device-token-from-fonnte>
FONNTE_ACCOUNT_TOKEN=<account-token-from-fonnte>
SCRAPERAPI_KEY=<optional>
```

**CRITICAL SECURITY**: All secrets MUST be in CF env vars, NOT in wrangler.jsonc

---

## 7. COMPLETED FEATURES (v3.1)

- [x] Project setup (Hono + Cloudflare Pages)
- [x] Supabase integration (6 tables, RLS, REST API client)
- [x] Auth flow (register 3-step, login, JWT, PIN hash)
- [x] Product CRUD + public catalog
- [x] Order management + auto stock deduction
- [x] POS/Kasir with cart, variants, payment methods
- [x] Dashboard with charts and stats
- [x] Customer database with segmentation
- [x] Follow-up reminders system
- [x] WA Automation (receipt, shipping, broadcast, custom)
- [x] Fonnte webhook bot (15+ commands)
- [x] Image upload (R2 primary, Supabase fallback, base64 last resort)
- [x] Reports (monthly, daily breakdown)
- [x] Scout AI (RFM scoring, insights)
- [x] Closer AI (follow-up suggestions, templates)
- [x] PWA support (manifest, service worker, install prompt)
- [x] Landing page v3.1 (pain-first, trust signals, FAQ, WA widget)
- [x] 4-step onboarding
- [x] Settings (profile, PIN change, WA config, data export)
- [x] Dark luxury UI design system
- [x] Skeleton loading + micro-interactions
- [x] Subscription routes + tier definitions
- [x] Professional footer + floating WA button

---

## 8. NOT YET IMPLEMENTED

- [ ] **Payment Gateway** (Duitku) - placeholder routes exist, needs API key
- [ ] **Subscription Enforcement** - tier gating middleware
- [ ] **WA OTP** for PIN reset
- [ ] **Per-store Fonnte Config** - currently shared token
- [ ] **Rate Limiting** - needs CF Workers implementation
- [ ] **Automated Tests** - none
- [ ] **Error Monitoring** - no Sentry/logging service
- [ ] **PDF/CSV Export** - reports data exists, export format missing
- [ ] **Real Testimonials** - placeholders only
- [ ] **Demo Video** - not created
- [ ] **Referral System** - planned for Phase 3
- [ ] **Multi-admin/Multi-store** - single store per account
- [ ] **Advanced AI** (full Groq integration) - Scout/Closer are rule-based

---

## 9. KNOWN BUGS & TECH DEBT

1. **Security**: Secrets may still be in git history from early commits - need full rotation
2. **Fonnte**: Single shared device token for all stores
3. **Auth**: No rate limiting on login endpoint (brute force risk)
4. **Dashboard**: Fetches ALL orders for stats (slow for large stores)
5. **Order Items**: N+1 query pattern in orders list
6. **Service Worker**: May cache stale pages after deployment
7. **Image Upload**: R2 bucket may not be configured in all environments

---

## 10. DEPLOYMENT COMMANDS

```bash
# Local development
npm run build
pm2 start ecosystem.config.cjs
# or: npx wrangler pages dev dist --ip 0.0.0.0 --port 3000

# Production deploy
npm run build
npx wrangler pages deploy dist --project-name fashionkas

# Set secrets (one-time)
npx wrangler pages secret put SUPABASE_URL --project-name fashionkas
npx wrangler pages secret put SUPABASE_ANON_KEY --project-name fashionkas
npx wrangler pages secret put SUPABASE_SERVICE_KEY --project-name fashionkas
npx wrangler pages secret put JWT_SECRET --project-name fashionkas
npx wrangler pages secret put FONNTE_TOKEN --project-name fashionkas
npx wrangler pages secret put FONNTE_ACCOUNT_TOKEN --project-name fashionkas
```

---

## 11. NEXT STEPS (Priority Order)

### P0 - This Week
1. Rotate ALL secrets (Supabase, Fonnte, JWT) - 30 min
2. Create 60-second demo video - 1 day
3. Add 3 real testimonial placeholders - 2 hours
4. Compile list of 20 pilot reseller prospects - 1 day
5. Send outreach WA messages - 1 day

### P1 - This Month
1. Integrate Duitku payment gateway - 2-3 days
2. Add WA OTP for PIN reset - 1 day
3. Per-store Fonnte configuration - 1 day
4. End-to-end user flow testing - 1 day
5. Onboard 10 pilot users

### P2 - 2-3 Months
1. Content pipeline (TikTok/IG)
2. Referral program
3. PDF/CSV export
4. Multi-admin workspace
5. Smart restock alerts

---

## 12. CONTACT & RESOURCES

- **Production**: https://fashionkas.pages.dev
- **GitHub**: https://github.com/ganihypha/Fashionkas
- **Supabase**: https://pavkyexnqzfmdrbfzoht.supabase.co
- **Fontte Webhook**: https://fashionkas.pages.dev/api/webhook/incoming
- **Cloudflare**: Account ID 618d52f63c689422eacf6638436c3e8b
- **Docs**: `/docs/fashionkas/` (PRD, DESIGN, ARCHITECTURE, TODO)

---

*This document is the single source of truth for session handoff. Always update after major changes.*
*Last updated: 28 Maret 2026 - v3.1 upgrade complete*
