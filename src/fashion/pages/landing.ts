// Landing Page
export function landingPage(): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FashionKas - Kasir Digital + Katalog Online untuk Fashion Reseller</title>
  <meta name="description" content="Kasir digital + katalog online + WhatsApp automation untuk fashion reseller Indonesia. Gratis untuk beta user!">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@600;700;800;900&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
  <script>tailwind.config={theme:{extend:{colors:{'fk':{'purple':'#A855F7','purple-light':'#C084FC','purple-dark':'#7C3AED'},'empire':{'black':'#0A0A0A','dark':'#111111','navy':'#1A1A2E'}}}}}</script>
  <style>
    body { font-family: 'Inter', sans-serif; background: #0A0A0A; color: #FFFFFF; }
    .glass-card { background: rgba(26,26,46,0.7); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.05); }
    .fk-gradient { background: linear-gradient(135deg, #A855F7, #7C3AED); }
    .fk-glow { box-shadow: 0 0 60px rgba(168,85,247,0.2); }
    .float { animation: float 3s ease-in-out infinite; }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
  </style>
</head>
<body class="min-h-screen">
  <!-- HERO -->
  <div class="relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
    <div class="max-w-4xl mx-auto px-4 py-16 text-center relative z-10">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 text-xs">
        <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
        <span class="text-gray-400">BETA ACCESS — Gratis Semua Fitur!</span>
      </div>
      
      <div class="w-20 h-20 rounded-2xl fk-gradient flex items-center justify-center mx-auto mb-6 fk-glow float">
        <i class="fa-solid fa-shirt text-white text-3xl"></i>
      </div>
      
      <h1 class="font-['Montserrat'] font-black text-4xl md:text-5xl mb-4 leading-tight">
        <span class="text-fk-purple">Fashion</span>Kas
      </h1>
      <p class="text-lg text-gray-300 mb-2">Kasir Digital + Katalog Online + WA Automation</p>
      <p class="text-sm text-gray-500 mb-8 max-w-md mx-auto">Untuk fashion reseller, toko pakaian, dan online seller Indonesia. Catat penjualan, manage katalog, kirim struk via WhatsApp — semua dari HP!</p>
      
      <div class="flex flex-col sm:flex-row gap-3 justify-center mb-12">
        <a href="/register" class="px-8 py-4 rounded-xl fk-gradient text-white font-['Montserrat'] font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-fk-purple/30">
          <i class="fa-solid fa-rocket mr-2"></i>Daftar Gratis Sekarang
        </a>
        <a href="/login" class="px-8 py-4 rounded-xl glass-card text-gray-300 font-medium text-sm hover:text-white transition-all border border-white/10">
          <i class="fa-solid fa-right-to-bracket mr-2"></i>Masuk
        </a>
      </div>
      
      <!-- Features -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
        ${[
          { icon: 'fa-cash-register', title: 'Kasir Digital', desc: 'Catat penjualan cepat dari HP', color: '#A855F7' },
          { icon: 'fa-images', title: 'Katalog Online', desc: 'Share produk via link WA/IG', color: '#EC4899' },
          { icon: 'fa-chart-line', title: 'Laporan Otomatis', desc: 'Track income & profit harian', color: '#10B981' },
          { icon: 'fa-whatsapp', title: 'WA Automation', desc: 'Struk & promo otomatis via WA', color: '#25D366' }
        ].map(f => `
          <div class="glass-card rounded-xl p-4">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style="background: ${f.color}15;">
              <i class="fa-solid ${f.icon} ${f.icon.includes('whatsapp') ? 'fab' : 'fa-solid'}" style="color: ${f.color};"></i>
            </div>
            <h3 class="font-['Montserrat'] font-bold text-sm mb-1">${f.title}</h3>
            <p class="text-[11px] text-gray-500">${f.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </div>

  <!-- PRICING -->
  <div class="max-w-4xl mx-auto px-4 py-12">
    <h2 class="font-['Montserrat'] font-bold text-2xl text-center mb-8">Gratis untuk Beta User!</h2>
    <div class="glass-card rounded-2xl p-8 text-center fk-glow border border-fk-purple/20">
      <span class="inline-block px-4 py-1 rounded-full fk-gradient text-white text-xs font-bold mb-4">BETA ACCESS</span>
      <div class="font-['Montserrat'] font-black text-5xl text-fk-purple mb-2">Rp 0</div>
      <p class="text-gray-500 text-sm mb-6">Semua fitur unlocked. Tanpa batas waktu selama masa beta.</p>
      <ul class="text-left max-w-sm mx-auto space-y-2 mb-8">
        ${['Kasir digital unlimited', 'Katalog online shareable', 'Manajemen pesanan', 'Tracking stok otomatis', 'Calculator profit', 'WA struk otomatis', 'Dashboard & laporan', 'Unlimited produk'].map(f => `
          <li class="flex items-center gap-2 text-sm"><i class="fa-solid fa-check-circle text-green-400 text-xs"></i>${f}</li>
        `).join('')}
      </ul>
      <a href="/register" class="inline-block px-8 py-4 rounded-xl fk-gradient text-white font-['Montserrat'] font-bold text-sm hover:opacity-90 transition-all">
        Mulai Sekarang — Gratis!
      </a>
    </div>
  </div>

  <!-- FOOTER -->
  <footer class="border-t border-white/5 py-8 text-center">
    <div class="flex items-center justify-center gap-2 mb-2">
      <div class="w-6 h-6 rounded fk-gradient flex items-center justify-center">
        <i class="fa-solid fa-shirt text-white text-[10px]"></i>
      </div>
      <span class="font-['Montserrat'] font-bold text-sm"><span class="text-fk-purple">Fashion</span>Kas</span>
    </div>
    <p class="text-[10px] text-gray-600">Part of Sovereign Empire &bull; Built with GenSpark.AI</p>
    <p class="text-[10px] text-gray-700 mt-1">by <a href="https://github.com/ganihypha" class="text-fk-purple hover:underline">Gani Hypha</a></p>
  </footer>
</body>
</html>`
}
