// Follow-up Reminder Page - FashionKas v3.0
// Halaman follow-up untuk pending orders + dormant customers + WA reminder
import { fashionLayout } from '../layout'

export function followupPage(): string {
  const content = `
  <div class="py-6 space-y-4" id="followupContent">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-heading font-bold text-xl"><i class="fa-solid fa-bell text-amber-400 mr-2"></i>Follow-up</h1>
        <p class="text-xs text-gray-500">Pengingat order belum bayar & pelanggan dormant</p>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex gap-2 overflow-x-auto scrollbar-hide">
      <button onclick="switchTab('unpaid')" class="fu-tab text-xs px-4 py-2 rounded-full bg-fk-purple/20 text-fk-purple border border-fk-purple/30 whitespace-nowrap active" data-tab="unpaid">
        <i class="fa-solid fa-money-bill mr-1"></i>Belum Bayar <span id="countUnpaid" class="font-mono ml-1">0</span>
      </button>
      <button onclick="switchTab('pending')" class="fu-tab text-xs px-4 py-2 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-tab="pending">
        <i class="fa-solid fa-clock mr-1 text-amber-400"></i>Pending Kirim <span id="countPending" class="font-mono ml-1">0</span>
      </button>
      <button onclick="switchTab('dormant')" class="fu-tab text-xs px-4 py-2 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-tab="dormant">
        <i class="fa-solid fa-user-clock mr-1 text-red-400"></i>Dormant <span id="countDormant" class="font-mono ml-1">0</span>
      </button>
    </div>

    <!-- Summary -->
    <div class="glass-card rounded-xl p-4 fk-border">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-[10px] text-gray-500 uppercase">Total Perlu Follow-up</p>
          <p id="totalFollowup" class="font-heading font-bold text-2xl text-amber-400">0</p>
        </div>
        <div class="text-right">
          <p class="text-[10px] text-gray-500 uppercase">Potensi Revenue</p>
          <p id="potentialRevenue" class="font-heading font-bold text-lg text-fk-purple">Rp 0</p>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div id="followupList">
      <div class="text-center py-12"><i class="fa-solid fa-spinner fa-spin text-fk-purple text-2xl"></i></div>
    </div>
  </div>

  <style>
    .fu-tab.active { background: rgba(168,85,247,0.2)!important; color: #A855F7!important; border-color: rgba(168,85,247,0.3)!important; }
  </style>

  <script>
    let allOrders = [];
    let allCustomers = [];
    let currentTab = 'unpaid';

    async function loadData() {
      try {
        const [orderRes, custRes] = await Promise.all([
          apiFetch('/api/orders'),
          apiFetch('/api/customers')
        ]);
        allOrders = orderRes.data || [];
        allCustomers = custRes.data || [];
        updateCounts();
        renderTab();
      } catch(e) {
        document.getElementById('followupList').innerHTML = '<p class="text-sm text-red-400 text-center py-8">' + e.message + '</p>';
      }
    }

    function getUnpaidOrders() {
      return allOrders.filter(o => o.payment_status !== 'paid' && o.shipping_status !== 'cancelled');
    }

    function getPendingShip() {
      return allOrders.filter(o => (o.shipping_status === 'pending' || o.shipping_status === 'processing') && o.shipping_status !== 'cancelled');
    }

    function getDormantCustomers() {
      const thirtyDaysAgo = new Date(Date.now() - 30*24*60*60*1000).toISOString();
      return allCustomers.filter(c => 
        (c.total_orders || 0) > 0 && 
        (!c.last_order_at || c.last_order_at < thirtyDaysAgo)
      );
    }

    function updateCounts() {
      const unpaid = getUnpaidOrders();
      const pending = getPendingShip();
      const dormant = getDormantCustomers();
      
      document.getElementById('countUnpaid').textContent = unpaid.length;
      document.getElementById('countPending').textContent = pending.length;
      document.getElementById('countDormant').textContent = dormant.length;
      document.getElementById('totalFollowup').textContent = unpaid.length + pending.length + dormant.length;
      
      const potentialRev = unpaid.reduce((s, o) => s + (o.total_amount || 0), 0);
      document.getElementById('potentialRevenue').textContent = formatRupiah(potentialRev);
    }

    function switchTab(tab) {
      currentTab = tab;
      document.querySelectorAll('.fu-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
      renderTab();
    }

    function renderTab() {
      if (currentTab === 'unpaid') renderUnpaid();
      else if (currentTab === 'pending') renderPending();
      else renderDormant();
    }

    function daysSince(dateStr) {
      if (!dateStr) return 999;
      return Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000*60*60*24));
    }

    function renderUnpaid() {
      const orders = getUnpaidOrders();
      const el = document.getElementById('followupList');
      if (orders.length === 0) {
        el.innerHTML = '<div class="text-center py-12"><i class="fa-solid fa-check-circle text-4xl text-green-500/30 mb-3"></i><p class="text-sm text-gray-500">Semua pesanan sudah lunas!</p></div>';
        return;
      }
      
      el.innerHTML = orders.map(o => {
        const days = daysSince(o.created_at);
        const urgency = days >= 7 ? 'text-red-400 bg-red-500/10 border-red-500/20' : days >= 3 ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-blue-400 bg-blue-500/10 border-blue-500/20';
        const waPhone = o.customer_phone ? (o.customer_phone.startsWith('0') ? '62' + o.customer_phone.slice(1) : o.customer_phone) : '';
        const payBadge = o.payment_status === 'dp' ? '<span class="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400">DP</span>' : '<span class="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/15 text-red-400">Belum Bayar</span>';
        
        const reminderMsg = encodeURIComponent('Halo ' + (o.customer_name || 'Kak') + ', ini pengingat untuk pesanan ' + o.order_number + ' senilai ' + formatRupiah(o.total_amount) + '. ' + (o.payment_status === 'dp' ? 'Mohon segera melunasi sisa pembayaran ya.' : 'Mohon segera melakukan pembayaran ya.') + ' Terima kasih! \\ud83d\\ude4f');
        
        return '<div class="glass-card rounded-xl p-4 mb-3 border ' + urgency + '">' +
          '<div class="flex items-start justify-between mb-2">' +
            '<div>' +
              '<span class="font-mono text-xs font-bold">' + o.order_number + '</span>' +
              '<span class="text-[10px] text-gray-500 ml-2">' + days + ' hari lalu</span>' +
            '</div>' +
            payBadge +
          '</div>' +
          '<div class="flex items-center justify-between mb-3">' +
            '<div class="flex items-center gap-2">' +
              '<div class="w-8 h-8 rounded-full bg-fk-purple/10 flex items-center justify-center text-fk-purple text-xs font-bold">' + (o.customer_name || 'W')[0].toUpperCase() + '</div>' +
              '<div><p class="text-sm font-medium">' + (o.customer_name || 'Walk-in') + '</p>' +
              (o.customer_phone ? '<p class="text-[10px] text-gray-500 font-mono">' + o.customer_phone + '</p>' : '') + '</div>' +
            '</div>' +
            '<p class="font-mono font-bold text-sm text-fk-purple">' + formatRupiah(o.total_amount) + '</p>' +
          '</div>' +
          '<div class="flex gap-2">' +
            (waPhone ? '<a href="https://wa.me/' + waPhone + '?text=' + reminderMsg + '" target="_blank" class="flex-1 text-xs py-2 rounded-lg bg-[#25D366] text-white text-center font-medium"><i class="fa-brands fa-whatsapp mr-1"></i>Kirim Reminder</a>' : '') +
            '<button onclick="markPaid(\\'' + o.id + '\\')" class="flex-1 text-xs py-2 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 font-medium"><i class="fa-solid fa-check mr-1"></i>Tandai Lunas</button>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    function renderPending() {
      const orders = getPendingShip();
      const el = document.getElementById('followupList');
      if (orders.length === 0) {
        el.innerHTML = '<div class="text-center py-12"><i class="fa-solid fa-truck text-4xl text-green-500/30 mb-3"></i><p class="text-sm text-gray-500">Semua pesanan sudah dikirim!</p></div>';
        return;
      }
      
      el.innerHTML = orders.map(o => {
        const days = daysSince(o.created_at);
        const waPhone = o.customer_phone ? (o.customer_phone.startsWith('0') ? '62' + o.customer_phone.slice(1) : o.customer_phone) : '';
        const statusLabel = o.shipping_status === 'processing' ? 'Diproses' : 'Pending';
        
        return '<div class="glass-card rounded-xl p-4 mb-3 border border-white/5 card-hover">' +
          '<div class="flex items-start justify-between mb-2">' +
            '<div>' +
              '<span class="font-mono text-xs font-bold text-fk-purple">' + o.order_number + '</span>' +
              '<span class="text-[10px] text-gray-500 ml-2">' + days + ' hari lalu</span>' +
            '</div>' +
            '<span class="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400">' + statusLabel + '</span>' +
          '</div>' +
          '<div class="flex items-center justify-between mb-3">' +
            '<div class="flex items-center gap-2">' +
              '<div class="w-8 h-8 rounded-full bg-fk-purple/10 flex items-center justify-center text-fk-purple text-xs font-bold">' + (o.customer_name || 'W')[0].toUpperCase() + '</div>' +
              '<p class="text-sm font-medium">' + (o.customer_name || 'Walk-in') + '</p>' +
            '</div>' +
            '<p class="font-mono font-bold text-sm">' + formatRupiah(o.total_amount) + '</p>' +
          '</div>' +
          '<div class="flex gap-2">' +
            '<button onclick="markShipped(\\'' + o.id + '\\')" class="flex-1 text-xs py-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium"><i class="fa-solid fa-truck mr-1"></i>Tandai Kirim</button>' +
            (o.shipping_status === 'pending' ? '<button onclick="markProcessing(\\'' + o.id + '\\')" class="flex-1 text-xs py-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium"><i class="fa-solid fa-gear mr-1"></i>Proses</button>' : '') +
          '</div>' +
        '</div>';
      }).join('');
    }

    function renderDormant() {
      const dormant = getDormantCustomers();
      const el = document.getElementById('followupList');
      if (dormant.length === 0) {
        el.innerHTML = '<div class="text-center py-12"><i class="fa-solid fa-users text-4xl text-green-500/30 mb-3"></i><p class="text-sm text-gray-500">Semua pelanggan masih aktif!</p></div>';
        return;
      }
      
      el.innerHTML = dormant.map(c => {
        const days = daysSince(c.last_order_at);
        const waPhone = c.phone ? (c.phone.startsWith('0') ? '62' + c.phone.slice(1) : c.phone) : '';
        const reactivateMsg = encodeURIComponent('Halo ' + (c.name || 'Kak') + '! Apa kabar? Kami ada koleksi baru nih, mau cek katalog terbaru? \\ud83d\\udc57\\u2728');
        
        return '<div class="glass-card rounded-xl p-4 mb-3 border border-white/5 card-hover">' +
          '<div class="flex items-center justify-between mb-3">' +
            '<div class="flex items-center gap-3">' +
              '<div class="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 font-bold text-sm">' + (c.name || 'U')[0].toUpperCase() + '</div>' +
              '<div>' +
                '<p class="text-sm font-medium">' + (c.name || 'Unknown') + '</p>' +
                '<p class="text-[10px] text-gray-500 font-mono">' + (c.phone || '-') + '</p>' +
              '</div>' +
            '</div>' +
            '<div class="text-right">' +
              '<p class="text-[10px] text-red-400">' + days + ' hari dormant</p>' +
              '<p class="text-[10px] text-gray-500">' + (c.total_orders || 0) + ' pesanan lalu</p>' +
            '</div>' +
          '</div>' +
          '<div class="flex items-center justify-between mb-3 text-[10px] text-gray-500">' +
            '<span>Total belanja: ' + formatRupiah(c.total_spent || 0) + '</span>' +
            '<span>Terakhir: ' + (c.last_order_at ? formatDate(c.last_order_at) : '-') + '</span>' +
          '</div>' +
          (waPhone ? '<a href="https://wa.me/' + waPhone + '?text=' + reactivateMsg + '" target="_blank" class="block w-full text-xs py-2.5 rounded-lg bg-[#25D366] text-white text-center font-medium"><i class="fa-brands fa-whatsapp mr-1"></i>Re-engage via WA</a>' : '') +
        '</div>';
      }).join('');
    }

    async function markPaid(id) {
      try {
        await apiFetch('/api/orders/' + id, { method: 'PUT', body: JSON.stringify({ payment_status: 'paid' }) });
        showToast('Pembayaran dikonfirmasi!');
        await loadData();
      } catch(e) { showToast(e.message, 'error'); }
    }

    async function markProcessing(id) {
      try {
        await apiFetch('/api/orders/' + id, { method: 'PUT', body: JSON.stringify({ shipping_status: 'processing' }) });
        showToast('Status diupdate ke Diproses!');
        await loadData();
      } catch(e) { showToast(e.message, 'error'); }
    }

    async function markShipped(id) {
      const resi = prompt('Masukkan nomor resi (opsional):');
      try {
        const body = { shipping_status: 'shipped' };
        if (resi) body.tracking_number = resi;
        await apiFetch('/api/orders/' + id, { method: 'PUT', body: JSON.stringify(body) });
        showToast('Pesanan ditandai kirim!');
        await loadData();
      } catch(e) { showToast(e.message, 'error'); }
    }

    loadData();
  </script>`

  return fashionLayout('Follow-up', content, 'followup')
}
