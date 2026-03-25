# RESELLERKAS — DESIGN DOCUMENT
## Layer 2: UI/UX Design for Multi-Category Reseller Platform
**Version**: 1.0 | **Date**: 25 Maret 2026 | **Status**: PLANNING — BELUM DIBANGUN

---

## 1. DESIGN DIFFERENCES FROM FASHIONKAS

### Brand Identity:

| Atribut | FashionKas | ResellerKas |
|---------|-----------|-------------|
| **Primary Color** | Purple (#A855F7) | Blue (#3B82F6) |
| **Accent Color** | Gold (#F0A500) | Emerald (#10B981) |
| **Theme** | Dark (fashion/premium) | Dark or Light (professional) |
| **Icon** | Shopping bag + sparkle | Box + arrows (multi-flow) |
| **Tagline** | "Rapikan Jualan Fashion dari WhatsApp" | "Kelola Semua Jualan Reseller dari Satu Tempat" |
| **Font** | Inter | Inter (same) |

### Navigation:

| Tab | FashionKas | ResellerKas |
|-----|-----------|-------------|
| 1 | Dashboard | Dashboard |
| 2 | Kasir | Kasir |
| 3 | Katalog | Katalog + Categories |
| 4 | Pesanan | Pesanan |
| 5 | Lainnya | Supplier / Network / More |

### Key UI Additions:

1. **Category Tabs** — Filter produk by kategori (Fashion, Beauty, Food, dll)
2. **Supplier Badge** — Setiap produk menampilkan supplier origin
3. **Multi-Store Switcher** — Dropdown di top bar untuk switch toko
4. **Analytics Dashboard** — Pie chart profit by category
5. **Sub-Reseller Panel** — List sub-reseller + commission tracking

---

## 2. WIREFRAMES

### Dashboard (ResellerKas)
```
┌──────────────────────────┐
│  [Store: Toko Mega ▾]    │  ← Multi-store switcher
├──────────────────────────┤
│  ┌────┐ ┌────┐ ┌────┐  │
│  │Omzet│ │Order│ │Profit│
│  └────┘ └────┘ └────┘  │
├──────────────────────────┤
│  Profit by Category      │
│  [Pie Chart]             │
│  Fashion: 45%            │
│  Beauty: 30%             │
│  Food: 25%               │
├──────────────────────────┤
│  Top Suppliers           │
│  1. PT Gamis Jaya - 50 PO│
│  2. CV Skincare ID - 30  │
├──────────────────────────┤
│  Sub-Reseller Performance│
│  Ani: Rp 5jt | Budi: 3jt│
└──────────────────────────┘
```

---

## 3. COMPONENT EXTENSIONS

### Category Pill Navigation
```html
<div class="flex gap-2 overflow-x-auto pb-2">
  <button class="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">Semua</button>
  <button class="bg-gray-700 text-gray-300 px-4 py-2 rounded-full text-sm">Fashion</button>
  <button class="bg-gray-700 text-gray-300 px-4 py-2 rounded-full text-sm">Beauty</button>
  <button class="bg-gray-700 text-gray-300 px-4 py-2 rounded-full text-sm">Food</button>
  <button class="bg-gray-700 text-gray-300 px-4 py-2 rounded-full text-sm">Elektronik</button>
</div>
```

### Multi-Store Switcher
```html
<select class="bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2">
  <option>Toko Fashion Mega</option>
  <option>Toko Beauty Mega</option>
  <option>+ Tambah Toko Baru</option>
</select>
```

---

**ResellerKas Design v1.0**
**Document**: docs/resellerkas/DESIGN.md
**Date**: 25 Maret 2026
**Status**: PLANNING ONLY
