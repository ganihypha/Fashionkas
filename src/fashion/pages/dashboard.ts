// Dashboard Page
import { fashionLayout } from '../layout'

export function dashboardPage(): string {
  const content = `
  <div class="py-6 space-y-6" id="dashContent">
    <div class="text-center py-12"><i class="fa-solid fa-spinner fa-spin text-fk-purple text-2xl"></i><p class="text-xs text-gray-500 mt-2">Loading dashboard...</p></div>
  </div>
  
  <script>
    async function loadDashboard() {
      try {
        const res = await apiFetch('/api/dashboard/stats');
        const d = res.data;
        const store = getStore();
        
        document.getElementById('dashContent').innerHTML = \`
        <div class="py-6 space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="font-heading font-bold text-xl">\${store.name || 'FashionKas'}</h1>
              <p class="text-xs text-gray-500">Dashboard Seller \${store.city ? '• ' + store.city : ''}</p>
            </div>
            <span class="text-xs px-3 py-1 rounded-full fk-border text-fk-purple font-medium">\${(store.tier || 'BETA').toUpperCase()}</span>
          </div>

          <!-- Quick Stats -->
          <div class="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div class="glass-card rounded-xl p-4 min-w-[160px] flex-shrink-0 fk-border">
              <div class="text-[10px] text-gray-500 uppercase mb-1">Income Bulan</div>
              <div class="font-heading font-bold text-lg text-fk-purple">\${formatRupiah(d.thisMonth.revenue)}</div>
              <div class="text-[10px] text-gray-600">\${d.thisMonth.orders} orders</div>
            </div>
            <div class="glass-card rounded-xl p-4 min-w-[160px] flex-shrink-0 fk-border">
              <div class="text-[10px] text-gray-500 uppercase mb-1">Hari Ini</div>
              <div class="font-heading font-bold text-lg text-green-400">\${formatRupiah(d.today.revenue)}</div>
              <div class="text-[10px] text-gray-600">\${d.today.orders} orders</div>
            </div>
            <div class="glass-card rounded-xl p-4 min-w-[160px] flex-shrink-0 fk-border">
              <div class="text-[10px] text-gray-500 uppercase mb-1">Profit Bulan</div>
              <div class="font-heading font-bold text-lg text-emerald-400">\${formatRupiah(d.thisMonth.profit)}</div>
              <div class="text-[10px] text-gray-600">\${d.thisMonth.revenue > 0 ? Math.round((d.thisMonth.profit/d.thisMonth.revenue)*100) : 0}% margin</div>
            </div>
            <div class="glass-card rounded-xl p-4 min-w-[160px] flex-shrink-0 fk-border">
              <div class="text-[10px] text-gray-500 uppercase mb-1">Total Produk</div>
              <div class="font-heading font-bold text-lg text-amber-400">\${d.totalProducts}</div>
              <div class="text-[10px] text-gray-600">\${d.totalCustomers} customer</div>
            </div>
          </div>

          <!-- Today Highlight -->
          <div class="glass-card rounded-xl p-5 fk-glow fk-border">
            <h2 class="font-heading font-bold text-sm mb-3"><i class="fa-solid fa-sun text-amber-400 mr-2"></i>Hari Ini</h2>
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
                <div class="text-[10px] text-gray-500">Items</div>
              </div>
              <div class="text-center">
                <div class="font-heading font-bold text-2xl text-emerald-400">\${formatRupiah(d.today.profit)}</div>
                <div class="text-[10px] text-gray-500">Profit</div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Top Products -->
            <div class="glass-card rounded-xl p-5">
              <h2 class="font-heading font-bold text-sm mb-4"><i class="fa-solid fa-fire text-orange-400 mr-2"></i>Produk Terlaris</h2>
              \${d.topProducts.length > 0 ? d.topProducts.map((p, i) => \`
                <div class="flex items-center gap-3 py-2">
                  <div class="w-8 h-8 rounded-lg bg-fk-purple/10 flex items-center justify-center text-xs font-bold text-fk-purple">\${i+1}</div>
                  <div class="flex-1 min-w-0">
                    <div class="text-sm font-medium truncate">\${p.name}</div>
                    <div class="text-[10px] text-gray-500">\${p.sold} terjual</div>
                  </div>
                  <div class="text-sm font-mono text-fk-purple">\${formatRupiah(p.revenue)}</div>
                </div>
              \`).join('') : '<p class="text-sm text-gray-500 text-center py-4">Belum ada data penjualan</p>'}
            </div>
            
            <!-- Low Stock + Categories -->
            <div class="space-y-6">
              <div class="glass-card rounded-xl p-5">
                <h2 class="font-heading font-bold text-sm mb-4"><i class="fa-solid fa-triangle-exclamation text-red-400 mr-2"></i>Stok Menipis</h2>
                \${d.lowStockAlerts.length > 0 ? d.lowStockAlerts.map(a => \`
                  <div class="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span class="text-sm">\${a.name}</span>
                    <span class="text-xs px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 font-mono">Stok: \${a.stock}</span>
                  </div>
                \`).join('') : '<p class="text-sm text-gray-500 text-center py-4">Semua stok aman!</p>'}
              </div>
              
              <div class="glass-card rounded-xl p-5">
                <h2 class="font-heading font-bold text-sm mb-4"><i class="fa-solid fa-tags text-fk-purple mr-2"></i>Kategori</h2>
                <div class="flex flex-wrap gap-2">
                  \${Object.entries(d.categories).map(([cat, count]) => \`
                    <span class="text-xs px-3 py-1.5 rounded-full bg-fk-purple/10 text-fk-purple border border-fk-purple/20">\${cat} <span class="font-mono">\${count}</span></span>
                  \`).join('') || '<p class="text-sm text-gray-500">Belum ada produk</p>'}
                </div>
              </div>
            </div>
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
      } catch (e) {
        document.getElementById('dashContent').innerHTML = '<div class="text-center py-12"><i class="fa-solid fa-exclamation-triangle text-red-400 text-2xl mb-2"></i><p class="text-sm text-gray-400">Gagal memuat dashboard</p><p class="text-xs text-gray-600 mt-1">' + e.message + '</p><button onclick="loadDashboard()" class="mt-3 px-4 py-2 rounded-lg fk-gradient text-white text-xs">Coba Lagi</button></div>';
      }
    }
    loadDashboard();
  </script>`
  return fashionLayout('Dashboard', content, 'dashboard')
}
