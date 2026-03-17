# FashionKas - Katalog + Kasir Digital untuk Fashion Reseller Indonesia

## Project Overview
- **Name**: FashionKas
- **Goal**: Kasir Digital + Katalog Online + WA Automation untuk Fashion Reseller Indonesia
- **Target**: 10+ juta reseller fashion online di Indonesia yang masih jualan manual via WhatsApp
- **Version**: 1.0.0-beta
- **Parent Platform**: Sovereign Empire

## URLs
- **Production**: https://fashionkas.pages.dev
- **Sandbox**: https://3000-inaugkt3jfm8iuad5sesr-b9b802c4.sandbox.novita.ai
- **GitHub**: https://github.com/ganihypha/Fashionkas

## Features (Completed v1.0)

### Landing Page (/)
- Hero section with beta CTA and animated logo
- How-it-works 3-step explanation
- Demo catalog preview showing product grid with WA order buttons
- 6 feature cards (Katalog Digital, WA Automation, Kasir Digital, Dashboard, Track Stok, Kelola Pesanan)
- 3-tier pricing (Starter FREE, Basic Rp 99K, Pro Rp 149K) with beta promotion
- Competitor comparison section
- Final CTA with registration link

### Authentication
- **Register** (/register) - Store name, owner name, WhatsApp number, city, 4-6 digit PIN
- **Login** (/login) - Phone + PIN authentication
- **JWT-based auth** - 30-day tokens, SHA-256 PIN hashing
- **Store Profile Update** (PUT /api/auth/store) - Edit store name, description, owner, city
- **Change PIN** (PUT /api/auth/change-pin) - Current PIN verification + new PIN

### Dashboard (/fashionkas/dashboard)
- Quick stats row (monthly revenue, today's income, monthly profit, total products)
- Today's highlight (revenue, orders, items sold, profit)
- **Chart.js 7-day revenue chart** (bar chart with revenue + profit)
- Top 5 selling products with revenue
- Low stock + out of stock alerts
- Category breakdown with colored badges
- Recent orders (last 5) with status badges
- Quick action cards (add product, create order, view orders, settings)

### Kasir / POS (/fashionkas/sale)
- Customer info input (name + WhatsApp)
- Product search with category filter pills
- Product grid with stock info and in-cart indicators
- Cart with quantity controls (+/-) and remove
- Summary: subtotal, discount, shipping, total, estimated profit
- 4 payment methods: Cash, Transfer, COD, Marketplace
- WhatsApp receipt toggle + manual WA send
- Auto stock deduction on order save
- Auto customer creation/update

### Catalog Management (/fashionkas/catalog)
- Stats bar (total, active, low stock, out of stock)
- Search + category filter dropdown
- Product cards with category badge, profit %, sizes, stock, sold count
- Add product modal (name, category, price, cost price, stock, sizes, colors, image URL, description)
- Edit product modal (pre-filled)
- Delete product with confirmation
- Share catalog via WhatsApp button

### Order Management (/fashionkas/orders)
- Monthly summary cards (revenue, orders, profit)
- **5 status tabs**: All, Pending, Processing, Shipped, Delivered (with counts)
- Order cards with customer avatar, items, amount, profit, payment status
- Order detail modal with full breakdown
- **Workflow buttons**: Pending > Process > Ship+Resi > Delivered
- **Tracking/resi input modal** for shipping
- Mark as paid button
- WA Customer button with pre-filled status message

### Settings (/fashionkas/settings)
- **Editable store profile** (name, description, owner, city) with save/cancel
- Catalog URL with copy button
- Share to WhatsApp and general share (navigator.share)
- Social links (Instagram @nurulannisaff, GitHub ganihypha)
- **Change PIN** with current PIN verification
- App info (version, platform, database, status)
- Beta features list
- Logout

### Public Catalog (/catalog/:slug)
- No auth required - customer-facing
- Store header with name, description, WA chat button
- Search and category filter pills (auto-generated)
- Product grid with images, sizes, prices
- **Product detail modal** (tap product for full view with sizes, colors, description)
- "Pesan via WA" button with pre-filled order message
- Stock indicators (low stock / out of stock)
- Floating WhatsApp button
- OG meta tags for social sharing
- Footer with FashionKas branding + "Buat katalog sendiri" CTA

## API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register new store | No |
| POST | /api/auth/login | Login with phone+PIN | No |
| GET | /api/auth/me | Get current store info | JWT |
| PUT | /api/auth/store | Update store profile | JWT |
| PUT | /api/auth/change-pin | Change PIN | JWT |

### Products
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/products | List store products | JWT |
| POST | /api/products | Create product | JWT |
| PUT | /api/products/:id | Update product | JWT |
| DELETE | /api/products/:id | Delete product | JWT |
| GET | /api/products/public/:slug | Public catalog | No |

### Orders
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/orders | List orders (with items) | JWT |
| POST | /api/orders | Create order (+ stock deduct) | JWT |
| PUT | /api/orders/:id | Update status/tracking | JWT |

### Customers
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/customers | List customers | JWT |
| POST | /api/customers | Create customer | JWT |

### Dashboard
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/dashboard/stats | Full dashboard data | JWT |

### Other
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |

## Data Architecture
- **Database**: Supabase PostgreSQL (5 tables: stores, products, orders, order_items, customers)
- **Authentication**: JWT + SHA-256 PIN hashing (Web Crypto API)
- **Data Isolation**: All queries filtered by store_id from JWT
- **Row Level Security**: Enabled on all tables with service-role policies

## Tech Stack
- **Frontend**: Hono SSR + Tailwind CSS (CDN) + Vanilla JS + Chart.js
- **Backend**: Hono v4 + TypeScript
- **Runtime**: Cloudflare Workers (Edge)
- **Hosting**: Cloudflare Pages
- **Database**: Supabase PostgreSQL
- **Fonts**: Inter, Montserrat, JetBrains Mono
- **Icons**: Font Awesome 6.5.1

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: LIVE
- **Production URL**: https://fashionkas.pages.dev
- **Project Name**: fashionkas
- **Build**: Vite SSR (180 KB worker)
- **Last Updated**: 2026-03-17

## User Guide

### For Nurul Annisa (First User)
1. Open https://fashionkas.pages.dev/register
2. Register: store name "Nurul Fashion", owner name, WhatsApp number, PIN
3. Go to **Katalog** tab > **+Tambah** > add products (name, price, category, stock)
4. Go to **Jual** tab > select products > fill customer info > save order
5. Go to **Settings** > **Share WhatsApp** to send catalog link to customers
6. Customers open your catalog link, browse products, click "Pesan via WA"

### For Sellers
1. **Register**: 30 seconds with phone + PIN
2. **Add Products**: Name, price, category, stock, image URL
3. **Create Orders**: Select products, customer info, payment method
4. **Share Catalog**: One link to all customers via WhatsApp
5. **Track Everything**: Dashboard shows revenue, profit, top products

## Next Steps (Phase 2)
- [ ] Fonnte WhatsApp automation (auto order confirmation, shipping notification)
- [ ] Image upload via Cloudflare R2
- [ ] Scout Agent (find fashion stores via SerpAPI/Google Maps)
- [ ] Closer Agent (auto WA outreach)
- [ ] Weekly sales report via WhatsApp
- [ ] Export data to CSV/PDF
- [ ] Multi-store support
- [ ] Payment integration
- [ ] GitHub repository push (auth pending)

---
*FashionKas v1.0.0-beta | Sovereign Empire | Built with GenSpark.AI*
*"Katalog cantik dalam 5 menit. Jualan makin gampang."*
