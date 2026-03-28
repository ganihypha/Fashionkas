// Customer Management Page - FashionKas v3.0
// Database pelanggan dengan segment, search, dan WA integration
import { fashionLayout } from '../layout'

export function customersPage(): string {
  const content = `
  <div class="py-6 space-y-4" id="customersContent">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-heading font-bold text-xl">Pelanggan</h1>
        <p class="text-xs text-gray-500">Database pelanggan toko Anda</p>
      </div>
      <button onclick="showAddCustomer()" class="text-xs px-3 py-1.5 rounded-lg fk-gradient text-white font-bold">
        <i class="fa-solid fa-user-plus mr-1"></i>Tambah
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-4 gap-2">
      <div class="glass-card rounded-xl p-3 text-center fk-border">
        <div id="statTotal" class="font-heading font-bold text-lg text-fk-purple">-</div>
        <div class="text-[10px] text-gray-500">Total</div>
      </div>
      <div class="glass-card rounded-xl p-3 text-center">
        <div id="statActive" class="font-heading font-bold text-lg text-green-400">-</div>
        <div class="text-[10px] text-gray-500">Aktif</div>
      </div>
      <div class="glass-card rounded-xl p-3 text-center">
        <div id="statVIP" class="font-heading font-bold text-lg text-amber-400">-</div>
        <div class="text-[10px] text-gray-500">VIP</div>
      </div>
      <div class="glass-card rounded-xl p-3 text-center">
        <div id="statRevenue" class="font-heading font-bold text-sm text-fk-purple">-</div>
        <div class="text-[10px] text-gray-500">Revenue</div>
      </div>
    </div>

    <!-- Search & Filter -->
    <div class="flex gap-2">
      <div class="flex-1 relative">
        <i class="fa-solid fa-search absolute left-3 top-3 text-gray-500 text-sm"></i>
        <input type="text" id="searchInput" placeholder="Cari nama / no WA..." oninput="filterCustomers()" class="w-full pl-9 pr-4 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm">
      </div>
      <select id="segFilter" onchange="filterCustomers()" class="px-3 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm text-gray-400">
        <option value="all">Semua</option>
        <option value="new">Baru</option>
        <option value="active">Aktif</option>
        <option value="vip">VIP</option>
        <option value="dormant">Dormant</option>
      </select>
    </div>

    <!-- Customer List -->
    <div id="customerList">
      <div class="text-center py-12"><i class="fa-solid fa-spinner fa-spin text-fk-purple text-2xl"></i></div>
    </div>
  </div>

  <!-- Add/Edit Customer Modal -->
  <div id="customerModal" class="fixed inset-0 z-[60] hidden">
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeModal()"></div>
    <div class="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto glass-card rounded-t-2xl p-6 sm:max-w-lg sm:mx-auto sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl border border-white/5">
      <div class="flex items-center justify-between mb-4">
        <h3 id="modalTitle" class="font-heading font-bold text-lg">Tambah Pelanggan</h3>
        <button onclick="closeModal()" class="text-gray-500 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
      </div>
      <div class="space-y-3">
        <input type="hidden" id="editId">
        <div>
          <label class="text-xs text-gray-400 font-medium mb-1 block">Nama *</label>
          <input type="text" id="cName" placeholder="Nama pelanggan" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm">
        </div>
        <div>
          <label class="text-xs text-gray-400 font-medium mb-1 block">No WhatsApp *</label>
          <input type="tel" id="cPhone" placeholder="08123456789" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm font-mono">
        </div>
        <div>
          <label class="text-xs text-gray-400 font-medium mb-1 block">Alamat</label>
          <input type="text" id="cAddress" placeholder="Alamat pengiriman" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm">
        </div>
        <div>
          <label class="text-xs text-gray-400 font-medium mb-1 block">Segment</label>
          <select id="cSegment" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm">
            <option value="new">Baru</option>
            <option value="active">Aktif</option>
            <option value="vip">VIP</option>
            <option value="dormant">Dormant</option>
          </select>
        </div>
        <div>
          <label class="text-xs text-gray-400 font-medium mb-1 block">Catatan</label>
          <textarea id="cNotes" placeholder="Catatan tentang pelanggan ini..." class="w-full px-3 py-2 rounded-xl bg-empire-dark border border-white/10 text-sm resize-none h-16"></textarea>
        </div>
        <button onclick="saveCustomer()" id="btnSave" class="w-full py-3.5 rounded-xl fk-gradient text-white font-heading font-bold text-sm shadow-lg shadow-fk-purple/25">
          <i class="fa-solid fa-save mr-2"></i>Simpan
        </button>
      </div>
    </div>
  </div>

  <!-- Customer Detail Modal -->
  <div id="detailModal" class="fixed inset-0 z-[60] hidden">
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeDetail()"></div>
    <div class="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto glass-card rounded-t-2xl p-6 sm:max-w-lg sm:mx-auto sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl border border-white/5">
      <div id="detailContent"></div>
    </div>
  </div>

  <script>
    let allCustomers = [];

    async function loadCustomers() {
      try {
        const res = await apiFetch('/api/customers');
        allCustomers = res.data || [];
        const stats = res.stats || {};
        
        document.getElementById('statTotal').textContent = stats.total || 0;
        document.getElementById('statActive').textContent = stats.active || 0;
        document.getElementById('statVIP').textContent = stats.vip || 0;
        document.getElementById('statRevenue').textContent = formatRupiah(stats.total_revenue || 0);
        
        renderCustomers(allCustomers);
      } catch(e) {
        document.getElementById('customerList').innerHTML = '<p class="text-sm text-red-400 text-center py-8">' + e.message + '</p>';
      }
    }

    function getSegmentBadge(seg) {
      const map = {
        'new': { bg: 'bg-blue-500/15', text: 'text-blue-400', label: 'Baru' },
        'active': { bg: 'bg-green-500/15', text: 'text-green-400', label: 'Aktif' },
        'vip': { bg: 'bg-amber-500/15', text: 'text-amber-400', label: 'VIP' },
        'dormant': { bg: 'bg-gray-500/15', text: 'text-gray-400', label: 'Dormant' }
      };
      const s = map[seg] || map['new'];
      return '<span class="text-[10px] px-2 py-0.5 rounded-full ' + s.bg + ' ' + s.text + '">' + s.label + '</span>';
    }

    function autoSegment(c) {
      if ((c.total_orders || 0) >= 5) return 'vip';
      const thirtyDaysAgo = new Date(Date.now() - 30*24*60*60*1000).toISOString();
      if (c.last_order_at && c.last_order_at >= thirtyDaysAgo) return 'active';
      if ((c.total_orders || 0) === 0) return 'new';
      return 'dormant';
    }

    function renderCustomers(customers) {
      const el = document.getElementById('customerList');
      if (customers.length === 0) {
        el.innerHTML = '<div class="text-center py-12"><i class="fa-solid fa-users text-4xl text-gray-600 mb-3"></i><p class="text-sm text-gray-500 mb-2">Belum ada pelanggan</p><p class="text-xs text-gray-600">Pelanggan akan otomatis tersimpan saat membuat pesanan</p></div>';
        return;
      }

      el.innerHTML = customers.map(c => {
        const seg = autoSegment(c);
        const waPhone = c.phone ? (c.phone.startsWith('0') ? '62' + c.phone.slice(1) : c.phone) : '';
        const lastOrder = c.last_order_at ? formatDate(c.last_order_at) : 'Belum pernah';
        
        return '<div class="glass-card rounded-xl p-4 mb-3 border border-white/5 card-hover cursor-pointer" onclick="showDetail(\\'' + c.id + '\\')">' +
          '<div class="flex items-center justify-between">' +
            '<div class="flex items-center gap-3">' +
              '<div class="w-10 h-10 rounded-full bg-fk-purple/10 flex items-center justify-center text-fk-purple font-bold text-sm">' + (c.name || 'U')[0].toUpperCase() + '</div>' +
              '<div>' +
                '<p class="text-sm font-medium">' + (c.name || 'Unknown') + '</p>' +
                '<p class="text-[10px] text-gray-500 font-mono">' + (c.phone || '-') + '</p>' +
              '</div>' +
            '</div>' +
            '<div class="text-right">' +
              getSegmentBadge(seg) +
            '</div>' +
          '</div>' +
          '<div class="flex items-center justify-between mt-3 text-[10px] text-gray-500">' +
            '<span><i class="fa-solid fa-box mr-1"></i>' + (c.total_orders || 0) + ' pesanan</span>' +
            '<span><i class="fa-solid fa-coins mr-1"></i>' + formatRupiah(c.total_spent || 0) + '</span>' +
            '<span><i class="fa-solid fa-clock mr-1"></i>' + lastOrder + '</span>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    function filterCustomers() {
      const q = (document.getElementById('searchInput').value || '').toLowerCase();
      const seg = document.getElementById('segFilter').value;
      let filtered = [...allCustomers];
      if (q) filtered = filtered.filter(c => (c.name || '').toLowerCase().includes(q) || (c.phone || '').includes(q));
      if (seg !== 'all') {
        filtered = filtered.filter(c => {
          const s = autoSegment(c);
          return s === seg;
        });
      }
      renderCustomers(filtered);
    }

    function showAddCustomer() {
      document.getElementById('modalTitle').textContent = 'Tambah Pelanggan';
      document.getElementById('editId').value = '';
      ['cName','cPhone','cAddress','cNotes'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('cSegment').value = 'new';
      document.getElementById('customerModal').classList.remove('hidden');
    }

    function editCustomer(id) {
      const c = allCustomers.find(x => x.id === id);
      if (!c) return;
      document.getElementById('modalTitle').textContent = 'Edit Pelanggan';
      document.getElementById('editId').value = c.id;
      document.getElementById('cName').value = c.name || '';
      document.getElementById('cPhone').value = c.phone || '';
      document.getElementById('cAddress').value = c.address || '';
      document.getElementById('cSegment').value = autoSegment(c);
      document.getElementById('cNotes').value = c.notes || '';
      closeDetail();
      document.getElementById('customerModal').classList.remove('hidden');
    }

    function closeModal() { document.getElementById('customerModal').classList.add('hidden'); }
    function closeDetail() { document.getElementById('detailModal').classList.add('hidden'); }

    async function saveCustomer() {
      const name = document.getElementById('cName').value.trim();
      const phone = document.getElementById('cPhone').value.trim();
      if (!name || !phone) { showToast('Nama dan no WA wajib!', 'error'); return; }
      
      const btn = document.getElementById('btnSave');
      btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Menyimpan...';
      
      const body = {
        name, phone,
        address: document.getElementById('cAddress').value.trim(),
        segment: document.getElementById('cSegment').value,
        notes: document.getElementById('cNotes').value.trim()
      };
      
      const editId = document.getElementById('editId').value;
      try {
        if (editId) {
          await apiFetch('/api/customers/' + editId, { method: 'PUT', body: JSON.stringify(body) });
          showToast('Pelanggan diupdate!');
        } else {
          await apiFetch('/api/customers', { method: 'POST', body: JSON.stringify(body) });
          showToast('Pelanggan ditambahkan!');
        }
        closeModal();
        await loadCustomers();
      } catch(e) { showToast(e.message, 'error'); }
      btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-save mr-2"></i>Simpan';
    }

    async function showDetail(id) {
      const c = allCustomers.find(x => x.id === id);
      if (!c) return;
      const seg = autoSegment(c);
      const waPhone = c.phone ? (c.phone.startsWith('0') ? '62' + c.phone.slice(1) : c.phone) : '';
      
      document.getElementById('detailContent').innerHTML = 
        '<div class="flex items-center justify-between mb-4">' +
          '<h3 class="font-heading font-bold text-lg">' + (c.name || 'Unknown') + '</h3>' +
          '<button onclick="closeDetail()" class="text-gray-500 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>' +
        '</div>' +
        '<div class="space-y-3">' +
          '<div class="flex items-center gap-4">' +
            '<div class="w-14 h-14 rounded-full bg-fk-purple/10 flex items-center justify-center text-fk-purple font-bold text-xl">' + (c.name || 'U')[0].toUpperCase() + '</div>' +
            '<div>' +
              '<p class="text-sm font-medium">' + (c.name || 'Unknown') + '</p>' +
              '<p class="text-xs text-gray-500 font-mono">' + (c.phone || '-') + '</p>' +
              (c.address ? '<p class="text-xs text-gray-600 mt-0.5">' + c.address + '</p>' : '') +
            '</div>' +
          '</div>' +
          '<div class="grid grid-cols-3 gap-2">' +
            '<div class="glass-card rounded-lg p-3 text-center"><p class="font-mono font-bold text-fk-purple">' + (c.total_orders || 0) + '</p><p class="text-[10px] text-gray-500">Pesanan</p></div>' +
            '<div class="glass-card rounded-lg p-3 text-center"><p class="font-mono font-bold text-green-400">' + formatRupiah(c.total_spent || 0) + '</p><p class="text-[10px] text-gray-500">Total Belanja</p></div>' +
            '<div class="glass-card rounded-lg p-3 text-center">' + getSegmentBadge(seg) + '<p class="text-[10px] text-gray-500 mt-1">Segment</p></div>' +
          '</div>' +
          (c.notes ? '<div class="glass-card rounded-lg p-3"><p class="text-[10px] text-gray-500 uppercase mb-1">Catatan</p><p class="text-xs text-gray-300">' + c.notes + '</p></div>' : '') +
          '<div class="grid grid-cols-2 gap-2 pt-2">' +
            '<button onclick="editCustomer(\\'' + c.id + '\\')" class="text-xs py-2.5 rounded-lg bg-fk-purple/10 text-fk-purple border border-fk-purple/20 font-medium"><i class="fa-solid fa-pen mr-1"></i>Edit</button>' +
            (waPhone ? '<a href="https://wa.me/' + waPhone + '" target="_blank" class="text-xs py-2.5 rounded-lg bg-[#25D366] text-white text-center font-medium"><i class="fa-brands fa-whatsapp mr-1"></i>WA</a>' : '<span></span>') +
          '</div>' +
          '<button onclick="deleteCustomer(\\'' + c.id + '\\', \\'' + (c.name || '').replace(/'/g, "\\\\'") + '\\')" class="w-full text-xs py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 mt-1"><i class="fa-solid fa-trash mr-1"></i>Hapus Pelanggan</button>' +
        '</div>';
      document.getElementById('detailModal').classList.remove('hidden');
    }

    async function deleteCustomer(id, name) {
      if (!confirm('Hapus pelanggan "' + name + '"?')) return;
      try {
        await apiFetch('/api/customers/' + id, { method: 'DELETE' });
        showToast('Pelanggan dihapus');
        closeDetail();
        await loadCustomers();
      } catch(e) { showToast(e.message, 'error'); }
    }

    loadCustomers();
  </script>`

  return fashionLayout('Pelanggan', content, 'customers')
}
