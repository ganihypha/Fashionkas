# FashionKas v2.5
## Katalog Digital + Kasir Penjualan + WA Automation untuk Fashion Reseller Indonesia

**Production**: https://fashionkas.pages.dev
**GitHub**: https://github.com/ganihypha/Fashionkas
**Webhook URL**: https://fashionkas.pages.dev/api/webhook/incoming

---

## 3-Layer Brand Architecture

Proyek ini adalah bagian dari ekosistem 3 layer yang terdefinisi jelas:

| Layer | Brand | Role | Status |
|-------|-------|------|--------|
| **Layer 1** | **FashionKas** | Brand standalone - Fashion reseller WA-first | LIVE v2.5 |
| **Layer 2** | **ResellerKas** | Brand standalone - Multi-category reseller | PLANNING |
| **Layer 3** | **Sovereign** | Engine/Umbrella - Mesin di belakang semua produk | CONCEPTUAL |

> **Baca [docs/MASTER_CLARITY.md](docs/MASTER_CLARITY.md) untuk detail arsitektur 3 layer.**

---

## Documentation Suite

### Master Document
- **[MASTER_CLARITY.md](docs/MASTER_CLARITY.md)** — Arsitektur 3 layer (FashionKas / ResellerKas / Sovereign)

### FashionKas (Layer 1 - ACTIVE)
- **[PRD](docs/fashionkas/PRD.md)** — Product Requirements Document v3.0
- **[ARCHITECTURE](docs/fashionkas/ARCHITECTURE.md)** — Technical Architecture v3.0
- **[DESIGN](docs/fashionkas/DESIGN.md)** — UI/UX Design System v1.0
- **[TODO](docs/fashionkas/TODO.md)** — Execution Tracker v3.0

### ResellerKas (Layer 2 - PLANNING)
- **[PRD](docs/resellerkas/PRD.md)** — Product Requirements Document v1.0
- **[ARCHITECTURE](docs/resellerkas/ARCHITECTURE.md)** — Technical Architecture v1.0
- **[DESIGN](docs/resellerkas/DESIGN.md)** — UI/UX Design v1.0
- **[TODO](docs/resellerkas/TODO.md)** — Execution Tracker v1.0

### Sovereign (Layer 3 - CONCEPTUAL)
- **[PRD](docs/sovereign/PRD.md)** — Product Requirements Document v1.0
- **[ARCHITECTURE](docs/sovereign/ARCHITECTURE.md)** — Engine Architecture v1.0
- **[TODO](docs/sovereign/TODO.md)** — Execution Tracker v1.0

### Legacy Docs
- **[Deep Dive Master](docs/FASHIONKAS_DEEP_DIVE_MASTER_DOC.md)** — Comprehensive analysis (16 research files)
- **[Empire PRD v2](docs/SOVEREIGN_EMPIRE_PRD_V2.md)** — Original Sovereign vision
- **[Empire Architecture v2](docs/SOVEREIGN_EMPIRE_ARCHITECTURE_V2.md)** — Original system design

---

## Completed Features (v2.5)

### Kasir Digital (POS) - 100%
- Tambah produk ke keranjang dengan size/color picker
- Hitung otomatis total, profit, stok
- Payment methods: Cash, Transfer, COD, Marketplace
- Payment status: Lunas / DP / Belum Bayar
- Auto-kirim struk via WhatsApp (Fonnte)

### Katalog Online - 100%
- CRUD produk dengan gambar, ukuran, warna
- R2 image upload with drag-drop & camera
- Category filter & search
- Public catalog page `/catalog/:slug`

### Order Management - 100%
- List pesanan dengan filter status
- Update status: pending > processing > shipped > delivered
- Track resi otomatis

### WhatsApp Automation (Fonnte) - 100%
- Auto-kirim struk WA dari POS
- Broadcast promo ke customer segment
- Auto-reply bot (15+ commands)

### Dashboard & Reports - 100%
- Revenue, profit, orders per hari/minggu/bulan
- Top products & low stock alerts
- CSV export

### PWA - 100%
- Install dari browser ke home screen
- Offline support (SW v2.5)

---

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/health` | No | Health check |
| POST | `/api/auth/register` | No | Register toko |
| POST | `/api/auth/login` | No | Login |
| GET | `/api/auth/me` | Yes | Info toko |
| GET/POST/PUT/DELETE | `/api/products/*` | Yes | CRUD produk |
| GET/POST/PUT | `/api/orders/*` | Yes | CRUD pesanan |
| GET | `/api/customers` | Yes | List pelanggan |
| POST | `/api/images/upload` | Yes | Upload gambar R2 |
| POST | `/api/wa/*` | Yes | WA automation |
| POST | `/api/webhook/incoming` | No | Fonnte webhook |
| GET | `/api/dashboard/stats` | Yes | Statistik |
| GET | `/api/reports/*` | Yes | Laporan |

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Backend | Hono v4 + TypeScript |
| Frontend | Tailwind CSS (CDN) + Vanilla JS |
| Database | Supabase PostgreSQL |
| Storage | Cloudflare R2 |
| WA API | Fonnte.com |
| Build | Vite + @hono/vite-cloudflare-pages |
| Deploy | Cloudflare Pages |

---

## What's Next (Priority Order)

1. **Rotate secrets** — Move keys to CF Secrets
2. **Payment gateway** — Duitku integration for subscriptions
3. **Get 10 pilot users** — Manual outreach to fashion resellers
4. **Collect testimonials** — Real user proof for landing page
5. **Per-store Fonnte** — Each store uses own WA number

---

## Repo Structure

```
Fashionkas/
├── src/
│   ├── index.tsx           # Main entry point
│   ├── lib/supabase.ts     # Supabase client + JWT + PIN
│   ├── routes/             # 10 API route modules
│   └── fashion/            # 13 page modules
├── public/                 # PWA assets
├── docs/
│   ├── MASTER_CLARITY.md   # 3-Layer architecture (NEW)
│   ├── fashionkas/         # FashionKas docs (PRD, ARCH, DESIGN, TODO)
│   ├── resellerkas/        # ResellerKas docs (PRD, ARCH, DESIGN, TODO)
│   ├── sovereign/          # Sovereign docs (PRD, ARCH, TODO)
│   └── [legacy docs]
├── wrangler.jsonc
├── package.json
├── vite.config.ts
└── README.md
```

---

**FashionKas v2.5** — Rapikan Jualan Fashion dari WhatsApp
**Last Updated**: 25 Maret 2026
