// Settings Page - FashionKas
import { fashionLayout } from '../layout'

export function settingsPage(): string {
  const content = `
  <div class="py-6 space-y-6" id="settingsContent">
    <div><h1 class="font-heading font-bold text-xl">Pengaturan</h1><p class="text-xs text-gray-500">Kelola profil toko dan akun</p></div>

    <!-- Store Profile (Editable) -->
    <div class="glass-card rounded-xl p-5 fk-border">
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-heading font-bold text-sm"><i class="fa-solid fa-store mr-2 text-fk-purple"></i>Profil Toko</h2>
        <button onclick="toggleEditStore()" id="editStoreBtn" class="text-xs px-3 py-1 rounded-lg bg-fk-purple/10 text-fk-purple border border-fk-purple/20">
          <i class="fa-solid fa-pen mr-1"></i>Edit
        </button>
      </div>
      <div id="storeView" class="space-y-3">
        <div class="text-center py-4"><i class="fa-solid fa-spinner fa-spin text-fk-purple"></i></div>
      </div>
      <div id="storeEdit" class="space-y-3 hidden">
        <div>
          <label class="text-xs text-gray-500 mb-1 block">Nama Toko</label>
          <input type="text" id="editName" class="w-full px-3 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm focus:border-fk-purple/50">
        </div>
        <div>
          <label class="text-xs text-gray-500 mb-1 block">Deskripsi Toko</label>
          <textarea id="editDesc" class="w-full px-3 py-2 rounded-lg bg-empire-dark border border-white/10 text-sm resize-none h-16 focus:border-fk-purple/50" placeholder="Gamis, Hijab & Fashion Muslim terlengkap..."></textarea>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs text-gray-500 mb-1 block">Nama Pemilik</label>
            <input type="text" id="editOwner" class="w-full px-3 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm focus:border-fk-purple/50">
          </div>
          <div>
            <label class="text-xs text-gray-500 mb-1 block">Kota</label>
            <input type="text" id="editCity" class="w-full px-3 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm focus:border-fk-purple/50">
          </div>
        </div>
        <div class="flex gap-2 pt-1">
          <button onclick="saveStoreProfile()" id="btnSaveStore" class="flex-1 py-2.5 rounded-lg fk-gradient text-white text-xs font-bold">
            <i class="fa-solid fa-save mr-1"></i>Simpan
          </button>
          <button onclick="toggleEditStore()" class="px-4 py-2.5 rounded-lg bg-white/5 text-gray-400 text-xs">Batal</button>
        </div>
      </div>
    </div>

    <!-- Quick Links -->
    <div class="glass-card rounded-xl p-5 fk-border">
      <h2 class="font-heading font-bold text-sm mb-4"><i class="fa-solid fa-share-nodes mr-2 text-fk-purple"></i>Bagikan Katalog</h2>
      <div class="space-y-3">
        <div class="glass-card rounded-lg p-3">
          <p class="text-xs text-gray-500 mb-2">Link Katalog Anda:</p>
          <div class="flex items-center gap-2">
            <input type="text" id="catalogUrl" readonly class="flex-1 px-3 py-2 rounded-lg bg-empire-dark border border-white/10 text-xs font-mono text-fk-purple">
            <button onclick="copyCatalogLink()" class="px-3 py-2 rounded-lg bg-fk-purple/10 text-fk-purple border border-fk-purple/20 text-xs">
              <i class="fa-solid fa-copy"></i>
            </button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <button onclick="shareWhatsApp()" class="py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold">
            <i class="fa-brands fa-whatsapp mr-1"></i>Share WhatsApp
          </button>
          <button onclick="shareGeneral()" class="py-3 rounded-xl bg-fk-purple/10 text-fk-purple border border-fk-purple/20 text-xs font-bold">
            <i class="fa-solid fa-share-from-square mr-1"></i>Share Lainnya
          </button>
        </div>
      </div>
    </div>

    <!-- Social Links -->
    <div class="glass-card rounded-xl p-5 fk-border">
      <h2 class="font-heading font-bold text-sm mb-4"><i class="fa-solid fa-link mr-2 text-fk-purple"></i>Link Penting</h2>
      <div class="space-y-2">
        <a href="https://www.instagram.com/nurulannisaff" target="_blank" class="flex items-center justify-between py-2.5 border-b border-white/5 hover:bg-white/5 px-2 rounded-lg transition">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"><i class="fa-brands fa-instagram text-white text-sm"></i></div>
            <div><p class="text-sm font-medium">Nurul Annisa</p><p class="text-[10px] text-gray-500">@nurulannisaff</p></div>
          </div>
          <i class="fa-solid fa-arrow-up-right-from-square text-gray-600 text-xs"></i>
        </a>
        <a href="https://github.com/ganihypha" target="_blank" class="flex items-center justify-between py-2.5 hover:bg-white/5 px-2 rounded-lg transition">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center"><i class="fa-brands fa-github text-white text-sm"></i></div>
            <div><p class="text-sm font-medium">Sovereign Empire</p><p class="text-[10px] text-gray-500">github.com/ganihypha</p></div>
          </div>
          <i class="fa-solid fa-arrow-up-right-from-square text-gray-600 text-xs"></i>
        </a>
      </div>
    </div>

    <!-- Change PIN -->
    <div class="glass-card rounded-xl p-5 fk-border">
      <h2 class="font-heading font-bold text-sm mb-4"><i class="fa-solid fa-lock mr-2 text-fk-purple"></i>Ubah PIN</h2>
      <div class="space-y-3">
        <input type="password" id="currentPin" maxlength="6" placeholder="PIN Lama" class="w-full px-3 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm focus:border-fk-purple/50">
        <input type="password" id="newPin" maxlength="6" placeholder="PIN Baru (min 4 digit)" class="w-full px-3 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm focus:border-fk-purple/50">
        <button onclick="changePin()" id="btnChangePin" class="w-full py-2.5 rounded-lg bg-fk-purple/10 text-fk-purple border border-fk-purple/20 text-xs font-bold">
          <i class="fa-solid fa-key mr-1"></i>Ubah PIN
        </button>
      </div>
    </div>

    <!-- App Info -->
    <div class="glass-card rounded-xl p-5 fk-border">
      <h2 class="font-heading font-bold text-sm mb-4"><i class="fa-solid fa-info-circle mr-2 text-fk-purple"></i>Tentang App</h2>
      <div class="space-y-2">
        <div class="flex justify-between text-sm"><span class="text-gray-400">Versi</span><span class="font-mono text-fk-purple">1.0.0-beta</span></div>
        <div class="flex justify-between text-sm"><span class="text-gray-400">Platform</span><span class="text-gray-300">Cloudflare Workers</span></div>
        <div class="flex justify-between text-sm"><span class="text-gray-400">Database</span><span class="text-gray-300">Supabase PostgreSQL</span></div>
        <div class="flex justify-between text-sm"><span class="text-gray-400">Status</span><span class="text-green-400"><i class="fa-solid fa-circle text-[8px] mr-1"></i>Online</span></div>
      </div>
    </div>

    <!-- Beta -->
    <div class="glass-card rounded-xl p-5 border border-fk-purple/20 fk-glow">
      <div class="text-center">
        <span class="inline-block px-4 py-1 rounded-full fk-gradient text-white text-xs font-bold mb-3">BETA ACCESS</span>
        <h3 class="font-heading font-bold text-lg text-fk-purple mb-1">Semua Fitur Gratis!</h3>
        <p class="text-xs text-gray-500 mb-4">Selama masa beta, semua fitur FashionKas bisa dipakai tanpa bayar.</p>
        <div class="grid grid-cols-2 gap-2 text-left max-w-xs mx-auto">
          <div class="flex items-center gap-2 text-xs text-gray-300"><i class="fa-solid fa-check-circle text-green-400"></i>Kasir Unlimited</div>
          <div class="flex items-center gap-2 text-xs text-gray-300"><i class="fa-solid fa-check-circle text-green-400"></i>Katalog Online</div>
          <div class="flex items-center gap-2 text-xs text-gray-300"><i class="fa-solid fa-check-circle text-green-400"></i>Order Management</div>
          <div class="flex items-center gap-2 text-xs text-gray-300"><i class="fa-solid fa-check-circle text-green-400"></i>Dashboard Lengkap</div>
          <div class="flex items-center gap-2 text-xs text-gray-300"><i class="fa-solid fa-check-circle text-green-400"></i>WA Automation</div>
          <div class="flex items-center gap-2 text-xs text-gray-300"><i class="fa-solid fa-check-circle text-green-400"></i>Produk Unlimited</div>
        </div>
      </div>
    </div>

    <!-- Logout -->
    <div class="glass-card rounded-xl p-5 border border-red-500/20">
      <h2 class="font-heading font-bold text-sm mb-3 text-red-400"><i class="fa-solid fa-triangle-exclamation mr-2"></i>Logout</h2>
      <p class="text-xs text-gray-500 mb-3">Keluar dari akun. Data Anda tetap aman di server.</p>
      <button onclick="logout()" class="w-full py-2.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-sm hover:bg-red-500/20 transition">
        <i class="fa-solid fa-right-from-bracket mr-2"></i>Logout
      </button>
    </div>
    <div class="h-4"></div>
  </div>

  <script>
    let storeDataLocal = null;
    let isEditing = false;

    async function loadStoreInfo() {
      try {
        const res = await apiFetch('/api/auth/me');
        storeDataLocal = res.data.store;
        localStorage.setItem('fk_store', JSON.stringify(storeDataLocal));
        renderStoreView();
        
        // Set catalog URL
        const url = window.location.origin + '/catalog/' + storeDataLocal.slug;
        document.getElementById('catalogUrl').value = url;
      } catch(e) {
        document.getElementById('storeView').innerHTML = '<p class="text-sm text-red-400">Gagal memuat: ' + e.message + '</p>';
      }
    }

    function renderStoreView() {
      const s = storeDataLocal;
      document.getElementById('storeView').innerHTML = \`
        <div class="flex items-center gap-4 mb-4">
          <div class="w-16 h-16 rounded-xl fk-gradient flex items-center justify-center text-white font-heading font-bold text-xl">
            \${s.name ? s.name.substring(0, 2).toUpperCase() : 'FK'}
          </div>
          <div>
            <h3 class="font-heading font-bold text-lg">\${s.name}</h3>
            <p class="text-xs text-gray-500">\${s.city || 'Indonesia'} | \${(s.tier || 'beta').toUpperCase()}</p>
            \${s.description ? '<p class="text-xs text-gray-400 mt-0.5">' + s.description + '</p>' : ''}
          </div>
        </div>
        <div class="space-y-2">
          <div class="flex justify-between py-1.5 border-b border-white/5 text-sm"><span class="text-gray-500">Slug</span><span class="font-mono text-xs text-fk-purple">\${s.slug || '-'}</span></div>
          <div class="flex justify-between py-1.5 border-b border-white/5 text-sm"><span class="text-gray-500">Pemilik</span><span>\${s.owner_name || '-'}</span></div>
          <div class="flex justify-between py-1.5 border-b border-white/5 text-sm"><span class="text-gray-500">WhatsApp</span><span class="text-gray-300">\${s.owner_phone || '-'}</span></div>
          <div class="flex justify-between py-1.5 text-sm"><span class="text-gray-500">Tier</span><span class="px-2 py-0.5 rounded-full fk-gradient text-white text-xs font-bold">\${(s.tier || 'BETA').toUpperCase()}</span></div>
        </div>
      \`;
    }

    function toggleEditStore() {
      isEditing = !isEditing;
      document.getElementById('storeView').classList.toggle('hidden', isEditing);
      document.getElementById('storeEdit').classList.toggle('hidden', !isEditing);
      document.getElementById('editStoreBtn').classList.toggle('hidden', isEditing);
      
      if (isEditing && storeDataLocal) {
        document.getElementById('editName').value = storeDataLocal.name || '';
        document.getElementById('editDesc').value = storeDataLocal.description || '';
        document.getElementById('editOwner').value = storeDataLocal.owner_name || '';
        document.getElementById('editCity').value = storeDataLocal.city || '';
      }
    }

    async function saveStoreProfile() {
      const btn = document.getElementById('btnSaveStore');
      btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i>Menyimpan...';
      try {
        const res = await apiFetch('/api/auth/store', {
          method: 'PUT',
          body: JSON.stringify({
            name: document.getElementById('editName').value.trim(),
            description: document.getElementById('editDesc').value.trim(),
            owner_name: document.getElementById('editOwner').value.trim(),
            city: document.getElementById('editCity').value.trim()
          })
        });
        storeDataLocal = res.data.store;
        localStorage.setItem('fk_store', JSON.stringify(storeDataLocal));
        toggleEditStore();
        renderStoreView();
        showToast('Profil toko berhasil diupdate!');
      } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
      btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-save mr-1"></i>Simpan';
    }

    async function changePin() {
      const current = document.getElementById('currentPin').value;
      const newP = document.getElementById('newPin').value;
      if (!current || !newP) { showToast('Isi PIN lama dan baru', 'error'); return; }
      if (newP.length < 4) { showToast('PIN baru minimal 4 digit', 'error'); return; }
      
      const btn = document.getElementById('btnChangePin');
      btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i>Mengubah...';
      try {
        await apiFetch('/api/auth/change-pin', { method: 'PUT', body: JSON.stringify({ current_pin: current, new_pin: newP }) });
        showToast('PIN berhasil diubah!');
        document.getElementById('currentPin').value = '';
        document.getElementById('newPin').value = '';
      } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
      btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-key mr-1"></i>Ubah PIN';
    }

    function copyCatalogLink() {
      const url = document.getElementById('catalogUrl').value;
      if (navigator.clipboard) { navigator.clipboard.writeText(url); showToast('Link katalog disalin!'); }
      else { prompt('Copy link ini:', url); }
    }

    function shareWhatsApp() {
      const store = getStore();
      const url = window.location.origin + '/catalog/' + (store.slug || '');
      const msg = 'Hai! Yuk lihat koleksi terbaru kami:\\n\\n*' + (store.name || 'Fashion Store') + '*\\n' + url + '\\n\\nPesan langsung via WhatsApp!';
      window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
    }

    function shareGeneral() {
      const store = getStore();
      const url = window.location.origin + '/catalog/' + (store.slug || '');
      if (navigator.share) {
        navigator.share({ title: store.name + ' - Katalog Online', text: 'Lihat koleksi fashion terbaru!', url: url });
      } else { copyCatalogLink(); }
    }

    loadStoreInfo();
  </script>`
  
  return fashionLayout('Pengaturan', content, 'settings')
}
