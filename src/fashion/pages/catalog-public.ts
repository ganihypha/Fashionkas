// Public Catalog Page - Dedicated for Nurul Annisa (no auth required)
export function catalogPublicPage(storeSlug: string): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Katalog Online | FashionKas</title>
  <meta name="description" content="Lihat koleksi fashion terbaru kami. Pesan langsung via WhatsApp!">
  <meta property="og:title" content="Katalog Online | FashionKas">
  <meta property="og:description" content="Gamis, Hijab & Fashion Muslim terlengkap. Pesan via WhatsApp!">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@600;700;800;900&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            'fk': { 'purple': '#A855F7', 'purple-light': '#C084FC', 'purple-dark': '#7C3AED' },
            'empire': { 'black': '#0A0A0A', 'dark': '#111111', 'navy': '#1A1A2E' }
          }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'Inter', sans-serif; background: #0A0A0A; color: #FFFFFF; }
    .glass-card { background: rgba(26,26,46,0.7); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.05); }
    .fk-gradient { background: linear-gradient(135deg, #A855F7, #7C3AED); }
    .wa-btn { background: #25D366; }
    .wa-btn:hover { background: #1da851; }
    .card-hover { transition: all 0.3s; }
    .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
  </style>
</head>
<body class="min-h-screen">
  <!-- Header -->
  <div class="glass-card border-b border-white/5">
    <div class="max-w-4xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl fk-gradient flex items-center justify-center">
            <i class="fa-solid fa-shirt text-white"></i>
          </div>
          <div>
            <h1 id="storeName" class="font-['Montserrat'] font-bold text-lg">Loading...</h1>
            <p id="storeDesc" class="text-[11px] text-gray-500"></p>
          </div>
        </div>
        <a id="waBtn" href="#" target="_blank" class="wa-btn px-4 py-2 rounded-lg text-white text-xs font-bold flex items-center gap-1">
          <i class="fa-brands fa-whatsapp"></i> Chat
        </a>
      </div>
    </div>
  </div>

  <div class="max-w-4xl mx-auto px-4 py-6">
    <!-- Search -->
    <div class="relative mb-4">
      <i class="fa-solid fa-search absolute left-3 top-3 text-gray-500 text-sm"></i>
      <input type="text" id="searchInput" placeholder="Cari produk..." oninput="filterProducts()" class="w-full pl-9 pr-4 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm">
    </div>

    <!-- Categories -->
    <div class="flex gap-2 overflow-x-auto scrollbar-hide mb-4 -mx-4 px-4" id="categoryPills">
      <button onclick="filterByCategory('all')" class="cat-pill text-xs px-3 py-1.5 rounded-full bg-fk-purple/20 text-fk-purple border border-fk-purple/30 whitespace-nowrap active" data-cat="all">
        Semua
      </button>
    </div>

    <!-- Product Count -->
    <div class="flex items-center justify-between mb-3">
      <p id="productCount" class="text-xs text-gray-500">Loading...</p>
      <p id="storeCity" class="text-xs text-gray-500"></p>
    </div>

    <!-- Product Grid -->
    <div id="productGrid" class="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <div class="col-span-3 text-center py-12">
        <i class="fa-solid fa-spinner fa-spin text-fk-purple text-2xl"></i>
        <p class="text-xs text-gray-500 mt-2">Memuat katalog...</p>
      </div>
    </div>

    <!-- Empty state -->
    <div id="emptyState" class="hidden text-center py-12">
      <i class="fa-solid fa-box-open text-4xl text-gray-600 mb-3"></i>
      <p class="text-gray-500">Produk tidak ditemukan</p>
    </div>
  </div>

  <!-- Footer -->
  <footer class="border-t border-white/5 py-6 text-center mt-8">
    <div class="flex items-center justify-center gap-2 mb-1">
      <div class="w-5 h-5 rounded fk-gradient flex items-center justify-center">
        <i class="fa-solid fa-shirt text-white text-[8px]"></i>
      </div>
      <span class="font-['Montserrat'] font-bold text-xs"><span class="text-fk-purple">Fashion</span>Kas</span>
    </div>
    <p class="text-[10px] text-gray-600">Katalog digital gratis untuk fashion seller</p>
    <a href="/" class="text-[10px] text-fk-purple hover:underline">Buat katalog sendiri — Gratis!</a>
  </footer>

  <!-- Floating WA Button -->
  <a id="waFloat" href="#" target="_blank" class="fixed bottom-6 right-6 wa-btn w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 z-50" style="animation: pulse 2s infinite;">
    <i class="fa-brands fa-whatsapp text-white text-2xl"></i>
  </a>
  <style>
    @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.4)} 50%{box-shadow:0 0 0 12px rgba(37,211,102,0)} }
    .cat-pill.active { background: rgba(168,85,247,0.2)!important; color: #A855F7!important; border-color: rgba(168,85,247,0.3)!important; }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  </style>

  <script>
    const STORE_SLUG = '${storeSlug}';
    let allProducts = [];
    let storeData = null;
    let currentCategory = 'all';

    function formatRupiah(n) { return 'Rp ' + (n||0).toLocaleString('id-ID'); }

    async function loadCatalog() {
      try {
        const res = await fetch('/api/products/public/' + STORE_SLUG);
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        
        storeData = data.data.store;
        allProducts = data.data.products || [];
        
        // Update store info
        document.getElementById('storeName').textContent = storeData.name;
        document.getElementById('storeDesc').textContent = storeData.description || 'Fashion Store';
        document.getElementById('storeCity').textContent = storeData.city ? '📍 ' + storeData.city : '';
        document.title = storeData.name + ' | FashionKas Katalog';
        
        const waLink = 'https://wa.me/' + (storeData.phone || '');
        document.getElementById('waBtn').href = waLink;
        document.getElementById('waFloat').href = waLink;
        
        // Build category pills
        const categories = [...new Set(allProducts.map(p => p.category))];
        const catColors = {gamis:'#EC4899',hijab:'#8B5CF6',daster:'#F97316',kemeja:'#3B82F6',rok:'#14B8A6',celana:'#6366F1',aksesoris:'#F43F5E'};
        const pillsEl = document.getElementById('categoryPills');
        categories.forEach(cat => {
          const count = allProducts.filter(p => p.category === cat).length;
          const btn = document.createElement('button');
          btn.className = 'cat-pill text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap';
          btn.dataset.cat = cat;
          btn.onclick = () => filterByCategory(cat);
          btn.innerHTML = cat.charAt(0).toUpperCase() + cat.slice(1) + ' <span class="font-mono text-[10px]">' + count + '</span>';
          pillsEl.appendChild(btn);
        });
        
        renderProducts(allProducts);
      } catch(e) {
        document.getElementById('productGrid').innerHTML = '<div class="col-span-3 text-center py-12"><i class="fa-solid fa-exclamation-triangle text-red-400 text-2xl mb-2"></i><p class="text-sm text-gray-400">Toko tidak ditemukan</p><p class="text-xs text-gray-600">' + e.message + '</p></div>';
      }
    }

    function renderProducts(products) {
      const grid = document.getElementById('productGrid');
      const empty = document.getElementById('emptyState');
      const countEl = document.getElementById('productCount');
      
      countEl.textContent = products.length + ' produk';
      
      if (products.length === 0) {
        grid.innerHTML = '';
        empty.classList.remove('hidden');
        return;
      }
      empty.classList.add('hidden');
      
      const catColors = {gamis:'#EC4899',hijab:'#8B5CF6',daster:'#F97316',kemeja:'#3B82F6',rok:'#14B8A6',celana:'#6366F1',aksesoris:'#F43F5E'};
      const phone = storeData ? storeData.phone : '';
      
      grid.innerHTML = products.map(p => {
        const cc = catColors[p.category] || '#6B7280';
        const sizes = Array.isArray(p.sizes) ? p.sizes : (typeof p.sizes === 'string' ? JSON.parse(p.sizes || '[]') : []);
        const waMsg = encodeURIComponent('Halo, saya mau pesan:\\n\\n' + p.name + '\\nHarga: ' + formatRupiah(p.price) + '\\n\\nApakah masih tersedia?');
        return \`
        <div class="glass-card rounded-xl p-3 card-hover border border-white/5">
          \${p.image_url ? '<img src="' + p.image_url + '" alt="' + p.name + '" class="w-full h-32 object-cover rounded-lg mb-2">' : '<div class="w-full h-24 rounded-lg mb-2 flex items-center justify-center" style="background:' + cc + '10"><i class="fa-solid fa-shirt text-2xl" style="color:' + cc + '"></i></div>'}
          <span class="text-[9px] px-1.5 py-0.5 rounded-full" style="background:\${cc}15;color:\${cc}">\${p.category}</span>
          <h3 class="text-sm font-medium mt-1 mb-1 line-clamp-2">\${p.name}</h3>
          \${sizes.length > 0 ? '<div class="flex flex-wrap gap-1 mb-1">' + sizes.slice(0,4).map(s => '<span class="text-[9px] px-1 py-0.5 rounded bg-white/5 text-gray-400">' + s + '</span>').join('') + '</div>' : ''}
          <p class="font-mono font-bold text-fk-purple mb-2">\${formatRupiah(p.price)}</p>
          <div class="flex gap-1">
            <a href="https://wa.me/\${phone}?text=\${waMsg}" target="_blank" class="flex-1 text-center text-xs py-2 rounded-lg wa-btn text-white font-medium">
              <i class="fa-brands fa-whatsapp mr-1"></i>Pesan
            </a>
          </div>
          \${p.stock <= 3 && p.stock > 0 ? '<p class="text-[10px] text-red-400 mt-1 text-center">Sisa ' + p.stock + ' pcs</p>' : ''}
          \${p.stock === 0 ? '<p class="text-[10px] text-red-400 mt-1 text-center">Stok habis</p>' : ''}
        </div>\`;
      }).join('');
    }

    function filterProducts() {
      const q = document.getElementById('searchInput').value.toLowerCase();
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

    loadCatalog();
  </script>
</body>
</html>`
}
