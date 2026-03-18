# FashionKas v1.2.1

> Kasir Digital + Katalog Online + AI Agents + WA Automation untuk Fashion Reseller Indonesia

## URLs
- **Production**: https://fashionkas.pages.dev
- **GitHub**: https://github.com/ganihypha/Fashionkas

## Features (v1.2.1)

### Core POS
- **Kasir Digital** (`/fashionkas/sale`) - Cart, payment methods (Cash/Transfer/COD/Marketplace), **auto-kirim struk WA via Fonnte**, discount & shipping, product images, size/color selector, typing indicator
- **Katalog Management** (`/fashionkas/catalog`) - CRUD products, search/filter, image preview, sorting, featured toggle, inventory value
- **Public Catalog** (`/catalog/:slug`) - Shareable catalog with OG meta tags, product detail modal
- **Orders** (`/fashionkas/orders`) - Status tabs (pending/processing/shipped/delivered), tracking input, **auto-send shipping notification via Fonnte**

### AI Agents
- **Scout AI** (`/fashionkas/scout`) - RFM lead scoring, customer segmentation (VIP/Loyal/Warm/At-Risk/Cold), churn prediction, business insights
- **Closer AI** (`/fashionkas/closer`) - Smart follow-up suggestions, WA outreach templates (Thank You/Loyalty/Re-engage/VIP/Win Back), **bulk send via Fonnte** (delay 3-8s anti-ban), direct Fonnte integration with typing indicator

### WhatsApp Automation - FULL Fonnte Integration (v1.2.1)
- **Device Status** - Real-time connection check, quota display, package info
- **Auto-kirim Struk** - Otomatis dari Kasir setelah saveOrder() + typing indicator 2s
- **Notif Pengiriman** - Auto-send dari Orders setelah input resi + link cekresi.com
- **Broadcast Promo** - Ke semua/segment customer, random delay 2-5s, image support
- **Kirim Pesan Custom** - Ke nomor manapun, typing indicator, scheduled send
- **Multi-step Messages** - Via Fonnte data parameter
- **WhatsApp Poll** - Polling 2-12 pilihan
- **Share Location** - Kirim lokasi via WA
- **Validate Numbers** - Cek nomor WA terdaftar (max 500)
- **Message History** - Log pesan + stats (sent/failed/by type)
- **Quota Check** - Sisa quota Fonnte

### Fonnte API Configuration
- **Device**: 083876789823 (Fashionkas)
- **Package**: Free (1000 quota)
- **Expiration**: 18 April 2026
- **Status**: Connected
- **Docs**: https://docs.fonnte.com/

### Analytics & Reports
- **Reports** (`/fashionkas/reports`) - Monthly analytics, Chart.js daily revenue chart, top products, payment/category breakdown, PDF export
- **Dashboard** (`/fashionkas/dashboard`) - Revenue chart, stats, alerts, recent orders

### Other
- **Settings** (`/fashionkas/settings`) - Store profile, catalog sharing, CSV export, PIN change
- **Auth** (`/login`, `/register`) - Phone + PIN auth, JWT, 3-step registration wizard

## API Routes

### Auth & Core
| Route | Method | Description |
|-------|--------|-------------|
| `/api/health` | GET | Health check (v1.2.1) |
| `/api/auth/register` | POST | Register store |
| `/api/auth/login` | POST | Login with phone+PIN |
| `/api/auth/me` | GET | Get current store |
| `/api/auth/store` | PUT | Update store profile |
| `/api/products` | GET/POST | List/create products |
| `/api/products/:id` | PUT/DELETE | Update/delete product |
| `/api/orders` | GET/POST | List/create orders |
| `/api/orders/:id` | PUT | Update order status |
| `/api/customers` | GET/POST | List/create customers |
| `/api/dashboard/stats` | GET | Dashboard statistics |

### WhatsApp Automation (Fonnte API)
| Route | Method | Description |
|-------|--------|-------------|
| `/api/wa/status` | GET | Device profile + connection status |
| `/api/wa/devices` | GET | All devices info (Account Token) |
| `/api/wa/quota` | GET | Remaining quota check |
| `/api/wa/history` | GET | Message log + stats (last 100) |
| `/api/wa/send-receipt` | POST | Send order receipt (typing indicator) |
| `/api/wa/send-shipping` | POST | Send shipping notif + tracking link |
| `/api/wa/broadcast` | POST | Broadcast promo (delay 2-5s, image support) |
| `/api/wa/send-custom` | POST | Custom message (typing, scheduled) |
| `/api/wa/send-multi` | POST | Multi-step via Fonnte data param |
| `/api/wa/send-poll` | POST | WhatsApp poll (2-12 choices) |
| `/api/wa/send-location` | POST | Share location |
| `/api/wa/validate` | POST | Validate WA numbers (max 500) |

### AI Agents
| Route | Method | Description |
|-------|--------|-------------|
| `/api/ai/scout/scores` | GET | Customer RFM lead scores |
| `/api/ai/scout/insights` | GET | AI business insights |
| `/api/ai/closer/suggestions` | GET | Follow-up suggestions |
| `/api/ai/closer/send` | POST | Send follow-up via Fonnte (typing) |
| `/api/ai/closer/send-bulk` | POST | Bulk send max 50 (delay 3-8s) |
| `/api/ai/closer/templates` | GET | Message templates |

### Images & Reports
| Route | Method | Description |
|-------|--------|-------------|
| `/api/reports/monthly` | GET | Monthly report data |
| `/api/images/upload` | POST | Upload image (R2/base64) |
| `/api/images/serve/*` | GET | Serve image from R2 |

## Tech Stack
- **Backend**: Hono (Cloudflare Workers)
- **Frontend**: TailwindCSS, Font Awesome, Chart.js
- **Database**: Supabase (PostgreSQL)
- **Auth**: JWT + SHA-256 PIN hash
- **WA**: Fonnte API (Full integration - 12 endpoints)
- **Deploy**: Cloudflare Pages
- **Storage**: R2 (pending bucket, base64 fallback active)

## Database Tables
- `stores` - Store profiles (name, slug, owner, pin, city, subscription)
- `products` - Product catalog (name, category, price, stock, sizes, colors, images)
- `orders` - Orders (order_number, customer, payment, shipping, tracking)
- `order_items` - Order line items (product, quantity, size, color, subtotal)
- `customers` - Customer data (name, phone, segment, total orders/spent)
- `wa_messages` - WhatsApp message log (type, status, fonnte_response)

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: Active
- **Version**: 1.2.1
- **Bundle**: 338.96 kB (50 modules)
- **Pages**: 13 routes
- **Last Updated**: 2026-03-18

## Roadmap (v1.3+)
1. R2 bucket creation + image upload activation
2. Multi-store management
3. Fonnte webhook integration (auto-reply, attachment handling)
4. Builder AI Agent (supplier finder)
5. Harvest AI Agent (financial insights)
6. PDF invoice generation
7. Offline mode / PWA
