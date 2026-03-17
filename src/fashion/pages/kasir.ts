// Kasir (POS) Page - Quick Sale
import { fashionLayout } from '../layout'

export function kasirPage(): string {
  const content = `
  <div class="py-6 space-y-4" id="kasirContent">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-heading font-bold text-xl">Penjualan Baru</h1>
        <p class="text-xs text-gray-500">Buat pesanan cepat dari sini</p>
      </div>
      <button onclick="clearCart()" class="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20">
        <i class="fa-solid fa-trash-can mr-1"></i>Reset
      </button>
    </div>

    <!-- Customer Info -->
    <div class="glass-card rounded-xl p-4 fk-border">
      <h3 class="text-xs font-bold text-gray-400 uppercase mb-3"><i class="fa-solid fa-user mr-1"></i>Info Pelanggan</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input type="text" id="custName" placeholder="Nama pelanggan (opsional)" class="w-full px-3 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm focus:border-fk-purple/50">
        <input type="tel" id="custPhone" placeholder="No. WhatsApp (opsional)" class="w-full px-3 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm focus:border-fk-purple/50">
      </div>
    </div>

    <!-- Product Search & Selection -->
    <div class="glass-card rounded-xl p-4 fk-border">
      <h3 class="text-xs font-bold text-gray-400 uppercase mb-3"><i class="fa-solid fa-bag-shopping mr-1"></i>Pilih Produk</h3>
      <div class="relative mb-3">
        <i class="fa-solid fa-search absolute left-3 top-3 text-gray-500 text-sm"></i>
        <input type="text" id="productSearch" placeholder="Cari produk..." oninput="filterProducts()" class="w-full pl-9 pr-4 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm focus:border-fk-purple/50">
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
      <div id="productGrid" class="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[300px] overflow-y-auto scrollbar-hide">
        <div class="text-center py-8"><i class="fa-solid fa-spinner fa-spin text-fk-purple"></i><p class="text-xs text-gray-500 mt-2">Loading produk...</p></div>
      </div>
      <div id="emptyProducts" class="hidden text-center py-6 text-gray-500 text-sm">
        <i class="fa-solid fa-box-open text-2xl mb-2"></i><p>Belum ada produk</p>
        <a href="/fashionkas/catalog" class="text-xs text-fk-purple hover:underline mt-1 inline-block">+ Tambah Produk</a>
      </div>
    </div>

    <!-- Cart -->
    <div class="glass-card rounded-xl p-4 fk-border">
      <h3 class="text-xs font-bold text-gray-400 uppercase mb-3">
        <i class="fa-solid fa-cart-shopping mr-1"></i>Keranjang 
        <span id="cartCount" class="ml-1 px-1.5 py-0.5 rounded-full bg-fk-purple/20 text-fk-purple text-[10px]">0</span>
      </h3>
      <div id="cartItems">
        <p class="text-sm text-gray-500 text-center py-4">Keranjang kosong. Pilih produk di atas.</p>
      </div>
    </div>

    <!-- Summary & Payment -->
    <div class="glass-card rounded-xl p-4 fk-border fk-glow">
      <h3 class="text-xs font-bold text-gray-400 uppercase mb-3"><i class="fa-solid fa-calculator mr-1"></i>Ringkasan</h3>
      
      <div class="space-y-2 mb-4">
        <div class="flex justify-between text-sm"><span class="text-gray-400">Subtotal</span><span id="subtotalDisplay" class="font-mono">Rp 0</span></div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-400">Diskon</span>
          <input type="number" id="discountInput" value="0" min="0" oninput="updateTotals()" class="w-28 text-right px-2 py-1 rounded-lg bg-empire-dark border border-white/10 text-sm font-mono">
        </div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-400">Ongkir</span>
          <input type="number" id="shippingInput" value="0" min="0" oninput="updateTotals()" class="w-28 text-right px-2 py-1 rounded-lg bg-empire-dark border border-white/10 text-sm font-mono">
        </div>
        <div class="border-t border-white/10 pt-2 flex justify-between">
          <span class="font-bold">Total</span>
          <span id="totalDisplay" class="font-heading font-bold text-xl text-fk-purple">Rp 0</span>
        </div>
        <div class="flex justify-between text-xs">
          <span class="text-gray-500">Estimasi Profit</span>
          <span id="profitDisplay" class="text-green-400 font-mono">Rp 0</span>
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
          <i class="fa-solid fa-store mr-1"></i>Marketplace
        </button>
      </div>

      <!-- WA Toggle -->
      <label class="flex items-center gap-2 mb-4 cursor-pointer">
        <input type="checkbox" id="sendWA" class="w-4 h-4 accent-green-500">
        <span class="text-xs text-gray-400"><i class="fa-brands fa-whatsapp text-green-400 mr-1"></i>Kirim struk via WhatsApp</span>
      </label>

      <!-- Notes -->
      <textarea id="orderNotes" placeholder="Catatan pesanan (opsional)..." class="w-full px-3 py-2 rounded-lg bg-empire-dark border border-white/10 text-sm mb-4 resize-none h-16 focus:border-fk-purple/50"></textarea>

      <!-- Action Buttons -->
      <div class="grid grid-cols-2 gap-3">
        <button onclick="saveOrder()" id="btnSave" class="py-3.5 rounded-xl fk-gradient text-white font-heading font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-fk-purple/30">
          <i class="fa-solid fa-check mr-2"></i>Simpan Pesanan
        </button>
        <button onclick="sendWhatsApp()" class="py-3.5 rounded-xl bg-[#25D366] text-white font-heading font-bold text-sm hover:opacity-90 transition-all">
          <i class="fa-brands fa-whatsapp mr-2"></i>Kirim WA
        </button>
      </div>
    </div>
  </div>

  <style>
    .cat-pill.active { background: rgba(168,85,247,0.2) !important; color: #A855F7 !important; border-color: rgba(168,85,247,0.3) !important; }
    .pay-btn.active { ring: 2px; box-shadow: inset 0 0 0 2px currentColor; font-weight: 700; }
    .product-card { cursor: pointer; transition: all 0.2s; }
    .product-card:hover { transform: scale(1.02); }
    .product-card.in-cart { border-color: rgba(168,85,247,0.5) !important; background: rgba(168,85,247,0.08) !important; }
  </style>

  <script>
    let allProducts = [];
    let cart = [];
    let selectedPayment = 'cash';
    let currentCategory = 'all';

    // Load products from API
    async function loadProducts() {
      try {
        const res = await apiFetch('/api/products');
        allProducts = res.data || [];
        renderProducts(allProducts);
      } catch(e) {
        document.getElementById('productGrid').innerHTML = '<p class="col-span-3 text-sm text-red-400 text-center py-4">Gagal memuat produk: ' + e.message + '</p>';
      }
    }

    function renderProducts(products) {
      const grid = document.getElementById('productGrid');
      const empty = document.getElementById('emptyProducts');
      
      const active = products.filter(p => p.is_active !== false);
      if (active.length === 0) {
        grid.innerHTML = '';
        empty.classList.remove('hidden');
        return;
      }
      empty.classList.add('hidden');
      
      grid.innerHTML = active.map(p => {
        const inCart = cart.find(c => c.product_id === p.id);
        const catColors = {gamis:'#EC4899',hijab:'#8B5CF6',daster:'#F97316',kemeja:'#3B82F6',rok:'#14B8A6',celana:'#6366F1',aksesoris:'#F43F5E'};
        const cc = catColors[p.category] || '#6B7280';
        return \`
        <div class="product-card glass-card rounded-lg p-3 border border-white/5 \${inCart ? 'in-cart' : ''}" onclick="addToCart('\${p.id}')" data-id="\${p.id}" data-cat="\${p.category}" data-name="\${p.name.toLowerCase()}">
          <div class="flex items-start justify-between mb-1">
            <span class="text-[9px] px-1.5 py-0.5 rounded-full" style="background:\${cc}15;color:\${cc}">\${p.category}</span>
            \${p.stock <= 5 && p.stock > 0 ? '<span class="text-[9px] text-red-400">Low</span>' : ''}
            \${p.stock === 0 ? '<span class="text-[9px] text-red-400">Habis</span>' : ''}
          </div>
          <p class="text-xs font-medium truncate mb-1">\${p.name}</p>
          <p class="text-sm font-mono font-bold text-fk-purple">\${formatRupiah(p.price)}</p>
          <p class="text-[10px] text-gray-500">Stok: \${p.stock} \${inCart ? '• <span class=text-fk-purple>x' + inCart.quantity + '</span>' : ''}</p>
        </div>\`;
      }).join('');
    }

    function filterProducts() {
      const q = document.getElementById('productSearch').value.toLowerCase();
      let filtered = allProducts;
      if (currentCategory !== 'all') filtered = filtered.filter(p => p.category === currentCategory);
      if (q) filtered = filtered.filter(p => p.name.toLowerCase().includes(q));
      renderProducts(filtered);
    }

    function filterByCategory(cat) {
      currentCategory = cat;
      document.querySelectorAll('.cat-pill').forEach(b => {
        b.classList.toggle('active', b.dataset.cat === cat);
      });
      filterProducts();
    }

    function addToCart(productId) {
      const product = allProducts.find(p => p.id === productId);
      if (!product || product.stock === 0) { showToast('Stok habis!', 'error'); return; }
      
      const existing = cart.find(c => c.product_id === productId);
      if (existing) {
        if (existing.quantity >= product.stock) { showToast('Stok tidak cukup!', 'error'); return; }
        existing.quantity++;
      } else {
        cart.push({
          product_id: product.id,
          name: product.name,
          price: product.price,
          cost_price: product.cost_price || 0,
          quantity: 1,
          size: '',
          color: '',
          stock: product.stock
        });
      }
      renderCart();
      renderProducts(currentCategory === 'all' ? allProducts : allProducts.filter(p => p.category === currentCategory));
      updateTotals();
    }

    function removeFromCart(idx) {
      cart.splice(idx, 1);
      renderCart();
      renderProducts(currentCategory === 'all' ? allProducts : allProducts.filter(p => p.category === currentCategory));
      updateTotals();
    }

    function changeQty(idx, delta) {
      const item = cart[idx];
      const newQty = item.quantity + delta;
      if (newQty <= 0) { removeFromCart(idx); return; }
      if (newQty > item.stock) { showToast('Stok tidak cukup!', 'error'); return; }
      item.quantity = newQty;
      renderCart();
      renderProducts(currentCategory === 'all' ? allProducts : allProducts.filter(p => p.category === currentCategory));
      updateTotals();
    }

    function renderCart() {
      const el = document.getElementById('cartItems');
      const countEl = document.getElementById('cartCount');
      countEl.textContent = cart.reduce((s, i) => s + i.quantity, 0);
      
      if (cart.length === 0) {
        el.innerHTML = '<p class="text-sm text-gray-500 text-center py-4">Keranjang kosong. Pilih produk di atas.</p>';
        return;
      }
      
      el.innerHTML = cart.map((item, i) => \`
        <div class="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium truncate">\${item.name}</p>
            <p class="text-[10px] text-gray-500">\${formatRupiah(item.price)} x \${item.quantity}</p>
          </div>
          <div class="flex items-center gap-1">
            <button onclick="changeQty(\${i}, -1)" class="w-7 h-7 rounded-lg bg-white/5 text-gray-400 hover:bg-red-500/20 hover:text-red-400 text-xs">-</button>
            <span class="w-8 text-center text-sm font-mono">\${item.quantity}</span>
            <button onclick="changeQty(\${i}, 1)" class="w-7 h-7 rounded-lg bg-white/5 text-gray-400 hover:bg-green-500/20 hover:text-green-400 text-xs">+</button>
          </div>
          <div class="text-right min-w-[90px]">
            <p class="text-sm font-mono font-bold text-fk-purple">\${formatRupiah(item.price * item.quantity)}</p>
          </div>
          <button onclick="removeFromCart(\${i})" class="text-gray-500 hover:text-red-400 text-xs"><i class="fa-solid fa-xmark"></i></button>
        </div>
      \`).join('');
    }

    function updateTotals() {
      const subtotal = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
      const discount = parseInt(document.getElementById('discountInput').value) || 0;
      const shipping = parseInt(document.getElementById('shippingInput').value) || 0;
      const total = subtotal - discount + shipping;
      const profit = cart.reduce((s, i) => s + ((i.price - i.cost_price) * i.quantity), 0) - discount;
      
      document.getElementById('subtotalDisplay').textContent = formatRupiah(subtotal);
      document.getElementById('totalDisplay').textContent = formatRupiah(total);
      document.getElementById('profitDisplay').textContent = formatRupiah(profit);
    }

    function selectPayment(method) {
      selectedPayment = method;
      document.querySelectorAll('.pay-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.method === method);
      });
    }

    function clearCart() {
      if (cart.length > 0 && !confirm('Reset semua? Keranjang akan dikosongkan.')) return;
      cart = [];
      document.getElementById('custName').value = '';
      document.getElementById('custPhone').value = '';
      document.getElementById('discountInput').value = '0';
      document.getElementById('shippingInput').value = '0';
      document.getElementById('orderNotes').value = '';
      selectedPayment = 'cash';
      document.querySelectorAll('.pay-btn').forEach(b => b.classList.toggle('active', b.dataset.method === 'cash'));
      renderCart();
      renderProducts(allProducts);
      updateTotals();
    }

    async function saveOrder() {
      if (cart.length === 0) { showToast('Keranjang kosong!', 'error'); return; }
      
      const btn = document.getElementById('btnSave');
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Menyimpan...';
      
      try {
        const body = {
          customer_name: document.getElementById('custName').value.trim() || 'Walk-in Customer',
          customer_phone: document.getElementById('custPhone').value.trim(),
          items: cart.map(c => ({
            product_id: c.product_id,
            name: c.name,
            price: c.price,
            cost_price: c.cost_price,
            quantity: c.quantity,
            size: c.size,
            color: c.color
          })),
          payment_method: selectedPayment,
          discount: document.getElementById('discountInput').value,
          shipping_cost: document.getElementById('shippingInput').value,
          notes: document.getElementById('orderNotes').value.trim(),
          send_wa: document.getElementById('sendWA').checked
        };
        
        const res = await apiFetch('/api/orders', { method: 'POST', body: JSON.stringify(body) });
        showToast('Pesanan ' + res.data.order_number + ' berhasil disimpan!');
        
        // Reset after save
        cart = [];
        document.getElementById('custName').value = '';
        document.getElementById('custPhone').value = '';
        document.getElementById('discountInput').value = '0';
        document.getElementById('shippingInput').value = '0';
        document.getElementById('orderNotes').value = '';
        renderCart();
        updateTotals();
        
        // Reload products to get updated stock
        await loadProducts();
      } catch(e) {
        showToast('Gagal menyimpan: ' + e.message, 'error');
      }
      
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-check mr-2"></i>Simpan Pesanan';
    }

    function sendWhatsApp() {
      const phone = document.getElementById('custPhone').value.trim();
      if (!phone) { showToast('Isi nomor WhatsApp pelanggan dulu!', 'error'); return; }
      if (cart.length === 0) { showToast('Keranjang kosong!', 'error'); return; }
      
      const subtotal = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
      const discount = parseInt(document.getElementById('discountInput').value) || 0;
      const shipping = parseInt(document.getElementById('shippingInput').value) || 0;
      const total = subtotal - discount + shipping;
      const store = getStore();
      
      let msg = '*' + (store.name || 'FashionKas') + ' - Struk Pembelian*\\n\\n';
      cart.forEach(item => {
        msg += item.name + ' x' + item.quantity + ' = ' + formatRupiah(item.price * item.quantity) + '\\n';
      });
      if (discount > 0) msg += '\\nDiskon: -' + formatRupiah(discount);
      if (shipping > 0) msg += '\\nOngkir: +' + formatRupiah(shipping);
      msg += '\\n\\n*Total: ' + formatRupiah(total) + '*';
      msg += '\\nBayar: ' + selectedPayment.toUpperCase();
      msg += '\\n\\nTerima kasih sudah berbelanja! 🙏';
      
      const waPhone = phone.startsWith('0') ? '62' + phone.slice(1) : phone;
      window.open('https://wa.me/' + waPhone + '?text=' + encodeURIComponent(msg), '_blank');
    }

    // Init
    loadProducts();
  </script>`
  
  return fashionLayout('Kasir', content, 'sale')
}
