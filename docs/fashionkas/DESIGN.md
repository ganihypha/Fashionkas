# FASHIONKAS — DESIGN DOCUMENT
## Layer 1: UI/UX Design System & Brand Guidelines
**Version**: 2.0 | **Date**: 26 Maret 2026 | **Status**: LIVE (Upgraded)

---

## 1. DESIGN PHILOSOPHY

### Anti-Scam, Trust-First Approach (NEW v2.0):
Website reseller sering terlihat seperti scam karena: dark theme tanpa social proof, copy terlalu SaaS/technical, tidak ada FAQ, tidak ada trust signals, loading state kosong. FashionKas v3.0 mengatasi semua ini:

### Prinsip Utama:
1. **Trust-First** — Social proof, trust badges, FAQ, security signals di setiap touchpoint
2. **Mobile-First** — 95% user buka dari HP, bukan laptop
3. **WA-Native Feel** — Familiar seperti WA (green accents, chat-like patterns)
4. **Zero Learning Curve** — Bisa pakai tanpa tutorial dalam 3 menit
5. **Ringan** — Jalan mulus di HP RAM 3GB + internet biasa
6. **100% Bahasa Indonesia** — Tidak ada kata English di user-facing UI
7. **Pain-First Copy** — Headline berbicara tentang masalah user, bukan fitur

---

## 2. BRAND IDENTITY

### 2.1 Color Palette

| Color | Hex | CSS Variable | Usage |
|-------|-----|-------------|-------|
| **Purple Primary** | `#A855F7` | `fk-purple` | Buttons, accents, highlights |
| **Purple Dark** | `#7C3AED` | `fk-purple-dark` | Hover states, gradients |
| **Purple Light** | `#C084FC` | `fk-purple-light` | Secondary buttons, badges |
| **Purple Deep** | `#6D28D9` | `fk-purple-deep` | Active states |
| **Surface 0** | `#030712` | `surface-0` | Main background |
| **Surface 1** | `#0D1117` | `surface-1` | Card backgrounds |
| **Surface 2** | `#161B22` | `surface-2` | Nested elements |
| **Surface 3** | `#1E2430` | `surface-3` | Elevated elements |
| **Text Primary** | `#F9FAFB` | — | Main text (white) |
| **Text Secondary** | `#9CA3AF` | — | Descriptions |
| **Text Muted** | `#6B7280` | — | Hints, placeholders |
| **Success** | `#10B981` | — | Positive: lunas, active |
| **Danger** | `#EF4444` | — | Error: belum bayar |
| **Warning** | `#F59E0B` | — | Caution: DP |
| **WA Green** | `#25D366` | `wa-green` | WhatsApp buttons |

### 2.2 Typography
- **Primary Font**: Inter (Google Fonts) — body text, UI elements
- **Heading Font**: Montserrat — headings, brand text
- **Mono Font**: JetBrains Mono — prices, numbers, codes
- **Weights**: 300-800 (Inter), 600-900 (Montserrat)
- **Body Size**: 14-16px
- **Heading Size**: 18-32px (responsive)
- **Small/Caption**: 10-12px

### 2.3 Logo
- Text logo: "FashionKas" — "Fashion" in purple, "Kas" in white
- Icon: `fa-solid fa-shirt` in purple gradient square (8px radius)
- PWA Icons: 192x192 & 512x512 purple gradient

### 2.4 Theme
- **Default**: Dark theme (premium feel, reduces eye strain)
- **Glass Morphism**: `backdrop-filter: blur(20px)`, semi-transparent bg
- **Gradients**: Purple gradient for primary CTAs

---

## 3. LAYOUT SYSTEM

### 3.1 App Shell (Authenticated Pages)
```
┌──────────────────────────────┐
│ Top Bar: [Logo] ... [Settings][Logout][Avatar]
│ ─────────────────────────────│
│ Desktop Nav (hidden on mobile):
│ [Dashboard][Katalog][Kasir][Pesanan][WA]...
│ ─────────────────────────────│
│                              │
│   Page Content (scrollable)  │
│   animation: pageFadeIn 0.3s │
│                              │
│ ─────────────────────────────│
│ Bottom Nav (mobile only):    │
│ [Dashboard][Katalog][+Jual][Pesanan][Lainnya]
│ "+" button: floating FAB style│
└──────────────────────────────┘
```

### 3.2 Landing Page (Public)
```
┌──────────────────────────────┐
│ Fixed Navbar (glass): [Logo] [Masuk] [Daftar]
│──────────────────────────────│
│ HERO: Pain-focused headline  │
│ + trust micro-signals        │
│ + dual CTA buttons           │
│──────────────────────────────│
│ PAIN POINTS: 4 problem cards │
│──────────────────────────────│
│ CARA KERJA: 3 numbered steps │
│──────────────────────────────│
│ DEMO KATALOG: interactive    │
│──────────────────────────────│
│ FITUR: 6 feature cards       │
│──────────────────────────────│
│ TESTIMONIALS: 3 beta testers │
│──────────────────────────────│
│ PRICING: Single beta card    │
│──────────────────────────────│
│ FAQ: 5 accordion questions   │
│──────────────────────────────│
│ FINAL CTA                    │
│──────────────────────────────│
│ FOOTER: badges + links       │
└──────────────────────────────┘
```

### 3.3 Responsive Breakpoints
- **Mobile**: < 640px (primary target, 95% users)
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px (admin/owner use)

---

## 4. COMPONENT PATTERNS

### 4.1 Glass Card
```css
.glass { 
  background: rgba(13, 17, 23, 0.8); 
  backdrop-filter: blur(20px); 
  border: 1px solid rgba(255,255,255,0.06); 
}
```

### 4.2 Interactive Card
```css
.card-hover { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.card-hover:hover { 
  transform: translateY(-3px); 
  border-color: rgba(168,85,247,0.15);
  box-shadow: 0 12px 40px rgba(0,0,0,0.4); 
}
```

### 4.3 Primary Button
```css
.btn-primary { 
  background: linear-gradient(135deg, #A855F7, #7C3AED); 
  box-shadow: 0 4px 20px rgba(168,85,247,0.3);
  transition: all 0.3s; 
}
.btn-primary:hover { box-shadow: 0 6px 30px rgba(168,85,247,0.45); transform: translateY(-1px); }
button:active { transform: scale(0.97); }
```

### 4.4 Skeleton Loading (NEW v2.0)
```css
.skeleton { 
  background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%);
  background-size: 200% 100%; 
  animation: skeletonShimmer 1.5s ease-in-out infinite;
}
```

### 4.5 Toast Notifications
- **Success**: Green (#10B981), auto-dismiss 3s
- **Error**: Red (#EF4444) with message
- **Info**: Blue (#3B82F6)
- Enter: slide up + fade in
- Exit: fade out + slide up

### 4.6 Input Fields
```css
input:focus { 
  border-color: rgba(168,85,247,0.5); 
  box-shadow: 0 0 0 3px rgba(168,85,247,0.1); 
}
```

### 4.7 Status Badges
- Lunas: `bg-green-500/15 text-green-400 border-green-500/30`
- DP: `bg-yellow-500/15 text-yellow-400 border-yellow-500/30`
- Belum Bayar: `bg-red-500/15 text-red-400 border-red-500/30`

---

## 5. ANIMATION SYSTEM (NEW v2.0)

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| `pageFadeIn` | 0.3s | ease-out | Page content entrance |
| `fadeUp` | 0.6s | ease-out | Landing page sections |
| `float` | 5s | ease-in-out | Demo catalog card |
| `skeletonShimmer` | 1.5s | ease-in-out | Loading states |
| `toastIn` | 0.3s | ease-out | Toast entrance |
| `toastOut` | 0.3s | ease-in | Toast exit |
| `slideUp` | 0.2s | cubic-bezier | More menu popup |
| `waPulse` | 2s | ease | WA button pulse |

---

## 6. TRUST SIGNALS CHECKLIST (NEW v2.0)

| Signal | Location | Status |
|--------|----------|--------|
| "Aman & terenkripsi" | Hero, pricing | LIVE |
| "Tanpa kartu kredit" | Hero, pricing | LIVE |
| "Setup 5 menit" | Hero | LIVE |
| SSL Encrypted badge | Footer | LIVE |
| Cloudflare Edge badge | Footer | LIVE |
| Testimonials (3) | Social proof section | LIVE (beta) |
| FAQ (5 questions) | FAQ section | LIVE |
| Star ratings | Testimonials | LIVE |
| Green "BUKA" badge | Demo catalog | LIVE |
| Copyright | Footer | LIVE |

---

## 7. ACCESSIBILITY

| Guideline | Status |
|-----------|--------|
| Color contrast WCAG AA | PASS |
| Touch targets >= 44px | PASS |
| Focus indicators (input glow) | PASS |
| Screen reader labels | PARTIAL |
| Keyboard navigation | TODO |

---

## 8. PWA

| Feature | Status |
|---------|--------|
| Manifest + icons | LIVE |
| Service Worker v2.5 | LIVE |
| Install banner | LIVE |
| Offline fallback | LIVE |
| Theme color #A855F7 | LIVE |

---

**FashionKas Design v2.0 | 26 Maret 2026**
**Document**: docs/fashionkas/DESIGN.md
