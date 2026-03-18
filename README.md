# FashionKas v1.2.0

> Kasir Digital + Katalog Online + AI Agents + WA Automation untuk Fashion Reseller Indonesia

## URLs
- **Production**: https://fashionkas.pages.dev
- **Sandbox**: https://3000-inaugkt3jfm8iuad5sesr-b9b802c4.sandbox.novita.ai
- **GitHub**: https://github.com/ganihypha/Fashionkas
- **Backup**: https://www.genspark.ai/api/files/s/iySDU2ta

## Features (v1.2.0)

### Core POS
- **Kasir Digital** (`/fashionkas/sale`) - Cart, payment methods (Cash/Transfer/COD/Marketplace), WhatsApp receipt, discount & shipping, product images, size/color selector
- **Katalog Management** (`/fashionkas/catalog`) - CRUD products, search/filter, image preview, sorting, featured toggle, inventory value
- **Public Catalog** (`/catalog/:slug`) - Shareable catalog with OG meta tags, product detail modal
- **Orders** (`/fashionkas/orders`) - Status tabs (pending/processing/shipped/delivered), tracking input, WA notification

### AI Agents (NEW v1.2)
- **Scout AI** (`/fashionkas/scout`) - RFM lead scoring, customer segmentation (VIP/Loyal/Warm/At-Risk/Cold), churn prediction, business insights
- **Closer AI** (`/fashionkas/closer`) - Smart follow-up suggestions, WA outreach templates (Thank You/Loyalty/Re-engage/VIP/Win Back), Fonnte integration

### WhatsApp Automation (NEW v1.2)
- **WA Automation** (`/fashionkas/wa`) - Auto-send receipts, shipping notifications, broadcast promo, Fonnte status check, message history

### Analytics & Reports (NEW v1.2)
- **Reports** (`/fashionkas/reports`) - Monthly analytics, Chart.js daily revenue chart, top products, payment/category breakdown, PDF export
- **Dashboard** (`/fashionkas/dashboard`) - Revenue chart, stats, alerts, recent orders

### Other
- **Settings** (`/fashionkas/settings`) - Store profile, Fonnte setup guide, CSV export, PIN change
- **Auth** (`/login`, `/register`) - Phone + PIN auth, JWT, 3-step registration wizard

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/health` | GET | Health check (v1.2.0) |
| `/api/auth/register` | POST | Register store |
| `/api/auth/login` | POST | Login with phone+PIN |
| `/api/auth/me` | GET | Get current store |
| `/api/auth/store` | PUT | Update store profile |
| `/api/auth/change-pin` | PUT | Change PIN |
| `/api/products` | GET/POST | List/create products |
| `/api/products/:id` | PUT/DELETE | Update/delete product |
| `/api/products/public/:slug` | GET | Public catalog |
| `/api/orders` | GET/POST | List/create orders |
| `/api/orders/:id` | PUT | Update order status |
| `/api/customers` | GET/POST | List/create customers |
| `/api/dashboard/stats` | GET | Dashboard statistics |
| `/api/wa/send-receipt` | POST | Send receipt via WA |
| `/api/wa/send-shipping` | POST | Send shipping notif |
| `/api/wa/broadcast` | POST | Broadcast promo |
| `/api/wa/history` | GET | WA message history |
| `/api/wa/status` | GET | Fonnte connection status |
| `/api/reports/monthly` | GET | Monthly report data |
| `/api/ai/scout/scores` | GET | Customer lead scores |
| `/api/ai/scout/insights` | GET | AI business insights |
| `/api/ai/closer/suggestions` | GET | Follow-up suggestions |
| `/api/ai/closer/send` | POST | Send follow-up via WA |
| `/api/ai/closer/templates` | GET | Message templates |
| `/api/images/upload` | POST | Upload image (R2/base64) |
| `/api/images/serve/*` | GET | Serve image from R2 |
| `/api/images/delete` | DELETE | Delete image |
| `/api/images/list` | GET | List store images |

## Tech Stack
- **Backend**: Hono (Cloudflare Workers)
- **Frontend**: TailwindCSS, Font Awesome, Chart.js
- **Database**: Supabase (PostgreSQL)
- **Auth**: JWT + SHA-256 PIN hash
- **WA**: Fonnte API
- **Deploy**: Cloudflare Pages
- **Storage**: R2 (pending bucket creation, base64 fallback active)

## Database Tables
- `stores` - Store profiles
- `products` - Product catalog
- `orders` - Orders
- `order_items` - Order line items
- `customers` - Customer data
- `wa_messages` - WhatsApp message log (NEW v1.2)

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: Active
- **Version**: 1.2.0
- **Bundle**: 313.84 kB (50 modules)
- **Pages**: 13 routes
- **Last Updated**: 2026-03-18

## Roadmap (v1.3+)
1. R2 bucket creation + image upload activation
2. Multi-store management
3. Builder AI Agent (supplier finder)
4. Harvest AI Agent (financial insights)
5. PDF invoice generation
6. Offline mode / PWA
