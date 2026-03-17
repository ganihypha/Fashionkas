// Auth Pages (Login + Register)

const authLayout = (title: string, content: string) => `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | FashionKas</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800;900&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
  <script>tailwind.config={theme:{extend:{colors:{'fk':{'purple':'#A855F7','purple-dark':'#7C3AED'},'empire':{'black':'#0A0A0A','dark':'#111111','navy':'#1A1A2E'}}}}}</script>
  <style>
    body { font-family: 'Inter', sans-serif; background: #0A0A0A; color: #FFFFFF; }
    .glass-card { background: rgba(26,26,46,0.7); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.05); }
    .fk-gradient { background: linear-gradient(135deg, #A855F7, #7C3AED); }
    .fk-border { border: 1px solid rgba(168,85,247,0.2); }
    input:focus { outline: none; border-color: rgba(168,85,247,0.5); }
  </style>
</head>
<body class="min-h-screen flex items-center justify-center p-4">
  ${content}
</body>
</html>`

export function loginPage(): string {
  return authLayout('Login', `
  <div class="w-full max-w-sm">
    <div class="text-center mb-8">
      <div class="w-16 h-16 rounded-2xl fk-gradient flex items-center justify-center mx-auto mb-4">
        <i class="fa-solid fa-shirt text-white text-2xl"></i>
      </div>
      <h1 class="font-['Montserrat'] font-bold text-2xl"><span class="text-fk-purple">Fashion</span>Kas</h1>
      <p class="text-xs text-gray-500 mt-1">Masuk ke akun toko Anda</p>
    </div>
    
    <div class="glass-card rounded-2xl p-6 fk-border">
      <div id="loginError" class="hidden mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs"></div>
      
      <div class="space-y-4">
        <div>
          <label class="text-xs text-gray-500 block mb-1.5">Nomor WhatsApp</label>
          <input type="tel" id="phone" placeholder="08123456789" class="w-full px-4 py-3 rounded-xl bg-empire-dark border border-white/10 text-sm">
        </div>
        <div>
          <label class="text-xs text-gray-500 block mb-1.5">PIN (4-6 digit)</label>
          <input type="password" id="pin" placeholder="****" maxlength="6" class="w-full px-4 py-3 rounded-xl bg-empire-dark border border-white/10 text-sm">
        </div>
        <button onclick="doLogin()" id="btnLogin" class="w-full py-3.5 rounded-xl fk-gradient text-white font-['Montserrat'] font-bold text-sm hover:opacity-90 transition-all">
          <i class="fa-solid fa-right-to-bracket mr-2"></i>Masuk
        </button>
      </div>
      
      <div class="text-center mt-6">
        <p class="text-xs text-gray-500">Belum punya akun? <a href="/register" class="text-fk-purple hover:underline">Daftar Gratis</a></p>
      </div>
    </div>
    
    <div class="text-center mt-4">
      <a href="/" class="text-xs text-gray-600 hover:text-gray-400"><i class="fa-solid fa-arrow-left mr-1"></i>Kembali ke Beranda</a>
    </div>
  </div>
  
  <script>
    async function doLogin() {
      const phone = document.getElementById('phone').value.trim();
      const pin = document.getElementById('pin').value.trim();
      const errEl = document.getElementById('loginError');
      const btn = document.getElementById('btnLogin');
      
      if (!phone || !pin) { errEl.textContent = 'Phone dan PIN wajib diisi'; errEl.classList.remove('hidden'); return; }
      
      btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Memproses...';
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
          window.location.href = '/fashionkas/dashboard';
        } else {
          errEl.textContent = data.message || 'Login gagal'; errEl.classList.remove('hidden');
        }
      } catch (e) {
        errEl.textContent = 'Koneksi gagal, coba lagi'; errEl.classList.remove('hidden');
      }
      
      btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-right-to-bracket mr-2"></i>Masuk';
    }
    
    document.getElementById('pin').addEventListener('keypress', (e) => { if (e.key === 'Enter') doLogin(); });
  </script>`)
}

export function registerPage(): string {
  return authLayout('Daftar', `
  <div class="w-full max-w-sm">
    <div class="text-center mb-6">
      <div class="w-16 h-16 rounded-2xl fk-gradient flex items-center justify-center mx-auto mb-4">
        <i class="fa-solid fa-shirt text-white text-2xl"></i>
      </div>
      <h1 class="font-['Montserrat'] font-bold text-2xl"><span class="text-fk-purple">Fashion</span>Kas</h1>
      <p class="text-xs text-gray-500 mt-1">Daftar toko baru — Gratis!</p>
    </div>
    
    <div class="glass-card rounded-2xl p-6 fk-border">
      <div id="regError" class="hidden mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs"></div>
      
      <div class="space-y-3">
        <div>
          <label class="text-xs text-gray-500 block mb-1">Nama Toko *</label>
          <input type="text" id="storeName" placeholder="Nurul Fashion" class="w-full px-4 py-3 rounded-xl bg-empire-dark border border-white/10 text-sm">
        </div>
        <div>
          <label class="text-xs text-gray-500 block mb-1">Nama Owner *</label>
          <input type="text" id="ownerName" placeholder="Nurul Annisa" class="w-full px-4 py-3 rounded-xl bg-empire-dark border border-white/10 text-sm">
        </div>
        <div>
          <label class="text-xs text-gray-500 block mb-1">Nomor WhatsApp *</label>
          <input type="tel" id="phone" placeholder="08123456789" class="w-full px-4 py-3 rounded-xl bg-empire-dark border border-white/10 text-sm">
        </div>
        <div>
          <label class="text-xs text-gray-500 block mb-1">Kota</label>
          <input type="text" id="city" placeholder="Purwokerto" class="w-full px-4 py-3 rounded-xl bg-empire-dark border border-white/10 text-sm">
        </div>
        <div>
          <label class="text-xs text-gray-500 block mb-1">PIN (4-6 digit) *</label>
          <input type="password" id="pin" placeholder="****" maxlength="6" class="w-full px-4 py-3 rounded-xl bg-empire-dark border border-white/10 text-sm">
        </div>
        <button onclick="doRegister()" id="btnReg" class="w-full py-3.5 rounded-xl fk-gradient text-white font-['Montserrat'] font-bold text-sm hover:opacity-90 transition-all">
          <i class="fa-solid fa-user-plus mr-2"></i>Daftar Gratis
        </button>
      </div>
      
      <div class="text-center mt-4">
        <p class="text-xs text-gray-500">Sudah punya akun? <a href="/login" class="text-fk-purple hover:underline">Masuk</a></p>
      </div>
    </div>
  </div>
  
  <script>
    async function doRegister() {
      const store_name = document.getElementById('storeName').value.trim();
      const owner_name = document.getElementById('ownerName').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const city = document.getElementById('city').value.trim();
      const pin = document.getElementById('pin').value.trim();
      const errEl = document.getElementById('regError');
      const btn = document.getElementById('btnReg');
      
      if (!store_name || !owner_name || !phone || !pin) { errEl.textContent = 'Semua field bertanda * wajib diisi'; errEl.classList.remove('hidden'); return; }
      if (pin.length < 4) { errEl.textContent = 'PIN minimal 4 digit'; errEl.classList.remove('hidden'); return; }
      
      btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Mendaftar...';
      errEl.classList.add('hidden');
      
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ store_name, owner_name, phone, pin, city })
        });
        const data = await res.json();
        
        if (data.success) {
          localStorage.setItem('fk_token', data.data.token);
          localStorage.setItem('fk_store', JSON.stringify(data.data.store));
          window.location.href = '/fashionkas/dashboard';
        } else {
          errEl.textContent = data.message || 'Registrasi gagal'; errEl.classList.remove('hidden');
        }
      } catch (e) {
        errEl.textContent = 'Koneksi gagal, coba lagi'; errEl.classList.remove('hidden');
      }
      
      btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-user-plus mr-2"></i>Daftar Gratis';
    }
  </script>`)
}
