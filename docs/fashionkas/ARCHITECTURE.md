# FASHIONKAS — ARCHITECTURE DOCUMENT
## Layer 1: Technical Architecture for Fashion Reseller Platform
**Version**: 3.2 | **Date**: 28 Maret 2026 | **Status**: LIVE v3.1

---

### v3.2 Architecture Changes
- Added `/api/subscription/*` routes (5 endpoints: tiers, current, check-feature, create-payment, webhook)
- Subscription tier definitions with feature gating (FREE/BASIC/PRO/ENTERPRISE)
- Duitku payment gateway integration point (placeholder, needs API key)
- Service worker upgraded to v3.1
- Landing page rebuilt with pain-first UX, WA widget, professional footer
- Session handoff system for developer continuity
- Total codebase: ~8,600+ LOC, 28 TS modules, ~410 KB worker

## 1. SYSTEM OVERVIEW

```
INTERNET / USERS (HP Android, browser Chrome)
         │
         ▼
fashionkas.pages.dev (Cloudflare Pages Edge)
┌─────────────────────────────────────────┐
│  Hono v4 + TypeScript (_worker.js 404KB)│
│  ┌──────────────┐  ┌─────────────────┐ │
│  │  API Routes   │  │ Page Routes SSR │ │
│  │  /api/* (30+) │  │ / + /fashionkas │ │
│  │  REST + JSON  │  │ /catalog/:slug  │ │
│  └──────┬────────┘  └─────────────────┘ │
└─────────┼───────────────────────────────┘
          │
┌─────────▼───────────────────────────────┐
│  EXTERNAL SERVICES                       │
│  ┌──────────┐ ┌────────┐ ┌──────┐      │
│  │ Supabase │ │ Fonnte │ │  R2  │      │
│  │ Postgres │ │ WA API │ │Bucket│      │
│  │  6 tables│ │  Bot   │ │Images│      │
│  └──────────┘ └────────┘ └──────┘      │
└──────────────────────────────────────────┘
```

---

## 2. ROUTE STRUCTURE

### API Routes (10 groups, 30+ endpoints):
```
/api/auth/*       → register, login, me, store, change-pin
/api/products/*   → CRUD, public catalog
/api/orders/*     → CRUD, status update
/api/customers/*  → list, auto-create
/api/dashboard/*  → stats, chart data
/api/wa/*         → send receipt, broadcast, status, history
/api/reports/*    → daily, weekly, monthly
/api/images/*     → R2 upload, serve
/api/ai/*         → scout, closer (50% done)
/api/webhook/*    → Fontte incoming, auto-reply bot
/api/health       → status check
```

### Page Routes (13 pages + public catalog):
```
/                         → landingPage() v3.0
/login                    → loginPage()
/register                 → registerPage()
/fashionkas/dashboard     → dashboardPage()
/fashionkas/sale          → kasirPage()
/fashionkas/catalog       → catalogManagePage()
/fashionkas/orders        → ordersPage()
/fashionkas/settings      → settingsPage()
/fashionkas/wa            → waAutomationPage()
/fashionkas/reports       → reportsPage()
/fashionkas/scout         → scoutAgentPage()
/fashionkas/closer        → closerAgentPage()
/fashionkas/onboarding    → onboardingPage()
/catalog/:slug            → catalogPublicPage()
```

---

## 3. MODULE STRUCTURE (7,914 LOC)

```
src/
├── index.tsx                  # Entry point (120 loc)
├── lib/
│   └── supabase.ts            # DB client + JWT + PIN hash (154 loc)
├── routes/
│   ├── auth.ts                # Register, login, profile (202 loc)
│   ├── products.ts            # CRUD products (133 loc)
│   ├── orders.ts              # Order management (202 loc)
│   ├── customers.ts           # Customer list (46 loc)
│   ├── dashboard.ts           # Stats & charts (149 loc)
│   ├── wa.ts                  # Fontte WA integration (598 loc)
│   ├── reports.ts             # Report endpoints (125 loc)
│   ├── images.ts              # R2 image upload/serve (182 loc)
│   ├── ai.ts                  # Scout + Closer agents (417 loc)
│   └── webhook.ts             # Fontte webhook bot (696 loc) ← LARGEST
└── fashion/
    ├── layout.ts              # App shell + core JS v3.0 (300 loc)
    └── pages/
        ├── landing.ts         # Landing page v3.0 (420 loc) ← REDESIGNED
        ├── auth.ts            # Login + Register (440 loc)
        ├── dashboard.ts       # Dashboard (223 loc)
        ├── kasir.ts           # POS/Kasir (566 loc)
        ├── catalog-manage.ts  # Catalog CRUD (553 loc)
        ├── catalog-public.ts  # Public catalog (256 loc)
        ├── orders.ts          # Order management (345 loc)
        ├── settings.ts        # Settings (480 loc)
        ├── wa-automation.ts   # WA automation UI (404 loc)
        ├── reports.ts         # Reports (275 loc)
        ├── scout-agent.ts     # Scout AI (182 loc)
        ├── closer-agent.ts    # Closer AI (279 loc)
        └── onboarding.ts      # Onboarding flow (317 loc)
```

---

## 4. DATA ARCHITECTURE

### Database: Supabase PostgreSQL (6 tables)

| Table | Key Fields | Est. Rows |
|-------|------------|-----------|
| **stores** | id, name, slug, owner_phone, pin_code, subscription_tier | 1-100 |
| **products** | id, store_id, name, category, price, cost_price, stock, sizes[], colors[], image_url | 10-5000 |
| **orders** | id, store_id, order_number, customer_name, total_amount, total_profit, payment_status | 10-10000 |
| **order_items** | id, order_id, product_id, product_name, quantity, unit_price, subtotal | 20-30000 |
| **customers** | id, store_id, name, phone, total_orders, total_spent, segment | 5-5000 |
| **wa_messages** | id, store_id, phone, message_type, message, status | 50-50000 |

### Multi-Tenant: store_id + JWT + RLS on all tables.

---

## 5. SECURITY

| Layer | Implementation |
|-------|---------------|
| Auth | Custom JWT (HS256, 30-day) |
| PIN | SHA-256 + salt |
| HTTPS | Cloudflare auto |
| CORS | /api/* routes |
| Secrets | CF Secrets (prod), .dev.vars (local) |
| RLS | Supabase Row Level Security |

### KNOWN SECURITY DEBT:
- Supabase keys visible in wrangler.jsonc vars (should be CF Secrets)
- No rate limiting on /api/auth/* (brute force risk)
- Single Fontte token shared across all stores

---

## 6. BUILD & DEPLOY

```
Build:   src/ → Vite → dist/ (_worker.js 404KB + _routes.json + static/)
Local:   npm run build && wrangler pages dev dist --ip 0.0.0.0 --port 3000
Prod:    npm run build && wrangler pages deploy dist --project-name fashionkas
URL:     https://fashionkas.pages.dev
```

---

## 7. PERFORMANCE

| Metric | Target | Current |
|--------|--------|---------|
| Worker Size | < 1MB | 404KB |
| Page Load | < 3s on 3G | ~1.5s |
| API Response | < 500ms | ~200ms |
| Build Time | < 10s | ~1s |
| Offline Support | Yes | Yes (SW v2.5) |

---

## 8. DESIGN SYSTEM (NEW v3.1)

### Color Tokens:
- Primary: `#A855F7` (purple), Dark: `#7C3AED`, Light: `#C084FC`
- Surface: `#030712` (bg), `#0D1117` (card), `#161B22` (nested)
- Success: `#10B981`, Danger: `#EF4444`, Warning: `#F59E0B`

### UX Patterns:
- Glass morphism cards with `backdrop-filter: blur(20px)`
- Skeleton shimmer loading (`@keyframes skeletonShimmer`)
- Page fade-in animation (`@keyframes pageFadeIn`)
- Button micro-interaction (scale 0.97 on active)
- Card hover (translateY -3px + purple glow)
- Toast with enter/exit animations
- Input focus glow (purple ring)

---

**FashionKas Architecture v3.1 | 26 Maret 2026**
**Document**: docs/fashionkas/ARCHITECTURE.md
