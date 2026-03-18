// Orders Management Page - FashionKas
import { fashionLayout } from '../layout'

export function ordersPage(): string {
  const content = `
  <div class="py-6 space-y-4" id="ordersContent">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-heading font-bold text-xl">Pesanan</h1>
        <p class="text-xs text-gray-500">Kelola semua pesanan toko</p>
      </div>
      <a href="/fashionkas/sale" class="text-xs px-3 py-1.5 rounded-lg fk-gradient text-white font-bold">
        <i class="fa-solid fa-plus mr-1"></i>Pesanan Baru
      </a>
    </div>

    <!-- Summary Cards -->
    <div class="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
      <div class="glass-card rounded-lg p-3 min-w-[120px] flex-shrink-0 text-center">
        <div id="sumRevenue" class="font-heading font-bold text-sm text-fk-purple">-</div>
        <div class="text-[10px] text-gray-500">Total Bulan Ini</div>
      </div>
      <div class="glass-card rounded-lg p-3 min-w-[100px] flex-shrink-0 text-center">
        <div id="sumOrders" class="font-heading font-bold text-sm text-amber-400">-</div>
        <div class="text-[10px] text-gray-500">Pesanan</div>
      </div>
      <div class="glass-card rounded-lg p-3 min-w-[120px] flex-shrink-0 text-center">
        <div id="sumProfit" class="font-heading font-bold text-sm text-green-400">-</div>
        <div class="text-[10px] text-gray-500">Profit</div>
      </div>
    </div>

    <!-- Status Tabs -->
    <div class="flex gap-2 overflow-x-auto scrollbar-hide">
      <button onclick="filterOrders('all')" class="order-tab text-xs px-4 py-2 rounded-full bg-fk-purple/20 text-fk-purple border border-fk-purple/30 whitespace-nowrap active" data-status="all">
        Semua <span id="countAll" class="font-mono ml-1">0</span>
      </button>
      <button onclick="filterOrders('pending')" class="order-tab text-xs px-4 py-2 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-status="pending">
        <i class="fa-solid fa-clock mr-1 text-amber-400"></i>Pending <span id="countPending" class="font-mono ml-1">0</span>
      </button>
      <button onclick="filterOrders('processing')" class="order-tab text-xs px-4 py-2 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-status="processing">
        <i class="fa-solid fa-gear mr-1 text-blue-400"></i>Proses <span id="countProcessing" class="font-mono ml-1">0</span>
      </button>
      <button onclick="filterOrders('shipped')" class="order-tab text-xs px-4 py-2 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-status="shipped">
        <i class="fa-solid fa-truck mr-1 text-cyan-400"></i>Dikirim <span id="countShipped" class="font-mono ml-1">0</span>
      </button>
      <button onclick="filterOrders('delivered')" class="order-tab text-xs px-4 py-2 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-status="delivered">
        <i class="fa-solid fa-check-circle mr-1 text-green-400"></i>Selesai <span id="countDelivered" class="font-mono ml-1">0</span>
      </button>
    </div>

    <!-- Order List -->
    <div id="orderList">
      <div class="text-center py-12"><i class="fa-solid fa-spinner fa-spin text-fk-purple text-2xl"></i><p class="text-xs text-gray-500 mt-2">Memuat pesanan...</p></div>
    </div>
    <div id="emptyOrders" class="hidden text-center py-12">
      <i class="fa-solid fa-box-open text-4xl text-gray-600 mb-3"></i>
      <p class="text-sm text-gray-500 mb-2">Belum ada pesanan</p>
      <a href="/fashionkas/sale" class="inline-block px-4 py-2 rounded-lg fk-gradient text-white text-xs font-bold">Buat Pesanan Pertama</a>
    </div>
  </div>

  <!-- Order Detail Modal -->
  <div id="orderModal" class="fixed inset-0 z-[60] hidden">
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" onclick="closeOrderModal()"></div>
    <div class="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto glass-card rounded-t-2xl p-5 sm:max-w-lg sm:mx-auto sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl">
      <div id="orderDetailContent"></div>
    </div>
  </div>

  <!-- Tracking Input Modal -->
  <div id="trackingModal" class="fixed inset-0 z-[70] hidden">
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" onclick="closeTrackingModal()"></div>
    <div class="absolute bottom-0 left-0 right-0 glass-card rounded-t-2xl p-5 sm:max-w-sm sm:mx-auto sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl">
      <h3 class="font-heading font-bold text-base mb-4">Input Nomor Resi</h3>
      <input type="hidden" id="trackingOrderId">
      <div class="space-y-3 mb-4">
        <input type="text" id="trackingNumber" placeholder="Nomor resi pengiriman" class="w-full px-3 py-2.5 rounded-lg bg-empire-dark border border-white/10 text-sm focus:border-fk-purple/50">
      </div>
      <div class="grid grid-cols-2 gap-2">
        <button onclick="submitTracking()" id="btnSubmitTracking" class="py-2.5 rounded-lg fk-gradient text-white text-xs font-bold">
          <i class="fa-solid fa-truck mr-1"></i>Kirim & Update
        </button>
        <button onclick="closeTrackingModal()" class="py-2.5 rounded-lg bg-white/5 text-gray-400 text-xs">Batal</button>
      </div>
    </div>
  </div>

  <style>
    .order-tab.active { background: rgba(168,85,247,0.2)!important; color: #A855F7!important; border-color: rgba(168,85,247,0.3)!important; }
  </style>

  <script>
    let allOrders = [];
    let currentFilter = 'all';

    async function loadOrders() {
      try {
        const res = await apiFetch('/api/orders');
        allOrders = res.data || [];
        updateCounts();
        updateSummary();
        renderOrders(allOrders);
      } catch(e) {
        document.getElementById('orderList').innerHTML = '<p class="text-sm text-red-400 text-center py-8">Gagal memuat: ' + e.message + '</p>';
      }
    }

    function updateSummary() {
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const monthOrders = allOrders.filter(o => o.created_at >= monthStart);
      const revenue = monthOrders.reduce((s, o) => s + (o.total_amount || 0), 0);
      const profit = monthOrders.reduce((s, o) => s + (o.total_profit || 0), 0);
      document.getElementById('sumRevenue').textContent = formatRupiah(revenue);
      document.getElementById('sumOrders').textContent = monthOrders.length;
      document.getElementById('sumProfit').textContent = formatRupiah(profit);
    }

    function updateCounts() {
      document.getElementById('countAll').textContent = allOrders.length;
      document.getElementById('countPending').textContent = allOrders.filter(o => o.shipping_status === 'pending').length;
      document.getElementById('countProcessing').textContent = allOrders.filter(o => o.shipping_status === 'processing').length;
      document.getElementById('countShipped').textContent = allOrders.filter(o => o.shipping_status === 'shipped').length;
      document.getElementById('countDelivered').textContent = allOrders.filter(o => o.shipping_status === 'delivered').length;
    }

    function getStatusBadge(status) {
      const map = {
        pending: { class: 'status-pending', label: 'Pending', icon: 'clock' },
        processing: { class: 'status-processing', label: 'Diproses', icon: 'gear' },
        shipped: { class: 'status-shipped', label: 'Dikirim', icon: 'truck' },
        delivered: { class: 'status-delivered', label: 'Selesai', icon: 'check-circle' },
        cancelled: { class: 'status-cancelled', label: 'Batal', icon: 'xmark-circle' }
      };
      const s = map[status] || map.pending;
      return '<span class="text-[10px] px-2 py-0.5 rounded-full ' + s.class + '"><i class="fa-solid fa-' + s.icon + ' mr-1"></i>' + s.label + '</span>';
    }

    function getPaymentBadge(status) {
      if (status === 'paid') return '<span class="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400"><i class="fa-solid fa-check mr-0.5"></i>Lunas</span>';
      return '<span class="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400">Belum Bayar</span>';
    }

    function renderOrders(orders) {
      const el = document.getElementById('orderList');
      const empty = document.getElementById('emptyOrders');
      if (orders.length === 0) { el.innerHTML = ''; empty.classList.remove('hidden'); return; }
      empty.classList.add('hidden');
      
      el.innerHTML = orders.map(o => {
        const items = o.items || [];
        const itemText = items.length > 0 ? items.map(i => i.product_name + ' x' + i.quantity).join(', ') : 'No items';
        const date = new Date(o.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
        return \`
        <div class="glass-card rounded-xl p-4 mb-3 border border-white/5 card-hover cursor-pointer" onclick="showOrderDetail('\${o.id}')">
          <div class="flex items-start justify-between mb-2">
            <div>
              <span class="font-mono text-xs text-fk-purple font-bold">\${o.order_number}</span>
              <span class="text-[10px] text-gray-600 ml-2">\${date}</span>
            </div>
            \${getStatusBadge(o.shipping_status)}
          </div>
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-fk-purple/10 flex items-center justify-center text-fk-purple text-xs font-bold">
                \${(o.customer_name || 'W')[0].toUpperCase()}
              </div>
              <div>
                <p class="text-sm font-medium">\${o.customer_name || 'Walk-in'}</p>
                \${o.customer_phone ? '<p class="text-[10px] text-gray-500">' + o.customer_phone + '</p>' : ''}
              </div>
            </div>
            <div class="text-right">
              <p class="font-mono font-bold text-sm">\${formatRupiah(o.total_amount)}</p>
              \${o.total_profit ? '<p class="text-[10px] text-green-400">+' + formatRupiah(o.total_profit) + '</p>' : ''}
            </div>
          </div>
          <div class="flex items-center justify-between">
            <p class="text-[10px] text-gray-500 truncate flex-1 mr-2">\${itemText}</p>
            <div class="flex gap-1 flex-shrink-0">
              \${getPaymentBadge(o.payment_status)}
              <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-gray-500">\${o.payment_method}</span>
            </div>
          </div>
          \${o.tracking_number ? '<p class="text-[10px] text-cyan-400 mt-1.5"><i class="fa-solid fa-truck mr-1"></i>Resi: ' + o.tracking_number + '</p>' : ''}
        </div>\`;
      }).join('');
    }

    function filterOrders(status) {
      currentFilter = status;
      document.querySelectorAll('.order-tab').forEach(b => b.classList.toggle('active', b.dataset.status === status));
      let filtered = allOrders;
      if (status !== 'all') filtered = filtered.filter(o => o.shipping_status === status);
      renderOrders(filtered);
    }

    function showOrderDetail(id) {
      const o = allOrders.find(x => x.id === id);
      if (!o) return;
      const items = o.items || [];
      const date = new Date(o.created_at).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      const waPhone = o.customer_phone ? (o.customer_phone.startsWith('0') ? '62' + o.customer_phone.slice(1) : o.customer_phone) : '';
      
      // Build action buttons based on status
      let actionBtns = '';
      if (o.shipping_status === 'pending') {
        actionBtns += '<button onclick="updateOrderStatus(\\'' + o.id + '\\', \\'processing\\')" class="text-xs py-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium"><i class="fa-solid fa-gear mr-1"></i>Proses</button>';
      }
      if (o.shipping_status === 'processing') {
        actionBtns += '<button onclick="openTrackingModal(\\'' + o.id + '\\')" class="text-xs py-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium"><i class="fa-solid fa-truck mr-1"></i>Kirim + Resi</button>';
      }
      if (o.shipping_status === 'shipped') {
        actionBtns += '<button onclick="updateOrderStatus(\\'' + o.id + '\\', \\'delivered\\')" class="text-xs py-2.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 font-medium"><i class="fa-solid fa-check mr-1"></i>Selesai</button>';
      }
      if (o.payment_status !== 'paid') {
        actionBtns += '<button onclick="updatePaymentStatus(\\'' + o.id + '\\')" class="text-xs py-2.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 font-medium"><i class="fa-solid fa-money-bill mr-1"></i>Tandai Lunas</button>';
      }
      if (waPhone) {
        const waMsg = encodeURIComponent('Hai ' + (o.customer_name || '') + ', pesanan Anda (' + o.order_number + ') sedang ' + {pending:'menunggu konfirmasi',processing:'diproses',shipped:'dalam pengiriman',delivered:'sudah diterima'}[o.shipping_status] + '. Total: ' + formatRupiah(o.total_amount));
        actionBtns += '<a href="https://wa.me/' + waPhone + '?text=' + waMsg + '" target="_blank" class="text-xs py-2.5 rounded-lg bg-[#25D366] text-white text-center font-medium"><i class="fa-brands fa-whatsapp mr-1"></i>WA Customer</a>';
      }
      
      document.getElementById('orderDetailContent').innerHTML = \`
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-heading font-bold text-lg">\${o.order_number}</h3>
          <button onclick="closeOrderModal()" class="text-gray-500 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
        </div>
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-xs text-gray-500">\${date}</span>
            \${getStatusBadge(o.shipping_status)}
          </div>
          <div class="glass-card rounded-lg p-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-fk-purple/10 flex items-center justify-center text-fk-purple font-bold">\${(o.customer_name || 'W')[0].toUpperCase()}</div>
              <div>
                <p class="text-sm font-medium">\${o.customer_name || 'Walk-in Customer'}</p>
                \${o.customer_phone ? '<p class="text-xs text-gray-500">' + o.customer_phone + '</p>' : ''}
              </div>
            </div>
          </div>
          <div class="glass-card rounded-lg p-3 space-y-2">
            \${items.map(i => '<div class="flex justify-between text-sm"><span class="truncate flex-1 mr-2">' + i.product_name + ' x' + i.quantity + (i.size ? ' (' + i.size + ')' : '') + '</span><span class="font-mono flex-shrink-0">' + formatRupiah(i.subtotal || i.unit_price * i.quantity) + '</span></div>').join('')}
            \${o.discount ? '<div class="flex justify-between text-sm text-red-400"><span>Diskon</span><span>-' + formatRupiah(o.discount) + '</span></div>' : ''}
            \${o.shipping_cost ? '<div class="flex justify-between text-sm"><span>Ongkir</span><span>+' + formatRupiah(o.shipping_cost) + '</span></div>' : ''}
            <div class="border-t border-white/10 pt-2 flex justify-between font-bold"><span>Total</span><span class="font-mono text-fk-purple">\${formatRupiah(o.total_amount)}</span></div>
            \${o.total_profit ? '<div class="flex justify-between text-xs text-green-400"><span>Profit</span><span class="font-mono">' + formatRupiah(o.total_profit) + '</span></div>' : ''}
          </div>
          <div class="flex gap-2 text-xs flex-wrap">
            <span class="px-2 py-1 rounded-lg bg-white/5">\${o.payment_method}</span>
            \${getPaymentBadge(o.payment_status)}
          </div>
          \${o.notes ? '<p class="text-xs text-gray-400 italic bg-white/5 p-2 rounded-lg">"' + o.notes + '"</p>' : ''}
          \${o.tracking_number ? '<div class="flex items-center gap-2 text-xs text-cyan-400 bg-cyan-500/5 p-2 rounded-lg"><i class="fa-solid fa-truck"></i><span>Resi: ' + o.tracking_number + '</span></div>' : ''}
          <div class="grid grid-cols-2 gap-2 pt-2">\${actionBtns}</div>
        </div>
      \`;
      document.getElementById('orderModal').classList.remove('hidden');
    }

    function closeOrderModal() { document.getElementById('orderModal').classList.add('hidden'); }

    function openTrackingModal(orderId) {
      document.getElementById('trackingOrderId').value = orderId;
      document.getElementById('trackingNumber').value = '';
      closeOrderModal();
      document.getElementById('trackingModal').classList.remove('hidden');
    }

    function closeTrackingModal() { document.getElementById('trackingModal').classList.add('hidden'); }

    async function submitTracking() {
      const orderId = document.getElementById('trackingOrderId').value;
      const tracking = document.getElementById('trackingNumber').value.trim();
      if (!tracking) { showToast('Masukkan nomor resi!', 'error'); return; }
      
      const btn = document.getElementById('btnSubmitTracking');
      btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i>...';
      try {
        await apiFetch('/api/orders/' + orderId, {
          method: 'PUT',
          body: JSON.stringify({ shipping_status: 'shipped', tracking_number: tracking })
        });
        showToast('Pesanan dikirim! Resi: ' + tracking);
        closeTrackingModal();
        
        // AUTO-SEND shipping notification via Fonnte API
        try {
          showToast('Mengirim notifikasi pengiriman via WA...', 'info');
          const waRes = await apiFetch('/api/wa/send-shipping', { 
            method: 'POST', 
            body: JSON.stringify({ order_id: orderId, tracking_number: tracking }) 
          });
          if (waRes.success) {
            showToast('Notif pengiriman WA terkirim! \\u{1F4E6}');
          }
        } catch(waErr) {
          // Non-critical - order tetap terupdate
          console.log('WA notif failed:', waErr.message);
        }
        
        await loadOrders();
      } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
      btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-truck mr-1"></i>Kirim & Update';
    }

    async function updateOrderStatus(id, status) {
      try {
        await apiFetch('/api/orders/' + id, { method: 'PUT', body: JSON.stringify({ shipping_status: status }) });
        showToast('Status diupdate!');
        closeOrderModal();
        await loadOrders();
      } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
    }

    async function updatePaymentStatus(id) {
      try {
        await apiFetch('/api/orders/' + id, { method: 'PUT', body: JSON.stringify({ payment_status: 'paid' }) });
        showToast('Pembayaran dikonfirmasi!');
        closeOrderModal();
        await loadOrders();
      } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
    }

    loadOrders();
  </script>`
  
  return fashionLayout('Pesanan', content, 'orders')
}
