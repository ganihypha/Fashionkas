// Dashboard Page - FashionKas
import { fashionLayout } from '../layout'

export function dashboardPage(): string {
  const content = `
  <div class="py-6 space-y-6" id="dashContent">
    <div class="text-center py-12"><i class="fa-solid fa-spinner fa-spin text-fk-purple text-2xl"></i><p class="text-xs text-gray-500 mt-2">Loading dashboard...</p></div>
  </div>
  
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  <script>
    async function loadDashboard() {
      try {
        const res = await apiFetch('/api/dashboard/stats');
        const d = res.data;
        const store = getStore();
        
        document.getElementById('dashContent').innerHTML = \`
        <div class="space-y-6">
          <!-- Header -->
          <div class="flex items-center justify-between">
            <div>
              <h1 class="font-heading font-bold text-xl">\${store.name || 'FashionKas'}</h1>
              <p class="text-xs text-gray-500">Dashboard Seller \${store.city ? '| ' + store.city : ''}</p>
            </div>
            <span class="text-xs px-3 py-1 rounded-full fk-gradient text-white font-bold">\${(store.tier || 'BETA').toUpperCase()}</span>
          </div>

          <!-- Quick Stats Row (scrollable) -->
          <div class="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
            <div class="glass-card rounded-xl p-4 min-w-[150px] flex-shrink-0 fk-border">
              <div class="flex items-center gap-2 mb-2"><div class="w-8 h-8 rounded-lg bg-fk-purple/10 flex items-center justify-center"><i class="fa-solid fa-coins text-fk-purple text-sm"></i></div></div>
              <div class="font-heading font-bold text-lg text-fk-purple">\${formatRupiah(d.thisMonth.revenue)}</div>
              <div class="text-[10px] text-gray-500">Income Bulan Ini</div>
              <div class="text-[10px] text-gray-600 mt-0.5">\${d.thisMonth.orders} pesanan</div>
            </div>
            <div class="glass-card rounded-xl p-4 min-w-[150px] flex-shrink-0 fk-border">
              <div class="flex items-center gap-2 mb-2"><div class="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center"><i class="fa-solid fa-sun text-green-400 text-sm"></i></div></div>
              <div class="font-heading font-bold text-lg text-green-400">\${formatRupiah(d.today.revenue)}</div>
              <div class="text-[10px] text-gray-500">Hari Ini</div>
              <div class="text-[10px] text-gray-600 mt-0.5">\${d.today.orders} pesanan, \${d.today.itemsSold} item</div>
            </div>
            <div class="glass-card rounded-xl p-4 min-w-[150px] flex-shrink-0 fk-border">
              <div class="flex items-center gap-2 mb-2"><div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center"><i class="fa-solid fa-chart-line text-emerald-400 text-sm"></i></div></div>
              <div class="font-heading font-bold text-lg text-emerald-400">\${formatRupiah(d.thisMonth.profit)}</div>
              <div class="text-[10px] text-gray-500">Profit Bulan</div>
              <div class="text-[10px] text-gray-600 mt-0.5">\${d.thisMonth.revenue > 0 ? Math.round((d.thisMonth.profit/d.thisMonth.revenue)*100) : 0}% margin</div>
            </div>
            <div class="glass-card rounded-xl p-4 min-w-[150px] flex-shrink-0 fk-border">
              <div class="flex items-center gap-2 mb-2"><div class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center"><i class="fa-solid fa-shirt text-amber-400 text-sm"></i></div></div>
              <div class="font-heading font-bold text-lg text-amber-400">\${d.totalProducts}</div>
              <div class="text-[10px] text-gray-500">Total Produk</div>
              <div class="text-[10px] text-gray-600 mt-0.5">\${d.totalCustomers} customer</div>
            </div>
          </div>

          <!-- Today Highlight -->
          <div class="glass-card rounded-xl p-5 fk-glow fk-border">
            <h2 class="font-heading font-bold text-sm mb-3"><i class="fa-solid fa-sun text-amber-400 mr-2"></i>Highlight Hari Ini</h2>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div class="text-center">
                <div class="font-heading font-bold text-2xl text-fk-purple">\${formatRupiah(d.today.revenue)}</div>
                <div class="text-[10px] text-gray-500">Pendapatan</div>
              </div>
              <div class="text-center">
                <div class="font-heading font-bold text-2xl text-green-400">\${d.today.orders}</div>
                <div class="text-[10px] text-gray-500">Pesanan</div>
              </div>
              <div class="text-center">
                <div class="font-heading font-bold text-2xl text-amber-400">\${d.today.itemsSold}</div>
                <div class="text-[10px] text-gray-500">Item Terjual</div>
              </div>
              <div class="text-center">
                <div class="font-heading font-bold text-2xl text-emerald-400">\${formatRupiah(d.today.profit)}</div>
                <div class="text-[10px] text-gray-500">Profit</div>
              </div>
            </div>
          </div>

          <!-- Revenue Chart -->
          <div class="glass-card rounded-xl p-5">
            <h2 class="font-heading font-bold text-sm mb-4"><i class="fa-solid fa-chart-bar text-fk-purple mr-2"></i>Pendapatan 7 Hari Terakhir</h2>
            <div style="height:200px"><canvas id="revenueChart"></canvas></div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Top Products -->
            <div class="glass-card rounded-xl p-5">
              <h2 class="font-heading font-bold text-sm mb-4"><i class="fa-solid fa-fire text-orange-400 mr-2"></i>Produk Terlaris</h2>
              \${d.topProducts.length > 0 ? d.topProducts.map((p, i) => \`
                <div class="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0">
                  <div class="w-8 h-8 rounded-lg \${i === 0 ? 'bg-amber-500/15' : 'bg-fk-purple/10'} flex items-center justify-center text-xs font-bold \${i === 0 ? 'text-amber-400' : 'text-fk-purple'}">\${i+1}</div>
                  <div class="flex-1 min-w-0">
                    <div class="text-sm font-medium truncate">\${p.name}</div>
                    <div class="text-[10px] text-gray-500">\${p.category || ''} | \${p.sold} terjual</div>
                  </div>
                  <div class="text-sm font-mono text-fk-purple">\${formatRupiah(p.revenue)}</div>
                </div>
              \`).join('') : '<p class="text-sm text-gray-500 text-center py-6">Belum ada data penjualan</p>'}
            </div>

            <!-- Alerts -->
            <div class="space-y-4">
              <!-- Low Stock -->
              <div class="glass-card rounded-xl p-5">
                <h2 class="font-heading font-bold text-sm mb-3"><i class="fa-solid fa-triangle-exclamation text-red-400 mr-2"></i>Stok Menipis <span class="text-xs font-normal text-gray-600">(\${d.lowStockAlerts.length + (d.outOfStock?.length || 0)})</span></h2>
                \${d.lowStockAlerts.length > 0 || (d.outOfStock?.length > 0) ? 
                  (d.outOfStock || []).map(a => \`
                    <div class="flex items-center justify-between py-2 border-b border-white/5">
                      <span class="text-sm truncate flex-1 mr-2">\${a.name}</span>
                      <span class="text-[10px] px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 font-mono font-bold">HABIS</span>
                    </div>
                  \`).join('') + d.lowStockAlerts.map(a => \`
                    <div class="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <span class="text-sm truncate flex-1 mr-2">\${a.name}</span>
                      <span class="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-mono">Sisa \${a.stock}</span>
                    </div>
                  \`).join('')
                : '<p class="text-sm text-gray-500 text-center py-4"><i class="fa-solid fa-check-circle text-green-400 mr-1"></i>Semua stok aman!</p>'}
              </div>
              
              <!-- Categories -->
              <div class="glass-card rounded-xl p-5">
                <h2 class="font-heading font-bold text-sm mb-3"><i class="fa-solid fa-tags text-fk-purple mr-2"></i>Kategori</h2>
                <div class="flex flex-wrap gap-2">
                  \${Object.entries(d.categories).map(([cat, count]) => {
                    const catColors = {gamis:'#EC4899',hijab:'#8B5CF6',daster:'#F97316',kemeja:'#3B82F6',rok:'#14B8A6',celana:'#6366F1',aksesoris:'#F43F5E'};
                    const cc = catColors[cat] || '#6B7280';
                    return '<span class="text-xs px-3 py-1.5 rounded-full font-medium" style="background:'+cc+'15;color:'+cc+';border:1px solid '+cc+'30">' + cat + ' <span class="font-mono">' + count + '</span></span>';
                  }).join('') || '<p class="text-sm text-gray-500">Belum ada produk</p>'}
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Orders -->
          <div class="glass-card rounded-xl p-5">
            <div class="flex items-center justify-between mb-4">
              <h2 class="font-heading font-bold text-sm"><i class="fa-solid fa-clock-rotate-left text-cyan-400 mr-2"></i>Pesanan Terakhir</h2>
              <a href="/fashionkas/orders" class="text-xs text-fk-purple hover:underline">Lihat Semua</a>
            </div>
            \${d.recentOrders.length > 0 ? d.recentOrders.slice(0,5).map(o => {
              const statusMap = {pending:'status-pending',processing:'status-processing',shipped:'status-shipped',delivered:'status-delivered',cancelled:'status-cancelled'};
              const statusLabel = {pending:'Pending',processing:'Proses',shipped:'Dikirim',delivered:'Selesai',cancelled:'Batal'};
              const date = new Date(o.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
              const items = (o.items || []).map(i => i.product_name + ' x' + i.quantity).join(', ');
              return '<div class="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">' +
                '<div class="w-9 h-9 rounded-lg bg-fk-purple/10 flex items-center justify-center text-fk-purple text-xs font-bold">' + (o.customer_name || 'W')[0].toUpperCase() + '</div>' +
                '<div class="flex-1 min-w-0"><div class="flex items-center gap-2"><span class="text-sm font-medium truncate">' + (o.customer_name || 'Walk-in') + '</span><span class="text-[10px] px-1.5 py-0.5 rounded-full ' + (statusMap[o.shipping_status] || 'status-pending') + '">' + (statusLabel[o.shipping_status] || 'Pending') + '</span></div>' +
                '<p class="text-[10px] text-gray-500 truncate">' + (items || o.order_number) + ' | ' + date + '</p></div>' +
                '<div class="text-right"><div class="text-sm font-mono font-bold">' + formatRupiah(o.total_amount) + '</div>' +
                (o.total_profit ? '<div class="text-[10px] text-green-400">+' + formatRupiah(o.total_profit) + '</div>' : '') + '</div></div>';
            }).join('') : '<p class="text-sm text-gray-500 text-center py-6">Belum ada pesanan</p>'}
          </div>

          <!-- Quick Actions -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-4">
            <a href="/fashionkas/catalog" class="glass-card rounded-xl p-4 text-center card-hover border border-white/5">
              <div class="w-10 h-10 rounded-xl bg-fk-purple/10 flex items-center justify-center mx-auto mb-2"><i class="fa-solid fa-plus-circle text-fk-purple"></i></div>
              <span class="text-xs font-medium">Tambah Produk</span>
            </a>
            <a href="/fashionkas/sale" class="glass-card rounded-xl p-4 text-center card-hover border border-white/5">
              <div class="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center mx-auto mb-2"><i class="fa-solid fa-cart-plus text-green-400"></i></div>
              <span class="text-xs font-medium">Buat Pesanan</span>
            </a>
            <a href="/fashionkas/orders" class="glass-card rounded-xl p-4 text-center card-hover border border-white/5">
              <div class="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center mx-auto mb-2"><i class="fa-solid fa-box text-cyan-400"></i></div>
              <span class="text-xs font-medium">Pesanan</span>
            </a>
            <a href="/fashionkas/settings" class="glass-card rounded-xl p-4 text-center card-hover border border-white/5">
              <div class="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center mx-auto mb-2"><i class="fa-solid fa-gear text-amber-400"></i></div>
              <span class="text-xs font-medium">Settings</span>
            </a>
          </div>
        </div>\`;

        // Render chart
        setTimeout(() => {
          const ctx = document.getElementById('revenueChart');
          if (ctx && d.dailyRevenue) {
            const days = ['Min','Sen','Sel','Rab','Kam','Jum','Sab'];
            new Chart(ctx, {
              type: 'bar',
              data: {
                labels: d.dailyRevenue.map(r => { const dt = new Date(r.date); return days[dt.getDay()] + ' ' + dt.getDate(); }),
                datasets: [{
                  label: 'Pendapatan',
                  data: d.dailyRevenue.map(r => r.revenue),
                  backgroundColor: 'rgba(168, 85, 247, 0.3)',
                  borderColor: '#A855F7',
                  borderWidth: 1,
                  borderRadius: 6,
                  barThickness: 24
                }, {
                  label: 'Profit',
                  data: d.dailyRevenue.map(r => r.profit),
                  backgroundColor: 'rgba(16, 185, 129, 0.3)',
                  borderColor: '#10B981',
                  borderWidth: 1,
                  borderRadius: 6,
                  barThickness: 24
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true, labels: { color: '#9CA3AF', font: { size: 10 } } } },
                scales: {
                  x: { grid: { display: false }, ticks: { color: '#6B7280', font: { size: 10 } } },
                  y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6B7280', font: { size: 10 }, callback: v => 'Rp ' + (v/1000) + 'K' } }
                }
              }
            });
          }
        }, 100);
      } catch (e) {
        document.getElementById('dashContent').innerHTML = '<div class="text-center py-12"><i class="fa-solid fa-exclamation-triangle text-red-400 text-2xl mb-2"></i><p class="text-sm text-gray-400">Gagal memuat dashboard</p><p class="text-xs text-gray-600 mt-1">' + e.message + '</p><button onclick="loadDashboard()" class="mt-3 px-4 py-2 rounded-lg fk-gradient text-white text-xs">Coba Lagi</button></div>';
      }
    }
    loadDashboard();
  </script>`
  return fashionLayout('Dashboard', content, 'dashboard')
}
