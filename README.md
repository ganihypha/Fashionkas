# FashionKas v2.0
## Katalog + Kasir Digital + WhatsApp Bot untuk Fashion Reseller Indonesia

**Production**: https://fashionkas.pages.dev
**GitHub**: https://github.com/ganihypha/Fashionkas
**Webhook URL**: https://fashionkas.pages.dev/api/webhook/incoming

---

## Fitur Lengkap

### Kasir Digital (POS)
- Tambah produk ke keranjang dengan size/color picker
- Hitung otomatis total, profit, stok
- Payment methods: Cash, Transfer, COD, Marketplace
- Auto-kirim struk via WhatsApp (Fonnte)

### Katalog Digital
- Upload produk (nama, harga, foto, ukuran, warna)
- 1 link katalog shareable ke semua customer
- Public catalog: `https://fashionkas.pages.dev/catalog/{slug}`
- Tombol "Pesan" langsung buka WhatsApp

### WhatsApp Automation (Fonnte)
- Auto-kirim struk setelah transaksi
- Notifikasi pengiriman + tracking resi
- Broadcast promo ke segmen customer
- Kirim pesan custom + scheduling
- Validate nomor WhatsApp
- Message history & analytics

### WhatsApp Bot (v2.0 - NEW!)
Webhook auto-reply via Fonnte. Kirim command ke nomor WA toko:

**Customer Commands:**
| Command | Fungsi |
|---------|--------|
| `HELP` / `MENU` | Lihat semua perintah |
| `KATALOG` | Lihat semua produk + harga |
| `HARGA` | Daftar harga |
| `CARI [nama]` | Cari produk |
| `ORDER [produk]` | Pesan produk |
| `CEK [no order]` | Cek status pesanan |
| `KATEGORI` | Lihat kategori |
| `KATEGORI [nama]` | Produk per kategori |
| `INFO` | Info toko |
| `PROMO` | Promo terbaru |

**Admin Commands (Owner Only):**
| Command | Fungsi |
|---------|--------|
| `STOK` | Alert stok rendah/habis |
| `LAPORAN` | Ringkasan hari ini |
| `OMZET` | Omzet bulan ini + breakdown |
| `AUDIT` | Full audit toko lengkap |

### Dashboard & Analytics
- Pendapatan harian/mingguan/bulanan
- Produk terlaris
- Alert stok rendah
- Grafik revenue 7 hari

### Scout AI (Lead Scoring)
- RFM scoring (Recency, Frequency, Monetary)
- Segment classification (VIP, Loyal, Warm, At Risk, Cold)
- Churn prediction
- Category preferences

### Closer AI (WA Outreach)
- Smart follow-up suggestions
- Template messages (Thank You, Promo, Re-engage, VIP, Win Back)
- Bulk send via Fonnte with delay
- Auto-personalize per customer

### Reports
- Monthly revenue/profit breakdown
- Daily data for charts
- Payment method analysis
- Category breakdown

---

## Setup Fonnte Webhook

1. Login ke https://md.fonnte.com
2. Device > Edit Device
3. Set field berikut:

| Setting | Value |
|---------|-------|
| **Webhook** | `https://fashionkas.pages.dev/api/webhook/incoming` |
| **Webhook Connect** | `https://fashionkas.pages.dev/api/webhook/incoming` |
| **Webhook Message Status** | `https://fashionkas.pages.dev/api/webhook/status` |
| **autoread** | ON |
| **Response Source** | Autoreply |
| **Personal** | ON |
| **Group** | ON |

4. Save. Sekarang setiap pesan masuk ke nomor WA akan auto-reply!

---

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/health` | No | Health check |
| POST | `/api/auth/register` | No | Daftar toko baru |
| POST | `/api/auth/login` | No | Login (phone+PIN) |
| GET | `/api/auth/me` | JWT | Get current user |
| GET | `/api/products` | JWT | List produk |
| POST | `/api/products` | JWT | Tambah produk |
| GET | `/api/products/public/:slug` | No | Katalog publik |
| GET | `/api/orders` | JWT | List pesanan |
| POST | `/api/orders` | JWT | Buat pesanan |
| GET | `/api/dashboard/stats` | JWT | Dashboard stats |
| GET | `/api/wa/status` | No | Fonnte device status |
| POST | `/api/wa/send-receipt` | JWT | Kirim struk WA |
| POST | `/api/wa/send-shipping` | JWT | Notif pengiriman |
| POST | `/api/wa/broadcast` | JWT | Broadcast promo |
| POST | `/api/wa/send-custom` | JWT | Pesan custom |
| GET | `/api/wa/history` | JWT | Riwayat WA |
| GET | `/api/ai/scout/scores` | JWT | Customer scores |
| GET | `/api/ai/closer/suggestions` | JWT | Follow-up suggestions |
| POST | `/api/ai/closer/send` | JWT | Send follow-up |
| **POST** | **`/api/webhook/incoming`** | **Fonnte** | **Webhook incoming** |
| **POST** | **`/api/webhook/status`** | **Fonnte** | **Delivery status** |
| GET | `/api/reports/monthly` | JWT | Laporan bulanan |

---

## Tech Stack
- **Backend**: Hono v4 (TypeScript)
- **Frontend**: TailwindCSS CDN + Font Awesome
- **Database**: Supabase (PostgreSQL)
- **WhatsApp**: Fonnte API (auto-reply + webhook)
- **Deploy**: Cloudflare Pages
- **Design**: Dark glassmorphism, purple accent (#A855F7)

## Credentials
- **Fonnte Device Token**: Set di wrangler.jsonc `vars.FONNTE_TOKEN`
- **Fonnte Account Token**: Set di wrangler.jsonc `vars.FONNTE_ACCOUNT_TOKEN`
- **Supabase**: Set di wrangler.jsonc `vars.SUPABASE_*`

## Deploy
```bash
npm run build
npx wrangler pages deploy dist --project-name fashionkas
```

---

**v2.0** | 18 Maret 2026 | Built with GenSpark.AI
**Sovereign Empire** | FashionKas Module
