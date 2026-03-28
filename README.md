# FashionKas v3.0

Katalog Digital + Kasir Penjualan + Follow-up Pelanggan untuk Reseller Fashion Indonesia.

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
- **Backend**: Hono v4 + Cloudflare Workers
- **Database**: Supabase PostgreSQL (with RLS)
- **Storage**: Cloudflare R2 (images) + Supabase Storage fallback
- **WA Gateway**: Fonnte API
- **Frontend**: Server-rendered HTML + Tailwind CSS (CDN) + vanilla JS
- **PWA**: Service Worker + Web App Manifest

## Features (v3.0)

### Completed
| Feature | Path | Description |
|---------|------|-------------|
| Landing Page | `/` | Redesigned - simpler, 4 core features, niche fashion, beta CTA |
| Registration | `/register` | PIN-based auth, store creation |
| Login | `/login` | PIN-based, JWT token |
| Dashboard | `/fashionkas/dashboard` | Revenue stats, charts, top products, alerts |
| Katalog Produk | `/fashionkas/catalog` | CRUD, image upload (R2/Supabase/base64), featured toggle |
| Kasir (POS) | `/fashionkas/sale` | Quick sale, cart, discount, WA receipt |
| Pesanan | `/fashionkas/orders` | Order list, status tabs, tracking, detail modal |
| **Pelanggan** | `/fashionkas/customers` | **NEW** Customer DB, search, segment (VIP/Active/New/Dormant), CRUD |
| **Follow-up** | `/fashionkas/followup` | **NEW** Unpaid orders, pending ship, dormant customers, WA reminder |
| WA Automation | `/fashionkas/wa` | Struk otomatis, broadcast, auto-reply |
| Laporan | `/fashionkas/reports` | Daily/weekly/monthly reports |
| Scout AI | `/fashionkas/scout` | Lead scoring & market analysis |
| Closer AI | `/fashionkas/closer` | Follow-up suggestions & outreach |
| Onboarding | `/fashionkas/onboarding` | 4-step guided tour for new users |
| Settings | `/fashionkas/settings` | Store profile, PIN change |
| Public Catalog | `/catalog/:slug` | Public catalog link for customers |

### API Endpoints (Engine Layer)
| Route | Methods | Description |
|-------|---------|-------------|
| `/api/auth` | POST register, login, me, update | PIN auth, JWT tokens |
| `/api/products` | GET, POST, PUT, DELETE | Product CRUD with stock |
| `/api/orders` | GET, POST, PUT | Order management with stock deduction |
| `/api/customers` | GET, POST, PUT, DELETE | Customer CRUD + order history |
| `/api/dashboard` | GET /stats | Dashboard statistics |
| `/api/wa` | POST send/broadcast/poll/location | WhatsApp via Fonnte |
| `/api/reports` | GET daily/weekly/monthly | Sales reports |
| `/api/images` | POST upload, GET serve/list, DELETE | Image upload (R2 + fallback) |
| `/api/ai` | POST scout/closer/insights | AI agent endpoints |
| `/api/webhook` | POST /incoming | Fonnte webhook handler |
| `/api/health` | GET | Health check + version info |

## Data Architecture
- **stores**: Store profiles (name, slug, phone, WA)
- **products**: Product catalog (name, price, cost, stock, images, sizes, colors)
- **orders**: Order records (items, totals, profit, payment/shipping status)
- **order_items**: Individual order line items
- **customers**: Customer database (auto-saved from orders, with segment, notes)
- **wa_messages**: WhatsApp message history

## Security Changes (v3.0)
- All secrets removed from `wrangler.jsonc` (was publicly committed!)
- Secrets now stored in `.dev.vars` (in .gitignore, never committed)
- For production: use `wrangler pages secret put` to set each secret
- **Recommendation**: Rotate ALL exposed keys (Supabase, Fonnte, ScraperAPI, JWT)

## Deployment

### Local Development
```bash
npm run build
npm run dev:sandbox   # wrangler pages dev dist --ip 0.0.0.0 --port 3000
```

### Production (Cloudflare Pages)
```bash
npm run build
npx wrangler pages deploy dist --project-name fashionkas

# Set secrets (one-time after credential rotation)
npx wrangler pages secret put SUPABASE_URL --project-name fashionkas
npx wrangler pages secret put SUPABASE_ANON_KEY --project-name fashionkas
npx wrangler pages secret put SUPABASE_SERVICE_KEY --project-name fashionkas
npx wrangler pages secret put JWT_SECRET --project-name fashionkas
npx wrangler pages secret put FONNTE_TOKEN --project-name fashionkas
npx wrangler pages secret put FONNTE_ACCOUNT_TOKEN --project-name fashionkas
npx wrangler pages secret put SCRAPERAPI_KEY --project-name fashionkas
```

## What's New in v3.0
1. **Customer Database** - Full CRUD, auto-segment (VIP/Active/New/Dormant), auto-save from orders
2. **Follow-up Reminder** - Unpaid orders, pending shipments, dormant customer re-engage via WA
3. **Enhanced Image Upload** - 3-tier fallback: R2 -> Supabase Storage -> Base64
4. **Landing Page Redesign** - Simpler, 4 core features, niche fashion focus
5. **Security Fix** - Secrets removed from wrangler.jsonc, moved to .dev.vars
6. **Brand Layer Separation** - Clear FashionKas (front) vs ResellerKas (engine) architecture
7. **Updated Navigation** - Pelanggan + Follow-up added to desktop/mobile nav

## Not Yet Implemented (P2+)
- [ ] PDF/CSV Export for reports
- [ ] Referral system
- [ ] Multi-store support
- [ ] Full Scout/Closer AI with real LLM integration
- [ ] Stripe/Midtrans payment integration
- [ ] Demo video on landing page
- [ ] Real testimonials (currently placeholder)
- [ ] Credential rotation (CRITICAL - do this before going live)

## Next Steps
1. **URGENT**: Rotate all exposed credentials (Supabase, Fonnte, JWT, ScraperAPI)
2. Deploy v3.0 to Cloudflare Pages with new secrets
3. Push to GitHub (requires auth setup)
4. Start user acquisition (10 pilot resellers)
5. Implement PDF export & referral system

---
**Status**: Active (Beta) | **Version**: 3.0 | **Last Updated**: 2026-03-28
