# SOVEREIGN — ARCHITECTURE DOCUMENT
## Layer 3: Engine Architecture & Shared Infrastructure
**Version**: 1.0 | **Date**: 25 Maret 2026 | **Status**: CONCEPTUAL

---

## 1. SOVEREIGN ENGINE ARCHITECTURE

```
╔══════════════════════════════════════════════════════════════════╗
║                     SOVEREIGN ENGINE                             ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  ┌────────────────────────────────────────────────────────────┐  ║
║  │                  SHARED INFRASTRUCTURE                      │  ║
║  │                                                             │  ║
║  │  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐ │  ║
║  │  │ Auth Engine  │  │ DB Client    │  │ WA Abstraction   │ │  ║
║  │  │ (JWT+PIN)    │  │ (Supabase)   │  │ (Fonnte)         │ │  ║
║  │  └─────────────┘  └──────────────┘  └──────────────────┘ │  ║
║  │                                                             │  ║
║  │  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐ │  ║
║  │  │ Storage     │  │ Layout/UI    │  │ Analytics        │ │  ║
║  │  │ (R2)        │  │ Generator    │  │ Engine           │ │  ║
║  │  └─────────────┘  └──────────────┘  └──────────────────┘ │  ║
║  └────────────────────────────────────────────────────────────┘  ║
║                                                                  ║
║  ┌────────────────────────────────────────────────────────────┐  ║
║  │                  AI PREDATOR SUITE                          │  ║
║  │                                                             │  ║
║  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │  ║
║  │  │  SCOUT   │  │  CLOSER  │  │ BUILDER  │  │ HARVEST  │ │  ║
║  │  │  Agent   │  │  Agent   │  │  Agent   │  │  Agent   │ │  ║
║  │  │          │  │          │  │          │  │          │ │  ║
║  │  │ Find     │  │ Convert  │  │ Auto-gen │  │ Retain   │ │  ║
║  │  │ Leads    │  │ Leads    │  │ Landing  │  │ Users    │ │  ║
║  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │  ║
║  └────────────────────────────────────────────────────────────┘  ║
║                                                                  ║
║  POWERS:                                                         ║
║  ┌────────┐  ┌────────────┐  ┌────────────┐  ┌─────────┐      ║
║  │Fashion │  │ Reseller   │  │  Barber    │  │ Future  │      ║
║  │  Kas   │  │   Kas      │  │   Kas      │  │  -Kas   │      ║
║  └────────┘  └────────────┘  └────────────┘  └─────────┘      ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## 2. CURRENT STATE OF SHARED CODE

### Code that currently lives in FashionKas (will be extracted later):

| Module | File | LoC | Extractable? |
|--------|------|-----|-------------|
| **Supabase Client** | `src/lib/supabase.ts` | 154 | ✅ Yes — pure utility |
| **JWT Helper** | `src/lib/supabase.ts` | ~30 | ✅ Yes — pure utility |
| **PIN Hashing** | `src/lib/supabase.ts` | ~10 | ✅ Yes — pure utility |
| **Layout Generator** | `src/fashion/layout.ts` | 297 | 🟡 Partially — has fashion-specific branding |
| **Auth Routes** | `src/routes/auth.ts` | 202 | 🟡 Partially — auth logic reusable, UI not |
| **Fonnte Client** | `src/routes/wa.ts` | 598 | 🟡 Partially — core send/receive reusable |
| **Webhook Bot** | `src/routes/webhook.ts` | 696 | ❌ No — fashion-specific commands |
| **AI Agents** | `src/routes/ai.ts` | 417 | 🟡 Partially — search logic reusable |

### Extraction Plan (When Ready):

```typescript
// Future: @sovereign/engine package

export { createSupabaseClient } from './supabase'
export { createJWT, verifyJWT } from './jwt'
export { hashPin } from './pin'
export { createLayout } from './layout'
export { createFonnteClient } from './fonnte'
export { createScoutAgent, createCloserAgent } from './ai'
```

---

## 3. DATABASE ARCHITECTURE (Multi-Product)

```
SUPABASE POSTGRESQL
│
├── SHARED TABLES (used by all products):
│   ├── stores          → type: 'fashion' | 'barbershop' | 'multi-category'
│   ├── products        → universal product schema
│   ├── orders          → universal order schema
│   ├── order_items     → order detail
│   ├── customers       → customer database
│   └── wa_messages     → WA message log
│
├── FASHIONKAS-SPECIFIC:
│   └── (none — uses shared tables with type='fashion')
│
├── RESELLERKAS-SPECIFIC:
│   ├── suppliers       → supplier management
│   ├── sub_resellers   → sub-reseller network
│   ├── purchase_orders → PO to suppliers
│   └── store_groups    → multi-store grouping
│
├── BARBERKAS-SPECIFIC (Future):
│   ├── appointments    → booking system
│   ├── services        → service menu (potong, cukur, dll)
│   └── queue           → antrian live
│
└── SOVEREIGN-SPECIFIC:
    ├── hunting_leads       → leads from Scout Agent
    ├── outreach_messages   → messages from Closer Agent
    ├── lead_conversions    → lead → store mapping
    └── ai_sessions         → AI agent activity log
```

---

## 4. AI PREDATOR SUITE ARCHITECTURE

### 4.1 Scout Agent
```
Input:  "reseller fashion Purwokerto" OR "barbershop Jakarta"
         │
         ▼
[ScraperAPI → Google Maps / Google Search]
         │
         ▼
[AI (Groq/Claude) → Score digital gap 0-100]
         │
         ├── Has website?     (-30 score)
         ├── Has WA only?     (+20 score)
         ├── Has IG but messy? (+15 score)
         ├── Review count?    (inverse correlation)
         │
         ▼
[Output: Ranked lead list with contact info + score]
         │
         ▼
[INSERT hunting_leads]
```

### 4.2 Closer Agent
```
Input:  Lead from Scout Agent (name, phone, category, score)
         │
         ▼
[AI generates personal WA message]
  → "Kak [Nama], saya lihat [Toko] di [Kota].
     Saya punya tool sederhana untuk rapikan order WA..."
         │
         ▼
[Fonnte sends WA message]
         │
         ▼
[Track: delivered → read → replied → interested → converted]
```

### 4.3 Builder Agent (Future)
```
Input:  Lead profile (name, products, prices)
         │
         ▼
[Auto-generate demo catalog page]
         │
         ▼
[Deploy to: [name].fashionkas.pages.dev]
         │
         ▼
[Send link to lead: "Ini preview katalog digital toko Kak [Nama]"]
```

### 4.4 Harvest Agent (Future)
```
Input:  Active subscriber list
         │
         ▼
[Check: subscription expiry, usage drop, churn signals]
         │
         ▼
[Auto-send: renewal reminder, usage tips, upsell offers]
```

---

## 5. DEPLOYMENT MAP

```
CUSTOMER-FACING:
  fashionkas.pages.dev        → FashionKas (LIVE)
  resellerkas.pages.dev       → ResellerKas (PLANNED)
  barberkas.pages.dev         → BarberKas (FUTURE)

INTERNAL:
  sovereign-command.pages.dev → Command Center (FUTURE)
  sovereign-predator.pages.dev→ Predator Suite (FUTURE)

SHARED:
  pavkyexnqzfmdrbfzoht.supabase.co → Database (ALL)
  api.fonnte.com              → WA Gateway (ALL)
  Cloudflare R2               → Image Storage (ALL)
```

---

## 6. SECURITY ARCHITECTURE

### Secret Management per Product:

| Product | Secrets Storage | Status |
|---------|----------------|--------|
| FashionKas | CF Pages Secrets | ✅ Active |
| ResellerKas | CF Pages Secrets (separate) | ⬜ Not yet |
| BarberKas | CF Pages Secrets (separate) | ⬜ Not yet |
| Sovereign | CF Pages Secrets (separate) | ⬜ Not yet |

### Cross-Product Security:
- Each product has its own JWT_SECRET
- Supabase service key shared (same database)
- Fonnte tokens per-product (different WA numbers)
- R2 bucket per-product (different namespaces)

---

**Sovereign Architecture v1.0**
**Document**: docs/sovereign/ARCHITECTURE.md
**Date**: 25 Maret 2026
**Status**: CONCEPTUAL
