# FashionKas

> **Kasir Digital + Katalog Online + WA Automation** untuk Fashion Reseller Indonesia.
> Dedicated for **Nurul Annisa** ([@nurulannisaff](https://www.instagram.com/nurulannisaff))

## URLs

- **Production**: https://fashionkas.pages.dev
- **GitHub**: https://github.com/ganihypha/Fashionkas.git
- **Sandbox Preview**: (available during development)

## Features (v1.0 Beta)

### Completed
- **Landing Page** — Responsive dark-theme landing with beta CTA, features, and pricing
- **PIN Authentication** — Register/login with phone number + 4-6 digit PIN
- **Dashboard** — Real-time stats: today's revenue, profit, orders, top products, low stock alerts, category breakdown
- **Kasir/POS** — Quick sale page with product search, category filter, cart, discount, shipping, payment method selection, WhatsApp receipt
- **Catalog Management** — Full CRUD for products (add, edit, delete), category pills, search, stats (total/active/low stock/out of stock)
- **Orders Management** — Order list with status tabs (all/pending/shipped/delivered), order detail modal, status updates, WhatsApp link
- **Public Catalog** — Shareable catalog page (no auth) at `/catalog/{slug}`, category filter, WhatsApp order button
- **Settings** — Store profile, catalog link sharing, app info, beta features list
- **Supabase Integration** — Real PostgreSQL database (stores, products, orders, order_items, customers)
- **WhatsApp Integration** — Receipt generation, catalog sharing, order WhatsApp links
- **Mobile-First Dark Theme** — Glass-card design, purple accent, bottom navigation

### Not Yet Implemented
- WhatsApp automation via Fonnte API (API ready, needs token)
- Image upload to R2 for products
- Advanced reporting (weekly/monthly charts)
- Multi-staff support
- Booking system
- AI Scout agent for lead hunting

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Framework | Hono v4 + TypeScript |
| Runtime | Cloudflare Workers (Edge) |
| Hosting | Cloudflare Pages |
| Database | Supabase PostgreSQL |
| Frontend | TailwindCSS (CDN) + Vanilla JS |
| Auth | Custom JWT (SHA-256 HMAC) |
| Icons | Font Awesome 6.5 |
| Fonts | Inter, Montserrat, JetBrains Mono |

## Data Architecture

### Database Tables (Supabase)
- **stores** — id, name, slug, owner_name, owner_phone, pin_code, city, description, subscription_tier
- **products** — id, store_id, name, category, price, cost_price, stock, sizes (JSONB), colors (JSONB), image_url, description, total_sold, is_active, is_featured
- **orders** — id, store_id, order_number, customer_name, customer_phone, total_amount, total_profit, discount, shipping_cost, payment_method, payment_status, shipping_status, tracking_number, notes
- **order_items** — id, order_id, product_id, product_name, quantity, unit_price, cost_price, size, color, subtotal
- **customers** — id, store_id, name, phone, total_orders, total_spent, segment, last_order_at

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Register new store |
| POST | `/api/auth/login` | Login with phone + PIN |
| GET | `/api/auth/me` | Verify token & get store info |
| GET | `/api/products` | List products (auth) |
| POST | `/api/products` | Create product (auth) |
| PUT | `/api/products/:id` | Update product (auth) |
| DELETE | `/api/products/:id` | Delete product (auth) |
| GET | `/api/products/public/:slug` | Public products by store slug |
| GET | `/api/orders` | List orders (auth) |
| POST | `/api/orders` | Create order with stock deduction (auth) |
| PUT | `/api/orders/:id` | Update order status (auth) |
| GET | `/api/customers` | List customers (auth) |
| POST | `/api/customers` | Create customer (auth) |
| GET | `/api/dashboard/stats` | Dashboard statistics (auth) |
| GET | `/api/health` | Health check |

### Page Routes

| Path | Description |
|------|-------------|
| `/` | Landing page |
| `/login` | Login page |
| `/register` | Registration page |
| `/fashionkas/dashboard` | Dashboard (auth) |
| `/fashionkas/sale` | Kasir/POS (auth) |
| `/fashionkas/catalog` | Catalog management (auth) |
| `/fashionkas/orders` | Orders management (auth) |
| `/fashionkas/settings` | Settings (auth) |
| `/catalog/:slug` | Public catalog (no auth) |

## User Guide

### Untuk Nurul Annisa (Owner)

1. **Daftar** — Buka https://fashionkas.pages.dev/register
   - Masukkan: Nama Toko, Nama Owner, No. WhatsApp, Kota, PIN (4-6 digit)
   - Contoh: "Nurul Fashion", "Nurul Annisa", "081234567890", "Purwokerto", "1234"

2. **Login** — Buka https://fashionkas.pages.dev/login
   - Masukkan: No. WhatsApp + PIN

3. **Tambah Produk** — Dashboard > Katalog > Tambah
   - Isi: Nama, Kategori, Harga Jual, Harga Modal, Stok, Ukuran, Warna, Deskripsi

4. **Buat Pesanan** — Dashboard > Jual (tombol + di tengah)
   - Pilih produk > Atur jumlah > Pilih metode bayar > Simpan

5. **Share Katalog** — Settings > Share ke WhatsApp
   - Link katalog otomatis bisa di-share ke pelanggan

6. **Lihat Laporan** — Dashboard otomatis menampilkan revenue, profit, top products

## Deployment

- **Platform**: Cloudflare Pages
- **Status**: Active
- **Production URL**: https://fashionkas.pages.dev
- **Database**: Supabase (pavkyexnqzfmdrbfzoht.supabase.co)
- **Last Updated**: 2026-03-17

## Project Structure

```
fashionkas/
├── src/
│   ├── index.tsx           # Main Hono app + routes
│   ├── lib/supabase.ts     # Supabase REST client + JWT + hash
│   ├── routes/
│   │   ├── auth.ts         # Auth (register/login/me)
│   │   ├── products.ts     # Product CRUD + public catalog
│   │   ├── orders.ts       # Order creation + status updates
│   │   ├── customers.ts    # Customer management
│   │   └── dashboard.ts    # Dashboard statistics
│   └── fashion/
│       ├── layout.ts       # Shared layout component
│       └── pages/
│           ├── landing.ts      # Landing page
│           ├── auth.ts         # Login + Register
│           ├── dashboard.ts    # Dashboard
│           ├── kasir.ts        # POS/Sale page
│           ├── catalog-manage.ts # Catalog management
│           ├── catalog-public.ts # Public catalog
│           ├── orders.ts       # Orders management
│           └── settings.ts     # Settings
├── docs/                   # Strategy & architecture docs
├── ecosystem.config.cjs    # PM2 config
├── package.json
├── tsconfig.json
├── vite.config.ts
├── wrangler.jsonc
└── supabase-setup.sql      # Database schema
```

## Part of Sovereign Empire

FashionKas is part of the Sovereign Empire ecosystem — an AI-driven business platform.
Built by [Gani Hypha](https://github.com/ganihypha) with GenSpark.AI.
