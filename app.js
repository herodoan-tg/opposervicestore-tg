const STORAGE_KEYS = {
  UPLOADED_DATA: 'oppo_kpi_dashboard_data_v2',
  SAVED_TARGETS: 'oppo_kpi_custom_targets_v2'
};

let appState = {
  fileName: '',
  uploadedAt: '',
  kpiSummary: [],
  tatService: [],
  orders: []
};

let customTargets = {};
let charts = {};

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  loadSavedTargets();
  loadSavedUploadData();
  bindEvents();
});

function initTabs() {
  const btns = document.querySelectorAll('.tab-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });
}

function bindEvents() {
  document.getElementById('excelUpload').addEventListener('change', handleFileUpload);
  document.getElementById('btnClearStorage').addEventListener('click', clearAllStorage);

  document.getElementById('filterSourceStaff').addEventListener('change', renderStaffAndProducts);
  document.getElementById('filterEmployeeName').addEventListener('change', renderStaffAndProducts);
  document.getElementById('searchProductInput').addEventListener('input', renderStaffAndProducts);

  document.getElementById('filterOrderSheet').addEventListener('change', renderOrdersTable);
  document.getElementById('filterOrderStaff').addEventListener('change', renderOrdersTable);
  document.getElementById('searchOrderInput').addEventListener('input', renderOrdersTable);

  document.getElementById('btnSaveTargets').addEventListener('click', saveTargetsToStorage);
  document.getElementById('btnResetTargets').addEventListener('click', resetTargetsToExcel);
}

function loadSavedTargets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_TARGETS);
    if (raw) {
      const parsed = JSON.parse(raw);
      customTargets = parsed.targets || {};
      if (parsed.lastSavedAt) {
        document.getElementById('targetLastSavedNote').textContent =
          `✅ Lần lưu Target gần nhất: ${parsed.lastSavedAt}`;
      }
    }
  } catch (e) {
    console.warn('Lỗi đọc Target đã lưu:', e);
  }
}

function loadSavedUploadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.UPLOADED_DATA);
    if (raw) {
      appState = JSON.parse(raw);
      document.getElementById('lastUpdatedText').textContent =
        `📂 Đang hiển thị dữ liệu lưu gần nhất: ${appState.fileName} (Tải lên lúc ${appState.uploadedAt})`;
      populateEmployeeDropdowns();
      renderAll();
    }
  } catch (e) {
    console.warn('Lỗi đọc dữ liệu đã lưu:', e);
  }
}

function saveUploadDataToStorage() {
  try {
    localStorage.setItem(STORAGE_KEYS.UPLOADED_DATA, JSON.stringify(appState));
  } catch (e) {
    showToast('⚠️ File quá lớn vượt giới hạn bộ nhớ trình duyệt, dữ liệu chỉ hiển thị phiên hiện tại.');
  }
}

function saveTargetsToStorage() {
  const inputs = document.querySelectorAll('.target-input');
  const now = new Date().toLocaleString('vi-VN');
  inputs.forEach(inp => {
    const key = inp.dataset.key;
    const val = parseNumber(inp.value);
    customTargets[key] = val;
  });

  localStorage.setItem(STORAGE_KEYS.SAVED_TARGETS, JSON.stringify({
    targets: customTargets,
    lastSavedAt: now
  }));

  document.getElementById('targetLastSavedNote').textContent =
    `✅ Đã lưu Target lần cuối lúc: ${now}`;
  renderAll();
  showToast('💾 Đã lưu cấu hình Target thành công!');
}

function resetTargetsToExcel() {
  customTargets = {};
  localStorage.removeItem(STORAGE_KEYS.SAVED_TARGETS);
  document.getElementById('targetLastSavedNote').textContent =
    '↺ Đã khôi phục toàn bộ Target về giá trị gốc từ file Excel.';
  renderAll();
  showToast('Đã khôi phục Target theo file Excel');
}

function clearAllStorage() {
  if (!confirm('Bạn có chắc muốn xóa dữ liệu upload và target đã lưu trên trình duyệt này?')) return;
  localStorage.removeItem(STORAGE_KEYS.UPLOADED_DATA);
  localStorage.removeItem(STORAGE_KEYS.SAVED_TARGETS);
  location.reload();
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (evt) {
    try {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      parseWorkbook(workbook, file.name);
      saveUploadDataToStorage();
      populateEmployeeDropdowns();
      renderAll();
      showToast(`✅ Đã tải và lưu dữ liệu từ file "${file.name}"`);
    } catch (err) {
      console.error(err);
      showToast('❌ Lỗi đọc file Excel. Vui lòng kiểm tra định dạng file.');
    }
  };
  reader.readAsArrayBuffer(file);
}

function findSheetByKeyword(workbook, keywords) {
  const names = workbook.SheetNames;
  for (const kw of keywords) {
    const exact = names.find(n => normalizeStr(n) === normalizeStr(kw));
    if (exact) return workbook.Sheets[exact];
  }
  for (const kw of keywords) {
    const partial = names.find(n => normalizeStr(n).includes(normalizeStr(kw)));
    if (partial) return workbook.Sheets[partial];
  }
  return null;
}

function parseWorkbook(workbook, fileName) {
  appState.fileName = fileName;
  appState.uploadedAt = new Date().toLocaleString('vi-VN');
  document.getElementById('lastUpdatedText').textContent =
    `📂 File hiện tại: ${appState.fileName} (Tải lên lúc ${appState.uploadedAt})`;

  const sheetTongHop = findSheetByKeyword(workbook, ['Tổng Hợp', 'Tong Hop', 'KPI']);
  appState.kpiSummary = parseKpiSummarySheet(sheetTongHop);

  const sheetTongThe = findSheetByKeyword(workbook, ['Tổng Thể', 'Tong The', 'Tổng hợp']);
  appState.tatService = parseTatServiceSheet(sheetTongThe || sheetTongHop);

  const sheetGcsm = findSheetByKeyword(workbook, ['GCSM SO', 'GCSM']);
  const sheetCenter = findSheetByKeyword(workbook, ['Center SO', 'Center']);

  const gcsmOrders = parseSalesSheet(sheetGcsm, 'GCSM SO');
  const centerOrders = parseSalesSheet(sheetCenter, 'Center SO');
  appState.orders = [...gcsmOrders, ...centerOrders];
}

function parseKpiSummarySheet(ws) {
  if (!ws) return [];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
  const results = [];
  let inKpiBlock = false;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].map(c => String(c).trim());
    const joined = row.join(' ').toLowerCase();

    if (joined.includes('bảng báo cáo kpi') || joined.includes('kpi报表') || joined.includes('hạng mục') || joined.includes('chỉ tiêu')) {
      inKpiBlock = true;
      continue;
    }

    if (inKpiBlock) {
      const nonEmpty = row.filter(v => v !== '');
      if (nonEmpty.length === 0) {
        if (results.length > 3) break;
        continue;
      }
      if (joined.includes('stt') && (joined.includes('target') || joined.includes('mục tiêu'))) continue;

      let name = '';
      const nums = [];
      row.forEach((cell, idx) => {
        if (!cell) return;
        if (idx === 0 && /^\d+$/.test(cell)) return;
        const numVal = parseNumber(cell);
        if (!isNaN(numVal) && cell.replace(/[.,%\s₫đ\-]/g, '').length > 0 && /[0-9]/.test(cell) && cell.length < 20) {
          nums.push({ raw: cell, val: numVal, isPercent: cell.includes('%') });
        } else if (cell.length > name.length) {
          name = cell;
        }
      });

      if (name && nums.length >= 1) {
        const targetObj = nums[0];
        const actualObj = nums.length >= 2 ? nums[1] : { val: 0, isPercent: targetObj.isPercent };
        const rateObj = nums.length >= 3 ? nums[2] : null;

        results.push({
          key: `kpi_${results.length}_${normalizeStr(name).slice(0, 20)}`,
          name,
          excelTarget: targetObj.val,
          actual: actualObj.val,
          isPercent: targetObj.isPercent || actualObj.isPercent,
          rawRate: rateObj ? rateObj.raw : ''
        });
      }
    }
  }
  return results;
}

function parseTatServiceSheet(ws) {
  if (!ws) return [];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
  const results = [];
  let startIdx = -1;

  for (let i = 0; i < rows.length; i++) {
    const line = rows[i].join(' ').toLowerCase();
    if (line.includes('đánh giá kpi service') || line.includes('kpi service 2025') || line.includes('tat')) {
      startIdx = i + 1;
      break;
    }
  }

  if (startIdx === -1) startIdx = 0;

  for (let i = startIdx; i < rows.length; i++) {
    const row = rows[i].map(c => String(c).trim());
    const nonEmpty = row.filter(v => v !== '');
    if (nonEmpty.length === 0) {
      if (results.length >= 3) break;
      continue;
    }
    const lineLower = nonEmpty.join(' ').toLowerCase();
    if (lineLower.includes('stt') || lineLower.includes('chỉ tiêu') || lineLower.includes('hạng mục')) continue;

    let metricName = '';
    const numbers = [];

    row.forEach((cell, idx) => {
      if (!cell) return;
      if (idx === 0 && /^\d+$/.test(cell)) return;
      const n = parseNumber(cell);
      if (!isNaN(n) && /[0-9]/.test(cell) && cell.length < 18) {
        numbers.push({ raw: cell, val: n, isPercent: cell.includes('%') });
      } else if (cell.length > metricName.length) {
        metricName = cell;
      }
    });

    if (metricName && numbers.length >= 1) {
      results.push({
        name: metricName,
        targetRaw: numbers[0].raw,
        targetVal: numbers[0].val,
        actualRaw: numbers[1] ? numbers[1].raw : numbers[0].raw,
        actualVal: numbers[1] ? numbers[1].val : numbers[0].val,
        noteRaw: numbers[2] ? numbers[2].raw : ''
      });
    }
  }
  return results;
}

function parseSalesSheet(ws, sourceLabel) {
  if (!ws) return [];
  const rawRows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
  if (rawRows.length < 2) return [];

  let headerIdx = 0;
  for (let i = 0; i < Math.min(15, rawRows.length); i++) {
    const rowStr = rawRows[i].join(' ').toLowerCase();
    if (
      rowStr.includes('nhân viên') || rowStr.includes('tư vấn') || rowStr.includes('sales') ||
      rowStr.includes('mã đơn') || rowStr.includes('sản phẩm') || rowStr.includes('model') ||
      rowStr.includes('thành tiền') || rowStr.includes('doanh thu')
    ) {
      headerIdx = i;
      break;
    }
  }

  const headers = rawRows[headerIdx].map(h => normalizeStr(String(h)));

  const colStaff = findColIndex(headers, [
    'ten nhan vien', 'nhan vien ban', 'nhan vien', 'nguoi tao', 'tu van vien',
    'salesman', 'staff', 'employee', 'nvbh', 'ky thuat vien', 'ktv'
  ]);
  const colOrderCode = findColIndex(headers, [
    'ma don', 'so phieu', 'ma phieu', 'order', 'ticket', 'so hd', 'so hoa don', 'ma giao dich', 'so chung tu'
  ]);
  const colDate = findColIndex(headers, ['ngay', 'date', 'thoi gian', 'created']);
  const colProduct = findColIndex(headers, [
    'ten san pham', 'san pham', 'model', 'ten hang', 'mat hang', 'dich vu', 'item', 'product', 'sku'
  ]);
  const colQty = findColIndex(headers, ['so luong', 'sl', 'qty', 'quantity']);
  const colAmount = findColIndex(headers, [
    'thanh tien', 'doanh thu', 'doanh so', 'tong tien', 'gia tri', 'amount', 'total', 'thuc thu'
  ]);

  const parsed = [];
  for (let r = headerIdx + 1; r < rawRows.length; r++) {
    const row = rawRows[r];
    if (!row || row.every(c => String(c).trim() === '')) continue;

    const firstCell = normalizeStr(String(row[0] || ''));
    if (firstCell.startsWith('tong') || firstCell.startsWith('total')) continue;

    let staffName = colStaff !== -1 ? String(row[colStaff] || '').trim() : '';
    staffName = staffName.replace(/\s+/g, ' ').trim();
    if (!staffName || staffName === '0' || staffName.toLowerCase() === 'null') {
      staffName = 'Chưa gán nhân viên';
    }

    const orderCode = colOrderCode !== -1 ? String(row[colOrderCode] || '').trim() : `ROW-${r + 1}`;
    const dateVal = colDate !== -1 ? formatExcelDate(row[colDate]) : '';
    const productName = colProduct !== -1 ? String(row[colProduct] || '').trim() : 'Sản phẩm / Dịch vụ';
    const qty = colQty !== -1 ? (parseNumber(row[colQty]) || 1) : 1;
    const amount = colAmount !== -1 ? (parseNumber(row[colAmount]) || 0) : 0;

    if (!productName && amount === 0) continue;

    parsed.push({
      source: sourceLabel,
      orderCode: orderCode || `${sourceLabel}-${r}`,
      date: dateVal,
      staff: staffName,
      product: productName || 'Không xác định',
      qty,
      amount
    });
  }
  return parsed;
}

function findColIndex(headers, candidates) {
  for (const cand of candidates) {
    const exact = headers.findIndex(h => h === cand);
    if (exact !== -1) return exact;
  }
  for (const cand of candidates) {
    const partial = headers.findIndex(h => h.includes(cand));
    if (partial !== -1) return partial;
  }
  return -1;
}

function renderAll() {
  renderOverviewTab();
  renderStaffAndProducts();
  renderOrdersTable();
  renderTatTab();
  renderTargetEditTab();
}

function getEffectiveTarget(item) {
  if (customTargets && customTargets[item.key] !== undefined && !isNaN(customTargets[item.key])) {
    return customTargets[item.key];
  }
  return item.excelTarget;
}

function renderOverviewTab() {
  const totalSales = appState.orders.reduce((s, o) => s + o.amount, 0);
  const gcsmSales = appState.orders.filter(o => o.source === 'GCSM SO').reduce((s, o) => s + o.amount, 0);
  const centerSales = appState.orders.filter(o => o.source === 'Center SO').reduce((s, o) => s + o.amount, 0);
  const totalOrders = appState.orders.length;

  document.getElementById('overviewCards').innerHTML = `
    <div class="stat-card">
      <div class="stat-label">Tổng Doanh Số (GCSM + Center)</div>
      <div class="stat-value">${formatCurrency(totalSales)}</div>
      <div class="stat-sub">${totalOrders.toLocaleString('vi-VN')} đơn hàng / phiếu</div>
    </div>
    <div class="stat-card blue">
      <div class="stat-label">Doanh Số GCSM SO</div>
      <div class="stat-value">${formatCurrency(gcsmSales)}</div>
      <div class="stat-sub">${totalSales ? ((gcsmSales / totalSales) * 100).toFixed(1) : 0}% tổng doanh thu</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Doanh Số Center SO</div>
      <div class="stat-value">${formatCurrency(centerSales)}</div>
      <div class="stat-sub">${totalSales ? ((centerSales / totalSales) * 100).toFixed(1) : 0}% tổng doanh thu</div>
    </div>
    <div class="stat-card amber">
      <div class="stat-label">Số Chỉ Tiêu KPI Đang Theo Dõi</div>
      <div class="stat-value">${appState.kpiSummary.length} hạng mục</div>
      <div class="stat-sub">Từ Sheet Tổng Hợp</div>
    </div>
  `;

  const tbody = document.querySelector('#kpiSummaryTable tbody');
  if (!appState.kpiSummary.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="empty-state">Chưa tìm thấy dữ liệu Bảng báo cáo KPI / KPI报表 trong file</td></tr>`;
  } else {
    tbody.innerHTML = appState.kpiSummary.map((item, idx) => {
      const target = getEffectiveTarget(item);
      const pct = target > 0 ? (item.actual / target) * 100 : 0;
      const badgeClass = pct >= 100 ? 'pill-good' : (pct >= 80 ? 'pill-warn' : 'pill-bad');
      const fmt = item.isPercent ? (v => `${v}%`) : formatNumber;

      return `
        <tr>
          <td>${idx + 1}</td>
          <td><strong>${escapeHtml(item.name)}</strong></td>
          <td class="num">${fmt(target)}</td>
          <td class="num"><strong>${fmt(item.actual)}</strong></td>
          <td class="num"><span class="status-pill ${badgeClass}">${pct.toFixed(1)}%</span></td>
          <td>${item.rawRate || (pct >= 100 ? 'Đạt chuẩn' : 'Cần đẩy mạnh')}</td>
        </tr>
      `;
    }).join('');
  }

  renderOverviewCharts(gcsmSales, centerSales);
}

function renderOverviewCharts(gcsmSales, centerSales) {
  const ctxBar = document.getElementById('chartOverviewBar');
  if (charts.overviewBar) charts.overviewBar.destroy();

  const labels = appState.kpiSummary.slice(0, 10).map(i => i.name.slice(0, 22));
  const dataPct = appState.kpiSummary.slice(0, 10).map(i => {
    const t = getEffectiveTarget(i);
    return t > 0 ? Number(((i.actual / t) * 100).toFixed(1)) : 0;
  });

  charts.overviewBar = new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: '% Hoàn thành Target',
        data: dataPct,
        backgroundColor: dataPct.map(v => v >= 100 ? '#008a4b' : '#3b82f6'),
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true } }
    }
  });

  const ctxDoughnut = document.getElementById('chartChannelDoughnut');
  if (charts.channelDoughnut) charts.channelDoughnut.destroy();

  charts.channelDoughnut = new Chart(ctxDoughnut, {
    type: 'doughnut',
    data: {
      labels: ['GCSM SO', 'Center SO'],
      datasets: [{
        data: [gcsmSales, centerSales],
        backgroundColor: ['#2563eb', '#008a4b'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

function populateEmployeeDropdowns() {
  const uniqueStaff = [...new Set(appState.orders.map(o => o.staff))].sort((a, b) => a.localeCompare(b, 'vi'));
  const optionsHtml = `<option value="ALL">Tất cả nhân viên (${uniqueStaff.length})</option>` +
    uniqueStaff.map(name => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join('');

  document.getElementById('filterEmployeeName').innerHTML = optionsHtml;
  document.getElementById('filterOrderStaff').innerHTML = optionsHtml;
}

function renderStaffAndProducts() {
  const sourceFilter = document.getElementById('filterSourceStaff').value;
  const staffFilter = document.getElementById('filterEmployeeName').value;
  const prodQuery = normalizeStr(document.getElementById('searchProductInput').value);

  const filteredOrders = appState.orders.filter(o => {
    if (sourceFilter !== 'ALL' && o.source !== sourceFilter) return false;
    if (staffFilter !== 'ALL' && o.staff !== staffFilter) return false;
    return true;
  });

  const staffMap = {};
  let totalFilteredSales = 0;

  filteredOrders.forEach(o => {
    totalFilteredSales += o.amount;
    if (!staffMap[o.staff]) {
      staffMap[o.staff] = { staff: o.staff, count: 0, qty: 0, amount: 0 };
    }
    staffMap[o.staff].count += 1;
    staffMap[o.staff].qty += o.qty;
    staffMap[o.staff].amount += o.amount;
  });

  const staffList = Object.values(staffMap).sort((a, b) => b.amount - a.amount);
  const staffTbody = document.querySelector('#staffContributionTable tbody');

  if (!staffList.length) {
    staffTbody.innerHTML = `<tr><td colspan="6" class="empty-state">Không có dữ liệu nhân sự phù hợp</td></tr>`;
  } else {
    staffTbody.innerHTML = staffList.map((s, idx) => {
      const share = totalFilteredSales > 0 ? ((s.amount / totalFilteredSales) * 100).toFixed(1) : '0.0';
      const medal = idx === 0 ? '🥇' : (idx === 1 ? '🥈' : (idx === 2 ? '🥉' : `#${idx + 1}`));
      return `
        <tr>
          <td><strong>${medal}</strong></td>
          <td><strong>${escapeHtml(s.staff)}</strong></td>
          <td class="num">${s.count.toLocaleString('vi-VN')}</td>
          <td class="num">${s.qty.toLocaleString('vi-VN')}</td>
          <td class="num"><strong>${formatCurrency(s.amount)}</strong></td>
          <td class="num"><span class="badge-info">${share}%</span></td>
        </tr>
      `;
    }).join('');
  }

  const ctxStaff = document.getElementById('chartStaffSales');
  if (charts.staffSales) charts.staffSales.destroy();
  charts.staffSales = new Chart(ctxStaff, {
    type: 'bar',
    data: {
      labels: staffList.map(s => s.staff),
      datasets: [{
        label: 'Doanh số đóng góp (VNĐ)',
        data: staffList.map(s => s.amount),
        backgroundColor: '#008a4b',
        borderRadius: 6
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false
    }
  });

  const prodMap = {};
  filteredOrders.forEach(o => {
    if (prodQuery && !normalizeStr(o.product).includes(prodQuery)) return;
    const key = `${o.product}__${o.source}__${o.staff}`;
    if (!prodMap[key]) {
      prodMap[key] = {
        product: o.product,
        source: o.source,
        staff: o.staff,
        qty: 0,
        amount: 0
      };
    }
    prodMap[key].qty += o.qty;
    prodMap[key].amount += o.amount;
  });

  const prodList = Object.values(prodMap).sort((a, b) => b.amount - a.amount);
  const prodTbody = document.querySelector('#productBreakdownTable tbody');

  if (!prodList.length) {
    prodTbody.innerHTML = `<tr><td colspan="6" class="empty-state">Không có dữ liệu sản phẩm phù hợp</td></tr>`;
  } else {
    prodTbody.innerHTML = prodList.map((p, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>${escapeHtml(p.product)}</strong></td>
        <td><span class="badge-sheet ${p.source === 'GCSM SO' ? 'badge-gcsm' : 'badge-center'}">${p.source}</span></td>
        <td>${escapeHtml(p.staff)}</td>
        <td class="num">${p.qty.toLocaleString('vi-VN')}</td>
        <td class="num"><strong>${formatCurrency(p.amount)}</strong></td>
      </tr>
    `).join('');
  }
}

function renderOrdersTable() {
  const sheetVal = document.getElementById('filterOrderSheet').value;
  const staffVal = document.getElementById('filterOrderStaff').value;
  const query = normalizeStr(document.getElementById('searchOrderInput').value);

  const list = appState.orders.filter(o => {
    if (sheetVal !== 'ALL' && o.source !== sheetVal) return false;
    if (staffVal !== 'ALL' && o.staff !== staffVal) return false;
    if (query) {
      const hay = normalizeStr(`${o.orderCode} ${o.staff} ${o.product} ${o.date}`);
      if (!hay.includes(query)) return false;
    }
    return true;
  });

  const sumAmount = list.reduce((s, o) => s + o.amount, 0);
  document.getElementById('orderSummaryStrip').textContent =
    `Hiển thị ${list.length.toLocaleString('vi-VN')} đơn hàng / phiếu giao dịch — Tổng giá trị: ${formatCurrency(sumAmount)}`;

  const tbody = document.querySelector('#ordersDetailTable tbody');
  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="empty-state">Không tìm thấy đơn hàng / phiếu giao dịch nào</td></tr>`;
    return;
  }

  tbody.innerHTML = list.slice(0, 500).map(o => `
    <tr>
      <td><span class="badge-sheet ${o.source === 'GCSM SO' ? 'badge-gcsm' : 'badge-center'}">${o.source}</span></td>
      <td><strong>${escapeHtml(o.orderCode)}</strong></td>
      <td>${escapeHtml(o.date)}</td>
      <td><strong>${escapeHtml(o.staff)}</strong></td>
      <td>${escapeHtml(o.product)}</td>
      <td class="num">${o.qty.toLocaleString('vi-VN')}</td>
      <td class="num"><strong>${formatCurrency(o.amount)}</strong></td>
    </tr>
  `).join('');
}

function renderTatTab() {
  const cardsContainer = document.getElementById('tatHighlightCards');
  const tbody = document.querySelector('#tatServiceTable tbody');

  if (!appState.tatService.length) {
    cardsContainer.innerHTML = '';
    tbody.innerHTML = `<tr><td colspan="6" class="empty-state">Chưa có dữ liệu mục ĐÁNH GIÁ KPI SERVICE 2025</td></tr>`;
    return;
  }

  cardsContainer.innerHTML = appState.tatService.slice(0, 4).map(item => `
    <div class="stat-card blue">
      <div class="stat-label">${escapeHtml(item.name)}</div>
      <div class="stat-value">${escapeHtml(item.actualRaw)}</div>
      <div class="stat-sub">Target / Chuẩn: ${escapeHtml(item.targetRaw)}</div>
    </div>
  `).join('');

  tbody.innerHTML = appState.tatService.map((item, idx) => {
    const diff = item.actualVal - item.targetVal;
    const isGood = item.actualVal >= item.targetVal;
    return `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>${escapeHtml(item.name)}</strong></td>
        <td class="num">${escapeHtml(item.targetRaw)}</td>
        <td class="num"><strong>${escapeHtml(item.actualRaw)}</strong></td>
        <td class="num">${diff >= 0 ? '+' : ''}${diff.toFixed(2)}</td>
        <td><span class="status-pill ${isGood ? 'pill-good' : 'pill-warn'}">${item.noteRaw || (isGood ? 'Đạt' : 'Theo dõi')}</span></td>
      </tr>
    `;
  }).join('');

  const ctxTat = document.getElementById('chartTatComparison');
  if (charts.tatChart) charts.tatChart.destroy();
  charts.tatChart = new Chart(ctxTat, {
    type: 'bar',
    data: {
      labels: appState.tatService.map(i => i.name.slice(0, 26)),
      datasets: [
        {
          label: 'Target / Chuẩn',
          data: appState.tatService.map(i => i.targetVal),
          backgroundColor: '#94a3b8',
          borderRadius: 5
        },
        {
          label: 'Thực Tế Đạt',
          data: appState.tatService.map(i => i.actualVal),
          backgroundColor: '#008a4b',
          borderRadius: 5
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

function renderTargetEditTab() {
  const tbody = document.querySelector('#targetEditTable tbody');
  if (!appState.kpiSummary.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="empty-state">Tải file Excel để hiển thị danh sách Target</td></tr>`;
    return;
  }

  tbody.innerHTML = appState.kpiSummary.map((item, idx) => {
    const currentTarget = getEffectiveTarget(item);
    const pct = currentTarget > 0 ? ((item.actual / currentTarget) * 100).toFixed(1) : '0.0';
    return `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>${escapeHtml(item.name)}</strong></td>
        <td class="num">${formatNumber(item.excelTarget)}</td>
        <td class="num">
          <input type="number" step="any" class="target-input" data-key="${item.key}" value="${currentTarget}" />
        </td>
        <td class="num">${formatNumber(item.actual)}</td>
        <td class="num"><span class="badge-info">${pct}%</span></td>
      </tr>
    `;
  }).join('');
}

function normalizeStr(str) {
  return String(str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

function parseNumber(val) {
  if (typeof val === 'number') return val;
  if (!val) return NaN;
  const cleaned = String(val).replace(/[^0-9.\-]/g, '');
  return cleaned ? parseFloat(cleaned) : NaN;
}

function formatCurrency(num) {
  return Math.round(num || 0).toLocaleString('vi-VN') + ' ₫';
}

function formatNumber(num) {
  if (num === null || num === undefined || isNaN(num)) return '0';
  return Number(num).toLocaleString('vi-VN');
}

function formatExcelDate(val) {
  if (!val) return '';
  if (typeof val === 'number') {
    const d = new Date(Math.round((val - 25569) * 86400 * 1000));
    return d.toLocaleDateString('vi-VN');
  }
  return String(val).trim();
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3200);
}
