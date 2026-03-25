# SOVEREIGN — PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Layer 3: Engine / Umbrella / Parent Platform
**Version**: 1.0 | **Date**: 25 Maret 2026 | **Status**: CONCEPTUAL — JANGAN BUILD DULU

---

## ⚠️ STATUS: CONCEPTUAL ONLY

**Sovereign sebagai produk/platform TERPISAH belum boleh dibangun.**

### Prerequisites:
1. ⬜ FashionKas validated (10 paying users)
2. ⬜ Minimal 1 produk anak lain (ResellerKas/BarberKas) live
3. ⬜ Shared code pattern sudah jelas (after 2 products)
4. ⬜ Revenue > Rp 5jt/bulan dari combined products

---

## 1. WHAT IS SOVEREIGN?

**Sovereign** adalah engine/umbrella/parent yang mempoweri semua produk -Kas.

### Sovereign BUKAN:
- ❌ Produk yang dijual langsung ke user
- ❌ Brand yang tampil di depan
- ❌ Dashboard yang user buka
- ❌ Pengganti FashionKas/ResellerKas

### Sovereign ADALAH:
- ✅ Engine platform (shared tech infrastructure)
- ✅ AI brain (Scout Agent, Closer Agent, Predator Suite)
- ✅ Unified analytics (cross-product metrics)
- ✅ Parent company identity (for pitch deck, investors)
- ✅ Command center (internal dashboard for founder)

---

## 2. SOVEREIGN COMPONENTS

### 2.1 Sovereign Engine (Shared Infrastructure)

| Component | Description | Status |
|-----------|-------------|--------|
| **Auth Engine** | JWT, PIN, multi-tenant isolation | ✅ Built (inside FashionKas) |
| **Supabase Client** | Custom REST client for CF Workers | ✅ Built (inside FashionKas) |
| **Fonnte Abstraction** | WA messaging layer | ✅ Built (inside FashionKas) |
| **R2 Storage** | Image upload/serve | ✅ Built (inside FashionKas) |
| **Layout System** | Shared HTML layout generator | ✅ Built (inside FashionKas) |

**Status**: Semua sudah ada di dalam FashionKas codebase. Belum perlu di-extract ke package terpisah.

### 2.2 Sovereign AI (Predator Suite)

| Agent | Role | Status |
|-------|------|--------|
| **Scout Agent** | Cari leads dari Google Maps/Social | 🟡 UI ready, not autonomous |
| **Closer Agent** | Generate personal WA outreach | 🟡 UI ready, not autonomous |
| **Builder Agent** | Auto-generate landing page for leads | ❌ Not started |
| **Harvest Agent** | Track subscriptions, prevent churn | ❌ Not started |

**Status**: Scout & Closer ada di FashionKas sebagai halaman UI, tapi belum autonomous. Builder & Harvest belum dimulai.

### 2.3 Sovereign Command Center (Internal Dashboard)

| Feature | Description | Status |
|---------|-------------|--------|
| **Cross-product metrics** | Revenue, users, churn dari semua produk | ❌ Not started |
| **Lead pipeline** | Funnel from scout → closer → convert | ❌ Not started |
| **Deployment status** | All CF Pages projects + health | ❌ Not started |
| **Content calendar** | TikTok/IG posting schedule | ❌ Not started |

**Status**: Belum dibangun. Tidak perlu sampai ada 2+ produk live.

---

## 3. SOVEREIGN'S ROLE IN EACH PRODUCT

```
SOVEREIGN ENGINE
│
├── Provides to FashionKas:
│   ├── Auth system (JWT + PIN)
│   ├── Supabase client
│   ├── Fonnte WA integration
│   ├── R2 image storage
│   ├── Layout system
│   └── (Future) AI lead scoring
│
├── Provides to ResellerKas:
│   ├── Same as FashionKas
│   ├── + Multi-store infrastructure
│   ├── + Category analytics engine
│   └── + Sub-reseller commission calc
│
├── Provides to BarberKas (Future):
│   ├── Same base engine
│   ├── + Appointment booking
│   └── + Queue management
│
└── Sovereign Command Center (Internal):
    ├── Unified dashboard
    ├── Cross-product analytics
    ├── AI Predator Suite controls
    └── Revenue tracking
```

---

## 4. NAMING & BRANDING

### How Sovereign Appears:

| Context | How | Example |
|---------|-----|---------|
| **Product footer** | Small text | "Powered by Sovereign Engine" |
| **Internal docs** | Full name | "Sovereign WA Reseller Engine" |
| **Pitch deck** | Company name | "Sovereign — UMKM Digital Platform" |
| **GitHub** | Org name | github.com/ganihypha/ |
| **NEVER** | Public-facing brand | ❌ "Login ke Sovereign" |
| **NEVER** | Replacing product names | ❌ "Sovereign FashionKas" |

---

## 5. WHEN TO BUILD SOVEREIGN AS SEPARATE ENTITY

### Trigger Conditions:
1. **Revenue > Rp 5jt/bulan** from combined products
2. **2+ products live** with paying users
3. **Shared code is duplicated** across 2+ repos (need extraction)
4. **AI Predator Suite** needed for lead gen at scale
5. **Investor/partner pitch** requires unified dashboard

### What Gets Built:
1. `sovereign-engine` npm package (shared utilities)
2. `sovereign-command.pages.dev` (internal dashboard)
3. `sovereign-predator.pages.dev` (AI agent control center)

### What Does NOT Get Built:
- ❌ Public-facing Sovereign website (premature)
- ❌ Sovereign API (products have own APIs)
- ❌ Sovereign marketplace (not the vision)

---

## 6. ROADMAP (CONDITIONAL)

### Phase 0: Current (Maret 2026)
- Sovereign exists ONLY as concept + docs
- All shared code lives inside FashionKas

### Phase 1: After FashionKas validated (Est. Juni 2026)
- Extract shared utilities to npm package
- Start Scout Agent autonomous mode

### Phase 2: After 2nd product launches (Est. September 2026)
- Build Sovereign Command Center
- Activate Closer Agent

### Phase 3: After Rp 10jt MRR (Est. Desember 2026)
- Full Predator Suite (all 4 agents)
- Unified analytics
- Investor dashboard

---

**Sovereign PRD v1.0**
**Document**: docs/sovereign/PRD.md
**Date**: 25 Maret 2026
**Status**: CONCEPTUAL — Do NOT build yet
