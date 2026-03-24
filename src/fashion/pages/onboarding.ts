// Onboarding Page - First-time user guided tour
// FashionKas v2.3 - Fixed: apiFetch/getStore not defined (script execution order)
import { fashionLayout } from '../layout'

export function onboardingPage(): string {
  const content = `
  <div class="py-6 space-y-6" id="onboardingContent">
    <!-- Progress Bar -->
    <div class="glass-card rounded-xl p-5 fk-border fk-glow">
      <div class="flex items-center justify-between mb-4">
        <h1 class="font-heading font-bold text-xl text-fk-purple">Selamat Datang!</h1>
        <span id="stepProgress" class="text-xs font-mono text-gray-500">1 / 4</span>
      </div>
      <div class="w-full h-2 rounded-full bg-white/5 overflow-hidden">
        <div id="progressBar" class="h-full rounded-full fk-gradient transition-all duration-500" style="width:25%"></div>
      </div>
    </div>

    <!-- Step 1: Welcome -->
    <div id="obStep1" class="onboard-step">
      <div class="glass-card rounded-2xl p-6 fk-border text-center">
        <div class="w-24 h-24 rounded-2xl fk-gradient flex items-center justify-center mx-auto mb-6 shadow-xl shadow-fk-purple/30">
          <i class="fa-solid fa-shirt text-white text-4xl"></i>
        </div>
        <h2 class="font-heading font-bold text-2xl mb-2">Toko Kamu Sudah Aktif!</h2>
        <p class="text-sm text-gray-400 mb-6">Mari setup toko kamu dalam 2 menit. Ikuti 4 langkah mudah berikut ini.</p>
        
        <div class="grid grid-cols-2 gap-3 mb-6 text-left">
          <div class="glass-card rounded-xl p-3 border border-fk-purple/20">
            <div class="flex items-center gap-2 mb-1">
              <i class="fa-solid fa-plus-circle text-fk-purple text-sm"></i>
              <span class="text-xs font-bold">Tambah Produk</span>
            </div>
            <p class="text-[10px] text-gray-500">Upload produk pertama kamu</p>
          </div>
          <div class="glass-card rounded-xl p-3 border border-green-500/20">
            <div class="flex items-center gap-2 mb-1">
              <i class="fa-brands fa-whatsapp text-green-400 text-sm"></i>
              <span class="text-xs font-bold">Share Katalog</span>
            </div>
            <p class="text-[10px] text-gray-500">Bagikan ke pelanggan via WA</p>
          </div>
          <div class="glass-card rounded-xl p-3 border border-amber-500/20">
            <div class="flex items-center gap-2 mb-1">
              <i class="fa-solid fa-cash-register text-amber-400 text-sm"></i>
              <span class="text-xs font-bold">Catat Penjualan</span>
            </div>
            <p class="text-[10px] text-gray-500">Kasir digital super cepat</p>
          </div>
          <div class="glass-card rounded-xl p-3 border border-cyan-500/20">
            <div class="flex items-center gap-2 mb-1">
              <i class="fa-solid fa-chart-pie text-cyan-400 text-sm"></i>
              <span class="text-xs font-bold">Lihat Laporan</span>
            </div>
            <p class="text-[10px] text-gray-500">Analisis otomatis</p>
          </div>
        </div>
        
        <button onclick="goStep(2)" class="w-full py-4 rounded-xl fk-gradient text-white font-heading font-bold text-sm shadow-lg shadow-fk-purple/30">
          Mulai Setup <i class="fa-solid fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>

    <!-- Step 2: Add First Product -->
    <div id="obStep2" class="onboard-step hidden">
      <div class="glass-card rounded-2xl p-6 fk-border">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-12 h-12 rounded-xl bg-fk-purple/15 flex items-center justify-center flex-shrink-0">
            <i class="fa-solid fa-plus-circle text-fk-purple text-xl"></i>
          </div>
          <div>
            <h2 class="font-heading font-bold text-lg">Tambah Produk Pertama</h2>
            <p class="text-xs text-gray-500">Mulai dari 1 produk favorit kamu</p>
          </div>
        </div>
        
        <div class="space-y-3 mb-6">
          <div>
            <label class="text-xs text-gray-400 font-medium mb-1 block">Nama Produk *</label>
            <input type="text" id="obProductName" placeholder="contoh: Gamis Tie-Dye Premium" class="w-full px-3 py-3 rounded-xl bg-empire-dark border border-white/10 text-sm focus:border-fk-purple/50">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs text-gray-400 font-medium mb-1 block">Harga Jual *</label>
              <input type="number" id="obPrice" placeholder="125000" class="w-full px-3 py-3 rounded-xl bg-empire-dark border border-white/10 text-sm font-mono focus:border-fk-purple/50">
            </div>
            <div>
              <label class="text-xs text-gray-400 font-medium mb-1 block">Harga Modal</label>
              <input type="number" id="obCost" placeholder="80000" class="w-full px-3 py-3 rounded-xl bg-empire-dark border border-white/10 text-sm font-mono focus:border-fk-purple/50">
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs text-gray-400 font-medium mb-1 block">Stok</label>
              <input type="number" id="obStock" value="10" class="w-full px-3 py-3 rounded-xl bg-empire-dark border border-white/10 text-sm font-mono focus:border-fk-purple/50">
            </div>
            <div>
              <label class="text-xs text-gray-400 font-medium mb-1 block">Kategori</label>
              <select id="obCategory" class="w-full px-3 py-3 rounded-xl bg-empire-dark border border-white/10 text-sm text-gray-300">
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
          </div>
          <div id="obProductProfit" class="glass-card rounded-xl p-3 border border-green-500/10 bg-green-500/5 hidden">
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-400">Estimasi Profit per Item:</span>
              <span id="obProfitValue" class="text-sm font-mono font-bold text-green-400">+Rp 0</span>
            </div>
          </div>
        </div>

        <div id="obAddError" class="hidden mb-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs"></div>
        
        <div class="flex gap-3">
          <button onclick="goStep(1)" class="px-6 py-3 rounded-xl bg-white/5 text-gray-400 text-sm border border-white/5">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <button onclick="addFirstProduct()" id="btnAddProduct" class="flex-1 py-3.5 rounded-xl fk-gradient text-white font-heading font-bold text-sm shadow-lg shadow-fk-purple/30">
            <i class="fa-solid fa-plus mr-2"></i>Simpan & Lanjut
          </button>
        </div>
        <button onclick="goStep(3)" class="w-full mt-2 py-2 text-xs text-gray-600 hover:text-gray-400">Skip, tambah nanti <i class="fa-solid fa-forward ml-1"></i></button>
      </div>
    </div>

    <!-- Step 3: Share Catalog -->
    <div id="obStep3" class="onboard-step hidden">
      <div class="glass-card rounded-2xl p-6 fk-border">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-12 h-12 rounded-xl bg-green-500/15 flex items-center justify-center flex-shrink-0">
            <i class="fa-brands fa-whatsapp text-green-400 text-xl"></i>
          </div>
          <div>
            <h2 class="font-heading font-bold text-lg">Bagikan Katalog</h2>
            <p class="text-xs text-gray-500">Share link toko kamu ke pelanggan</p>
          </div>
        </div>
        
        <div class="glass-card rounded-xl p-4 mb-4 border border-fk-purple/20 bg-fk-purple/5">
          <p class="text-[10px] text-gray-500 mb-2">Link Katalog Toko Kamu:</p>
          <div class="flex items-center gap-2">
            <input type="text" id="obCatalogUrl" readonly class="flex-1 px-3 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-xs font-mono text-fk-purple truncate">
            <button onclick="copyLink()" class="px-3 py-2.5 rounded-lg bg-fk-purple/10 text-fk-purple border border-fk-purple/20 text-xs hover:bg-fk-purple/20">
              <i class="fa-solid fa-copy"></i>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 mb-6">
          <button onclick="shareWA()" class="py-4 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:opacity-90 transition-all">
            <i class="fa-brands fa-whatsapp mr-2 text-lg"></i>Share WA
          </button>
          <button onclick="copyLink()" class="py-4 rounded-xl bg-fk-purple/10 text-fk-purple border border-fk-purple/20 font-bold text-sm hover:bg-fk-purple/20 transition-all">
            <i class="fa-solid fa-copy mr-2"></i>Copy Link
          </button>
        </div>
        
        <div class="bg-amber-500/5 rounded-xl p-3 border border-amber-500/10 mb-4">
          <p class="text-xs text-amber-400"><i class="fa-solid fa-lightbulb mr-1"></i>Tips:</p>
          <p class="text-[10px] text-gray-400 mt-1">Taruh link katalog di bio Instagram, status WA, atau kirim langsung ke pelanggan. Makin banyak yang lihat, makin banyak order!</p>
        </div>
        
        <div class="flex gap-3">
          <button onclick="goStep(2)" class="px-6 py-3 rounded-xl bg-white/5 text-gray-400 text-sm border border-white/5">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <button onclick="goStep(4)" class="flex-1 py-3.5 rounded-xl fk-gradient text-white font-heading font-bold text-sm shadow-lg shadow-fk-purple/30">
            Lanjut <i class="fa-solid fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Step 4: All Done! -->
    <div id="obStep4" class="onboard-step hidden">
      <div class="glass-card rounded-2xl p-8 fk-border text-center fk-glow">
        <div class="w-20 h-20 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-6">
          <i class="fa-solid fa-check text-green-400 text-3xl"></i>
        </div>
        <h2 class="font-heading font-bold text-2xl mb-2">Toko Siap Jualan!</h2>
        <p class="text-sm text-gray-400 mb-6">FashionKas siap bantu kamu kelola bisnis fashion. Semua fitur bisa dipakai gratis selama masa beta.</p>
        
        <div class="space-y-3 mb-6 text-left max-w-sm mx-auto">
          <div class="flex items-center gap-3 py-2">
            <div class="w-8 h-8 rounded-lg bg-fk-purple/15 flex items-center justify-center flex-shrink-0"><i class="fa-solid fa-cash-register text-fk-purple text-sm"></i></div>
            <div><p class="text-sm font-medium">Mulai Jualan</p><p class="text-[10px] text-gray-500">Buka Kasir dan catat pesanan pertama</p></div>
          </div>
          <div class="flex items-center gap-3 py-2">
            <div class="w-8 h-8 rounded-lg bg-green-500/15 flex items-center justify-center flex-shrink-0"><i class="fa-brands fa-whatsapp text-green-400 text-sm"></i></div>
            <div><p class="text-sm font-medium">WA Automation</p><p class="text-[10px] text-gray-500">Struk & notif otomatis ke pelanggan</p></div>
          </div>
          <div class="flex items-center gap-3 py-2">
            <div class="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0"><i class="fa-solid fa-chart-line text-amber-400 text-sm"></i></div>
            <div><p class="text-sm font-medium">Dashboard & Laporan</p><p class="text-[10px] text-gray-500">Pantau bisnis real-time</p></div>
          </div>
        </div>
        
        <a href="/fashionkas/dashboard" class="block w-full py-4 rounded-xl fk-gradient text-white font-heading font-bold text-sm shadow-lg shadow-fk-purple/30 hover:opacity-90 transition-all">
          <i class="fa-solid fa-rocket mr-2"></i>Masuk ke Dashboard
        </a>
        <a href="/fashionkas/sale" class="block w-full mt-3 py-3 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 text-sm font-bold hover:bg-green-500/20 transition-all">
          <i class="fa-solid fa-cart-plus mr-2"></i>Langsung Buat Pesanan
        </a>
      </div>
    </div>
  </div>

  <script>
    // FashionKas Onboarding v2.2 - Fixed script execution order
    // All code wrapped to avoid running before layout script defines getStore/apiFetch/showToast
    // Using 'var' to avoid 'const' redeclaration conflicts with layout script
    var currentObStep = 1;

    function goStep(step) {
      currentObStep = step;
      document.querySelectorAll('.onboard-step').forEach(el => el.classList.add('hidden'));
      var stepEl = document.getElementById('obStep' + step);
      if (stepEl) stepEl.classList.remove('hidden');
      var progEl = document.getElementById('stepProgress');
      if (progEl) progEl.textContent = step + ' / 4';
      var barEl = document.getElementById('progressBar');
      if (barEl) barEl.style.width = (step * 25) + '%';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Save progress to localStorage
      try { localStorage.setItem('fk_onboarding_step', step); } catch(e) {}
      if (step === 4) {
        try { localStorage.setItem('fk_onboarding_done', '1'); } catch(e) {}
      }
    }

    function updateProfit() {
      var price = parseInt(document.getElementById('obPrice')?.value) || 0;
      var cost = parseInt(document.getElementById('obCost')?.value) || 0;
      var profitEl = document.getElementById('obProductProfit');
      var valEl = document.getElementById('obProfitValue');
      if (price > 0 && cost > 0 && profitEl && valEl) {
        profitEl.classList.remove('hidden');
        valEl.textContent = '+Rp ' + (price - cost).toLocaleString('id-ID');
      } else if (profitEl) {
        profitEl.classList.add('hidden');
      }
    }

    async function addFirstProduct() {
      var name = document.getElementById('obProductName').value.trim();
      var price = parseInt(document.getElementById('obPrice').value) || 0;
      var cost = parseInt(document.getElementById('obCost').value) || 0;
      var stock = parseInt(document.getElementById('obStock').value) || 10;
      var category = document.getElementById('obCategory').value;
      var errEl = document.getElementById('obAddError');
      
      if (!name || !price) {
        if (errEl) { errEl.textContent = 'Nama produk dan harga jual wajib diisi'; errEl.classList.remove('hidden'); }
        return;
      }
      
      var btn = document.getElementById('btnAddProduct');
      if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Menyimpan...'; }
      if (errEl) errEl.classList.add('hidden');
      
      try {
        if (typeof apiFetch !== 'function') throw new Error('Halaman belum siap, coba refresh browser');
        await apiFetch('/api/products', {
          method: 'POST',
          body: JSON.stringify({ name, price, cost_price: cost, stock, category })
        });
        if (typeof showToast === 'function') showToast('Produk pertama berhasil ditambahkan!');
        goStep(3);
      } catch(e) {
        if (errEl) { errEl.textContent = 'Gagal: ' + e.message; errEl.classList.remove('hidden'); }
      }
      if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-plus mr-2"></i>Simpan & Lanjut'; }
    }

    function copyLink() {
      var url = document.getElementById('obCatalogUrl')?.value || '';
      if (!url) return;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
        if (typeof showToast === 'function') showToast('Link katalog disalin!');
      } else {
        prompt('Copy link ini:', url);
      }
    }

    function shareWA() {
      var obStore = (typeof getStore === 'function') ? getStore() : {};
      var url = document.getElementById('obCatalogUrl')?.value || '';
      var msg = 'Hai! Yuk lihat koleksi terbaru kami:\\n\\n*' + (obStore.name || 'Fashion Store') + '*\\n' + url + '\\n\\nPesan langsung via WhatsApp!';
      window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
    }

    // === DEFERRED INITIALIZATION ===
    // This code MUST run after the layout script has loaded (which defines getStore, apiFetch, etc.)
    // Using setTimeout(0) to defer execution to the next event loop tick, after all sync scripts finish
    setTimeout(function() {
      // Auto-fill catalog URL from store data
      try {
        var obStore = (typeof getStore === 'function') ? getStore() : {};
        var catalogUrl = window.location.origin + '/catalog/' + (obStore.slug || '');
        var urlEl = document.getElementById('obCatalogUrl');
        if (urlEl) urlEl.value = catalogUrl;
      } catch(e) {
        console.warn('[Onboarding] Could not load store data:', e.message);
      }

      // Attach profit calculator listeners
      var priceEl = document.getElementById('obPrice');
      var costEl = document.getElementById('obCost');
      if (priceEl) priceEl.addEventListener('input', updateProfit);
      if (costEl) costEl.addEventListener('input', updateProfit);

      // Restore last step if returning
      try {
        var savedStep = localStorage.getItem('fk_onboarding_step');
        if (savedStep && parseInt(savedStep) > 1) goStep(parseInt(savedStep));
      } catch(e) {}
    }, 0);
  </script>`
  
  return fashionLayout('Selamat Datang', content, 'dashboard')
}
