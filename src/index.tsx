// ============================================================
// FashionKas v3.1 - Main Application Entry Point
// Updated: 2026-03-28
// ============================================================
// ARCHITECTURE (3-Layer Brand System):
//   1. FashionKas  = Front brand (user-facing, fashion niche)
//   2. ResellerKas = Engine layer (shared API, reusable for any niche)
//   3. Sovereign   = Internal parent/holding strategy layer
//
// All API routes under /api/* are ENGINE (ResellerKas) - niche-agnostic
// All page routes under /fashionkas/* are FRONT (FashionKas) - fashion-specific
//
// SECURITY: All secrets in CF env vars (not wrangler.jsonc)
// AUTH: JWT HS256 + SHA-256 PIN hash, 30-day expiry
// RATE LIMITING: In-memory per-IP tracker for auth endpoints
// ============================================================

import { Hono } from 'hono'
import { cors } from 'hono/cors'

// === ENGINE LAYER (ResellerKas) - API Routes ===
import { subscriptionRoutes } from './routes/subscription'
import { authRoutes } from './routes/auth'
import { productRoutes } from './routes/products'
import { orderRoutes } from './routes/orders'
import { customerRoutes } from './routes/customers'
import { dashboardRoutes } from './routes/dashboard'
import { waRoutes } from './routes/wa'
import { reportRoutes } from './routes/reports'
import { imageRoutes } from './routes/images'
import { aiRoutes } from './routes/ai'
import { webhookRoutes } from './routes/webhook'

// === FRONT LAYER (FashionKas) - Page Views ===
import { fashionLayout } from './fashion/layout'
import { dashboardPage } from './fashion/pages/dashboard'
import { kasirPage } from './fashion/pages/kasir'
import { catalogManagePage } from './fashion/pages/catalog-manage'
import { catalogPublicPage } from './fashion/pages/catalog-public'
import { ordersPage } from './fashion/pages/orders'
import { settingsPage } from './fashion/pages/settings'
import { loginPage, registerPage } from './fashion/pages/auth'
import { landingPage } from './fashion/pages/landing'
import { waAutomationPage } from './fashion/pages/wa-automation'
import { reportsPage } from './fashion/pages/reports'
import { scoutAgentPage } from './fashion/pages/scout-agent'
import { closerAgentPage } from './fashion/pages/closer-agent'
import { onboardingPage } from './fashion/pages/onboarding'
import { customersPage } from './fashion/pages/customers'
import { followupPage } from './fashion/pages/followup'

// === TYPE DEFINITIONS ===
type Bindings = {
  // Supabase
  SUPABASE_URL: string
  SUPABASE_ANON_KEY: string
  SUPABASE_SERVICE_KEY: string
  // Auth
  JWT_SECRET: string
  // WhatsApp (Fonnte)
  FONNTE_TOKEN: string
  FONNTE_ACCOUNT_TOKEN: string
  // External APIs
  SCRAPERAPI_KEY: string
  // Storage
  R2_BUCKET: R2Bucket
}

const app = new Hono<{ Bindings: Bindings }>()

// ============================================================
// MIDDLEWARE
// ============================================================
app.use('/api/*', cors())

// ============================================================
// PWA (Progressive Web App) Support
// ============================================================
app.get('/manifest.json', async (c) => {
  try {
    return c.json({
      name: "FashionKas - Kasir Digital",
      short_name: "FashionKas",
      description: "Katalog + Kasir + Follow-up untuk Reseller Fashion Indonesia",
      start_url: "/fashionkas/dashboard",
      display: "standalone",
      background_color: "#0A0A0A",
      theme_color: "#A855F7",
      orientation: "portrait",
      scope: "/",
      icons: [
        { src: "/static/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
        { src: "/static/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }
      ],
      categories: ["business", "shopping", "finance"],
      lang: "id"
    })
  } catch { return c.json({}) }
})

app.get('/sw.js', async (c) => {
  const sw = `const CACHE_NAME='fashionkas-v3.1';self.addEventListener('install',()=>{self.skipWaiting()});self.addEventListener('activate',(e)=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE_NAME).map(x=>caches.delete(x)))));self.clients.claim()});self.addEventListener('fetch',(e)=>{if(e.request.method!=='GET'||new URL(e.request.url).pathname.startsWith('/api/'))return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(CACHE_NAME).then(ca=>ca.put(e.request,c))}return r}).catch(()=>caches.match(e.request).then(c=>c||new Response('Offline',{status:503}))))});`;
  return new Response(sw, { headers: { 'Content-Type': 'application/javascript', 'Cache-Control': 'no-cache' } })
})

// ============================================================
// ENGINE LAYER (ResellerKas) - API Routes
// These are niche-agnostic and can be reused for any reseller brand
// ============================================================
app.route('/api/auth', authRoutes)
app.route('/api/products', productRoutes)
app.route('/api/orders', orderRoutes)
app.route('/api/customers', customerRoutes)
app.route('/api/dashboard', dashboardRoutes)
app.route('/api/wa', waRoutes)
app.route('/api/reports', reportRoutes)
app.route('/api/images', imageRoutes)
app.route('/api/ai', aiRoutes)
app.route('/api/webhook', webhookRoutes)
app.route('/api/subscription', subscriptionRoutes)

// Health & Meta
app.get('/api/health', (c) => c.json({
  status: 'ok',
  app: 'FashionKas',
  engine: 'ResellerKas',
  version: '3.1',
  build: '2026-03-28',
  webhook: '/api/webhook/incoming',
  features: [
    'catalog', 'kasir', 'orders', 'customers', 'followup',
    'wa-automation', 'r2-upload', 'fonnte-bot', 'ai-agents',
    'subscription-tiers', 'rate-limiting', 'csv-export'
  ]
}))

// ============================================================
// FRONT LAYER (FashionKas) - Page Routes
// Fashion-specific branding, layout, and pages
// ============================================================

// Public pages
app.get('/', (c) => c.html(landingPage()))
app.get('/login', (c) => c.html(loginPage()))
app.get('/register', (c) => c.html(registerPage()))

// App pages (auth protected via frontend JS)
app.get('/fashionkas/dashboard', (c) => c.html(dashboardPage()))
app.get('/fashionkas/sale', (c) => c.html(kasirPage()))
app.get('/fashionkas/catalog', (c) => c.html(catalogManagePage()))
app.get('/fashionkas/orders', (c) => c.html(ordersPage()))
app.get('/fashionkas/customers', (c) => c.html(customersPage()))
app.get('/fashionkas/followup', (c) => c.html(followupPage()))
app.get('/fashionkas/settings', (c) => c.html(settingsPage()))
app.get('/fashionkas/wa', (c) => c.html(waAutomationPage()))
app.get('/fashionkas/reports', (c) => c.html(reportsPage()))
app.get('/fashionkas/scout', (c) => c.html(scoutAgentPage()))
app.get('/fashionkas/closer', (c) => c.html(closerAgentPage()))
app.get('/fashionkas/onboarding', (c) => c.html(onboardingPage()))

// Public catalog (no auth required)
app.get('/catalog/:slug', (c) => {
  const slug = c.req.param('slug')
  return c.html(catalogPublicPage(slug))
})

export default app
