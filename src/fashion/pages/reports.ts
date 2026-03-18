// Reports / Laporan Page
// Monthly reports with PDF export (client-side via html2pdf-like approach)
import { fashionLayout } from '../layout'

export function reportsPage(): string {
  const content = `
  <div class="py-6 space-y-5" id="reportContent">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-heading font-bold text-xl">Laporan Penjualan</h1>
        <p class="text-xs text-gray-500">Analisis bisnis bulanan</p>
      </div>
      <div class="flex gap-2">
        <input type="month" id="monthPicker" class="px-3 py-1.5 rounded-lg bg-empire-dark border border-white/10 text-sm text-gray-300" onchange="loadReport()">
        <button onclick="downloadPDF()" id="btnPdf" class="text-xs px-3 py-1.5 rounded-lg bg-fk-purple/10 text-fk-purple border border-fk-purple/20 hover:bg-fk-purple/20">
          <i class="fa-solid fa-file-pdf mr-1"></i>PDF
        </button>
      </div>
    </div>

    <div id="reportData">
      <div class="text-center py-12"><i class="fa-solid fa-spinner fa-spin text-fk-purple text-xl"></i><p class="text-xs text-gray-500 mt-2">Memuat laporan...</p></div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  <script>
    let reportCache = null;

    // Set default month
    const now = new Date();
    document.getElementById('monthPicker').value = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');

    async function loadReport() {
      const month = document.getElementById('monthPicker').value;
      if (!month) return;
      document.getElementById('reportData').innerHTML = '<div class="text-center py-12"><i class="fa-solid fa-spinner fa-spin text-fk-purple text-xl"></i><p class="text-xs text-gray-500 mt-2">Memuat laporan...</p></div>';
      
      try {
        const res = await apiFetch('/api/reports/monthly?month=' + month);
        reportCache = res.data;
        renderReport(res.data);
      } catch(e) {
        document.getElementById('reportData').innerHTML = '<div class="text-center py-12"><i class="fa-solid fa-exclamation-triangle text-red-400 text-xl mb-2"></i><p class="text-sm text-gray-400">Gagal memuat: ' + e.message + '</p><button onclick="loadReport()" class="mt-3 px-4 py-2 rounded-lg fk-gradient text-white text-xs">Coba Lagi</button></div>';
      }
    }

    function renderReport(d) {
      const s = d.summary;
      const store = d.store;
      const el = document.getElementById('reportData');
      
      el.innerHTML = \`
      <div class="space-y-5" id="reportPrint">
        <!-- Period Header -->
        <div class="glass-card rounded-xl p-5 fk-border fk-glow">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="font-heading font-bold text-lg">\${store.name}</h2>
              <p class="text-xs text-gray-500">\${d.period.monthName} | \${store.city || 'Indonesia'}</p>
            </div>
            <div class="text-right">
              <div class="font-heading font-bold text-2xl text-fk-purple">\${formatRupiah(s.totalRevenue)}</div>
              <p class="text-[10px] text-gray-500">Total Revenue</p>
            </div>
          </div>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="glass-card rounded-xl p-4 text-center">
            <div class="font-heading font-bold text-xl text-fk-purple">\${formatRupiah(s.totalRevenue)}</div>
            <div class="text-[10px] text-gray-500">Revenue</div>
          </div>
          <div class="glass-card rounded-xl p-4 text-center">
            <div class="font-heading font-bold text-xl text-green-400">\${formatRupiah(s.totalProfit)}</div>
            <div class="text-[10px] text-gray-500">Profit</div>
            <div class="text-[10px] text-gray-600">\${s.totalRevenue > 0 ? Math.round((s.totalProfit/s.totalRevenue)*100) : 0}% margin</div>
          </div>
          <div class="glass-card rounded-xl p-4 text-center">
            <div class="font-heading font-bold text-xl text-cyan-400">\${s.totalOrders}</div>
            <div class="text-[10px] text-gray-500">Pesanan</div>
            <div class="text-[10px] text-gray-600">\${s.totalItemsSold} item</div>
          </div>
          <div class="glass-card rounded-xl p-4 text-center">
            <div class="font-heading font-bold text-xl text-amber-400">\${formatRupiah(s.avgOrderValue)}</div>
            <div class="text-[10px] text-gray-500">Avg Order</div>
            <div class="text-[10px] text-gray-600">\${s.newCustomers} cust baru</div>
          </div>
        </div>

        <!-- Daily Revenue Chart -->
        <div class="glass-card rounded-xl p-5">
          <h2 class="font-heading font-bold text-sm mb-4"><i class="fa-solid fa-chart-bar text-fk-purple mr-2"></i>Revenue Harian</h2>
          <div style="height:220px"><canvas id="dailyChart"></canvas></div>
        </div>

        <!-- Top Products -->
        <div class="glass-card rounded-xl p-5">
          <h2 class="font-heading font-bold text-sm mb-3"><i class="fa-solid fa-fire text-orange-400 mr-2"></i>Top Produk Bulan Ini</h2>
          \${d.topProducts.length > 0 ? d.topProducts.map((p, i) => 
            '<div class="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0">' +
            '<div class="w-8 h-8 rounded-lg ' + (i === 0 ? 'bg-amber-500/15' : 'bg-fk-purple/10') + ' flex items-center justify-center text-xs font-bold ' + (i === 0 ? 'text-amber-400' : 'text-fk-purple') + '">' + (i+1) + '</div>' +
            '<div class="flex-1 min-w-0"><div class="text-sm font-medium truncate">' + p.name + '</div><div class="text-[10px] text-gray-500">' + p.qty + ' terjual</div></div>' +
            '<div class="text-sm font-mono text-fk-purple">' + formatRupiah(p.revenue) + '</div></div>'
          ).join('') : '<p class="text-sm text-gray-500 text-center py-4">Belum ada data</p>'}
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <!-- Payment Breakdown -->
          <div class="glass-card rounded-xl p-5">
            <h2 class="font-heading font-bold text-sm mb-3"><i class="fa-solid fa-credit-card text-blue-400 mr-2"></i>Metode Bayar</h2>
            \${Object.entries(d.paymentBreakdown).map(([method, data]) => {
              const icons = {cash:'fa-money-bill-wave text-green-400',transfer:'fa-building-columns text-blue-400',cod:'fa-truck text-amber-400',marketplace:'fa-store text-purple-400'};
              const icon = icons[method] || 'fa-circle text-gray-400';
              return '<div class="flex items-center justify-between py-2 border-b border-white/5 last:border-0"><div class="flex items-center gap-2"><i class="fa-solid ' + icon + ' text-xs"></i><span class="text-sm capitalize">' + method + '</span><span class="text-[10px] text-gray-500">(' + data.count + 'x)</span></div><span class="text-sm font-mono">' + formatRupiah(data.total) + '</span></div>';
            }).join('') || '<p class="text-sm text-gray-500 text-center py-4">-</p>'}
          </div>

          <!-- Category Breakdown -->
          <div class="glass-card rounded-xl p-5">
            <h2 class="font-heading font-bold text-sm mb-3"><i class="fa-solid fa-tags text-fk-purple mr-2"></i>Kategori Terjual</h2>
            \${Object.entries(d.categoryBreakdown).map(([cat, data]) => {
              const catColors = {gamis:'#EC4899',hijab:'#8B5CF6',daster:'#F97316',kemeja:'#3B82F6',rok:'#14B8A6',celana:'#6366F1',aksesoris:'#F43F5E'};
              const cc = catColors[cat] || '#6B7280';
              return '<div class="flex items-center justify-between py-2 border-b border-white/5 last:border-0"><div class="flex items-center gap-2"><span class="text-[10px] px-2 py-0.5 rounded-full" style="background:'+cc+'15;color:'+cc+'">' + cat + '</span><span class="text-[10px] text-gray-500">' + data.qty + ' item</span></div><span class="text-sm font-mono">' + formatRupiah(data.revenue) + '</span></div>';
            }).join('') || '<p class="text-sm text-gray-500 text-center py-4">-</p>'}
          </div>
        </div>

        <!-- Daily Detail Table -->
        <div class="glass-card rounded-xl p-5 overflow-x-auto">
          <h2 class="font-heading font-bold text-sm mb-3"><i class="fa-solid fa-table text-fk-purple mr-2"></i>Detail Harian</h2>
          <table class="w-full text-xs">
            <thead>
              <tr class="text-gray-500 border-b border-white/10">
                <th class="text-left py-2 px-2">Tgl</th>
                <th class="text-right py-2 px-2">Revenue</th>
                <th class="text-right py-2 px-2">Profit</th>
                <th class="text-right py-2 px-2">Order</th>
                <th class="text-right py-2 px-2">Item</th>
              </tr>
            </thead>
            <tbody>
              \${d.dailyData.filter(dd => dd.orders > 0).map(dd => 
                '<tr class="border-b border-white/5"><td class="py-2 px-2 text-gray-300">' + dd.day + '</td>' +
                '<td class="py-2 px-2 text-right font-mono text-fk-purple">' + formatRupiah(dd.revenue) + '</td>' +
                '<td class="py-2 px-2 text-right font-mono text-green-400">+' + formatRupiah(dd.profit) + '</td>' +
                '<td class="py-2 px-2 text-right">' + dd.orders + '</td>' +
                '<td class="py-2 px-2 text-right">' + dd.items + '</td></tr>'
              ).join('') || '<tr><td colspan="5" class="text-center py-4 text-gray-500">Belum ada transaksi</td></tr>'}
            </tbody>
            <tfoot>
              <tr class="border-t border-fk-purple/20 font-bold">
                <td class="py-2 px-2">Total</td>
                <td class="py-2 px-2 text-right font-mono text-fk-purple">\${formatRupiah(s.totalRevenue)}</td>
                <td class="py-2 px-2 text-right font-mono text-green-400">+\${formatRupiah(s.totalProfit)}</td>
                <td class="py-2 px-2 text-right">\${s.totalOrders}</td>
                <td class="py-2 px-2 text-right">\${s.totalItemsSold}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>\`;

      // Render chart
      setTimeout(() => {
        const ctx = document.getElementById('dailyChart');
        if (!ctx || !d.dailyData) return;
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: d.dailyData.map(dd => dd.day),
            datasets: [{
              label: 'Revenue',
              data: d.dailyData.map(dd => dd.revenue),
              backgroundColor: 'rgba(168,85,247,0.3)',
              borderColor: '#A855F7',
              borderWidth: 1,
              borderRadius: 4,
            }, {
              label: 'Profit',
              data: d.dailyData.map(dd => dd.profit),
              backgroundColor: 'rgba(16,185,129,0.3)',
              borderColor: '#10B981',
              borderWidth: 1,
              borderRadius: 4,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: '#9CA3AF', font: { size: 10 } } } },
            scales: {
              x: { grid: { display: false }, ticks: { color: '#6B7280', font: { size: 9 } } },
              y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#6B7280', font: { size: 9 }, callback: v => (v/1000)+'K' } }
            }
          }
        });
      }, 200);
    }

    function downloadPDF() {
      if (!reportCache) { showToast('Load laporan dulu', 'error'); return; }
      const d = reportCache;
      const s = d.summary;
      const store = d.store;
      
      // Generate printable HTML
      const html = \`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Laporan \${d.period.monthName} - \${store.name}</title>
      <style>body{font-family:Arial,sans-serif;padding:20px;color:#333;max-width:800px;margin:auto}
      h1{color:#7C3AED;border-bottom:2px solid #A855F7;padding-bottom:8px}
      h2{color:#7C3AED;margin-top:24px;font-size:16px}
      .stats{display:flex;gap:12px;margin:16px 0}
      .stat{flex:1;text-align:center;padding:16px;background:#f8f4ff;border-radius:8px;border:1px solid #e8d5ff}
      .stat .value{font-size:20px;font-weight:bold;color:#7C3AED}
      .stat .label{font-size:11px;color:#666;margin-top:4px}
      table{width:100%;border-collapse:collapse;margin-top:8px;font-size:12px}
      th{background:#f3e8ff;color:#7C3AED;padding:8px;text-align:left;border:1px solid #e8d5ff}
      td{padding:6px 8px;border:1px solid #eee}
      tr:nth-child(even){background:#faf5ff}
      .right{text-align:right}
      .green{color:#059669}.purple{color:#7C3AED}
      .footer{margin-top:32px;text-align:center;font-size:10px;color:#999;border-top:1px solid #eee;padding-top:12px}
      @media print{body{padding:10px}.stat{padding:10px}}</style></head>
      <body>
        <h1>\${store.name} - Laporan \${d.period.monthName}</h1>
        <p style="color:#666;font-size:12px">\${store.city || 'Indonesia'} | Owner: \${store.owner_name}</p>
        
        <div class="stats">
          <div class="stat"><div class="value purple">Rp \${(s.totalRevenue||0).toLocaleString('id-ID')}</div><div class="label">Revenue</div></div>
          <div class="stat"><div class="value green">Rp \${(s.totalProfit||0).toLocaleString('id-ID')}</div><div class="label">Profit (\${s.totalRevenue>0?Math.round((s.totalProfit/s.totalRevenue)*100):0}%)</div></div>
          <div class="stat"><div class="value">\${s.totalOrders}</div><div class="label">Pesanan (\${s.totalItemsSold} item)</div></div>
          <div class="stat"><div class="value">Rp \${(s.avgOrderValue||0).toLocaleString('id-ID')}</div><div class="label">Avg Order</div></div>
        </div>

        <h2>Top Produk</h2>
        <table><tr><th>#</th><th>Produk</th><th class="right">Qty</th><th class="right">Revenue</th></tr>
        \${d.topProducts.map((p,i) => '<tr><td>'+(i+1)+'</td><td>'+p.name+'</td><td class="right">'+p.qty+'</td><td class="right purple">Rp '+(p.revenue||0).toLocaleString('id-ID')+'</td></tr>').join('')}</table>

        <h2>Detail Harian</h2>
        <table><tr><th>Tgl</th><th class="right">Revenue</th><th class="right">Profit</th><th class="right">Order</th><th class="right">Item</th></tr>
        \${d.dailyData.filter(dd=>dd.orders>0).map(dd => '<tr><td>'+dd.day+'</td><td class="right purple">Rp '+(dd.revenue||0).toLocaleString('id-ID')+'</td><td class="right green">Rp '+(dd.profit||0).toLocaleString('id-ID')+'</td><td class="right">'+dd.orders+'</td><td class="right">'+dd.items+'</td></tr>').join('')}
        <tr style="font-weight:bold;background:#f3e8ff"><td>TOTAL</td><td class="right purple">Rp \${(s.totalRevenue||0).toLocaleString('id-ID')}</td><td class="right green">Rp \${(s.totalProfit||0).toLocaleString('id-ID')}</td><td class="right">\${s.totalOrders}</td><td class="right">\${s.totalItemsSold}</td></tr></table>

        <h2>Metode Bayar</h2>
        <table><tr><th>Metode</th><th class="right">Jumlah</th><th class="right">Total</th></tr>
        \${Object.entries(d.paymentBreakdown).map(([m,v]) => '<tr><td style="text-transform:capitalize">'+m+'</td><td class="right">'+v.count+'x</td><td class="right purple">Rp '+(v.total||0).toLocaleString('id-ID')+'</td></tr>').join('')}</table>

        <div class="footer">
          <p>Generated by FashionKas | fashionkas.pages.dev | \${new Date().toLocaleDateString('id-ID')}</p>
        </div>
      </body></html>\`;
      
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const w = window.open(url, '_blank');
      if (w) {
        setTimeout(() => { w.print(); }, 500);
      } else {
        // Fallback: download HTML
        const a = document.createElement('a');
        a.href = url;
        a.download = 'laporan_' + d.period.month + '_' + store.name.replace(/\\s+/g,'_') + '.html';
        a.click();
        showToast('File laporan didownload! Buka & print sebagai PDF.');
      }
      URL.revokeObjectURL(url);
    }

    loadReport();
  </script>`
  
  return fashionLayout('Laporan', content, 'reports')
}
