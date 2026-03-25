# RESELLERKAS — ARCHITECTURE DOCUMENT
## Layer 2: Technical Architecture for Multi-Category Reseller Platform
**Version**: 1.0 | **Date**: 25 Maret 2026 | **Status**: PLANNING — BELUM DIBANGUN

---

## ⚠️ Dokumen ini adalah RENCANA arsitektur. Belum diimplementasi.

---

## 1. SYSTEM OVERVIEW

```
╔══════════════════════════════════════════════════════════════╗
║                    INTERNET / USERS                         ║
║  (Multi-category resellers)                                 ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  resellerkas.pages.dev (Cloudflare Pages - Edge)            ║
║  ┌────────────────────────────────────────────────────┐     ║
║  │   Hono v4 + TypeScript                              │     ║
║  │                                                     │     ║
║  │   ┌─────────────────┐  ┌────────────────────────┐  │     ║
║  │   │  API Routes       │  │  Page Routes (SSR)      │  │     ║
║  │   │  /api/*           │  │  /resellerkas/* (app)   │  │     ║
║  │   │  + supplier APIs  │  │  + supplier pages       │  │     ║
║  │   │  + sub-reseller   │  │  + analytics pages      │  │     ║
║  │   │  + multi-store    │  │  + multi-store switch    │  │     ║
║  │   └─────────┬─────────┘  └────────────────────────┘  │     ║
║  └─────────────┼────────────────────────────────────────┘     ║
║                │                                              ║
║  ┌─────────────▼────────────────────────────────────────┐    ║
║  │              SHARED SERVICES (same as FashionKas)     │    ║
║  │  Supabase │ Fonnte │ R2 │ ScraperAPI                 │    ║
║  └──────────────────────────────────────────────────────┘    ║
╚══════════════════════════════════════════════════════════════╝
```

---

## 2. DATABASE ARCHITECTURE (Extensions from FashionKas)

### 2.1 Existing Tables (shared with FashionKas):
- `stores` — add `type` column ('fashion' | 'multi-category')
- `products` — add `supplier_id`, `category_group`
- `orders`, `order_items`, `customers`, `wa_messages` — unchanged

### 2.2 New Tables:

```sql
-- Suppliers
CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  address TEXT,
  categories TEXT[] DEFAULT '{}',
  notes TEXT,
  total_orders INTEGER DEFAULT 0,
  total_spent INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sub-Resellers
CREATE TABLE sub_resellers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  commission_rate DECIMAL(5,2) DEFAULT 10.00,
  total_sales INTEGER DEFAULT 0,
  total_commission INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  joined_at TIMESTAMPTZ DEFAULT NOW()
);

-- Store Groups (multi-store)
CREATE TABLE store_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_phone TEXT NOT NULL,
  name TEXT DEFAULT 'My Stores',
  stores UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Purchase Orders (to suppliers)
CREATE TABLE purchase_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  supplier_id UUID REFERENCES suppliers(id),
  total_amount INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft',
  items JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 3. API EXTENSIONS

### New API Routes (on top of FashionKas APIs):

```
SUPPLIERS:
  GET    /api/suppliers          → List suppliers (filter by category)
  POST   /api/suppliers          → Create supplier
  PUT    /api/suppliers/:id      → Update supplier
  DELETE /api/suppliers/:id      → Delete supplier

SUB-RESELLERS:
  GET    /api/sub-resellers      → List sub-resellers
  POST   /api/sub-resellers      → Add sub-reseller
  PUT    /api/sub-resellers/:id  → Update (commission, status)
  GET    /api/sub-resellers/:id/sales → Sales by sub-reseller

MULTI-STORE:
  GET    /api/stores             → List all stores for current user
  POST   /api/stores/switch/:id  → Switch active store
  POST   /api/stores/create      → Create additional store

ANALYTICS:
  GET    /api/analytics/category      → Profit by category
  GET    /api/analytics/supplier      → Spend by supplier
  GET    /api/analytics/sub-reseller  → Sales by sub-reseller
  GET    /api/analytics/comparison    → Period comparison

PURCHASE ORDERS:
  GET    /api/purchase-orders         → List POs
  POST   /api/purchase-orders         → Create PO to supplier
  PUT    /api/purchase-orders/:id     → Update PO status
```

---

## 4. PAGE STRUCTURE

### New Pages (on top of FashionKas):

```
/resellerkas/suppliers        → Supplier management
/resellerkas/sub-resellers    → Sub-reseller network
/resellerkas/analytics        → Category & supplier analytics
/resellerkas/purchase-orders  → POs to suppliers
/resellerkas/stores           → Multi-store switcher
```

### Modified Pages:
- Dashboard → add category breakdown widget
- Catalog → add supplier filter, category groups
- Reports → add per-category and per-supplier reports

---

## 5. MIGRATION PATH (FashionKas → ResellerKas)

```
[FashionKas user clicks "Upgrade ke ResellerKas"]
         │
         ▼
[System checks: store has >1 category OR user requests multi-category]
         │
         ▼
[Create ResellerKas account with same credentials]
         │
         ├→ Copy all products, orders, customers
         ├→ Set store.type = 'multi-category'
         ├→ Enable new features (suppliers, sub-resellers)
         │
         ▼
[User redirected to resellerkas.pages.dev]
[FashionKas data still accessible but read-only]
```

---

## 6. DEPLOYMENT

```
Repo:       github.com/ganihypha/Reseller.kas
Deploy:     resellerkas.pages.dev
Database:   Same Supabase (shared with FashionKas)
Build:      Same as FashionKas (Vite + Hono + CF Pages)
```

---

**ResellerKas Architecture v1.0**
**Document**: docs/resellerkas/ARCHITECTURE.md
**Date**: 25 Maret 2026
**Status**: PLANNING ONLY
