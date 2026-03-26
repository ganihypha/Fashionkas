# FASHIONKAS — PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Layer 1: Brand Standalone untuk Fashion Reseller WA-First
**Version**: 3.1 | **Date**: 26 Maret 2026 | **Status**: LIVE + DESIGN UPGRADED

---

## 1. EXECUTIVE SUMMARY

**FashionKas** adalah katalog digital + kasir penjualan + WA automation yang dibuat KHUSUS untuk reseller fashion Indonesia yang jualan lewat WhatsApp.

### Satu Kalimat:
> "FashionKas membantu reseller fashion merapikan jualan WhatsApp menjadi sistem yang lebih profesional, cepat, dan enak dipakai."

### Status: LIVE
- **URL**: https://fashionkas.pages.dev
- **Version**: v2.5 → v3.0 (design upgrade)
- **Codebase**: 7,914 baris kode, 52 modules, 403 KB worker
- **MRR**: Rp 0 (pre-revenue)
- **Users**: 0 real active
- **PMF Score**: 6.2/10 → target 8/10
- **GitHub**: https://github.com/ganihypha/Fashionkas

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
- User **WA-native** — semua aktivitas bisnis lewat WA
- **Takut link asing** — tidak mau klik link yang tidak dikenal
- **Tidak mau belajar app rumit** — maksimal 3 menit setup
- **Trust dari rekomendasi teman** — bukan dari iklan

---

## 3. TARGET USER

### Primary Persona: RESELLER FASHION WA

| Atribut | Detail |
|---------|--------|
| **Usia** | 22-35 Tahun |
| **Profil** | Reseller rumahan (Gamis, Hijab, Daster) |
| **Lokasi** | Kota kecil/kabupaten, jualan dari rumah |
| **Volume** | 20-100 SKU, 5-20 order/hari |
| **Omzet** | Rp 3-15 Juta/bulan |
| **Tools** | WA (utama), IG, FB Group, Notes HP |
| **Pain** | Order nyampur di chat, lupa follow-up, kirim foto 1-1 |
| **Device** | HP Android mid-range (RAM 3-4GB) |

### Extended Personas:

| Persona | Profil | Volume | Tier |
|---------|--------|--------|------|
| Santi (32) | Dropshipper multi-supplier | 100-500 SKU | Pro |
| Dewi (35) | Butik kecil offline+online | 50-200 SKU | Pro |
| Rina (25) | Pre-order komunitas | 10-50 SKU | Basic |
| Fitri (22) | Side hustle mahasiswi | 5-20 SKU | Free |

---

## 4. PRODUCT SCOPE

### 4.1 Fitur yang SUDAH LIVE:

| Fitur | Status | Keterangan |
|-------|--------|------------|
| Katalog Digital | LIVE | Produk + foto + harga + stok + ukuran/warna |
| Kasir/POS | LIVE | Input order <10 detik, auto-hitung total+profit |
| Public Catalog | LIVE | 1 link share via WA |
| Dashboard | LIVE | Omzet harian/mingguan/bulanan, top products |
| Order Management | LIVE | Track pesanan, status bayar, resi |
| WA Automation | LIVE | Struk WA, notif, broadcast, auto-reply bot (15+ cmd) |
| Customer Database | LIVE | Auto-save nama+nomor buyer |
| Reports & CSV | LIVE | Laporan penjualan, export |
| PWA | LIVE | Install di HP, offline support |
| R2 Image Upload | LIVE | Drag-drop + camera |
| Onboarding | LIVE | 4-step guided setup |
| Landing Page v3.0 | LIVE | Trust-first design, testimonials, FAQ, social proof |
| Skeleton Loading | LIVE | CSS shimmer loading states |
| Micro-interactions | LIVE | Button hover, card hover, page transitions |

### 4.2 Fitur yang BELUM JADI:

| Fitur | Status | Prioritas |
|-------|--------|-----------|
| AI Agents (Scout/Closer) | 50% (UI only) | P2 |
| Payment Gateway (Duitku) | NOT STARTED | P0 |
| Subscription Enforcement | NOT STARTED | P1 |
| WA OTP for PIN reset | NOT STARTED | P1 |
| Per-store Fontte config | NOT STARTED | P1 |
| Rate limiting | NOT STARTED | P1 |
| Automated tests | NOT STARTED | P2 |

### 4.3 Apa yang FashionKas TIDAK lakukan:
- Multi-kategori, Marketplace, AI chatbot canggih, ERP, Social media management

---

## 5. DESIGN INTEGRITY & TRUST (NEW v3.1)

### Anti-Scam Design Principles:
1. **Social Proof First** — Testimonial section dengan foto avatar + nama + kota
2. **Trust Signals** — Shield icon, "Aman & terenkripsi", "Tanpa kartu kredit"
3. **FAQ Section** — Jawab kekhawatiran user: keamanan data, gratis?, akses HP?
4. **Pain-First Copy** — Hero headline berbicara tentang masalah, bukan fitur
5. **Skeleton Loading** — Loading states di semua halaman (bukan blank putih)
6. **Smooth Transitions** — Page fade-in, card hover, button micro-interactions
7. **Professional Footer** — SSL badge, Cloudflare Edge badge, copyright

### Landing Page v3.0 Sections:
1. Navbar (fixed, glass effect)
2. Hero (pain-focused headline + trust micro-signals)
3. Pain Points (4 masalah reseller)
4. Cara Kerja (3 langkah visual)
5. Demo Katalog (preview interaktif)
6. Fitur Lengkap (6 cards)
7. Testimonials (3 beta testers)
8. Pricing Beta Gratis (single card + glow)
9. FAQ (5 pertanyaan accordion)
10. Final CTA
11. Footer (trust badges)

---

## 6. PRICING

| Tier | Price | Kapan |
|------|-------|-------|
| **BETA (sekarang)** | Rp 0 | Semua fitur terbuka, unlimited |
| **BASIC (nanti)** | Rp 49-99K/bln | Setelah 10 pilot users |
| **PRO (nanti)** | Rp 149-249K/bln | Setelah 20 paying users |

### Kapan Mulai Charge?
Setelah minimal **10 pilot users** aktif selama 14+ hari.

---

## 7. SUCCESS METRICS

### 30-Day KPIs:

| Metric | Target |
|--------|--------|
| Prospect terkumpul | 20 |
| Outreach terkirim | 10 |
| Demo terlaksana | 3 |
| Trial dimulai | 2 |
| User aktif nyata | 1 |
| Testimoni | 1 |

### 90-Day KPIs:

| Metric | Target |
|--------|--------|
| Registered users | 50-100 |
| WAU | 20-50 |
| Paying users | 10 |
| MRR | Rp 1-2.5M |
| NPS | > 30 |

---

## 8. TECHNICAL STACK

- **Backend**: Hono v4 + TypeScript on Cloudflare Workers
- **Frontend**: Tailwind CSS (CDN) + Vanilla JS (inline)
- **Database**: Supabase PostgreSQL (REST)
- **Storage**: Cloudflare R2 (images)
- **WA API**: Fonnte.com
- **Auth**: Custom JWT + SHA-256 PIN
- **Build**: Vite + @hono/vite-cloudflare-pages
- **Deploy**: Cloudflare Pages (fashionkas.pages.dev)

---

## 9. ROADMAP

### Phase 1: Validation (Sekarang - 30 hari)
- Fix bugs, sharpen design (DONE v3.0)
- Prospect 20 reseller, outreach, onboard 1

### Phase 2: Activation (31-60 hari)
- Payment gateway (Duitku), WA OTP, fix friction

### Phase 3: Growth (61-90 hari)
- Per-store Fonnte, content pipeline, 20+ paid users

---

## 10. CRITICAL GAPS (GAP ANALYSIS)

| Gap | Severity | Impact |
|-----|----------|--------|
| Secrets hardcoded in wrangler.jsonc | SECURITY P0 | Token leakage risk |
| No payment gateway | REVENUE P0 | Can't charge users |
| No real testimonials | TRUST P0 | Using beta tester quotes |
| Single Fonnte token for all stores | OPERATIONAL P1 | Mass ban risk |
| No rate limiting on auth | SECURITY P1 | Brute force risk |
| No automated tests | QUALITY P2 | Regression risk |
| No error monitoring (Sentry) | OPERATIONAL P2 | Blind to errors |

---

**FashionKas PRD v3.1 | 26 Maret 2026**
**Document**: docs/fashionkas/PRD.md
