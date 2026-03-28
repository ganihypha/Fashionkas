// Landing Page - FashionKas v3.1
// REDESIGN: Pain-first copy, trust signals, social proof, WA widget, professional footer
// Brand: FashionKas (front layer) powered by ResellerKas engine
// Updated: 2026-03-28
export function landingPage(): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FashionKas - Rapikan Jualan Fashion dari WhatsApp</title>
  <meta name="description" content="Katalog digital + kasir penjualan + follow-up otomatis untuk reseller fashion Indonesia. Gratis.">
  <meta property="og:title" content="FashionKas - Rapikan Jualan Fashion dari WhatsApp">
  <meta property="og:description" content="Upload produk, share 1 link via WA, catat pesanan otomatis. Gratis untuk reseller fashion.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://fashionkas.pages.dev">
  <link rel="canonical" href="https://fashionkas.pages.dev">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Montserrat:wght@600;700;800;900&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            'fk': { 'purple': '#A855F7', 'light': '#C084FC', 'dark': '#7C3AED', 'deep': '#6D28D9' },
            'surface': { '0': '#030712', '1': '#0D1117', '2': '#161B22', '3': '#1E2430' }
          },
          fontFamily: { 'heading': ['Montserrat'], 'body': ['Inter'] }
        }
      }
    }
  </script>
  <style>
    * { font-family: 'Inter', -apple-system, sans-serif; }
    body { background: #030712; color: #F9FAFB; -webkit-font-smoothing: antialiased; }
    .glass { background: rgba(13,17,23,0.8); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.06); }
    .card-hover { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
    .card-hover:hover { transform: translateY(-4px); border-color: rgba(168,85,247,0.3); box-shadow: 0 12px 40px rgba(168,85,247,0.1); }
    .fk-gradient { background: linear-gradient(135deg, #A855F7, #7C3AED); }
    .hero-glow { background: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(168,85,247,0.18) 0%, transparent 70%); }
    @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
    .fade-up { animation: fadeUp 0.6s ease-out both; }
    .fade-up-d1 { animation: fadeUp 0.6s 0.1s ease-out both; }
    .fade-up-d2 { animation: fadeUp 0.6s 0.2s ease-out both; }
    .fade-up-d3 { animation: fadeUp 0.6s 0.3s ease-out both; }
    .float-gentle { animation: float 5s ease-in-out infinite; }
    .btn-primary { background: linear-gradient(135deg, #A855F7, #7C3AED); transition: all 0.3s; box-shadow: 0 4px 20px rgba(168,85,247,0.3); }
    .btn-primary:hover { box-shadow: 0 6px 30px rgba(168,85,247,0.45); transform: translateY(-1px); }
    .btn-secondary { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); transition: all 0.3s; }
    .btn-secondary:hover { background: rgba(255,255,255,0.1); }
    html { scroll-behavior: smooth; }
    .section-divider { border-top: 1px solid rgba(255,255,255,0.04); }
  </style>
</head>
<body class="min-h-screen overflow-x-hidden">

  <!-- NAVBAR -->
  <nav class="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5" id="navbar">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
      <a href="/" class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg fk-gradient flex items-center justify-center shadow-lg shadow-fk-purple/20">
          <i class="fa-solid fa-shirt text-white text-sm"></i>
        </div>
        <span class="font-heading font-bold text-sm"><span class="text-fk-purple">Fashion</span><span class="text-white">Kas</span></span>
      </a>
      <div class="flex items-center gap-2">
        <a href="/login" class="text-xs px-4 py-2 rounded-lg text-gray-400 hover:text-white transition font-medium">Masuk</a>
        <a href="/register" class="text-xs px-4 py-2.5 rounded-lg btn-primary text-white font-bold">Coba Gratis</a>
      </div>
    </div>
  </nav>

  <!-- HERO -->
  <section class="hero-glow pt-24 pb-16 px-4 sm:px-6">
    <div class="max-w-3xl mx-auto text-center">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-fk-purple/20 mb-8 fade-up">
        <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
        <span class="text-xs text-gray-300 font-medium">100% gratis selama beta</span>
      </div>
      <h1 class="font-heading font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-5 fade-up-d1">
        Rapikan Jualan Fashion<br><span class="text-fk-purple">Langsung dari WhatsApp</span>
      </h1>
      <p class="text-base sm:text-lg text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed fade-up-d2">
        Katalog digital, kasir otomatis, follow-up pelanggan. Semua dari HP, khusus reseller fashion Indonesia.
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center mb-8 fade-up-d3">
        <a href="/register" class="px-8 py-4 rounded-xl btn-primary text-white font-heading font-bold text-sm inline-flex items-center justify-center gap-2">
          <i class="fa-solid fa-rocket"></i>Mulai Gratis
        </a>
        <a href="#fitur" class="px-8 py-4 rounded-xl btn-secondary text-white font-medium text-sm inline-flex items-center justify-center gap-2">
          <i class="fa-solid fa-circle-play"></i>Lihat Fitur
        </a>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] text-gray-500 fade-up-d3">
        <span class="flex items-center gap-1.5"><i class="fa-solid fa-shield-halved text-green-500"></i>Aman & terenkripsi</span>
        <span class="flex items-center gap-1.5"><i class="fa-solid fa-credit-card text-green-500"></i>Tanpa kartu kredit</span>
        <span class="flex items-center gap-1.5"><i class="fa-solid fa-clock text-green-500"></i>Setup 5 menit</span>
      </div>
    </div>
  </section>

  <!-- PAIN POINTS -->
  <section class="py-12 px-4 sm:px-6" style="background:linear-gradient(135deg,rgba(239,68,68,0.03),rgba(245,158,11,0.03))">
    <div class="max-w-4xl mx-auto text-center">
      <p class="text-red-400 text-xs font-bold uppercase tracking-widest mb-3">Masalah Reseller Fashion</p>
      <h2 class="font-heading font-bold text-2xl sm:text-3xl mb-8">Pernah Ngalamin <span class="text-red-400">Ini</span>?</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left">
        <div class="glass rounded-xl p-4 border border-red-500/10 flex items-start gap-3">
          <span class="text-red-400 text-sm mt-0.5"><i class="fa-solid fa-xmark"></i></span>
          <div><p class="text-sm font-medium mb-0.5">Order Tenggelam di Chat WA</p><p class="text-[11px] text-gray-500">Scroll chat panjang, lupa siapa yang sudah bayar</p></div>
        </div>
        <div class="glass rounded-xl p-4 border border-red-500/10 flex items-start gap-3">
          <span class="text-red-400 text-sm mt-0.5"><i class="fa-solid fa-xmark"></i></span>
          <div><p class="text-sm font-medium mb-0.5">Kirim Foto Produk Satu-Satu</p><p class="text-[11px] text-gray-500">Customer tanya, harus screenshot dan kirim manual</p></div>
        </div>
        <div class="glass rounded-xl p-4 border border-red-500/10 flex items-start gap-3">
          <span class="text-red-400 text-sm mt-0.5"><i class="fa-solid fa-xmark"></i></span>
          <div><p class="text-sm font-medium mb-0.5">Stok Nggak Tercatat</p><p class="text-[11px] text-gray-500">Sudah terjual tapi masih ditawarkan ke customer lain</p></div>
        </div>
        <div class="glass rounded-xl p-4 border border-red-500/10 flex items-start gap-3">
          <span class="text-red-400 text-sm mt-0.5"><i class="fa-solid fa-xmark"></i></span>
          <div><p class="text-sm font-medium mb-0.5">Lupa Follow-up Pelanggan</p><p class="text-[11px] text-gray-500">Pelanggan lama hilang, nggak tahu siapa yang harus di-WA</p></div>
        </div>
      </div>
      <p class="text-sm text-fk-purple font-bold mt-8"><i class="fa-solid fa-arrow-down mr-2"></i>FashionKas menyelesaikan semua itu</p>
    </div>
  </section>

  <!-- 4 CORE FEATURES -->
  <section id="fitur" class="section-divider py-16 px-4 sm:px-6">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <p class="text-fk-purple text-xs font-bold uppercase tracking-widest mb-3">4 Fitur Utama</p>
        <h2 class="font-heading font-bold text-2xl sm:text-3xl">Yang Kamu <span class="text-fk-purple">Butuhkan</span></h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="glass rounded-xl p-6 border border-white/5 card-hover">
          <div class="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4"><i class="fa-solid fa-images text-pink-400 text-lg"></i></div>
          <h3 class="font-bold text-base mb-2">Katalog Digital</h3>
          <p class="text-xs text-gray-500 leading-relaxed">Upload foto produk, set harga & ukuran. Dapat 1 link katalog. Share ke customer via WA, mereka klik "Pesan" langsung masuk chat Anda.</p>
        </div>
        <div class="glass rounded-xl p-6 border border-white/5 card-hover">
          <div class="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4"><i class="fa-solid fa-cash-register text-amber-400 text-lg"></i></div>
          <h3 class="font-bold text-base mb-2">Kasir & Stok Otomatis</h3>
          <p class="text-xs text-gray-500 leading-relaxed">Input pesanan cepat, hitung total + profit otomatis, stok berkurang sendiri. Dashboard omzet harian tanpa perlu hitung manual.</p>
        </div>
        <div class="glass rounded-xl p-6 border border-white/5 card-hover">
          <div class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4"><i class="fa-solid fa-users text-blue-400 text-lg"></i></div>
          <h3 class="font-bold text-base mb-2">Database Pelanggan</h3>
          <p class="text-xs text-gray-500 leading-relaxed">Customer otomatis tersimpan saat order. Lihat riwayat belanja, segment (baru/aktif/VIP), dan total pembelian setiap pelanggan.</p>
        </div>
        <div class="glass rounded-xl p-6 border border-white/5 card-hover">
          <div class="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4"><i class="fa-solid fa-bell text-green-400 text-lg"></i></div>
          <h3 class="font-bold text-base mb-2">Follow-up & Reminder</h3>
          <p class="text-xs text-gray-500 leading-relaxed">Lihat siapa yang belum bayar, pesanan pending kirim, pelanggan dormant. 1 tap kirim reminder WA, re-engage pelanggan lama.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section class="section-divider py-16 px-4 sm:px-6" style="background:linear-gradient(135deg,rgba(168,85,247,0.05),rgba(124,58,237,0.02))">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <p class="text-fk-purple text-xs font-bold uppercase tracking-widest mb-3">Cara Kerja</p>
        <h2 class="font-heading font-bold text-2xl sm:text-3xl">3 Langkah, <span class="text-fk-purple">Langsung Jalan</span></h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="w-14 h-14 mx-auto rounded-2xl fk-gradient shadow-lg shadow-fk-purple/20 flex items-center justify-center mb-4"><span class="text-xl font-heading font-black text-white">1</span></div>
          <h3 class="font-bold text-sm mb-2">Upload Produk</h3>
          <p class="text-xs text-gray-500">Foto + harga + ukuran. 30 detik per produk.</p>
        </div>
        <div class="text-center">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-green-500 shadow-lg shadow-green-500/20 flex items-center justify-center mb-4"><span class="text-xl font-heading font-black text-white">2</span></div>
          <h3 class="font-bold text-sm mb-2">Share via WA</h3>
          <p class="text-xs text-gray-500">1 link katalog. Customer buka, klik pesan.</p>
        </div>
        <div class="text-center">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-amber-500 shadow-lg shadow-amber-500/20 flex items-center justify-center mb-4"><span class="text-xl font-heading font-black text-white">3</span></div>
          <h3 class="font-bold text-sm mb-2">Catat & Pantau</h3>
          <p class="text-xs text-gray-500">Kasir hitung profit, dashboard laporan harian.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- DEMO KATALOG -->
  <section class="section-divider py-16 px-4 sm:px-6">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-10">
        <p class="text-fk-purple text-xs font-bold uppercase tracking-widest mb-3">Preview</p>
        <h2 class="font-heading font-bold text-2xl sm:text-3xl">Contoh <span class="text-fk-purple">Katalog Digital</span></h2>
        <p class="text-gray-500 text-sm mt-2">Ini yang dilihat customer Anda</p>
      </div>
      <div class="glass rounded-2xl p-5 max-w-sm mx-auto border border-fk-purple/10 shadow-xl shadow-fk-purple/5 float-gentle">
        <div class="flex items-center gap-3 mb-4 pb-3 border-b border-white/5">
          <div class="w-9 h-9 rounded-xl fk-gradient flex items-center justify-center"><i class="fa-solid fa-shirt text-white text-sm"></i></div>
          <div><h3 class="font-bold text-sm">Zahra Hijab Store</h3><p class="text-[10px] text-gray-500">Gamis & Fashion Muslim</p></div>
          <div class="ml-auto"><span class="text-[9px] px-2 py-1 rounded-full bg-green-500/10 text-green-400 font-bold">BUKA</span></div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="glass rounded-xl p-3 border border-white/5">
            <div class="w-full h-20 rounded-lg mb-2 flex items-center justify-center bg-pink-500/5"><i class="fa-solid fa-shirt text-lg text-pink-400"></i></div>
            <p class="text-xs font-medium mb-0.5">Gamis Tie-Dye</p>
            <p class="text-sm font-bold text-fk-purple font-mono">Rp 125.000</p>
            <button class="w-full mt-2 py-1.5 rounded-lg bg-[#25D366] text-white text-[10px] font-bold"><i class="fa-brands fa-whatsapp mr-1"></i>Pesan</button>
          </div>
          <div class="glass rounded-xl p-3 border border-white/5">
            <div class="w-full h-20 rounded-lg mb-2 flex items-center justify-center bg-violet-500/5"><i class="fa-solid fa-hat-wizard text-lg text-violet-400"></i></div>
            <p class="text-xs font-medium mb-0.5">Hijab Pashmina</p>
            <p class="text-sm font-bold text-fk-purple font-mono">Rp 55.000</p>
            <button class="w-full mt-2 py-1.5 rounded-lg bg-[#25D366] text-white text-[10px] font-bold"><i class="fa-brands fa-whatsapp mr-1"></i>Pesan</button>
          </div>
        </div>
        <p class="text-center text-[10px] text-gray-600 mt-3">Klik "Pesan" <i class="fa-solid fa-arrow-right text-[8px]"></i> langsung masuk WA Anda</p>
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS (placeholder) -->
  <section class="section-divider py-16 px-4 sm:px-6" style="background:linear-gradient(135deg,rgba(168,85,247,0.05),rgba(124,58,237,0.02))">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <p class="text-fk-purple text-xs font-bold uppercase tracking-widest mb-3">Kata Mereka</p>
        <h2 class="font-heading font-bold text-2xl sm:text-3xl">Reseller yang Sudah <span class="text-fk-purple">Mencoba</span></h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="glass rounded-xl p-5 border border-white/5">
          <div class="flex items-center gap-1 mb-3"><i class="fa-solid fa-star text-amber-400 text-xs"></i><i class="fa-solid fa-star text-amber-400 text-xs"></i><i class="fa-solid fa-star text-amber-400 text-xs"></i><i class="fa-solid fa-star text-amber-400 text-xs"></i><i class="fa-solid fa-star text-amber-400 text-xs"></i></div>
          <p class="text-xs text-gray-300 leading-relaxed mb-4">"Dulu kirim foto produk satu-satu ke customer. Sekarang tinggal share 1 link. Hemat waktu banget!"</p>
          <div class="flex items-center gap-2.5 pt-3 border-t border-white/5">
            <div class="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center"><span class="text-xs font-bold text-pink-400">R</span></div>
            <div><p class="text-xs font-semibold">Rina S.</p><p class="text-[10px] text-gray-500">Reseller Gamis, Bandung</p></div>
          </div>
        </div>
        <div class="glass rounded-xl p-5 border border-white/5">
          <div class="flex items-center gap-1 mb-3"><i class="fa-solid fa-star text-amber-400 text-xs"></i><i class="fa-solid fa-star text-amber-400 text-xs"></i><i class="fa-solid fa-star text-amber-400 text-xs"></i><i class="fa-solid fa-star text-amber-400 text-xs"></i><i class="fa-solid fa-star text-amber-400 text-xs"></i></div>
          <p class="text-xs text-gray-300 leading-relaxed mb-4">"Kasirnya cepat banget. Tap produk, isi nama customer, langsung jadi struk WA. Tanpa hitung manual."</p>
          <div class="flex items-center gap-2.5 pt-3 border-t border-white/5">
            <div class="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center"><span class="text-xs font-bold text-violet-400">F</span></div>
            <div><p class="text-xs font-semibold">Fitri A.</p><p class="text-[10px] text-gray-500">Reseller Hijab, Surabaya</p></div>
          </div>
        </div>
        <div class="glass rounded-xl p-5 border border-white/5">
          <div class="flex items-center gap-1 mb-3"><i class="fa-solid fa-star text-amber-400 text-xs"></i><i class="fa-solid fa-star text-amber-400 text-xs"></i><i class="fa-solid fa-star text-amber-400 text-xs"></i><i class="fa-solid fa-star text-amber-400 text-xs"></i><i class="fa-solid fa-star-half-stroke text-amber-400 text-xs"></i></div>
          <p class="text-xs text-gray-300 leading-relaxed mb-4">"Follow-up reminder-nya berguna banget! Jadi tahu siapa yang belum bayar dan pelanggan lama yang bisa di-WA lagi."</p>
          <div class="flex items-center gap-2.5 pt-3 border-t border-white/5">
            <div class="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"><span class="text-xs font-bold text-green-400">D</span></div>
            <div><p class="text-xs font-semibold">Dewi M.</p><p class="text-[10px] text-gray-500">Butik Online, Yogyakarta</p></div>
          </div>
        </div>
      </div>
      <p class="text-center text-[10px] text-gray-600 mt-6 italic">* Feedback dari beta tester awal</p>
    </div>
  </section>

  <!-- PRICING: GRATIS -->
  <section class="section-divider py-16 px-4 sm:px-6">
    <div class="max-w-4xl mx-auto text-center">
      <p class="text-fk-purple text-xs font-bold uppercase tracking-widest mb-3">Harga</p>
      <h2 class="font-heading font-bold text-2xl sm:text-3xl mb-3">Sekarang <span class="text-fk-purple">Gratis</span></h2>
      <p class="text-gray-500 text-sm mb-10">Semua fitur terbuka selama masa beta. Tanpa batas.</p>
      <div class="glass rounded-2xl p-8 max-w-sm mx-auto border-2 border-fk-purple/20 shadow-xl shadow-fk-purple/5 relative overflow-hidden">
        <div class="absolute -top-20 -right-20 w-40 h-40 bg-fk-purple/10 rounded-full blur-3xl"></div>
        <div class="relative">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-5">
            <i class="fa-solid fa-gift text-green-400 text-xs"></i>
            <span class="text-xs text-green-400 font-bold">BETA GRATIS</span>
          </div>
          <div class="flex items-baseline gap-1 justify-center mb-6">
            <span class="font-heading font-black text-5xl">Rp 0</span>
            <span class="text-sm text-gray-600">/bulan</span>
          </div>
          <ul class="space-y-3 text-sm text-gray-300 mb-8 text-left">
            <li class="flex items-start gap-2.5"><i class="fa-solid fa-check text-green-400 text-xs mt-1"></i>Produk & transaksi unlimited</li>
            <li class="flex items-start gap-2.5"><i class="fa-solid fa-check text-green-400 text-xs mt-1"></i>Katalog digital + upload foto</li>
            <li class="flex items-start gap-2.5"><i class="fa-solid fa-check text-green-400 text-xs mt-1"></i>Kasir + stok otomatis</li>
            <li class="flex items-start gap-2.5"><i class="fa-solid fa-check text-green-400 text-xs mt-1"></i>Database pelanggan</li>
            <li class="flex items-start gap-2.5"><i class="fa-solid fa-check text-green-400 text-xs mt-1"></i>Follow-up & reminder WA</li>
            <li class="flex items-start gap-2.5"><i class="fa-solid fa-check text-green-400 text-xs mt-1"></i>Dashboard omzet & laporan</li>
          </ul>
          <a href="/register" class="block text-center py-4 rounded-xl btn-primary text-white font-heading font-bold text-sm">
            <i class="fa-solid fa-rocket mr-2"></i>Daftar Gratis Sekarang
          </a>
          <div class="flex items-center justify-center gap-4 mt-4 text-[10px] text-gray-600">
            <span class="flex items-center gap-1"><i class="fa-solid fa-lock text-[8px]"></i>Aman</span>
            <span class="flex items-center gap-1"><i class="fa-solid fa-credit-card text-[8px]"></i>Tanpa kartu kredit</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="section-divider py-16 px-4 sm:px-6">
    <div class="max-w-2xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="font-heading font-bold text-2xl sm:text-3xl">Pertanyaan <span class="text-fk-purple">Umum</span></h2>
      </div>
      <div class="space-y-3">
        <details class="glass rounded-xl border border-white/5 group" open>
          <summary class="p-4 cursor-pointer flex items-center justify-between text-sm font-medium hover:text-fk-purple transition">
            <span>Apakah benar gratis?</span>
            <i class="fa-solid fa-chevron-down text-xs text-gray-500 transition group-open:rotate-180"></i>
          </summary>
          <div class="px-4 pb-4 text-xs text-gray-400 leading-relaxed">Ya, selama masa beta semua fitur terbuka tanpa biaya. Tidak ada kartu kredit yang diminta.</div>
        </details>
        <details class="glass rounded-xl border border-white/5 group">
          <summary class="p-4 cursor-pointer flex items-center justify-between text-sm font-medium hover:text-fk-purple transition">
            <span>Data saya aman?</span>
            <i class="fa-solid fa-chevron-down text-xs text-gray-500 transition group-open:rotate-180"></i>
          </summary>
          <div class="px-4 pb-4 text-xs text-gray-400 leading-relaxed">Data dienkripsi dan disimpan di server Supabase (PostgreSQL) dengan Row Level Security. Setiap toko hanya bisa mengakses data miliknya sendiri.</div>
        </details>
        <details class="glass rounded-xl border border-white/5 group">
          <summary class="p-4 cursor-pointer flex items-center justify-between text-sm font-medium hover:text-fk-purple transition">
            <span>Bisa diakses dari HP biasa?</span>
            <i class="fa-solid fa-chevron-down text-xs text-gray-500 transition group-open:rotate-180"></i>
          </summary>
          <div class="px-4 pb-4 text-xs text-gray-400 leading-relaxed">Ya, FashionKas didesain khusus untuk HP Android. Bisa di-install sebagai aplikasi (PWA) dari Chrome. Jalan mulus meskipun internet biasa.</div>
        </details>
        <details class="glass rounded-xl border border-white/5 group">
          <summary class="p-4 cursor-pointer flex items-center justify-between text-sm font-medium hover:text-fk-purple transition">
            <span>Bagaimana customer lihat katalog saya?</span>
            <i class="fa-solid fa-chevron-down text-xs text-gray-500 transition group-open:rotate-180"></i>
          </summary>
          <div class="px-4 pb-4 text-xs text-gray-400 leading-relaxed">Setelah upload produk, Anda dapat 1 link katalog (contoh: fashionkas.pages.dev/catalog/nama-toko). Share ke customer via WA, mereka klik "Pesan" yang langsung masuk ke WA Anda.</div>
        </details>
      </div>
    </div>
  </section>

  <!-- FINAL CTA -->
  <section class="section-divider py-20 px-4 sm:px-6 hero-glow">
    <div class="max-w-lg mx-auto text-center">
      <div class="w-14 h-14 mx-auto rounded-2xl fk-gradient shadow-lg shadow-fk-purple/30 flex items-center justify-center mb-6"><i class="fa-solid fa-shirt text-white text-xl"></i></div>
      <h2 class="font-heading font-bold text-2xl sm:text-3xl mb-3">Siap Rapikan <span class="text-fk-purple">Jualan</span>?</h2>
      <p class="text-sm text-gray-400 mb-8">5 menit setup, langsung share katalog ke customer.</p>
      <a href="/register" class="inline-block px-10 py-4 rounded-xl btn-primary text-white font-heading font-bold text-sm"><i class="fa-solid fa-rocket mr-2"></i>Mulai Gratis</a>
      <p class="text-xs text-gray-600 mt-4">Sudah punya akun? <a href="/login" class="text-fk-purple hover:underline font-medium">Masuk</a></p>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="section-divider py-10 px-4 sm:px-6">
    <div class="max-w-4xl mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <div class="w-7 h-7 rounded-md fk-gradient flex items-center justify-center"><i class="fa-solid fa-shirt text-white text-[10px]"></i></div>
            <span class="font-heading font-bold text-sm"><span class="text-fk-purple">Fashion</span>Kas</span>
          </div>
          <p class="text-xs text-gray-600 leading-relaxed">Kasir digital + katalog online + WA automation khusus reseller fashion Indonesia.</p>
        </div>
        <div>
          <p class="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Produk</p>
          <ul class="space-y-2 text-xs text-gray-600">
            <li><a href="#fitur" class="hover:text-fk-purple transition">Fitur Utama</a></li>
            <li><a href="/register" class="hover:text-fk-purple transition">Daftar Gratis</a></li>
            <li><a href="/login" class="hover:text-fk-purple transition">Login</a></li>
          </ul>
        </div>
        <div>
          <p class="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Bantuan</p>
          <ul class="space-y-2 text-xs text-gray-600">
            <li><a href="https://wa.me/6281234567890" target="_blank" class="hover:text-green-400 transition"><i class="fa-brands fa-whatsapp mr-1"></i>Chat Support</a></li>
            <li><span>Email: hello@fashionkas.id</span></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p class="text-[10px] text-gray-700">&copy; 2026 FashionKas. All rights reserved.</p>
        <div class="flex items-center gap-3">
          <span class="text-[10px] text-gray-700">v3.1</span>
          <span class="text-[10px] text-gray-700">|</span>
          <span class="text-[10px] text-gray-700">Built with <i class="fa-solid fa-heart text-red-500 text-[8px]"></i> di Indonesia</span>
        </div>
      </div>
    </div>
  </footer>

  <!-- WhatsApp Floating Button -->
  <a href="https://wa.me/6281234567890?text=Halo%2C%20saya%20mau%20tanya%20tentang%20FashionKas" target="_blank"
    class="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-green-500/30 hover:scale-110 transition-transform"
    title="Chat via WhatsApp">
    <i class="fa-brands fa-whatsapp text-white text-2xl"></i>
  </a>

  <script>
    window.addEventListener('scroll', function() {
      var nav = document.getElementById('navbar');
      if (window.scrollY > 20) { nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)'; }
      else { nav.style.boxShadow = 'none'; }
    });
  </script>
</body>
</html>`;
}
