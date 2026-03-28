// FashionKas Layout Component v3.0
// DESIGN UPGRADE: Skeleton loading, smooth transitions, micro-interactions, better UX
// Core JS functions in <head> so all page scripts can use them.

export function fashionLayout(title: string, content: string, activeNav?: string): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${title} | FashionKas</title>
  <meta name="description" content="Katalog + Kasir Digital + AI Agent untuk Fashion Reseller Indonesia.">
  <meta name="theme-color" content="#A855F7">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="FashionKas">
  <link rel="manifest" href="/manifest.json">
  <link rel="apple-touch-icon" href="/static/icon-192.png">
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

  <!-- ============================================================= -->
  <!-- CORE JS FUNCTIONS - MUST be in <head> so all page scripts can use them -->
  <!-- These load BEFORE any <script> inside page content (<main>) -->
  <!-- ============================================================= -->
  <script>
    var API_BASE = '';

    function getToken() { return localStorage.getItem('fk_token'); }
    function getStore() { try { return JSON.parse(localStorage.getItem('fk_store') || '{}'); } catch { return {}; } }

    function authHeaders() {
      var token = getToken();
      return { 'Content-Type': 'application/json', ...(token ? { 'Authorization': 'Bearer ' + token } : {}) };
    }

    async function apiFetch(url, options) {
      if (!options) options = {};
      try {
        var res = await fetch(API_BASE + url, {
          ...options,
          headers: { ...authHeaders(), ...(options.headers || {}) }
        });
        var text = await res.text();
        var data;
        try { data = JSON.parse(text); } catch { throw new Error('Server response tidak valid: ' + text.substring(0, 100)); }
        if (!res.ok || !data.success) throw new Error(data.message || 'API Error (' + res.status + ')');
        return data;
      } catch(e) {
        if (e.message === 'Failed to fetch' || e.message.includes('NetworkError')) {
          throw new Error('Koneksi gagal. Periksa internet Anda.');
        }
        throw e;
      }
    }

    function showToast(msg, type) {
      if (!type) type = 'success';
      var container = document.getElementById('toastContainer');
      if (!container) { container = document.createElement('div'); container.id = 'toastContainer'; document.body.appendChild(container); }
      var t = document.createElement('div');
      t.className = 'toast ' + type;
      t.textContent = msg;
      container.appendChild(t);
      setTimeout(function() { t.remove(); }, 3000);
    }

    function formatRupiah(n) { return 'Rp ' + (n || 0).toLocaleString('id-ID'); }
    function formatDate(d) { return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }); }

    function logout() {
      localStorage.removeItem('fk_token');
      localStorage.removeItem('fk_store');
      window.location.href = '/login';
    }

    // Auth check on protected pages (runs immediately in <head>)
    if (!window.location.pathname.startsWith('/login') &&
        !window.location.pathname.startsWith('/register') &&
        !window.location.pathname.startsWith('/catalog/') &&
        window.location.pathname !== '/') {
      if (!getToken()) window.location.href = '/login';
    }
  </script>

  <style>
    * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #0A0A0A; color: #FFFFFF; }
    
    /* Glass Cards */
    .glass-card { background: rgba(13, 17, 23, 0.8); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.06); }
    .fk-glow { box-shadow: 0 0 30px rgba(168, 85, 247, 0.15); }
    .fk-border { border: 1px solid rgba(168, 85, 247, 0.2); }
    .fk-gradient { background: linear-gradient(135deg, #A855F7, #7C3AED); }
    
    /* Card Hover with micro-interaction */
    .card-hover { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
    .card-hover:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); border-color: rgba(168,85,247,0.15); }
    
    /* Button micro-interactions */
    button, a[role="button"], .btn-interact { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
    button:active, a[role="button"]:active, .btn-interact:active { transform: scale(0.97); }
    
    /* WhatsApp button */
    .wa-btn { background: #25D366; transition: all 0.2s; }
    .wa-btn:hover { background: #1da851; }
    .wa-pulse { animation: waPulse 2s infinite; }
    @keyframes waPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.4); } 50% { box-shadow: 0 0 0 8px rgba(37,211,102,0); } }
    
    /* AI Glow */
    .ai-glow { animation: aiGlow 3s infinite; }
    @keyframes aiGlow { 0%,100% { box-shadow: 0 0 0 0 rgba(168,85,247,0.3); } 50% { box-shadow: 0 0 0 6px rgba(168,85,247,0); } }
    
    /* Status badges */
    .status-pending { background: rgba(245,158,11,0.15); color: #F59E0B; border: 1px solid rgba(245,158,11,0.3); }
    .status-processing { background: rgba(59,130,246,0.15); color: #3B82F6; border: 1px solid rgba(59,130,246,0.3); }
    .status-shipped { background: rgba(6,182,212,0.15); color: #06B6D4; border: 1px solid rgba(6,182,212,0.3); }
    .status-delivered { background: rgba(16,185,129,0.15); color: #10B981; border: 1px solid rgba(16,185,129,0.3); }
    .status-cancelled { background: rgba(239,68,68,0.15); color: #EF4444; border: 1px solid rgba(239,68,68,0.3); }
    
    /* Skeleton Loading */
    .skeleton { background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%); background-size: 200% 100%; animation: skeletonShimmer 1.5s ease-in-out infinite; border-radius: 8px; }
    @keyframes skeletonShimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
    .skeleton-text { height: 14px; margin-bottom: 8px; }
    .skeleton-title { height: 20px; width: 60%; margin-bottom: 12px; }
    .skeleton-card { height: 100px; margin-bottom: 12px; }
    .skeleton-circle { border-radius: 50%; }
    
    /* Page fade-in transition */
    main { animation: pageFadeIn 0.3s ease-out; }
    @keyframes pageFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    
    /* Empty state styling */
    .empty-state { text-align: center; padding: 48px 24px; }
    .empty-state i { font-size: 48px; margin-bottom: 16px; opacity: 0.3; }
    .empty-state h3 { font-size: 16px; font-weight: 600; margin-bottom: 8px; color: #9CA3AF; }
    .empty-state p { font-size: 13px; color: #6B7280; margin-bottom: 20px; }
    
    /* Scrollbar */
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    
    /* Toast notifications - improved */
    #toastContainer { position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); z-index: 100; display: flex; flex-direction: column; gap: 8px; align-items: center; }
    .toast { padding: 12px 24px; border-radius: 12px; font-size: 13px; font-weight: 500; animation: toastIn 0.3s ease-out, toastOut 0.3s 2.7s ease-in forwards; box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
    .toast.success { background: rgba(16,185,129,0.95); color: white; }
    .toast.error { background: rgba(239,68,68,0.95); color: white; }
    .toast.info { background: rgba(59,130,246,0.95); color: white; }
    @keyframes toastIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes toastOut { from { opacity: 1; } to { opacity: 0; transform: translateY(-8px); } }
    
    /* More menu popup */
    .more-menu { display: none; position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 8px; background: rgba(13,17,23,0.95); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 8px; min-width: 200px; z-index: 70; box-shadow: 0 -8px 32px rgba(0,0,0,0.5); }
    .more-menu.show { display: block; animation: slideUp 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
    @keyframes slideUp { from { opacity: 0; transform: translateX(-50%) translateY(8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
    .more-menu a { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 10px; font-size: 13px; transition: all 0.15s; }
    .more-menu a:hover { background: rgba(168,85,247,0.1); }
    
    /* Desktop nav */
    .desktop-nav a { position: relative; padding: 6px 12px; border-radius: 8px; font-size: 12px; transition: all 0.2s; }
    .desktop-nav a:hover { background: rgba(168,85,247,0.1); }
    .desktop-nav a.active { background: rgba(168,85,247,0.15); color: #A855F7; }
    
    /* Smooth scrolling */
    html { scroll-behavior: smooth; }
    
    /* Input focus glow */
    input:focus, select:focus, textarea:focus { outline: none; border-color: rgba(168,85,247,0.5) !important; box-shadow: 0 0 0 3px rgba(168,85,247,0.1) !important; }
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
        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-1 desktop-nav">
          <a href="/fashionkas/dashboard" class="${activeNav === 'dashboard' ? 'active' : 'text-gray-400'}"><i class="fa-solid fa-chart-pie mr-1"></i>Dashboard</a>
          <a href="/fashionkas/catalog" class="${activeNav === 'catalog' ? 'active' : 'text-gray-400'}"><i class="fa-solid fa-images mr-1"></i>Katalog</a>
          <a href="/fashionkas/sale" class="${activeNav === 'sale' ? 'active text-fk-purple' : 'text-gray-400'}"><i class="fa-solid fa-cash-register mr-1"></i>Kasir</a>
          <a href="/fashionkas/orders" class="${activeNav === 'orders' ? 'active' : 'text-gray-400'}"><i class="fa-solid fa-box mr-1"></i>Pesanan</a>
          <a href="/fashionkas/wa" class="${activeNav === 'wa' ? 'active' : 'text-gray-400'}"><i class="fa-brands fa-whatsapp mr-1"></i>WA</a>
          <a href="/fashionkas/scout" class="${activeNav === 'scout' ? 'active' : 'text-gray-400'}"><i class="fa-solid fa-binoculars mr-1"></i>Scout</a>
          <a href="/fashionkas/closer" class="${activeNav === 'closer' ? 'active' : 'text-gray-400'}"><i class="fa-solid fa-bullseye mr-1"></i>Closer</a>
          <a href="/fashionkas/reports" class="${activeNav === 'reports' ? 'active' : 'text-gray-400'}"><i class="fa-solid fa-chart-bar mr-1"></i>Laporan</a>
          <a href="/fashionkas/customers" class="${activeNav === 'customers' ? 'active' : 'text-gray-400'}"><i class="fa-solid fa-users mr-1"></i>Pelanggan</a>
          <a href="/fashionkas/followup" class="${activeNav === 'followup' ? 'active' : 'text-gray-400'}"><i class="fa-solid fa-bell mr-1 text-amber-400"></i>Follow-up</a>
        </div>
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

  <!-- MAIN CONTENT (page scripts here can safely use apiFetch, getStore, etc.) -->
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
      <div class="relative flex flex-col items-center gap-0.5 cursor-pointer ${['wa','scout','closer','reports','settings'].includes(activeNav || '') ? 'text-fk-purple' : 'text-gray-500'}" onclick="toggleMore(event)">
        <i class="fa-solid fa-ellipsis text-lg"></i>
        <span class="text-[10px]">Lainnya</span>
        <!-- More Menu Popup -->
        <div id="moreMenu" class="more-menu">
          <a href="/fashionkas/wa" class="${activeNav === 'wa' ? 'text-green-400' : 'text-gray-300'}">
            <div class="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center"><i class="fa-brands fa-whatsapp text-green-400"></i></div>
            <div><p class="font-medium">WA Automation</p><p class="text-[10px] text-gray-500">Struk, notif, broadcast</p></div>
          </a>
          <a href="/fashionkas/scout" class="${activeNav === 'scout' ? 'text-fk-purple' : 'text-gray-300'}">
            <div class="w-8 h-8 rounded-lg bg-fk-purple/10 flex items-center justify-center"><i class="fa-solid fa-binoculars text-fk-purple"></i></div>
            <div><p class="font-medium">Scout AI</p><p class="text-[10px] text-gray-500">Lead scoring & analisis</p></div>
          </a>
          <a href="/fashionkas/closer" class="${activeNav === 'closer' ? 'text-fk-purple' : 'text-gray-300'}">
            <div class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center"><i class="fa-solid fa-bullseye text-amber-400"></i></div>
            <div><p class="font-medium">Closer AI</p><p class="text-[10px] text-gray-500">Follow-up & outreach</p></div>
          </a>
          <a href="/fashionkas/reports" class="${activeNav === 'reports' ? 'text-fk-purple' : 'text-gray-300'}">
            <div class="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center"><i class="fa-solid fa-chart-bar text-cyan-400"></i></div>
            <div><p class="font-medium">Laporan</p><p class="text-[10px] text-gray-500">PDF & analisis bulanan</p></div>
          </a>
          <a href="/fashionkas/settings" class="${activeNav === 'settings' ? 'text-fk-purple' : 'text-gray-300'}">
            <div class="w-8 h-8 rounded-lg bg-gray-500/10 flex items-center justify-center"><i class="fa-solid fa-gear text-gray-400"></i></div>
            <div><p class="font-medium">Settings</p><p class="text-[10px] text-gray-500">Profil, PIN, ekspor</p></div>
          </a>
          <a href="/fashionkas/customers" class="${activeNav === 'customers' ? 'text-fk-purple' : 'text-gray-300'}">
            <div class="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center"><i class="fa-solid fa-users text-blue-400"></i></div>
            <div><p class="font-medium">Pelanggan</p><p class="text-[10px] text-gray-500">Database customer</p></div>
          </a>
          <a href="/fashionkas/followup" class="${activeNav === 'followup' ? 'text-fk-purple' : 'text-gray-300'}">
            <div class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center"><i class="fa-solid fa-bell text-amber-400"></i></div>
            <div><p class="font-medium">Follow-up</p><p class="text-[10px] text-gray-500">Reminder & re-engage</p></div>
          </a>
        </div>
      </div>
    </div>
  </nav>

  <!-- Toast container -->
  <div id="toastContainer"></div>

  <!-- UI-only script (avatar, more menu, PWA) - runs after DOM is rendered -->
  <script>
    // More menu toggle
    function toggleMore(e) {
      e.stopPropagation();
      var menu = document.getElementById('moreMenu');
      if (menu) menu.classList.toggle('show');
    }
    document.addEventListener('click', function() {
      var menu = document.getElementById('moreMenu');
      if (menu) menu.classList.remove('show');
    });

    // Set avatar from store data
    (function() {
      var s = getStore();
      if (s.name && document.getElementById('userAvatar')) {
        document.getElementById('userAvatar').textContent = s.name.substring(0, 2).toUpperCase();
      }
    })();

    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(function() {});
    }

    // Install prompt handler
    var deferredInstallPrompt = null;
    window.addEventListener('beforeinstallprompt', function(e) {
      e.preventDefault();
      deferredInstallPrompt = e;
      if (!localStorage.getItem('fk_pwa_dismissed')) {
        showInstallBanner();
      }
    });

    function showInstallBanner() {
      if (document.getElementById('installBanner')) return;
      var banner = document.createElement('div');
      banner.id = 'installBanner';
      banner.innerHTML = '<div style="position:fixed;bottom:76px;left:12px;right:12px;z-index:90;background:rgba(26,26,46,0.95);backdrop-filter:blur(16px);border:1px solid rgba(168,85,247,0.3);border-radius:16px;padding:14px 16px;display:flex;align-items:center;gap:12px;box-shadow:0 -4px 20px rgba(0,0,0,0.3)"><div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#A855F7,#7C3AED);display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-download" style="color:white;font-size:16px"></i></div><div style="flex:1;min-width:0"><p style="font-size:13px;font-weight:600;margin:0">Install FashionKas</p><p style="font-size:10px;color:#888;margin:2px 0 0">Akses cepat dari home screen</p></div><button onclick="installPWA()" style="background:linear-gradient(135deg,#A855F7,#7C3AED);color:white;border:none;padding:8px 16px;border-radius:10px;font-size:12px;font-weight:700;cursor:pointer">Install</button><button onclick="dismissInstall()" style="background:none;border:none;color:#666;cursor:pointer;font-size:14px;padding:4px"><i class="fa-solid fa-xmark"></i></button></div>';
      document.body.appendChild(banner);
    }

    window.installPWA = async function() {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        var result = await deferredInstallPrompt.userChoice;
        deferredInstallPrompt = null;
        var banner = document.getElementById('installBanner');
        if (banner) banner.remove();
        if (result.outcome === 'accepted') showToast('FashionKas terinstall!');
      }
    };

    window.dismissInstall = function() {
      localStorage.setItem('fk_pwa_dismissed', '1');
      var banner = document.getElementById('installBanner');
      if (banner) banner.remove();
    };
  </script>
</body>
</html>`
}
