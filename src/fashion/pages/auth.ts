// Auth Pages (Login + Register) - Premium Dark Luxury UI
// FashionKas v1.1

const authLayout = (title: string, content: string) => `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | FashionKas</title>
  <meta name="description" content="FashionKas - Kasir Digital + Katalog Online untuk Fashion Reseller Indonesia">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
  <script>tailwind.config={theme:{extend:{colors:{'fk':{'purple':'#A855F7','purple-light':'#C084FC','purple-dark':'#7C3AED'},'empire':{'black':'#0A0A0A','dark':'#111111','navy':'#1A1A2E'}}}}}</script>
  <style>
    body { font-family: 'Inter', sans-serif; background: #0A0A0A; color: #FFFFFF; }
    .glass-card { background: rgba(26,26,46,0.8); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.06); }
    .fk-gradient { background: linear-gradient(135deg, #A855F7, #7C3AED); }
    .fk-border { border: 1px solid rgba(168,85,247,0.15); }
    input:focus, select:focus { outline: none; border-color: rgba(168,85,247,0.5); box-shadow: 0 0 0 3px rgba(168,85,247,0.1); }
    .fk-glow { box-shadow: 0 0 60px rgba(168,85,247,0.15); }
    .pin-input { letter-spacing: 12px; font-family: 'JetBrains Mono'; font-size: 24px; text-align: center; }
    .float-anim { animation: float 6s ease-in-out infinite; }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    .step-indicator .step.active { background: linear-gradient(135deg, #A855F7, #7C3AED); color: white; }
    .step-indicator .step.done { background: #10B981; color: white; }
    .feature-pill { transition: all 0.3s; }
    .feature-pill:hover { transform: scale(1.05); }
    .bg-pattern { background-image: radial-gradient(rgba(168,85,247,0.03) 1px, transparent 1px); background-size: 24px 24px; }
  </style>
</head>
<body class="min-h-screen flex items-center justify-center p-4 bg-pattern">
  <!-- Ambient glow -->
  <div class="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-fk-purple/5 rounded-full blur-[150px] pointer-events-none"></div>
  ${content}
</body>
</html>`

export function loginPage(): string {
  return authLayout('Login', `
  <div class="w-full max-w-sm relative z-10">
    <!-- Logo -->
    <div class="text-center mb-8">
      <div class="w-20 h-20 rounded-2xl fk-gradient flex items-center justify-center mx-auto mb-4 shadow-lg shadow-fk-purple/30 float-anim">
        <i class="fa-solid fa-shirt text-white text-3xl"></i>
      </div>
      <h1 class="font-['Montserrat'] font-black text-3xl tracking-tight">
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-fk-purple to-fk-purple-light">Fashion</span>Kas
      </h1>
      <p class="text-sm text-gray-500 mt-2">Masuk ke akun toko Anda</p>
    </div>
    
    <!-- Login Card -->
    <div class="glass-card rounded-2xl p-6 fk-border fk-glow">
      <div id="loginError" class="hidden mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
        <i class="fa-solid fa-circle-exclamation"></i><span id="loginErrorText"></span>
      </div>
      <div id="loginSuccess" class="hidden mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs flex items-center gap-2">
        <i class="fa-solid fa-check-circle"></i><span>Login berhasil! Mengalihkan...</span>
      </div>
      
      <div class="space-y-4">
        <!-- Phone Input -->
        <div>
          <label class="text-xs text-gray-400 font-medium block mb-2">
            <i class="fa-brands fa-whatsapp text-green-400 mr-1"></i>Nomor WhatsApp
          </label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-mono">+62</span>
            <input type="tel" id="phone" placeholder="81234567890" 
              class="w-full pl-14 pr-4 py-3.5 rounded-xl bg-empire-dark border border-white/10 text-sm font-mono transition-all">
          </div>
        </div>
        
        <!-- PIN Input -->
        <div>
          <label class="text-xs text-gray-400 font-medium block mb-2">
            <i class="fa-solid fa-lock text-fk-purple mr-1"></i>PIN Keamanan
          </label>
          <input type="password" id="pin" placeholder="••••" maxlength="6" 
            class="w-full px-4 py-3.5 rounded-xl bg-empire-dark border border-white/10 pin-input transition-all">
          <p class="text-[10px] text-gray-600 mt-1.5 text-center">Masukkan 4-6 digit PIN</p>
        </div>
        
        <!-- Login Button -->
        <button onclick="doLogin()" id="btnLogin" 
          class="w-full py-4 rounded-xl fk-gradient text-white font-['Montserrat'] font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-fk-purple/25 active:scale-[0.98]">
          <i class="fa-solid fa-right-to-bracket mr-2"></i>Masuk ke Dashboard
        </button>
      </div>
      
      <!-- Divider -->
      <div class="flex items-center gap-3 my-6">
        <div class="flex-1 border-t border-white/5"></div>
        <span class="text-[10px] text-gray-600 uppercase tracking-wider">atau</span>
        <div class="flex-1 border-t border-white/5"></div>
      </div>
      
      <!-- Register CTA -->
      <a href="/register" class="block w-full py-3.5 rounded-xl bg-white/5 text-center text-sm text-gray-300 hover:bg-white/10 transition-all border border-white/5">
        <i class="fa-solid fa-user-plus mr-2 text-fk-purple"></i>Buat Akun Baru — <span class="text-fk-purple font-bold">Gratis!</span>
      </a>
    </div>
    
    <!-- Back to Home -->
    <div class="text-center mt-6">
      <a href="/" class="text-xs text-gray-600 hover:text-gray-400 transition-colors">
        <i class="fa-solid fa-arrow-left mr-1"></i>Kembali ke Beranda
      </a>
    </div>
    
    <!-- Features -->
    <div class="flex flex-wrap justify-center gap-2 mt-6">
      <span class="feature-pill text-[10px] px-3 py-1 rounded-full bg-white/5 text-gray-500 border border-white/5">
        <i class="fa-solid fa-shield-halved text-green-400 mr-1"></i>PIN Encrypted
      </span>
      <span class="feature-pill text-[10px] px-3 py-1 rounded-full bg-white/5 text-gray-500 border border-white/5">
        <i class="fa-solid fa-bolt text-amber-400 mr-1"></i>Instant Access
      </span>
      <span class="feature-pill text-[10px] px-3 py-1 rounded-full bg-white/5 text-gray-500 border border-white/5">
        <i class="fa-solid fa-cloud text-blue-400 mr-1"></i>Cloud Sync
      </span>
    </div>
  </div>
  
  <script>
    // Auto-format phone
    document.getElementById('phone').addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '');
    });
    document.getElementById('pin').addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '');
    });

    async function doLogin() {
      let phone = document.getElementById('phone').value.trim();
      const pin = document.getElementById('pin').value.trim();
      const errEl = document.getElementById('loginError');
      const errText = document.getElementById('loginErrorText');
      const succEl = document.getElementById('loginSuccess');
      const btn = document.getElementById('btnLogin');
      
      if (!phone || !pin) { errText.textContent = 'Nomor WhatsApp dan PIN wajib diisi'; errEl.classList.remove('hidden'); return; }
      if (pin.length < 4) { errText.textContent = 'PIN minimal 4 digit'; errEl.classList.remove('hidden'); return; }
      
      // Normalize phone: remove leading 0, add 0 back for backend
      if (phone.startsWith('62')) phone = '0' + phone.slice(2);
      if (!phone.startsWith('0')) phone = '0' + phone;
      
      btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Memverifikasi...';
      errEl.classList.add('hidden');
      
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, pin })
        });
        const data = await res.json();
        
        if (data.success) {
          localStorage.setItem('fk_token', data.data.token);
          localStorage.setItem('fk_store', JSON.stringify(data.data.store));
          succEl.classList.remove('hidden');
          errEl.classList.add('hidden');
          btn.innerHTML = '<i class="fa-solid fa-check mr-2"></i>Berhasil!';
          setTimeout(() => { window.location.href = '/fashionkas/dashboard'; }, 800);
        } else {
          errText.textContent = data.message || 'Login gagal'; errEl.classList.remove('hidden');
          btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-right-to-bracket mr-2"></i>Masuk ke Dashboard';
        }
      } catch (e) {
        errText.textContent = 'Koneksi gagal. Periksa internet Anda.'; errEl.classList.remove('hidden');
        btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-right-to-bracket mr-2"></i>Masuk ke Dashboard';
      }
    }
    
    document.getElementById('pin').addEventListener('keypress', (e) => { if (e.key === 'Enter') doLogin(); });
    document.getElementById('phone').addEventListener('keypress', (e) => { if (e.key === 'Enter') document.getElementById('pin').focus(); });
    
    // Auto-redirect if already logged in
    if (localStorage.getItem('fk_token')) {
      window.location.href = '/fashionkas/dashboard';
    }
  </script>`)
}

export function registerPage(): string {
  return authLayout('Daftar', `
  <div class="w-full max-w-md relative z-10">
    <!-- Logo -->
    <div class="text-center mb-6">
      <div class="w-20 h-20 rounded-2xl fk-gradient flex items-center justify-center mx-auto mb-4 shadow-lg shadow-fk-purple/30 float-anim">
        <i class="fa-solid fa-shirt text-white text-3xl"></i>
      </div>
      <h1 class="font-['Montserrat'] font-black text-3xl tracking-tight">
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-fk-purple to-fk-purple-light">Fashion</span>Kas
      </h1>
      <p class="text-sm text-gray-500 mt-2">Buat toko digital Anda dalam 60 detik</p>
    </div>
    
    <!-- Step Indicator -->
    <div class="step-indicator flex items-center justify-center gap-3 mb-6">
      <div class="step w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold active" data-step="1">1</div>
      <div class="w-8 border-t border-dashed border-white/10"></div>
      <div class="step w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-gray-500" data-step="2">2</div>
      <div class="w-8 border-t border-dashed border-white/10"></div>
      <div class="step w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-gray-500" data-step="3">3</div>
    </div>
    
    <!-- Register Card -->
    <div class="glass-card rounded-2xl p-6 fk-border fk-glow">
      <div id="regError" class="hidden mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
        <i class="fa-solid fa-circle-exclamation"></i><span id="regErrorText"></span>
      </div>
      
      <!-- Step 1: Store Info -->
      <div id="step1" class="space-y-3">
        <h3 class="font-['Montserrat'] font-bold text-sm text-fk-purple mb-1"><i class="fa-solid fa-store mr-2"></i>Info Toko</h3>
        <div>
          <label class="text-xs text-gray-400 font-medium block mb-1.5">Nama Toko *</label>
          <input type="text" id="storeName" placeholder="contoh: Nurul Fashion" 
            class="w-full px-4 py-3 rounded-xl bg-empire-dark border border-white/10 text-sm transition-all">
        </div>
        <div>
          <label class="text-xs text-gray-400 font-medium block mb-1.5">Kategori Utama</label>
          <select id="storeCategory" class="w-full px-4 py-3 rounded-xl bg-empire-dark border border-white/10 text-sm text-gray-300 transition-all">
            <option value="fashion_muslim">Fashion Muslim (Gamis, Hijab)</option>
            <option value="fashion_wanita">Fashion Wanita</option>
            <option value="fashion_pria">Fashion Pria</option>
            <option value="fashion_anak">Fashion Anak</option>
            <option value="aksesoris">Aksesoris & Tas</option>
            <option value="campuran">Campuran</option>
          </select>
        </div>
        <div>
          <label class="text-xs text-gray-400 font-medium block mb-1.5">Kota</label>
          <input type="text" id="city" placeholder="contoh: Purwokerto" 
            class="w-full px-4 py-3 rounded-xl bg-empire-dark border border-white/10 text-sm transition-all">
        </div>
        <button onclick="nextStep(2)" class="w-full py-3.5 rounded-xl fk-gradient text-white font-['Montserrat'] font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-fk-purple/25">
          Lanjut <i class="fa-solid fa-arrow-right ml-2"></i>
        </button>
      </div>
      
      <!-- Step 2: Personal Info -->
      <div id="step2" class="space-y-3 hidden">
        <h3 class="font-['Montserrat'] font-bold text-sm text-fk-purple mb-1"><i class="fa-solid fa-user mr-2"></i>Info Pemilik</h3>
        <div>
          <label class="text-xs text-gray-400 font-medium block mb-1.5">Nama Lengkap *</label>
          <input type="text" id="ownerName" placeholder="contoh: Nurul Annisa" 
            class="w-full px-4 py-3 rounded-xl bg-empire-dark border border-white/10 text-sm transition-all">
        </div>
        <div>
          <label class="text-xs text-gray-400 font-medium block mb-1.5">
            <i class="fa-brands fa-whatsapp text-green-400 mr-1"></i>Nomor WhatsApp *
          </label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-mono">+62</span>
            <input type="tel" id="phone" placeholder="81234567890" 
              class="w-full pl-14 pr-4 py-3 rounded-xl bg-empire-dark border border-white/10 text-sm font-mono transition-all">
          </div>
          <p class="text-[10px] text-gray-600 mt-1">Nomor ini untuk login & menerima notifikasi</p>
        </div>
        <div>
          <label class="text-xs text-gray-400 font-medium block mb-1.5">Deskripsi Toko (opsional)</label>
          <textarea id="storeDesc" placeholder="contoh: Gamis & Hijab premium kualitas terbaik..." 
            class="w-full px-4 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm resize-none h-16 transition-all"></textarea>
        </div>
        <div class="flex gap-2">
          <button onclick="nextStep(1)" class="px-6 py-3 rounded-xl bg-white/5 text-gray-400 text-sm border border-white/5">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <button onclick="nextStep(3)" class="flex-1 py-3.5 rounded-xl fk-gradient text-white font-['Montserrat'] font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-fk-purple/25">
            Lanjut <i class="fa-solid fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
      
      <!-- Step 3: PIN Setup -->
      <div id="step3" class="space-y-4 hidden">
        <h3 class="font-['Montserrat'] font-bold text-sm text-fk-purple mb-1"><i class="fa-solid fa-shield-halved mr-2"></i>Buat PIN Keamanan</h3>
        <div class="text-center">
          <p class="text-xs text-gray-400 mb-4">PIN digunakan untuk login ke toko Anda</p>
          <input type="password" id="pin" placeholder="••••••" maxlength="6" 
            class="w-full px-4 py-4 rounded-xl bg-empire-dark border border-white/10 pin-input transition-all">
          <p class="text-[10px] text-gray-600 mt-2">Minimal 4 digit, maksimal 6 digit</p>
        </div>
        
        <!-- Preview card -->
        <div class="glass-card rounded-xl p-4 border border-fk-purple/10 bg-fk-purple/5">
          <p class="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Preview Toko Anda</p>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl fk-gradient flex items-center justify-center text-white font-bold" id="previewAvatar">FK</div>
            <div>
              <p class="font-bold text-sm" id="previewName">Nama Toko</p>
              <p class="text-[10px] text-gray-500" id="previewCity">Indonesia</p>
            </div>
          </div>
          <div class="mt-2 text-[10px] text-gray-500 font-mono" id="previewSlug">fashionkas.pages.dev/catalog/...</div>
        </div>
        
        <div class="flex gap-2">
          <button onclick="nextStep(2)" class="px-6 py-3 rounded-xl bg-white/5 text-gray-400 text-sm border border-white/5">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <button onclick="doRegister()" id="btnReg" class="flex-1 py-3.5 rounded-xl fk-gradient text-white font-['Montserrat'] font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-fk-purple/25 active:scale-[0.98]">
            <i class="fa-solid fa-rocket mr-2"></i>Buat Toko Sekarang!
          </button>
        </div>
      </div>
      
      <!-- Already have account -->
      <div class="text-center mt-5 pt-4 border-t border-white/5">
        <p class="text-xs text-gray-500">Sudah punya akun? <a href="/login" class="text-fk-purple hover:underline font-medium">Masuk di sini</a></p>
      </div>
    </div>
    
    <!-- Back -->
    <div class="text-center mt-4">
      <a href="/" class="text-xs text-gray-600 hover:text-gray-400 transition-colors">
        <i class="fa-solid fa-arrow-left mr-1"></i>Kembali ke Beranda
      </a>
    </div>
    
    <!-- Trust badges -->
    <div class="flex flex-wrap justify-center gap-2 mt-5">
      <span class="feature-pill text-[10px] px-3 py-1 rounded-full bg-white/5 text-gray-500 border border-white/5">
        <i class="fa-solid fa-gift text-green-400 mr-1"></i>100% Gratis (Beta)
      </span>
      <span class="feature-pill text-[10px] px-3 py-1 rounded-full bg-white/5 text-gray-500 border border-white/5">
        <i class="fa-solid fa-clock text-amber-400 mr-1"></i>Setup 60 detik
      </span>
      <span class="feature-pill text-[10px] px-3 py-1 rounded-full bg-white/5 text-gray-500 border border-white/5">
        <i class="fa-solid fa-credit-card text-red-400 mr-1"></i>Tanpa Kartu Kredit
      </span>
    </div>
  </div>
  
  <script>
    let currentStep = 1;
    
    document.getElementById('phone')?.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '');
    });
    document.getElementById('pin')?.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '');
    });
    
    function nextStep(step) {
      const errEl = document.getElementById('regError');
      const errText = document.getElementById('regErrorText');
      errEl.classList.add('hidden');
      
      // Validate current step before moving forward
      if (step === 2 && currentStep === 1) {
        const storeName = document.getElementById('storeName').value.trim();
        if (!storeName) { errText.textContent = 'Nama toko wajib diisi'; errEl.classList.remove('hidden'); return; }
      }
      if (step === 3 && currentStep === 2) {
        const ownerName = document.getElementById('ownerName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        if (!ownerName) { errText.textContent = 'Nama pemilik wajib diisi'; errEl.classList.remove('hidden'); return; }
        if (!phone || phone.length < 9) { errText.textContent = 'Nomor WhatsApp tidak valid'; errEl.classList.remove('hidden'); return; }
        
        // Update preview
        const storeName = document.getElementById('storeName').value.trim();
        const city = document.getElementById('city').value.trim();
        document.getElementById('previewAvatar').textContent = storeName.substring(0,2).toUpperCase();
        document.getElementById('previewName').textContent = storeName;
        document.getElementById('previewCity').textContent = city || 'Indonesia';
        const slug = storeName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        document.getElementById('previewSlug').textContent = 'fashionkas.pages.dev/catalog/' + slug;
      }
      
      currentStep = step;
      document.querySelectorAll('[id^="step"]').forEach(el => el.classList.add('hidden'));
      document.getElementById('step' + step).classList.remove('hidden');
      
      // Update step indicators
      document.querySelectorAll('.step-indicator .step').forEach(el => {
        const s = parseInt(el.dataset.step);
        el.classList.remove('active', 'done');
        if (s === step) el.classList.add('active');
        else if (s < step) el.classList.add('done');
      });
    }

    async function doRegister() {
      const store_name = document.getElementById('storeName').value.trim();
      const owner_name = document.getElementById('ownerName').value.trim();
      let phone = document.getElementById('phone').value.trim();
      const city = document.getElementById('city').value.trim();
      const pin = document.getElementById('pin').value.trim();
      const description = document.getElementById('storeDesc')?.value.trim() || '';
      const errEl = document.getElementById('regError');
      const errText = document.getElementById('regErrorText');
      const btn = document.getElementById('btnReg');
      
      if (!store_name || !owner_name || !phone || !pin) { errText.textContent = 'Semua field wajib diisi'; errEl.classList.remove('hidden'); return; }
      if (pin.length < 4) { errText.textContent = 'PIN minimal 4 digit'; errEl.classList.remove('hidden'); return; }
      
      // Normalize phone
      if (phone.startsWith('62')) phone = '0' + phone.slice(2);
      if (!phone.startsWith('0')) phone = '0' + phone;
      
      btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Membuat toko...';
      errEl.classList.add('hidden');
      
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ store_name, owner_name, phone, pin, city, description })
        });
        const data = await res.json();
        
        if (data.success) {
          localStorage.setItem('fk_token', data.data.token);
          localStorage.setItem('fk_store', JSON.stringify(data.data.store));
          btn.innerHTML = '<i class="fa-solid fa-check mr-2"></i>Toko Berhasil Dibuat!';
          btn.classList.remove('fk-gradient');
          btn.classList.add('bg-green-500');
          setTimeout(() => { window.location.href = '/fashionkas/dashboard'; }, 1000);
        } else {
          errText.textContent = data.message || 'Registrasi gagal'; errEl.classList.remove('hidden');
          btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-rocket mr-2"></i>Buat Toko Sekarang!';
        }
      } catch (e) {
        errText.textContent = 'Koneksi gagal. Periksa internet Anda.'; errEl.classList.remove('hidden');
        btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-rocket mr-2"></i>Buat Toko Sekarang!';
      }
    }
    
    // Auto-redirect if already logged in
    if (localStorage.getItem('fk_token')) {
      window.location.href = '/fashionkas/dashboard';
    }
  </script>`)
}
