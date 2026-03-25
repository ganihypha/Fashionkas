# RESELLERKAS — PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Layer 2: Multi-Category Reseller Management Platform
**Version**: 1.0 | **Date**: 25 Maret 2026 | **Status**: PLANNING — BELUM DIBANGUN

---

## ⚠️ STATUS: BELUM DIBANGUN

**ResellerKas TIDAK boleh dibangun sebelum FashionKas validated.**

### Prerequisites sebelum mulai build:
1. ✅ FashionKas live (DONE)
2. ⬜ FashionKas punya 10 paying users
3. ⬜ Ada demand nyata dari FashionKas users yang butuh multi-kategori
4. ⬜ FashionKas codebase stabil dan maintainable
5. ⬜ Ada testimoni + case study dari FashionKas

---

## 1. EXECUTIVE SUMMARY

**ResellerKas** adalah platform manajemen reseller MULTI-KATEGORI — versi yang lebih luas dari FashionKas. Sementara FashionKas fokus hanya pada fashion, ResellerKas melayani reseller yang jual berbagai kategori produk.

### Satu Kalimat:
> "ResellerKas — Kelola semua jualan reseller dari satu tempat, apapun kategorinya."

### Hubungan dengan FashionKas:
- ResellerKas = **upgrade path** dari FashionKas
- FashionKas users yang butuh multi-kategori → migrate ke ResellerKas
- FashionKas tetap jalan untuk fashion-only reseller
- Keduanya berdiri sebagai **brand mandiri**

---

## 2. PROBLEM STATEMENT

### Siapa yang mengalami masalah?
Reseller Indonesia yang jual >1 kategori produk via WhatsApp:
- Fashion + Skincare + Snack
- Elektronik + Aksesoris + Fashion
- Herbal + Makanan + Household

### Pain Points TAMBAHAN (di luar pain FashionKas):

| # | Pain | Detail |
|---|------|--------|
| 1 | **Multi-supplier chaos** | Manage stok dari 3-5 supplier berbeda |
| 2 | **Kategori campur** | Produk fashion campur dengan skincare di satu list |
| 3 | **Profit per kategori unclear** | Tidak tahu kategori mana yang paling untung |
| 4 | **Multi-store needed** | Punya >1 "toko" (1 fashion, 1 beauty) tapi manage sendiri |
| 5 | **Sub-reseller management** | Recruit reseller di bawah, tapi tracking manual |
| 6 | **Supplier order tracking** | PO ke supplier tidak terlacak |

---

## 3. TARGET USER

### Primary Persona: SANTI

| Atribut | Detail |
|---------|--------|
| **Nama** | Santi (representatif) |
| **Usia** | 28-40 Tahun |
| **Profil** | Reseller multi-kategori, ex-FashionKas user |
| **Volume** | 100-500 SKU, 3-5 supplier, 20-50 order/hari |
| **Omzet** | Rp 10-50 Juta/bulan |
| **Pain** | Multi-supplier chaos, kategori campur, profit tidak jelas per kategori |
| **Migration Path** | FashionKas Basic → ResellerKas Pro |

### Extended Personas:

| Persona | Profil | FashionKas vs ResellerKas |
|---------|--------|--------------------------|
| **Dina** (35) | Distributor kecil, supply ke 10+ reseller | ResellerKas Enterprise |
| **Ari** (30) | Reseller elektronik + aksesoris HP | ResellerKas Pro |
| **Mega** (27) | Reseller herbal + snack + household | ResellerKas Basic |

---

## 4. PRODUCT SCOPE

### 4.1 Fitur yang SAMA dengan FashionKas:
- ✅ Katalog digital + CRUD produk
- ✅ Kasir/POS + cart + payment methods
- ✅ Order management + status tracking
- ✅ Customer database
- ✅ WA Automation (Fonnte)
- ✅ Dashboard + reports
- ✅ Public catalog link
- ✅ PWA

### 4.2 Fitur TAMBAHAN ResellerKas (tidak ada di FashionKas):

| Fitur | Prioritas | Detail |
|-------|-----------|--------|
| **Multi-Category** | CRITICAL | Fashion, Beauty, Food, Elektronik, Herbal, Custom |
| **Category Analytics** | HIGH | Profit per kategori, trending per kategori |
| **Multi-Store** | HIGH | 1 akun → banyak toko/brand |
| **Supplier Management** | HIGH | Track supplier, PO, harga modal per supplier |
| **Sub-Reseller Network** | MEDIUM | Recruit sub-reseller, track commission |
| **Advanced Inventory** | MEDIUM | Cross-category stock, reorder points |
| **Bulk Operations** | MEDIUM | Bulk price update, bulk import CSV |
| **Multi-Admin** | MEDIUM | Staff roles: admin, kasir, gudang |
| **Advanced Reports** | LOW | Comparison charts, export PDF |

### 4.3 Apa yang ResellerKas TIDAK lakukan:
- ❌ Marketplace (bukan jualan langsung ke consumer)
- ❌ ERP (bukan accounting software)
- ❌ CRM enterprise (sederhana, bukan Salesforce)

---

## 5. PRICING

| Tier | Price | Target |
|------|-------|--------|
| **BASIC** | Rp 99.000/bln | Reseller 2-3 kategori, 1 toko |
| **PRO** | Rp 249.000/bln | Multi-kategori, multi-toko, sub-reseller |
| **ENTERPRISE** | Rp 499.000/bln | Distributor, multi-staff, analytics |

### Migration Pricing (dari FashionKas):
- FashionKas Basic → ResellerKas Basic: **Rp 49K tambahan/bulan**
- FashionKas Pro → ResellerKas Pro: **Gratis upgrade 1 bulan pertama**

---

## 6. TECHNICAL PLAN

### Stack (sama dengan FashionKas):
- Hono v4 + TypeScript + Cloudflare Pages
- Supabase PostgreSQL (shared database, beda schema tables)
- Fonnte API (WA)
- Cloudflare R2 (images)

### Database Additions:
```sql
-- New tables for ResellerKas
CREATE TABLE suppliers (
  id UUID PRIMARY KEY,
  store_id UUID REFERENCES stores(id),
  name TEXT NOT NULL,
  phone TEXT,
  categories TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sub_resellers (
  id UUID PRIMARY KEY,
  parent_store_id UUID REFERENCES stores(id),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  commission_rate DECIMAL DEFAULT 0,
  total_sales INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add category to products (already exists in FashionKas)
-- Add supplier_id to products
ALTER TABLE products ADD COLUMN supplier_id UUID REFERENCES suppliers(id);
```

### Deployment:
```
Repo:    github.com/ganihypha/Reseller.kas
Deploy:  resellerkas.pages.dev
Branch:  main
```

---

## 7. ROADMAP (CONDITIONAL)

### Fase 0: Validation (SEKARANG)
- ⬜ Tunggu FashionKas validated (10 paying users)
- ⬜ Collect feedback: "Apakah user FashionKas butuh multi-kategori?"
- ⬜ Survey 10 FashionKas users tentang kebutuhan multi-kategori

### Fase 1: MVP Build (After FashionKas validated)
- Fork FashionKas codebase
- Add multi-category support
- Add supplier management
- Deploy ke resellerkas.pages.dev

### Fase 2: Activation
- Migrate interested FashionKas users
- Onboard 5 ResellerKas pilot users
- Collect feedback & iterate

### Fase 3: Growth
- Sub-reseller network
- Advanced analytics
- Multi-admin

---

## 8. RISKS

| Risk | Mitigation |
|------|------------|
| Build terlalu cepat sebelum FashionKas validated | JANGAN mulai sebelum 10 paying users |
| Scope terlalu luas (semua kategori) | Start dengan 3 kategori populer saja |
| Canibalisasi FashionKas | Pricing tier berbeda, migration path jelas |
| Technical complexity | Fork FashionKas, bukan build from scratch |

---

**ResellerKas PRD v1.0**
**Document**: docs/resellerkas/PRD.md
**Date**: 25 Maret 2026
**Status**: PLANNING ONLY — Build after FashionKas validated
