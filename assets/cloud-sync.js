/* Supabase cloud sync for OPPO Shop Dashboard.
   Publishable key is intended for browser use; database security is enforced by RLS. */
const SUPABASE_URL = 'https://tuhykryfzzueygjgokuq.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_vA1YMLm2n0SMsyuO8-wp-Q_KgEbIPXW';
const CLOUD_STATE_KEY = 'oppo_shop_dashboard_cloud_state_v1';
const CLOUD_CLIENT_ID = localStorage.getItem('oppo_dashboard_client_id') || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random());
localStorage.setItem('oppo_dashboard_client_id', CLOUD_CLIENT_ID);
let cloudClient = null;
let cloudUser = null;
let cloudRole = 'member';
let cloudSaving = false;
let cloudLastUpdated = null;

function cloudUi() {
  if (document.getElementById('cloudLoginGate')) return;
  const gate = document.createElement('div');
  gate.id = 'cloudLoginGate';
  gate.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4';
  gate.innerHTML = `
    <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
      <div class="mb-5 flex items-center gap-3">
        <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-lg font-extrabold text-white">OP</div>
        <div><h2 class="text-lg font-extrabold text-slate-900">OPPO Dashboard</h2><p class="text-xs text-slate-500">Đăng nhập để đồng bộ dữ liệu tập trung</p></div>
      </div>
      <form id="cloudLoginForm" class="space-y-3">
        <label class="block text-sm font-semibold">Email<input id="cloudEmail" type="email" required autocomplete="username" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" placeholder="email@company.com"></label>
        <label class="block text-sm font-semibold">Mật khẩu<input id="cloudPassword" type="password" required autocomplete="current-password" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" placeholder="Mật khẩu Supabase"></label>
        <p id="cloudLoginError" class="hidden rounded-lg bg-rose-50 p-3 text-xs text-rose-700"></p>
        <button id="cloudLoginButton" type="submit" class="w-full rounded-lg bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700">Đăng nhập</button>
      </form>
      <p class="mt-4 text-xs leading-relaxed text-slate-500">Tài khoản được quản lý bởi quản trị viên. Không có chức năng tự đăng ký.</p>
    </div>`;
  document.body.appendChild(gate);

  const bar = document.createElement('div');
  bar.id = 'cloudAccountBar';
  bar.className = 'fixed bottom-3 left-3 z-40 flex max-w-[calc(100%-24px)] flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white/95 px-3 py-2 text-xs shadow-lg';
  bar.innerHTML = '<span id="cloudAccountText" class="font-semibold text-slate-700"></span><span id="cloudSyncText" class="text-slate-500">Đang kết nối...</span><button id="cloudLogout" class="rounded-md border px-2 py-1 font-semibold hover:bg-slate-50">Đăng xuất</button>';
  document.body.appendChild(bar);
  document.getElementById('cloudLoginForm').addEventListener('submit', cloudLogin);
  document.getElementById('cloudLogout').addEventListener('click', async () => {
    if (cloudClient) await cloudClient.auth.signOut();
    location.reload();
  });
}

function cloudMessage(message, isError = false) {
  const el = document.getElementById('cloudLoginError');
  if (el) { el.textContent = message; el.classList.toggle('hidden', !isError); }
  const sync = document.getElementById('cloudSyncText');
  if (sync && !isError) sync.textContent = message;
}
function cloudSetBusy(busy) {
  const b = document.getElementById('cloudLoginButton');
  if (b) { b.disabled = busy; b.textContent = busy ? 'Đang đăng nhập...' : 'Đăng nhập'; }
}
async function cloudLogin(e) {
  e.preventDefault();
  cloudSetBusy(true); cloudMessage('');
  const email = document.getElementById('cloudEmail').value.trim();
  const password = document.getElementById('cloudPassword').value;
  const { data, error } = await cloudClient.auth.signInWithPassword({ email, password });
  cloudSetBusy(false);
  if (error) { cloudMessage('Không đăng nhập được: ' + error.message, true); return; }
  try {
    cloudUser = data.user;
    await cloudLoadProfile();
    await cloudLoadState();
    document.getElementById('cloudLoginGate').classList.add('hidden');
    await cloudStartRealtime();
  } catch (err) {
    cloudMessage(err.message, true);
    await cloudClient.auth.signOut();
  }
}
async function cloudLoadProfile() {
  const { data, error } = await cloudClient.from('dashboard_profiles').select('role,display_name').eq('user_id', cloudUser.id).maybeSingle();
  if (error) throw error;
  if (!data) throw new Error('Tài khoản chưa có hồ sơ phân quyền. Hãy kiểm tra SQL cài đặt trong Supabase.');
  cloudRole = data.role || 'member';
  const label = data.display_name || cloudUser.email;
  document.getElementById('cloudAccountText').textContent = label + ' · ' + (cloudRole === 'admin' ? 'Quản trị viên' : 'Nhân viên');
  cloudApplyPermissions();
}
function cloudApplyPermissions() {
  const admin = cloudRole === 'admin';
  const managementTab = document.querySelector('[data-tab="management"]');
  if (managementTab) managementTab.classList.toggle('hidden', !admin);
  ['excelUploadInput','resetStorageBtn','exportJsonBtn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) (el.closest('label') || el).classList.toggle('hidden', !admin);
  });
  if (!admin && document.getElementById('tab-management')) document.getElementById('tab-management').classList.add('hidden');
}
async function cloudLoadState() {
  const { data, error } = await cloudClient.from('dashboard_state').select('data,targets,updated_at,updated_by').eq('id','main').maybeSingle();
  if (error) throw error;
  if (data && data.data) {
    currentData = data.data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
    const targets = data.targets || {};
    localStorage.setItem('oppo_shop_dashboard_targets_v1', JSON.stringify(targets));
    if (typeof mgApplyTargets === 'function') mgApplyTargets();
    cloudLastUpdated = data.updated_at;
    renderAll();
    if (typeof mgRenderAll === 'function') mgRenderAll();
    cloudMessage('Đã tải dữ liệu mới nhất từ cloud');
  } else if (cloudRole === 'admin') {
    await cloudSaveData(true);
    cloudMessage('Đã khởi tạo dữ liệu cloud từ thiết bị quản trị này');
  } else {
    throw new Error('Chưa có dữ liệu cloud. Quản trị viên cần đăng nhập và khởi tạo dữ liệu trước.');
  }
}
async function cloudSaveData(initializing = false) {
  if (!cloudClient || !cloudUser || cloudRole !== 'admin' || cloudSaving) return false;
  cloudSaving = true;
  cloudMessage('Đang đồng bộ dữ liệu...');
  try {
    const rawTargets = localStorage.getItem('oppo_shop_dashboard_targets_v1') || '{}';
    const targets = JSON.parse(rawTargets);
    const { error } = await cloudClient.from('dashboard_state').upsert({
      id: 'main', data: currentData, targets, updated_by: cloudUser.id, client_id: CLOUD_CLIENT_ID, updated_at: new Date().toISOString()
    }, { onConflict: 'id' });
    if (error) throw error;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
    cloudMessage(initializing ? 'Cloud đã sẵn sàng' : 'Đã đồng bộ lên cloud');
    return true;
  } catch (err) {
    console.error('Cloud sync failed:', err);
    cloudMessage('Lỗi đồng bộ: ' + err.message, true);
    if (typeof showToast === 'function') showToast('Không đồng bộ được lên cloud: ' + err.message, 'error');
    return false;
  } finally { cloudSaving = false; }
}
async function cloudStartRealtime() {
  cloudClient.channel('dashboard-state-live')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'dashboard_state', filter: 'id=eq.main' }, payload => {
      const row = payload.new;
      if (!row || row.client_id === CLOUD_CLIENT_ID || !row.data) return;
      currentData = row.data;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
      localStorage.setItem('oppo_shop_dashboard_targets_v1', JSON.stringify(row.targets || {}));
      if (typeof mgApplyTargets === 'function') mgApplyTargets();
      renderAll();
      if (typeof mgRenderAll === 'function') mgRenderAll();
      cloudMessage('Đã nhận cập nhật mới từ thiết bị khác');
    }).subscribe();
}
async function cloudInitialize() {
  cloudUi();
  cloudClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  const { data: { session } } = await cloudClient.auth.getSession();
  if (!session) return;
  cloudUser = session.user;
  try {
    await cloudLoadProfile();
    await cloudLoadState();
    document.getElementById('cloudLoginGate').classList.add('hidden');
    await cloudStartRealtime();
  } catch (err) {
    cloudMessage(err.message, true);
    await cloudClient.auth.signOut();
  }
}
document.addEventListener('DOMContentLoaded', () => {
  cloudInitialize().catch(err => { console.error(err); cloudMessage('Không khởi tạo được kết nối cloud: ' + err.message, true); });
});
window.cloudSaveData = cloudSaveData;
