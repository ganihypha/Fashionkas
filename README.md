# FashionKas v3.2

Katalog Digital + Kasir Penjualan + Follow-up Pelanggan + WA Automation + AI Agents untuk Reseller Fashion Indonesia.

## URLs
- **Production**: https://fashionkas.pages.dev
- **GitHub**: https://github.com/ganihypha/Fashionkas
- **IG Brand**: @fashionkas.official
- **IG Founder**: @haidar_faras_m

## Architecture (3-Layer Brand System)

| Layer | Name | Purpose |
|-------|------|---------|
| **Front** | FashionKas | User-facing brand, fashion niche UI, landing page |
| **Engine** | ResellerKas | Shared API routes, niche-agnostic, reusable |
| **Strategy** | Sovereign | Internal holding/growth strategy (docs only) |

## Tech Stack
- **Backend**: Hono v4 + TypeScript on Cloudflare Workers
- **Database**: Supabase PostgreSQL (6 tables, RLS enabled)
- **Storage**: Cloudflare R2 (images) + Supabase Storage fallback
- **WA Gateway**: Fonnte API (device + account tokens)
- **Frontend**: Server-rendered HTML + Tailwind CSS (CDN) + vanilla JS
- **PWA**: Service Worker v3.2 + Web App Manifest
- **Build**: Vite + @hono/vite-cloudflare-pages
- **Deploy**: Cloudflare Pages

## Cloudflare Infrastructure

| Service | Value |
|---------|-------|
| **Account ID** | `618d52f63c689422eacf6638436c3e8b` |
| **Pages Project** | `fashionkas` |
| **R2 S3 Endpoint** | `https://618d52f63c689422eacf6638436c3e8b.r2.cloudflarestorage.com` |

## Supabase Integration

| Component | Detail |
|-----------|--------|
| **Project URL** | `https://pavkyexnqzfmdrbfzoht.supabase.co` |
| **Tables** | 6 (stores, products, orders, order_items, customers, wa_messages) |
| **Client** | Custom lightweight REST client (`src/lib/supabase.ts`) |
| **Auth** | Custom JWT (HS256) + SHA-256 PIN hash |
| **Multi-Tenant** | store_id from JWT scopes all queries |

## Pages & Features (v3.2 — 16 Pages)

| # | Feature | Path | Description |
|---|---------|------|-------------|
| 1 | Landing Page | `/` | Pain-first copy, trust signals, FAQ, WA widget, pro footer |
| 2 | Registration | `/register` | 3-step PIN-based auth, store creation |
| 3 | Login | `/login` | PIN-based, JWT token |
| 4 | Dashboard | `/fashionkas/dashboard` | Revenue stats, charts, top products, alerts |
| 5 | Katalog Produk | `/fashionkas/catalog` | CRUD, image upload (R2/Supabase/base64), featured toggle |
| 6 | Kasir (POS) | `/fashionkas/sale` | Quick sale, cart, discount, variants, WA receipt |
| 7 | Pesanan | `/fashionkas/orders` | Order list, status tabs, tracking, detail modal |
| 8 | Pelanggan | `/fashionkas/customers` | Customer DB, search, segment (VIP/Active/New/Dormant), CRUD |
| 9 | Follow-up | `/fashionkas/followup` | Unpaid orders, pending ship, dormant customers, WA reminder |
| 10 | WA Automation | `/fashionkas/wa` | Struk, broadcast, auto-reply, poll, location, custom |
| 11 | Laporan + CSV | `/fashionkas/reports` | Daily/monthly reports, chart, **CSV export (4 types)** |
| 12 | Scout AI | `/fashionkas/scout` | RFM lead scoring, segment bars, AI insights, customer detail |
| 13 | Closer AI | `/fashionkas/closer` | Follow-up suggestions, WA outreach, bulk send, templates |
| 14 | **Referral** | `/fashionkas/referral` | **NEW** — Share code, track rewards, milestone tiers |
| 15 | Onboarding | `/fashionkas/onboarding` | 4-step guided tour for new users |
| 16 | Settings | `/fashionkas/settings` | Store profile, PIN change, WA config |
| - | Public Catalog | `/catalog/:slug` | Public catalog link for customers |

## API Endpoints (35+ endpoints)

| Route | Methods | Description |
|-------|---------|-------------|
| `/api/auth` | POST register, login; GET me; PUT store, change-pin | PIN auth, JWT tokens |
| `/api/products` | GET, POST, PUT, DELETE; GET public/:slug | Product CRUD with stock |
| `/api/orders` | GET, POST, PUT | Order management with auto stock deduction |
| `/api/customers` | GET, POST, PUT, DELETE; GET /:id/orders | Customer CRUD + history |
| `/api/dashboard` | GET /stats | Dashboard statistics |
| `/api/wa` | POST send/broadcast/poll/location; GET status/history/quota | WhatsApp via Fonnte |
| `/api/reports` | GET /monthly | Sales reports data |
| `/api/reports/export` | GET /orders, /products, /customers, /daily | **CSV Export** (4 types) |
| `/api/images` | POST upload; GET serve/*; DELETE | Image upload (R2 + fallback) |
| `/api/ai` | GET scout/scores/insights; GET/POST closer/* | AI agent endpoints |
| `/api/webhook` | POST /incoming, /status | Fonnte webhook handler (15+ bot commands) |
| `/api/subscription` | GET tiers, current; POST check-feature, create-payment | Subscription management |
| `/api/referral` | GET /info, /validate/:code, /leaderboard | **Referral system** |
| `/api/health` | GET | Health check + version info |

## CSV Export Types
| Export | Endpoint | Columns |
|--------|----------|---------|
| Pesanan | `/api/reports/export/orders?month=YYYY-MM` | Tanggal, ID, Pelanggan, Items, Total, Profit, Status |
| Produk | `/api/reports/export/products` | Nama, Kategori, Harga, Stok, Terjual, Status |
| Pelanggan | `/api/reports/export/customers` | Nama, Telepon, Total Order, Total Belanja, Segment |
| Rekap Harian | `/api/reports/export/daily?month=YYYY-MM` | Tanggal, Hari, Orders, Items, Revenue, Profit |

## Referral System
- **Kode Format**: `FK-[SLUG]-[ID]`
- **Share URL**: `https://fashionkas.pages.dev/register?ref=FK-XXXX-XXXX`
- **Rewards**: 30 hari gratis per referral
- **Milestones**: 5x = BASIC 3 bulan, 10x = PRO 3 bulan, 25x = Lifetime BASIC

## Instagram Strategy (IG Master Strategy v1.0)

### Dual-Account Architecture
| Account | Role | Goal |
|---------|------|------|
| **@fashionkas.official** | Brand Machine | Convert traffic → users, professional-friendly tone |
| **@haidar_faras_m** | Trust Engine | Build founder credibility, "building in public" |

### Content Pillars (6 Pilar)
1. **Pain Points** — "Kamu pernah gini gak?"
2. **Edukasi Reseller** — Tips & tricks jualan WA
3. **Before vs After** — Visual transformation
4. **How-It-Works** — Demo produk simple
5. **Social Proof** — Testimonial & stories
6. **Data & Fakta** — Angka yang bikin shock

### Content Mix
- 40% Reels (viral potential, reach)
- 30% Carousel (edukasi, saves)
- 20% Stories (daily engagement, polling)
- 10% Static (quotes, announcements)

### Revenue Funnel
1,000 Impressions → 100 Profile Visits → 30 Bio Clicks → 10 Registers → 1 Paying User

### 30-Day KPI Targets
- Followers: 100+
- Bio Clicks: 50+
- Registrations: 10+

## Product Offerings & Subscription Tiers

| Tier | Price | Products | Orders | Customers | Key Features |
|------|-------|----------|--------|-----------|-------------|
| **BETA** | Rp 0/bln | 999 | 999 | 999 | Full access (beta period) |
| **BASIC** | Rp 49-99K/bln | 200 | 500 | 500 | Core + priority support |
| **PRO** | Rp 149-249K/bln | 1000 | 5000 | 5000 | + broadcast, multi-admin, reports |
| **ENTERPRISE** | Rp 499K/bln | Unlimited | Unlimited | Unlimited | + multi-store, custom domain |

## Security
- All secrets in CF env vars (NOT in wrangler.jsonc)
- JWT HS256 with 30-day expiry
- SHA-256 PIN hashing with salt
- CORS on `/api/*`
- RLS enabled on all Supabase tables

## What's New in v3.2
1. **CSV Export** — 4 export types: orders, products, customers, daily recap
2. **Referral System** — Share code, track referrals, milestone rewards
3. **Reports Upgrade** — CSV download buttons on Reports page
4. **Referral Page** — Full UI for referral program with share WA, copy link
5. **Navigation Update** — Referral added to desktop + mobile nav
6. **IG Strategy Docs** — Instagram Dual-Account Master Strategy integrated
7. **Carousel Content** — 7-slide founder story content blueprint

## Previous Changes
- **v3.1**: Subscription system, Duitku placeholder, landing redesign, session handoff
- **v3.0**: Customer DB page, Follow-up page, R2 image upload, landing redesign, security fix

## Deployment

### Local Development
```bash
npm install
npm run build
pm2 start ecosystem.config.cjs
# Access at http://localhost:3000
```

### Production (Cloudflare Pages)
```bash
npm run build
npx wrangler pages deploy dist --project-name fashionkas
```

## Documentation
| Doc | Path | Version |
|-----|------|---------|
| PRD | `docs/fashionkas/PRD.md` | v3.3 |
| Design | `docs/fashionkas/DESIGN.md` | v2.2 |
| Architecture | `docs/fashionkas/ARCHITECTURE.md` | v3.3 |
| TODO | `docs/fashionkas/TODO.md` | v4.1 |
| Deep Dive | `docs/FASHIONKAS_DEEP_DIVE_MASTER_DOC.md` | v3.0 |
| Session Handoff | `docs/SESSION_HANDOFF.md` | v3.0 |
| Master Clarity | `docs/MASTER_CLARITY.md` | v1.0 |

## Not Yet Implemented
- [ ] Duitku payment gateway (needs API key)
- [ ] Subscription enforcement middleware
- [ ] WA OTP for PIN reset
- [ ] Per-store Fontte configuration
- [ ] Rate limiting on auth endpoints
- [ ] Real testimonials (needs users)
- [ ] Demo video (60-sec)
- [ ] Automated tests

## Next Steps (Priority)
1. **P0**: Create 60-sec demo video -> 1 day
2. **P0**: Compile 20 pilot prospects -> 1 day
3. **P0**: WA outreach to prospects -> 1 day
4. **P1**: Integrate Duitku payment -> 2-3 days
5. **P1**: Onboard 10 pilot users -> 2 weeks

---
**Status**: Active (Beta) | **Version**: 3.2 | **Modules**: 57 | **Build**: 458 KB | **Pages**: 16 | **API**: 35+ | **Last Updated**: 2026-03-29
