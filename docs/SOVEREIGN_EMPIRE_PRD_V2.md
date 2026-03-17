# 👑 SOVEREIGN EMPIRE — PRODUCT REQUIREMENTS DOCUMENT V2.0
# Unified Ecosystem: FashionKas + BarberKas + Predator AI
**Version**: 2.0 | **Date**: 17 Maret 2026 | **Author**: Sovereign AI Dev
**Status**: DEFINITIVE PRD — EXECUTION READY

---

## 1. EXECUTIVE SUMMARY

**Sovereign Empire** adalah ekosistem terintegrasi yang mentransformasi bisnis tradisional Indonesia (barbershop, fashion reseller, UMKM) menjadi digital melalui produk SaaS yang terjangkau, didukung AI agent otonom yang mencari dan mengonversi leads 24/7.

### 1.1 Product Portfolio

| Product | Target Market | Status | Revenue Model |
|---------|--------------|--------|---------------|
| **BarberKas** | Barbershop Indonesia (5000+) | 🟡 Design Complete | SaaS Rp 99-499K/bln |
| **FashionKas** | Fashion Reseller, Toko Pakaian | 🟢 **BUILDING NOW** | SaaS Rp 99-499K/bln |
| **Sovereign Predator** | Internal AI Sales Engine | 🟡 Architecture Ready | Powers all products |
| **Sovereign Command** | Internal Dashboard | 🟡 Scaffold | Unified metrics |

### 1.2 One-Liner
> **Sovereign Empire** = Kasir digital + katalog online + WA automation untuk UMKM Indonesia, dijualkan otomatis oleh AI agents.

---

## 2. VISION: THE SOVEREIGN PRODUCT LINE

```
SOVEREIGN EMPIRE PRODUCT LINE
==============================

       ┌─────────────────────────────────────────┐
       │         SOVEREIGN COMMAND CENTER         │
       │      (Unified Dashboard & Metrics)       │
       └──────────────────┬──────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
    ┌─────▼─────┐  ┌─────▼─────┐  ┌─────▼─────┐
    │ BarberKas │  │FashionKas │  │ [Future]  │
    │ Barbershop│  │  Fashion  │  │ CafeKas   │
    │   POS+WA  │  │Reseller   │  │ LaundryKas│
    │           │  │Katalog+POS│  │ etc.      │
    └─────┬─────┘  └─────┬─────┘  └─────┬─────┘
          │               │               │
          └───────────────┼───────────────┘
                          │
       ┌──────────────────▼──────────────────────┐
       │         SOVEREIGN PREDATOR SUITE        │
       │    (AI Scout + Closer + Builder + Harvest)│
       │    Cari leads → WA outreach → Onboard   │
       └─────────────────────────────────────────┘
                          │
       ┌──────────────────▼──────────────────────┐
       │            SHARED BRAIN                  │
       │  Supabase │ Groq AI │ Fonnte │ SerpAPI  │
       └─────────────────────────────────────────┘
```

### 2.1 Why Multiple Products?

| Advantage | Explanation |
|-----------|-------------|
| **Wider TAM** | Barbershop + Fashion + UMKM = jutaan bisnis |
| **Shared Infra** | Satu Supabase, satu AI engine, satu codebase pattern |
| **Cross-sell** | Barbershop owner punya istri jualan fashion → 2 langganan |
| **Predator Reuse** | Scout Agent tinggal ganti query: "barbershop" → "toko pakaian" |
| **Brand Authority** | "Sovereign" = platform UMKM digital, bukan app single-use |

---

## 3. FASHIONKAS — PRODUCT SPEC (CURRENT BUILD)

### 3.1 What Is FashionKas?
> Kasir digital + katalog online + WhatsApp automation untuk fashion reseller dan toko pakaian Indonesia.

### 3.2 Target User
- Fashion reseller rumahan (jualan via WA/IG)
- Toko pakaian kecil-menengah (1-3 karyawan)
- Online seller di marketplace yang mau punya katalog sendiri
- Reseller hijab, gamis, daster, kemeja

### 3.3 Core Features (Full Access - Beta)

| Feature | Description | Priority |
|---------|-------------|----------|
| **Kasir/POS** | Input transaksi, pilih produk, metode bayar | 🔴 CRITICAL |
| **Katalog Digital** | Manage produk, foto, harga, stok | 🔴 CRITICAL |
| **Katalog Publik** | Landing page shareable via WA/IG | 🔴 CRITICAL |
| **Dashboard** | Income hari ini/minggu/bulan, top products | 🔴 CRITICAL |
| **Order Management** | Track pesanan, status, resi pengiriman | 🔴 CRITICAL |
| **Customer Management** | Database pelanggan, history beli | 🟡 HIGH |
| **WA Automation** | Struk WA, reminder, promo blast | 🟡 HIGH |
| **Inventory Tracking** | Stok otomatis berkurang saat jual | 🔴 CRITICAL |
| **Profit Calculator** | Harga jual - harga modal = profit | 🔴 CRITICAL |
| **Export Report** | CSV/PDF laporan penjualan | 🟢 MEDIUM |

### 3.4 Database Schema (Supabase)

```sql
-- Stores (Multi-tenant)
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  owner_name TEXT NOT NULL,
  owner_phone TEXT NOT NULL,
  description TEXT,
  city TEXT,
  pin_code TEXT NOT NULL,
  subscription_tier TEXT DEFAULT 'beta',
  fonnte_token TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products/Catalog
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  cost_price INTEGER DEFAULT 0,
  stock INTEGER DEFAULT 0,
  sizes TEXT[],
  colors TEXT[],
  image_url TEXT,
  description TEXT,
  total_sold INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customers
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  total_orders INTEGER DEFAULT 0,
  total_spent INTEGER DEFAULT 0,
  segment TEXT DEFAULT 'new',
  last_order_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(store_id, phone)
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  order_number TEXT NOT NULL,
  customer_id UUID REFERENCES customers(id),
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  total_amount INTEGER NOT NULL,
  total_profit INTEGER DEFAULT 0,
  discount INTEGER DEFAULT 0,
  shipping_cost INTEGER DEFAULT 0,
  payment_method TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  shipping_status TEXT DEFAULT 'pending',
  tracking_number TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order Items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price INTEGER NOT NULL,
  cost_price INTEGER DEFAULT 0,
  size TEXT,
  color TEXT,
  subtotal INTEGER NOT NULL
);

-- WA Message Log
CREATE TABLE wa_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  customer_phone TEXT NOT NULL,
  message_type TEXT NOT NULL,
  message_text TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.5 API Endpoints

```
AUTH:
  POST /api/auth/register    → { store_name, owner_name, phone, pin }
  POST /api/auth/login       → { phone, pin } → JWT token

PRODUCTS:
  GET    /api/products        → List products (with filters)
  POST   /api/products        → Create product
  PUT    /api/products/:id    → Update product
  DELETE /api/products/:id    → Delete product

ORDERS:
  GET    /api/orders          → List orders (with status filter)
  POST   /api/orders          → Create order (auto-deduct stock)
  PUT    /api/orders/:id      → Update order status
  GET    /api/orders/:id      → Order detail

CUSTOMERS:
  GET    /api/customers       → List customers
  POST   /api/customers       → Create customer
  GET    /api/customers/:id   → Customer detail + history

DASHBOARD:
  GET    /api/dashboard/stats → Today/week/month stats
  GET    /api/dashboard/chart → Chart data (7-day/30-day)

WHATSAPP:
  POST   /api/wa/send-receipt → Send receipt to customer
  POST   /api/wa/webhook      → Fonnte incoming webhook

PUBLIC:
  GET    /catalog/:slug       → Public catalog page (no auth)
```

---

## 4. SOVEREIGN EMPIRE ARCHITECTURE

### 4.1 Tech Stack

| Component | Technology | Why |
|-----------|-----------|-----|
| Frontend | HTML + TailwindCSS CDN + Vanilla JS | Ringan, HP murah, no build step |
| Backend | Hono v4 + TypeScript | Edge-first, 12KB, Cloudflare native |
| Database | Supabase PostgreSQL | Free 500MB, realtime, auth, SDK |
| WA API | Fonnte | Murah Rp 50K, Indonesia, webhook |
| AI | Groq (Llama-3.3-70b) | Gratis, fast inference |
| Search | SerpAPI / ScraperAPI | Google Maps data, leads |
| Hosting | Cloudflare Pages | Gratis, global CDN, auto-HTTPS |
| Builder | GenSpark.AI | All-in-one workspace |

### 4.2 Deployment Map

```
PRODUCTS (Customer-Facing):
  fashionkas.pages.dev         → FashionKas App (CURRENT BUILD)
  barberkas.pages.dev          → BarberKas App (NEXT)

INTERNAL TOOLS:
  sovereign-predator.pages.dev → Predator Command Center
  sovereign-command.pages.dev  → Empire Dashboard

SHARED SERVICES:
  pavkyexnqzfmdrbfzoht.supabase.co → Database
  api.fonnte.com               → WhatsApp
  api.groq.com                 → AI
```

---

## 5. REVENUE MODEL

### 5.1 FashionKas Pricing (Beta Phase)

| Tier | Price | Features |
|------|-------|----------|
| **BETA** | Rp 0 (free) | Full access, all features, unlimited |
| **BASIC** (post-beta) | Rp 99.000/bln | 100 produk, kasir unlimited, WA 500 msg |
| **PRO** | Rp 249.000/bln | Unlimited produk, WA 3000 msg, multi-staff |
| **ENTERPRISE** | Rp 499.000/bln | Multi-outlet, analytics, priority support |

### 5.2 Combined Revenue Projection

| Month | BarberKas | FashionKas | Total MRR |
|-------|-----------|------------|-----------|
| 1 | Rp 297K (3 basic) | Rp 0 (beta) | Rp 297K |
| 2 | Rp 990K (10 basic) | Rp 297K (3 basic) | Rp 1.287M |
| 3 | Rp 1.98M (20 basic) | Rp 990K (10 basic) | Rp 2.97M |
| 4 | Rp 3.47M + PRO | Rp 1.98M | Rp 5.45M (~$350) |

---

## 6. PREDATOR AI — HOW IT SERVES ALL PRODUCTS

```
SCOUT AGENT:
  Input: "toko pakaian Purwokerto" OR "barbershop Jakarta"
  Process: SerpAPI → Google Maps → AI Score
  Output: Leads with digital gap score

CLOSER AGENT:
  Input: Leads dari Scout
  Process: Groq generates personal WA message
  Output: Fonnte sends WA → Track response

BUILDER AGENT:
  Input: Lead profile (name, services, prices)
  Process: Auto-generate landing page
  Output: Deploy to [name].pages.dev → Send link

HARVEST AGENT:
  Input: Active subscribers
  Process: Track expiry, send reminders
  Output: Revenue reports, churn prevention
```

---

## 7. SOVEREIGN PHILOSOPHY

```
"Uang Dulu, Sempurna Kemudian"
  → Ship FashionKas beta, iterate based on real feedback

"Niche Down, Scale Up"
  → Start with fashion reseller Purwokerto
  → Expand to barbershop → cafe → laundry

"Predator Never Sleeps"
  → AI hunts leads 24/7 across all verticals

"The Infinity Loop"
  → Hunt → Contact → Demo → Onboard → Collect → Reinvest → Hunt

"Sovereign = Self-Sustaining"
  → Each product feeds the next
  → Each customer becomes referral source
  → Revenue reinvests into expansion
```

---

## 8. IMMEDIATE ACTION ITEMS

### ✅ THIS SESSION
1. [x] Create Sovereign Empire PRD v2.0 (THIS DOC)
2. [x] Create Architecture Doc v2.0
3. [ ] Build FashionKas with full Supabase integration
4. [ ] Deploy to Cloudflare Pages
5. [ ] Push to GitHub (ganihypha/Fashionkas.git)

### 🔜 NEXT SESSION
1. [ ] Build BarberKas MVP with Supabase
2. [ ] Activate Scout Agent for fashion stores
3. [ ] First beta users onboarding

---

*Sovereign Empire PRD v2.0 | 17 Maret 2026*
*"From capster to tech emperor. One UMKM at a time."*
