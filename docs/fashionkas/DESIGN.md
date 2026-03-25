# FASHIONKAS — DESIGN DOCUMENT
## Layer 1: UI/UX Design System & Brand Guidelines
**Version**: 1.0 | **Date**: 25 Maret 2026 | **Status**: LIVE

---

## 1. DESIGN PHILOSOPHY

### Prinsip Utama:
1. **Mobile-First** — 95% user buka dari HP, bukan laptop
2. **WA-Native Feel** — UI harus terasa familiar seperti WA (chat bubble, green accents)
3. **Zero Learning Curve** — User bisa pakai tanpa tutorial dalam 3 menit
4. **Ringan** — Harus jalan mulus di HP RAM 3GB + internet biasa
5. **Bahasa Indonesia 100%** — Tidak ada satu kata English di UI

---

## 2. BRAND IDENTITY

### 2.1 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Purple (Primary)** | `#A855F7` | Buttons, accents, highlights |
| **Purple Dark** | `#7C3AED` | Hover states, active elements |
| **Purple Light** | `#C084FC` | Secondary buttons, badges |
| **Purple Highlight** | `#D8B4FE` | Subtle accents |
| **Gold** | `#F0A500` | Premium badges, CTAs, pricing |
| **Background Dark** | `#030712` | Main background (dark theme) |
| **Card Dark** | `#0D1117` | Card backgrounds |
| **Card Secondary** | `#161B22` | Nested card backgrounds |
| **Text Primary** | `#F9FAFB` | Main text (white) |
| **Text Secondary** | `#9CA3AF` | Secondary text (gray) |
| **Success** | `#10B981` | Positive states, "lunas" |
| **Danger** | `#EF4444` | Error states, "belum bayar" |
| **Warning** | `#F59E0B` | Warning states, "DP" |
| **Border** | `#374151` | Card borders |

### 2.2 Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Body**: 14-16px
- **Headings**: 18-24px
- **Small text**: 12px

### 2.3 Logo & Icons
- **Logo**: "FashionKas" text with shopping bag + sparkle icon
- **Icon Library**: Font Awesome 6.4 (CDN)
- **PWA Icons**: 192x192 & 512x512 purple gradient icons

### 2.4 Theme
- **Default**: Dark theme (sesuai trend dan terkesan premium)
- **Future**: Light theme toggle (belum prioritas)

---

## 3. LAYOUT SYSTEM

### 3.1 App Shell
```
┌─────────────────────────────────┐
│  Top Bar (logo + navigation)     │
│  ┌───────────────────────────┐  │
│  │                           │  │
│  │     Page Content          │  │
│  │     (scrollable)          │  │
│  │                           │  │
│  │                           │  │
│  └───────────────────────────┘  │
│                                  │
│  ┌───────────────────────────┐  │
│  │  Bottom Navigation Bar     │  │
│  │  [Dashboard][Sale][Catalog]│  │
│  │  [Orders][More]            │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

### 3.2 Bottom Navigation (Mobile)

| Tab | Icon | Path | Label |
|-----|------|------|-------|
| Dashboard | `fa-chart-line` | `/fashionkas/dashboard` | Dashboard |
| Kasir | `fa-cash-register` | `/fashionkas/sale` | Kasir |
| Katalog | `fa-box-open` | `/fashionkas/catalog` | Katalog |
| Pesanan | `fa-receipt` | `/fashionkas/orders` | Pesanan |
| Lainnya | `fa-bars` | (expand menu) | Lainnya |

### 3.3 Responsive Breakpoints
- **Mobile**: < 640px (primary target)
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

---

## 4. PAGE DESIGNS

### 4.1 Landing Page (`/`)
```
┌──────────────────────────┐
│  [Logo] FashionKas       │
│  [Login] [Daftar Gratis] │
├──────────────────────────┤
│                          │
│  HERO SECTION            │
│  "Rapikan Jualan Fashion │
│   dari WhatsApp"         │
│  [Daftar Gratis →]       │
│                          │
├──────────────────────────┤
│  CARA KERJA (3 steps)    │
│  1. Upload Produk        │
│  2. Share 1 Link Katalog │
│  3. Catat Transaksi      │
├──────────────────────────┤
│  DEMO KATALOG            │
│  (Preview katalog Nurul) │
├──────────────────────────┤
│  6 FITUR UNGGULAN        │
│  Grid 2x3 feature cards  │
├──────────────────────────┤
│  PRICING (3 tiers)       │
│  Starter | Basic | Pro   │
├──────────────────────────┤
│  TESTIMONIAL (3 orang)   │  ← MISSING: placeholder needed
├──────────────────────────┤
│  CTA FINAL               │
│  [Daftar Sekarang →]     │
├──────────────────────────┤
│  Footer                  │
│  © 2026 FashionKas       │
└──────────────────────────┘
```

### 4.2 Dashboard (`/fashionkas/dashboard`)
```
┌──────────────────────────┐
│  Selamat datang, [Nama]! │
├──────────────────────────┤
│  ┌────┐ ┌────┐ ┌────┐  │
│  │Omzet│ │Order│ │Profit│
│  │Hari │ │Hari │ │Hari  │
│  │ini  │ │ini  │ │ini   │
│  └────┘ └────┘ └────┘  │
├──────────────────────────┤
│  Revenue Chart (7 hari)  │
│  [bar chart]             │
├──────────────────────────┤
│  Top Products            │
│  1. Gamis Marun - 12 pcs │
│  2. Hijab Pastel - 8 pcs │
├──────────────────────────┤
│  Low Stock Alert ⚠️      │
│  Rok Plisket - 2 left    │
├──────────────────────────┤
│  [Bottom Nav]            │
└──────────────────────────┘
```

### 4.3 Kasir/POS (`/fashionkas/sale`)
```
┌──────────────────────────┐
│  🔍 Cari Produk          │
│  [Search input]          │
├──────────────────────────┤
│  Category pills:         │
│  [Semua] [Gamis] [Hijab] │
├──────────────────────────┤
│  Product Grid:           │
│  ┌─────┐ ┌─────┐       │
│  │ Img │ │ Img │        │
│  │ Name│ │ Name│        │
│  │ Rp  │ │ Rp  │        │
│  │[+]  │ │[+]  │        │
│  └─────┘ └─────┘        │
├──────────────────────────┤
│  KERANJANG (3 items)     │
│  ┌────────────────────┐  │
│  │ Gamis Marun x2 80K │  │
│  │ Size: L, Warna: Marun│
│  │ Hijab Pastel x1 45K│  │
│  └────────────────────┘  │
│  Subtotal: Rp 205.000   │
│  Diskon: -Rp 5.000      │
│  Ongkir: Rp 15.000      │
│  TOTAL: Rp 215.000      │
│  Profit: Rp 65.000      │
├──────────────────────────┤
│  Info Customer:          │
│  [Nama] [No WA]         │
│  Pembayaran: [Transfer]  │
│  Status: [Lunas/DP/Blm] │
│  [🛒 Simpan Transaksi]  │
└──────────────────────────┘
```

---

## 5. COMPONENT PATTERNS

### 5.1 Cards
```html
<!-- Standard Card -->
<div class="bg-[#0D1117] border border-[#374151] rounded-xl p-4">
  <h3 class="text-white font-semibold">Title</h3>
  <p class="text-gray-400 text-sm">Description</p>
</div>
```

### 5.2 Buttons
```html
<!-- Primary Button (Purple) -->
<button class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold">
  Action
</button>

<!-- Gold CTA Button -->
<button class="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 py-3 rounded-xl font-bold">
  Daftar Gratis →
</button>

<!-- Outline Button -->
<button class="border border-purple-500 text-purple-400 px-4 py-2 rounded-lg hover:bg-purple-500/10">
  Secondary
</button>
```

### 5.3 Status Badges
```html
<!-- Lunas (Green) -->
<span class="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Lunas</span>

<!-- DP (Yellow) -->
<span class="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">DP</span>

<!-- Pending (Red) -->
<span class="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">Belum Bayar</span>
```

### 5.4 Input Fields
```html
<input type="text" placeholder="Nama produk..."
  class="w-full bg-[#161B22] border border-[#374151] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
```

---

## 6. UX PATTERNS

### 6.1 Feedback
- **Success**: Green toast notification (auto-dismiss 3s)
- **Error**: Red toast notification with error message
- **Loading**: Spinner + "Memproses..." text
- **Empty State**: Illustration + helpful message + CTA

### 6.2 Navigation
- Bottom tab bar (5 tabs) for main navigation
- Sidebar menu for secondary pages (Settings, WA, Reports)
- Back button on all sub-pages
- Active tab highlighted with purple

### 6.3 Form Patterns
- Real-time validation (on blur)
- Auto-save (where applicable)
- Confirm dialogs for destructive actions (delete)
- Number inputs with Rp prefix formatting

### 6.4 Mobile Gestures
- Pull-to-refresh (future)
- Swipe for quick actions (future)
- Tap to expand/collapse cards

---

## 7. PWA SPECIFICATIONS

| Feature | Implementation |
|---------|---------------|
| **Manifest** | name, icons, theme_color, start_url |
| **Service Worker** | v2.5, network-first for HTML, cache for assets |
| **Install Banner** | Custom prompt after 2 page visits |
| **Offline** | Cached pages + "Offline" fallback |
| **Icons** | 192x192 + 512x512 purple gradient |
| **Theme Color** | `#A855F7` (purple) |
| **Background** | `#0A0A0A` (dark) |

---

## 8. ACCESSIBILITY

| Guideline | Status |
|-----------|--------|
| Color contrast (WCAG AA) | ✅ White on dark passes |
| Touch targets (>= 44px) | ✅ All buttons/links |
| Focus indicators | 🟡 Partial |
| Screen reader labels | 🟡 Partial |
| Keyboard navigation | ❌ Not yet |

---

**FashionKas Design Document v1.0**
**Document**: docs/fashionkas/DESIGN.md
**Date**: 25 Maret 2026
