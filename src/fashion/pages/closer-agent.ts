// Closer AI Agent Page - WA Outreach & Follow-up
// FashionKas v1.2
import { fashionLayout } from '../layout'

export function closerAgentPage(): string {
  const content = `
  <div class="py-6 space-y-5" id="closerContent">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-heading font-bold text-xl"><i class="fa-solid fa-bullseye text-amber-400 mr-2"></i>Closer AI Agent</h1>
        <p class="text-xs text-gray-500">Follow-up cerdas & outreach via WhatsApp</p>
      </div>
      <button onclick="refreshSuggestions()" class="text-xs px-3 py-1.5 rounded-lg bg-fk-purple/10 text-fk-purple border border-fk-purple/20 hover:bg-fk-purple/20">
        <i class="fa-solid fa-rotate mr-1"></i>Refresh
      </button>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3" id="closerSummary">
      <div class="glass-card rounded-xl p-4 text-center animate-pulse"><div class="h-8 bg-white/5 rounded mb-2"></div><div class="h-3 bg-white/5 rounded w-16 mx-auto"></div></div>
      <div class="glass-card rounded-xl p-4 text-center animate-pulse"><div class="h-8 bg-white/5 rounded mb-2"></div><div class="h-3 bg-white/5 rounded w-16 mx-auto"></div></div>
      <div class="glass-card rounded-xl p-4 text-center animate-pulse"><div class="h-8 bg-white/5 rounded mb-2"></div><div class="h-3 bg-white/5 rounded w-16 mx-auto"></div></div>
      <div class="glass-card rounded-xl p-4 text-center animate-pulse"><div class="h-8 bg-white/5 rounded mb-2"></div><div class="h-3 bg-white/5 rounded w-16 mx-auto"></div></div>
    </div>

    <!-- Quick Templates -->
    <div class="glass-card rounded-xl p-5 fk-border">
      <h2 class="font-heading font-bold text-sm mb-3"><i class="fa-solid fa-wand-magic-sparkles text-fk-purple mr-2"></i>Template Pesan</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2" id="templateGrid">
        <div class="animate-pulse h-20 bg-white/5 rounded-xl"></div>
        <div class="animate-pulse h-20 bg-white/5 rounded-xl"></div>
        <div class="animate-pulse h-20 bg-white/5 rounded-xl"></div>
      </div>
    </div>

    <!-- Bulk Send Button -->
    <div class="glass-card rounded-xl p-4 fk-border flex items-center justify-between">
      <div>
        <p class="text-sm font-medium"><i class="fa-solid fa-paper-plane text-green-400 mr-2"></i>Kirim Semua via Fonnte</p>
        <p class="text-[10px] text-gray-500">Batch send semua follow-up suggestions sekaligus (delay 3-8 detik/pesan)</p>
      </div>
      <button onclick="bulkSendAll()" id="btnBulkSend" class="px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-heading font-bold whitespace-nowrap shadow-lg shadow-green-500/20">
        <i class="fa-brands fa-whatsapp mr-1"></i>Kirim Semua
      </button>
    </div>

    <!-- Type Filter -->
    <div class="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
      <button onclick="filterType('all')" class="type-filter active text-xs px-3 py-1.5 rounded-full bg-fk-purple/15 text-fk-purple border border-fk-purple/20 whitespace-nowrap" data-type="all">Semua</button>
      <button onclick="filterType('thankyou')" class="type-filter text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-type="thankyou"><i class="fa-solid fa-heart text-pink-400 mr-1"></i>Thank You</button>
      <button onclick="filterType('loyalty')" class="type-filter text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-type="loyalty"><i class="fa-solid fa-crown text-amber-400 mr-1"></i>Loyalty</button>
      <button onclick="filterType('reengage')" class="type-filter text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-type="reengage"><i class="fa-solid fa-rotate text-blue-400 mr-1"></i>Re-engage</button>
      <button onclick="filterType('vip')" class="type-filter text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-type="vip"><i class="fa-solid fa-gem text-amber-400 mr-1"></i>VIP</button>
      <button onclick="filterType('winback')" class="type-filter text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap" data-type="winback"><i class="fa-solid fa-clock-rotate-left text-cyan-400 mr-1"></i>Win Back</button>
    </div>

    <!-- Suggestion List -->
    <div id="suggestionList">
      <div class="text-center py-8"><i class="fa-solid fa-spinner fa-spin text-fk-purple text-xl"></i><p class="text-xs text-gray-500 mt-2">AI sedang menganalisis customer...</p></div>
    </div>

    <!-- Send Message Modal -->
    <div id="sendModal" class="fixed inset-0 z-[60] hidden">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeSend()"></div>
      <div class="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto glass-card rounded-t-2xl p-6 sm:max-w-lg sm:mx-auto sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl border border-white/5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-heading font-bold text-lg"><i class="fa-brands fa-whatsapp text-green-400 mr-2"></i>Kirim Pesan</h3>
          <button onclick="closeSend()" class="text-gray-500 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
        </div>
        <div class="space-y-3">
          <div class="flex items-center gap-3 pb-3 border-b border-white/5">
            <div class="w-10 h-10 rounded-xl bg-fk-purple/10 flex items-center justify-center text-fk-purple text-sm font-bold" id="sendAvatar">??</div>
            <div>
              <p class="text-sm font-medium" id="sendName">Customer</p>
              <p class="text-[10px] text-gray-500" id="sendPhone">+62...</p>
            </div>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-fk-purple/15 text-fk-purple ml-auto" id="sendType">Follow-up</span>
          </div>
          <div>
            <label class="text-xs text-gray-400 font-medium mb-1 block">Pesan</label>
            <textarea id="sendMessage" class="w-full px-3 py-2.5 rounded-xl bg-empire-dark border border-white/10 text-sm resize-none h-40"></textarea>
          </div>
          <div class="glass-card rounded-xl p-3 border border-green-500/10 bg-green-500/5">
            <p class="text-[10px] text-gray-400 mb-1"><i class="fa-solid fa-lightbulb text-amber-400 mr-1"></i>Tips Closer AI:</p>
            <p class="text-[10px] text-gray-300" id="sendTip">Personalisasi pesan dengan nama customer untuk response rate lebih tinggi</p>
          </div>
          <div class="flex gap-2">
            <button onclick="sendViaFonnte()" id="btnSendFonnte" class="flex-1 py-3.5 rounded-xl bg-[#25D366] text-white font-heading font-bold text-sm shadow-lg shadow-green-500/20">
              <i class="fa-brands fa-whatsapp mr-2"></i>Kirim via Fonnte
            </button>
            <button onclick="sendViaWA()" class="py-3.5 px-4 rounded-xl bg-white/5 text-gray-300 border border-white/10 text-sm hover:bg-white/10">
              <i class="fa-solid fa-external-link"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Template Picker Modal -->
    <div id="templateModal" class="fixed inset-0 z-[60] hidden">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeTemplate()"></div>
      <div class="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto glass-card rounded-t-2xl p-6 sm:max-w-lg sm:mx-auto sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl border border-white/5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-heading font-bold text-lg"><i class="fa-solid fa-file-lines text-fk-purple mr-2"></i>Pilih Template</h3>
          <button onclick="closeTemplate()" class="text-gray-500 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
        </div>
        <div class="space-y-2" id="templateList"></div>
      </div>
    </div>
  </div>

  <script>
    let allSuggestions = [];
    let allTemplates = [];
    let currentSendData = null;
    let currentTypeFilter = 'all';

    async function loadSuggestions() {
      try {
        const res = await apiFetch('/api/ai/closer/suggestions');
        allSuggestions = res.data.suggestions;
        renderSummary(res.data.summary);
        renderSuggestions(allSuggestions);
      } catch(e) {
        document.getElementById('suggestionList').innerHTML = '<div class="glass-card rounded-xl p-8 text-center"><i class="fa-solid fa-exclamation-triangle text-red-400 text-xl mb-2"></i><p class="text-sm text-gray-400">Gagal: ' + e.message + '</p><button onclick="loadSuggestions()" class="mt-3 px-4 py-2 rounded-lg fk-gradient text-white text-xs">Coba Lagi</button></div>';
      }
    }

    async function loadTemplates() {
      try {
        const res = await apiFetch('/api/ai/closer/templates');
        allTemplates = res.data;
        renderTemplateGrid(allTemplates);
      } catch(e) { document.getElementById('templateGrid').innerHTML = '<p class="text-xs text-gray-500 col-span-3">Gagal load templates</p>'; }
    }

    function renderSummary(s) {
      document.getElementById('closerSummary').innerHTML =
        '<div class="glass-card rounded-xl p-4 text-center fk-border"><div class="font-heading font-bold text-2xl text-fk-purple">' + s.totalSuggestions + '</div><div class="text-[10px] text-gray-500">Follow-up</div></div>' +
        '<div class="glass-card rounded-xl p-4 text-center"><div class="font-heading font-bold text-2xl text-red-400">' + s.highUrgency + '</div><div class="text-[10px] text-gray-500">Urgent</div></div>' +
        '<div class="glass-card rounded-xl p-4 text-center"><div class="font-heading font-bold text-2xl text-green-400">' + (s.byType.thankyou || 0) + '</div><div class="text-[10px] text-gray-500">Thank You</div></div>' +
        '<div class="glass-card rounded-xl p-4 text-center"><div class="font-heading font-bold text-2xl text-amber-400">' + (s.byType.reengage || 0) + '</div><div class="text-[10px] text-gray-500">Re-engage</div></div>';
    }

    function renderTemplateGrid(templates) {
      const colors = { thankyou: 'pink', promo: 'amber', newproduct: 'purple', reengage: 'blue', loyalty: 'amber', delivery: 'cyan' };
      document.getElementById('templateGrid').innerHTML = templates.map(t => {
        const cc = colors[t.id] || 'gray';
        return '<button onclick="showTemplatePicker()" class="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-' + cc + '-500/5 border border-' + cc + '-500/10 hover:bg-' + cc + '-500/10 transition-all"><div class="w-8 h-8 rounded-lg bg-' + cc + '-500/10 flex items-center justify-center"><i class="fa-solid fa-' + t.icon + ' text-' + cc + '-400 text-sm"></i></div><span class="text-[11px] font-medium">' + t.name + '</span><span class="text-[9px] text-gray-500">' + t.desc.substring(0,25) + '</span></button>';
      }).join('');
    }

    function filterType(type) {
      currentTypeFilter = type;
      document.querySelectorAll('.type-filter').forEach(b => {
        b.className = b.dataset.type === type ? 'type-filter active text-xs px-3 py-1.5 rounded-full bg-fk-purple/15 text-fk-purple border border-fk-purple/20 whitespace-nowrap' : 'type-filter text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap';
      });
      const filtered = type === 'all' ? allSuggestions : allSuggestions.filter(s => s.type === type);
      renderSuggestions(filtered);
    }

    function renderSuggestions(suggestions) {
      const el = document.getElementById('suggestionList');
      if (suggestions.length === 0) { 
        el.innerHTML = '<div class="glass-card rounded-xl p-8 text-center"><i class="fa-solid fa-check-circle text-green-400 text-3xl mb-3"></i><p class="text-sm text-gray-400">Tidak ada follow-up yang disarankan untuk kategori ini</p><p class="text-[10px] text-gray-600 mt-1">Semua customer sudah terhandle!</p></div>'; 
        return; 
      }
      
      const typeStyles = { thankyou: { icon: 'heart', color: 'pink', label: 'Thank You' }, loyalty: { icon: 'crown', color: 'amber', label: 'Loyalty' }, reengage: { icon: 'rotate', color: 'blue', label: 'Re-engage' }, vip: { icon: 'gem', color: 'amber', label: 'VIP' }, winback: { icon: 'clock-rotate-left', color: 'cyan', label: 'Win Back' } };
      const urgencyColors = { high: 'red', medium: 'amber', low: 'green' };
      const urgencyLabels = { high: 'Urgent', medium: 'Medium', low: 'Low' };
      
      el.innerHTML = '<div class="space-y-2">' + suggestions.map((s, i) => {
        const ts = typeStyles[s.type] || { icon: 'paper-plane', color: 'gray', label: s.type };
        const uc = urgencyColors[s.urgency] || 'gray';
        return '<div class="glass-card rounded-xl p-4 card-hover">' +
          '<div class="flex items-start gap-3">' +
          '<div class="w-10 h-10 rounded-xl bg-' + ts.color + '-500/10 flex items-center justify-center flex-shrink-0"><i class="fa-solid fa-' + ts.icon + ' text-' + ts.color + '-400"></i></div>' +
          '<div class="flex-1 min-w-0">' +
          '<div class="flex items-center gap-2 mb-1"><span class="text-sm font-medium truncate">' + s.customer.name + '</span><span class="text-[10px] px-1.5 py-0.5 rounded-full bg-' + ts.color + '-500/15 text-' + ts.color + '-400">' + ts.label + '</span><span class="text-[10px] px-1.5 py-0.5 rounded-full bg-' + uc + '-500/15 text-' + uc + '-400">' + urgencyLabels[s.urgency] + '</span></div>' +
          '<p class="text-[10px] text-gray-500 mb-1">' + s.action + '</p>' +
          '<div class="flex items-center gap-3 text-[10px] text-gray-600"><span>' + s.stats.orderCount + ' order</span><span>' + formatRupiah(s.stats.totalSpent) + '</span><span>' + s.stats.daysSinceLast + 'h lalu</span></div></div>' +
          '<button onclick="openSend(' + i + ')" class="flex-shrink-0 w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 hover:bg-green-500/20 transition-all"><i class="fa-brands fa-whatsapp text-lg"></i></button>' +
          '</div></div>';
      }).join('') + '</div>';
    }

    function openSend(idx) {
      const filtered = currentTypeFilter === 'all' ? allSuggestions : allSuggestions.filter(s => s.type === currentTypeFilter);
      const s = filtered[idx];
      if (!s) return;
      currentSendData = s;
      document.getElementById('sendAvatar').textContent = s.customer.name.substring(0,2).toUpperCase();
      document.getElementById('sendName').textContent = s.customer.name;
      document.getElementById('sendPhone').textContent = s.customer.phone;
      document.getElementById('sendType').textContent = s.action;
      document.getElementById('sendMessage').value = s.template;
      const tips = { thankyou: 'First impression penting! Pastikan pesan terasa personal.', loyalty: 'Customer loyal = aset terbesar. Apresiasi mereka!', reengage: 'Customer ini butuh alasan untuk kembali. Tawarkan sesuatu yang spesial.', vip: 'VIP customer layak treatment eksklusif. Buat mereka merasa istimewa.', winback: 'Jangan terlalu agresif. Tunjukkan bahwa kamu peduli.' };
      document.getElementById('sendTip').textContent = tips[s.type] || 'Personalisasi pesan untuk response rate lebih tinggi.';
      document.getElementById('sendModal').classList.remove('hidden');
    }

    function closeSend() { document.getElementById('sendModal').classList.add('hidden'); currentSendData = null; }

    async function sendViaFonnte() {
      if (!currentSendData) return;
      const msg = document.getElementById('sendMessage').value.trim();
      if (!msg) { showToast('Tulis pesan dulu!', 'error'); return; }
      const btn = document.getElementById('btnSendFonnte');
      btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Mengirim...';
      try {
        await apiFetch('/api/ai/closer/send', {
          method: 'POST',
          body: JSON.stringify({ phone: currentSendData.customer.phone, message: msg, type: currentSendData.type })
        });
        showToast('Pesan terkirim ke ' + currentSendData.customer.name + '!');
        closeSend();
        // Remove from suggestions
        allSuggestions = allSuggestions.filter(s => s.customer.id !== currentSendData?.customer.id);
        filterType(currentTypeFilter);
      } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
      btn.disabled = false; btn.innerHTML = '<i class="fa-brands fa-whatsapp mr-2"></i>Kirim via Fonnte';
    }

    function sendViaWA() {
      if (!currentSendData) return;
      const msg = encodeURIComponent(document.getElementById('sendMessage').value);
      const phone = currentSendData.customer.phone.replace(/^0/, '62');
      window.open('https://wa.me/' + phone + '?text=' + msg, '_blank');
    }

    function showTemplatePicker() {
      const el = document.getElementById('templateList');
      const store = getStore();
      el.innerHTML = allTemplates.map(t => {
        const preview = t.template.replace(/{name}/g, '[Nama]').replace(/{store}/g, store.name || 'Toko').replace(/{catalog_url}/g, 'fashionkas.pages.dev/catalog/' + (store.slug || '...'));
        return '<button onclick="applyTemplate(\\'' + t.id + '\\')" class="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-fk-purple/10 transition-all border border-white/5 hover:border-fk-purple/20">' +
          '<div class="flex items-center gap-2 mb-2"><i class="fa-solid fa-' + t.icon + ' text-' + t.color + '-400"></i><span class="text-sm font-medium">' + t.name + '</span></div>' +
          '<p class="text-[10px] text-gray-500 whitespace-pre-line line-clamp-3">' + preview + '</p></button>';
      }).join('');
      document.getElementById('templateModal').classList.remove('hidden');
    }

    function closeTemplate() { document.getElementById('templateModal').classList.add('hidden'); }

    function applyTemplate(templateId) {
      const t = allTemplates.find(tt => tt.id === templateId);
      if (!t) return;
      const store = getStore();
      const name = currentSendData ? currentSendData.customer.name : '[Nama]';
      const msg = t.template.replace(/{name}/g, name).replace(/{store}/g, store.name || 'Toko').replace(/{catalog_url}/g, 'https://fashionkas.pages.dev/catalog/' + (store.slug || 'store'));
      const textarea = document.getElementById('sendMessage');
      if (textarea) textarea.value = msg;
      closeTemplate();
    }

    function refreshSuggestions() { loadSuggestions(); showToast('Refreshing AI suggestions...', 'info'); }

    async function bulkSendAll() {
      if (allSuggestions.length === 0) { showToast('Tidak ada follow-up yang tersedia!', 'error'); return; }
      if (!confirm('Kirim ' + allSuggestions.length + ' pesan follow-up sekaligus via Fonnte?\\n\\nDelay 3-8 detik antar pesan untuk anti-ban.')) return;
      const btn = document.getElementById('btnBulkSend');
      btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i>Mengirim...';
      try {
        const messages = allSuggestions.map(s => ({ phone: s.customer.phone, message: s.template, type: s.type }));
        const res = await apiFetch('/api/ai/closer/send-bulk', { method: 'POST', body: JSON.stringify({ messages }) });
        showToast(res.message || allSuggestions.length + ' pesan terkirim!');
        allSuggestions = [];
        filterType('all');
      } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
      btn.disabled = false; btn.innerHTML = '<i class="fa-brands fa-whatsapp mr-1"></i>Kirim Semua';
    }

    loadSuggestions();
    loadTemplates();
  </script>`

  return fashionLayout('Closer AI', content, 'closer')
}
