// WhatsApp Automation Page - FULL Fonnte Integration
// FashionKas v1.2.1 - Deep dive Fonnte API integration
// Features: Device status, quota, send receipt, shipping, broadcast, custom msg, validate, history
import { fashionLayout } from '../layout'

export function waAutomationPage(): string {
  const content = `
  <div class="py-6 space-y-5" id="waContent">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-heading font-bold text-xl"><i class="fa-brands fa-whatsapp text-green-400 mr-2"></i>WhatsApp Automation</h1>
        <p class="text-xs text-gray-500">Powered by Fonnte API - Auto struk, notif & promo</p>
      </div>
      <button onclick="refreshAll()" class="text-xs px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20">
        <i class="fa-solid fa-rotate mr-1"></i>Refresh
      </button>
    </div>

    <!-- Device Status Card -->
    <div class="glass-card rounded-xl p-5 fk-border fk-glow" id="deviceCard">
      <div class="flex items-center justify-between mb-3">
        <h2 class="font-heading font-bold text-sm"><i class="fa-solid fa-mobile-screen text-green-400 mr-2"></i>Status Device</h2>
        <span id="deviceBadge" class="text-[10px] px-2.5 py-1 rounded-full bg-gray-500/15 text-gray-400 animate-pulse">Checking...</span>
      </div>
      <div id="deviceInfo" class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="bg-white/5 rounded-xl p-3 text-center animate-pulse"><div class="h-5 bg-white/5 rounded mb-1"></div><div class="h-3 bg-white/5 rounded w-12 mx-auto"></div></div>
        <div class="bg-white/5 rounded-xl p-3 text-center animate-pulse"><div class="h-5 bg-white/5 rounded mb-1"></div><div class="h-3 bg-white/5 rounded w-12 mx-auto"></div></div>
        <div class="bg-white/5 rounded-xl p-3 text-center animate-pulse"><div class="h-5 bg-white/5 rounded mb-1"></div><div class="h-3 bg-white/5 rounded w-12 mx-auto"></div></div>
        <div class="bg-white/5 rounded-xl p-3 text-center animate-pulse"><div class="h-5 bg-white/5 rounded mb-1"></div><div class="h-3 bg-white/5 rounded w-12 mx-auto"></div></div>
      </div>
    </div>

    <!-- Quick Actions Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <button onclick="showBroadcast()" class="glass-card rounded-xl p-4 text-left card-hover fk-border">
        <div class="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-2"><i class="fa-solid fa-bullhorn text-green-400"></i></div>
        <p class="text-sm font-bold">Broadcast</p>
        <p class="text-[10px] text-gray-500">Promo ke customer</p>
      </button>
      <button onclick="showCustomMsg()" class="glass-card rounded-xl p-4 text-left card-hover fk-border">
        <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-2"><i class="fa-solid fa-paper-plane text-blue-400"></i></div>
        <p class="text-sm font-bold">Kirim Pesan</p>
        <p class="text-[10px] text-gray-500">Custom message</p>
      </button>
      <button onclick="showValidate()" class="glass-card rounded-xl p-4 text-left card-hover fk-border">
        <div class="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-2"><i class="fa-solid fa-circle-check text-cyan-400"></i></div>
        <p class="text-sm font-bold">Cek Nomor</p>
        <p class="text-[10px] text-gray-500">Validate WA number</p>
      </button>
      <button onclick="showHistory()" class="glass-card rounded-xl p-4 text-left card-hover fk-border">
        <div class="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-2"><i class="fa-solid fa-clock-rotate-left text-purple-400"></i></div>
        <p class="text-sm font-bold">Riwayat</p>
        <p class="text-[10px] text-gray-500">Log pesan terkirim</p>
      </button>
    </div>

    <!-- Auto Features Status -->
    <div class="glass-card rounded-xl p-5 fk-border">
      <h2 class="font-heading font-bold text-sm mb-3"><i class="fa-solid fa-wand-magic-sparkles mr-2 text-fk-purple"></i>Fitur Otomatis Aktif</h2>
      <div class="space-y-3">
        <div class="flex items-center justify-between py-2 border-b border-white/5">
          <div class="flex items-center gap-3"><i class="fa-solid fa-receipt text-green-400 text-sm"></i><div><p class="text-sm">Auto-kirim struk</p><p class="text-[10px] text-gray-500">Struk otomatis dari kasir + typing indicator</p></div></div>
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-green-500/15 text-green-400">Aktif</span>
        </div>
        <div class="flex items-center justify-between py-2 border-b border-white/5">
          <div class="flex items-center gap-3"><i class="fa-solid fa-truck text-blue-400 text-sm"></i><div><p class="text-sm">Notif pengiriman</p><p class="text-[10px] text-gray-500">Auto resi + link tracking cekresi.com</p></div></div>
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-green-500/15 text-green-400">Aktif</span>
        </div>
        <div class="flex items-center justify-between py-2 border-b border-white/5">
          <div class="flex items-center gap-3"><i class="fa-solid fa-bullhorn text-amber-400 text-sm"></i><div><p class="text-sm">Broadcast promo</p><p class="text-[10px] text-gray-500">Ke semua/segment customer + random delay</p></div></div>
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-green-500/15 text-green-400">Aktif</span>
        </div>
        <div class="flex items-center justify-between py-2">
          <div class="flex items-center gap-3"><i class="fa-solid fa-robot text-fk-purple text-sm"></i><div><p class="text-sm">Closer AI Follow-up</p><p class="text-[10px] text-gray-500">Smart follow-up via Fonnte API</p></div></div>
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-green-500/15 text-green-400">Aktif</span>
        </div>
      </div>
    </div>

    <!-- Recent Orders - Resend -->
    <div class="glass-card rounded-xl p-5 fk-border">
      <h2 class="font-heading font-bold text-sm mb-3"><i class="fa-solid fa-paper-plane mr-2 text-green-400"></i>Kirim Ulang Struk / Notif Kirim</h2>
      <div id="recentOrders"><div class="text-center py-4"><i class="fa-solid fa-spinner fa-spin text-fk-purple"></i></div></div>
    </div>

    <!-- Broadcast Modal -->
    <div id="broadcastModal" class="fixed inset-0 z-[60] hidden">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeBroadcast()"></div>
      <div class="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto glass-card rounded-t-2xl p-6 sm:max-w-lg sm:mx-auto sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl border border-white/5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-heading font-bold text-lg"><i class="fa-solid fa-bullhorn text-green-400 mr-2"></i>Broadcast Promo</h3>
          <button onclick="closeBroadcast()" class="text-gray-500 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
        </div>
        <div class="space-y-3">
          <div>
            <label class="text-xs text-gray-400 font-medium mb-1 block">Target Segment</label>
            <select id="bcTarget" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm">
              <option value="all">Semua Customer</option>
              <option value="new">Customer Baru</option>
              <option value="returning">Customer Loyal</option>
            </select>
          </div>
          <div>
            <label class="text-xs text-gray-400 font-medium mb-1 block">Pesan Promo *</label>
            <textarea id="bcMessage" placeholder="Contoh: PROMO SPESIAL! Diskon 20% untuk semua gamis collection terbaru. Berlaku hingga akhir bulan!" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm resize-none h-28" oninput="updateBcPreview()"></textarea>
            <p class="text-[10px] text-gray-600 mt-1">Link katalog & info toko otomatis ditambahkan</p>
          </div>
          <div>
            <label class="text-xs text-gray-400 font-medium mb-1 block">URL Gambar (opsional)</label>
            <input type="url" id="bcImageUrl" placeholder="https://example.com/promo.jpg" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm">
            <p class="text-[10px] text-gray-600 mt-1">Format: JPG/PNG/WebP, maks 10MB (perlu paket Super+)</p>
          </div>
          <div class="glass-card rounded-xl p-3 border border-green-500/10 bg-green-500/5">
            <p class="text-[10px] text-gray-400 mb-1"><i class="fa-brands fa-whatsapp text-green-400 mr-1"></i>Preview:</p>
            <p class="text-xs text-gray-300 whitespace-pre-line" id="bcPreview">*Nama Toko* 🛍️\n\n[pesan Anda]\n\n📲 Lihat katalog: fashionkas.pages.dev/catalog/...\n💬 Order langsung: Chat kami di sini!</p>
          </div>
          <div class="flex items-center gap-2 text-[10px] text-gray-500">
            <i class="fa-solid fa-clock"></i>
            <span>Delay 2-5 detik antar pesan (anti-ban Fonnte)</span>
          </div>
          <button onclick="sendBroadcast()" id="btnBroadcast" class="w-full py-3.5 rounded-xl bg-[#25D366] text-white font-heading font-bold text-sm shadow-lg shadow-green-500/20">
            <i class="fa-brands fa-whatsapp mr-2"></i>Kirim Broadcast
          </button>
        </div>
      </div>
    </div>

    <!-- Custom Message Modal -->
    <div id="customModal" class="fixed inset-0 z-[60] hidden">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeCustom()"></div>
      <div class="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto glass-card rounded-t-2xl p-6 sm:max-w-lg sm:mx-auto sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl border border-white/5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-heading font-bold text-lg"><i class="fa-solid fa-paper-plane text-blue-400 mr-2"></i>Kirim Pesan Custom</h3>
          <button onclick="closeCustom()" class="text-gray-500 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
        </div>
        <div class="space-y-3">
          <div>
            <label class="text-xs text-gray-400 font-medium mb-1 block">Nomor Tujuan *</label>
            <input type="text" id="cmPhone" placeholder="08xxxxxxxxxx" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm">
            <p class="text-[10px] text-gray-600 mt-1">Pisah koma untuk banyak nomor. Auto +62</p>
          </div>
          <div>
            <label class="text-xs text-gray-400 font-medium mb-1 block">Pesan *</label>
            <textarea id="cmMessage" placeholder="Tulis pesan di sini..." class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm resize-none h-32"></textarea>
          </div>
          <div>
            <label class="text-xs text-gray-400 font-medium mb-1 block">URL Gambar / File (opsional)</label>
            <input type="url" id="cmImageUrl" placeholder="https://example.com/image.jpg" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm">
          </div>
          <div class="flex items-center gap-3">
            <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="cmTyping" checked class="rounded"><span class="text-xs text-gray-400">Typing indicator</span></label>
          </div>
          <button onclick="sendCustomMsg()" id="btnCustom" class="w-full py-3.5 rounded-xl bg-blue-500 text-white font-heading font-bold text-sm shadow-lg shadow-blue-500/20">
            <i class="fa-solid fa-paper-plane mr-2"></i>Kirim Pesan
          </button>
        </div>
      </div>
    </div>

    <!-- Validate Number Modal -->
    <div id="validateModal" class="fixed inset-0 z-[60] hidden">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeValidate()"></div>
      <div class="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto glass-card rounded-t-2xl p-6 sm:max-w-lg sm:mx-auto sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl border border-white/5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-heading font-bold text-lg"><i class="fa-solid fa-circle-check text-cyan-400 mr-2"></i>Cek Nomor WhatsApp</h3>
          <button onclick="closeValidate()" class="text-gray-500 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
        </div>
        <div class="space-y-3">
          <div>
            <label class="text-xs text-gray-400 font-medium mb-1 block">Nomor yang dicek *</label>
            <textarea id="valNumbers" placeholder="08xxxxxxxxxx&#10;08xxxxxxxxxx&#10;(1 nomor per baris atau pisah koma)" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm resize-none h-24"></textarea>
            <p class="text-[10px] text-gray-600 mt-1">Maks 500 nomor sekaligus</p>
          </div>
          <button onclick="validateNumbers()" id="btnValidate" class="w-full py-3 rounded-xl bg-cyan-500 text-white font-heading font-bold text-sm">
            <i class="fa-solid fa-magnifying-glass mr-2"></i>Cek Nomor
          </button>
          <div id="valResult" class="hidden space-y-2">
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-green-500/10 rounded-xl p-3 text-center"><div class="font-bold text-lg text-green-400" id="valRegistered">0</div><div class="text-[10px] text-gray-500">Terdaftar WA</div></div>
              <div class="bg-red-500/10 rounded-xl p-3 text-center"><div class="font-bold text-lg text-red-400" id="valNotRegistered">0</div><div class="text-[10px] text-gray-500">Tidak Terdaftar</div></div>
            </div>
            <div id="valDetails" class="text-xs space-y-1 max-h-40 overflow-y-auto"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- History Modal -->
    <div id="historyModal" class="fixed inset-0 z-[60] hidden">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeHistory()"></div>
      <div class="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto glass-card rounded-t-2xl p-6 sm:max-w-lg sm:mx-auto sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl border border-white/5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-heading font-bold text-lg"><i class="fa-solid fa-clock-rotate-left text-purple-400 mr-2"></i>Riwayat WA</h3>
          <button onclick="closeHistory()" class="text-gray-500 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
        </div>
        <div id="historyStats" class="grid grid-cols-3 gap-2 mb-3"></div>
        <div id="historyList"><div class="text-center py-8"><i class="fa-solid fa-spinner fa-spin text-fk-purple"></i></div></div>
      </div>
    </div>
  </div>

  <script>
    // ==========================================
    // DEVICE STATUS
    // ==========================================
    async function loadDeviceStatus() {
      try {
        const res = await apiFetch('/api/wa/status');
        const d = res.data;
        const badge = document.getElementById('deviceBadge');
        if (d.connected) {
          badge.textContent = 'Connected';
          badge.className = 'text-[10px] px-2.5 py-1 rounded-full bg-green-500/15 text-green-400';
        } else {
          badge.textContent = d.device_status === 'disconnect' ? 'Disconnected' : 'Setup Needed';
          badge.className = 'text-[10px] px-2.5 py-1 rounded-full bg-red-500/15 text-red-400';
        }
        document.getElementById('deviceInfo').innerHTML = 
          '<div class="bg-white/5 rounded-xl p-3 text-center"><div class="text-sm font-bold text-green-400">' + (d.device || '-') + '</div><div class="text-[10px] text-gray-500">Device</div></div>' +
          '<div class="bg-white/5 rounded-xl p-3 text-center"><div class="text-sm font-bold ' + (d.connected ? 'text-green-400' : 'text-red-400') + '">' + (d.device_status || 'unknown') + '</div><div class="text-[10px] text-gray-500">Status</div></div>' +
          '<div class="bg-white/5 rounded-xl p-3 text-center"><div class="text-sm font-bold text-amber-400">' + (d.quota || '0') + '</div><div class="text-[10px] text-gray-500">Quota (' + (d.package || '?') + ')</div></div>' +
          '<div class="bg-white/5 rounded-xl p-3 text-center"><div class="text-sm font-bold text-fk-purple">' + (d.messages || 0) + '</div><div class="text-[10px] text-gray-500">Terkirim</div></div>';
      } catch(e) {
        document.getElementById('deviceBadge').textContent = 'Error';
        document.getElementById('deviceBadge').className = 'text-[10px] px-2.5 py-1 rounded-full bg-red-500/15 text-red-400';
      }
    }

    // ==========================================
    // RECENT ORDERS
    // ==========================================
    async function loadRecentOrders() {
      try {
        const res = await apiFetch('/api/orders');
        const orders = (res.data || []).slice(0, 10);
        const el = document.getElementById('recentOrders');
        if (orders.length === 0) { el.innerHTML = '<p class="text-sm text-gray-500 text-center py-4">Belum ada pesanan</p>'; return; }
        el.innerHTML = orders.map(o => {
          const sc = {pending:'amber',processing:'blue',shipped:'cyan',delivered:'green'}[o.shipping_status] || 'gray';
          return '<div class="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0">' +
            '<div class="w-9 h-9 rounded-lg bg-'+sc+'-500/10 flex items-center justify-center"><i class="fa-solid fa-'+(o.shipping_status==='shipped'?'truck':o.shipping_status==='delivered'?'check':'box')+' text-'+sc+'-400 text-xs"></i></div>' +
            '<div class="flex-1 min-w-0"><p class="text-sm font-medium truncate">' + (o.customer_name||'Walk-in') + '</p>' +
            '<p class="text-[10px] text-gray-500">' + o.order_number + ' | ' + formatRupiah(o.total_amount) + '</p></div>' +
            '<div class="flex gap-1">' +
            (o.customer_phone ? '<button onclick="resendReceipt(\\''+o.id+'\\')" class="text-[10px] px-2 py-1.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20"><i class="fa-solid fa-receipt mr-0.5"></i>Struk</button>' : '') +
            (o.customer_phone ? '<button onclick="sendShipping(\\''+o.id+'\\',\\''+(o.tracking_number||'')+'\\')" class="text-[10px] px-2 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20"><i class="fa-solid fa-truck mr-0.5"></i>Kirim</button>' : '<span class="text-[10px] text-gray-600 italic">No phone</span>') +
            '</div></div>';
        }).join('');
      } catch(e) { document.getElementById('recentOrders').innerHTML = '<p class="text-sm text-red-400 text-center py-4">Gagal: ' + e.message + '</p>'; }
    }

    async function resendReceipt(orderId) {
      if (!confirm('Kirim struk via WhatsApp?')) return;
      try {
        showToast('Mengirim struk WA...', 'info');
        const res = await apiFetch('/api/wa/send-receipt', { method: 'POST', body: JSON.stringify({ order_id: orderId }) });
        showToast(res.message || 'Struk dikirim!');
        loadDeviceStatus(); // refresh quota
      } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
    }

    async function sendShipping(orderId, existingResi) {
      const tracking = prompt('Masukkan No. Resi:', existingResi);
      if (tracking === null) return;
      const courier = prompt('Kurir (JNE/JNT/SiCepat/dll):', '');
      try {
        showToast('Mengirim notifikasi pengiriman...', 'info');
        const res = await apiFetch('/api/wa/send-shipping', { method: 'POST', body: JSON.stringify({ order_id: orderId, tracking_number: tracking, courier: courier || '' }) });
        showToast(res.message || 'Notif dikirim!');
        loadRecentOrders();
        loadDeviceStatus();
      } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
    }

    // ==========================================
    // BROADCAST
    // ==========================================
    function showBroadcast() { document.getElementById('broadcastModal').classList.remove('hidden'); updateBcPreview(); }
    function closeBroadcast() { document.getElementById('broadcastModal').classList.add('hidden'); }

    function updateBcPreview() {
      const s = getStore();
      const msg = document.getElementById('bcMessage').value || '[pesan Anda]';
      document.getElementById('bcPreview').textContent = '*' + (s.name||'Toko') + '* \\u{1F6CD}\\n\\n' + msg + '\\n\\n\\u{1F4F2} Lihat katalog: fashionkas.pages.dev/catalog/' + (s.slug||'...') + '\\n\\u{1F4AC} Order langsung: Chat kami di sini!';
    }

    async function sendBroadcast() {
      const msg = document.getElementById('bcMessage').value.trim();
      if (!msg) { showToast('Tulis pesan dulu!', 'error'); return; }
      const target = document.getElementById('bcTarget').value;
      const imageUrl = document.getElementById('bcImageUrl').value.trim();
      const btn = document.getElementById('btnBroadcast');
      btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Mengirim...';
      try {
        const body = { message: msg, target_segment: target };
        if (imageUrl) body.image_url = imageUrl;
        const res = await apiFetch('/api/wa/broadcast', { method: 'POST', body: JSON.stringify(body) });
        showToast(res.message || 'Broadcast dikirim!');
        closeBroadcast();
        document.getElementById('bcMessage').value = '';
        document.getElementById('bcImageUrl').value = '';
        loadDeviceStatus();
      } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
      btn.disabled = false; btn.innerHTML = '<i class="fa-brands fa-whatsapp mr-2"></i>Kirim Broadcast';
    }

    // ==========================================
    // CUSTOM MESSAGE
    // ==========================================
    function showCustomMsg() { document.getElementById('customModal').classList.remove('hidden'); }
    function closeCustom() { document.getElementById('customModal').classList.add('hidden'); }

    async function sendCustomMsg() {
      const phone = document.getElementById('cmPhone').value.trim();
      const message = document.getElementById('cmMessage').value.trim();
      const imageUrl = document.getElementById('cmImageUrl').value.trim();
      const typing = document.getElementById('cmTyping').checked;
      if (!phone || !message) { showToast('Nomor & pesan wajib diisi!', 'error'); return; }
      const btn = document.getElementById('btnCustom');
      btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Mengirim...';
      try {
        const body = { phone, message, typing };
        if (imageUrl) body.image_url = imageUrl;
        const res = await apiFetch('/api/wa/send-custom', { method: 'POST', body: JSON.stringify(body) });
        showToast(res.message || 'Pesan dikirim!');
        closeCustom();
        document.getElementById('cmPhone').value = '';
        document.getElementById('cmMessage').value = '';
        document.getElementById('cmImageUrl').value = '';
        loadDeviceStatus();
      } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
      btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-paper-plane mr-2"></i>Kirim Pesan';
    }

    // ==========================================
    // VALIDATE NUMBERS
    // ==========================================
    function showValidate() { document.getElementById('validateModal').classList.remove('hidden'); document.getElementById('valResult').classList.add('hidden'); }
    function closeValidate() { document.getElementById('validateModal').classList.add('hidden'); }

    async function validateNumbers() {
      const raw = document.getElementById('valNumbers').value.trim();
      if (!raw) { showToast('Masukkan nomor!', 'error'); return; }
      const numbers = raw.replace(/\\n/g, ',').replace(/\\s+/g, '');
      const btn = document.getElementById('btnValidate');
      btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Mengecek...';
      try {
        const res = await apiFetch('/api/wa/validate', { method: 'POST', body: JSON.stringify({ numbers }) });
        const d = res.data;
        document.getElementById('valRegistered').textContent = (d.registered || []).length;
        document.getElementById('valNotRegistered').textContent = (d.not_registered || []).length;
        let details = '';
        (d.registered || []).forEach(n => { details += '<div class="flex items-center gap-2 py-1"><i class="fa-solid fa-circle-check text-green-400 text-[10px]"></i><span class="text-gray-300">'+n+'</span><span class="text-green-400 text-[10px]">Terdaftar</span></div>'; });
        (d.not_registered || []).forEach(n => { details += '<div class="flex items-center gap-2 py-1"><i class="fa-solid fa-circle-xmark text-red-400 text-[10px]"></i><span class="text-gray-300">'+n+'</span><span class="text-red-400 text-[10px]">Tidak</span></div>'; });
        document.getElementById('valDetails').innerHTML = details;
        document.getElementById('valResult').classList.remove('hidden');
      } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
      btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-magnifying-glass mr-2"></i>Cek Nomor';
    }

    // ==========================================
    // HISTORY
    // ==========================================
    function showHistory() { document.getElementById('historyModal').classList.remove('hidden'); loadHistory(); }
    function closeHistory() { document.getElementById('historyModal').classList.add('hidden'); }

    async function loadHistory() {
      try {
        const res = await apiFetch('/api/wa/history');
        const msgs = res.data.messages || [];
        const stats = res.data.stats || {};
        
        document.getElementById('historyStats').innerHTML = 
          '<div class="bg-white/5 rounded-xl p-2.5 text-center"><div class="font-bold text-sm text-fk-purple">' + (stats.total || 0) + '</div><div class="text-[9px] text-gray-500">Total</div></div>' +
          '<div class="bg-green-500/5 rounded-xl p-2.5 text-center"><div class="font-bold text-sm text-green-400">' + (stats.sent || 0) + '</div><div class="text-[9px] text-gray-500">Terkirim</div></div>' +
          '<div class="bg-red-500/5 rounded-xl p-2.5 text-center"><div class="font-bold text-sm text-red-400">' + (stats.failed || 0) + '</div><div class="text-[9px] text-gray-500">Gagal</div></div>';

        const el = document.getElementById('historyList');
        if (msgs.length === 0) { el.innerHTML = '<p class="text-sm text-gray-500 text-center py-8">Belum ada riwayat</p>'; return; }
        const typeIcons = {receipt:'fa-receipt text-green-400',shipping:'fa-truck text-blue-400',broadcast:'fa-bullhorn text-amber-400',custom:'fa-paper-plane text-cyan-400',closer_followup:'fa-bullseye text-fk-purple'};
        const typeLabels = {receipt:'Struk',shipping:'Pengiriman',broadcast:'Broadcast',custom:'Custom',closer_followup:'Closer AI'};
        el.innerHTML = msgs.slice(0,50).map(m => {
          const icon = typeIcons[m.message_type] || 'fa-message text-gray-400';
          const label = typeLabels[m.message_type] || m.message_type;
          const date = new Date(m.created_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});
          return '<div class="flex items-start gap-3 py-3 border-b border-white/5 last:border-0"><div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0"><i class="fa-solid '+icon+' text-xs"></i></div><div class="flex-1 min-w-0"><div class="flex items-center gap-2"><span class="text-xs font-medium">'+label+'</span><span class="text-[10px] px-1.5 py-0.5 rounded-full '+(m.status==='sent'?'bg-green-500/15 text-green-400':'bg-red-500/15 text-red-400')+'">'+m.status+'</span></div><p class="text-[10px] text-gray-500 truncate">'+m.phone+'</p><p class="text-[10px] text-gray-600">'+date+'</p></div></div>';
        }).join('');
      } catch(e) { document.getElementById('historyList').innerHTML = '<p class="text-sm text-red-400">Gagal: '+e.message+'</p>'; }
    }

    function refreshAll() {
      showToast('Refreshing...', 'info');
      loadDeviceStatus();
      loadRecentOrders();
    }

    // Init
    loadDeviceStatus();
    loadRecentOrders();
  </script>`
  
  return fashionLayout('WhatsApp', content, 'wa')
}
