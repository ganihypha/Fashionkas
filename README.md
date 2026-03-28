# FashionKas v3.1

Katalog Digital + Kasir Penjualan + Follow-up Pelanggan + WA Automation untuk Reseller Fashion Indonesia.

## URLs
- **Production**: https://fashionkas.pages.dev
- **GitHub**: https://github.com/ganihypha/Fashionkas
- **Sandbox Preview**: (dev server on port 3000)

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
- **PWA**: Service Worker v3.1 + Web App Manifest
- **Build**: Vite + @hono/vite-cloudflare-pages
- **Deploy**: Cloudflare Pages

## Features (v3.1)

### Completed
| Feature | Path | Description |
|---------|------|-------------|
| Landing Page v3.1 | `/` | Pain-first copy, trust signals, FAQ, WA widget, pro footer |
| Registration | `/register` | 3-step PIN-based auth, store creation |
| Login | `/login` | PIN-based, JWT token |
| Dashboard | `/fashionkas/dashboard` | Revenue stats, charts, top products, alerts |
| Katalog Produk | `/fashionkas/catalog` | CRUD, image upload (R2/Supabase/base64), featured toggle |
| Kasir (POS) | `/fashionkas/sale` | Quick sale, cart, discount, variants, WA receipt |
| Pesanan | `/fashionkas/orders` | Order list, status tabs, tracking, detail modal |
| Pelanggan | `/fashionkas/customers` | Customer DB, search, segment (VIP/Active/New/Dormant), CRUD |
| Follow-up | `/fashionkas/followup` | Unpaid orders, pending ship, dormant customers, WA reminder |
| WA Automation | `/fashionkas/wa` | Struk, broadcast, auto-reply, poll, location, custom |
| Laporan | `/fashionkas/reports` | Daily/weekly/monthly reports with chart |
| Scout AI | `/fashionkas/scout` | RFM lead scoring & business insights |
| Closer AI | `/fashionkas/closer` | Follow-up suggestions & WA outreach |
| Onboarding | `/fashionkas/onboarding` | 4-step guided tour for new users |
| Settings | `/fashionkas/settings` | Store profile, PIN change, WA config |
| Public Catalog | `/catalog/:slug` | Public catalog link for customers |
| **Subscription** | `/api/subscription/*` | **NEW** Tier system (FREE/BASIC/PRO/ENTERPRISE), feature gating |

### API Endpoints (31+ endpoints)
| Route | Methods | Description |
|-------|---------|-------------|
| `/api/auth` | POST register, login; GET me; PUT store, change-pin | PIN auth, JWT tokens |
| `/api/products` | GET, POST, PUT, DELETE; GET public/:slug | Product CRUD with stock |
| `/api/orders` | GET, POST, PUT | Order management with auto stock deduction |
| `/api/customers` | GET, POST, PUT, DELETE; GET /:id/orders | Customer CRUD + history |
| `/api/dashboard` | GET /stats | Dashboard statistics |
| `/api/wa` | POST send/broadcast/poll/location; GET status/history/quota | WhatsApp via Fonnte |
| `/api/reports` | GET /monthly | Sales reports data |
| `/api/images` | POST upload; GET serve/*; DELETE | Image upload (R2 + fallback) |
| `/api/ai` | GET scout/scores/insights; GET/POST closer/* | AI agent endpoints |
| `/api/webhook` | POST /incoming, /status | Fonnte webhook handler (15+ bot commands) |
| `/api/subscription` | GET tiers, current; POST check-feature, create-payment | **NEW** Subscription management |
| `/api/health` | GET | Health check + version info |

## Data Architecture
- **stores**: Store profiles (name, slug, owner, phone, city, subscription_tier)
- **products**: Product catalog (name, price, cost, stock, images, sizes, colors)
- **orders**: Order records (items, totals, profit, payment/shipping status)
- **order_items**: Individual order line items
- **customers**: Customer database (auto-saved from orders, segment, notes, address)
- **wa_messages**: WhatsApp message history and delivery logs

## Subscription Tiers

| Tier | Price | Products | Orders/mo | Features |
|------|-------|----------|-----------|----------|
| BETA | Rp 0 | Unlimited | Unlimited | All features open |
| STARTER | Rp 0 | 20 | 50 | Catalog, POS, Orders, Customers |
| BASIC | Rp 99K | 100 | 500 | + WA Auto, Reports, Follow-up |
| PRO | Rp 249K | 500 | 5,000 | + AI Agents, Broadcast, Export |
| ENTERPRISE | Rp 499K | Unlimited | Unlimited | + Multi-store, Priority support |

## Security
- All secrets in CF env vars (NOT in wrangler.jsonc)
- JWT HS256 with 30-day expiry
- SHA-256 PIN hashing with salt
- CORS on `/api/*`
- RLS enabled on all Supabase tables

## What's New in v3.1
1. **Subscription System** - Tier definitions, usage tracking, feature gating API
2. **Duitku Payment** - Placeholder routes for payment gateway integration
3. **Landing Page v3.1** - Pain-first UX, problem → solution flow
4. **WA Floating Button** - Quick contact on all public pages
5. **Professional Footer** - 3-column with product links, help, copyright
6. **Session Handoff** - Comprehensive developer handoff document
7. **Pain Points Section** - Visual "problem" showcase on landing
8. **Service Worker v3.1** - Updated cache name, better offline

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
| PRD | `docs/fashionkas/PRD.md` | v3.2 |
| Design | `docs/fashionkas/DESIGN.md` | v2.1 |
| Architecture | `docs/fashionkas/ARCHITECTURE.md` | v3.2 |
| TODO | `docs/fashionkas/TODO.md` | v4.0 |
| Deep Dive | `docs/FASHIONKAS_DEEP_DIVE_MASTER_DOC.md` | v2.0 |
| Session Handoff | `docs/SESSION_HANDOFF.md` | v2.0 |
| Master Clarity | `docs/MASTER_CLARITY.md` | v1.0 |

## Not Yet Implemented
- [ ] Duitku payment gateway (needs API key)
- [ ] Subscription enforcement middleware
- [ ] WA OTP for PIN reset
- [ ] Per-store Fonnte configuration
- [ ] Rate limiting
- [ ] PDF/CSV export
- [ ] Real testimonials
- [ ] Demo video
- [ ] Automated tests

## Next Steps (Priority)
1. **P0**: Rotate ALL secrets → 30 min
2. **P0**: Create 60-sec demo video → 1 day
3. **P0**: Compile 20 pilot prospects → 1 day
4. **P1**: Integrate Duitku payment → 2-3 days
5. **P1**: Onboard 10 pilot users → 2 weeks

---
**Status**: Active (Beta) | **Version**: 3.1 | **Last Updated**: 2026-03-28
