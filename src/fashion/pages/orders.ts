// Orders Management Page
import { fashionLayout } from '../layout'

export function ordersPage(): string {
  const content = `
  <div class="py-6 space-y-4" id="ordersContent">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-heading font-bold text-xl">Pesanan</h1>
        <p class="text-xs text-gray-500">Kelola semua pesanan</p>
      </div>
      <a href="/fashionkas/sale" class="text-xs px-3 py-1.5 rounded-lg fk-gradient text-white">
        <i class="fa-solid fa-plus mr-1"></i>Baru
      </a>
    </div>

    <!-- Status Tabs -->
    <div class="flex gap-2 overflow-x-auto scrollbar-hide">
      <button onclick="filterOrders('all')" class="order-tab text-xs px-4 py-2 rounded-full bg-fk-purple/20 text-fk-purple border border-fk-purple/30 whitespace-nowrap active" data-status="all">
        Semua <span id="countAll" class="font-mono ml-1">0</span>
      </button>
      <button onclick="filterOrders('pending')" class="order-tab text-xs px-4 py-2 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-status="pending">
        <i class="fa-solid fa-clock mr-1 text-amber-400"></i>Pending <span id="countPending" class="font-mono ml-1">0</span>
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
      <p class="text-sm text-gray-500">Belum ada pesanan</p>
      <a href="/fashionkas/sale" class="mt-3 inline-block px-4 py-2 rounded-lg fk-gradient text-white text-xs">Buat Pesanan Pertama</a>
    </div>
  </div>

  <!-- Order Detail Modal -->
  <div id="orderModal" class="fixed inset-0 z-[60] hidden">
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeOrderModal()"></div>
    <div class="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto glass-card rounded-t-2xl p-6 sm:max-w-lg sm:mx-auto sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl">
      <div id="orderDetailContent"></div>
    </div>
  </div>

  <style>
    .order-tab.active { background: rgba(168,85,247,0.2)!important; color: #A855F7!important; border-color: rgba(168,85,247,0.3)!important; }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  </style>

  <script>
    let allOrders = [];
    let currentFilter = 'all';

    async function loadOrders() {
      try {
        const res = await apiFetch('/api/orders');
        allOrders = res.data || [];
        updateCounts();
        renderOrders(allOrders);
      } catch(e) {
        document.getElementById('orderList').innerHTML = '<p class="text-sm text-red-400 text-center py-8">Gagal memuat: ' + e.message + '</p>';
      }
    }

    function updateCounts() {
      document.getElementById('countAll').textContent = allOrders.length;
      document.getElementById('countPending').textContent = allOrders.filter(o => o.shipping_status === 'pending').length;
      document.getElementById('countShipped').textContent = allOrders.filter(o => o.shipping_status === 'shipped').length;
      document.getElementById('countDelivered').textContent = allOrders.filter(o => o.shipping_status === 'delivered').length;
    }

    function getStatusBadge(status) {
      const map = {
        pending: { class: 'status-pending', label: 'Pending', icon: 'clock' },
        processing: { class: 'status-processing', label: 'Proses', icon: 'gear' },
        shipped: { class: 'status-shipped', label: 'Dikirim', icon: 'truck' },
        delivered: { class: 'status-delivered', label: 'Selesai', icon: 'check-circle' },
        cancelled: { class: 'status-cancelled', label: 'Batal', icon: 'xmark-circle' }
      };
      const s = map[status] || map.pending;
      return '<span class="text-[10px] px-2 py-0.5 rounded-full ' + s.class + '"><i class="fa-solid fa-' + s.icon + ' mr-1"></i>' + s.label + '</span>';
    }

    function getPaymentBadge(status) {
      if (status === 'paid') return '<span class="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400">Lunas</span>';
      return '<span class="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400">Belum Bayar</span>';
    }

    function renderOrders(orders) {
      const el = document.getElementById('orderList');
      const empty = document.getElementById('emptyOrders');
      
      if (orders.length === 0) {
        el.innerHTML = '';
        empty.classList.remove('hidden');
        return;
      }
      empty.classList.add('hidden');
      
      el.innerHTML = orders.map(o => {
        const items = o.items || [];
        const itemText = items.length > 0 ? items.map(i => i.product_name + ' x' + i.quantity).join(', ') : 'No items';
        const date = new Date(o.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
        const waPhone = o.customer_phone ? (o.customer_phone.startsWith('0') ? '62' + o.customer_phone.slice(1) : o.customer_phone) : '';
        
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
            <div class="flex gap-1">
              \${getPaymentBadge(o.payment_status)}
              <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-gray-500">\${o.payment_method}</span>
            </div>
          </div>
          \${o.tracking_number ? '<p class="text-[10px] text-cyan-400 mt-1"><i class="fa-solid fa-truck mr-1"></i>Resi: ' + o.tracking_number + '</p>' : ''}
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
            <p class="text-sm font-medium">\${o.customer_name || 'Walk-in Customer'}</p>
            \${o.customer_phone ? '<p class="text-xs text-gray-500">' + o.customer_phone + '</p>' : ''}
          </div>
          <div class="glass-card rounded-lg p-3 space-y-2">
            \${items.map(i => '<div class="flex justify-between text-sm"><span>' + i.product_name + ' x' + i.quantity + (i.size ? ' (' + i.size + ')' : '') + '</span><span class="font-mono">' + formatRupiah(i.subtotal || i.unit_price * i.quantity) + '</span></div>').join('')}
            \${o.discount ? '<div class="flex justify-between text-sm text-red-400"><span>Diskon</span><span>-' + formatRupiah(o.discount) + '</span></div>' : ''}
            \${o.shipping_cost ? '<div class="flex justify-between text-sm"><span>Ongkir</span><span>+' + formatRupiah(o.shipping_cost) + '</span></div>' : ''}
            <div class="border-t border-white/10 pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span class="font-mono text-fk-purple">\${formatRupiah(o.total_amount)}</span>
            </div>
            <div class="flex justify-between text-xs text-green-400">
              <span>Profit</span>
              <span class="font-mono">\${formatRupiah(o.total_profit)}</span>
            </div>
          </div>
          <div class="flex gap-2 text-xs">
            <span class="px-2 py-1 rounded-lg bg-white/5">\${o.payment_method}</span>
            \${getPaymentBadge(o.payment_status)}
          </div>
          \${o.notes ? '<p class="text-xs text-gray-400 italic">"' + o.notes + '"</p>' : ''}
          \${o.tracking_number ? '<p class="text-xs text-cyan-400"><i class="fa-solid fa-truck mr-1"></i>Resi: ' + o.tracking_number + '</p>' : ''}
          
          <!-- Actions -->
          <div class="grid grid-cols-2 gap-2 pt-2">
            \${o.shipping_status === 'pending' ? '<button onclick="updateOrderStatus(\\'' + o.id + '\\', \\'shipped\\')" class="text-xs py-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"><i class="fa-solid fa-truck mr-1"></i>Kirim</button>' : ''}
            \${o.shipping_status === 'shipped' ? '<button onclick="updateOrderStatus(\\'' + o.id + '\\', \\'delivered\\')" class="text-xs py-2 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20"><i class="fa-solid fa-check mr-1"></i>Selesai</button>' : ''}
            \${o.payment_status !== 'paid' ? '<button onclick="updatePaymentStatus(\\'' + o.id + '\\')" class="text-xs py-2 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20"><i class="fa-solid fa-money-bill mr-1"></i>Lunas</button>' : ''}
            \${waPhone ? '<a href="https://wa.me/' + waPhone + '" target="_blank" class="text-xs py-2 rounded-lg wa-btn text-white text-center"><i class="fa-brands fa-whatsapp mr-1"></i>WhatsApp</a>' : '<span></span>'}
          </div>
        </div>
      \`;
      document.getElementById('orderModal').classList.remove('hidden');
    }

    function closeOrderModal() {
      document.getElementById('orderModal').classList.add('hidden');
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
