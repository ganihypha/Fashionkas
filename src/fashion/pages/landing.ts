// Landing Page - FashionKas
export function landingPage(): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FashionKas - Katalog + Kasir Digital untuk Fashion Reseller Indonesia</title>
  <meta name="description" content="Upload foto + harga, share 1 link ke semua customer via WhatsApp. Katalog digital + kasir penjualan gratis!">
  <meta property="og:title" content="FashionKas - Katalog + Kasir Digital">
  <meta property="og:description" content="Buat katalog digital toko baju dalam 5 menit. Share via WhatsApp!">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@600;700;800;900&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            'fk': { 'purple': '#A855F7', 'purple-light': '#C084FC', 'purple-dark': '#7C3AED' },
            'empire': { 'black': '#0A0A0A', 'dark': '#111111', 'navy': '#1A1A2E' }
          },
          fontFamily: { 'heading': ['Montserrat'], 'body': ['Inter'] }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'Inter', sans-serif; background: #0A0A0A; color: #FFFFFF; }
    .glass-card { background: rgba(26, 26, 46, 0.7); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.05); }
    .fk-gradient { background: linear-gradient(135deg, #A855F7, #7C3AED); }
    .fk-glow { box-shadow: 0 0 40px rgba(168, 85, 247, 0.2); }
    .wa-btn { background: #25D366; }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .6; } }
    .float-anim { animation: float 4s ease-in-out infinite; }
    .pulse-anim { animation: pulse 2s ease-in-out infinite; }
    .hero-bg { background: radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.15) 0%, transparent 60%); }
  </style>
</head>
<body class="min-h-screen">
  <!-- Navbar -->
  <nav class="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
    <div class="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg fk-gradient flex items-center justify-center"><i class="fa-solid fa-shirt text-white text-sm"></i></div>
        <span class="font-['Montserrat'] font-bold text-sm"><span class="text-fk-purple">Fashion</span>Kas</span>
      </div>
      <div class="flex gap-3">
        <a href="/login" class="text-xs px-4 py-2 rounded-lg text-gray-400 hover:text-white transition">Login</a>
        <a href="/register" class="text-xs px-4 py-2 rounded-lg fk-gradient text-white font-bold">Daftar Gratis</a>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="hero-bg pt-24 pb-16 px-4">
    <div class="max-w-4xl mx-auto text-center">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fk-purple/10 border border-fk-purple/20 mb-6 pulse-anim">
        <span class="w-2 h-2 rounded-full bg-green-400"></span>
        <span class="text-xs text-fk-purple font-medium">BETA GRATIS - Semua Fitur Terbuka!</span>
      </div>
      <div class="float-anim mb-6">
        <div class="w-20 h-20 mx-auto rounded-2xl fk-gradient fk-glow flex items-center justify-center">
          <i class="fa-solid fa-shirt text-white text-3xl"></i>
        </div>
      </div>
      <h1 class="font-['Montserrat'] font-black text-3xl sm:text-5xl mb-4">
        <span class="text-fk-purple">Fashion</span>Kas
      </h1>
      <p class="text-lg sm:text-xl text-gray-300 mb-2">Katalog Digital + Kasir Penjualan + WA Automation</p>
      <p class="text-sm text-gray-500 mb-8 max-w-xl mx-auto">Upload foto + harga, share 1 link ke semua customer via WhatsApp. Buat katalog profesional dalam 5 menit!</p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <a href="/register" class="px-8 py-4 rounded-xl fk-gradient text-white font-['Montserrat'] font-bold text-sm shadow-lg shadow-fk-purple/30 hover:shadow-fk-purple/50 transition-all">
          <i class="fa-solid fa-rocket mr-2"></i>Daftar Gratis Sekarang
        </a>
        <a href="#demo" class="px-8 py-4 rounded-xl bg-white/5 text-white border border-white/10 font-medium text-sm hover:bg-white/10 transition-all">
          <i class="fa-solid fa-play mr-2"></i>Lihat Demo Katalog
        </a>
      </div>
      <p class="text-[11px] text-gray-600 mt-4">Tanpa kartu kredit. Tanpa ribet. Langsung pakai.</p>
    </div>
  </section>

  <!-- How It Works -->
  <section class="py-16 px-4 border-t border-white/5">
    <div class="max-w-4xl mx-auto">
      <h2 class="font-['Montserrat'] font-bold text-2xl text-center mb-3">Cara Kerjanya <span class="text-fk-purple">Simpel</span></h2>
      <p class="text-center text-gray-500 text-sm mb-10">3 langkah dari nol jadi punya katalog digital</p>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-4">
            <span class="text-2xl font-['Montserrat'] font-black text-pink-400">1</span>
          </div>
          <h3 class="font-bold text-sm mb-1">Upload Produk</h3>
          <p class="text-xs text-gray-500">Foto + harga + ukuran. Selesai dalam 30 detik per produk.</p>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
            <span class="text-2xl font-['Montserrat'] font-black text-green-400">2</span>
          </div>
          <h3 class="font-bold text-sm mb-1">Share via WA</h3>
          <p class="text-xs text-gray-500">1 link katalog = semua produk. Gak perlu kirim foto satu-satu.</p>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
            <span class="text-2xl font-['Montserrat'] font-black text-blue-400">3</span>
          </div>
          <h3 class="font-bold text-sm mb-1">Catat Penjualan</h3>
          <p class="text-xs text-gray-500">Kasir digital otomatis hitung total, profit, dan kurangi stok.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Demo Catalog Preview -->
  <section id="demo" class="py-16 px-4 border-t border-white/5">
    <div class="max-w-4xl mx-auto">
      <h2 class="font-['Montserrat'] font-bold text-2xl text-center mb-3">Contoh <span class="text-fk-purple">Katalog Digital</span></h2>
      <p class="text-center text-gray-500 text-sm mb-8">Ini tampilan katalog yang customer Anda lihat di HP</p>
      <div class="glass-card rounded-2xl p-4 sm:p-6 max-w-lg mx-auto fk-glow">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl fk-gradient flex items-center justify-center"><i class="fa-solid fa-shirt text-white"></i></div>
          <div><h3 class="font-bold text-sm">Zahra Hijab Store</h3><p class="text-[10px] text-gray-500">Gamis, Hijab & Fashion Muslim</p></div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="glass-card rounded-xl p-3 border border-white/5">
            <div class="w-full h-24 rounded-lg mb-2 flex items-center justify-center" style="background:rgba(236,72,153,0.1)"><i class="fa-solid fa-shirt text-xl text-pink-400"></i></div>
            <p class="text-xs font-medium mb-0.5">Gamis Tie-Dye</p><p class="text-sm font-bold text-fk-purple font-mono">Rp 125.000</p>
            <button class="w-full mt-2 py-1.5 rounded-lg wa-btn text-white text-[10px] font-bold"><i class="fa-brands fa-whatsapp mr-1"></i>Pesan</button>
          </div>
          <div class="glass-card rounded-xl p-3 border border-white/5">
            <div class="w-full h-24 rounded-lg mb-2 flex items-center justify-center" style="background:rgba(139,92,246,0.1)"><i class="fa-solid fa-hat-wizard text-xl text-violet-400"></i></div>
            <p class="text-xs font-medium mb-0.5">Hijab Pashmina</p><p class="text-sm font-bold text-fk-purple font-mono">Rp 55.000</p>
            <button class="w-full mt-2 py-1.5 rounded-lg wa-btn text-white text-[10px] font-bold"><i class="fa-brands fa-whatsapp mr-1"></i>Pesan</button>
          </div>
          <div class="glass-card rounded-xl p-3 border border-white/5">
            <div class="w-full h-24 rounded-lg mb-2 flex items-center justify-center" style="background:rgba(249,115,22,0.1)"><i class="fa-solid fa-vest text-xl text-orange-400"></i></div>
            <p class="text-xs font-medium mb-0.5">Daster Motif</p><p class="text-sm font-bold text-fk-purple font-mono">Rp 85.000</p>
            <button class="w-full mt-2 py-1.5 rounded-lg wa-btn text-white text-[10px] font-bold"><i class="fa-brands fa-whatsapp mr-1"></i>Pesan</button>
          </div>
          <div class="glass-card rounded-xl p-3 border border-white/5">
            <div class="w-full h-24 rounded-lg mb-2 flex items-center justify-center" style="background:rgba(20,184,166,0.1)"><i class="fa-solid fa-user-tie text-xl text-teal-400"></i></div>
            <p class="text-xs font-medium mb-0.5">Rok Plisket</p><p class="text-sm font-bold text-fk-purple font-mono">Rp 95.000</p>
            <button class="w-full mt-2 py-1.5 rounded-lg wa-btn text-white text-[10px] font-bold"><i class="fa-brands fa-whatsapp mr-1"></i>Pesan</button>
          </div>
        </div>
        <p class="text-center text-[10px] text-gray-600 mt-3">Customer klik "Pesan" langsung masuk WhatsApp Anda!</p>
      </div>
    </div>
  </section>

  <!-- Features Grid -->
  <section class="py-16 px-4 border-t border-white/5">
    <div class="max-w-4xl mx-auto">
      <h2 class="font-['Montserrat'] font-bold text-2xl text-center mb-3">Fitur <span class="text-fk-purple">Lengkap</span></h2>
      <p class="text-center text-gray-500 text-sm mb-10">Semua yang reseller fashion butuhkan</p>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div class="glass-card rounded-xl p-5 border border-white/5 hover:border-fk-purple/20 transition-all">
          <div class="w-11 h-11 rounded-xl bg-pink-500/10 flex items-center justify-center mb-3"><i class="fa-solid fa-images text-pink-400"></i></div>
          <h3 class="font-bold text-sm mb-1">Katalog Digital</h3>
          <p class="text-[11px] text-gray-500 leading-relaxed">Tampil profesional. Customer browse dari HP, klik pesan via WA.</p>
        </div>
        <div class="glass-card rounded-xl p-5 border border-white/5 hover:border-fk-purple/20 transition-all">
          <div class="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center mb-3"><i class="fa-brands fa-whatsapp text-green-400"></i></div>
          <h3 class="font-bold text-sm mb-1">WA Automation</h3>
          <p class="text-[11px] text-gray-500 leading-relaxed">Share katalog 1 link. Struk otomatis via WA. Gak manual lagi.</p>
        </div>
        <div class="glass-card rounded-xl p-5 border border-white/5 hover:border-fk-purple/20 transition-all">
          <div class="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center mb-3"><i class="fa-solid fa-cash-register text-amber-400"></i></div>
          <h3 class="font-bold text-sm mb-1">Kasir Digital</h3>
          <p class="text-[11px] text-gray-500 leading-relaxed">Catat penjualan cepat. Hitung total, profit, stok otomatis.</p>
        </div>
        <div class="glass-card rounded-xl p-5 border border-white/5 hover:border-fk-purple/20 transition-all">
          <div class="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3"><i class="fa-solid fa-chart-line text-blue-400"></i></div>
          <h3 class="font-bold text-sm mb-1">Dashboard & Laporan</h3>
          <p class="text-[11px] text-gray-500 leading-relaxed">Income harian, produk terlaris, grafik penjualan mingguan.</p>
        </div>
        <div class="glass-card rounded-xl p-5 border border-white/5 hover:border-fk-purple/20 transition-all">
          <div class="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-3"><i class="fa-solid fa-boxes-stacked text-cyan-400"></i></div>
          <h3 class="font-bold text-sm mb-1">Track Stok</h3>
          <p class="text-[11px] text-gray-500 leading-relaxed">Stok berkurang otomatis. Alert kalau hampir habis.</p>
        </div>
        <div class="glass-card rounded-xl p-5 border border-white/5 hover:border-fk-purple/20 transition-all">
          <div class="w-11 h-11 rounded-xl bg-violet-500/10 flex items-center justify-center mb-3"><i class="fa-solid fa-box text-violet-400"></i></div>
          <h3 class="font-bold text-sm mb-1">Kelola Pesanan</h3>
          <p class="text-[11px] text-gray-500 leading-relaxed">Status pesanan: pending, kirim, selesai. Resi tracking.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing Section - Beta Gratis -->
  <section class="py-16 px-4 border-t border-white/5">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="font-['Montserrat'] font-bold text-2xl mb-3">Sekarang <span class="text-fk-purple">Gratis</span></h2>
      <p class="text-gray-500 text-sm mb-8">Semua fitur terbuka selama masa beta. Tanpa batas.</p>
      <div class="glass-card rounded-2xl p-8 max-w-md mx-auto border-2 border-fk-purple/30 fk-glow">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
          <i class="fa-solid fa-gift text-green-400"></i>
          <span class="text-xs text-green-400 font-bold">BETA GRATIS</span>
        </div>
        <div class="flex items-baseline gap-1 justify-center mb-4">
          <span class="font-['Montserrat'] font-black text-4xl text-fk-purple">Rp 0</span>
          <span class="text-xs text-gray-600">/bulan</span>
        </div>
        <ul class="space-y-2.5 text-sm text-gray-300 mb-6 text-left max-w-xs mx-auto">
          <li><i class="fa-solid fa-check text-green-400 mr-2"></i>Produk unlimited</li>
          <li><i class="fa-solid fa-check text-green-400 mr-2"></i>Transaksi unlimited</li>
          <li><i class="fa-solid fa-check text-green-400 mr-2"></i>1 link katalog digital</li>
          <li><i class="fa-solid fa-check text-green-400 mr-2"></i>WA struk otomatis</li>
          <li><i class="fa-solid fa-check text-green-400 mr-2"></i>Dashboard omzet & profit</li>
          <li><i class="fa-solid fa-check text-green-400 mr-2"></i>Auto-reply bot WA</li>
        </ul>
        <a href="/register" class="block text-center py-3.5 rounded-xl fk-gradient text-white font-['Montserrat'] font-bold text-sm shadow-lg shadow-fk-purple/20 hover:opacity-90 transition">
          <i class="fa-solid fa-rocket mr-2"></i>Daftar Gratis Sekarang
        </a>
        <p class="text-[10px] text-gray-600 mt-3">Tanpa kartu kredit. Tanpa batas waktu. Langsung pakai.</p>
      </div>
    </div>
  </section>

  <!-- Comparison -->
  <section class="py-16 px-4 border-t border-white/5">
    <div class="max-w-3xl mx-auto">
      <h2 class="font-['Montserrat'] font-bold text-xl text-center mb-8">Kenapa <span class="text-fk-purple">FashionKas</span>?</h2>
      <div class="grid grid-cols-2 gap-3 text-center">
        <div class="glass-card rounded-xl p-4 border border-fk-purple/20">
          <div class="font-['Montserrat'] font-black text-2xl text-green-400">GRATIS</div>
          <div class="text-xs text-gray-500 mb-2">FashionKas Beta</div>
          <div class="text-[10px] text-gray-600">Katalog + Kasir + WA</div>
        </div>
        <div class="glass-card rounded-xl p-4 border border-red-500/20">
          <div class="font-['Montserrat'] font-black text-2xl text-red-400">Rp 200K+</div>
          <div class="text-xs text-gray-500 mb-2">Kompetitor lain</div>
          <div class="text-[10px] text-gray-600">Tanpa WA native</div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-16 px-4 border-t border-white/5 hero-bg">
    <div class="max-w-lg mx-auto text-center">
      <h2 class="font-['Montserrat'] font-bold text-2xl mb-3">Siap Punya <span class="text-fk-purple">Katalog Digital</span>?</h2>
      <p class="text-sm text-gray-500 mb-6">5 menit setup, langsung bisa share ke customer via WhatsApp.</p>
      <a href="/register" class="inline-block px-10 py-4 rounded-xl fk-gradient text-white font-['Montserrat'] font-bold text-sm shadow-lg shadow-fk-purple/30 hover:shadow-fk-purple/50 transition-all">
        <i class="fa-solid fa-rocket mr-2"></i>Daftar Gratis Sekarang
      </a>
      <p class="text-[11px] text-gray-600 mt-3">Sudah punya akun? <a href="/login" class="text-fk-purple hover:underline">Login</a></p>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-white/5 py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-lg fk-gradient flex items-center justify-center"><i class="fa-solid fa-shirt text-white text-xs"></i></div>
          <span class="font-['Montserrat'] font-bold text-xs"><span class="text-fk-purple">Fashion</span>Kas</span>
          <span class="text-[10px] text-gray-600">v2.5</span>
        </div>
        <div class="flex gap-4 text-xs text-gray-600">
          <a href="https://github.com/ganihypha" target="_blank" class="hover:text-white"><i class="fa-brands fa-github mr-1"></i>GitHub</a>
          <a href="https://www.instagram.com/fashionkas.id" target="_blank" class="hover:text-white"><i class="fa-brands fa-instagram mr-1"></i>FashionKas</a>
        </div>
      </div>
      <p class="text-center text-[10px] text-gray-700 mt-4">Built with GenSpark.AI | Hono + Cloudflare Workers + Supabase</p>
    </div>
  </footer>
</body>
</html>`
}
