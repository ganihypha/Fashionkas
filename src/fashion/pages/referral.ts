// Referral Program Page - FashionKas v3.2
// Share & earn rewards
import { fashionLayout } from '../layout'

export function referralPage(): string {
  const content = `
  <div class="py-6 space-y-5" id="referralContent">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-heading font-bold text-xl"><i class="fa-solid fa-gift text-amber-400 mr-2"></i>Program Referral</h1>
        <p class="text-xs text-gray-500">Ajak teman, dapatkan reward!</p>
      </div>
    </div>

    <!-- Referral Code Card -->
    <div class="glass-card rounded-2xl p-6 fk-border fk-glow text-center">
      <div class="w-16 h-16 mx-auto rounded-2xl fk-gradient flex items-center justify-center mb-4 shadow-lg shadow-fk-purple/30">
        <i class="fa-solid fa-share-nodes text-white text-2xl"></i>
      </div>
      <p class="text-xs text-gray-400 mb-2">Kode Referral Kamu</p>
      <div class="flex items-center justify-center gap-3 mb-4">
        <span id="refCode" class="font-mono font-bold text-2xl text-fk-purple tracking-wider">---</span>
        <button onclick="copyCode()" class="w-10 h-10 rounded-xl bg-fk-purple/10 flex items-center justify-center text-fk-purple hover:bg-fk-purple/20 transition-all">
          <i class="fa-solid fa-copy"></i>
        </button>
      </div>
      <div class="flex gap-2 justify-center">
        <button onclick="shareWA()" class="flex-1 max-w-[160px] py-3 rounded-xl bg-[#25D366] text-white text-sm font-heading font-bold shadow-lg shadow-green-500/20">
          <i class="fa-brands fa-whatsapp mr-2"></i>Share WA
        </button>
        <button onclick="copyLink()" class="flex-1 max-w-[160px] py-3 rounded-xl bg-fk-purple/10 text-fk-purple border border-fk-purple/20 text-sm font-heading font-bold">
          <i class="fa-solid fa-link mr-2"></i>Copy Link
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3" id="refStats">
      <div class="glass-card rounded-xl p-4 text-center animate-pulse"><div class="h-8 bg-white/5 rounded mb-2"></div><div class="h-3 bg-white/5 rounded w-16 mx-auto"></div></div>
      <div class="glass-card rounded-xl p-4 text-center animate-pulse"><div class="h-8 bg-white/5 rounded mb-2"></div><div class="h-3 bg-white/5 rounded w-16 mx-auto"></div></div>
      <div class="glass-card rounded-xl p-4 text-center animate-pulse"><div class="h-8 bg-white/5 rounded mb-2"></div><div class="h-3 bg-white/5 rounded w-16 mx-auto"></div></div>
      <div class="glass-card rounded-xl p-4 text-center animate-pulse"><div class="h-8 bg-white/5 rounded mb-2"></div><div class="h-3 bg-white/5 rounded w-16 mx-auto"></div></div>
    </div>

    <!-- Reward Tiers -->
    <div class="glass-card rounded-xl p-5 fk-border">
      <h2 class="font-heading font-bold text-sm mb-4"><i class="fa-solid fa-trophy text-amber-400 mr-2"></i>Hadiah Milestone</h2>
      <div class="space-y-3">
        <div class="flex items-center gap-4 p-3 rounded-xl bg-white/5">
          <div class="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 font-bold text-sm">1x</div>
          <div class="flex-1"><p class="text-sm font-medium">Tiap Referral</p><p class="text-[10px] text-gray-500">30 hari gratis untuk kamu & temanmu</p></div>
          <i class="fa-solid fa-check-circle text-green-400"></i>
        </div>
        <div class="flex items-center gap-4 p-3 rounded-xl bg-white/5">
          <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-sm">5x</div>
          <div class="flex-1"><p class="text-sm font-medium">5 Referral</p><p class="text-[10px] text-gray-500">Upgrade BASIC gratis 3 bulan</p></div>
          <span id="milestone5" class="text-[10px] px-2 py-0.5 rounded-full bg-gray-500/15 text-gray-400">Belum</span>
        </div>
        <div class="flex items-center gap-4 p-3 rounded-xl bg-white/5">
          <div class="w-10 h-10 rounded-xl bg-fk-purple/10 flex items-center justify-center text-fk-purple font-bold text-sm">10x</div>
          <div class="flex-1"><p class="text-sm font-medium">10 Referral</p><p class="text-[10px] text-gray-500">Upgrade PRO gratis 3 bulan</p></div>
          <span id="milestone10" class="text-[10px] px-2 py-0.5 rounded-full bg-gray-500/15 text-gray-400">Belum</span>
        </div>
        <div class="flex items-center gap-4 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
          <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold text-sm">25</div>
          <div class="flex-1"><p class="text-sm font-medium text-amber-400">25 Referral</p><p class="text-[10px] text-gray-500">Lifetime BASIC gratis selamanya!</p></div>
          <span id="milestone25" class="text-[10px] px-2 py-0.5 rounded-full bg-gray-500/15 text-gray-400">Belum</span>
        </div>
      </div>
    </div>

    <!-- How It Works -->
    <div class="glass-card rounded-xl p-5 fk-border">
      <h2 class="font-heading font-bold text-sm mb-4"><i class="fa-solid fa-circle-question text-fk-purple mr-2"></i>Cara Kerja</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="text-center">
          <div class="w-12 h-12 mx-auto rounded-xl bg-fk-purple/10 flex items-center justify-center mb-2">
            <i class="fa-solid fa-share text-fk-purple text-lg"></i>
          </div>
          <p class="text-sm font-medium">1. Bagikan Kode</p>
          <p class="text-[10px] text-gray-500">Share kode/link referral ke sesama reseller</p>
        </div>
        <div class="text-center">
          <div class="w-12 h-12 mx-auto rounded-xl bg-green-500/10 flex items-center justify-center mb-2">
            <i class="fa-solid fa-user-plus text-green-400 text-lg"></i>
          </div>
          <p class="text-sm font-medium">2. Teman Daftar</p>
          <p class="text-[10px] text-gray-500">Teman masukkan kode saat register</p>
        </div>
        <div class="text-center">
          <div class="w-12 h-12 mx-auto rounded-xl bg-amber-500/10 flex items-center justify-center mb-2">
            <i class="fa-solid fa-gift text-amber-400 text-lg"></i>
          </div>
          <p class="text-sm font-medium">3. Dapat Reward</p>
          <p class="text-[10px] text-gray-500">Kalian berdua dapat 30 hari gratis!</p>
        </div>
      </div>
    </div>

    <!-- Referral History -->
    <div class="glass-card rounded-xl p-5 fk-border">
      <h2 class="font-heading font-bold text-sm mb-3"><i class="fa-solid fa-clock-rotate-left text-fk-purple mr-2"></i>Riwayat Referral</h2>
      <div id="refHistory">
        <div class="text-center py-6"><i class="fa-solid fa-spinner fa-spin text-fk-purple"></i></div>
      </div>
    </div>
  </div>

  <script>
    let refData = null;

    async function loadReferral() {
      try {
        const res = await apiFetch('/api/referral/info');
        refData = res.data;
        document.getElementById('refCode').textContent = refData.referralCode;
        
        document.getElementById('refStats').innerHTML =
          '<div class="glass-card rounded-xl p-4 text-center fk-border"><div class="font-heading font-bold text-2xl text-fk-purple">' + refData.stats.totalReferrals + '</div><div class="text-[10px] text-gray-500">Total Referral</div></div>' +
          '<div class="glass-card rounded-xl p-4 text-center"><div class="font-heading font-bold text-2xl text-green-400">' + refData.stats.activeReferrals + '</div><div class="text-[10px] text-gray-500">Aktif (90 hari)</div></div>' +
          '<div class="glass-card rounded-xl p-4 text-center"><div class="font-heading font-bold text-2xl text-amber-400">' + refData.stats.totalRewardDays + '</div><div class="text-[10px] text-gray-500">Hari Gratis</div></div>' +
          '<div class="glass-card rounded-xl p-4 text-center"><div class="font-heading font-bold text-2xl text-cyan-400">' + refData.stats.pendingRewards + '</div><div class="text-[10px] text-gray-500">Pending</div></div>';
        
        // Update milestones
        if (refData.stats.totalReferrals >= 5) document.getElementById('milestone5').innerHTML = '<i class="fa-solid fa-check text-green-400"></i>';
        if (refData.stats.totalReferrals >= 10) document.getElementById('milestone10').innerHTML = '<i class="fa-solid fa-check text-green-400"></i>';
        if (refData.stats.totalReferrals >= 25) document.getElementById('milestone25').innerHTML = '<i class="fa-solid fa-check text-green-400"></i>';
        
        // Render history
        const history = refData.referralHistory || [];
        const el = document.getElementById('refHistory');
        if (history.length === 0) {
          el.innerHTML = '<div class="text-center py-6"><i class="fa-solid fa-users text-gray-600 text-2xl mb-2"></i><p class="text-sm text-gray-500">Belum ada referral</p><p class="text-[10px] text-gray-600">Bagikan kode kamu ke sesama reseller!</p></div>';
        } else {
          el.innerHTML = '<div class="space-y-2">' + history.map(function(r) {
            return '<div class="flex items-center gap-3 p-3 rounded-xl bg-white/5"><div class="w-8 h-8 rounded-lg bg-fk-purple/10 flex items-center justify-center text-fk-purple text-xs font-bold">' + (r.storeName || '?').substring(0,2).toUpperCase() + '</div><div class="flex-1"><p class="text-sm">' + (r.storeName || 'Toko Baru') + '</p><p class="text-[10px] text-gray-500">' + (r.city || '-') + ' - ' + formatDate(r.joinedAt) + '</p></div><span class="text-[10px] px-2 py-0.5 rounded-full ' + (r.isActive ? 'bg-green-500/15 text-green-400' : 'bg-gray-500/15 text-gray-400') + '">' + (r.isActive ? 'Aktif' : 'Lama') + '</span></div>';
          }).join('') + '</div>';
        }
      } catch(e) {
        document.getElementById('refStats').innerHTML = '<div class="col-span-4 glass-card rounded-xl p-6 text-center"><p class="text-sm text-gray-400">Gagal memuat: ' + e.message + '</p><button onclick="loadReferral()" class="mt-2 px-4 py-2 rounded-lg fk-gradient text-white text-xs">Coba Lagi</button></div>';
      }
    }

    function copyCode() {
      if (!refData) return;
      navigator.clipboard.writeText(refData.referralCode).then(function() { showToast('Kode disalin!'); });
    }

    function copyLink() {
      if (!refData) return;
      navigator.clipboard.writeText(refData.shareUrl).then(function() { showToast('Link disalin!'); });
    }

    function shareWA() {
      if (!refData) return;
      var msg = encodeURIComponent(refData.shareMessage);
      window.open('https://wa.me/?text=' + msg, '_blank');
    }

    loadReferral();
  </script>`

  return fashionLayout('Referral', content, 'referral')
}
