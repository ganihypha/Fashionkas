// Settings Page
import { fashionLayout } from '../layout'

export function settingsPage(): string {
  const content = `
  <div class="py-6 space-y-6" id="settingsContent">
    <!-- Header -->
    <div>
      <h1 class="font-heading font-bold text-xl">Pengaturan</h1>
      <p class="text-xs text-gray-500">Kelola profil toko dan akun</p>
    </div>

    <!-- Store Profile -->
    <div class="glass-card rounded-xl p-5 fk-border">
      <h2 class="font-heading font-bold text-sm mb-4"><i class="fa-solid fa-store mr-2 text-fk-purple"></i>Profil Toko</h2>
      <div id="storeInfo" class="space-y-3">
        <div class="text-center py-4"><i class="fa-solid fa-spinner fa-spin text-fk-purple"></i></div>
      </div>
    </div>

    <!-- Quick Links -->
    <div class="glass-card rounded-xl p-5 fk-border">
      <h2 class="font-heading font-bold text-sm mb-4"><i class="fa-solid fa-link mr-2 text-fk-purple"></i>Link Penting</h2>
      <div class="space-y-2">
        <div class="flex items-center justify-between py-2 border-b border-white/5">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-globe text-fk-purple text-sm"></i>
            <span class="text-sm">Katalog Online</span>
          </div>
          <button onclick="copyCatalogLink()" class="text-xs px-3 py-1 rounded-lg bg-fk-purple/10 text-fk-purple border border-fk-purple/20">
            <i class="fa-solid fa-copy mr-1"></i>Copy
          </button>
        </div>
        <div class="flex items-center justify-between py-2 border-b border-white/5">
          <div class="flex items-center gap-2">
            <i class="fa-brands fa-whatsapp text-green-400 text-sm"></i>
            <span class="text-sm">Share ke WhatsApp</span>
          </div>
          <button onclick="shareWhatsApp()" class="text-xs px-3 py-1 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">
            <i class="fa-brands fa-whatsapp mr-1"></i>Share
          </button>
        </div>
        <div class="flex items-center justify-between py-2">
          <div class="flex items-center gap-2">
            <i class="fa-brands fa-instagram text-pink-400 text-sm"></i>
            <span class="text-sm">Nurul Annisa</span>
          </div>
          <a href="https://www.instagram.com/nurulannisaff" target="_blank" class="text-xs px-3 py-1 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20">
            <i class="fa-brands fa-instagram mr-1"></i>Follow
          </a>
        </div>
      </div>
    </div>

    <!-- App Info -->
    <div class="glass-card rounded-xl p-5 fk-border">
      <h2 class="font-heading font-bold text-sm mb-4"><i class="fa-solid fa-info-circle mr-2 text-fk-purple"></i>Tentang App</h2>
      <div class="space-y-2">
        <div class="flex justify-between text-sm">
          <span class="text-gray-400">Versi</span>
          <span class="font-mono text-fk-purple">1.0.0-beta</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-400">Platform</span>
          <span class="text-gray-300">Cloudflare Workers</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-400">Database</span>
          <span class="text-gray-300">Supabase PostgreSQL</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-400">Status</span>
          <span class="text-green-400"><i class="fa-solid fa-circle text-[8px] mr-1"></i>Online</span>
        </div>
      </div>
    </div>

    <!-- Beta Info -->
    <div class="glass-card rounded-xl p-5 border border-fk-purple/20 fk-glow">
      <div class="text-center">
        <span class="inline-block px-4 py-1 rounded-full fk-gradient text-white text-xs font-bold mb-3">BETA ACCESS</span>
        <h3 class="font-heading font-bold text-lg text-fk-purple mb-1">Semua Fitur Gratis!</h3>
        <p class="text-xs text-gray-500 mb-4">Selama masa beta, semua fitur FashionKas bisa dipakai tanpa bayar. Nikmati kasir digital, katalog online, dan WhatsApp automation gratis!</p>
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2 text-xs text-gray-300">
            <i class="fa-solid fa-check-circle text-green-400"></i>Kasir Digital Unlimited
          </div>
          <div class="flex items-center gap-2 text-xs text-gray-300">
            <i class="fa-solid fa-check-circle text-green-400"></i>Katalog Online Shareable
          </div>
          <div class="flex items-center gap-2 text-xs text-gray-300">
            <i class="fa-solid fa-check-circle text-green-400"></i>Manajemen Pesanan & Stok
          </div>
          <div class="flex items-center gap-2 text-xs text-gray-300">
            <i class="fa-solid fa-check-circle text-green-400"></i>Dashboard & Laporan
          </div>
          <div class="flex items-center gap-2 text-xs text-gray-300">
            <i class="fa-solid fa-check-circle text-green-400"></i>WhatsApp Struk Otomatis
          </div>
        </div>
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="glass-card rounded-xl p-5 border border-red-500/20">
      <h2 class="font-heading font-bold text-sm mb-3 text-red-400"><i class="fa-solid fa-triangle-exclamation mr-2"></i>Logout</h2>
      <p class="text-xs text-gray-500 mb-3">Keluar dari akun. Data Anda tetap aman.</p>
      <button onclick="logout()" class="w-full py-2.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-sm hover:bg-red-500/20">
        <i class="fa-solid fa-right-from-bracket mr-2"></i>Logout
      </button>
    </div>

    <!-- Footer Spacing -->
    <div class="h-4"></div>
  </div>

  <script>
    async function loadStoreInfo() {
      try {
        const res = await apiFetch('/api/auth/me');
        const store = res.data.store;
        
        // Update local storage
        localStorage.setItem('fk_store', JSON.stringify(store));
        
        document.getElementById('storeInfo').innerHTML = \`
          <div class="flex items-center gap-3 mb-4">
            <div class="w-14 h-14 rounded-xl fk-gradient flex items-center justify-center text-white font-heading font-bold text-xl">
              \${store.name ? store.name.substring(0, 2).toUpperCase() : 'FK'}
            </div>
            <div>
              <h3 class="font-heading font-bold">\${store.name}</h3>
              <p class="text-xs text-gray-500">\${store.city || 'Indonesia'} • \${(store.tier || 'beta').toUpperCase()}</p>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between py-1.5 border-b border-white/5 text-sm">
              <span class="text-gray-500">Slug</span>
              <span class="font-mono text-xs text-fk-purple">\${store.slug || '-'}</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-white/5 text-sm">
              <span class="text-gray-500">Owner</span>
              <span>\${store.owner_name || '-'}</span>
            </div>
            <div class="flex justify-between py-1.5 text-sm">
              <span class="text-gray-500">Tier</span>
              <span class="px-2 py-0.5 rounded-full fk-gradient text-white text-xs font-bold">\${(store.tier || 'BETA').toUpperCase()}</span>
            </div>
          </div>
        \`;
      } catch(e) {
        document.getElementById('storeInfo').innerHTML = '<p class="text-sm text-red-400">Gagal memuat: ' + e.message + '</p>';
      }
    }

    function copyCatalogLink() {
      const store = getStore();
      if (!store.slug) { showToast('Login dulu!', 'error'); return; }
      const url = window.location.origin + '/catalog/' + store.slug;
      navigator.clipboard.writeText(url).then(() => showToast('Link katalog disalin!')).catch(() => {
        prompt('Copy link ini:', url);
      });
    }

    function shareWhatsApp() {
      const store = getStore();
      if (!store.slug) { showToast('Login dulu!', 'error'); return; }
      const url = window.location.origin + '/catalog/' + store.slug;
      const msg = 'Hai! Yuk lihat koleksi terbaru kami 👗\\n\\n' + (store.name || 'Fashion Store') + '\\n' + url + '\\n\\nPesan langsung via WhatsApp ya! 🛍️';
      window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
    }

    loadStoreInfo();
  </script>`
  
  return fashionLayout('Pengaturan', content, 'settings')
}
