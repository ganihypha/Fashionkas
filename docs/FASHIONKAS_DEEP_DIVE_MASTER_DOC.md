# FASHIONKAS by SOVEREIGN — DEEP DIVE & DEEP RESEARCH MASTER DOCUMENT
## Current State, Business Context, Research Insights & Implementation Roadmap
**Version**: 1.0 | **Date**: 25 Maret 2026 | **Status**: EXECUTION READY

---

## DAFTAR ISI

1. [Executive Summary](#1-executive-summary)
2. [Current State — Project Status v2.5](#2-current-state)
3. [Brand Architecture — FashionKas by Sovereign](#3-brand-architecture)
4. [Problem Definition & Market Opportunity](#4-problem-definition)
5. [User Archetypes & Persona Research](#5-user-archetypes)
6. [Product Deep Dive — Feature Inventory](#6-product-deep-dive)
7. [Technical Architecture](#7-technical-architecture)
8. [Monetization & Revenue Model](#8-monetization)
9. [Go-To-Market Strategy & 30-Day Roadmap](#9-gtm-strategy)
10. [90-Day Execution Roadmap](#10-90-day-roadmap)
11. [PMF Scorecard & Risk Analysis](#11-pmf-scorecard)
12. [Implementation Backlog — What's Next](#12-implementation-backlog)
13. [Appendix: Credentials & Configuration](#13-appendix)

---

## 1. EXECUTIVE SUMMARY

### Apa itu FashionKas?

**FashionKas** adalah katalog digital + kasir penjualan + WA automation untuk reseller fashion yang jualan lewat WhatsApp. Produk ini ditujukan untuk reseller fashion Indonesia (hijab, gamis, daster, pashmina, dll) yang masih mengelola order secara manual via chat WA.

### Verdikt Strategis

> **FashionKas layak dilanjutkan dan dimonetisasi.** Bukan karena brand-nya besar atau arsitekturnya ambisius, tapi karena behavioral insight di balik produknya nyata: reseller WA-first yang ordernya berantakan, follow-up-nya bocor, dan tidak mau pakai software rumit. Ini niche yang tepat untuk micro-SaaS operasional.

### Status Saat Ini (25 Maret 2026)

| Item | Status | Detail |
|------|--------|--------|
| **Production URL** | LIVE | https://fashionkas.pages.dev |
| **GitHub** | UPDATED | https://github.com/ganihypha/Fashionkas |
| **Version** | v2.5 | 7,851 baris kode, 52 modules |
| **Pages** | 13 halaman | Semua HTTP 200, 0 JS errors |
| **API Endpoints** | 30+ | Auth, Products, Orders, WA, Dashboard, Reports, AI, Webhook |
| **Database** | Supabase | 6 tables, RLS enabled |
| **WhatsApp** | Fonnte | Connected, 985 quota, Free plan |
| **Build Size** | ~376 KB | _worker.js compiled |
| **Deployment** | Cloudflare Pages | Auto-HTTPS, global CDN |

### Masalah yang Diperbaiki di v2.5

1. **Script Loading Error** — `apiFetch is not defined` menyebabkan semua halaman gagal load. **Fixed**: Semua helper functions dipindah ke `<head>` agar ter-define sebelum page scripts.
2. **Syntax Error "Unexpected identifier 'w'"** — `onerror` attribute di template literals pecah setelah Vite build. **Fixed**: Diganti dengan fungsi `imgFallback()`.
3. **Service Worker Stale Cache** — SW v2.1 meng-cache HTML lama, sehingga user selalu dapat versi usang. **Fixed**: SW v2.5, HTML network-only policy.
4. **Tombol "Tambah" tidak berfungsi** — Disebabkan script catalog yang crash karena syntax error #2 di atas. **Fixed**: Bersih setelah fix #2.

---

## 2. CURRENT STATE — PROJECT STATUS v2.5

### 2.1 Feature Completion Matrix

| Module | Completion | Detail |
|--------|-----------|--------|
| **Landing Page** | 100% | Hero, features, pricing, CTA, demo catalog preview |
| **Auth (Register/Login)** | 100% | PIN-based, JWT, phone number |
| **Dashboard** | 100% | Revenue harian/minggu/bulan, top products, low stock, chart |
| **Kasir/POS** | 100% | Cart, size/color picker, payment methods, DP/Lunas/Belum Bayar |
| **Katalog Management** | 100% | CRUD produk, R2 image upload, drag-drop, camera capture |
| **Katalog Publik** | 100% | Shareable link `/catalog/:slug`, no auth needed |
| **Order Management** | 100% | List, filter status, update shipping/payment, track resi |
| **WA Automation (Fonnte)** | 100% | Receipt, shipping notif, broadcast, custom msg, poll, location |
| **WA Auto-Reply Bot** | 100% | 15+ commands: HELP, KATALOG, CARI, ORDER, CEK, STOK, LAPORAN, OMZET |
| **Reports** | 100% | Daily/weekly/monthly, CSV export |
| **Settings** | 100% | Store profile, Fonnte status, webhook URL, subscription tiers |
| **Onboarding** | 100% | 4-step guided tour post-registration |
| **PWA** | 100% | Manifest, service worker, install banner, offline support |
| **AI Agents (Scout/Closer)** | 50% | UI ready, ScraperAPI integrated, belum fully autonomous |
| **Subscription System** | 30% | UI tiers ada, payment gateway belum terintegrasi |

### 2.2 Halaman & URI Reference

| Halaman | Path | Auth? |
|---------|------|-------|
| Landing Page | `/` | No |
| Login | `/login` | No |
| Register | `/register` | No |
| Dashboard | `/fashionkas/dashboard` | Yes |
| Kasir/POS | `/fashionkas/sale` | Yes |
| Katalog | `/fashionkas/catalog` | Yes |
| Orders | `/fashionkas/orders` | Yes |
| Settings | `/fashionkas/settings` | Yes |
| WA Automation | `/fashionkas/wa` | Yes |
| Reports | `/fashionkas/reports` | Yes |
| Scout Agent | `/fashionkas/scout` | Yes |
| Closer Agent | `/fashionkas/closer` | Yes |
| Onboarding | `/fashionkas/onboarding` | Yes |
| Public Catalog | `/catalog/:slug` | No |

### 2.3 API Endpoint Inventory

```
AUTH:
  POST /api/auth/register     → Registrasi toko baru
  POST /api/auth/login        → Login phone + PIN → JWT
  GET  /api/auth/me           → Info toko saat ini
  PUT  /api/auth/store        → Update profil toko
  PUT  /api/auth/change-pin   → Ganti PIN

PRODUCTS:
  GET    /api/products          → List produk (filter)
  POST   /api/products          → Tambah produk
  PUT    /api/products/:id      → Edit produk
  DELETE /api/products/:id      → Hapus produk
  GET    /api/products/public/:slug → Katalog publik

ORDERS:
  GET    /api/orders            → List pesanan
  POST   /api/orders            → Buat pesanan (auto-deduct stock)
  PUT    /api/orders/:id        → Update status pesanan

CUSTOMERS:
  GET    /api/customers         → List pelanggan

DASHBOARD:
  GET    /api/dashboard/stats   → Statistik harian/mingguan/bulanan
  GET    /api/dashboard/chart   → Data chart 7/30 hari

WHATSAPP:
  GET    /api/wa/status         → Status Fonnte device
  POST   /api/wa/send-receipt   → Kirim struk WA
  POST   /api/wa/send-shipping  → Notifikasi pengiriman
  POST   /api/wa/broadcast      → Broadcast ke customer
  POST   /api/wa/send-custom    → Pesan custom WA
  GET    /api/wa/history        → History pesan WA

IMAGES:
  POST   /api/images/upload     → Upload gambar ke R2
  GET    /api/images/serve/*    → Serve gambar dari R2

WEBHOOK:
  POST   /api/webhook/incoming  → Fonnte webhook receiver
  GET    /api/webhook/incoming  → Webhook status check

REPORTS:
  GET    /api/reports/*         → Endpoint laporan

AI:
  POST   /api/ai/scout          → Scout Agent
  POST   /api/ai/closer         → Closer Agent

HEALTH:
  GET    /api/health            → Health check + version info
```

### 2.4 Database Schema (Supabase PostgreSQL)

| Table | Key Fields | Purpose |
|-------|-----------|---------|
| **stores** | id, name, slug, owner_name, owner_phone, pin_code, subscription_tier | Data toko reseller (multi-tenant) |
| **products** | id, store_id, name, category, price, cost_price, stock, sizes[], colors[], image_url | Katalog produk per toko |
| **orders** | id, store_id, order_number, customer_name, total_amount, total_profit, payment_status, shipping_status | Pesanan/transaksi |
| **order_items** | id, order_id, product_id, product_name, quantity, unit_price, cost_price, subtotal | Item per pesanan |
| **customers** | id, store_id, name, phone, total_orders, total_spent, segment | Database pelanggan |
| **wa_messages** | id, store_id, customer_phone, message_type, message_text, status | Log pesan WhatsApp |

### 2.5 Tech Stack

| Component | Technology | Alasan |
|-----------|-----------|--------|
| **Backend** | Hono v4 + TypeScript | Edge-first, 12KB, Cloudflare native |
| **Frontend** | Tailwind CSS (CDN) + Vanilla JS | Ringan, no build step, HP murah |
| **Database** | Supabase PostgreSQL | Free 500MB, realtime, REST API |
| **Storage** | Cloudflare R2 | S3-compatible, gratis 10GB |
| **WA API** | Fonnte | Murah, Indonesia, webhook |
| **AI** | ScraperAPI + Groq (planned) | Lead scoring, market research |
| **Hosting** | Cloudflare Pages | Gratis, global CDN, auto-HTTPS |
| **Build** | Vite + @hono/vite-cloudflare-pages | Fast build (<1s) |

---

## 3. BRAND ARCHITECTURE — FashionKas by Sovereign

### 3.1 Keputusan Brand Final

| Layer | Name | Role |
|-------|------|------|
| **Parent / Ecosystem** | Sovereign | Vision, architecture, future expansion |
| **Product Brand (Front-facing)** | FashionKas | Akuisisi user, monetisasi |
| **Internal Platform** | Sovereign Engine | Tech layer, docs, pitch deck |
| **Future Verticals** | BarberKas, ResellerKas, CafeKas | Ekspansi setelah validasi |

### 3.2 Positioning Statement

> **FashionKas** adalah katalog digital, kasir penjualan, dan WA automation untuk reseller fashion yang jualan lewat WhatsApp. Upload produk, share 1 link katalog, catat transaksi, dan kelola pesanan tanpa ribet. **Powered by Sovereign Engine.**

### 3.3 Messaging Hierarchy

| Layer | Message |
|-------|---------|
| **1 — Paham (3 detik)** | FashionKas = alat jualan reseller fashion via WhatsApp |
| **2 — Manfaat** | Katalog digital, kasir penjualan, WA automation |
| **3 — Hasil** | Lebih rapi, lebih cepat, nggak perlu kirim foto satu-satu |
| **4 — Trust** | Gratis mulai, setup cepat, pricing jelas |
| **5 — Depth** | Powered by Sovereign Engine |

### 3.4 Brand Personality

- **Praktis** — fokus pada yang langsung berguna
- **Rapi** — menenangkan chaos operasional
- **Ramah** — tidak mengintimidasi user non-teknis
- **Sigap** — terasa cepat, ringan, siap dipakai

### 3.5 Tagline

**Utama**: *"Rapikan Jualan Fashion dari WhatsApp"*

**Alternatif**:
- Jualan Fashion Lebih Rapi, Lebih Cepat
- Dari Chat Berantakan ke Katalog yang Rapi
- 1 Link Katalog, Order Lebih Enak

### 3.6 Naming Rules

| Context | Format |
|---------|--------|
| **Ke market/public** | "FashionKas" selalu di depan |
| **Untuk trust** | "FashionKas by Sovereign" |
| **Footer/about** | "Powered by Sovereign Engine" |
| **Internal/tech docs** | "Sovereign Engine powering FashionKas" |
| **JANGAN** | Ganti-ganti nama di depan market |

---

## 4. PROBLEM DEFINITION & MARKET OPPORTUNITY

### 4.1 Core Problem

Reseller fashion Indonesia (jutaan orang) yang jualan lewat WhatsApp menghadapi:

1. **Order Berantakan** — Pesanan nyampur di chat, gampang terlewat
2. **Kirim Foto Manual** — Harus kirim foto produk satu-satu ke tiap customer
3. **Stok Tidak Rapi** — Tidak tahu produk mana yang masih ada/habis
4. **Follow-up Bocor** — Lupa follow-up customer yang belum bayar
5. **Omzet Tidak Kebaca** — Profit dan revenue tidak tercatat rapi
6. **Cashflow Campur** — Uang masuk tidak bisa dipisahkan per order

### 4.2 Market Size

| Metric | Angka |
|--------|-------|
| **Fashion e-commerce Indonesia** | $20B+ (2025) |
| **WA active users Indonesia** | 112+ juta |
| **Reseller fashion WA-first** | Jutaan (exact unknown) |
| **Fashion reseller rata-rata** | Rp 3-30 Juta omzet/bulan |
| **Willingness to pay** | Rp 49K-149K/bulan jika manfaat jelas |

### 4.3 Competitive Landscape

| Dimensi | FashionKas | Generic POS (Moka, iReap) | Manual (Buku/Excel) |
|---------|-----------|--------------------------|---------------------|
| **Interface** | WA-native | Separate app install | Paper/Spreadsheet |
| **Learning Curve** | Zero (3 min setup) | Hours of training | None |
| **Profit Visibility** | Real-time dashboard | Monthly reports only | Manual calculation |
| **Trust Level** | WA-based onboarding | Unknown link/brand | Full control |
| **Cost** | Rp 49K/bulan | Rp 150K-500K/bulan | Free (costly in time) |
| **Order Capture** | Direct from WA chat | Manual entry in-app | Manual buku tulis |
| **Target User** | Reseller WA fashion | Retail store/cafe | All (error-prone) |

### 4.4 The Moat (Kenapa Defensible)

1. **WA-Native Habit Lock-in** — Setelah terbiasa capture order dari WA, switching terasa mundur
2. **Data Network Effect** — Histori pelanggan yang valuable, tidak mudah dipindahkan
3. **Community Trust** — Word-of-mouth dalam komunitas reseller
4. **Fashion-Specific Workflow** — Variasi ukuran/warna, katalog visual, template WA fashion
5. **Bahasa & Konteks Lokal** — UX sepenuhnya Bahasa Indonesia

---

## 5. USER ARCHETYPES & PERSONA RESEARCH

### 5.1 Primary Persona: RESELLER FASHION WA

| Attribute | Detail |
|-----------|--------|
| **Nama** | Persona Generik (Reseller Fashion) |
| **Usia** | 22-35 Tahun |
| **Profil** | Reseller Rumahan (Gamis, Hijab, Daster) |
| **Lokasi** | Kota kecil/kabupaten, jualan dari rumah |
| **Volume** | 20-50 SKU, 5-20 order/hari |
| **Profit** | Rp 2-8 Juta/bulan |
| **Tools Harian** | WA (utama), IG, FB Group, Notes HP |
| **Pain** | Order nyampur di chat, sering lupa, stok manual, kirim foto 1-1 |
| **Fear** | Takut buka link asing, takut penipuan, ribet belajar hal baru |
| **Goal** | Jualan lebih rapi tanpa tambah ribet |
| **Trust Pattern** | Percaya kalau ada rekomendasi teman, screenshot, gratis dulu |

> *"Aku takut buka link yang nggak kenal. Takut penipuan. Semua transaksi harus di WA aja biar aman."* — Reseller tipikal

### 5.2 Extended Personas

| Persona | Profil | Volume | Pain Utama | FashionKas Use Case | Tier Target |
|---------|--------|--------|-----------|---------------------|-------------|
| **Santi** (32) | Dropshipper Level-Up | 100-500 SKU, 3-5 supplier | Multi-supplier chaos | Broadcast catalog, bulk order | Pro |
| **Dewi** (35) | Butik Kecil Offline+Online | 50-200 SKU | Stok offline-online tidak sinkron | Unified stock, catalog link | Pro |
| **Rina** (25) | Pre-Order Komunitas | 10-50 SKU (PO) | Rekap PO dari ratusan member grup | PO batch management, broadcast | Basic |
| **Fitri** (22) | Side Hustle Mahasiswi | 5-20 SKU | Tidak ada tracking, uang langsung habis | Free tier, daily summary | Free → Basic |

### 5.3 Decision Pattern

```
Problem felt → Trusted friend recommendation → Screenshot/Demo → Free Trial → Daily Habit Formed → Upgrade
```

### 5.4 Trust Ladder

```
Level 0: Belum kenal → WA/IG exposure
Level 1: Tahu brand → Screenshot + demo video
Level 2: Mau coba → Free trial 7-14 hari
Level 3: Pakai rutin → Daily habit, bantu setup
Level 4: Bayar → Terasa manfaatnya, closing ringan
Level 5: Rekomendasikan → Jadi referral source
```

---

## 6. PRODUCT DEEP DIVE — FEATURE INVENTORY

### 6.1 Source Code Statistics

```
TOTAL: 7,851 baris kode (52 TypeScript modules)

Top files by size:
  696 loc — routes/webhook.ts (Fonnte auto-reply bot, 15+ commands)
  598 loc — routes/wa.ts (Full Fonnte API integration)
  566 loc — pages/kasir.ts (POS/Kasir digital)
  553 loc — pages/catalog-manage.ts (Katalog management)
  500 loc — pages/settings.ts (Settings + Fonnte status)
  440 loc — pages/auth.ts (Login + Register)
  417 loc — routes/ai.ts (Scout + Closer agents)
  404 loc — pages/wa-automation.ts (WA automation UI)
  345 loc — pages/orders.ts (Order management)
  317 loc — pages/onboarding.ts (4-step onboarding)
  310 loc — pages/landing.ts (Landing page)
  297 loc — layout.ts (Shared layout + PWA)
  ...
```

### 6.2 Feature Detail — WhatsApp Bot Commands

| Command | Response | Category |
|---------|----------|----------|
| HELP / MENU | Menu lengkap bot | Info |
| KATALOG / HARGA | Daftar produk + harga | Catalog |
| CARI [keyword] | Pencarian produk | Catalog |
| ORDER [produk] | Request order via WA | Order |
| CEK [no order] | Status pesanan | Order |
| KATEGORI [nama] | Browse per kategori | Catalog |
| STOK | Ringkasan stok tersedia | Admin |
| LAPORAN | Ringkasan penjualan | Admin |
| OMZET | Revenue hari ini | Admin |
| AUDIT | Audit trail | Admin |
| BROADCAST [msg] | Kirim ke semua customer | Admin |
| TOP | Top products | Admin |
| LOW | Low stock alerts | Admin |
| CUSTOMER | Customer list | Admin |
| REGISTER | Panduan registrasi | Info |

### 6.3 Feature Gaps (Belum Diimplementasi)

| Feature | Priority | Status | Notes |
|---------|----------|--------|-------|
| **Payment Gateway Integration** | P0 | NOT STARTED | Duitku/Xendit untuk subscription |
| **WA OTP PIN Reset** | P1 | NOT STARTED | User lupa PIN, recovery via WA |
| **Per-Store Fonnte Config** | P1 | NOT STARTED | Setiap toko bisa punya Fonnte token sendiri |
| **Fonnte Super Plan Features** | P2 | NOT STARTED | Kirim gambar produk via WA (butuh upgrade Fonnte) |
| **Multi-Admin/Staff** | P2 | NOT STARTED | Role-based access per toko |
| **Smart Restock Suggestions** | P3 | NOT STARTED | ML-based alerts sebelum stockout |
| **Auto Broadcast Scheduler** | P3 | NOT STARTED | AI suggests best time to send |
| **Custom Domain** | P3 | NOT STARTED | fashionkas.id |

---

## 7. TECHNICAL ARCHITECTURE

### 7.1 System Overview

```
╔═══════════════════════════════════════════════════════╗
║                   INTERNET / USERS                      ║
╠═══════════════════════════════════════════════════════╣
║                                                         ║
║  fashionkas.pages.dev                                   ║
║  ┌─────────────────────────────────────────────────┐    ║
║  │          CLOUDFLARE PAGES (Edge)                 │    ║
║  │  ┌──────────────┐  ┌──────────────────────────┐ │    ║
║  │  │  Hono v4 +   │  │  Static Assets (public/)  │ │    ║
║  │  │  TypeScript   │  │  manifest.json, sw.js     │ │    ║
║  │  │  (_worker.js) │  │  icons, styles             │ │    ║
║  │  └──────┬───────┘  └──────────────────────────┘ │    ║
║  └─────────┼───────────────────────────────────────┘    ║
║            │                                            ║
║  ┌─────────▼───────────────────────────────────────┐    ║
║  │              SHARED SERVICES                     │    ║
║  │  ┌──────────┐ ┌────────┐ ┌──────┐ ┌──────────┐ │    ║
║  │  │ Supabase │ │ Fonnte │ │  R2  │ │ScraperAPI│ │    ║
║  │  │ Postgres │ │ WA API │ │Bucket│ │  Search  │ │    ║
║  │  │ + REST   │ │        │ │      │ │          │ │    ║
║  │  └──────────┘ └────────┘ └──────┘ └──────────┘ │    ║
║  └─────────────────────────────────────────────────┘    ║
╚═══════════════════════════════════════════════════════╝
```

### 7.2 Data Flow — Order Creation

```
[User taps "Simpan Transaksi" di POS]
         │
         ▼
[POST /api/orders]
         │
         ├→ Validate cart items & stock
         ├→ Number coercion (price, qty, cost_price)
         ├→ Resolve product_name (item.name || DB lookup)
         ├→ Create order record
         ├→ Create order_items records
         ├→ Deduct stock from products
         ├→ Update customer total_spent & total_orders
         ├→ Determine payment_status (paid/dp/pending)
         ├→ (Optional) Send WA receipt via Fonnte
         │
         ▼
[Response: { order_id, order_number, total, items }]
```

### 7.3 Security Architecture

| Rule | Implementation |
|------|---------------|
| No hardcoded secrets | `.dev.vars` local, CF Secrets production |
| Tenant isolation | JWT store_id scoping all queries |
| PIN hashing | SHA-256 with salt |
| HTTPS only | Cloudflare auto-HTTPS |
| Input validation | Server-side type coercion |
| CORS | `/api/*` routes only |

### 7.4 Git History (Key Milestones)

```
f56a1b9 v2.5 - Fix: Catalog/Sale/Orders loading + Tambah button
33fe351 v2.4 - DEFINITIVE FIX: apiFetch not defined on ALL pages
0a335be v2.3 - Fix: apiFetch/getStore not defined on Onboarding
6b53d68 v2.2 - R2 Upload UI + Fonnte Status + Subscription Tiers
dc2a835 v2.1 - PWA + Onboarding + DP/Lunas + Bug Fixes
a26fa54 v2.0 - Fonnte Webhook Bot + Auto-Reply + CLI Commands
107ddeb v1.2.1 - FULL Fonnte API Deep Integration
d06ece0 v1.2.0 - AI Agents + WA Automation + Reports
739b6f3 v1.1.0 - Major Enhancement
8d411ab v1.0 - Complete POS system for fashion resellers
```

---

## 8. MONETIZATION & REVENUE MODEL

### 8.1 Prinsip Monetisasi

> **Jangan jual "software". Jual "rapi + hemat waktu + order nggak bocor".**

Reseller kecil tidak merasa sedang membeli SaaS. Mereka membeli:
- Biar order tidak hilang
- Biar chat tidak bikin pusing
- Biar status bayar jelas
- Biar pengiriman tidak kelupaan
- Biar omzet terasa lebih kebaca

### 8.2 Revenue Layers

| Layer | Model | Detail |
|-------|-------|--------|
| **Layer 1** | MRR Langganan | Mesin utama: Free → Basic → Pro |
| **Layer 2** | Paid Setup | Bantu input produk awal, setting pesan, training 30 menit |
| **Layer 3** | Add-on | Extra broadcast quota, multi-admin, multi-toko, laporan detail |
| **Layer 4** | Done-with-you | Semi-jasa: "Kami bantu rapikan alur order WA kamu, plus tools-nya" |

### 8.3 Pricing Structure

| Tier | Price | Target | Features |
|------|-------|--------|----------|
| **BETA / Free** | Rp 0 | New users, trial | Input order terbatas, 1 akun, laporan dasar |
| **BASIC** | Rp 49.000-99.000/bln | Reseller aktif | Order unlimited, WA struk, customer list, laporan, katalog |
| **PRO** | Rp 149.000-249.000/bln | Heavy users | Broadcast, multi-admin, reminder, insight, export |
| **ENTERPRISE** | Rp 499.000/bln | Multi-outlet | Multi-toko, priority support, analytics |

### 8.4 Revenue Projection (Conservative)

| Month | Users (Free) | Users (Paid) | MRR | Notes |
|-------|-------------|-------------|-----|-------|
| 1 | 10 | 0 | Rp 0 | Beta, free trial |
| 2 | 25 | 3 | Rp 297K | First paying users |
| 3 | 50 | 10 | Rp 990K | Word-of-mouth |
| 4 | 80 | 20 | Rp 1.98M | Referral + outreach |
| 5 | 120 | 35 | Rp 3.47M | + Pro upgrades |
| 6 | 200 | 60 | Rp 5.94M (~$380) | Self-sustaining |

### 8.5 Payment Gateway Plan

**Platform**: Duitku (Indonesian payment gateway)
- **Duitku POP** — In-page payment popup
- **Supported**: VA (BCA, Mandiri, BNI), QRIS, GoPay, OVO, ShopeePay
- **MDR**: 2-3% per transaction
- **Settlement**: T+1 business day
- **Integration**: REST API + callback webhook

### 8.6 Unit Economics

```
Biaya Infrastruktur per Bulan:
  Cloudflare Pages   = Rp 0 (free tier)
  Supabase           = Rp 0 (free tier, 500MB)
  Fonnte (per user)  = Rp 0-45K (free-super)
  R2 Storage         = Rp 0 (free 10GB)
  
TOTAL INFRA/USER    ≈ Rp 0-15K/bulan

Revenue per User    = Rp 49K-249K/bulan
Margin per User     = Rp 34K-249K (70-100%)

Break-even          = 0 users (infra already free)
Real break-even     = 10 paid users (covers Fonnte + time)
```

---

## 9. GO-TO-MARKET STRATEGY & 30-DAY ROADMAP

### 9.1 GTM Philosophy

> **Cari user nyata, bukan bikin konsep baru.**

Target 30 hari:
- 1 positioning solid
- 1 landing page meyakinkan
- 5-20 prospect relevan
- 3 trial
- 1 user aktif
- 1 bukti manfaat
- 1 testimoni
- Kalau bisa: 1 pembayaran pertama

### 9.2 Minggu 1 — Fix Identity & Offer (Hari 1-7)

| Hari | Action |
|------|--------|
| **1-2** | Bekukan brand: FashionKas di depan, Sovereign di belakang. Jangan ganti lagi. |
| **2-3** | Bekukan promise: "Bantu reseller fashion rapikan order WhatsApp jadi katalog, transaksi, dan follow-up." |
| **3-4** | Rapikan landing page: problem → solusi → demo → fitur → harga → CTA → proof |
| **4-5** | Proof starter pack: 3 screenshot, 1 demo video 30-60 detik, 1 akun demo, 1 before/after |
| **6-7** | Finalisasi offer: Free trial 7-14 hari, free setup 3 user pertama, no credit card |

### 9.3 Minggu 2 — Prospecting & Demo (Hari 8-14)

| Hari | Action |
|------|--------|
| **8-10** | Bangun daftar 5 panas + 10 sedang + 5 cadangan dari komunitas reseller lokal |
| **10-11** | Siapkan 2 script outreach (halus + direct) |
| **12-14** | Jalankan 5 outreach, target 2-3 demo, 1-2 mau coba |

**Script Outreach (Halus)**:
> "Kak, saya lagi bantu seller fashion yang jualan lewat WA supaya katalog dan ordernya lebih rapi. Saya bikin tool sederhana buat upload produk, share 1 link katalog, dan catat penjualan. Kalau berkenan, saya boleh tunjukkan demo singkat 2 menit?"

**Script Outreach (Direct)**:
> "Kak, saya punya tool untuk reseller fashion: katalog digital + kasir + WA automation. Cocok kalau masih kirim foto produk manual satu-satu. Lagi buka trial untuk early user."

### 9.4 Minggu 3 — Activation & Proof (Hari 15-21)

| Hari | Action |
|------|--------|
| **15-17** | Onboard pilot pertama: upload 5-10 produk, atur harga, cek link, simulasi transaksi |
| **18-19** | Observasi friction: di mana user bingung? upload lama? checkout kurang natural? |
| **20-21** | Ambil bukti pertama: screenshot, testimoni, before/after workflow |

### 9.5 Minggu 4 — Conversion & Assetization (Hari 22-30)

| Hari | Action |
|------|--------|
| **22-24** | Rapikan case study mini: masalah → solusi → hasil → kutipan |
| **25-26** | Closing ringan: "Kalau cocok, saya buka paket Basic Rp99K/bulan. Untuk early user saya bantu setup." |
| **27-28** | Jadikan proof ke landing page: 1 testimoni, 1 screenshot, 1 mini case |
| **29-30** | Review brutal: apakah orang paham? Ada user aktif? Ada bukti? Ada willingness to pay? |

### 9.6 KPI 30 Hari

| Metric | Target Minimum |
|--------|---------------|
| Prospect terkumpul | 20 |
| Outreach terkirim | 10 |
| Demo terlaksana | 3 |
| Trial dimulai | 2 |
| User aktif nyata | 1 |
| Testimoni / bukti manfaat | 1 |
| Pembayaran / komitmen bayar | 1 |

---

## 10. 90-DAY EXECUTION ROADMAP

### Phase 1: Validation (Hari 1-30) — CURRENT

**Focus**: Buktikan bahwa reseller fashion mau pakai dan mau bayar.

| Sprint | Action | Deliverable |
|--------|--------|-------------|
| Sprint 1 (W1) | Fix identity, offer, proof pack | Landing page tajam + demo video |
| Sprint 2 (W2) | Prospecting + outreach | 5+ demo, 2+ trial |
| Sprint 3 (W3) | Onboard pilot + observe | 1 active user, friction list |
| Sprint 4 (W4) | Convert + collect proof | 1 testimoni, 1 case study |

### Phase 2: Activation (Hari 31-60)

**Focus**: Dari 1 user → 10 users. Improve onboarding. Start charging.

| Sprint | Action | Deliverable |
|--------|--------|-------------|
| Sprint 5 (W5-6) | **Payment gateway integration** (Duitku) | Subscription checkout working |
| Sprint 6 (W7-8) | Fix top 3 friction points from Phase 1 | Improved UX, faster setup |
| Sprint 7 (W8) | **WA OTP for PIN reset** | Self-service recovery |
| Sprint 8 (W8) | Expand outreach: 20 prospects, 5 trials | 3-5 paying users |

### Phase 3: Growth (Hari 61-90)

**Focus**: Dari 10 → 50 users. Feature expansion. Scale akuisisi.

| Sprint | Action | Deliverable |
|--------|--------|-------------|
| Sprint 9 (W9-10) | **Per-store Fonnte config** | Each store can use own WA number |
| Sprint 10 (W10-11) | **Multi-admin/staff** | Role-based access per store |
| Sprint 11 (W11-12) | Social media content: TikTok, IG, demo videos | Content pipeline |
| Sprint 12 (W12) | Scale to 20+ paid users, evaluate PMF | Revenue report, PMF score |

---

## 11. PMF SCORECARD & RISK ANALYSIS

### 11.1 Product-Market Fit Score (Current)

| Dimension | Score | Notes |
|-----------|-------|-------|
| **Problem Clarity** | 9/10 | Pain reseller WA sangat jelas, terdokumentasi |
| **Solution Clarity** | 8/10 | Feature set match pain points |
| **Technical Feasibility** | 9/10 | Stack ringan, build <1s, infra gratis |
| **Trust/Readiness to Buy** | 5/10 | Landing page sudah ada, belum ada proof/testimoni |
| **GTM Maturity** | 4/10 | Belum ada outreach nyata ke market |
| **Revenue Validation** | 2/10 | Pricing sudah didesign, belum ada pembayaran |
| **OVERALL** | **6.2/10** | **Product ready, market validation needed** |

### 11.2 Risk Matrix

| Risk | Severity | Probability | Mitigation |
|------|----------|------------|------------|
| **User tidak mengerti value** | High | Medium | Demo video, free setup, simple copy |
| **Fonnte dependency/ban** | High | Low | Abstraction layer, backup provider plan |
| **Security: token leakage** | High | Medium | Secret rotation, never commit .dev.vars |
| **Scope creep** | Medium | High | Stick to niche: fashion reseller WA |
| **User churn (tidak sticky)** | High | Medium | Daily habit features, WA integration |
| **Competitor copies** | Low | Low | Habit lock-in + community trust |
| **Tech debt from inline JS** | Medium | High | Gradual refactor to component-based |

### 11.3 Non-Negotiables (Selama 90 Hari)

1. **Jangan ganti brand lagi** — FashionKas is final
2. **Jangan tambah niche baru** — Fashion only
3. **Jangan overbuild fitur** — Fix friction first
4. **Jangan pakai visi besar untuk menutupi belum adanya bukti kecil**
5. **Jangan scale sebelum PMF terbukti**

---

## 12. IMPLEMENTATION BACKLOG — WHAT'S NEXT

### 12.1 P0 — Must Do Now (This Week)

| # | Task | Effort | Impact |
|---|------|--------|--------|
| 1 | **Payment Gateway Integration (Duitku)** | 2-3 days | Revenue enabler |
| 2 | **WA OTP PIN Reset** | 1 day | User recovery |
| 3 | **Proof Pack: Demo video + screenshots** | 1 day | GTM asset |
| 4 | **Outreach to 5 pilot resellers** | Ongoing | Validation |

### 12.2 P1 — Do This Month

| # | Task | Effort | Impact |
|---|------|--------|--------|
| 5 | Per-store Fonnte config (user brings own WA) | 2 days | Scalability |
| 6 | Subscription enforcement (lock features by tier) | 2 days | Revenue |
| 7 | Fonnte Super plan image sending | 1 day | WA quality |
| 8 | Landing page sharpening (add proof section) | 1 day | Conversion |

### 12.3 P2 — Next Month

| # | Task | Effort | Impact |
|---|------|--------|--------|
| 9 | Multi-admin workspace | 3 days | Team stores |
| 10 | Smart restock suggestions | 2 days | User value |
| 11 | Auto broadcast scheduler | 2 days | Automation |
| 12 | Custom domain (fashionkas.id) | 1 day | Brand trust |

### 12.4 P3 — Later (After PMF)

| # | Task | Effort | Impact |
|---|------|--------|--------|
| 13 | BarberKas vertical expansion | 1-2 weeks | TAM expansion |
| 14 | Sovereign Predator AI activation | 1-2 weeks | Lead gen |
| 15 | Multi-product ecosystem dashboard | 1 week | Empire vision |

---

## 13. APPENDIX: CREDENTIALS & CONFIGURATION

### 13.1 Service Configuration

| Service | URL/Config | Status |
|---------|-----------|--------|
| **Production** | https://fashionkas.pages.dev | LIVE |
| **GitHub** | https://github.com/ganihypha/Fashionkas | Updated (v2.5) |
| **Supabase** | pavkyexnqzfmdrbfzoht.supabase.co | Connected |
| **Fonnte Webhook** | https://fashionkas.pages.dev/api/webhook/incoming | Active |
| **Cloudflare Account** | 618d52f63c689422eacf6638436c3e8b | Active |
| **R2 Bucket** | Via Cloudflare R2 binding | Active |

### 13.2 Fonnte Setup Guide

1. Masuk ke **fonnte.com** → Device → Edit
2. Set **Webhook URL**: `https://fashionkas.pages.dev/api/webhook/incoming`
3. Set **Webhook Connect**: `https://fashionkas.pages.dev/api/webhook/incoming`
4. Set **Webhook Message Status**: `https://fashionkas.pages.dev/api/webhook/status`
5. **Autoread**: ON
6. **Personal**: ON
7. **Group**: ON

**Note**: Free plan = text only. Upgrade ke Super (Rp45rb/bln) untuk kirim gambar.

### 13.3 File Structure

```
webapp/
├── src/
│   ├── index.tsx           # Main entry point (120 loc)
│   ├── lib/
│   │   └── supabase.ts     # Supabase client helper (154 loc)
│   ├── routes/
│   │   ├── auth.ts         # Auth routes (202 loc)
│   │   ├── products.ts     # Product CRUD (133 loc)
│   │   ├── orders.ts       # Order management (202 loc)
│   │   ├── customers.ts    # Customer routes (46 loc)
│   │   ├── dashboard.ts    # Dashboard stats (149 loc)
│   │   ├── wa.ts           # WA Fonnte routes (598 loc)
│   │   ├── reports.ts      # Report routes (125 loc)
│   │   ├── images.ts       # R2 image upload (182 loc)
│   │   ├── ai.ts           # AI agents (417 loc)
│   │   └── webhook.ts      # WA bot webhook (696 loc)
│   └── fashion/
│       ├── layout.ts       # Shared layout + PWA (297 loc)
│       └── pages/
│           ├── landing.ts       # Landing page (310 loc)
│           ├── auth.ts          # Login/Register (440 loc)
│           ├── dashboard.ts     # Dashboard (223 loc)
│           ├── kasir.ts         # POS/Kasir (566 loc)
│           ├── catalog-manage.ts # Katalog CRUD (553 loc)
│           ├── catalog-public.ts # Public catalog (256 loc)
│           ├── orders.ts        # Order management (345 loc)
│           ├── settings.ts      # Settings (500 loc)
│           ├── wa-automation.ts # WA automation (404 loc)
│           ├── reports.ts       # Reports (275 loc)
│           ├── scout-agent.ts   # Scout AI (229 loc)
│           ├── closer-agent.ts  # Closer AI (279 loc)
│           └── onboarding.ts    # Onboarding flow (317 loc)
├── public/
│   ├── manifest.json       # PWA manifest
│   ├── sw.js               # Service worker v2.5
│   └── static/
│       ├── icon-192.png    # PWA icon
│       └── icon-512.png    # PWA icon
├── docs/
│   ├── SOVEREIGN_EMPIRE_PRD_V2.md
│   ├── SOVEREIGN_EMPIRE_ARCHITECTURE_V2.md
│   ├── SOVEREIGN_EMPIRE_TODO.md
│   └── FASHIONKAS_DEEP_DIVE_MASTER_DOC.md (THIS FILE)
├── .dev.vars               # Local secrets (NOT committed)
├── .gitignore
├── ecosystem.config.cjs    # PM2 config
├── package.json
├── supabase-setup.sql      # Database schema
├── tsconfig.json
├── vite.config.ts
├── wrangler.jsonc           # Cloudflare config
└── README.md               # Project documentation
```

---

## KESIMPULAN

### Apa yang Sudah Tercapai

FashionKas v2.5 adalah **produk yang sudah fungsional 85%** dengan 13 halaman, 30+ API endpoints, WhatsApp bot integration, PWA support, dan Cloudflare R2 image upload. Semua bug kritis (apiFetch, syntax errors, stale cache) sudah diperbaiki. Produk ini **siap digunakan oleh real users**.

### Apa yang Perlu Dilakukan Sekarang

**Bukan tambah fitur. Bukan perbesar arsitektur. Tapi:**

1. **Cari 5 reseller nyata** untuk trial
2. **Integrasikan payment gateway** (Duitku) untuk monetisasi
3. **Buat proof pack** (demo video, screenshots, before/after)
4. **Onboard 1-2 pilot users** dan observasi friction
5. **Kumpulkan 1 testimoni nyata** untuk landing page

### Kalimat Paling Jujur

> FashionKas sudah cukup bagus untuk dijual. Yang kurang bukan fitur, tapi bukti. Bukti bahwa ada orang nyata yang pakai, ada manfaat yang terasa, dan ada willingness to pay. **Proof kecil yang nyata jauh lebih kuat dari mimpi besar tanpa user.**

---

**FashionKas by Sovereign**
*Rapikan Jualan Fashion dari WhatsApp*
*Powered by Sovereign Engine*

**Document**: FASHIONKAS_DEEP_DIVE_MASTER_DOC.md
**Version**: 1.0 | **Date**: 25 Maret 2026
**Sources**: 16 research files analyzed + full codebase audit + 19 git commits reviewed
