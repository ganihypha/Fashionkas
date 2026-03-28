# FASHIONKAS — ARCHITECTURE DOCUMENT
## Layer 1: Technical Architecture for Fashion Reseller Platform
**Version**: 3.3 | **Date**: 28 Maret 2026 | **Status**: LIVE v3.1

---

### v3.3 Architecture Changes (28 Mar 2026)
- **R2 S3 Endpoint documented**: `https://618d52f63c689422eacf6638436c3e8b.r2.cloudflarestorage.com`
- **Cloudflare API Token documented** for deployment automation
- **Supabase integration deep-dive**: custom REST client, auth flow, data relationships
- **Product offerings & subscription tiers**: FREE/BASIC/PRO/ENTERPRISE with feature matrix
- Added `/api/subscription/*` routes (5 endpoints: tiers, current, check-feature, create-payment, webhook)
- Duitku payment gateway integration point (placeholder, needs API key)
- Service worker upgraded to v3.1
- Landing page rebuilt with pain-first UX, WA widget, professional footer
- Session handoff system v3.0 for developer continuity
- Total codebase: ~8,907 LOC, 28 TS modules, 59 files, ~428 KB worker

## 1. SYSTEM OVERVIEW

```
INTERNET / USERS (HP Android, browser Chrome)
         │
         ▼
fashionkas.pages.dev (Cloudflare Pages Edge)
┌─────────────────────────────────────────────┐
│  Hono v4 + TypeScript (_worker.js 428KB)    │
│  ┌──────────────┐  ┌─────────────────┐      │
│  │  API Routes   │  │ Page Routes SSR │      │
│  │  /api/* (31+) │  │ / + /fashionkas │      │
│  │  REST + JSON  │  │ /catalog/:slug  │      │
│  └──────┬────────┘  └─────────────────┘      │
└─────────┼────────────────────────────────────┘
          │
┌─────────▼────────────────────────────────────┐
│  EXTERNAL SERVICES                            │
│  ┌──────────┐ ┌────────┐ ┌──────────────┐   │
│  │ Supabase │ │ Fonnte │ │ Cloudflare   │   │
│  │ Postgres │ │ WA API │ │ R2 Storage   │   │
│  │  6 tables│ │  Bot   │ │ S3 endpoint  │   │
│  │  REST API│ │  Webhk │ │ Images/Files │   │
│  └──────────┘ └────────┘ └──────────────┘   │
│                                               │
│  Cloudflare Account: 618d52f63c...            │
│  R2 S3: https://618d52f6...r2.cloudflare...   │
└───────────────────────────────────────────────┘
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

## 5. CLOUDFLARE INFRASTRUCTURE

### 5.1 Account & Services

| Item | Value |
|------|-------|
| **Account ID** | `618d52f63c689422eacf6638436c3e8b` |
| **Pages Project** | `fashionkas` |
| **Production URL** | https://fashionkas.pages.dev |
| **API Token** | `yvImquSdjXBLj1gS4mij0vIWBqg4771HdHAP_mbD` |
| **R2 S3 Endpoint** | `https://618d52f63c689422eacf6638436c3e8b.r2.cloudflarestorage.com` |
| **Compatibility** | 2024-01-01 + nodejs_compat |

### 5.2 R2 Object Storage

```
Image Upload Flow:
  User → POST /api/images/upload (multipart/base64)
    → Verify JWT + store ownership
    → Validate type (jpeg/png/webp/gif) + size (<=5MB)
    → Generate unique filename
    → Strategy 1: R2 bucket PUT + track in Supabase
    → Strategy 2: Supabase Storage fallback
    → Strategy 3: Base64 data URI (last resort)
    → Return { url, key, size, storage_type }

Image Serve Flow:
  Browser → GET /api/images/serve/{key}
    → R2 bucket GET
    → Set Content-Type + Cache-Control headers
    → Stream image response
```

---

## 6. SECURITY

| Layer | Implementation |
|-------|---------------|
| Auth | Custom JWT (HS256, 30-day) |
| PIN | SHA-256 + project-specific salt |
| HTTPS | Cloudflare auto-HTTPS |
| CORS | /api/* routes only |
| Secrets | CF Secrets (prod), .dev.vars (local) |
| RLS | Supabase Row Level Security |
| Tenant | store_id from JWT scopes all queries |

### KNOWN SECURITY DEBT:
- Supabase keys may be visible in git history (need rotation)
- No rate limiting on /api/auth/* (brute force risk)
- Single Fontte token shared across all stores
- Cloudflare API token should be rotated periodically

---

## 7. BUILD & DEPLOY

```
Build:   src/ → Vite → dist/ (_worker.js 428KB + _routes.json + static/)
Local:   npm run build && wrangler pages dev dist --ip 0.0.0.0 --port 3000
Prod:    npm run build && wrangler pages deploy dist --project-name fashionkas
URL:     https://fashionkas.pages.dev

Token Verify:
  curl -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
    -H "Authorization: Bearer yvImquSdjXBLj1gS4mij0vIWBqg4771HdHAP_mbD"
```

---

## 8. PERFORMANCE

| Metric | Target | Current |
|--------|--------|---------|
| Worker Size | < 1MB | 404KB |
| Page Load | < 3s on 3G | ~1.5s |
| API Response | < 500ms | ~200ms |
| Build Time | < 10s | ~1s |
| Offline Support | Yes | Yes (SW v2.5) |

---

## 9. SUPABASE INTEGRATION DETAILS

### REST Client Architecture
```typescript
// src/lib/supabase.ts — Custom lightweight Supabase REST client
createSupabaseClient(url, key) → {
  query(table, { select, eq, order, limit, single })
  insert(table, data)
  update(table, data, filters)
  remove(table, filters)
  rpc(functionName, params)
}
```

### JWT Utilities
```typescript
createJWT(payload, secret)  → HS256 token (30-day expiry)
verifyJWT(token, secret)    → decoded payload or throw
hashPin(pin)                → SHA-256(pin + salt) → base64
```

### Multi-Tenant Data Flow
```
Request → Extract Bearer token
       → verifyJWT(token, JWT_SECRET)
       → Extract store_id from payload
       → createSupabaseClient(SUPABASE_URL, SERVICE_KEY)
       → All queries: .eq('store_id', store_id)
       → Response (scoped to tenant)
```

---

## 10. DESIGN SYSTEM (v3.1)

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

---

## 11. PRODUCT OFFERINGS

### Subscription Tier Matrix

| Tier | Price | Products | Orders | Customers | Key Features |
|------|-------|----------|--------|-----------|-------------|
| **BETA** | Rp 0 | 999 | 999 | 999 | Full access (beta period) |
| **BASIC** | Rp 49-99K | 200 | 500 | 500 | Core + priority support |
| **PRO** | Rp 149-249K | 1000 | 5000 | 5000 | + broadcast, multi-admin, reports |
| **ENTERPRISE** | Rp 499K | Unlimited | Unlimited | Unlimited | + multi-store, custom domain |

### API Endpoints for Subscriptions
```
GET  /api/subscription/tiers          → List all tiers
GET  /api/subscription/current        → Current store tier
POST /api/subscription/check-feature  → Feature gating
POST /api/subscription/create-payment → Duitku (placeholder)
POST /api/subscription/webhook/duitku → Payment callback
```

---

**FashionKas Architecture v3.3 | 28 Maret 2026**
**Document**: docs/fashionkas/ARCHITECTURE.md
