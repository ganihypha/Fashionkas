// Kasir (POS) Page - Quick Sale v1.1
// Enhanced with product images, size/color picker, improved cart UX
import { fashionLayout } from '../layout'

export function kasirPage(): string {
  const content = `
  <div class="py-6 space-y-4" id="kasirContent">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-heading font-bold text-xl">Penjualan Baru</h1>
        <p class="text-xs text-gray-500" id="orderDate"></p>
      </div>
      <div class="flex gap-2">
        <button onclick="toggleView()" id="viewToggle" class="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 border border-white/5">
          <i class="fa-solid fa-list"></i>
        </button>
        <button onclick="clearCart()" class="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20">
          <i class="fa-solid fa-trash-can mr-1"></i>Reset
        </button>
      </div>
    </div>

    <!-- Customer Info (collapsible) -->
    <details class="glass-card rounded-xl fk-border group">
      <summary class="p-4 cursor-pointer flex items-center justify-between">
        <h3 class="text-xs font-bold text-gray-400 uppercase"><i class="fa-solid fa-user mr-1"></i>Info Pelanggan <span id="custBadge" class="hidden ml-1 px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400 text-[9px] font-normal">Terisi</span></h3>
        <i class="fa-solid fa-chevron-down text-gray-500 text-xs group-open:rotate-180 transition-transform"></i>
      </summary>
      <div class="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input type="text" id="custName" placeholder="Nama pelanggan" oninput="updateCustBadge()" class="w-full px-3 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm focus:border-fk-purple/50">
        <input type="tel" id="custPhone" placeholder="No. WhatsApp (08xxx)" oninput="updateCustBadge()" class="w-full px-3 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm focus:border-fk-purple/50">
      </div>
    </details>

    <!-- Product Search & Selection -->
    <div class="glass-card rounded-xl p-4 fk-border">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-xs font-bold text-gray-400 uppercase"><i class="fa-solid fa-bag-shopping mr-1"></i>Pilih Produk</h3>
        <span id="productCount" class="text-[10px] text-gray-600">0 produk</span>
      </div>
      <div class="relative mb-3">
        <i class="fa-solid fa-search absolute left-3 top-3 text-gray-500 text-sm"></i>
        <input type="text" id="productSearch" placeholder="Cari nama produk..." oninput="filterProducts()" class="w-full pl-9 pr-4 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm focus:border-fk-purple/50">
      </div>
      
      <!-- Category Pills -->
      <div class="flex gap-2 overflow-x-auto scrollbar-hide mb-3 pb-1">
        <button onclick="filterByCategory('all')" class="cat-pill text-xs px-3 py-1.5 rounded-full bg-fk-purple/20 text-fk-purple border border-fk-purple/30 whitespace-nowrap active" data-cat="all">Semua</button>
        <button onclick="filterByCategory('gamis')" class="cat-pill text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-cat="gamis">Gamis</button>
        <button onclick="filterByCategory('hijab')" class="cat-pill text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-cat="hijab">Hijab</button>
        <button onclick="filterByCategory('daster')" class="cat-pill text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-cat="daster">Daster</button>
        <button onclick="filterByCategory('kemeja')" class="cat-pill text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-cat="kemeja">Kemeja</button>
        <button onclick="filterByCategory('rok')" class="cat-pill text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-cat="rok">Rok</button>
        <button onclick="filterByCategory('celana')" class="cat-pill text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-cat="celana">Celana</button>
        <button onclick="filterByCategory('aksesoris')" class="cat-pill text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-cat="aksesoris">Aksesoris</button>
      </div>

      <!-- Product Grid -->
      <div id="productGrid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-[350px] overflow-y-auto scrollbar-hide">
        <div class="col-span-full text-center py-8"><i class="fa-solid fa-spinner fa-spin text-fk-purple"></i><p class="text-xs text-gray-500 mt-2">Loading produk...</p></div>
      </div>
      <div id="emptyProducts" class="hidden text-center py-6 text-gray-500 text-sm">
        <i class="fa-solid fa-box-open text-2xl mb-2"></i><p>Belum ada produk</p>
        <a href="/fashionkas/catalog" class="text-xs text-fk-purple hover:underline mt-1 inline-block">+ Tambah Produk</a>
      </div>
    </div>

    <!-- Size/Color Picker Modal (for products with variants) -->
    <div id="variantModal" class="fixed inset-0 z-[70] hidden">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeVariantModal()"></div>
      <div class="absolute bottom-0 left-0 right-0 glass-card rounded-t-2xl p-6 sm:max-w-md sm:mx-auto sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl">
        <div class="flex items-center gap-3 mb-4">
          <div id="vmImage" class="w-16 h-16 rounded-xl bg-empire-dark border border-white/5 overflow-hidden flex-shrink-0">
            <div class="w-full h-full flex items-center justify-center text-gray-600"><i class="fa-solid fa-shirt text-xl"></i></div>
          </div>
          <div class="flex-1 min-w-0">
            <h3 id="vmName" class="font-heading font-bold text-sm truncate">Produk</h3>
            <p id="vmPrice" class="text-fk-purple font-mono font-bold text-sm">Rp 0</p>
            <p id="vmStock" class="text-[10px] text-gray-500">Stok: 0</p>
          </div>
          <button onclick="closeVariantModal()" class="text-gray-500 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
        </div>
        
        <!-- Size Selection -->
        <div id="vmSizes" class="mb-4 hidden">
          <p class="text-xs text-gray-400 font-medium mb-2">Pilih Ukuran:</p>
          <div id="vmSizeGrid" class="flex flex-wrap gap-2"></div>
        </div>
        
        <!-- Color Selection -->
        <div id="vmColors" class="mb-4 hidden">
          <p class="text-xs text-gray-400 font-medium mb-2">Pilih Warna:</p>
          <div id="vmColorGrid" class="flex flex-wrap gap-2"></div>
        </div>
        
        <!-- Quantity -->
        <div class="flex items-center justify-between mb-4">
          <p class="text-xs text-gray-400 font-medium">Jumlah:</p>
          <div class="flex items-center gap-3">
            <button onclick="vmChangeQty(-1)" class="w-9 h-9 rounded-lg bg-white/5 text-gray-400 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center">-</button>
            <span id="vmQty" class="text-lg font-mono font-bold w-8 text-center">1</span>
            <button onclick="vmChangeQty(1)" class="w-9 h-9 rounded-lg bg-white/5 text-gray-400 hover:bg-green-500/20 hover:text-green-400 flex items-center justify-center">+</button>
          </div>
        </div>
        
        <button onclick="confirmAddToCart()" class="w-full py-3.5 rounded-xl fk-gradient text-white font-heading font-bold text-sm shadow-lg shadow-fk-purple/25">
          <i class="fa-solid fa-cart-plus mr-2"></i>Tambah ke Keranjang
        </button>
      </div>
    </div>

    <!-- Cart -->
    <div class="glass-card rounded-xl p-4 fk-border">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-xs font-bold text-gray-400 uppercase">
          <i class="fa-solid fa-cart-shopping mr-1"></i>Keranjang 
          <span id="cartCount" class="ml-1 px-2 py-0.5 rounded-full bg-fk-purple/20 text-fk-purple text-[10px] font-bold">0</span>
        </h3>
        <span id="cartItemsTotal" class="text-xs text-gray-500 font-mono">Rp 0</span>
      </div>
      <div id="cartItems">
        <p class="text-sm text-gray-500 text-center py-4"><i class="fa-solid fa-cart-shopping text-gray-700 text-xl mb-2 block"></i>Keranjang kosong</p>
      </div>
    </div>

    <!-- Summary & Payment -->
    <div class="glass-card rounded-xl p-4 fk-border fk-glow">
      <h3 class="text-xs font-bold text-gray-400 uppercase mb-3"><i class="fa-solid fa-calculator mr-1"></i>Ringkasan</h3>
      
      <div class="space-y-2 mb-4">
        <div class="flex justify-between text-sm"><span class="text-gray-400">Subtotal</span><span id="subtotalDisplay" class="font-mono">Rp 0</span></div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-400">Diskon</span>
          <div class="flex items-center gap-1">
            <button onclick="quickDiscount(5000)" class="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-500 hover:text-fk-purple">5K</button>
            <button onclick="quickDiscount(10000)" class="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-500 hover:text-fk-purple">10K</button>
            <input type="number" id="discountInput" value="0" min="0" oninput="updateTotals()" class="w-24 text-right px-2 py-1 rounded-lg bg-empire-dark border border-white/10 text-sm font-mono">
          </div>
        </div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-400">Ongkir</span>
          <div class="flex items-center gap-1">
            <button onclick="quickShipping(10000)" class="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-500 hover:text-fk-purple">10K</button>
            <button onclick="quickShipping(15000)" class="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-500 hover:text-fk-purple">15K</button>
            <input type="number" id="shippingInput" value="0" min="0" oninput="updateTotals()" class="w-24 text-right px-2 py-1 rounded-lg bg-empire-dark border border-white/10 text-sm font-mono">
          </div>
        </div>
        <div class="border-t border-white/10 pt-2 flex justify-between items-center">
          <span class="font-bold">Total</span>
          <span id="totalDisplay" class="font-heading font-bold text-2xl text-fk-purple">Rp 0</span>
        </div>
        <div class="flex justify-between text-xs">
          <span class="text-gray-500">Estimasi Profit</span>
          <span id="profitDisplay" class="text-green-400 font-mono font-bold">+Rp 0</span>
        </div>
      </div>

      <!-- Payment Methods -->
      <h3 class="text-xs font-bold text-gray-400 uppercase mb-2"><i class="fa-solid fa-credit-card mr-1"></i>Metode Bayar</h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        <button onclick="selectPayment('cash')" class="pay-btn text-xs py-2.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 active" data-method="cash">
          <i class="fa-solid fa-money-bill-wave mr-1"></i>Cash
        </button>
        <button onclick="selectPayment('transfer')" class="pay-btn text-xs py-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20" data-method="transfer">
          <i class="fa-solid fa-building-columns mr-1"></i>Transfer
        </button>
        <button onclick="selectPayment('cod')" class="pay-btn text-xs py-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20" data-method="cod">
          <i class="fa-solid fa-truck mr-1"></i>COD
        </button>
        <button onclick="selectPayment('marketplace')" class="pay-btn text-xs py-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20" data-method="marketplace">
          <i class="fa-solid fa-store mr-1"></i>MP
        </button>
      </div>

      <!-- WA Toggle + Notes -->
      <div class="flex items-center gap-4 mb-3">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" id="sendWA" class="w-4 h-4 accent-green-500">
          <span class="text-xs text-gray-400"><i class="fa-brands fa-whatsapp text-green-400 mr-1"></i>Auto-kirim struk WA</span>
        </label>
      </div>
      <textarea id="orderNotes" placeholder="Catatan pesanan (opsional)..." class="w-full px-3 py-2 rounded-lg bg-empire-dark border border-white/10 text-sm mb-4 resize-none h-14 focus:border-fk-purple/50"></textarea>

      <!-- Action Buttons -->
      <div class="grid grid-cols-2 gap-3">
        <button onclick="saveOrder()" id="btnSave" class="py-3.5 rounded-xl fk-gradient text-white font-heading font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-fk-purple/30 active:scale-[0.97]">
          <i class="fa-solid fa-check mr-2"></i>Simpan
        </button>
        <button onclick="sendWhatsApp()" class="py-3.5 rounded-xl bg-[#25D366] text-white font-heading font-bold text-sm hover:opacity-90 transition-all active:scale-[0.97]">
          <i class="fa-brands fa-whatsapp mr-2"></i>Kirim WA
        </button>
      </div>
    </div>
  </div>

  <style>
    .cat-pill.active { background: rgba(168,85,247,0.2) !important; color: #A855F7 !important; border-color: rgba(168,85,247,0.3) !important; }
    .pay-btn.active { box-shadow: inset 0 0 0 2px currentColor; font-weight: 700; }
    .product-card { cursor: pointer; transition: all 0.2s; }
    .product-card:hover { transform: scale(1.02); border-color: rgba(168,85,247,0.3) !important; }
    .product-card.in-cart { border-color: rgba(168,85,247,0.5) !important; background: rgba(168,85,247,0.08) !important; }
    .product-card.out-of-stock { opacity: 0.4; pointer-events: none; }
    .size-btn.active, .color-btn.active { background: rgba(168,85,247,0.2); color: #A855F7; border-color: rgba(168,85,247,0.5); }
    .product-img { object-fit: cover; width: 100%; height: 100%; }
  </style>

  <script>
    let allProducts = [];
    let cart = [];
    let selectedPayment = 'cash';
    let currentCategory = 'all';
    let viewMode = 'grid'; // grid or list
    let vmProduct = null;
    let vmSelectedSize = '';
    let vmSelectedColor = '';
    let vmQuantity = 1;

    // Set today's date
    document.getElementById('orderDate').textContent = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    async function loadProducts() {
      try {
        const res = await apiFetch('/api/products');
        allProducts = res.data || [];
        document.getElementById('productCount').textContent = allProducts.filter(p => p.is_active !== false).length + ' produk';
        renderProducts(allProducts);
      } catch(e) {
        document.getElementById('productGrid').innerHTML = '<p class="col-span-full text-sm text-red-400 text-center py-4"><i class="fa-solid fa-exclamation-circle mr-1"></i>Gagal memuat: ' + e.message + '</p>';
      }
    }

    function renderProducts(products) {
      const grid = document.getElementById('productGrid');
      const empty = document.getElementById('emptyProducts');
      const active = products.filter(p => p.is_active !== false);
      if (active.length === 0) { grid.innerHTML = ''; empty.classList.remove('hidden'); return; }
      empty.classList.add('hidden');
      
      grid.innerHTML = active.map(p => {
        const inCart = cart.find(c => c.product_id === p.id);
        const catColors = {gamis:'#EC4899',hijab:'#8B5CF6',daster:'#F97316',kemeja:'#3B82F6',rok:'#14B8A6',celana:'#6366F1',aksesoris:'#F43F5E'};
        const cc = catColors[p.category] || '#6B7280';
        const oos = p.stock === 0;
        const sizes = parseSizes(p.sizes);
        const colors = parseColors(p.colors);
        const hasVariants = sizes.length > 0 || colors.length > 0;
        
        return \`
        <div class="product-card glass-card rounded-lg border border-white/5 overflow-hidden \${inCart ? 'in-cart' : ''} \${oos ? 'out-of-stock' : ''}" 
          onclick="\${hasVariants && !oos ? "openVariantModal('"+p.id+"')" : "quickAdd('"+p.id+"')"}" data-id="\${p.id}" data-cat="\${p.category}" data-name="\${p.name.toLowerCase()}">
          \${p.image_url ? 
            '<div class="h-20 bg-empire-dark overflow-hidden"><img src="'+p.image_url+'" class="product-img" loading="lazy" onerror="this.parentElement.innerHTML=\\'<div class=\\\\'w-full h-full flex items-center justify-center\\\\' style=\\\\'background:'+cc+'10\\\\'><i class=\\\\'fa-solid fa-shirt\\\\' style=\\\\'color:'+cc+';font-size:20px\\\\'></i></div>\\'">' + '</div>' 
            : '<div class="h-16 flex items-center justify-center" style="background:'+cc+'08"><i class="fa-solid fa-shirt" style="color:'+cc+';font-size:20px"></i></div>'}
          <div class="p-2">
            <div class="flex items-start justify-between mb-0.5">
              <span class="text-[8px] px-1.5 py-0.5 rounded-full" style="background:\${cc}15;color:\${cc}">\${p.category}</span>
              \${inCart ? '<span class="text-[9px] px-1 py-0.5 rounded bg-fk-purple/20 text-fk-purple font-bold">x'+inCart.quantity+'</span>' : ''}
            </div>
            <p class="text-[11px] font-medium truncate">\${p.name}</p>
            <p class="text-xs font-mono font-bold text-fk-purple">\${formatRupiah(p.price)}</p>
            <div class="flex items-center justify-between mt-0.5">
              <p class="text-[9px] text-gray-500">Stok: \${p.stock}</p>
              \${hasVariants ? '<span class="text-[8px] text-gray-600"><i class="fa-solid fa-swatchbook"></i></span>' : ''}
            </div>
          </div>
        </div>\`;
      }).join('');
    }

    function parseSizes(s) { if (Array.isArray(s)) return s; try { return JSON.parse(s || '[]'); } catch { return []; } }
    function parseColors(c) { if (Array.isArray(c)) return c; try { return JSON.parse(c || '[]'); } catch { return []; } }

    function filterProducts() {
      const q = document.getElementById('productSearch').value.toLowerCase();
      let filtered = allProducts;
      if (currentCategory !== 'all') filtered = filtered.filter(p => p.category === currentCategory);
      if (q) filtered = filtered.filter(p => p.name.toLowerCase().includes(q));
      renderProducts(filtered);
    }

    function filterByCategory(cat) {
      currentCategory = cat;
      document.querySelectorAll('.cat-pill').forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
      filterProducts();
    }

    function toggleView() {
      viewMode = viewMode === 'grid' ? 'list' : 'grid';
      const grid = document.getElementById('productGrid');
      if (viewMode === 'list') {
        grid.classList.remove('grid-cols-2', 'sm:grid-cols-3', 'lg:grid-cols-4');
        grid.classList.add('grid-cols-1');
      } else {
        grid.classList.add('grid-cols-2', 'sm:grid-cols-3', 'lg:grid-cols-4');
        grid.classList.remove('grid-cols-1');
      }
      document.getElementById('viewToggle').innerHTML = viewMode === 'grid' ? '<i class="fa-solid fa-list"></i>' : '<i class="fa-solid fa-grip"></i>';
    }

    // Quick add (no variants)
    function quickAdd(productId) {
      const product = allProducts.find(p => p.id === productId);
      if (!product || product.stock === 0) { showToast('Stok habis!', 'error'); return; }
      const existing = cart.find(c => c.product_id === productId && !c.size && !c.color);
      if (existing) {
        if (existing.quantity >= product.stock) { showToast('Stok tidak cukup!', 'error'); return; }
        existing.quantity++;
      } else {
        cart.push({ product_id: product.id, name: product.name, price: product.price, cost_price: product.cost_price || 0, quantity: 1, size: '', color: '', stock: product.stock, image_url: product.image_url || '' });
      }
      afterCartChange();
    }

    // Variant modal
    function openVariantModal(productId) {
      vmProduct = allProducts.find(p => p.id === productId);
      if (!vmProduct || vmProduct.stock === 0) { showToast('Stok habis!', 'error'); return; }
      vmSelectedSize = ''; vmSelectedColor = ''; vmQuantity = 1;
      
      document.getElementById('vmName').textContent = vmProduct.name;
      document.getElementById('vmPrice').textContent = formatRupiah(vmProduct.price);
      document.getElementById('vmStock').textContent = 'Stok: ' + vmProduct.stock;
      document.getElementById('vmQty').textContent = '1';
      
      if (vmProduct.image_url) {
        document.getElementById('vmImage').innerHTML = '<img src="'+vmProduct.image_url+'" class="product-img rounded-xl">';
      } else {
        const catColors = {gamis:'#EC4899',hijab:'#8B5CF6',daster:'#F97316',kemeja:'#3B82F6'};
        const cc = catColors[vmProduct.category] || '#6B7280';
        document.getElementById('vmImage').innerHTML = '<div class="w-full h-full flex items-center justify-center" style="background:'+cc+'10"><i class="fa-solid fa-shirt" style="color:'+cc+';font-size:20px"></i></div>';
      }
      
      const sizes = parseSizes(vmProduct.sizes);
      const colors = parseColors(vmProduct.colors);
      
      const sizesEl = document.getElementById('vmSizes');
      const colorsEl = document.getElementById('vmColors');
      
      if (sizes.length > 0) {
        sizesEl.classList.remove('hidden');
        document.getElementById('vmSizeGrid').innerHTML = sizes.map(s => '<button onclick="selectSize(this, \\''+s+'\\')" class="size-btn text-xs px-4 py-2 rounded-lg bg-white/5 text-gray-300 border border-white/10 hover:border-fk-purple/30">'+s+'</button>').join('');
      } else { sizesEl.classList.add('hidden'); }
      
      if (colors.length > 0) {
        colorsEl.classList.remove('hidden');
        document.getElementById('vmColorGrid').innerHTML = colors.map(c => '<button onclick="selectColor(this, \\''+c+'\\')" class="color-btn text-xs px-4 py-2 rounded-lg bg-white/5 text-gray-300 border border-white/10 hover:border-fk-purple/30">'+c+'</button>').join('');
      } else { colorsEl.classList.add('hidden'); }
      
      document.getElementById('variantModal').classList.remove('hidden');
    }

    function closeVariantModal() { document.getElementById('variantModal').classList.add('hidden'); vmProduct = null; }
    function selectSize(btn, size) { vmSelectedSize = size; document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); }
    function selectColor(btn, color) { vmSelectedColor = color; document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); }
    function vmChangeQty(d) { vmQuantity = Math.max(1, Math.min(vmQuantity + d, vmProduct?.stock || 99)); document.getElementById('vmQty').textContent = vmQuantity; }

    function confirmAddToCart() {
      if (!vmProduct) return;
      const existing = cart.find(c => c.product_id === vmProduct.id && c.size === vmSelectedSize && c.color === vmSelectedColor);
      if (existing) {
        if (existing.quantity + vmQuantity > vmProduct.stock) { showToast('Stok tidak cukup!', 'error'); return; }
        existing.quantity += vmQuantity;
      } else {
        cart.push({ product_id: vmProduct.id, name: vmProduct.name, price: vmProduct.price, cost_price: vmProduct.cost_price || 0, quantity: vmQuantity, size: vmSelectedSize, color: vmSelectedColor, stock: vmProduct.stock, image_url: vmProduct.image_url || '' });
      }
      closeVariantModal();
      afterCartChange();
      showToast(vmProduct.name + ' ditambahkan!');
    }

    function removeFromCart(idx) { cart.splice(idx, 1); afterCartChange(); }
    function changeQty(idx, delta) {
      const item = cart[idx];
      const newQty = item.quantity + delta;
      if (newQty <= 0) { removeFromCart(idx); return; }
      if (newQty > item.stock) { showToast('Stok tidak cukup!', 'error'); return; }
      item.quantity = newQty;
      afterCartChange();
    }

    function afterCartChange() {
      renderCart(); updateTotals();
      const filtered = currentCategory === 'all' ? allProducts : allProducts.filter(p => p.category === currentCategory);
      renderProducts(filtered);
    }

    function renderCart() {
      const el = document.getElementById('cartItems');
      const countEl = document.getElementById('cartCount');
      const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
      countEl.textContent = totalItems;
      
      if (cart.length === 0) {
        el.innerHTML = '<p class="text-sm text-gray-500 text-center py-4"><i class="fa-solid fa-cart-shopping text-gray-700 text-xl mb-2 block"></i>Keranjang kosong</p>';
        document.getElementById('cartItemsTotal').textContent = 'Rp 0';
        return;
      }
      
      const cartTotal = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
      document.getElementById('cartItemsTotal').textContent = formatRupiah(cartTotal);
      
      el.innerHTML = cart.map((item, i) => \`
        <div class="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0">
          <div class="w-10 h-10 rounded-lg bg-empire-dark border border-white/5 overflow-hidden flex-shrink-0">
            \${item.image_url ? '<img src="'+item.image_url+'" class="product-img">' : '<div class="w-full h-full flex items-center justify-center"><i class="fa-solid fa-shirt text-gray-600 text-sm"></i></div>'}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium truncate">\${item.name}</p>
            <p class="text-[10px] text-gray-500">
              \${formatRupiah(item.price)} x \${item.quantity}
              \${item.size ? ' | <span class="text-fk-purple">' + item.size + '</span>' : ''}
              \${item.color ? ' | <span class="text-fk-purple">' + item.color + '</span>' : ''}
            </p>
          </div>
          <div class="flex items-center gap-1">
            <button onclick="changeQty(\${i}, -1)" class="w-7 h-7 rounded-lg bg-white/5 text-gray-400 hover:bg-red-500/20 hover:text-red-400 text-xs flex items-center justify-center">-</button>
            <span class="w-6 text-center text-sm font-mono">\${item.quantity}</span>
            <button onclick="changeQty(\${i}, 1)" class="w-7 h-7 rounded-lg bg-white/5 text-gray-400 hover:bg-green-500/20 hover:text-green-400 text-xs flex items-center justify-center">+</button>
          </div>
          <div class="text-right min-w-[80px]">
            <p class="text-sm font-mono font-bold text-fk-purple">\${formatRupiah(item.price * item.quantity)}</p>
          </div>
          <button onclick="removeFromCart(\${i})" class="text-gray-600 hover:text-red-400 text-xs"><i class="fa-solid fa-xmark"></i></button>
        </div>
      \`).join('');
    }

    function updateTotals() {
      const subtotal = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
      const discount = parseInt(document.getElementById('discountInput').value) || 0;
      const shipping = parseInt(document.getElementById('shippingInput').value) || 0;
      const total = Math.max(0, subtotal - discount + shipping);
      const profit = cart.reduce((s, i) => s + ((i.price - i.cost_price) * i.quantity), 0) - discount;
      
      document.getElementById('subtotalDisplay').textContent = formatRupiah(subtotal);
      document.getElementById('totalDisplay').textContent = formatRupiah(total);
      document.getElementById('profitDisplay').textContent = '+' + formatRupiah(Math.max(0, profit));
    }

    function selectPayment(method) { selectedPayment = method; document.querySelectorAll('.pay-btn').forEach(b => b.classList.toggle('active', b.dataset.method === method)); }
    function quickDiscount(v) { document.getElementById('discountInput').value = v; updateTotals(); }
    function quickShipping(v) { document.getElementById('shippingInput').value = v; updateTotals(); }
    function updateCustBadge() {
      const n = document.getElementById('custName').value.trim();
      const p = document.getElementById('custPhone').value.trim();
      document.getElementById('custBadge').classList.toggle('hidden', !n && !p);
    }

    function clearCart() {
      if (cart.length > 0 && !confirm('Reset semua?')) return;
      cart = [];
      document.getElementById('custName').value = '';
      document.getElementById('custPhone').value = '';
      document.getElementById('discountInput').value = '0';
      document.getElementById('shippingInput').value = '0';
      document.getElementById('orderNotes').value = '';
      selectedPayment = 'cash';
      document.querySelectorAll('.pay-btn').forEach(b => b.classList.toggle('active', b.dataset.method === 'cash'));
      document.getElementById('custBadge').classList.add('hidden');
      afterCartChange();
    }

    async function saveOrder() {
      if (cart.length === 0) { showToast('Keranjang kosong!', 'error'); return; }
      const btn = document.getElementById('btnSave');
      btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Menyimpan...';
      try {
        const body = {
          customer_name: document.getElementById('custName').value.trim() || 'Walk-in Customer',
          customer_phone: document.getElementById('custPhone').value.trim(),
          items: cart.map(c => ({ product_id: c.product_id, name: c.name, price: c.price, cost_price: c.cost_price, quantity: c.quantity, size: c.size, color: c.color })),
          payment_method: selectedPayment,
          discount: document.getElementById('discountInput').value,
          shipping_cost: document.getElementById('shippingInput').value,
          notes: document.getElementById('orderNotes').value.trim(),
          send_wa: document.getElementById('sendWA').checked
        };
        const res = await apiFetch('/api/orders', { method: 'POST', body: JSON.stringify(body) });
        showToast('Pesanan ' + res.data.order_number + ' berhasil!');
        cart = [];
        document.getElementById('custName').value = '';
        document.getElementById('custPhone').value = '';
        document.getElementById('discountInput').value = '0';
        document.getElementById('shippingInput').value = '0';
        document.getElementById('orderNotes').value = '';
        document.getElementById('custBadge').classList.add('hidden');
        afterCartChange();
        await loadProducts();
      } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
      btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-check mr-2"></i>Simpan';
    }

    function sendWhatsApp() {
      const phone = document.getElementById('custPhone').value.trim();
      if (!phone) { showToast('Isi nomor WA pelanggan!', 'error'); return; }
      if (cart.length === 0) { showToast('Keranjang kosong!', 'error'); return; }
      const subtotal = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
      const discount = parseInt(document.getElementById('discountInput').value) || 0;
      const shipping = parseInt(document.getElementById('shippingInput').value) || 0;
      const total = subtotal - discount + shipping;
      const store = getStore();
      let msg = '*' + (store.name || 'FashionKas') + ' - Struk*\\n\\n';
      cart.forEach(item => {
        msg += item.name;
        if (item.size) msg += ' (' + item.size + ')';
        if (item.color) msg += ' [' + item.color + ']';
        msg += ' x' + item.quantity + ' = ' + formatRupiah(item.price * item.quantity) + '\\n';
      });
      if (discount > 0) msg += '\\nDiskon: -' + formatRupiah(discount);
      if (shipping > 0) msg += '\\nOngkir: +' + formatRupiah(shipping);
      msg += '\\n\\n*Total: ' + formatRupiah(total) + '*';
      msg += '\\nBayar: ' + selectedPayment.toUpperCase();
      msg += '\\n\\nTerima kasih! \\u{1F64F}';
      const waPhone = phone.startsWith('0') ? '62' + phone.slice(1) : phone;
      window.open('https://wa.me/' + waPhone + '?text=' + encodeURIComponent(msg), '_blank');
    }

    loadProducts();
  </script>`
  
  return fashionLayout('Kasir', content, 'sale')
}
