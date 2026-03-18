// FashionKas v1.2 - Main Application Entry Point
// Kasir Digital + Katalog Online + WA Automation + AI Agents untuk Fashion Reseller

import { Hono } from 'hono'
import { cors } from 'hono/cors'
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
import { authRoutes } from './routes/auth'
import { productRoutes } from './routes/products'
import { orderRoutes } from './routes/orders'
import { customerRoutes } from './routes/customers'
import { dashboardRoutes } from './routes/dashboard'
import { waRoutes } from './routes/wa'
import { reportRoutes } from './routes/reports'
import { imageRoutes } from './routes/images'
import { aiRoutes } from './routes/ai'

type Bindings = {
  SUPABASE_URL: string
  SUPABASE_ANON_KEY: string
  SUPABASE_SERVICE_KEY: string
  JWT_SECRET: string
  FONNTE_TOKEN: string
  SCRAPERAPI_KEY: string
  R2_BUCKET: R2Bucket
}

const app = new Hono<{ Bindings: Bindings }>()

// CORS for API routes
app.use('/api/*', cors())

// === API ROUTES ===
app.route('/api/auth', authRoutes)
app.route('/api/products', productRoutes)
app.route('/api/orders', orderRoutes)
app.route('/api/customers', customerRoutes)
app.route('/api/dashboard', dashboardRoutes)
app.route('/api/wa', waRoutes)
app.route('/api/reports', reportRoutes)
app.route('/api/images', imageRoutes)
app.route('/api/ai', aiRoutes)

// Health check
app.get('/api/health', (c) => c.json({ status: 'ok', app: 'FashionKas', version: '1.2.0' }))

// === PAGE ROUTES ===
// Landing page
app.get('/', (c) => c.html(landingPage()))

// Auth pages
app.get('/login', (c) => c.html(loginPage()))
app.get('/register', (c) => c.html(registerPage()))

// App pages (protected by frontend JS auth check)
app.get('/fashionkas/dashboard', (c) => c.html(dashboardPage()))
app.get('/fashionkas/sale', (c) => c.html(kasirPage()))
app.get('/fashionkas/catalog', (c) => c.html(catalogManagePage()))
app.get('/fashionkas/orders', (c) => c.html(ordersPage()))
app.get('/fashionkas/settings', (c) => c.html(settingsPage()))
app.get('/fashionkas/wa', (c) => c.html(waAutomationPage()))
app.get('/fashionkas/reports', (c) => c.html(reportsPage()))
app.get('/fashionkas/scout', (c) => c.html(scoutAgentPage()))
app.get('/fashionkas/closer', (c) => c.html(closerAgentPage()))

// Public catalog (no auth)
app.get('/catalog/:slug', (c) => {
  const slug = c.req.param('slug')
  return c.html(catalogPublicPage(slug))
})

export default app
