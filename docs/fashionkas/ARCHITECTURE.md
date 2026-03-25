# FASHIONKAS — ARCHITECTURE DOCUMENT
## Layer 1: Technical Architecture for Fashion Reseller Platform
**Version**: 3.0 | **Date**: 25 Maret 2026 | **Status**: LIVE

---

## 1. SYSTEM OVERVIEW

```
╔══════════════════════════════════════════════════════════════╗
║                    INTERNET / USERS                         ║
║  (Reseller fashion buka HP → ketik fashionkas.pages.dev)    ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  fashionkas.pages.dev (Cloudflare Pages - Edge)             ║
║  ┌────────────────────────────────────────────────────┐     ║
║  │   Hono v4 + TypeScript (_worker.js ~376KB)         │     ║
║  │                                                     │     ║
║  │   ┌─────────────┐   ┌──────────────────────────┐  │     ║
║  │   │  API Routes  │   │  Page Routes (SSR HTML)   │  │     ║
║  │   │  /api/*      │   │  / (landing)              │  │     ║
║  │   │  30+ endpoints│  │  /fashionkas/* (app)      │  │     ║
║  │   │              │   │  /catalog/:slug (public)  │  │     ║
║  │   └──────┬───────┘   └──────────────────────────┘  │     ║
║  └──────────┼──────────────────────────────────────────┘     ║
║             │                                                ║
║  ┌──────────▼──────────────────────────────────────────┐    ║
║  │              EXTERNAL SERVICES                       │    ║
║  │                                                      │    ║
║  │  ┌──────────┐ ┌────────┐ ┌──────┐ ┌──────────┐    │    ║
║  │  │ Supabase │ │ Fonnte │ │  R2  │ │ScraperAPI│    │    ║
║  │  │ Postgres │ │ WA API │ │Bucket│ │  Search  │    │    ║
║  │  │ REST API │ │        │ │Images│ │  (AI)    │    │    ║
║  │  └──────────┘ └────────┘ └──────┘ └──────────┘    │    ║
║  └──────────────────────────────────────────────────────┘    ║
╚══════════════════════════════════════════════════════════════╝
```

---

## 2. APPLICATION ARCHITECTURE

### 2.1 Entry Point
```
src/index.tsx
├── Imports (22 modules)
├── Type definitions (Bindings)
├── CORS middleware (/api/*)
├── PWA files (manifest.json, sw.js)
├── API Routes (10 route groups)
├── Page Routes (13 pages)
└── Export default app
```

### 2.2 Route Structure
```
API Routes:
  /api/auth/*        → authRoutes        (register, login, me, store, change-pin)
  /api/products/*    → productRoutes     (CRUD, public catalog)
  /api/orders/*      → orderRoutes       (CRUD, status update)
  /api/customers/*   → customerRoutes    (list)
  /api/dashboard/*   → dashboardRoutes   (stats, chart)
  /api/wa/*          → waRoutes          (send, broadcast, status, history)
  /api/reports/*     → reportRoutes      (daily, weekly, monthly)
  /api/images/*      → imageRoutes       (upload R2, serve)
  /api/ai/*          → aiRoutes          (scout, closer)
  /api/webhook/*     → webhookRoutes     (Fonnte incoming, auto-reply bot)

Page Routes:
  /                         → landingPage()
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
  /catalog/:slug            → catalogPublicPage(slug)
```

### 2.3 Module Structure
```
src/
├── index.tsx              # Main entry (120 loc)
├── lib/
│   └── supabase.ts        # Supabase REST client + JWT + PIN hash (154 loc)
├── routes/
│   ├── auth.ts            # Auth: register, login, profile (202 loc)
│   ├── products.ts        # CRUD products (133 loc)
│   ├── orders.ts          # Order management (202 loc)
│   ├── customers.ts       # Customer list (46 loc)
│   ├── dashboard.ts       # Stats & charts (149 loc)
│   ├── wa.ts              # Fonnte WA integration (598 loc)
│   ├── reports.ts         # Report endpoints (125 loc)
│   ├── images.ts          # R2 image upload/serve (182 loc)
│   ├── ai.ts              # Scout + Closer agents (417 loc)
│   └── webhook.ts         # Fonnte webhook bot (696 loc) ← LARGEST
└── fashion/
    ├── layout.ts          # Shared HTML layout + PWA (297 loc)
    └── pages/
        ├── landing.ts     # Landing page (310 loc)
        ├── auth.ts        # Login + Register (440 loc)
        ├── dashboard.ts   # Dashboard (223 loc)
        ├── kasir.ts       # POS/Kasir (566 loc)
        ├── catalog-manage.ts  # Catalog CRUD (553 loc)
        ├── catalog-public.ts  # Public catalog (256 loc)
        ├── orders.ts      # Order management (345 loc)
        ├── settings.ts    # Settings (500 loc)
        ├── wa-automation.ts   # WA automation UI (404 loc)
        ├── reports.ts     # Reports (275 loc)
        ├── scout-agent.ts # Scout AI (229 loc)
        ├── closer-agent.ts    # Closer AI (279 loc)
        └── onboarding.ts # Onboarding flow (317 loc)
```

---

## 3. DATA ARCHITECTURE

### 3.1 Database: Supabase PostgreSQL

```
┌──────────┐     ┌──────────┐     ┌─────────────┐
│  stores   │────>│ products  │     │  customers   │
│  (tenant) │     │  (catalog)│     │  (database)  │
└────┬─────┘     └──────────┘     └──────────────┘
     │                                    │
     │           ┌──────────┐            │
     └──────────>│  orders   │<───────────┘
                 │(transaksi)│
                 └────┬─────┘
                      │
                 ┌────▼──────┐     ┌─────────────┐
                 │order_items │     │ wa_messages  │
                 │  (detail)  │     │  (log WA)   │
                 └────────────┘     └─────────────┘
```

### 3.2 Table Summary

| Table | Row Count (est.) | Key Fields |
|-------|-----------------|------------|
| **stores** | 1-100 | id, name, slug, owner_phone, pin_code, subscription_tier |
| **products** | 10-5000 | id, store_id, name, category, price, cost_price, stock, sizes[], colors[], image_url |
| **orders** | 10-10000 | id, store_id, order_number, customer_name, total_amount, total_profit, payment_status |
| **order_items** | 20-30000 | id, order_id, product_id, product_name, quantity, unit_price, subtotal |
| **customers** | 5-5000 | id, store_id, name, phone, total_orders, total_spent, segment |
| **wa_messages** | 50-50000 | id, store_id, phone, message_type, message, status |

### 3.3 Multi-Tenant Isolation
- Semua table punya `store_id` column
- JWT token berisi `store_id` — digunakan untuk filter semua query
- RLS enabled di semua table
- Service role key dipakai di backend (bukan anon key)

---

## 4. DATA FLOW

### 4.1 Order Creation
```
[User tap "Simpan Transaksi" di POS]
         │
         ▼
[POST /api/orders]
         │
         ├→ Validate: cart items, stock availability
         ├→ Number coercion: price, qty, cost_price
         ├→ Resolve product_name (item.name || DB lookup)
         ├→ INSERT orders (header)
         ├→ INSERT order_items (detail per produk)
         ├→ UPDATE products (deduct stock, increment total_sold)
         ├→ UPSERT customers (auto-create/update)
         ├→ Determine payment_status (paid/dp/pending)
         ├→ (Optional) POST Fonnte API → kirim struk WA
         │
         ▼
[Response: { order_id, order_number, total, items }]
```

### 4.2 WA Auto-Reply Bot
```
[Customer kirim WA ke nomor toko]
         │
         ▼
[Fonnte receives → POST /api/webhook/incoming]
         │
         ├→ Parse message text
         ├→ Match command:
         │   ├─ "HELP/MENU"     → kirim menu
         │   ├─ "KATALOG/HARGA" → kirim daftar produk
         │   ├─ "CARI [keyword]"→ search products
         │   ├─ "ORDER [produk]"→ create order request
         │   ├─ "CEK [no]"     → check order status
         │   ├─ "STOK"         → stock summary
         │   ├─ "LAPORAN"      → daily report
         │   └─ (other)        → default response
         │
         ├→ POST Fonnte API → kirim reply
         ├→ INSERT wa_messages (log)
         │
         ▼
[Customer receives reply di WA]
```

---

## 5. SECURITY ARCHITECTURE

| Layer | Implementation |
|-------|---------------|
| **Authentication** | Custom JWT (HS256), 30-day expiry |
| **PIN Storage** | SHA-256 + salt ("fashionkas-salt-2026") |
| **Tenant Isolation** | JWT store_id → scopes all DB queries |
| **HTTPS** | Cloudflare auto-HTTPS |
| **CORS** | Enabled for /api/* routes |
| **Secrets** | Cloudflare Secrets (production), .dev.vars (local) |
| **RLS** | Supabase Row Level Security on all tables |

### Environment Variables:
```
SUPABASE_URL          → Supabase REST endpoint
SUPABASE_ANON_KEY     → Public key (used in frontend)
SUPABASE_SERVICE_KEY  → Service role key (backend only)
JWT_SECRET            → JWT signing secret
FONNTE_TOKEN          → Fonnte device token
FONNTE_ACCOUNT_TOKEN  → Fonnte account token
SCRAPERAPI_KEY        → ScraperAPI key (for AI agents)
R2_BUCKET             → Cloudflare R2 bucket binding
```

---

## 6. BUILD & DEPLOYMENT

### 6.1 Build Process
```
Source (src/) → Vite Build → dist/
                              ├── _worker.js    (~376KB compiled)
                              ├── _routes.json  (routing config)
                              └── static/       (from public/)
```

### 6.2 Deployment
```
Local Dev:
  npm run build
  wrangler pages dev dist --ip 0.0.0.0 --port 3000

Production:
  npm run build
  wrangler pages deploy dist --project-name fashionkas
  → https://fashionkas.pages.dev
```

### 6.3 CI/CD
```
Git push to main → Cloudflare Pages auto-deploy (if configured)
OR
Manual: npm run deploy:prod
```

---

## 7. PERFORMANCE

| Metric | Target | Current |
|--------|--------|---------|
| **Worker Size** | < 1MB | ~376KB ✅ |
| **Page Load** | < 3s on 3G | ~1.5s ✅ |
| **API Response** | < 500ms | ~200ms ✅ |
| **Build Time** | < 10s | ~1s ✅ |
| **Offline Support** | Yes | Yes (SW v2.5) ✅ |

---

## 8. KNOWN TECHNICAL DEBT

| Issue | Severity | Plan |
|-------|----------|------|
| Inline JS in page templates | Medium | Gradual refactor to component-based |
| Supabase keys in wrangler.jsonc vars | High | Move to CF Secrets + .dev.vars |
| No automated tests | Medium | Add integration tests phase 2 |
| No rate limiting on auth endpoints | Medium | Add rate limiter middleware |
| Single Fonnte token for all stores | High | Per-store Fonnte config needed |
| No image optimization | Low | Add resize on upload |

---

**FashionKas Architecture v3.0**
**Document**: docs/fashionkas/ARCHITECTURE.md
**Date**: 25 Maret 2026
