# FashionKas v1.1.0

> Kasir Digital + Katalog Online + WA Automation untuk Fashion Reseller Indonesia

## URLs
- **Production**: https://fashionkas.pages.dev
- **GitHub**: https://github.com/ganihypha/Fashionkas
- **Public Catalog**: https://fashionkas.pages.dev/catalog/{store_slug}

## Features (v1.1.0)

### Auth System
- **PIN-based login** (phone + 4-6 digit PIN, SHA-256 hashed)
- **3-step registration wizard** (Store Info > Owner Info > PIN Setup)
- **JWT token** (30-day expiry) with auto-redirect for logged-in users
- **Change PIN** with old PIN verification

### POS / Kasir (`/fashionkas/sale`)
- Product grid with **image thumbnails** and category badges
- **Size/Color variant picker** modal for products with options
- Cart with per-item image, size, color display
- **Quick discount** (5K, 10K) and **quick shipping** (10K, 15K) buttons
- Multiple payment: Cash, Transfer, COD, Marketplace
- WhatsApp receipt with variant details (size/color)
- Auto stock deduction on order save
- Grid/list view toggle

### Catalog Management (`/fashionkas/catalog`)
- Product grid with **image preview** (fallback to colored icons)
- **Inventory value** calculator (total stock value + est. profit)
- **Sort options**: Terbaru, Harga, Stok, Terlaris
- **Featured product** toggle (star badge)
- **Profit calculator** in add/edit modal (auto-compute margin %)
- **Quick size presets** (S-XL, All Size, S-3XL) and **quick color presets** (B&W, Gelap, Pastel)
- Image URL preview in modal

### Dashboard (`/fashionkas/dashboard`)
- Revenue chart (Chart.js bar, 7-day, revenue + profit)
- Today's highlight (revenue, orders, items sold, profit)
- Monthly stats with profit margin %
- Top 5 products by sales
- Low stock + out-of-stock alerts
- Category breakdown
- Recent orders with status badges

### Orders (`/fashionkas/orders`)
- Status tabs: All, Pending, Processing, Shipped, Delivered
- Order detail modal with items, totals, profit
- Tracking/resi input
- WhatsApp notification button
- Monthly summary (revenue, orders, profit)

### Settings (`/fashionkas/settings`)
- Editable store profile (name, description, owner, city)
- Catalog sharing (copy link, WhatsApp, native share)
- **Fonnte WhatsApp Automation** guide (setup instructions)
- **CSV Export** for Products, Orders, Customers
- Change PIN
- Social links (Instagram, GitHub)

### Public Catalog (`/catalog/:slug`)
- Mobile-optimized product browsing
- Product detail modal with WhatsApp order link
- Search + category filter
- OG meta tags for social sharing
- Store info header with avatar

### Landing Page (`/`)
- Demo catalog preview with 4 products
- 3-tier pricing (Free, Basic Rp 99K, Pro Rp 149K)
- How-it-works steps
- Competitor comparison
- Beta promotion badge

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/register` | No | Register new store |
| POST | `/api/auth/login` | No | Login with phone + PIN |
| GET | `/api/auth/me` | Yes | Get current store info |
| PUT | `/api/auth/store` | Yes | Update store profile |
| PUT | `/api/auth/change-pin` | Yes | Change PIN |
| GET | `/api/products` | Yes | List store products |
| POST | `/api/products` | Yes | Create product |
| PUT | `/api/products/:id` | Yes | Update product |
| DELETE | `/api/products/:id` | Yes | Delete product |
| GET | `/api/products/public/:slug` | No | Public catalog |
| GET | `/api/orders` | Yes | List orders |
| POST | `/api/orders` | Yes | Create order + stock deduction |
| PUT | `/api/orders/:id` | Yes | Update order status |
| GET | `/api/customers` | Yes | List customers |
| POST | `/api/customers` | Yes | Create customer |
| GET | `/api/dashboard/stats` | Yes | Dashboard statistics |
| GET | `/api/health` | No | Health check |

## Tech Stack
- **Backend**: Hono v4 + TypeScript on Cloudflare Workers
- **Frontend**: Vanilla JS + Tailwind CSS (CDN) + Font Awesome
- **Database**: Supabase PostgreSQL (REST API)
- **Auth**: PIN + SHA-256 + JWT (Web Crypto API)
- **Charts**: Chart.js
- **WhatsApp**: Fonnte API (optional) + wa.me deep links
- **Deployment**: Cloudflare Pages

## Data Architecture
- **stores**: id, name, slug, owner_name, owner_phone, pin_code, city, description, subscription_tier
- **products**: id, store_id, name, category, price, cost_price, stock, total_sold, sizes[], colors[], image_url, description, is_active, is_featured
- **orders**: id, store_id, order_number, customer_name, customer_phone, total_amount, total_profit, discount, shipping_cost, payment_method, payment_status, shipping_status, tracking_number, notes
- **order_items**: id, order_id, product_id, product_name, quantity, unit_price, cost_price, size, color, subtotal
- **customers**: id, store_id, name, phone, total_orders, total_spent, segment, last_order_at

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: Active
- **Version**: 1.1.0
- **Last Updated**: 2026-03-18

## Phase 2 Roadmap (Pending)
- [ ] Fonnte WhatsApp automation (auto-send receipt, shipping updates, promos)
- [ ] Image upload via Cloudflare R2 (in-app camera/gallery)
- [ ] Scout AI Agent (lead scoring from Google Maps)
- [ ] Closer AI Agent (WhatsApp outreach templates)
- [ ] Multi-store management
- [ ] Advanced analytics & PDF reports
- [ ] Supplier catalog sync
- [ ] Push notifications
