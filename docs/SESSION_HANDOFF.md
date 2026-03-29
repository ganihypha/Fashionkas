# FashionKas — Master Session Handoff
## Version 3.2 | 29 Maret 2026 | STATUS: ACTIVE

---

## 1. PROJECT SNAPSHOT

| Item | Value |
|------|-------|
| **Product** | FashionKas — Kasir Digital + Katalog Online + WA Automation |
| **Target** | Fashion reseller Indonesia (hijab, gamis, daster, pashmina) |
| **Live URL** | https://fashionkas.pages.dev |
| **GitHub** | https://github.com/ganihypha/Fashionkas |
| **Branch** | `main` |
| **Version** | v3.2 |
| **LOC** | ~9,500+ (29 TS modules, 61 files) |
| **Build Size** | ~458 KB worker |
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
| **AI** | Scout (lead scoring), Closer (WA outreach) — 80% done |
| **PWA** | Service Worker v3.2, install prompt, offline fallback |

---

## 3. DATABASE SCHEMA (Supabase)

### Tables:
1. **stores** — Toko info (id, name, slug, owner_name, owner_phone, pin_code, city, description, subscription_tier)
2. **products** — Produk (id, store_id, name, category, price, cost_price, stock, sizes[], colors[], image_url, is_active, is_featured, total_sold)
3. **orders** — Pesanan (id, store_id, order_number, customer_name, customer_phone, total_amount, total_profit, discount, shipping_cost, payment_method, payment_status, shipping_status, tracking_number, notes)
4. **order_items** — Item pesanan (id, order_id, product_id, product_name, quantity, unit_price, cost_price, size, color, subtotal)
5. **customers** — Pelanggan (id, store_id, name, phone, total_orders, total_spent, segment, last_order_at, notes, address)
6. **wa_messages** — Log WA (id, store_id, order_id, phone, message_type, message, status, fonnte_response)

### Supabase Config:
- **Project URL**: `https://pavkyexnqzfmdrbfzoht.supabase.co`
- **RLS**: Enabled on all tables (service_role full access)
- **SQL Schema**: `/supabase-setup.sql`

### Supabase Integration Details:
- **REST API Client**: Custom lightweight client in `src/lib/supabase.ts`
  - `query()` — SELECT with filters, ordering, limit, single-record mode
  - `insert()` — INSERT with returning
  - `update()` — UPDATE with equality filters
  - `remove()` — DELETE with equality filters
  - `rpc()` — Remote procedure calls
- **Headers**: `apikey`, `Authorization: Bearer <key>`, `Content-Type: application/json`, `Prefer: return=representation`
- **Multi-Tenant Isolation**: All queries scoped by `store_id` extracted from JWT
- **RLS Policies**: service_role key bypasses RLS; anon key respects RLS per-table
- **Connection Pattern**: Supabase client created per-request using env bindings (no persistent connections in Workers)

---

## 4. CLOUDFLARE INFRASTRUCTURE

### 4.1 Account & Project

| Item | Value |
|------|-------|
| **Cloudflare Account ID** | `618d52f63c689422eacf6638436c3e8b` |
| **Pages Project** | `fashionkas` |
| **Production URL** | https://fashionkas.pages.dev |
| **API Token** | `yvImquSdjXBLj1gS4mij0vIWBqg4771HdHAP_mbD` |
| **Compatibility Date** | 2024-01-01 |
| **Compatibility Flags** | `nodejs_compat` |

### 4.2 R2 Object Storage

| Item | Value |
|------|-------|
| **R2 S3 Endpoint** | `https://618d52f63c689422eacf6638436c3e8b.r2.cloudflarestorage.com` |
| **Binding Name** | `R2` (in wrangler.jsonc) |
| **Purpose** | Product image storage (primary) |
| **Fallback** | Supabase Storage → Base64 data URI |
| **Upload Flow** | Multipart/form-data or JSON base64 → R2 put → track in Supabase |
| **Serve Flow** | `GET /api/images/serve/*` → R2 get → proper content-type + caching |
| **Allowed Types** | jpeg, png, webp, gif |
| **Max Size** | 5 MB per image |

### 4.3 Token Verification
```bash
# Verify Cloudflare API token
curl -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
  -H "Authorization: Bearer yvImquSdjXBLj1gS4mij0vIWBqg4771HdHAP_mbD" \
  -H "Content-Type: application/json"
```

---

## 5. API ROUTES (31+ endpoints)

### Auth (`/api/auth/*`)
- `POST /register` — Daftar toko baru (store_name, owner_name, phone, pin)
- `POST /login` — Login dengan phone + PIN → JWT
- `GET /me` — Verify token / get store info
- `PUT /store` — Update profil toko
- `PUT /change-pin` — Ganti PIN (verify current PIN first)

### Products (`/api/products/*`)
- `GET /` — List semua produk (auth required)
- `POST /` — Tambah produk baru (name, category, price required)
- `PUT /:id` — Update produk (ownership verified)
- `DELETE /:id` — Hapus produk (ownership verified)
- `GET /public/:slug` — Katalog publik (no auth)

### Orders (`/api/orders/*`)
- `GET /` — List pesanan + items
- `POST /` — Buat pesanan baru (auto stock deduction, customer upsert, optional WA receipt via Fonnte)
- `PUT /:id` — Update status pesanan (shipping_status, payment_status, tracking_number)

### Customers (`/api/customers/*`)
- `GET /` — List customers + stats (total, active, VIP, dormant, revenue)
- `POST /` — Tambah customer (duplicate phone check)
- `PUT /:id` — Update customer (name, phone, notes, segment, address)
- `DELETE /:id` — Hapus customer (ownership verified)
- `GET /:id/orders` — Riwayat order customer (last 50)

### Dashboard (`/api/dashboard/stats`)
- Today/week/month/alltime stats, top 5 products, low stock alerts, daily 7-day revenue chart, recent 10 orders, category breakdown, average order value

### WA Automation (`/api/wa/*`)
- `GET /status` — Fonnte device status
- `GET /devices` — All devices (account token)
- `POST /validate` — Validate WA numbers
- `POST /send-receipt` — Kirim struk WA
- `POST /send-shipping` — Notifikasi pengiriman
- `POST /broadcast` — Broadcast promo
- `POST /send-custom` — Kirim pesan custom
- `POST /send-multi` — Multi-step messages
- `POST /send-poll` — WA poll
- `POST /send-location` — Kirim lokasi
- `GET /history` — Message history + stats
- `GET /quota` — Sisa kuota Fonnte

### AI Agents (`/api/ai/*`)
- `GET /scout/scores` — Customer RFM scoring (recency, frequency, monetary)
- `GET /scout/insights` — Business insights (growth, low-stock, inactive customers)
- `GET /closer/suggestions` — Follow-up suggestions by segment
- `POST /closer/send` — Kirim follow-up WA (single)
- `POST /closer/send-bulk` — Bulk follow-up
- `GET /closer/templates` — Pre-defined message templates (6 types)

### Webhook (`/api/webhook/*`)
- `POST /incoming` — Fonnte incoming message handler (auto-reply bot, 15+ commands)
- `POST /status` — Delivery status webhook
- `GET /incoming` — Health check
- `GET /status` — Health check

### Subscription (`/api/subscription/*`) — v3.1
- `GET /tiers` — Available tiers (FREE/BASIC/PRO/ENTERPRISE)
- `GET /current` — Current subscription status
- `POST /check-feature` — Feature gating check
- `POST /create-payment` — Duitku payment (placeholder)
- `POST /webhook/duitku` — Payment callback (placeholder)

### Other
- `GET /api/health` — Health check (version, features, build date)
- `POST /api/images/upload` — R2 image upload (multipart or base64)
- `GET /api/images/serve/*` — Serve R2 images with caching
- `DELETE /api/images/delete` — Delete image from R2
- `GET /api/images/list` — List store images from R2
- `GET /api/reports/monthly` — Monthly report data (daily breakdown, top products, payment/category breakdown)

---

## 6. PAGE ROUTES (16 pages)

| Route | Page | Auth |
|-------|------|------|
| `/` | Landing page v3.1 (pain-first, trust signals, FAQ, WA widget) | No |
| `/login` | Login (dark luxury UI) | No |
| `/register` | Register (3-step) | No |
| `/catalog/:slug` | Public catalog (store products) | No |
| `/fashionkas/dashboard` | Dashboard (charts, stats, alerts) | Yes |
| `/fashionkas/sale` | Kasir/POS (cart, variants, payment) | Yes |
| `/fashionkas/catalog` | Catalog management (CRUD + upload) | Yes |
| `/fashionkas/orders` | Order management (status, tracking) | Yes |
| `/fashionkas/customers` | Customer database (segmentation, history) | Yes |
| `/fashionkas/followup` | Follow-up reminders | Yes |
| `/fashionkas/wa` | WA automation (send, broadcast, history) | Yes |
| `/fashionkas/reports` | Reports (monthly, daily breakdown) | Yes |
| `/fashionkas/scout` | Scout AI agent (RFM scoring) | Yes |
| `/fashionkas/closer` | Closer AI agent (outreach suggestions) | Yes |
| `/fashionkas/settings` | Settings (profile, PIN, WA config, export) | Yes |
| `/fashionkas/onboarding` | 4-step onboarding tour | Yes |

---

## 7. ENVIRONMENT VARIABLES (SECRETS)

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

**CRITICAL SECURITY**: All secrets MUST be in CF env vars, NOT in wrangler.jsonc.

**Cloudflare API Token** (for deployment):
```
CLOUDFLARE_API_TOKEN=yvImquSdjXBLj1gS4mij0vIWBqg4771HdHAP_mbD
```

---

## 8. PRODUCT OFFERINGS & SUBSCRIPTION TIERS

### 8.1 Tier Definitions

| Tier | Price | Max Products | Max Orders | Max Customers | Features |
|------|-------|-------------|-----------|--------------|----------|
| **BETA (Free)** | Rp 0/bln | 999 | 999 | 999 | catalog, kasir, orders, customers, wa-automation, reports, followup, ai-agents |
| **BASIC** | Rp 49-99K/bln | 200 | 500 | 500 | All Free + priority support |
| **PRO** | Rp 149-249K/bln | 1000 | 5000 | 5000 | All Basic + broadcast, multi-admin, advanced reports |
| **ENTERPRISE** | Rp 499K/bln | Unlimited | Unlimited | Unlimited | All Pro + multi-store, dedicated support, custom domain |

### 8.2 Revenue Projection (Conservative)

| Month | Free Users | Paid Users | MRR (IDR) |
|-------|-----------|-----------|-----------|
| 1 | 10 | 0 | 0 |
| 2 | 25 | 3 | 297K |
| 3 | 50 | 10 | 990K |
| 6 | 200 | 60 | 5.94M |

### 8.3 Payment Gateway: Duitku (Planned)
- **Platform**: Duitku POP (in-page popup)
- **Methods**: VA (BCA, Mandiri, BNI), QRIS, GoPay, OVO, ShopeePay
- **MDR**: 2-3%
- **Status**: Placeholder routes exist, needs API key registration

---

## 9. SUPABASE DEEP INTEGRATION

### 9.1 Connection Architecture
```
Cloudflare Worker (Hono)
  → createSupabaseClient(url, key)
    → REST API calls to Supabase
      → query(table, options)  — SELECT
      → insert(table, data)    — INSERT
      → update(table, data, filters) — UPDATE
      → remove(table, filters) — DELETE
      → rpc(function, params)  — RPC
```

### 9.2 Authentication Flow
```
Register:
  1. Validate fields (store_name, owner_name, phone, pin)
  2. Enforce 4-digit PIN minimum
  3. Generate URL slug from store_name
  4. Hash PIN (SHA-256 + salt)
  5. Insert store (default tier: "beta")
  6. Create JWT (store_id, phone, tier, 30-day expiry)
  7. Return token + store details

Login:
  1. Hash PIN input
  2. Query store by phone + hashed pin
  3. Issue JWT on match
  4. Return token + store info

Protected Routes:
  1. Extract Bearer token from Authorization header
  2. Verify JWT (signature + expiry)
  3. Extract store_id from payload
  4. Scope all DB queries by store_id
```

### 9.3 Data Relationships
```
stores (1) ←→ (N) products
stores (1) ←→ (N) orders
stores (1) ←→ (N) customers
stores (1) ←→ (N) wa_messages
orders (1) ←→ (N) order_items
orders (N) ←→ (1) customers (via customer_phone)
order_items (N) ←→ (1) products (via product_id)
```

### 9.4 Key SQL Schema (supabase-setup.sql)
```sql
-- Stores table (multi-tenant root)
CREATE TABLE stores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  owner_name TEXT NOT NULL,
  owner_phone TEXT UNIQUE NOT NULL,
  pin_code TEXT NOT NULL,
  city TEXT,
  description TEXT,
  subscription_tier TEXT DEFAULT 'beta',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id UUID REFERENCES stores(id) NOT NULL,
  name TEXT NOT NULL,
  category TEXT,
  price NUMERIC NOT NULL,
  cost_price NUMERIC DEFAULT 0,
  stock INTEGER DEFAULT 0,
  sizes TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  total_sold INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Orders, order_items, customers, wa_messages follow similar pattern
-- Full schema in /supabase-setup.sql
```

---

## 10. COMPLETED FEATURES (v3.1)

- [x] Project setup (Hono + Cloudflare Pages)
- [x] Supabase integration (6 tables, RLS, custom REST client)
- [x] Auth flow (register 3-step, login, JWT, PIN hash)
- [x] Product CRUD + public catalog
- [x] Order management + auto stock deduction
- [x] POS/Kasir with cart, variants, payment methods
- [x] Dashboard with Chart.js and comprehensive stats
- [x] Customer database with segmentation (new/active/VIP/at_risk/dormant)
- [x] Follow-up reminders system
- [x] WA Automation (receipt, shipping, broadcast, custom, poll, location)
- [x] Fonnte webhook bot (15+ commands: HELP, KATALOG, CARI, ORDER, CEK, etc.)
- [x] Image upload (R2 primary, Supabase fallback, base64 last resort)
- [x] Reports (monthly, daily breakdown, top products, payment/category)
- [x] Scout AI (RFM scoring, business insights)
- [x] Closer AI (follow-up suggestions, message templates, single/bulk send)
- [x] PWA support (manifest, service worker v3.1, install prompt, offline)
- [x] Landing page v3.1 (pain-first, trust signals, FAQ, WA widget)
- [x] 4-step onboarding tour
- [x] Settings (profile, PIN change, WA config, data export)
- [x] Dark luxury UI design system (glass morphism, purple palette)
- [x] Skeleton loading + micro-interactions
- [x] Subscription routes + tier definitions
- [x] Professional footer + floating WA button
- [x] Session handoff document

---

## 11. NOT YET IMPLEMENTED

| Feature | Status | Priority | Notes |
|---------|--------|----------|-------|
| **Payment Gateway (Duitku)** | Placeholder routes exist | P0 | Needs Duitku API key |
| **Subscription Enforcement** | Not started | P1 | Tier gating middleware |
| **WA OTP for PIN reset** | Not started | P1 | Recovery via WA |
| **Per-store Fonnte Config** | Not started | P1 | Currently shared token |
| **Rate Limiting** | Not started | P1 | CF Workers implementation |
| **Automated Tests** | None | P2 | Integration tests |
| **Error Monitoring** | None | P2 | Sentry/logging service |
| **PDF/CSV Export** | Data exists | P2 | Export format missing |
| **Real Testimonials** | Placeholders only | P2 | After pilot users |
| **Demo Video** | Not created | P2 | 60-second screen record |
| **Referral System** | Planned Phase 3 | P3 | Code-based referral |
| **Multi-admin/Multi-store** | Not started | P3 | Role-based access |
| **Advanced AI (Groq)** | Scout/Closer are rule-based | P3 | LLM integration |

---

## 12. KNOWN BUGS & TECH DEBT

1. **Security**: Secrets may still be in git history from early commits — need full rotation
2. **Fonnte**: Single shared device token for all stores (mass ban risk)
3. **Auth**: No rate limiting on login endpoint (brute force risk)
4. **Dashboard**: Fetches ALL orders for stats (slow for stores with >1000 orders)
5. **Order Items**: N+1 query pattern in orders list
6. **Service Worker**: May cache stale pages after deployment
7. **Image Upload**: R2 bucket may not be configured in all environments
8. **Inline JS**: All frontend JS is inline in template strings (no hot reload, hard to test)

---

## 13. DEPLOYMENT COMMANDS

```bash
# Local development
npm run build
pm2 start ecosystem.config.cjs
# or: npx wrangler pages dev dist --ip 0.0.0.0 --port 3000

# Production deploy
npm run build
npx wrangler pages deploy dist --project-name fashionkas

# Set secrets (one-time per environment)
npx wrangler pages secret put SUPABASE_URL --project-name fashionkas
npx wrangler pages secret put SUPABASE_ANON_KEY --project-name fashionkas
npx wrangler pages secret put SUPABASE_SERVICE_KEY --project-name fashionkas
npx wrangler pages secret put JWT_SECRET --project-name fashionkas
npx wrangler pages secret put FONNTE_TOKEN --project-name fashionkas
npx wrangler pages secret put FONNTE_ACCOUNT_TOKEN --project-name fashionkas

# Verify Cloudflare token
curl -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
  -H "Authorization: Bearer yvImquSdjXBLj1gS4mij0vIWBqg4771HdHAP_mbD"
```

---

## 14. UPLOADED ARTIFACTS ANALYSIS

### 14.1 Referenced Files (Session 2 — 28 Mar 2026)

| File | Type | Key Content |
|------|------|-------------|
| `BUUKDER IDN.TI.TY.1.Q.DRM.1.Q.Q.Q.Q.Q.txt` | Personal notes | Personal relationship analysis — not relevant to technical docs |
| `FASHIN.KAS.TNPA.NURUL.txt` | Strategic session | **Critical**: Contains deep brand architecture decisions, 3-layer positioning, content strategy, GTM approach, Fashion KAS PRD, 30-day plan, bio/caption templates |
| `Sovereign WA Reseller Engine Fashion PRD Research (2).pdf` | Research PDF | Sovereign WA Reseller Engine research and PRD analysis |

### 14.2 Key Strategic Insights from FASHIN.KAS Session

1. **Brand Architecture Confirmed**: Fashion KAS (front brand) → ResellerKas (engine) → Sovereign (parent/philosophy)
2. **Positioning**: "Asisten WhatsApp untuk reseller fashion" — simple, niche, WA-native
3. **Public-facing**: Only show "Fashion KAS" — don't expose full 3-layer architecture to users
4. **Content Strategy**: Pain → Relief → Build in Public → Proof → Education → Founder Trust
5. **Landing Page**: Should be simpler than current — 4 core features, not 10+ features
6. **Pricing**: Beta gratis only for now — remove complex tier display from public-facing pages
7. **GTM**: 30-day plan → 20 prospects → 10 outreach → 3 demo → 2 trial → 1 active user
8. **Instagram Strategy**: @fashionkas IG account, 2 posts/week, story polls, build-in-public

### 14.3 Additional Uploaded Files (from earlier sessions)

Over 25+ additional .txt and .pdf files were found in `/home/user/uploaded_files/` including:
- Multiple Sovereign WA Reseller research documents
- Fashion KAS deep dive builds
- Architecture planning files
- Session conversations with strategic insights

---

## 15. NEXT STEPS (Priority Order)

### P0 — This Week
1. Rotate ALL secrets (Supabase, Fonnte, JWT) — 30 min
2. Create 60-second demo video — 1 day
3. Compile list of 20 pilot reseller prospects — 1 day
4. Send outreach WA messages — 1 day
5. End-to-end test all flows — 2 hours

### P1 — This Month
1. Integrate Duitku payment gateway — 2-3 days
2. Add WA OTP for PIN reset — 1 day
3. Per-store Fonnte configuration — 1 day
4. Subscription enforcement middleware — 2 days
5. Onboard 10 pilot users

### P2 — 2-3 Months
1. Content pipeline (TikTok/IG)
2. Referral program
3. PDF/CSV export
4. Multi-admin workspace
5. Smart restock alerts

---

## 16. CONTACT & RESOURCES

| Resource | URL/Location |
|----------|-------------|
| **Production** | https://fashionkas.pages.dev |
| **GitHub** | https://github.com/ganihypha/Fashionkas |
| **Supabase Dashboard** | https://pavkyexnqzfmdrbfzoht.supabase.co |
| **Fonnte Webhook** | https://fashionkas.pages.dev/api/webhook/incoming |
| **Cloudflare Account ID** | `618d52f63c689422eacf6638436c3e8b` |
| **R2 S3 Endpoint** | `https://618d52f63c689422eacf6638436c3e8b.r2.cloudflarestorage.com` |
| **Cloudflare API Token** | `yvImquSdjXBLj1gS4mij0vIWBqg4771HdHAP_mbD` |
| **Docs Directory** | `/docs/fashionkas/` (PRD, DESIGN, ARCHITECTURE, TODO) |
| **Master Doc** | `/docs/FASHIONKAS_DEEP_DIVE_MASTER_DOC.md` |
| **Brand Architecture** | `/docs/MASTER_CLARITY.md` |

---

*This document is the single source of truth for session handoff. Always update after major changes.*
*Last updated: 28 Maret 2026 — v3.1 upgrade + R2 endpoint + Cloudflare token + artifact analysis*
