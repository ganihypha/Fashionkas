// FashionKas Layout Component
export function fashionLayout(title: string, content: string, activeNav?: string): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | FashionKas</title>
  <meta name="description" content="Katalog + Kasir Digital untuk Fashion Reseller Indonesia.">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            'fk': { 'purple': '#A855F7', 'purple-light': '#C084FC', 'purple-dark': '#7C3AED' },
            'empire': { 'black': '#0A0A0A', 'dark': '#111111', 'navy': '#1A1A2E', 'navy-light': '#222244' }
          },
          fontFamily: { 'heading': ['Montserrat'], 'body': ['Inter'], 'mono': ['JetBrains Mono'] }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'Inter', sans-serif; background: #0A0A0A; color: #FFFFFF; }
    .glass-card { background: rgba(26, 26, 46, 0.7); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.05); }
    .fk-glow { box-shadow: 0 0 30px rgba(168, 85, 247, 0.15); }
    .fk-border { border: 1px solid rgba(168, 85, 247, 0.2); }
    .fk-gradient { background: linear-gradient(135deg, #A855F7, #7C3AED); }
    .card-hover { transition: all 0.3s ease; }
    .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
    .wa-btn { background: #25D366; }
    .wa-btn:hover { background: #1da851; }
    .wa-pulse { animation: waPulse 2s infinite; }
    @keyframes waPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.4); } 50% { box-shadow: 0 0 0 8px rgba(37,211,102,0); } }
    .status-pending { background: rgba(245,158,11,0.15); color: #F59E0B; border: 1px solid rgba(245,158,11,0.3); }
    .status-processing { background: rgba(59,130,246,0.15); color: #3B82F6; border: 1px solid rgba(59,130,246,0.3); }
    .status-shipped { background: rgba(6,182,212,0.15); color: #06B6D4; border: 1px solid rgba(6,182,212,0.3); }
    .status-delivered { background: rgba(16,185,129,0.15); color: #10B981; border: 1px solid rgba(16,185,129,0.3); }
    .status-cancelled { background: rgba(239,68,68,0.15); color: #EF4444; border: 1px solid rgba(239,68,68,0.3); }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    .toast { position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); z-index: 100; padding: 12px 24px; border-radius: 12px; font-size: 13px; transition: all 0.3s; }
    .toast.success { background: rgba(16,185,129,0.9); color: white; }
    .toast.error { background: rgba(239,68,68,0.9); color: white; }
  </style>
</head>
<body class="min-h-screen pb-20 md:pb-0">
  <!-- TOP NAV -->
  <nav class="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex items-center justify-between h-14">
        <a href="/fashionkas/dashboard" class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg fk-gradient flex items-center justify-center">
            <i class="fa-solid fa-shirt text-white text-sm"></i>
          </div>
          <span class="font-heading font-bold text-sm">
            <span class="text-fk-purple">Fashion</span>Kas
          </span>
        </a>
        <div class="flex items-center gap-3">
          <a href="/fashionkas/settings" class="text-xs text-gray-400 hover:text-white">
            <i class="fa-solid fa-gear"></i>
          </a>
          <button onclick="logout()" class="text-xs text-gray-400 hover:text-red-400" title="Logout">
            <i class="fa-solid fa-right-from-bracket"></i>
          </button>
          <div id="userAvatar" class="w-8 h-8 rounded-full bg-fk-purple/20 flex items-center justify-center text-fk-purple text-xs font-bold">FK</div>
        </div>
      </div>
    </div>
  </nav>

  <!-- MAIN CONTENT -->
  <main class="pt-14 max-w-6xl mx-auto px-4">
    ${content}
  </main>

  <!-- BOTTOM NAV (Mobile) -->
  <nav class="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-white/5 md:hidden">
    <div class="grid grid-cols-5 py-2">
      <a href="/fashionkas/dashboard" class="flex flex-col items-center gap-0.5 ${activeNav === 'dashboard' ? 'text-fk-purple' : 'text-gray-500'}">
        <i class="fa-solid fa-chart-pie text-lg"></i>
        <span class="text-[10px]">Dashboard</span>
      </a>
      <a href="/fashionkas/catalog" class="flex flex-col items-center gap-0.5 ${activeNav === 'catalog' ? 'text-fk-purple' : 'text-gray-500'}">
        <i class="fa-solid fa-images text-lg"></i>
        <span class="text-[10px]">Katalog</span>
      </a>
      <a href="/fashionkas/sale" class="flex flex-col items-center gap-0.5">
        <div class="w-12 h-12 -mt-5 rounded-full fk-gradient flex items-center justify-center shadow-lg shadow-fk-purple/30">
          <i class="fa-solid fa-plus text-white text-lg"></i>
        </div>
        <span class="text-[10px] text-fk-purple font-medium -mt-0.5">Jual</span>
      </a>
      <a href="/fashionkas/orders" class="flex flex-col items-center gap-0.5 ${activeNav === 'orders' ? 'text-fk-purple' : 'text-gray-500'}">
        <i class="fa-solid fa-box text-lg"></i>
        <span class="text-[10px]">Pesanan</span>
      </a>
      <a href="/fashionkas/settings" class="flex flex-col items-center gap-0.5 ${activeNav === 'settings' ? 'text-fk-purple' : 'text-gray-500'}">
        <i class="fa-solid fa-gear text-lg"></i>
        <span class="text-[10px]">Setting</span>
      </a>
    </div>
  </nav>

  <!-- Toast container -->
  <div id="toastContainer"></div>

  <script>
    const API_BASE = '';
    
    function getToken() { return localStorage.getItem('fk_token'); }
    function getStore() { try { return JSON.parse(localStorage.getItem('fk_store') || '{}'); } catch { return {}; } }
    
    function authHeaders() {
      const token = getToken();
      return { 'Content-Type': 'application/json', ...(token ? { 'Authorization': 'Bearer ' + token } : {}) };
    }

    async function apiFetch(url, options = {}) {
      const res = await fetch(API_BASE + url, { ...options, headers: { ...authHeaders(), ...options.headers } });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'API Error');
      return data;
    }

    function showToast(msg, type = 'success') {
      const t = document.createElement('div');
      t.className = 'toast ' + type;
      t.textContent = msg;
      document.getElementById('toastContainer').appendChild(t);
      setTimeout(() => t.remove(), 3000);
    }

    function formatRupiah(n) { return 'Rp ' + (n || 0).toLocaleString('id-ID'); }
    function formatDate(d) { return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }); }

    function logout() {
      localStorage.removeItem('fk_token');
      localStorage.removeItem('fk_store');
      window.location.href = '/login';
    }

    // Auth check on protected pages
    if (!window.location.pathname.startsWith('/login') && 
        !window.location.pathname.startsWith('/register') && 
        !window.location.pathname.startsWith('/catalog/') &&
        window.location.pathname !== '/') {
      if (!getToken()) window.location.href = '/login';
    }

    // Set avatar from store data
    const store = getStore();
    if (store.name && document.getElementById('userAvatar')) {
      document.getElementById('userAvatar').textContent = store.name.substring(0, 2).toUpperCase();
    }
  </script>
</body>
</html>`
}
