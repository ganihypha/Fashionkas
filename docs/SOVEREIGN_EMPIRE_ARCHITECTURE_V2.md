# 🏗️ SOVEREIGN EMPIRE — ARCHITECTURE DOCUMENT V2.0
# Unified System Design: Multi-Product SaaS Platform
**Version**: 2.0 | **Date**: 17 Maret 2026 | **Status**: EXECUTION READY

---

## 1. SYSTEM OVERVIEW

```
╔══════════════════════════════════════════════════════════════════╗
║                     INTERNET / USERS                             ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  CUSTOMER-FACING PRODUCTS        INTERNAL TOOLS                  ║
║  ┌──────────┐ ┌──────────┐      ┌──────────────────────────┐    ║
║  │FashionKas│ │ BarberKas│      │  Sovereign Command       │    ║
║  │ CF Pages │ │ CF Pages │      │  Center (CF Pages)       │    ║
║  │ :3000    │ │ :3001    │      │  + Predator Suite        │    ║
║  └────┬─────┘ └────┬─────┘      └──────────┬───────────────┘    ║
║       │             │                        │                    ║
║       └──────┬──────┘──────────┬────────────┘                    ║
║              │                 │                                  ║
║  ┌───────────▼─────────────────▼─────────────────────────────┐   ║
║  │              SHARED BRAIN (Backend Services)               │   ║
║  │                                                            │   ║
║  │  ┌──────────┐ ┌────────┐ ┌────────┐ ┌─────────┐          │   ║
║  │  │ Supabase │ │ Fonnte │ │ Groq   │ │SerpAPI  │          │   ║
║  │  │ Postgres │ │ WA API │ │ AI LLM │ │ Search  │          │   ║
║  │  │ + Auth   │ │        │ │        │ │         │          │   ║
║  │  └──────────┘ └────────┘ └────────┘ └─────────┘          │   ║
║  └───────────────────────────────────────────────────────────┘   ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## 2. MULTI-TENANT DATA ARCHITECTURE

### 2.1 Core Principle: One Database, Many Stores

```
Supabase PostgreSQL
├── stores (tenant table — each store = one customer)
│   ├── FashionKas tenants (store.type = 'fashion')
│   ├── BarberKas tenants (store.type = 'barbershop')
│   └── Future: CafeKas, LaundryKas, etc.
│
├── products (shared schema, store_id = tenant isolation)
├── orders (shared schema)
├── order_items
├── customers
├── wa_messages
│
├── hunting_leads (Predator data)
├── outreach_messages
└── lead_conversions (bridge: lead → store)
```

### 2.2 Row-Level Security (RLS)

```sql
-- Every table enforces tenant isolation
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see own store's products"
  ON products FOR ALL
  USING (store_id = current_setting('app.current_store_id')::uuid);

-- API sets store_id from JWT token per request
```

---

## 3. APPLICATION LAYER

### 3.1 Hono Backend Pattern (Shared Across Products)

```typescript
// Pattern used by ALL Sovereign products

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'

type Bindings = {
  SUPABASE_URL: string
  SUPABASE_ANON_KEY: string
  SUPABASE_SERVICE_KEY: string
  FONNTE_TOKEN: string
  JWT_SECRET: string
}

const app = new Hono<{ Bindings: Bindings }>()

// Middleware
app.use('/api/*', cors())
app.use('/api/*', async (c, next) => {
  // JWT auth for protected routes
  // Extract store_id from token
  await next()
})

// Routes mount
app.route('/api/auth', authRoutes)
app.route('/api/products', productRoutes)
app.route('/api/orders', orderRoutes)
app.route('/api/customers', customerRoutes)
app.route('/api/dashboard', dashboardRoutes)
app.route('/api/wa', waRoutes)

// Public routes (no auth)
app.get('/catalog/:slug', publicCatalog)

export default app
```

### 3.2 API Response Standard

```typescript
// Success
{ success: true, data: {...}, message: "OK" }

// Error
{ success: false, error: "VALIDATION_ERROR", message: "Phone required" }

// Paginated
{ success: true, data: [...], pagination: { page: 1, limit: 20, total: 150 } }
```

---

## 4. DATA FLOW DIAGRAMS

### 4.1 Order Creation Flow

```
[User taps "Simpan Transaksi" on POS]
         │
         ▼
[POST /api/orders]
         │
         ├─→ Validate cart items & stock
         ├─→ Create order record
         ├─→ Create order_items records
         ├─→ Deduct stock from products
         ├─→ Update customer total_spent & total_orders
         ├─→ (Optional) Send WA receipt via Fonnte
         │
         ▼
[Response: { order_id, order_number, total }]
```

### 4.2 Public Catalog Flow

```
[Customer opens /catalog/zahra-hijab]
         │
         ▼
[GET /catalog/:slug]
         │
         ├─→ Query store by slug (no auth needed)
         ├─→ Query active products for that store
         ├─→ Render HTML with TailwindCSS
         │
         ▼
[Customer sees product catalog]
         │
         ├─→ Taps "Pesan via WA"
         │
         ▼
[Redirects to wa.me/{phone}?text={pre-filled message}]
```

### 4.3 Predator → Product Pipeline

```
[Scout Agent: SerpAPI search "toko pakaian purwokerto"]
         │
         ▼
[Groq AI: Score digital gap (0-100)]
         │
         ▼
[Closer Agent: Fonnte sends personal WA]
         │
         ├─→ Lead responds "tertarik" 
         │
         ▼
[Builder Agent: Generate demo catalog page]
         │
         ▼
[Lead signs up for FashionKas beta]
         │
         ▼
[Harvest Agent: Track usage → convert to paid]
```

---

## 5. SECURITY ARCHITECTURE

### 5.1 Authentication Flow

```
[Login with phone + PIN]
         │
         ▼
[Server verifies PIN hash (bcrypt)]
         │
         ▼
[Generate JWT: { store_id, phone, tier, exp }]
         │
         ▼
[Client stores JWT in localStorage]
         │
         ▼
[Every API call: Authorization: Bearer {jwt}]
         │
         ▼
[Server extracts store_id → scopes all queries]
```

### 5.2 Secret Management

```
PRODUCTION (Cloudflare Secrets):
  wrangler pages secret put SUPABASE_URL
  wrangler pages secret put SUPABASE_SERVICE_KEY
  wrangler pages secret put JWT_SECRET
  wrangler pages secret put FONNTE_TOKEN

LOCAL DEVELOPMENT (.dev.vars):
  SUPABASE_URL=https://xxx.supabase.co
  SUPABASE_ANON_KEY=eyJ...
  SUPABASE_SERVICE_KEY=eyJ...
  JWT_SECRET=random-secret-key
  FONNTE_TOKEN=device-token
  SCRAPERAPI_KEY=xxx
```

### 5.3 Security Rules

| Rule | Implementation |
|------|---------------|
| No hardcoded secrets | All via env vars (.dev.vars / CF Secrets) |
| Tenant isolation | RLS + JWT store_id scope |
| PIN rate limiting | Max 5 attempts per 15 min |
| HTTPS only | Cloudflare Pages auto-HTTPS |
| Input validation | Hono validator on all endpoints |
| SQL injection prevention | Parameterized queries via Supabase SDK |

---

## 6. DEPLOYMENT ARCHITECTURE

### 6.1 Cloudflare Pages Deployment

```
LOCAL DEV:
  npm run build → vite builds to dist/
  wrangler pages dev dist --local → dev server :3000

PRODUCTION:
  npm run build
  wrangler pages deploy dist --project-name fashionkas
  → https://fashionkas.pages.dev

  wrangler pages secret put SUPABASE_URL --project-name fashionkas
  → Injects env vars into production
```

### 6.2 GitHub Repository Strategy

```
STANDALONE REPOS (Current Strategy):
  ganihypha/Fashionkas         → FashionKas (THIS BUILD)
  ganihypha/barberkas          → BarberKas (NEXT)
  Estes786/Svereign-predtor-suite → Predator Suite

WHY STANDALONE (not monorepo):
  ✅ Simpler deployment (1 repo = 1 CF Pages project)
  ✅ Independent versioning
  ✅ Easier for beta users to fork/reference
  ✅ CF Pages auto-deploys from GitHub push
  
SHARED VIA:
  Same Supabase database (shared tables)
  Same API patterns (copy-paste between projects)
  Same UI components (fashion-layout → barber-layout)
```

---

## 7. SCALABILITY PLAN

### 7.1 Phase 1: Beta (Now)
- Single Supabase project (free tier, 500MB)
- Cloudflare Pages free tier (unlimited sites)
- 1-10 stores, manual onboarding

### 7.2 Phase 2: Growth ($500 MRR)
- Supabase Pro ($25/month, 8GB)
- Custom domain (fashionkas.id, barberkas.id)
- 50+ stores, semi-automated onboarding

### 7.3 Phase 3: Scale ($2000+ MRR)
- Supabase Team ($599/month, 100GB+)
- Cloudflare Workers Paid ($5/month)
- 500+ stores, fully automated pipeline
- VPS for cron jobs (scout/closer 24/7)

---

*Architecture Document v2.0 | 17 Maret 2026*
*"Build products, not just plans."*
