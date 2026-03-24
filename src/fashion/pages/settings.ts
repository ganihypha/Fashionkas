// Settings Page v1.1
// Enhanced with Fonnte WhatsApp setup, data export, account info
import { fashionLayout } from '../layout'

export function settingsPage(): string {
  const content = `
  <div class="py-6 space-y-5" id="settingsContent">
    <div><h1 class="font-heading font-bold text-xl">Pengaturan</h1><p class="text-xs text-gray-500">Kelola profil toko, keamanan & integrasi</p></div>

    <!-- Store Profile (Editable) -->
    <div class="glass-card rounded-xl p-5 fk-border">
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-heading font-bold text-sm"><i class="fa-solid fa-store mr-2 text-fk-purple"></i>Profil Toko</h2>
        <button onclick="toggleEditStore()" id="editStoreBtn" class="text-xs px-3 py-1.5 rounded-lg bg-fk-purple/10 text-fk-purple border border-fk-purple/20 hover:bg-fk-purple/20 transition-all">
          <i class="fa-solid fa-pen mr-1"></i>Edit
        </button>
      </div>
      <div id="storeView" class="space-y-3">
        <div class="text-center py-4"><i class="fa-solid fa-spinner fa-spin text-fk-purple"></i></div>
      </div>
      <div id="storeEdit" class="space-y-3 hidden">
        <div>
          <label class="text-xs text-gray-400 font-medium mb-1 block">Nama Toko</label>
          <input type="text" id="editName" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm focus:border-fk-purple/50">
        </div>
        <div>
          <label class="text-xs text-gray-400 font-medium mb-1 block">Deskripsi Toko</label>
          <textarea id="editDesc" class="w-full px-3 py-2 rounded-xl bg-empire-dark border border-white/10 text-sm resize-none h-16 focus:border-fk-purple/50" placeholder="Gamis, Hijab & Fashion Muslim terlengkap..."></textarea>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs text-gray-400 font-medium mb-1 block">Nama Pemilik</label>
            <input type="text" id="editOwner" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm focus:border-fk-purple/50">
          </div>
          <div>
            <label class="text-xs text-gray-400 font-medium mb-1 block">Kota</label>
            <input type="text" id="editCity" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm focus:border-fk-purple/50">
          </div>
        </div>
        <div class="flex gap-2 pt-1">
          <button onclick="saveStoreProfile()" id="btnSaveStore" class="flex-1 py-2.5 rounded-xl fk-gradient text-white text-xs font-bold shadow-sm shadow-fk-purple/20">
            <i class="fa-solid fa-save mr-1"></i>Simpan
          </button>
          <button onclick="toggleEditStore()" class="px-4 py-2.5 rounded-xl bg-white/5 text-gray-400 text-xs border border-white/5">Batal</button>
        </div>
      </div>
    </div>

    <!-- Catalog Sharing -->
    <div class="glass-card rounded-xl p-5 fk-border">
      <h2 class="font-heading font-bold text-sm mb-4"><i class="fa-solid fa-share-nodes mr-2 text-fk-purple"></i>Bagikan Katalog</h2>
      <div class="space-y-3">
        <div class="glass-card rounded-xl p-3 border border-white/5">
          <p class="text-[10px] text-gray-500 mb-2">Link Katalog Anda:</p>
          <div class="flex items-center gap-2">
            <input type="text" id="catalogUrl" readonly class="flex-1 px-3 py-2 rounded-lg bg-empire-dark border border-white/10 text-xs font-mono text-fk-purple truncate">
            <button onclick="copyCatalogLink()" class="px-3 py-2 rounded-lg bg-fk-purple/10 text-fk-purple border border-fk-purple/20 text-xs hover:bg-fk-purple/20 transition-all">
              <i class="fa-solid fa-copy"></i>
            </button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <button onclick="shareWhatsApp()" class="py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:opacity-90 transition-all">
            <i class="fa-brands fa-whatsapp mr-1"></i>Share WA
          </button>
          <button onclick="shareGeneral()" class="py-3 rounded-xl bg-fk-purple/10 text-fk-purple border border-fk-purple/20 text-xs font-bold hover:bg-fk-purple/20 transition-all">
            <i class="fa-solid fa-share-from-square mr-1"></i>Share Lainnya
          </button>
        </div>
      </div>
    </div>

    <!-- WhatsApp Automation (Fonnte) -->
    <div class="glass-card rounded-xl p-5 border border-green-500/20">
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-heading font-bold text-sm"><i class="fa-brands fa-whatsapp mr-2 text-green-400"></i>WhatsApp Automation</h2>
        <span id="fonnteBadge" class="text-[10px] px-2 py-0.5 rounded-full bg-gray-500/15 text-gray-400">Belum Aktif</span>
      </div>
      <p class="text-xs text-gray-400 mb-3">Kirim struk, notifikasi pengiriman, dan promo otomatis via WhatsApp menggunakan Fonnte API.</p>
      <div class="space-y-3">
        <div class="glass-card rounded-xl p-3 border border-white/5">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <i class="fa-brands fa-whatsapp text-green-400 text-lg"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium">Fonnte.com</p>
              <p class="text-[10px] text-gray-500">Rp 45.000/bulan - Unlimited WA Message</p>
            </div>
            <a href="https://fonnte.com" target="_blank" class="text-xs text-green-400 hover:underline">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </div>
        <div class="bg-amber-500/5 rounded-xl p-3 border border-amber-500/10">
          <p class="text-[10px] text-amber-400 mb-1"><i class="fa-solid fa-circle-info mr-1"></i>Cara Setup:</p>
          <ol class="text-[10px] text-gray-400 space-y-1 pl-4 list-decimal">
            <li>Daftar di <a href="https://fonnte.com" target="_blank" class="text-green-400 hover:underline">fonnte.com</a></li>
            <li>Hubungkan nomor WhatsApp Anda</li>
            <li>Copy token API dari dashboard Fonnte</li>
            <li>FashionKas otomatis kirim struk & notifikasi!</li>
          </ol>
        </div>
        <div class="space-y-2">
          <p class="text-xs text-gray-400 font-medium">Fitur WA Otomatis:</p>
          <div class="grid grid-cols-2 gap-2">
            <div class="flex items-center gap-2 text-xs text-gray-300"><i class="fa-solid fa-receipt text-green-400 text-[10px]"></i>Auto-kirim struk</div>
            <div class="flex items-center gap-2 text-xs text-gray-300"><i class="fa-solid fa-truck text-blue-400 text-[10px]"></i>Notif pengiriman</div>
            <div class="flex items-center gap-2 text-xs text-gray-300"><i class="fa-solid fa-bullhorn text-amber-400 text-[10px]"></i>Broadcast promo</div>
            <div class="flex items-center gap-2 text-xs text-gray-300"><i class="fa-solid fa-reply text-fk-purple text-[10px]"></i>Auto-reply</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Export -->
    <div class="glass-card rounded-xl p-5 fk-border">
      <h2 class="font-heading font-bold text-sm mb-4"><i class="fa-solid fa-file-export mr-2 text-fk-purple"></i>Export Data</h2>
      <div class="space-y-2">
        <button onclick="exportProducts()" class="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-shirt text-fk-purple text-sm"></i>
            <span class="text-sm">Export Produk</span>
          </div>
          <span class="text-[10px] text-gray-500">CSV</span>
        </button>
        <button onclick="exportOrders()" class="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-box text-cyan-400 text-sm"></i>
            <span class="text-sm">Export Pesanan</span>
          </div>
          <span class="text-[10px] text-gray-500">CSV</span>
        </button>
        <button onclick="exportCustomers()" class="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-users text-green-400 text-sm"></i>
            <span class="text-sm">Export Customer</span>
          </div>
          <span class="text-[10px] text-gray-500">CSV</span>
        </button>
      </div>
    </div>

    <!-- Social Links -->
    <div class="glass-card rounded-xl p-5 fk-border">
      <h2 class="font-heading font-bold text-sm mb-4"><i class="fa-solid fa-link mr-2 text-fk-purple"></i>Link Penting</h2>
      <div class="space-y-2">
        <a href="https://www.instagram.com/nurulannisaff" target="_blank" class="flex items-center justify-between py-2.5 hover:bg-white/5 px-3 rounded-xl transition">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"><i class="fa-brands fa-instagram text-white text-sm"></i></div>
            <div><p class="text-sm font-medium">Nurul Annisa</p><p class="text-[10px] text-gray-500">@nurulannisaff</p></div>
          </div>
          <i class="fa-solid fa-arrow-up-right-from-square text-gray-600 text-xs"></i>
        </a>
        <a href="https://github.com/ganihypha" target="_blank" class="flex items-center justify-between py-2.5 hover:bg-white/5 px-3 rounded-xl transition">
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
        <div>
          <label class="text-xs text-gray-400 mb-1 block">PIN Lama</label>
          <input type="password" id="currentPin" maxlength="6" placeholder="****" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm focus:border-fk-purple/50 font-mono text-center tracking-widest">
        </div>
        <div>
          <label class="text-xs text-gray-400 mb-1 block">PIN Baru (min 4 digit)</label>
          <input type="password" id="newPin" maxlength="6" placeholder="****" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm focus:border-fk-purple/50 font-mono text-center tracking-widest">
        </div>
        <button onclick="changePin()" id="btnChangePin" class="w-full py-2.5 rounded-xl bg-fk-purple/10 text-fk-purple border border-fk-purple/20 text-xs font-bold hover:bg-fk-purple/20 transition-all">
          <i class="fa-solid fa-key mr-1"></i>Ubah PIN
        </button>
      </div>
    </div>

    <!-- App Info -->
    <div class="glass-card rounded-xl p-5 fk-border">
      <h2 class="font-heading font-bold text-sm mb-4"><i class="fa-solid fa-info-circle mr-2 text-fk-purple"></i>Tentang App</h2>
      <div class="space-y-2">
        <div class="flex justify-between text-sm"><span class="text-gray-400">Versi</span><span class="font-mono text-fk-purple">2.1.0</span></div>
        <div class="flex justify-between text-sm"><span class="text-gray-400">Platform</span><span class="text-gray-300">Cloudflare Workers</span></div>
        <div class="flex justify-between text-sm"><span class="text-gray-400">Database</span><span class="text-gray-300">Supabase PostgreSQL</span></div>
        <div class="flex justify-between text-sm"><span class="text-gray-400">WhatsApp</span><span class="text-gray-300">Fonnte API</span></div>
        <div class="flex justify-between text-sm"><span class="text-gray-400">Status</span><span class="text-green-400"><i class="fa-solid fa-circle text-[8px] mr-1"></i>Online</span></div>
      </div>
    </div>

    <!-- Beta Badge -->
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
          <div class="flex items-center gap-2 text-xs text-gray-300"><i class="fa-solid fa-check-circle text-green-400"></i>Export Data</div>
        </div>
      </div>
    </div>

    <!-- Logout -->
    <div class="glass-card rounded-xl p-5 border border-red-500/20">
      <h2 class="font-heading font-bold text-sm mb-3 text-red-400"><i class="fa-solid fa-triangle-exclamation mr-2"></i>Logout</h2>
      <p class="text-xs text-gray-500 mb-3">Keluar dari akun. Data Anda tetap aman di server.</p>
      <button onclick="logout()" class="w-full py-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-sm hover:bg-red-500/20 transition font-bold">
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
        const url = window.location.origin + '/catalog/' + storeDataLocal.slug;
        document.getElementById('catalogUrl').value = url;
      } catch(e) {
        document.getElementById('storeView').innerHTML = '<p class="text-sm text-red-400"><i class="fa-solid fa-exclamation-circle mr-1"></i>Gagal memuat: ' + e.message + '</p>';
      }
    }

    function renderStoreView() {
      const s = storeDataLocal;
      document.getElementById('storeView').innerHTML = \`
        <div class="flex items-center gap-4 mb-4">
          <div class="w-16 h-16 rounded-xl fk-gradient flex items-center justify-center text-white font-heading font-bold text-xl shadow-lg shadow-fk-purple/20">
            \${s.name ? s.name.substring(0, 2).toUpperCase() : 'FK'}
          </div>
          <div>
            <h3 class="font-heading font-bold text-lg">\${s.name}</h3>
            <p class="text-xs text-gray-500">\${s.city || 'Indonesia'} | <span class="text-fk-purple font-bold">\${(s.tier || 'beta').toUpperCase()}</span></p>
            \${s.description ? '<p class="text-xs text-gray-400 mt-0.5">' + s.description + '</p>' : ''}
          </div>
        </div>
        <div class="space-y-2">
          <div class="flex justify-between py-1.5 border-b border-white/5 text-sm"><span class="text-gray-500">Slug</span><span class="font-mono text-xs text-fk-purple">\${s.slug || '-'}</span></div>
          <div class="flex justify-between py-1.5 border-b border-white/5 text-sm"><span class="text-gray-500">Pemilik</span><span>\${s.owner_name || '-'}</span></div>
          <div class="flex justify-between py-1.5 border-b border-white/5 text-sm"><span class="text-gray-500">WhatsApp</span><span class="text-gray-300 font-mono text-xs">\${s.owner_phone || '-'}</span></div>
          <div class="flex justify-between py-1.5 text-sm"><span class="text-gray-500">Tier</span><span class="px-2 py-0.5 rounded-full fk-gradient text-white text-xs font-bold">\${(s.tier || 'BETA').toUpperCase()}</span></div>
        </div>\`;
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

    // CSV Export functions
    async function exportProducts() {
      try {
        showToast('Mengexport produk...');
        const res = await apiFetch('/api/products');
        const products = res.data || [];
        const headers = ['Nama','Kategori','Harga Jual','Harga Modal','Stok','Terjual','Ukuran','Warna','Status'];
        const parseSizes = (s) => { try { return Array.isArray(s) ? s.join(';') : JSON.parse(s||'[]').join(';'); } catch { return ''; } };
        const rows = products.map(p => [p.name, p.category, p.price, p.cost_price||0, p.stock, p.total_sold||0, parseSizes(p.sizes), parseSizes(p.colors), p.is_active?'Aktif':'Nonaktif']);
        downloadCSV(headers, rows, 'fashionkas_produk.csv');
        showToast('Export produk berhasil!');
      } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
    }

    async function exportOrders() {
      try {
        showToast('Mengexport pesanan...');
        const res = await apiFetch('/api/orders');
        const orders = res.data || [];
        const headers = ['No Order','Pelanggan','Phone','Total','Profit','Bayar','Status Bayar','Status Kirim','Tanggal'];
        const rows = orders.map(o => [o.order_number, o.customer_name, o.customer_phone, o.total_amount, o.total_profit||0, o.payment_method, o.payment_status, o.shipping_status, o.created_at]);
        downloadCSV(headers, rows, 'fashionkas_pesanan.csv');
        showToast('Export pesanan berhasil!');
      } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
    }

    async function exportCustomers() {
      try {
        showToast('Mengexport customer...');
        const res = await apiFetch('/api/customers');
        const customers = res.data || [];
        const headers = ['Nama','Phone','Total Order','Total Belanja','Segment','Order Terakhir'];
        const rows = customers.map(c => [c.name, c.phone, c.total_orders||0, c.total_spent||0, c.segment||'new', c.last_order_at||'-']);
        downloadCSV(headers, rows, 'fashionkas_customer.csv');
        showToast('Export customer berhasil!');
      } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
    }

    function downloadCSV(headers, rows, filename) {
      const bom = '\\uFEFF';
      const csv = bom + headers.join(',') + '\\n' + rows.map(r => r.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(',')).join('\\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = filename; a.click();
      URL.revokeObjectURL(url);
    }

    loadStoreInfo();
  </script>`
  
  return fashionLayout('Pengaturan', content, 'settings')
}
