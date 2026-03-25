# FASHIONKAS — PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Layer 1: Brand Standalone untuk Fashion Reseller WA-First
**Version**: 3.0 | **Date**: 25 Maret 2026 | **Status**: EXECUTION READY

---

## 1. EXECUTIVE SUMMARY

**FashionKas** adalah katalog digital + kasir penjualan + WA automation yang dibuat KHUSUS untuk reseller fashion Indonesia yang jualan lewat WhatsApp.

### Satu Kalimat:
> "FashionKas membantu reseller fashion merapikan jualan WhatsApp menjadi sistem yang lebih profesional, cepat, dan enak dipakai."

### Status: LIVE
- **URL**: https://fashionkas.pages.dev
- **Version**: v2.5 (7,851 baris kode, 52 modules)
- **MRR**: Rp 0 (pre-revenue, belum ada paying user)
- **Users**: 0 real active users
- **PMF Score**: 6.2/10

---

## 2. PROBLEM STATEMENT

### Siapa yang mengalami masalah?
Reseller fashion Indonesia (jutaan orang) yang jualan lewat WhatsApp: hijab, gamis, daster, pashmina, kemeja, rok, dll.

### Pain Points (diurutkan dari yang paling menyakitkan):

| # | Pain | Severity | Detail |
|---|------|----------|--------|
| 1 | **Order tenggelam di chat** | CRITICAL | Chat WA campur antara order, tanya stok, dan basa-basi. Order sering terlewat. |
| 2 | **Kirim foto manual satu-satu** | HIGH | Setiap customer tanya "ada gamis apa?", harus scroll gallery, kirim foto 1-1-1. |
| 3 | **Stok tidak terlacak** | HIGH | Tidak tahu produk mana yang masih ada, sering oversell. |
| 4 | **Follow-up bocor** | HIGH | Lupa follow-up customer yang bilang "nanti transfer ya". |
| 5 | **Omzet tidak kebaca** | MEDIUM | Tidak tahu profit sebenarnya berapa per hari/bulan. |
| 6 | **Cashflow campur** | MEDIUM | Uang masuk dari berbagai order tidak bisa dipisahkan. |

### Behavioral Insight Kunci:
- User ini **WA-native** — semua aktivitas bisnis lewat WA
- **Takut link asing** — tidak mau klik link yang tidak dikenal
- **Tidak mau belajar app rumit** — maksimal 3 menit setup
- **Trust dari rekomendasi teman** — bukan dari iklan

---

## 3. TARGET USER

### Primary Persona: RESELLER FASHION WA

| Atribut | Detail |
|---------|--------|
| **Nama** | Persona Generik (Reseller Fashion) |
| **Usia** | 22-35 Tahun |
| **Profil** | Reseller rumahan (Gamis, Hijab, Daster) |
| **Lokasi** | Kota kecil/kabupaten, jualan dari rumah |
| **Volume** | 20-100 SKU, 5-20 order/hari |
| **Omzet** | Rp 3-15 Juta/bulan |
| **Tools Harian** | WA (utama), IG, FB Group, Notes HP |
| **Pain Utama** | Order nyampur di chat, lupa follow-up, kirim foto 1-1 |
| **Device** | HP Android mid-range (RAM 3-4GB) |
| **Internet** | Stabil tapi tidak cepat |

### Extended Personas:

| Persona | Profil | Volume | FashionKas Tier |
|---------|--------|--------|-----------------|
| **Santi** (32) | Dropshipper multi-supplier | 100-500 SKU | Pro |
| **Dewi** (35) | Butik kecil offline+online | 50-200 SKU | Pro |
| **Rina** (25) | Pre-order komunitas | 10-50 SKU (PO) | Basic |
| **Fitri** (22) | Side hustle mahasiswi | 5-20 SKU | Free → Basic |

---

## 4. PRODUCT SCOPE

### 4.1 Apa yang FashionKas LAKUKAN:

| Fitur | Status | Prioritas |
|-------|--------|-----------|
| **Katalog Digital** | ✅ LIVE | Produk fashion + foto + harga + stok + ukuran/warna |
| **Kasir/POS** | ✅ LIVE | Input order <10 detik, auto-hitung total+profit |
| **Public Catalog** | ✅ LIVE | 1 link, share ke customer via WA |
| **Dashboard** | ✅ LIVE | Omzet harian/mingguan/bulanan, top products |
| **Order Management** | ✅ LIVE | Track pesanan, status bayar, resi |
| **WA Automation** | ✅ LIVE | Struk WA, notif kirim, broadcast, auto-reply bot |
| **Customer Database** | ✅ LIVE | Auto-save nama+nomor buyer dari order |
| **Reports** | ✅ LIVE | Laporan penjualan, CSV export |
| **PWA** | ✅ LIVE | Install dari browser, offline support |
| **R2 Image Upload** | ✅ LIVE | Upload foto produk drag-drop + camera |
| **Onboarding** | ✅ LIVE | 4-step guided setup |
| **AI Agents** | 🟡 50% | Scout & Closer UI ready, belum autonomous |
| **Payment Gateway** | ❌ NOT STARTED | Duitku/Xendit untuk subscription |
| **Subscription Enforcement** | ❌ NOT STARTED | Lock fitur by tier |

### 4.2 Apa yang FashionKas TIDAK lakukan:
- ❌ Multi-kategori (bukan untuk reseller non-fashion)
- ❌ Marketplace (bukan Shopee/Tokopedia)
- ❌ Chatbot AI canggih (simpel, bukan ChatGPT)
- ❌ ERP/Accounting (bukan Jurnal/Accurate)
- ❌ Social media management (bukan Hootsuite)

---

## 5. PRICING

| Tier | Price | Fitur |
|------|-------|-------|
| **BETA (sekarang)** | Rp 0 | Semua fitur terbuka, unlimited |
| **STARTER (nanti)** | Rp 0 | Max 20 produk, 50 order/bulan, basic reports |
| **BASIC** | Rp 49.000-99.000/bln | Unlimited produk+order, WA struk, customer list |
| **PRO** | Rp 149.000-249.000/bln | Broadcast, multi-admin, AI agents, advanced reports |
| **ENTERPRISE** | Rp 499.000/bln | Multi-toko, priority support, analytics |

### Kapan Mulai Charge?
Setelah minimal **10 pilot users** aktif menggunakan FashionKas selama 14+ hari.

---

## 6. SUCCESS METRICS

### 30-Day KPIs:

| Metric | Target |
|--------|--------|
| Prospect terkumpul | 20 |
| Outreach terkirim | 10 |
| Demo terlaksana | 3 |
| Trial dimulai | 2 |
| User aktif nyata | 1 |
| Testimoni / bukti manfaat | 1 |

### 90-Day KPIs:

| Metric | Target |
|--------|--------|
| Registered users | 50-100 |
| WAU (Weekly Active Users) | 20-50 |
| Paying users | 10 |
| MRR | Rp 990K - 2.5M |
| NPS | > 30 |
| Testimonials | 5+ |

---

## 7. TECHNICAL REQUIREMENTS

### Stack:
- **Backend**: Hono v4 + TypeScript on Cloudflare Workers
- **Frontend**: Tailwind CSS (CDN) + Vanilla JS (inline in pages)
- **Database**: Supabase PostgreSQL (REST API)
- **Storage**: Cloudflare R2 (product images)
- **WA API**: Fonnte.com (Indonesian WA gateway)
- **Auth**: Custom JWT + SHA-256 PIN hashing
- **Build**: Vite + @hono/vite-cloudflare-pages
- **Deploy**: Cloudflare Pages

### Non-Functional Requirements:
- Page load < 3 detik di HP Android mid-range
- Works offline (PWA service worker)
- 100% Bahasa Indonesia UI
- Mobile-first responsive design
- Auto-HTTPS via Cloudflare

---

## 8. ROADMAP

### Phase 1: Validation (Sekarang - 30 hari)
**Focus: Buktikan bahwa reseller fashion mau pakai dan mau bayar.**

| Minggu | Action | Deliverable |
|--------|--------|-------------|
| W1 | Fix bugs, sharpen landing page, proof pack | Demo video + screenshots |
| W2 | Prospecting + outreach 20 reseller | 5+ demo, 2+ trial |
| W3 | Onboard pilot + observe friction | 1 active user |
| W4 | Convert + collect proof | 1 testimoni, 1 case study |

### Phase 2: Activation (Hari 31-60)
**Focus: 1 → 10 users. Payment gateway.**

| Sprint | Action | Deliverable |
|--------|--------|-------------|
| S5-6 | Payment gateway integration (Duitku) | Subscription checkout |
| S7-8 | Fix top 3 friction points + WA OTP | Improved UX |

### Phase 3: Growth (Hari 61-90)
**Focus: 10 → 50 users. Feature expansion.**

| Sprint | Action | Deliverable |
|--------|--------|-------------|
| S9-10 | Per-store Fonnte config | Each store can use own WA |
| S11-12 | Content pipeline + scale outreach | 20+ paid users |

---

## 9. RISKS

| Risk | Severity | Mitigation |
|------|----------|------------|
| User tidak mengerti value | High | Demo video, free setup, simple copy |
| Fonnte dependency/ban | High | Abstraction layer, backup WA provider |
| Security: token leakage | High | Secret rotation, never commit secrets |
| Scope creep (tambah fitur terus) | High | STOP building, START selling |
| User churn (tidak sticky) | High | Daily habit features, WA integration |
| Zero social proof | High | Fake-real testimoni dulu, ganti real ASAP |

---

## 10. APPENDIX

### Database Tables:
`stores`, `products`, `orders`, `order_items`, `customers`, `wa_messages`

### API Endpoints: 30+ endpoints
Lihat README.md untuk daftar lengkap.

### Halaman: 13 halaman
`/`, `/login`, `/register`, `/fashionkas/dashboard`, `/fashionkas/sale`, `/fashionkas/catalog`, `/fashionkas/orders`, `/fashionkas/settings`, `/fashionkas/wa`, `/fashionkas/reports`, `/fashionkas/scout`, `/fashionkas/closer`, `/fashionkas/onboarding`, `/catalog/:slug`

---

**FashionKas — Rapikan Jualan Fashion dari WhatsApp**
**Document**: docs/fashionkas/PRD.md
**Version**: 3.0 | **Date**: 25 Maret 2026
