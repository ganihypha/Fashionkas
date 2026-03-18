// Scout AI Agent Page - Lead Scoring & Customer Intelligence
// FashionKas v1.2
import { fashionLayout } from '../layout'

export function scoutAgentPage(): string {
  const content = `
  <div class="py-6 space-y-5" id="scoutContent">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-heading font-bold text-xl"><i class="fa-solid fa-binoculars text-fk-purple mr-2"></i>Scout AI Agent</h1>
        <p class="text-xs text-gray-500">Lead scoring & customer intelligence</p>
      </div>
      <button onclick="refreshScores()" class="text-xs px-3 py-1.5 rounded-lg bg-fk-purple/10 text-fk-purple border border-fk-purple/20 hover:bg-fk-purple/20">
        <i class="fa-solid fa-rotate mr-1"></i>Refresh
      </button>
    </div>

    <!-- Score Summary -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3" id="scoreSummary">
      <div class="glass-card rounded-xl p-4 text-center animate-pulse"><div class="h-8 bg-white/5 rounded mb-2"></div><div class="h-3 bg-white/5 rounded w-20 mx-auto"></div></div>
      <div class="glass-card rounded-xl p-4 text-center animate-pulse"><div class="h-8 bg-white/5 rounded mb-2"></div><div class="h-3 bg-white/5 rounded w-20 mx-auto"></div></div>
      <div class="glass-card rounded-xl p-4 text-center animate-pulse"><div class="h-8 bg-white/5 rounded mb-2"></div><div class="h-3 bg-white/5 rounded w-20 mx-auto"></div></div>
      <div class="glass-card rounded-xl p-4 text-center animate-pulse"><div class="h-8 bg-white/5 rounded mb-2"></div><div class="h-3 bg-white/5 rounded w-20 mx-auto"></div></div>
    </div>

    <!-- Segment Distribution -->
    <div class="glass-card rounded-xl p-5 fk-border" id="segmentChart">
      <h2 class="font-heading font-bold text-sm mb-3"><i class="fa-solid fa-chart-pie text-fk-purple mr-2"></i>Distribusi Segment</h2>
      <div id="segmentBars" class="space-y-2.5"></div>
    </div>

    <!-- AI Insights -->
    <div class="glass-card rounded-xl p-5 fk-border">
      <h2 class="font-heading font-bold text-sm mb-3"><i class="fa-solid fa-brain text-fk-purple mr-2"></i>AI Insights</h2>
      <div id="insightsList">
        <div class="text-center py-6"><i class="fa-solid fa-spinner fa-spin text-fk-purple"></i><p class="text-xs text-gray-500 mt-2">Menganalisis data...</p></div>
      </div>
    </div>

    <!-- Filter -->
    <div class="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
      <button onclick="filterSegment('all')" class="seg-filter active text-xs px-3 py-1.5 rounded-full bg-fk-purple/15 text-fk-purple border border-fk-purple/20 whitespace-nowrap" data-seg="all">Semua</button>
      <button onclick="filterSegment('vip')" class="seg-filter text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-seg="vip"><i class="fa-solid fa-crown text-amber-400 mr-1"></i>VIP</button>
      <button onclick="filterSegment('loyal')" class="seg-filter text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-seg="loyal"><i class="fa-solid fa-heart text-green-400 mr-1"></i>Loyal</button>
      <button onclick="filterSegment('warm')" class="seg-filter text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-seg="warm"><i class="fa-solid fa-fire text-blue-400 mr-1"></i>Hangat</button>
      <button onclick="filterSegment('at_risk')" class="seg-filter text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-seg="at_risk"><i class="fa-solid fa-exclamation text-red-400 mr-1"></i>Beresiko</button>
      <button onclick="filterSegment('cold')" class="seg-filter text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-seg="cold"><i class="fa-solid fa-snowflake text-gray-400 mr-1"></i>Dingin</button>
    </div>

    <!-- Customer Score List -->
    <div id="customerList">
      <div class="text-center py-8"><i class="fa-solid fa-spinner fa-spin text-fk-purple text-xl"></i><p class="text-xs text-gray-500 mt-2">Loading customer scores...</p></div>
    </div>

    <!-- Customer Detail Modal -->
    <div id="custDetailModal" class="fixed inset-0 z-[60] hidden">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeDetail()"></div>
      <div class="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto glass-card rounded-t-2xl p-6 sm:max-w-lg sm:mx-auto sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl border border-white/5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-heading font-bold text-lg" id="detailName">Customer</h3>
          <button onclick="closeDetail()" class="text-gray-500 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
        </div>
        <div id="detailContent"></div>
      </div>
    </div>
  </div>

  <script>
    let allCustomers = [];
    let currentFilter = 'all';

    async function loadScores() {
      try {
        const res = await apiFetch('/api/ai/scout/scores');
        allCustomers = res.data.customers;
        renderSummary(res.data.summary);
        renderSegmentBars(res.data.summary.segments);
        renderCustomers(allCustomers);
      } catch(e) {
        document.getElementById('customerList').innerHTML = '<div class="glass-card rounded-xl p-8 text-center"><i class="fa-solid fa-exclamation-triangle text-red-400 text-xl mb-2"></i><p class="text-sm text-gray-400">Gagal: ' + e.message + '</p><button onclick="loadScores()" class="mt-3 px-4 py-2 rounded-lg fk-gradient text-white text-xs">Coba Lagi</button></div>';
      }
      loadInsights();
    }

    function renderSummary(s) {
      document.getElementById('scoreSummary').innerHTML = 
        '<div class="glass-card rounded-xl p-4 text-center fk-border"><div class="font-heading font-bold text-2xl text-fk-purple">' + s.totalCustomers + '</div><div class="text-[10px] text-gray-500">Total Customer</div></div>' +
        '<div class="glass-card rounded-xl p-4 text-center"><div class="font-heading font-bold text-2xl text-green-400">' + s.avgScore + '</div><div class="text-[10px] text-gray-500">Avg Score</div></div>' +
        '<div class="glass-card rounded-xl p-4 text-center"><div class="font-heading font-bold text-2xl text-red-400">' + s.churnRiskHigh + '</div><div class="text-[10px] text-gray-500">Churn Risk</div></div>' +
        '<div class="glass-card rounded-xl p-4 text-center"><div class="font-heading font-bold text-2xl text-amber-400">' + formatRupiah(s.totalLifetimeValue) + '</div><div class="text-[10px] text-gray-500">Lifetime Value</div></div>';
    }

    function renderSegmentBars(segs) {
      const total = Object.values(segs).reduce((s, v) => s + v, 0) || 1;
      const colors = { vip: { bg: 'amber', label: 'VIP', icon: 'crown' }, loyal: { bg: 'green', label: 'Loyal', icon: 'heart' }, warm: { bg: 'blue', label: 'Hangat', icon: 'fire' }, at_risk: { bg: 'red', label: 'Beresiko', icon: 'exclamation' }, cold: { bg: 'gray', label: 'Dingin', icon: 'snowflake' } };
      const el = document.getElementById('segmentBars');
      el.innerHTML = Object.entries(colors).map(([key, c]) => {
        const count = segs[key] || 0;
        const pct = Math.round((count / total) * 100);
        return '<div class="flex items-center gap-3"><div class="w-20 text-xs text-gray-400"><i class="fa-solid fa-' + c.icon + ' text-' + c.bg + '-400 mr-1"></i>' + c.label + '</div><div class="flex-1 h-6 bg-white/5 rounded-full overflow-hidden"><div class="h-full bg-' + c.bg + '-500/30 rounded-full flex items-center pl-2 transition-all duration-500" style="width:' + Math.max(pct, 5) + '%"><span class="text-[10px] text-' + c.bg + '-400 font-medium">' + count + ' (' + pct + '%)</span></div></div></div>';
      }).join('');
    }

    async function loadInsights() {
      try {
        const res = await apiFetch('/api/ai/scout/insights');
        const ins = res.data.insights;
        const el = document.getElementById('insightsList');
        if (ins.length === 0) { el.innerHTML = '<p class="text-sm text-gray-500 text-center py-4">Belum ada insight. Tambah lebih banyak data!</p>'; return; }
        const typeStyles = { positive: 'bg-green-500/10 border-green-500/20 text-green-400', warning: 'bg-amber-500/10 border-amber-500/20 text-amber-400', danger: 'bg-red-500/10 border-red-500/20 text-red-400', action: 'bg-fk-purple/10 border-fk-purple/20 text-fk-purple' };
        el.innerHTML = ins.map(i => {
          const style = typeStyles[i.type] || typeStyles.action;
          return '<div class="flex items-start gap-3 py-3 border-b border-white/5 last:border-0"><div class="w-9 h-9 rounded-xl ' + style + ' border flex items-center justify-center flex-shrink-0"><i class="fa-solid fa-' + i.icon + ' text-xs"></i></div><div><p class="text-sm font-medium">' + i.title + '</p><p class="text-[10px] text-gray-500">' + i.desc + '</p></div></div>';
        }).join('');
      } catch(e) { document.getElementById('insightsList').innerHTML = '<p class="text-xs text-gray-500">Gagal memuat insights</p>'; }
    }

    function filterSegment(seg) {
      currentFilter = seg;
      document.querySelectorAll('.seg-filter').forEach(b => {
        b.className = b.dataset.seg === seg ? 'seg-filter active text-xs px-3 py-1.5 rounded-full bg-fk-purple/15 text-fk-purple border border-fk-purple/20 whitespace-nowrap' : 'seg-filter text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap';
      });
      const filtered = seg === 'all' ? allCustomers : allCustomers.filter(c => c.segment === seg);
      renderCustomers(filtered);
    }

    function renderCustomers(customers) {
      const el = document.getElementById('customerList');
      if (customers.length === 0) { el.innerHTML = '<div class="glass-card rounded-xl p-8 text-center"><i class="fa-solid fa-users text-gray-600 text-3xl mb-3"></i><p class="text-sm text-gray-400">Belum ada customer di segment ini</p></div>'; return; }
      el.innerHTML = '<div class="space-y-2">' + customers.map((c, i) => {
        const segColors = { vip: 'amber', loyal: 'green', warm: 'blue', at_risk: 'red', cold: 'gray' };
        const sc = segColors[c.segment] || 'gray';
        const churnBadge = c.churnRisk === 'high' ? '<span class="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/15 text-red-400 ml-1">Churn</span>' : '';
        const scoreColor = c.totalScore >= 70 ? 'text-green-400' : c.totalScore >= 40 ? 'text-amber-400' : 'text-red-400';
        return '<div class="glass-card rounded-xl p-4 card-hover cursor-pointer" onclick="showDetail(' + i + ')">' +
          '<div class="flex items-center gap-3">' +
          '<div class="relative"><div class="w-10 h-10 rounded-xl bg-' + sc + '-500/10 flex items-center justify-center text-' + sc + '-400 text-xs font-bold">' + (c.name?c.name.substring(0,2).toUpperCase():'??') + '</div>' +
          '<div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-empire-dark border border-white/10 flex items-center justify-center"><span class="text-[8px] font-bold ' + scoreColor + '">' + c.totalScore + '</span></div></div>' +
          '<div class="flex-1 min-w-0"><div class="flex items-center gap-2"><span class="text-sm font-medium truncate">' + c.name + '</span><span class="text-[10px] px-2 py-0.5 rounded-full bg-' + sc + '-500/15 text-' + sc + '-400">' + c.segmentLabel + '</span>' + churnBadge + '</div>' +
          '<div class="flex items-center gap-3 text-[10px] text-gray-500"><span>' + c.orderCount + ' order</span><span>' + formatRupiah(c.totalSpent) + '</span><span>' + (c.daysSinceLastOrder < 999 ? c.daysSinceLastOrder + 'h lalu' : 'N/A') + '</span></div></div>' +
          '<div class="flex flex-col items-end gap-1">' +
          '<div class="flex gap-0.5">' +
          '<div class="w-1.5 h-4 rounded-sm bg-fk-purple/30" style="height:' + (c.recencyScore*4) + 'px" title="R:'+c.recencyScore+'"></div>' +
          '<div class="w-1.5 h-4 rounded-sm bg-green-500/30" style="height:' + (c.frequencyScore*4) + 'px" title="F:'+c.frequencyScore+'"></div>' +
          '<div class="w-1.5 h-4 rounded-sm bg-amber-500/30" style="height:' + (c.monetaryScore*4) + 'px" title="M:'+c.monetaryScore+'"></div></div>' +
          '<span class="text-[9px] text-gray-600">RFM</span></div></div></div>';
      }).join('') + '</div>';
    }

    function showDetail(idx) {
      const c = (currentFilter === 'all' ? allCustomers : allCustomers.filter(cu => cu.segment === currentFilter))[idx];
      if (!c) return;
      document.getElementById('detailName').textContent = c.name;
      const segColors = { vip: 'amber', loyal: 'green', warm: 'blue', at_risk: 'red', cold: 'gray' };
      const sc = segColors[c.segment] || 'gray';
      document.getElementById('detailContent').innerHTML = 
        '<div class="space-y-4">' +
        '<div class="flex items-center gap-3 pb-3 border-b border-white/5"><div class="w-14 h-14 rounded-2xl bg-'+sc+'-500/10 flex items-center justify-center text-'+sc+'-400 text-lg font-bold">' + c.name.substring(0,2).toUpperCase() + '</div>' +
        '<div><span class="text-xs px-2 py-0.5 rounded-full bg-'+sc+'-500/15 text-'+sc+'-400">' + c.segmentLabel + '</span><p class="text-xs text-gray-500 mt-1">' + c.phone + '</p></div>' +
        '<div class="ml-auto text-right"><div class="text-2xl font-heading font-bold text-fk-purple">' + c.totalScore + '</div><div class="text-[10px] text-gray-500">Score</div></div></div>' +
        '<div class="grid grid-cols-3 gap-3">' +
        '<div class="bg-fk-purple/5 rounded-xl p-3 text-center"><div class="text-xs text-gray-500 mb-1">Recency</div><div class="text-lg font-bold text-fk-purple">' + c.recencyScore + '/5</div><div class="text-[10px] text-gray-600">' + c.daysSinceLastOrder + 'h lalu</div></div>' +
        '<div class="bg-green-500/5 rounded-xl p-3 text-center"><div class="text-xs text-gray-500 mb-1">Frequency</div><div class="text-lg font-bold text-green-400">' + c.frequencyScore + '/5</div><div class="text-[10px] text-gray-600">' + c.orderCount + ' order</div></div>' +
        '<div class="bg-amber-500/5 rounded-xl p-3 text-center"><div class="text-xs text-gray-500 mb-1">Monetary</div><div class="text-lg font-bold text-amber-400">' + c.monetaryScore + '/5</div><div class="text-[10px] text-gray-600">' + formatRupiah(c.totalSpent) + '</div></div></div>' +
        '<div class="grid grid-cols-2 gap-3">' +
        '<div class="bg-white/5 rounded-xl p-3"><div class="text-[10px] text-gray-500">Avg Order</div><div class="text-sm font-mono text-fk-purple">' + formatRupiah(c.avgOrderValue) + '</div></div>' +
        '<div class="bg-white/5 rounded-xl p-3"><div class="text-[10px] text-gray-500">Kategori Favorit</div><div class="text-sm capitalize">' + c.favCategory + '</div></div></div>' +
        '<div class="flex items-center justify-between py-2 bg-white/5 rounded-xl px-3"><div class="text-xs text-gray-400">Churn Risk</div><span class="text-xs px-2 py-0.5 rounded-full bg-'+(c.churnRisk==='high'?'red':c.churnRisk==='medium'?'amber':'green')+'-500/15 text-'+(c.churnRisk==='high'?'red':c.churnRisk==='medium'?'amber':'green')+'-400">' + (c.churnRisk==='high'?'Tinggi':c.churnRisk==='medium'?'Sedang':'Rendah') + '</span></div>' +
        '<div class="flex gap-2">' +
        '<a href="/fashionkas/closer" class="flex-1 py-3 rounded-xl bg-fk-purple/10 text-fk-purple border border-fk-purple/20 text-center text-sm font-medium hover:bg-fk-purple/20"><i class="fa-solid fa-bullseye mr-1"></i>Follow-up</a>' +
        '<a href="https://wa.me/'+c.phone+'" target="_blank" class="flex-1 py-3 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 text-center text-sm font-medium hover:bg-green-500/20"><i class="fa-brands fa-whatsapp mr-1"></i>Chat WA</a></div></div>';
      document.getElementById('custDetailModal').classList.remove('hidden');
    }

    function closeDetail() { document.getElementById('custDetailModal').classList.add('hidden'); }
    function refreshScores() { loadScores(); showToast('Refreshing scores...', 'info'); }

    loadScores();
  </script>`

  return fashionLayout('Scout AI', content, 'scout')
}
