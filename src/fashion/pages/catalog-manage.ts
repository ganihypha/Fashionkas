// Catalog Management Page v1.1
// Enhanced with image preview, featured toggle, bulk actions, better grid
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
        <button onclick="shareCatalog()" class="text-xs px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20">
          <i class="fa-brands fa-whatsapp mr-1"></i>Share
        </button>
        <button onclick="showAddModal()" class="text-xs px-3 py-1.5 rounded-lg fk-gradient text-white shadow-sm shadow-fk-purple/20">
          <i class="fa-solid fa-plus mr-1"></i>Tambah
        </button>
      </div>
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
        <div id="statLow" class="font-heading font-bold text-lg text-amber-400">-</div>
        <div class="text-[10px] text-gray-500">Stok Tipis</div>
      </div>
      <div class="glass-card rounded-xl p-3 text-center">
        <div id="statOut" class="font-heading font-bold text-lg text-red-400">-</div>
        <div class="text-[10px] text-gray-500">Habis</div>
      </div>
    </div>

    <!-- Catalog Value -->
    <div class="glass-card rounded-xl p-4 fk-border">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-[10px] text-gray-500 uppercase tracking-wider">Nilai Inventori</p>
          <p id="inventoryValue" class="font-heading font-bold text-xl text-fk-purple">Rp 0</p>
        </div>
        <div class="text-right">
          <p class="text-[10px] text-gray-500 uppercase tracking-wider">Est. Profit</p>
          <p id="inventoryProfit" class="font-heading font-bold text-lg text-green-400">Rp 0</p>
        </div>
      </div>
    </div>

    <!-- Search & Filters -->
    <div class="flex gap-2">
      <div class="flex-1 relative">
        <i class="fa-solid fa-search absolute left-3 top-3 text-gray-500 text-sm"></i>
        <input type="text" id="searchInput" placeholder="Cari produk..." oninput="filterCatalog()" class="w-full pl-9 pr-4 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm focus:border-fk-purple/50">
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
      <select id="sortFilter" onchange="filterCatalog()" class="px-3 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm text-gray-400">
        <option value="newest">Terbaru</option>
        <option value="price_asc">Harga ↑</option>
        <option value="price_desc">Harga ↓</option>
        <option value="stock_asc">Stok ↑</option>
        <option value="sold_desc">Terlaris</option>
      </select>
    </div>

    <!-- Product Grid -->
    <div id="productGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <div class="col-span-full text-center py-8"><i class="fa-solid fa-spinner fa-spin text-fk-purple"></i></div>
    </div>
  </div>

  <!-- Add/Edit Product Modal -->
  <div id="productModal" class="fixed inset-0 z-[60] hidden">
    <div class="absolute inset-0 bg-black/60 backdrop-filter backdrop-blur-sm" onclick="closeModal()"></div>
    <div class="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto glass-card rounded-t-2xl p-6 sm:max-w-lg sm:mx-auto sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl border border-white/5">
      <div class="flex items-center justify-between mb-4">
        <h3 id="modalTitle" class="font-heading font-bold text-lg">Tambah Produk</h3>
        <button onclick="closeModal()" class="text-gray-500 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
      </div>
      <div id="modalError" class="hidden mb-3 p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
        <i class="fa-solid fa-circle-exclamation"></i><span id="modalErrorText"></span>
      </div>
      <div class="space-y-3">
        <input type="hidden" id="editId">
        
        <!-- Image Preview -->
        <div class="relative">
          <div id="imagePreview" class="w-full h-36 rounded-xl bg-empire-dark border border-white/10 flex items-center justify-center overflow-hidden">
            <div class="text-center text-gray-600">
              <i class="fa-solid fa-image text-2xl mb-1"></i>
              <p class="text-[10px]">Preview gambar</p>
            </div>
          </div>
        </div>
        
        <div>
          <label class="text-xs text-gray-400 font-medium mb-1 block">Nama Produk *</label>
          <input type="text" id="pName" placeholder="Gamis Tie-Dye Orange" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm focus:border-fk-purple/50">
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs text-gray-400 font-medium mb-1 block">Kategori *</label>
            <select id="pCategory" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm">
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
            <label class="text-xs text-gray-400 font-medium mb-1 block">Stok</label>
            <input type="number" id="pStock" value="0" min="0" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm">
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs text-gray-400 font-medium mb-1 block">Harga Jual (Rp) *</label>
            <input type="number" id="pPrice" placeholder="125000" min="0" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm font-mono">
          </div>
          <div>
            <label class="text-xs text-gray-400 font-medium mb-1 block">Harga Modal (Rp)</label>
            <input type="number" id="pCost" placeholder="85000" min="0" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm font-mono">
          </div>
        </div>
        <!-- Profit Calculator -->
        <div id="profitCalc" class="hidden p-2.5 rounded-xl bg-green-500/5 border border-green-500/10">
          <div class="flex justify-between text-xs">
            <span class="text-gray-400">Profit per item</span>
            <span id="profitPerItem" class="text-green-400 font-mono font-bold">Rp 0 (0%)</span>
          </div>
        </div>
        <div>
          <label class="text-xs text-gray-400 font-medium mb-1 block">Ukuran (pisah koma)</label>
          <input type="text" id="pSizes" placeholder="S, M, L, XL, XXL" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm">
          <div class="flex gap-1 mt-1">
            <button onclick="quickSize('S,M,L,XL')" class="text-[9px] px-2 py-0.5 rounded bg-white/5 text-gray-500 hover:text-fk-purple">S-XL</button>
            <button onclick="quickSize('All Size')" class="text-[9px] px-2 py-0.5 rounded bg-white/5 text-gray-500 hover:text-fk-purple">All Size</button>
            <button onclick="quickSize('S,M,L,XL,XXL,3XL')" class="text-[9px] px-2 py-0.5 rounded bg-white/5 text-gray-500 hover:text-fk-purple">S-3XL</button>
          </div>
        </div>
        <div>
          <label class="text-xs text-gray-400 font-medium mb-1 block">Warna (pisah koma)</label>
          <input type="text" id="pColors" placeholder="Hitam, Putih, Navy" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm">
          <div class="flex gap-1 mt-1">
            <button onclick="quickColor('Hitam,Putih')" class="text-[9px] px-2 py-0.5 rounded bg-white/5 text-gray-500 hover:text-fk-purple">B&W</button>
            <button onclick="quickColor('Hitam,Navy,Abu-abu')" class="text-[9px] px-2 py-0.5 rounded bg-white/5 text-gray-500 hover:text-fk-purple">Gelap</button>
            <button onclick="quickColor('Pink,Cream,Mocca')" class="text-[9px] px-2 py-0.5 rounded bg-white/5 text-gray-500 hover:text-fk-purple">Pastel</button>
          </div>
        </div>
        <div>
          <label class="text-xs text-gray-400 font-medium mb-1 block">URL Gambar</label>
          <input type="text" id="pImage" placeholder="https://..." oninput="previewImage()" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm">
        </div>
        <div>
          <label class="text-xs text-gray-400 font-medium mb-1 block">Deskripsi</label>
          <textarea id="pDesc" placeholder="Deskripsi produk..." class="w-full px-3 py-2 rounded-xl bg-empire-dark border border-white/10 text-sm resize-none h-16"></textarea>
        </div>
        <div class="flex items-center gap-3">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" id="pFeatured" class="w-4 h-4 accent-amber-500">
            <span class="text-xs text-gray-400"><i class="fa-solid fa-star text-amber-400 mr-1"></i>Produk Unggulan</span>
          </label>
        </div>
        <button onclick="saveProduct()" id="btnSaveProduct" class="w-full py-3.5 rounded-xl fk-gradient text-white font-heading font-bold text-sm shadow-lg shadow-fk-purple/25 active:scale-[0.97]">
          <i class="fa-solid fa-save mr-2"></i>Simpan Produk
        </button>
      </div>
    </div>
  </div>

  <style>
    .product-img-cover { object-fit: cover; width: 100%; height: 100%; }
  </style>

  <script>
    let allProducts = [];

    async function loadCatalog() {
      try {
        const res = await apiFetch('/api/products');
        allProducts = res.data || [];
        updateStats();
        renderCatalog(allProducts);
      } catch(e) {
        document.getElementById('productGrid').innerHTML = '<p class="col-span-full text-sm text-red-400 text-center py-8"><i class="fa-solid fa-exclamation-circle mr-1"></i> ' + e.message + '</p>';
      }
    }

    function updateStats() {
      const active = allProducts.filter(p => p.is_active);
      document.getElementById('statTotal').textContent = allProducts.length;
      document.getElementById('statActive').textContent = active.length;
      document.getElementById('statLow').textContent = allProducts.filter(p => p.is_active && p.stock > 0 && p.stock <= 5).length;
      document.getElementById('statOut').textContent = allProducts.filter(p => p.stock === 0).length;
      
      // Inventory value
      const totalValue = active.reduce((s, p) => s + (p.price * p.stock), 0);
      const totalProfit = active.reduce((s, p) => s + ((p.price - (p.cost_price || 0)) * p.stock), 0);
      document.getElementById('inventoryValue').textContent = formatRupiah(totalValue);
      document.getElementById('inventoryProfit').textContent = '+' + formatRupiah(totalProfit);
    }

    function renderCatalog(products) {
      const grid = document.getElementById('productGrid');
      if (products.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center py-12"><i class="fa-solid fa-box-open text-3xl text-gray-600 mb-3"></i><p class="text-sm text-gray-500">Belum ada produk</p><button onclick="showAddModal()" class="mt-3 px-4 py-2 rounded-lg fk-gradient text-white text-xs shadow-sm shadow-fk-purple/20">+ Tambah Produk Pertama</button></div>';
        return;
      }
      
      const catColors = {gamis:'#EC4899',hijab:'#8B5CF6',daster:'#F97316',kemeja:'#3B82F6',rok:'#14B8A6',celana:'#6366F1',aksesoris:'#F43F5E',lainnya:'#6B7280'};
      
      grid.innerHTML = products.map(p => {
        const cc = catColors[p.category] || '#6B7280';
        const profit = p.cost_price ? Math.round(((p.price - p.cost_price) / p.price) * 100) : 0;
        const sizes = parseSizes(p.sizes);
        const colors = parseColors(p.colors);
        const oos = p.stock === 0;
        
        return \`
        <div class="glass-card rounded-xl overflow-hidden border border-white/5 card-hover \${oos ? 'opacity-50' : ''}">
          <!-- Image -->
          <div class="h-32 bg-empire-dark relative overflow-hidden">
            \${p.image_url ? 
              '<img src="'+p.image_url+'" class="product-img-cover" loading="lazy" onerror="this.parentElement.innerHTML=\\'<div class=\\\\'w-full h-full flex items-center justify-center\\\\' style=\\\\'background:'+cc+'08\\\\'><i class=\\\\'fa-solid fa-shirt text-3xl\\\\' style=\\\\'color:'+cc+'\\\\'></i></div>\\'">' 
              : '<div class="w-full h-full flex items-center justify-center" style="background:'+cc+'08"><i class="fa-solid fa-shirt text-3xl" style="color:'+cc+'"></i></div>'}
            <div class="absolute top-2 left-2 flex gap-1">
              <span class="text-[9px] px-2 py-0.5 rounded-full backdrop-blur-sm" style="background:\${cc}30;color:\${cc}">\${p.category}</span>
              \${p.is_featured ? '<span class="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/30 text-amber-300 backdrop-blur-sm">\\u2B50</span>' : ''}
            </div>
            \${oos ? '<div class="absolute inset-0 bg-black/50 flex items-center justify-center"><span class="text-xs font-bold text-red-400 bg-red-500/20 px-3 py-1 rounded-full">HABIS</span></div>' : ''}
            \${p.stock > 0 && p.stock <= 5 ? '<div class="absolute top-2 right-2"><span class="text-[9px] px-1.5 py-0.5 rounded-full bg-red-500/30 text-red-300 backdrop-blur-sm">Sisa '+p.stock+'</span></div>' : ''}
          </div>
          
          <!-- Info -->
          <div class="p-3">
            <h3 class="font-medium text-sm mb-1 truncate">\${p.name}</h3>
            <div class="flex items-center gap-2 mb-1.5">
              <span class="font-mono font-bold text-fk-purple text-sm">\${formatRupiah(p.price)}</span>
              \${profit > 0 ? '<span class="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-400">+'+profit+'%</span>' : ''}
            </div>
            <div class="flex items-center justify-between text-[10px] text-gray-500 mb-2">
              <span>Stok: \${p.stock}</span>
              <span>Terjual: \${p.total_sold || 0}</span>
            </div>
            \${sizes.length > 0 ? '<div class="flex flex-wrap gap-1 mb-2">' + sizes.slice(0,4).map(s => '<span class="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400">'+s+'</span>').join('') + (sizes.length > 4 ? '<span class="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400">+' + (sizes.length - 4) + '</span>' : '') + '</div>' : ''}
            \${colors.length > 0 ? '<div class="flex flex-wrap gap-1 mb-2">' + colors.slice(0,3).map(c => '<span class="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400">'+c+'</span>').join('') + (colors.length > 3 ? '<span class="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400">+' + (colors.length - 3) + '</span>' : '') + '</div>' : ''}
            <div class="flex gap-2">
              <button onclick="editProduct('\${p.id}')" class="flex-1 text-xs py-2 rounded-lg bg-fk-purple/10 text-fk-purple border border-fk-purple/20 hover:bg-fk-purple/20 transition-all">
                <i class="fa-solid fa-pen-to-square mr-1"></i>Edit
              </button>
              <button onclick="toggleFeatured('\${p.id}', \${!p.is_featured})" class="text-xs py-2 px-3 rounded-lg \${p.is_featured ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-white/5 text-gray-500 border border-white/10'} hover:opacity-80 transition-all">
                <i class="fa-solid fa-star"></i>
              </button>
              <button onclick="deleteProduct('\${p.id}', '\${p.name.replace(/'/g, "\\\\'")}')" class="text-xs py-2 px-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>\`;
      }).join('');
    }

    function parseSizes(s) { if (Array.isArray(s)) return s; try { return JSON.parse(s || '[]'); } catch { return []; } }
    function parseColors(c) { if (Array.isArray(c)) return c; try { return JSON.parse(c || '[]'); } catch { return []; } }

    function filterCatalog() {
      const q = document.getElementById('searchInput').value.toLowerCase();
      const cat = document.getElementById('catFilter').value;
      const sort = document.getElementById('sortFilter').value;
      let filtered = [...allProducts];
      if (cat !== 'all') filtered = filtered.filter(p => p.category === cat);
      if (q) filtered = filtered.filter(p => p.name.toLowerCase().includes(q));
      
      switch(sort) {
        case 'price_asc': filtered.sort((a,b) => a.price - b.price); break;
        case 'price_desc': filtered.sort((a,b) => b.price - a.price); break;
        case 'stock_asc': filtered.sort((a,b) => a.stock - b.stock); break;
        case 'sold_desc': filtered.sort((a,b) => (b.total_sold||0) - (a.total_sold||0)); break;
      }
      renderCatalog(filtered);
    }

    function showAddModal() {
      document.getElementById('modalTitle').textContent = 'Tambah Produk';
      document.getElementById('editId').value = '';
      ['pName','pPrice','pCost','pSizes','pColors','pImage','pDesc'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('pCategory').value = 'gamis';
      document.getElementById('pStock').value = '0';
      document.getElementById('pFeatured').checked = false;
      document.getElementById('modalError').classList.add('hidden');
      document.getElementById('profitCalc').classList.add('hidden');
      document.getElementById('imagePreview').innerHTML = '<div class="text-center text-gray-600"><i class="fa-solid fa-image text-2xl mb-1"></i><p class="text-[10px]">Preview gambar</p></div>';
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
      document.getElementById('pFeatured').checked = p.is_featured || false;
      const sizes = parseSizes(p.sizes);
      const colors = parseColors(p.colors);
      document.getElementById('pSizes').value = sizes.join(', ');
      document.getElementById('pColors').value = colors.join(', ');
      document.getElementById('pImage').value = p.image_url || '';
      document.getElementById('pDesc').value = p.description || '';
      document.getElementById('modalError').classList.add('hidden');
      previewImage();
      calcProfit();
      document.getElementById('productModal').classList.remove('hidden');
    }

    function closeModal() { document.getElementById('productModal').classList.add('hidden'); }

    function previewImage() {
      const url = document.getElementById('pImage').value.trim();
      const el = document.getElementById('imagePreview');
      if (url) {
        el.innerHTML = '<img src="'+url+'" class="product-img-cover rounded-xl" onerror="this.parentElement.innerHTML=\\'<div class=\\\\'text-center text-red-400\\\\'>\\u274C Gambar tidak valid</div>\\'">';
      } else {
        el.innerHTML = '<div class="text-center text-gray-600"><i class="fa-solid fa-image text-2xl mb-1"></i><p class="text-[10px]">Preview gambar</p></div>';
      }
    }

    function calcProfit() {
      const price = parseInt(document.getElementById('pPrice').value) || 0;
      const cost = parseInt(document.getElementById('pCost').value) || 0;
      const el = document.getElementById('profitCalc');
      if (price > 0 && cost > 0) {
        const profit = price - cost;
        const pct = Math.round((profit / price) * 100);
        document.getElementById('profitPerItem').textContent = formatRupiah(profit) + ' (' + pct + '%)';
        el.classList.remove('hidden');
      } else { el.classList.add('hidden'); }
    }
    document.getElementById('pPrice')?.addEventListener('input', calcProfit);
    document.getElementById('pCost')?.addEventListener('input', calcProfit);

    function quickSize(s) { document.getElementById('pSizes').value = s; }
    function quickColor(c) { document.getElementById('pColors').value = c; }

    async function saveProduct() {
      const errEl = document.getElementById('modalError');
      const errText = document.getElementById('modalErrorText');
      const name = document.getElementById('pName').value.trim();
      const price = document.getElementById('pPrice').value;
      
      if (!name || !price) { errText.textContent = 'Nama dan harga wajib diisi!'; errEl.classList.remove('hidden'); return; }
      
      const btn = document.getElementById('btnSaveProduct');
      btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Menyimpan...';
      errEl.classList.add('hidden');
      
      const sizesStr = document.getElementById('pSizes').value;
      const colorsStr = document.getElementById('pColors').value;
      
      const body = {
        name,
        category: document.getElementById('pCategory').value,
        price,
        cost_price: document.getElementById('pCost').value || '0',
        stock: document.getElementById('pStock').value || '0',
        sizes: sizesStr ? sizesStr.split(',').map(s => s.trim()).filter(Boolean) : [],
        colors: colorsStr ? colorsStr.split(',').map(s => s.trim()).filter(Boolean) : [],
        image_url: document.getElementById('pImage').value.trim(),
        description: document.getElementById('pDesc').value.trim(),
        is_featured: document.getElementById('pFeatured').checked
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
      } catch(e) { errText.textContent = e.message; errEl.classList.remove('hidden'); }
      
      btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-save mr-2"></i>Simpan Produk';
    }

    async function toggleFeatured(id, val) {
      try {
        await apiFetch('/api/products/' + id, { method: 'PUT', body: JSON.stringify({ is_featured: val }) });
        showToast(val ? 'Ditandai unggulan!' : 'Hapus dari unggulan');
        await loadCatalog();
      } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
    }

    async function deleteProduct(id, name) {
      if (!confirm('Hapus produk "' + name + '"?')) return;
      try {
        await apiFetch('/api/products/' + id, { method: 'DELETE' });
        showToast('Produk dihapus!');
        await loadCatalog();
      } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
    }

    function shareCatalog() {
      const store = getStore();
      if (!store.slug) { showToast('Slug toko belum ada', 'error'); return; }
      const url = window.location.origin + '/catalog/' + store.slug;
      if (navigator.clipboard) { navigator.clipboard.writeText(url); showToast('Link katalog disalin!'); }
      const waMsg = 'Lihat katalog produk kami:\\n' + url;
      window.open('https://wa.me/?text=' + encodeURIComponent(waMsg), '_blank');
    }

    loadCatalog();
  </script>`
  
  return fashionLayout('Katalog', content, 'catalog')
}
