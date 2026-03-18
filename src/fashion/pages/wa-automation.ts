// WhatsApp Automation Page
// Broadcast, receipt resend, shipping notif, message history
import { fashionLayout } from '../layout'

export function waAutomationPage(): string {
  const content = `
  <div class="py-6 space-y-5" id="waContent">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-heading font-bold text-xl"><i class="fa-brands fa-whatsapp text-green-400 mr-2"></i>WhatsApp Automation</h1>
        <p class="text-xs text-gray-500">Kirim struk, notifikasi & promo otomatis</p>
      </div>
      <span id="waStatus" class="text-[10px] px-2.5 py-1 rounded-full bg-gray-500/15 text-gray-400">Checking...</span>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-2 gap-3">
      <button onclick="showBroadcast()" class="glass-card rounded-xl p-4 text-left fk-border card-hover">
        <div class="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-2"><i class="fa-solid fa-bullhorn text-green-400"></i></div>
        <p class="text-sm font-bold">Broadcast</p>
        <p class="text-[10px] text-gray-500">Kirim promo ke semua customer</p>
      </button>
      <button onclick="showHistory()" class="glass-card rounded-xl p-4 text-left fk-border card-hover">
        <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-2"><i class="fa-solid fa-clock-rotate-left text-blue-400"></i></div>
        <p class="text-sm font-bold">Riwayat</p>
        <p class="text-[10px] text-gray-500">Lihat pesan yang sudah dikirim</p>
      </button>
    </div>

    <!-- WA Features Status -->
    <div class="glass-card rounded-xl p-5 fk-border">
      <h2 class="font-heading font-bold text-sm mb-3"><i class="fa-solid fa-wand-magic-sparkles mr-2 text-fk-purple"></i>Fitur Otomatis</h2>
      <div class="space-y-3">
        <div class="flex items-center justify-between py-2 border-b border-white/5">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-receipt text-green-400 text-sm"></i>
            <div><p class="text-sm">Auto-kirim struk</p><p class="text-[10px] text-gray-500">Struk otomatis saat checkout</p></div>
          </div>
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-green-500/15 text-green-400">Aktif</span>
        </div>
        <div class="flex items-center justify-between py-2 border-b border-white/5">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-truck text-blue-400 text-sm"></i>
            <div><p class="text-sm">Notif pengiriman</p><p class="text-[10px] text-gray-500">Update resi otomatis</p></div>
          </div>
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-green-500/15 text-green-400">Aktif</span>
        </div>
        <div class="flex items-center justify-between py-2">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-bullhorn text-amber-400 text-sm"></i>
            <div><p class="text-sm">Broadcast promo</p><p class="text-[10px] text-gray-500">Kirim ke semua/segment customer</p></div>
          </div>
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-green-500/15 text-green-400">Aktif</span>
        </div>
      </div>
    </div>

    <!-- Recent Orders (for resend) -->
    <div class="glass-card rounded-xl p-5 fk-border">
      <h2 class="font-heading font-bold text-sm mb-3"><i class="fa-solid fa-paper-plane mr-2 text-fk-purple"></i>Kirim Ulang Struk / Notif</h2>
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
            <label class="text-xs text-gray-400 font-medium mb-1 block">Target</label>
            <select id="bcTarget" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm">
              <option value="all">Semua Customer</option>
              <option value="new">Customer Baru</option>
              <option value="returning">Customer Loyal</option>
            </select>
          </div>
          <div>
            <label class="text-xs text-gray-400 font-medium mb-1 block">Pesan Promo *</label>
            <textarea id="bcMessage" placeholder="Contoh: PROMO SPESIAL! Diskon 20% untuk semua gamis collection terbaru. Berlaku hingga akhir bulan!" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm resize-none h-28"></textarea>
            <p class="text-[10px] text-gray-600 mt-1">Link katalog & info toko otomatis ditambahkan</p>
          </div>
          <div class="glass-card rounded-xl p-3 border border-green-500/10 bg-green-500/5">
            <p class="text-[10px] text-gray-400 mb-1">Preview pesan:</p>
            <p class="text-xs text-gray-300" id="bcPreview">*Nama Toko*\n\n[pesan Anda]\n\nLihat katalog: fashionkas.pages.dev/catalog/...</p>
          </div>
          <button onclick="sendBroadcast()" id="btnBroadcast" class="w-full py-3.5 rounded-xl bg-[#25D366] text-white font-heading font-bold text-sm shadow-lg shadow-green-500/20">
            <i class="fa-brands fa-whatsapp mr-2"></i>Kirim Broadcast
          </button>
        </div>
      </div>
    </div>

    <!-- History Modal -->
    <div id="historyModal" class="fixed inset-0 z-[60] hidden">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeHistory()"></div>
      <div class="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto glass-card rounded-t-2xl p-6 sm:max-w-lg sm:mx-auto sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl border border-white/5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-heading font-bold text-lg"><i class="fa-solid fa-clock-rotate-left text-blue-400 mr-2"></i>Riwayat WA</h3>
          <button onclick="closeHistory()" class="text-gray-500 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
        </div>
        <div id="historyList"><div class="text-center py-8"><i class="fa-solid fa-spinner fa-spin text-fk-purple"></i></div></div>
      </div>
    </div>
  </div>

  <script>
    async function checkWaStatus() {
      try {
        const res = await apiFetch('/api/wa/status');
        const el = document.getElementById('waStatus');
        if (res.data.connected) {
          el.textContent = 'Connected';
          el.className = 'text-[10px] px-2.5 py-1 rounded-full bg-green-500/15 text-green-400';
        } else {
          el.textContent = 'Setup Needed';
          el.className = 'text-[10px] px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400';
        }
      } catch { document.getElementById('waStatus').textContent = 'Offline'; }
    }

    async function loadRecentOrders() {
      try {
        const res = await apiFetch('/api/orders');
        const orders = (res.data || []).slice(0, 10);
        const el = document.getElementById('recentOrders');
        if (orders.length === 0) { el.innerHTML = '<p class="text-sm text-gray-500 text-center py-4">Belum ada pesanan</p>'; return; }
        el.innerHTML = orders.map(o => {
          const statusColors = {pending:'amber',processing:'blue',shipped:'cyan',delivered:'green'};
          const sc = statusColors[o.shipping_status] || 'gray';
          return '<div class="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0">' +
            '<div class="flex-1 min-w-0"><p class="text-sm font-medium truncate">' + (o.customer_name||'Walk-in') + '</p>' +
            '<p class="text-[10px] text-gray-500">' + o.order_number + ' | ' + formatRupiah(o.total_amount) + '</p></div>' +
            '<div class="flex gap-1">' +
            (o.customer_phone ? '<button onclick="resendReceipt(\\''+o.id+'\\',\\''+o.order_number+'\\',\\''+o.customer_phone+'\\',\\''+o.customer_name+'\\')" class="text-[10px] px-2 py-1 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20"><i class="fa-solid fa-receipt mr-0.5"></i>Struk</button>' : '') +
            (o.customer_phone ? '<button onclick="sendShipping(\\''+o.id+'\\',\\''+o.order_number+'\\',\\''+o.customer_name+'\\',\\''+(o.tracking_number||'')+'\\')" class="text-[10px] px-2 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20"><i class="fa-solid fa-truck mr-0.5"></i>Kirim</button>' : '<span class="text-[10px] text-gray-600">No phone</span>') +
            '</div></div>';
        }).join('');
      } catch(e) { document.getElementById('recentOrders').innerHTML = '<p class="text-sm text-red-400 text-center py-4">Gagal: ' + e.message + '</p>'; }
    }

    async function resendReceipt(orderId, orderNum, phone, name) {
      if (!confirm('Kirim ulang struk ' + orderNum + ' ke ' + (name||phone) + '?')) return;
      try {
        showToast('Mengirim struk WA...');
        await apiFetch('/api/wa/send-receipt', { method: 'POST', body: JSON.stringify({ order_id: orderId }) });
        showToast('Struk WA berhasil dikirim!');
      } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
    }

    async function sendShipping(orderId, orderNum, name, resi) {
      const tracking = prompt('Masukkan No. Resi untuk ' + orderNum + ':', resi);
      if (tracking === null) return;
      try {
        showToast('Mengirim notifikasi...');
        await apiFetch('/api/wa/send-shipping', { method: 'POST', body: JSON.stringify({ order_id: orderId, tracking_number: tracking }) });
        showToast('Notifikasi pengiriman dikirim!');
        loadRecentOrders();
      } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
    }

    function showBroadcast() { document.getElementById('broadcastModal').classList.remove('hidden'); updatePreview(); }
    function closeBroadcast() { document.getElementById('broadcastModal').classList.add('hidden'); }
    
    function updatePreview() {
      const store = getStore();
      const msg = document.getElementById('bcMessage').value || '[pesan Anda]';
      document.getElementById('bcPreview').textContent = '*' + (store.name||'Toko') + '*\\n\\n' + msg + '\\n\\nLihat katalog: fashionkas.pages.dev/catalog/' + (store.slug||'...');
    }
    document.getElementById('bcMessage')?.addEventListener('input', updatePreview);

    async function sendBroadcast() {
      const msg = document.getElementById('bcMessage').value.trim();
      if (!msg) { showToast('Tulis pesan dulu!', 'error'); return; }
      const target = document.getElementById('bcTarget').value;
      const btn = document.getElementById('btnBroadcast');
      btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Mengirim...';
      try {
        const res = await apiFetch('/api/wa/broadcast', { method: 'POST', body: JSON.stringify({ message: msg, target_segment: target }) });
        showToast(res.message);
        closeBroadcast();
        document.getElementById('bcMessage').value = '';
      } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
      btn.disabled = false; btn.innerHTML = '<i class="fa-brands fa-whatsapp mr-2"></i>Kirim Broadcast';
    }

    function showHistory() { document.getElementById('historyModal').classList.remove('hidden'); loadHistory(); }
    function closeHistory() { document.getElementById('historyModal').classList.add('hidden'); }

    async function loadHistory() {
      try {
        const res = await apiFetch('/api/wa/history');
        const msgs = res.data || [];
        const el = document.getElementById('historyList');
        if (msgs.length === 0) { el.innerHTML = '<p class="text-sm text-gray-500 text-center py-8">Belum ada riwayat</p>'; return; }
        const typeIcons = {receipt:'fa-receipt text-green-400',shipping:'fa-truck text-blue-400',broadcast:'fa-bullhorn text-amber-400'};
        const typeLabels = {receipt:'Struk',shipping:'Pengiriman',broadcast:'Broadcast'};
        el.innerHTML = msgs.map(m => {
          const icon = typeIcons[m.message_type] || 'fa-message text-gray-400';
          const label = typeLabels[m.message_type] || m.message_type;
          const date = new Date(m.created_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});
          return '<div class="flex items-start gap-3 py-3 border-b border-white/5 last:border-0"><div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0"><i class="fa-solid '+icon+' text-xs"></i></div><div class="flex-1 min-w-0"><div class="flex items-center gap-2"><span class="text-xs font-medium">'+label+'</span><span class="text-[10px] px-1.5 py-0.5 rounded-full '+(m.status==='sent'?'bg-green-500/15 text-green-400':'bg-red-500/15 text-red-400')+'">'+m.status+'</span></div><p class="text-[10px] text-gray-500 truncate">'+m.phone+'</p><p class="text-[10px] text-gray-600">'+date+'</p></div></div>';
        }).join('');
      } catch(e) { document.getElementById('historyList').innerHTML = '<p class="text-sm text-red-400">Gagal: '+e.message+'</p>'; }
    }

    checkWaStatus();
    loadRecentOrders();
  </script>`
  
  return fashionLayout('WhatsApp', content, 'wa')
}
