// Catalog Management Page
import { fashionLayout } from '../layout'

export function catalogManagePage(): string {
  const content = `
  <div class="py-6 space-y-4" id="catalogContent">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-heading font-bold text-xl">Katalog Produk</h1>
        <p class="text-xs text-gray-500">Kelola produk toko Anda</p>
      </div>
      <div class="flex gap-2">
        <button onclick="shareCatalog()" class="text-xs px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">
          <i class="fa-brands fa-whatsapp mr-1"></i>Share
        </button>
        <button onclick="showAddModal()" class="text-xs px-3 py-1.5 rounded-lg fk-gradient text-white">
          <i class="fa-solid fa-plus mr-1"></i>Tambah
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-4 gap-2">
      <div class="glass-card rounded-lg p-3 text-center">
        <div id="statTotal" class="font-heading font-bold text-lg text-fk-purple">-</div>
        <div class="text-[10px] text-gray-500">Total</div>
      </div>
      <div class="glass-card rounded-lg p-3 text-center">
        <div id="statActive" class="font-heading font-bold text-lg text-green-400">-</div>
        <div class="text-[10px] text-gray-500">Aktif</div>
      </div>
      <div class="glass-card rounded-lg p-3 text-center">
        <div id="statLow" class="font-heading font-bold text-lg text-amber-400">-</div>
        <div class="text-[10px] text-gray-500">Stok Tipis</div>
      </div>
      <div class="glass-card rounded-lg p-3 text-center">
        <div id="statOut" class="font-heading font-bold text-lg text-red-400">-</div>
        <div class="text-[10px] text-gray-500">Habis</div>
      </div>
    </div>

    <!-- Search & Filters -->
    <div class="flex gap-2">
      <div class="flex-1 relative">
        <i class="fa-solid fa-search absolute left-3 top-3 text-gray-500 text-sm"></i>
        <input type="text" id="searchInput" placeholder="Cari produk..." oninput="filterCatalog()" class="w-full pl-9 pr-4 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm">
      </div>
      <select id="catFilter" onchange="filterCatalog()" class="px-3 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm text-gray-400">
        <option value="all">Semua</option>
        <option value="gamis">Gamis</option>
        <option value="hijab">Hijab</option>
        <option value="daster">Daster</option>
        <option value="kemeja">Kemeja</option>
        <option value="rok">Rok</option>
        <option value="celana">Celana</option>
        <option value="aksesoris">Aksesoris</option>
      </select>
    </div>

    <!-- Product Grid -->
    <div id="productGrid" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div class="col-span-2 text-center py-8"><i class="fa-solid fa-spinner fa-spin text-fk-purple"></i></div>
    </div>
  </div>

  <!-- Add/Edit Product Modal -->
  <div id="productModal" class="fixed inset-0 z-[60] hidden">
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeModal()"></div>
    <div class="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto glass-card rounded-t-2xl p-6 sm:max-w-lg sm:mx-auto sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl">
      <div class="flex items-center justify-between mb-4">
        <h3 id="modalTitle" class="font-heading font-bold text-lg">Tambah Produk</h3>
        <button onclick="closeModal()" class="text-gray-500 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
      </div>
      <div id="modalError" class="hidden mb-3 p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs"></div>
      <div class="space-y-3">
        <input type="hidden" id="editId">
        <div>
          <label class="text-xs text-gray-500 mb-1 block">Nama Produk *</label>
          <input type="text" id="pName" placeholder="Gamis Tie-Dye Orange" class="w-full px-3 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm">
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs text-gray-500 mb-1 block">Kategori *</label>
            <select id="pCategory" class="w-full px-3 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm">
              <option value="gamis">Gamis</option>
              <option value="hijab">Hijab</option>
              <option value="daster">Daster</option>
              <option value="kemeja">Kemeja</option>
              <option value="rok">Rok</option>
              <option value="celana">Celana</option>
              <option value="aksesoris">Aksesoris</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>
          <div>
            <label class="text-xs text-gray-500 mb-1 block">Stok</label>
            <input type="number" id="pStock" value="0" min="0" class="w-full px-3 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm">
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs text-gray-500 mb-1 block">Harga Jual (Rp) *</label>
            <input type="number" id="pPrice" placeholder="125000" min="0" class="w-full px-3 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm">
          </div>
          <div>
            <label class="text-xs text-gray-500 mb-1 block">Harga Modal (Rp)</label>
            <input type="number" id="pCost" placeholder="85000" min="0" class="w-full px-3 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm">
          </div>
        </div>
        <div>
          <label class="text-xs text-gray-500 mb-1 block">Ukuran (pisah koma)</label>
          <input type="text" id="pSizes" placeholder="S, M, L, XL" class="w-full px-3 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm">
        </div>
        <div>
          <label class="text-xs text-gray-500 mb-1 block">Warna (pisah koma)</label>
          <input type="text" id="pColors" placeholder="Hitam, Putih, Navy" class="w-full px-3 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm">
        </div>
        <div>
          <label class="text-xs text-gray-500 mb-1 block">URL Gambar</label>
          <input type="text" id="pImage" placeholder="https://..." class="w-full px-3 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm">
        </div>
        <div>
          <label class="text-xs text-gray-500 mb-1 block">Deskripsi</label>
          <textarea id="pDesc" placeholder="Deskripsi produk..." class="w-full px-3 py-2 rounded-lg bg-empire-dark border border-white/10 text-sm resize-none h-16"></textarea>
        </div>
        <button onclick="saveProduct()" id="btnSaveProduct" class="w-full py-3 rounded-xl fk-gradient text-white font-heading font-bold text-sm">
          <i class="fa-solid fa-save mr-2"></i>Simpan Produk
        </button>
      </div>
    </div>
  </div>

  <script>
    let allProducts = [];

    async function loadCatalog() {
      try {
        const res = await apiFetch('/api/products');
        allProducts = res.data || [];
        updateStats();
        renderCatalog(allProducts);
      } catch(e) {
        document.getElementById('productGrid').innerHTML = '<p class="col-span-2 text-sm text-red-400 text-center py-8">Gagal memuat: ' + e.message + '</p>';
      }
    }

    function updateStats() {
      document.getElementById('statTotal').textContent = allProducts.length;
      document.getElementById('statActive').textContent = allProducts.filter(p => p.is_active).length;
      document.getElementById('statLow').textContent = allProducts.filter(p => p.is_active && p.stock > 0 && p.stock <= 5).length;
      document.getElementById('statOut').textContent = allProducts.filter(p => p.stock === 0).length;
    }

    function renderCatalog(products) {
      const grid = document.getElementById('productGrid');
      if (products.length === 0) {
        grid.innerHTML = '<div class="col-span-2 text-center py-12"><i class="fa-solid fa-box-open text-3xl text-gray-600 mb-3"></i><p class="text-sm text-gray-500">Belum ada produk</p><button onclick="showAddModal()" class="mt-3 px-4 py-2 rounded-lg fk-gradient text-white text-xs">+ Tambah Produk Pertama</button></div>';
        return;
      }
      
      const catColors = {gamis:'#EC4899',hijab:'#8B5CF6',daster:'#F97316',kemeja:'#3B82F6',rok:'#14B8A6',celana:'#6366F1',aksesoris:'#F43F5E',lainnya:'#6B7280'};
      
      grid.innerHTML = products.map(p => {
        const cc = catColors[p.category] || '#6B7280';
        const profit = p.cost_price ? Math.round(((p.price - p.cost_price) / p.price) * 100) : 0;
        const sizes = Array.isArray(p.sizes) ? p.sizes : (typeof p.sizes === 'string' ? JSON.parse(p.sizes || '[]') : []);
        return \`
        <div class="glass-card rounded-xl p-4 border border-white/5 card-hover">
          <div class="flex items-start justify-between mb-2">
            <span class="text-[10px] px-2 py-0.5 rounded-full font-medium" style="background:\${cc}15;color:\${cc}">\${p.category}</span>
            <div class="flex gap-1">
              \${p.is_featured ? '<span class="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400">⭐</span>' : ''}
              \${p.stock <= 5 && p.stock > 0 ? '<span class="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/15 text-red-400">Low</span>' : ''}
              \${p.stock === 0 ? '<span class="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/15 text-red-400">Habis</span>' : ''}
            </div>
          </div>
          <h3 class="font-medium text-sm mb-1">\${p.name}</h3>
          <div class="flex items-center gap-2 mb-2">
            <span class="font-mono font-bold text-fk-purple">\${formatRupiah(p.price)}</span>
            \${profit > 0 ? '<span class="text-[10px] text-green-400">+' + profit + '%</span>' : ''}
          </div>
          <div class="flex items-center justify-between text-[10px] text-gray-500 mb-2">
            <span>Stok: \${p.stock}</span>
            <span>Terjual: \${p.total_sold || 0}</span>
          </div>
          \${sizes.length > 0 ? '<div class="flex flex-wrap gap-1 mb-2">' + sizes.map(s => '<span class="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400">' + s + '</span>').join('') + '</div>' : ''}
          <div class="flex gap-2 mt-2">
            <button onclick="editProduct('\${p.id}')" class="flex-1 text-xs py-1.5 rounded-lg bg-fk-purple/10 text-fk-purple border border-fk-purple/20 hover:bg-fk-purple/20">
              <i class="fa-solid fa-pen-to-square mr-1"></i>Edit
            </button>
            <button onclick="deleteProduct('\${p.id}', '\${p.name}')" class="text-xs py-1.5 px-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>\`;
      }).join('');
    }

    function filterCatalog() {
      const q = document.getElementById('searchInput').value.toLowerCase();
      const cat = document.getElementById('catFilter').value;
      let filtered = allProducts;
      if (cat !== 'all') filtered = filtered.filter(p => p.category === cat);
      if (q) filtered = filtered.filter(p => p.name.toLowerCase().includes(q));
      renderCatalog(filtered);
    }

    function showAddModal() {
      document.getElementById('modalTitle').textContent = 'Tambah Produk';
      document.getElementById('editId').value = '';
      document.getElementById('pName').value = '';
      document.getElementById('pCategory').value = 'gamis';
      document.getElementById('pPrice').value = '';
      document.getElementById('pCost').value = '';
      document.getElementById('pStock').value = '0';
      document.getElementById('pSizes').value = '';
      document.getElementById('pColors').value = '';
      document.getElementById('pImage').value = '';
      document.getElementById('pDesc').value = '';
      document.getElementById('modalError').classList.add('hidden');
      document.getElementById('productModal').classList.remove('hidden');
    }

    function editProduct(id) {
      const p = allProducts.find(x => x.id === id);
      if (!p) return;
      document.getElementById('modalTitle').textContent = 'Edit Produk';
      document.getElementById('editId').value = p.id;
      document.getElementById('pName').value = p.name;
      document.getElementById('pCategory').value = p.category;
      document.getElementById('pPrice').value = p.price;
      document.getElementById('pCost').value = p.cost_price || '';
      document.getElementById('pStock').value = p.stock;
      const sizes = Array.isArray(p.sizes) ? p.sizes : (typeof p.sizes === 'string' ? JSON.parse(p.sizes || '[]') : []);
      const colors = Array.isArray(p.colors) ? p.colors : (typeof p.colors === 'string' ? JSON.parse(p.colors || '[]') : []);
      document.getElementById('pSizes').value = sizes.join(', ');
      document.getElementById('pColors').value = colors.join(', ');
      document.getElementById('pImage').value = p.image_url || '';
      document.getElementById('pDesc').value = p.description || '';
      document.getElementById('modalError').classList.add('hidden');
      document.getElementById('productModal').classList.remove('hidden');
    }

    function closeModal() {
      document.getElementById('productModal').classList.add('hidden');
    }

    async function saveProduct() {
      const errEl = document.getElementById('modalError');
      const name = document.getElementById('pName').value.trim();
      const category = document.getElementById('pCategory').value;
      const price = document.getElementById('pPrice').value;
      
      if (!name || !price) {
        errEl.textContent = 'Nama dan harga wajib diisi!';
        errEl.classList.remove('hidden');
        return;
      }
      
      const btn = document.getElementById('btnSaveProduct');
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Menyimpan...';
      errEl.classList.add('hidden');
      
      const sizesStr = document.getElementById('pSizes').value;
      const colorsStr = document.getElementById('pColors').value;
      
      const body = {
        name,
        category,
        price,
        cost_price: document.getElementById('pCost').value || '0',
        stock: document.getElementById('pStock').value || '0',
        sizes: sizesStr ? sizesStr.split(',').map(s => s.trim()).filter(Boolean) : [],
        colors: colorsStr ? colorsStr.split(',').map(s => s.trim()).filter(Boolean) : [],
        image_url: document.getElementById('pImage').value.trim(),
        description: document.getElementById('pDesc').value.trim()
      };
      
      const editId = document.getElementById('editId').value;
      
      try {
        if (editId) {
          await apiFetch('/api/products/' + editId, { method: 'PUT', body: JSON.stringify(body) });
          showToast('Produk berhasil diupdate!');
        } else {
          await apiFetch('/api/products', { method: 'POST', body: JSON.stringify(body) });
          showToast('Produk berhasil ditambahkan!');
        }
        closeModal();
        await loadCatalog();
      } catch(e) {
        errEl.textContent = e.message;
        errEl.classList.remove('hidden');
      }
      
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-save mr-2"></i>Simpan Produk';
    }

    async function deleteProduct(id, name) {
      if (!confirm('Hapus produk "' + name + '"?')) return;
      try {
        await apiFetch('/api/products/' + id, { method: 'DELETE' });
        showToast('Produk dihapus!');
        await loadCatalog();
      } catch(e) {
        showToast('Gagal menghapus: ' + e.message, 'error');
      }
    }

    function shareCatalog() {
      const store = getStore();
      if (!store.slug) { showToast('Slug toko belum ada', 'error'); return; }
      const url = window.location.origin + '/catalog/' + store.slug;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
        showToast('Link katalog disalin!');
      }
      const waMsg = 'Lihat katalog produk kami:\\n' + url;
      window.open('https://wa.me/?text=' + encodeURIComponent(waMsg), '_blank');
    }

    // Init
    loadCatalog();
  </script>`
  
  return fashionLayout('Katalog', content, 'catalog')
}
