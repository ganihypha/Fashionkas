# FASHIONKAS — TODO & EXECUTION TRACKER
## Layer 1: Task Board & Priority Matrix
**Version**: 3.0 | **Date**: 25 Maret 2026 | **Status**: ACTIVE

---

## CURRENT STATUS

| Indicator | Value |
|-----------|-------|
| **App Version** | v2.5 (LIVE) |
| **Total Features** | 85% complete |
| **Bug Status** | All critical bugs fixed |
| **Users** | 0 real active |
| **MRR** | Rp 0 |
| **Next Milestone** | 1 paying user |

---

## ✅ COMPLETED (v2.0 - v2.5)

- [x] Project setup (Hono + Cloudflare Pages)
- [x] Supabase integration (6 tables, RLS)
- [x] Auth (register, login, PIN, JWT)
- [x] Product CRUD + catalog management
- [x] Kasir/POS + cart + payment methods
- [x] Order management + status tracking
- [x] Customer database + auto-create from orders
- [x] Dashboard + revenue charts
- [x] WA Automation (Fonnte) - send receipt, broadcast, custom
- [x] WA Auto-Reply Bot (15+ commands via webhook)
- [x] Public catalog page (/catalog/:slug)
- [x] Reports + CSV export
- [x] Settings page + Fonnte status
- [x] Onboarding flow (4-step guided)
- [x] PWA (manifest, SW v2.5, install banner, offline)
- [x] R2 Image upload (drag-drop + camera)
- [x] Subscription tiers UI
- [x] Landing page (hero, features, pricing, CTA)
- [x] Fix: apiFetch not defined error
- [x] Fix: Syntax error "Unexpected identifier 'w'"
- [x] Fix: Service Worker stale cache
- [x] Deploy to Cloudflare Pages
- [x] Push to GitHub
- [x] Deep Dive Master Document
- [x] Master Clarity Document (3-Layer Architecture)
- [x] FashionKas PRD v3.0
- [x] FashionKas Architecture Doc v3.0
- [x] FashionKas Design Doc v1.0

---

## 🔥 P0 — LAKUKAN MINGGU INI (Urgent & High Impact)

| # | Task | Estimasi | Status | Notes |
|---|------|----------|--------|-------|
| 1 | **Rotate semua secrets** (Supabase key, Fonnte token, JWT secret) | 30 min | ⬜ TODO | Keys visible di wrangler.jsonc — pindah ke CF Secrets |
| 2 | **Buat demo video 60 detik** (screen record app) | 1 hari | ⬜ TODO | Login → Dashboard → Tambah Produk → Order → Laporan |
| 3 | **Tambah 3 testimonial placeholder** ke landing page | 2 jam | ⬜ TODO | Fake-real, ganti dengan real ASAP |
| 4 | **Buat list 20 potential pilot users** | 1 hari | ⬜ TODO | Kenalan yang jualan fashion via WA |
| 5 | **Kirim outreach WA ke 20 kontak** | 1 hari | ⬜ TODO | Script sudah ada di GTM doc |
| 6 | **Payment gateway integration (Duitku)** | 2-3 hari | ⬜ TODO | Revenue enabler #1 |

---

## ⚡ P1 — LAKUKAN BULAN INI (High Impact, Blocking Growth)

| # | Task | Estimasi | Status | Notes |
|---|------|----------|--------|-------|
| 7 | **Onboard 10 pilot users** secara manual | Ongoing | ⬜ TODO | WA call, bantu setup, observe |
| 8 | **WA OTP for PIN reset** | 1 hari | ⬜ TODO | User lupa PIN, self-service recovery |
| 9 | **Per-store Fonnte config** | 2 hari | ⬜ TODO | Setiap toko pakai WA sendiri |
| 10 | **Subscription enforcement** (lock fitur by tier) | 2 hari | ⬜ TODO | Gating fitur Pro/Enterprise |
| 11 | **Landing page sharpening** (add proof section) | 1 hari | ⬜ TODO | After getting real user feedback |
| 12 | **End-to-end test** semua flow dengan user riil | 1 hari | ⬜ TODO | Full path test: register → sell → report |

---

## 🌱 P2 — BULAN 2-3 (Growth Engine)

| # | Task | Estimasi | Status | Notes |
|---|------|----------|--------|-------|
| 13 | **Content pipeline** (TikTok/IG, 3/minggu) | Ongoing | ⬜ TODO | Problem agitation, before/after |
| 14 | **Referral program** (simple code-based) | 2 hari | ⬜ TODO | "Invite 3, gratis 1 bulan" |
| 15 | **Micro-KOL outreach** (5 reseller influencer) | 1 minggu | ⬜ TODO | Free Pro 6 bulan for review |
| 16 | **Fonnte Super plan features** (kirim gambar via WA) | 1 hari | ⬜ TODO | Upgrade Fonnte + integrate |
| 17 | **Multi-admin/staff** workspace | 3 hari | ⬜ TODO | Role-based access per toko |
| 18 | **Smart restock suggestions** | 2 hari | ⬜ TODO | "Gamis Marun tinggal 2 — restock?" |

---

## 🔭 P3 — BULAN 4-6 (Scale & AI)

| # | Task | Estimasi | Status | Notes |
|---|------|----------|--------|-------|
| 19 | **Scout AI Agent** (fully autonomous) | 1 minggu | ⬜ TODO | Lead scoring dari chat history |
| 20 | **Closer AI Agent** (fully autonomous) | 1 minggu | ⬜ TODO | Auto follow-up template generation |
| 21 | **Custom domain** (fashionkas.id) | 1 hari | ⬜ TODO | Brand trust |
| 22 | **IG/TikTok Ads** (paid acquisition) | Bulan 5 | ⬜ TODO | After 10+ testimonials |

---

## 🔴 BLOCKED / DEPENDENCIES

| Task | Blocked By | Resolution |
|------|-----------|------------|
| Payment gateway | Need Duitku account setup | Create business account |
| Real testimonials | No users yet | Get 3 pilot users first |
| Per-store Fonnte | Need Fonnte multi-device plan | Research pricing |
| Content pipeline | No real usage screenshots | Get 1 user actively using first |

---

## 📊 WEEKLY TRACKING

### Week 1 (25-31 Maret 2026)
- [ ] Rotate secrets
- [ ] Demo video
- [ ] 3 testimonial placeholders
- [ ] 20 prospect list
- [ ] 10 outreach sent
- [ ] Duitku account setup

### Week 2 (1-7 April 2026)
- [ ] 5 responses from outreach
- [ ] 2 demo calls scheduled
- [ ] 1 user onboarded
- [ ] Payment gateway prototype

### Week 3 (8-14 April 2026)
- [ ] 3 users actively using
- [ ] First friction list from real usage
- [ ] Fix top 3 friction points
- [ ] 1 testimonial collected

### Week 4 (15-21 April 2026)
- [ ] 5+ active users
- [ ] Payment gateway live
- [ ] Landing page updated with real proof
- [ ] First paying user?

---

## 💡 KEPUTUSAN PENDING

| Keputusan | Opsi | Deadline |
|-----------|------|----------|
| Kapan mulai charge? | Setelah 10 pilot aktif ATAU 30 hari | Akhir April |
| Fonnte vs WA Business API? | Fonnte dulu sampai 1000 users | Evaluasi Juli |
| Subscription pricing final? | Rp 49K vs Rp 99K Basic | After 5 user feedback |
| Custom domain? | fashionkas.id vs fashionkas.co.id | After first revenue |

---

**FashionKas Todo Tracker v3.0**
**Document**: docs/fashionkas/TODO.md
**Date**: 25 Maret 2026
