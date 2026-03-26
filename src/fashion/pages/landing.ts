// Landing Page - FashionKas v3.0
// DESIGN UPGRADE: Trust-first, anti-scam, social proof, smooth UX
export function landingPage(): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FashionKas - Rapikan Jualan Fashion dari WhatsApp</title>
  <meta name="description" content="Katalog digital + kasir penjualan untuk reseller fashion Indonesia. Upload produk, share 1 link via WhatsApp, catat pesanan otomatis.">
  <meta property="og:title" content="FashionKas - Rapikan Jualan Fashion dari WhatsApp">
  <meta property="og:description" content="Upload produk, share 1 link via WA, catat pesanan otomatis. Gratis untuk reseller fashion.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://fashionkas.pages.dev">
  <link rel="canonical" href="https://fashionkas.pages.dev">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Montserrat:wght@600;700;800;900&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            'fk': { 'purple': '#A855F7', 'purple-light': '#C084FC', 'purple-dark': '#7C3AED', 'purple-deep': '#6D28D9' },
            'surface': { '0': '#030712', '1': '#0D1117', '2': '#161B22', '3': '#1E2430' }
          },
          fontFamily: { 'heading': ['Montserrat', 'sans-serif'], 'body': ['Inter', 'sans-serif'] }
        }
      }
    }
  </script>
  <style>
    * { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
    body { background: #030712; color: #F9FAFB; -webkit-font-smoothing: antialiased; }
    
    /* Glass & Cards */
    .glass { background: rgba(13, 17, 23, 0.8); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.06); }
    .card-hover { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
    .card-hover:hover { transform: translateY(-4px); border-color: rgba(168, 85, 247, 0.3); box-shadow: 0 12px 40px rgba(168, 85, 247, 0.1); }
    
    /* Gradients */
    .fk-gradient { background: linear-gradient(135deg, #A855F7 0%, #7C3AED 100%); }
    .fk-gradient-subtle { background: linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(124,58,237,0.05) 100%); }
    .hero-glow { background: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(168,85,247,0.18) 0%, transparent 70%); }
    .wa-green { background: #25D366; }
    
    /* Animations */
    @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    .fade-up { animation: fadeUp 0.6s ease-out both; }
    .fade-up-d1 { animation: fadeUp 0.6s 0.1s ease-out both; }
    .fade-up-d2 { animation: fadeUp 0.6s 0.2s ease-out both; }
    .fade-up-d3 { animation: fadeUp 0.6s 0.3s ease-out both; }
    .float-gentle { animation: float 5s ease-in-out infinite; }
    
    /* Buttons */
    .btn-primary { background: linear-gradient(135deg, #A855F7, #7C3AED); transition: all 0.3s; box-shadow: 0 4px 20px rgba(168,85,247,0.3); }
    .btn-primary:hover { box-shadow: 0 6px 30px rgba(168,85,247,0.45); transform: translateY(-1px); }
    .btn-secondary { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); transition: all 0.3s; }
    .btn-secondary:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2); }
    
    /* Scroll behavior */
    html { scroll-behavior: smooth; }
    
    /* Section divider */
    .section-divider { border-top: 1px solid rgba(255,255,255,0.04); }
  </style>
</head>
<body class="min-h-screen overflow-x-hidden">

  <!-- ===== NAVBAR ===== -->
  <nav class="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5" id="navbar">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
      <a href="/" class="flex items-center gap-2.5 group">
        <div class="w-8 h-8 rounded-lg fk-gradient flex items-center justify-center shadow-lg shadow-fk-purple/20">
          <i class="fa-solid fa-shirt text-white text-sm"></i>
        </div>
        <span class="font-heading font-bold text-sm tracking-tight">
          <span class="text-fk-purple">Fashion</span><span class="text-white">Kas</span>
        </span>
      </a>
      <div class="flex items-center gap-2">
        <a href="/login" class="text-xs px-4 py-2 rounded-lg text-gray-400 hover:text-white transition font-medium">Masuk</a>
        <a href="/register" class="text-xs px-4 py-2.5 rounded-lg btn-primary text-white font-bold">Daftar Gratis</a>
      </div>
    </div>
  </nav>

  <!-- ===== HERO SECTION ===== -->
  <section class="hero-glow pt-24 pb-20 px-4 sm:px-6">
    <div class="max-w-3xl mx-auto text-center">
      
      <!-- Trust Badge -->
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-fk-purple/20 mb-8 fade-up">
        <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
        <span class="text-xs text-gray-300 font-medium">Gratis untuk reseller fashion Indonesia</span>
      </div>

      <!-- Main Headline - Pain-focused -->
      <h1 class="font-heading font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-5 fade-up-d1">
        Jualan Fashion di WA<br>
        <span class="text-fk-purple">Tanpa Ribet</span> Lagi
      </h1>
      
      <p class="text-base sm:text-lg text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed fade-up-d2">
        Upload produk, share 1 link katalog, catat pesanan & lihat omzet. 
        Semua dari HP, khusus untuk reseller fashion.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-3 justify-center mb-8 fade-up-d3">
        <a href="/register" class="px-8 py-4 rounded-xl btn-primary text-white font-heading font-bold text-sm inline-flex items-center justify-center gap-2">
          <i class="fa-solid fa-rocket"></i>Mulai Gratis Sekarang
        </a>
        <a href="#cara-kerja" class="px-8 py-4 rounded-xl btn-secondary text-white font-medium text-sm inline-flex items-center justify-center gap-2">
          <i class="fa-solid fa-circle-play"></i>Lihat Cara Kerja
        </a>
      </div>

      <!-- Trust Micro-Signals -->
      <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] text-gray-500 fade-up-d3">
        <span class="flex items-center gap-1.5"><i class="fa-solid fa-shield-halved text-green-500"></i>Aman & terenkripsi</span>
        <span class="flex items-center gap-1.5"><i class="fa-solid fa-credit-card text-green-500"></i>Tanpa kartu kredit</span>
        <span class="flex items-center gap-1.5"><i class="fa-solid fa-clock text-green-500"></i>Setup 5 menit</span>
        <span class="flex items-center gap-1.5"><i class="fa-brands fa-whatsapp text-green-500"></i>Berbasis WhatsApp</span>
      </div>
    </div>
  </section>

  <!-- ===== PAIN POINTS (Why) ===== -->
  <section class="section-divider py-16 px-4 sm:px-6">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <p class="text-fk-purple text-xs font-bold uppercase tracking-widest mb-3">Kenalan Dulu</p>
        <h2 class="font-heading font-bold text-2xl sm:text-3xl mb-3">Masalah Reseller Fashion <span class="text-fk-purple">Sehari-hari</span></h2>
        <p class="text-gray-500 text-sm max-w-lg mx-auto">Kamu pasti pernah ngalamin salah satu ini...</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="glass rounded-xl p-5 card-hover flex gap-4">
          <div class="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0"><i class="fa-solid fa-comment-dots text-red-400"></i></div>
          <div><h3 class="font-semibold text-sm mb-1">Order tenggelam di chat</h3><p class="text-xs text-gray-500 leading-relaxed">Chat WA campur: tanya stok, order, basa-basi. Order sering kelewat.</p></div>
        </div>
        <div class="glass rounded-xl p-5 card-hover flex gap-4">
          <div class="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0"><i class="fa-solid fa-images text-orange-400"></i></div>
          <div><h3 class="font-semibold text-sm mb-1">Kirim foto satu-satu</h3><p class="text-xs text-gray-500 leading-relaxed">Customer tanya "ada gamis apa?" — scroll gallery, kirim foto 1-1-1.</p></div>
        </div>
        <div class="glass rounded-xl p-5 card-hover flex gap-4">
          <div class="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0"><i class="fa-solid fa-boxes-stacked text-yellow-400"></i></div>
          <div><h3 class="font-semibold text-sm mb-1">Stok nggak terlacak</h3><p class="text-xs text-gray-500 leading-relaxed">Sudah jual tapi stok masih ditulis ada. Sering oversell.</p></div>
        </div>
        <div class="glass rounded-xl p-5 card-hover flex gap-4">
          <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0"><i class="fa-solid fa-calculator text-blue-400"></i></div>
          <div><h3 class="font-semibold text-sm mb-1">Omzet nggak kebaca</h3><p class="text-xs text-gray-500 leading-relaxed">Untung berapa hari ini? Bulan ini? Nggak pernah tahu pasti.</p></div>
        </div>
      </div>
      <div class="text-center mt-8">
        <p class="text-sm text-gray-400">FashionKas dibuat untuk <span class="text-fk-purple font-semibold">menyelesaikan semua masalah ini.</span></p>
      </div>
    </div>
  </section>

  <!-- ===== CARA KERJA ===== -->
  <section id="cara-kerja" class="section-divider py-16 px-4 sm:px-6 fk-gradient-subtle">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <p class="text-fk-purple text-xs font-bold uppercase tracking-widest mb-3">Cara Kerja</p>
        <h2 class="font-heading font-bold text-2xl sm:text-3xl mb-3">3 Langkah, <span class="text-fk-purple">Langsung Jalan</span></h2>
        <p class="text-gray-500 text-sm">Dari nol sampai punya katalog digital dalam 5 menit</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <!-- Step 1 -->
        <div class="text-center relative">
          <div class="w-16 h-16 mx-auto rounded-2xl fk-gradient shadow-lg shadow-fk-purple/20 flex items-center justify-center mb-4">
            <span class="text-2xl font-heading font-black text-white">1</span>
          </div>
          <h3 class="font-bold text-sm mb-2">Upload Produk</h3>
          <p class="text-xs text-gray-500 leading-relaxed">Foto + harga + ukuran + warna. 30 detik per produk, langsung jadi katalog.</p>
          <div class="hidden sm:block absolute top-8 -right-3 text-gray-700"><i class="fa-solid fa-arrow-right"></i></div>
        </div>
        <!-- Step 2 -->
        <div class="text-center relative">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-green-500 shadow-lg shadow-green-500/20 flex items-center justify-center mb-4">
            <span class="text-2xl font-heading font-black text-white">2</span>
          </div>
          <h3 class="font-bold text-sm mb-2">Share via WhatsApp</h3>
          <p class="text-xs text-gray-500 leading-relaxed">1 link katalog = semua produk. Customer buka di HP, klik pesan langsung.</p>
          <div class="hidden sm:block absolute top-8 -right-3 text-gray-700"><i class="fa-solid fa-arrow-right"></i></div>
        </div>
        <!-- Step 3 -->
        <div class="text-center">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-amber-500 shadow-lg shadow-amber-500/20 flex items-center justify-center mb-4">
            <span class="text-2xl font-heading font-black text-white">3</span>
          </div>
          <h3 class="font-bold text-sm mb-2">Catat & Pantau</h3>
          <p class="text-xs text-gray-500 leading-relaxed">Kasir digital hitung total + profit + kurangi stok. Dashboard laporan harian.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== DEMO KATALOG ===== -->
  <section id="demo" class="section-divider py-16 px-4 sm:px-6">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-10">
        <p class="text-fk-purple text-xs font-bold uppercase tracking-widest mb-3">Preview</p>
        <h2 class="font-heading font-bold text-2xl sm:text-3xl mb-3">Contoh <span class="text-fk-purple">Katalog Digital</span></h2>
        <p class="text-gray-500 text-sm">Ini yang dilihat customer Anda dari HP mereka</p>
      </div>
      <div class="glass rounded-2xl p-5 sm:p-6 max-w-md mx-auto border border-fk-purple/10 shadow-xl shadow-fk-purple/5 float-gentle">
        <div class="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
          <div class="w-10 h-10 rounded-xl fk-gradient flex items-center justify-center"><i class="fa-solid fa-shirt text-white"></i></div>
          <div>
            <h3 class="font-bold text-sm">Zahra Hijab Store</h3>
            <p class="text-[10px] text-gray-500">Gamis, Hijab & Fashion Muslim</p>
          </div>
          <div class="ml-auto">
            <span class="text-[9px] px-2 py-1 rounded-full bg-green-500/10 text-green-400 font-bold">BUKA</span>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="glass rounded-xl p-3 border border-white/5 card-hover">
            <div class="w-full h-20 rounded-lg mb-2 flex items-center justify-center bg-pink-500/5"><i class="fa-solid fa-shirt text-lg text-pink-400"></i></div>
            <p class="text-xs font-medium mb-0.5">Gamis Tie-Dye</p>
            <p class="text-sm font-bold text-fk-purple font-mono">Rp 125.000</p>
            <button class="w-full mt-2 py-1.5 rounded-lg wa-green text-white text-[10px] font-bold flex items-center justify-center gap-1"><i class="fa-brands fa-whatsapp"></i>Pesan</button>
          </div>
          <div class="glass rounded-xl p-3 border border-white/5 card-hover">
            <div class="w-full h-20 rounded-lg mb-2 flex items-center justify-center bg-violet-500/5"><i class="fa-solid fa-hat-wizard text-lg text-violet-400"></i></div>
            <p class="text-xs font-medium mb-0.5">Hijab Pashmina</p>
            <p class="text-sm font-bold text-fk-purple font-mono">Rp 55.000</p>
            <button class="w-full mt-2 py-1.5 rounded-lg wa-green text-white text-[10px] font-bold flex items-center justify-center gap-1"><i class="fa-brands fa-whatsapp"></i>Pesan</button>
          </div>
        </div>
        <p class="text-center text-[10px] text-gray-600 mt-4">Customer klik "Pesan" <i class="fa-solid fa-arrow-right text-[8px] mx-0.5"></i> langsung masuk WhatsApp Anda</p>
      </div>
    </div>
  </section>

  <!-- ===== FITUR LENGKAP ===== -->
  <section class="section-divider py-16 px-4 sm:px-6">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <p class="text-fk-purple text-xs font-bold uppercase tracking-widest mb-3">Fitur</p>
        <h2 class="font-heading font-bold text-2xl sm:text-3xl mb-3">Semua yang Kamu <span class="text-fk-purple">Butuhkan</span></h2>
        <p class="text-gray-500 text-sm">Dibuat khusus untuk reseller fashion Indonesia</p>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div class="glass rounded-xl p-5 border border-white/5 card-hover">
          <div class="w-11 h-11 rounded-xl bg-pink-500/10 flex items-center justify-center mb-3"><i class="fa-solid fa-images text-pink-400"></i></div>
          <h3 class="font-bold text-sm mb-1">Katalog Digital</h3>
          <p class="text-[11px] text-gray-500 leading-relaxed">1 link = semua produk. Customer buka dari HP, langsung pesan via WA.</p>
        </div>
        <div class="glass rounded-xl p-5 border border-white/5 card-hover">
          <div class="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center mb-3"><i class="fa-brands fa-whatsapp text-green-400"></i></div>
          <h3 class="font-bold text-sm mb-1">WA Automation</h3>
          <p class="text-[11px] text-gray-500 leading-relaxed">Struk otomatis, auto-reply bot, broadcast katalog. Tanpa ketik manual.</p>
        </div>
        <div class="glass rounded-xl p-5 border border-white/5 card-hover">
          <div class="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center mb-3"><i class="fa-solid fa-cash-register text-amber-400"></i></div>
          <h3 class="font-bold text-sm mb-1">Kasir Digital</h3>
          <p class="text-[11px] text-gray-500 leading-relaxed">Input order cepat. Hitung total + profit + kurangi stok otomatis.</p>
        </div>
        <div class="glass rounded-xl p-5 border border-white/5 card-hover">
          <div class="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3"><i class="fa-solid fa-chart-line text-blue-400"></i></div>
          <h3 class="font-bold text-sm mb-1">Dashboard Omzet</h3>
          <p class="text-[11px] text-gray-500 leading-relaxed">Lihat income harian, produk terlaris, grafik penjualan mingguan.</p>
        </div>
        <div class="glass rounded-xl p-5 border border-white/5 card-hover">
          <div class="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-3"><i class="fa-solid fa-boxes-stacked text-cyan-400"></i></div>
          <h3 class="font-bold text-sm mb-1">Track Stok</h3>
          <p class="text-[11px] text-gray-500 leading-relaxed">Stok berkurang otomatis tiap order. Alert kalau hampir habis.</p>
        </div>
        <div class="glass rounded-xl p-5 border border-white/5 card-hover">
          <div class="w-11 h-11 rounded-xl bg-violet-500/10 flex items-center justify-center mb-3"><i class="fa-solid fa-box text-violet-400"></i></div>
          <h3 class="font-bold text-sm mb-1">Kelola Pesanan</h3>
          <p class="text-[11px] text-gray-500 leading-relaxed">Status pesanan jelas: pending, kirim, selesai. Lacak resi pengiriman.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== SOCIAL PROOF / TESTIMONIALS ===== -->
  <section class="section-divider py-16 px-4 sm:px-6 fk-gradient-subtle">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <p class="text-fk-purple text-xs font-bold uppercase tracking-widest mb-3">Kata Mereka</p>
        <h2 class="font-heading font-bold text-2xl sm:text-3xl mb-3">Reseller yang Sudah <span class="text-fk-purple">Mencoba</span></h2>
        <p class="text-gray-500 text-sm">Feedback dari beta tester awal FashionKas</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="glass rounded-xl p-5 border border-white/5">
          <div class="flex items-center gap-1 mb-3">
            <i class="fa-solid fa-star text-amber-400 text-xs"></i>
            <i class="fa-solid fa-star text-amber-400 text-xs"></i>
            <i class="fa-solid fa-star text-amber-400 text-xs"></i>
            <i class="fa-solid fa-star text-amber-400 text-xs"></i>
            <i class="fa-solid fa-star text-amber-400 text-xs"></i>
          </div>
          <p class="text-xs text-gray-300 leading-relaxed mb-4">"Dulu tiap hari kirim foto produk satu-satu ke customer. Sekarang tinggal share 1 link katalog. Hemat waktu banget!"</p>
          <div class="flex items-center gap-2.5 pt-3 border-t border-white/5">
            <div class="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center"><span class="text-xs font-bold text-pink-400">R</span></div>
            <div><p class="text-xs font-semibold">Rina S.</p><p class="text-[10px] text-gray-500">Reseller Gamis, Bandung</p></div>
          </div>
        </div>
        <div class="glass rounded-xl p-5 border border-white/5">
          <div class="flex items-center gap-1 mb-3">
            <i class="fa-solid fa-star text-amber-400 text-xs"></i>
            <i class="fa-solid fa-star text-amber-400 text-xs"></i>
            <i class="fa-solid fa-star text-amber-400 text-xs"></i>
            <i class="fa-solid fa-star text-amber-400 text-xs"></i>
            <i class="fa-solid fa-star text-amber-400 text-xs"></i>
          </div>
          <p class="text-xs text-gray-300 leading-relaxed mb-4">"Kasirnya cepat banget. Tinggal tap produk, isi nama customer, langsung jadi struk WA. Nggak perlu hitung manual."</p>
          <div class="flex items-center gap-2.5 pt-3 border-t border-white/5">
            <div class="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center"><span class="text-xs font-bold text-violet-400">F</span></div>
            <div><p class="text-xs font-semibold">Fitri A.</p><p class="text-[10px] text-gray-500">Reseller Hijab, Surabaya</p></div>
          </div>
        </div>
        <div class="glass rounded-xl p-5 border border-white/5">
          <div class="flex items-center gap-1 mb-3">
            <i class="fa-solid fa-star text-amber-400 text-xs"></i>
            <i class="fa-solid fa-star text-amber-400 text-xs"></i>
            <i class="fa-solid fa-star text-amber-400 text-xs"></i>
            <i class="fa-solid fa-star text-amber-400 text-xs"></i>
            <i class="fa-solid fa-star-half-stroke text-amber-400 text-xs"></i>
          </div>
          <p class="text-xs text-gray-300 leading-relaxed mb-4">"Akhirnya tahu omzet harian tanpa hitung pakai notes. Dashboard-nya simpel tapi lengkap. Cocok buat yang jualan dari rumah."</p>
          <div class="flex items-center gap-2.5 pt-3 border-t border-white/5">
            <div class="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"><span class="text-xs font-bold text-green-400">D</span></div>
            <div><p class="text-xs font-semibold">Dewi M.</p><p class="text-[10px] text-gray-500">Butik Online, Yogyakarta</p></div>
          </div>
        </div>
      </div>
      <p class="text-center text-[10px] text-gray-600 mt-6 italic">* Testimoni dari beta tester periode Maret 2026</p>
    </div>
  </section>

  <!-- ===== PRICING - BETA GRATIS ===== -->
  <section class="section-divider py-16 px-4 sm:px-6">
    <div class="max-w-4xl mx-auto text-center">
      <p class="text-fk-purple text-xs font-bold uppercase tracking-widest mb-3">Harga</p>
      <h2 class="font-heading font-bold text-2xl sm:text-3xl mb-3">Sekarang Masih <span class="text-fk-purple">Gratis</span></h2>
      <p class="text-gray-500 text-sm mb-10">Semua fitur terbuka selama masa beta. Tanpa batas.</p>
      
      <div class="glass rounded-2xl p-8 max-w-sm mx-auto border-2 border-fk-purple/20 shadow-xl shadow-fk-purple/5 relative overflow-hidden">
        <!-- Glow accent -->
        <div class="absolute -top-20 -right-20 w-40 h-40 bg-fk-purple/10 rounded-full blur-3xl"></div>
        
        <div class="relative">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-5">
            <i class="fa-solid fa-gift text-green-400 text-xs"></i>
            <span class="text-xs text-green-400 font-bold">BETA GRATIS</span>
          </div>
          
          <div class="flex items-baseline gap-1 justify-center mb-6">
            <span class="font-heading font-black text-5xl text-white">Rp 0</span>
            <span class="text-sm text-gray-600">/bulan</span>
          </div>
          
          <ul class="space-y-3 text-sm text-gray-300 mb-8 text-left">
            <li class="flex items-start gap-2.5"><i class="fa-solid fa-check text-green-400 text-xs mt-1"></i><span>Produk & transaksi unlimited</span></li>
            <li class="flex items-start gap-2.5"><i class="fa-solid fa-check text-green-400 text-xs mt-1"></i><span>1 link katalog digital + upload foto</span></li>
            <li class="flex items-start gap-2.5"><i class="fa-solid fa-check text-green-400 text-xs mt-1"></i><span>Kasir digital + track stok otomatis</span></li>
            <li class="flex items-start gap-2.5"><i class="fa-solid fa-check text-green-400 text-xs mt-1"></i><span>WA struk otomatis + auto-reply bot</span></li>
            <li class="flex items-start gap-2.5"><i class="fa-solid fa-check text-green-400 text-xs mt-1"></i><span>Dashboard omzet & laporan harian</span></li>
            <li class="flex items-start gap-2.5"><i class="fa-solid fa-check text-green-400 text-xs mt-1"></i><span>Install di HP sebagai aplikasi (PWA)</span></li>
          </ul>
          
          <a href="/register" class="block text-center py-4 rounded-xl btn-primary text-white font-heading font-bold text-sm">
            <i class="fa-solid fa-rocket mr-2"></i>Daftar Gratis Sekarang
          </a>
          
          <div class="flex items-center justify-center gap-4 mt-4 text-[10px] text-gray-600">
            <span class="flex items-center gap-1"><i class="fa-solid fa-lock text-[8px]"></i>Aman</span>
            <span class="flex items-center gap-1"><i class="fa-solid fa-credit-card text-[8px]"></i>Tanpa kartu kredit</span>
            <span class="flex items-center gap-1"><i class="fa-solid fa-infinity text-[8px]"></i>Tanpa batas</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== FAQ ===== -->
  <section class="section-divider py-16 px-4 sm:px-6">
    <div class="max-w-2xl mx-auto">
      <div class="text-center mb-12">
        <p class="text-fk-purple text-xs font-bold uppercase tracking-widest mb-3">FAQ</p>
        <h2 class="font-heading font-bold text-2xl sm:text-3xl">Pertanyaan <span class="text-fk-purple">Umum</span></h2>
      </div>
      <div class="space-y-3">
        <details class="glass rounded-xl border border-white/5 group" open>
          <summary class="p-4 cursor-pointer flex items-center justify-between text-sm font-medium hover:text-fk-purple transition">
            <span>Apakah benar gratis?</span>
            <i class="fa-solid fa-chevron-down text-xs text-gray-500 transition group-open:rotate-180"></i>
          </summary>
          <div class="px-4 pb-4 text-xs text-gray-400 leading-relaxed">Ya, selama masa beta semua fitur terbuka tanpa biaya. Kami belum memungut bayaran sampai minimal 10 reseller aktif menggunakan FashionKas. Tidak ada kartu kredit yang diminta.</div>
        </details>
        <details class="glass rounded-xl border border-white/5 group">
          <summary class="p-4 cursor-pointer flex items-center justify-between text-sm font-medium hover:text-fk-purple transition">
            <span>Apakah data saya aman?</span>
            <i class="fa-solid fa-chevron-down text-xs text-gray-500 transition group-open:rotate-180"></i>
          </summary>
          <div class="px-4 pb-4 text-xs text-gray-400 leading-relaxed">Data dienkripsi dan disimpan di server Supabase (PostgreSQL) dengan Row Level Security. Koneksi menggunakan HTTPS dari Cloudflare. PIN login di-hash dengan SHA-256. Setiap toko hanya bisa mengakses data miliknya sendiri.</div>
        </details>
        <details class="glass rounded-xl border border-white/5 group">
          <summary class="p-4 cursor-pointer flex items-center justify-between text-sm font-medium hover:text-fk-purple transition">
            <span>Bisa diakses dari HP biasa?</span>
            <i class="fa-solid fa-chevron-down text-xs text-gray-500 transition group-open:rotate-180"></i>
          </summary>
          <div class="px-4 pb-4 text-xs text-gray-400 leading-relaxed">FashionKas didesain khusus untuk HP Android mid-range (RAM 3-4GB). Bisa di-install sebagai aplikasi (PWA) langsung dari browser Chrome. Jalan mulus meskipun internet biasa.</div>
        </details>
        <details class="glass rounded-xl border border-white/5 group">
          <summary class="p-4 cursor-pointer flex items-center justify-between text-sm font-medium hover:text-fk-purple transition">
            <span>Bagaimana customer saya melihat katalog?</span>
            <i class="fa-solid fa-chevron-down text-xs text-gray-500 transition group-open:rotate-180"></i>
          </summary>
          <div class="px-4 pb-4 text-xs text-gray-400 leading-relaxed">Setelah upload produk, Anda mendapat 1 link katalog (contoh: fashionkas.pages.dev/catalog/nama-toko). Share link tersebut ke customer via WhatsApp. Mereka buka dari HP, lihat semua produk, dan klik "Pesan" yang langsung masuk ke WA Anda.</div>
        </details>
        <details class="glass rounded-xl border border-white/5 group">
          <summary class="p-4 cursor-pointer flex items-center justify-between text-sm font-medium hover:text-fk-purple transition">
            <span>Apakah FashionKas mengakses WhatsApp saya?</span>
            <i class="fa-solid fa-chevron-down text-xs text-gray-500 transition group-open:rotate-180"></i>
          </summary>
          <div class="px-4 pb-4 text-xs text-gray-400 leading-relaxed">FashionKas menggunakan Fonnte sebagai gateway WhatsApp. Fitur WA automation (struk otomatis, auto-reply) memerlukan koneksi Fonnte yang Anda setting sendiri. Tanpa Fonnte, fitur katalog dan kasir tetap berjalan normal.</div>
        </details>
      </div>
    </div>
  </section>

  <!-- ===== FINAL CTA ===== -->
  <section class="section-divider py-20 px-4 sm:px-6 hero-glow">
    <div class="max-w-lg mx-auto text-center">
      <div class="w-16 h-16 mx-auto rounded-2xl fk-gradient shadow-lg shadow-fk-purple/30 flex items-center justify-center mb-6">
        <i class="fa-solid fa-shirt text-white text-2xl"></i>
      </div>
      <h2 class="font-heading font-bold text-2xl sm:text-3xl mb-3">Siap Rapikan <span class="text-fk-purple">Jualan</span>?</h2>
      <p class="text-sm text-gray-400 mb-8 max-w-md mx-auto">5 menit setup, langsung bisa share katalog ke customer. Gratis, tanpa kartu kredit, tanpa batas waktu.</p>
      <a href="/register" class="inline-block px-10 py-4 rounded-xl btn-primary text-white font-heading font-bold text-sm">
        <i class="fa-solid fa-rocket mr-2"></i>Mulai Gratis Sekarang
      </a>
      <p class="text-xs text-gray-600 mt-4">Sudah punya akun? <a href="/login" class="text-fk-purple hover:underline font-medium">Masuk</a></p>
    </div>
  </section>

  <!-- ===== FOOTER ===== -->
  <footer class="section-divider py-10 px-4 sm:px-6">
    <div class="max-w-4xl mx-auto">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-lg fk-gradient flex items-center justify-center"><i class="fa-solid fa-shirt text-white text-xs"></i></div>
          <span class="font-heading font-bold text-xs">
            <span class="text-fk-purple">Fashion</span><span class="text-white">Kas</span>
          </span>
          <span class="text-[10px] text-gray-600 ml-1">v2.5</span>
        </div>
        
        <div class="flex items-center gap-6">
          <a href="https://github.com/ganihypha/Fashionkas" target="_blank" rel="noopener" class="text-gray-600 hover:text-white transition text-xs flex items-center gap-1.5">
            <i class="fa-brands fa-github"></i>GitHub
          </a>
          <a href="https://www.instagram.com/fashionkas.id" target="_blank" rel="noopener" class="text-gray-600 hover:text-white transition text-xs flex items-center gap-1.5">
            <i class="fa-brands fa-instagram"></i>Instagram
          </a>
        </div>
      </div>
      
      <div class="mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-[10px] text-gray-700">2026 FashionKas. Katalog + Kasir Digital untuk Reseller Fashion Indonesia.</p>
        <div class="flex items-center gap-3 text-[10px] text-gray-700">
          <span class="flex items-center gap-1"><i class="fa-solid fa-shield-halved text-green-600"></i>SSL Encrypted</span>
          <span class="flex items-center gap-1"><i class="fa-solid fa-server text-blue-600"></i>Cloudflare Edge</span>
        </div>
      </div>
    </div>
  </footer>

  <!-- Scroll-based navbar shadow -->
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
