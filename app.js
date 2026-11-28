const DEFAULT_DATA = {
  shopName: "OPPO Experience & Service Store Tiền Giang",
  scCode: "VN001034",
  lastUpdated: "2026-KPI NEW 5.3.8-TECH-T11 - NEW.xlsx (27/11/2026)",
  sales: [
    { category: "PHONE", target: 68, actual: 101 },
    { category: "TAI NGHE", target: 6, actual: 10 },
    { category: "PAD", target: 4, actual: 0 },
    { category: "ỐP LƯNG", target: 9, actual: 12 },
    { category: "Oppo Care", target: 20, actual: 24 },
    { category: "MDCL", target: 64, actual: 54 },
    { category: "Sạc dự phòng", target: 6, actual: 10 },
    { category: "WATCH", target: 8, actual: 0 }
  ],
  service: {
    volumeTotal: 446,
    afterSale: 190,
    customerRel: 86,
    saleOrder: 161,
    simpleService: 9,
    cancelCount: 19,
    cancelRate: 4.26,
    tat1hRate: 99.44,
    npsRate: 17.86,
    klCount: 150,
    dlCount: 100,
    filmTotal: 161,
    filmRate: 36.1
  },
  // Yêu cầu 4: Tập trung đúng 2 nhân viên kỹ thuật từ sheet KPI-KT & Tổng hợp
  technicians: [
    { name: "PHAN CHÍ TRUNG", code: "D70979015", repairNormal: 183, addonNormal: 45.5, soNormal: 70, soFindN: 4, newVol: 302.5, tat1h: "98.63%" },
    { name: "ĐOÀN MINH HÙNG", code: "D24248811", repairNormal: 6, addonNormal: 1.5, soNormal: 7, soFindN: 0, newVol: 14.5, tat1h: "100%" }
  ],
  // Yêu cầu 5: Đánh giá Đóng Góp Doanh Số & Điểm Bán Hàng Theo Nhân Sự (Center SO + GCSM SO)
  staffContributions: [
    { name: "ĐOÀN MINH HÙNG", role: "KTV / Lên đơn Brandshop", code: "D24248811", devicePts: 63, accPts: 22, carePts: 12, targetPts: 80 },
    { name: "PHAN CHÍ TRUNG", role: "Kỹ thuật viên (GCSM SO)", code: "D70979015", devicePts: 0, accPts: 2, carePts: 56, targetPts: 55 },
    { name: "HUỲNH HỒNG HUỆ", role: "Tư vấn bán hàng (SALE)", code: "D48955416", devicePts: 38, accPts: 8, carePts: 4, targetPts: 50 }
  ],
  // Yêu cầu 3: Chi tiết doanh số sản phẩm tổng hợp từ Center SO & GCSM SO
  productDetails: [
    { sku: "CPH2859", name: "OPPO Reno16 F 5G 8GB+256GB", category: "PHONE", qty: 6, pointRate: 5.0, revenue: 78090000 },
    { sku: "CPH-R15P", name: "OPPO Reno15 Pro 5G 12GB+256GB", category: "PHONE", qty: 2, pointRate: 8.0, revenue: 28280000 },
    { sku: "CPH-R16", name: "OPPO Reno16 5G 8GB+256GB", category: "PHONE", qty: 2, pointRate: 5.0, revenue: 32480000 },
    { sku: "CPH2913", name: "OPPO Find X10 Pro Max 16GB+512GB", category: "PHONE", qty: 1, pointRate: 9.0, revenue: 43690000 },
    { sku: "CPH-FX9S", name: "OPPO Find X9s 12GB+256GB / 512GB", category: "PHONE", qty: 2, pointRate: 7.0, revenue: 20990000 },
    { sku: "CPH-R15", name: "OPPO Reno15 5G (8GB/12GB+256GB)", category: "PHONE", qty: 2, pointRate: 8.0, revenue: 26530000 },
    { sku: "CPH-A6", name: "OPPO A6 Pro / A6x / A6t Series", category: "PHONE", qty: 4, pointRate: 2.25, revenue: 8690000 },
    { sku: "YYA003", name: "Find X10 Pro Max Hasselblad Teleconverter Kit", category: "PHONE", qty: 1, pointRate: 5.0, revenue: 6990000 },
    { sku: "IOT-AUDIO", name: "Tai nghe OPPO Enco Buds3 / Air 3 / Buds 2", category: "TAI NGHE", qty: 5, pointRate: 2.0, revenue: 2700000 },
    { sku: "CASE-OP", name: "Ốp lưng từ tính ROCK / RORO JUMP OPPO", category: "ỐP LƯNG", qty: 4, pointRate: 3.0, revenue: 748000 },
    { sku: "OCARE-1Y", name: "Gói Extended Warranty / Screen Protection 1 Năm", category: "Oppo Care", qty: 6, pointRate: 4.0, revenue: 1846000 },
    { sku: "MDCL-KD", name: "Miếng dán cường lực Kudun / Find X8 / Reno16F", category: "MDCL", qty: 54, pointRate: 1.0, revenue: 6930000 },
    { sku: "SDP-VOOC", name: "Sạc dự phòng SDP AS-182-45 / FP-110 / JB-200", category: "Sạc dự phòng", qty: 5, pointRate: 2.0, revenue: 3116800 }
  ],
  // Yêu cầu 2: Chi tiết đơn hàng từ Center SO & GCSM SO
  orderDetails: [
    { id: "72026112510183295711", time: "25/11/2026 10:18", type: "Center SO - Xuất bán", product: "Reno15 Pro 5G 12GB+256GB (+ Tặng Enco Buds3)", staff: "ĐOÀN MINH HÙNG", points: 10, amount: 13890000, status: "Hoàn thành" },
    { id: "72026112315435141171", time: "23/11/2026 15:43", type: "Center SO - Xuất bán", product: "A6 Pro 5G 8GB+256GB (+ Tặng Enco Buds3)", staff: "HUỲNH HỒNG HUỆ", points: 5, amount: 8690000, status: "Hoàn thành" },
    { id: "VN001034-SO2611230004", time: "23/11/2026 17:01", type: "GCSM SO - Warranty", product: "Extended Warranty Plan - One Year", staff: "HUỲNH HỒNG HUỆ", points: 4, amount: 149000, status: "Hoàn thành" },
    { id: "VN001034-SO2611230001", time: "23/11/2026 08:43", type: "GCSM SO - Phụ kiện", product: "Sạc dự phòng SDP AS-182-45 Bạc", staff: "HUỲNH HỒNG HUỆ", points: 2, amount: 719200, status: "Hoàn thành" },
    { id: "72026112115353333151", time: "21/11/2026 15:35", type: "Center SO - Xuất bán", product: "Reno16 F 5G 8GB+256GB (+ Tặng Enco Buds3)", staff: "ĐOÀN MINH HÙNG", points: 7, amount: 11990000, status: "Hoàn thành" },
    { id: "72026111912304805961", time: "19/11/2026 12:30", type: "Center SO - Phụ kiện", product: "MDCL Reno16F_K23 + Ốp lưng RORO JUMP", staff: "ĐOÀN MINH HÙNG", points: 4, amount: 499000, status: "Hoàn thành" },
    { id: "VN001034-SO2611160006", time: "16/11/2026 15:19", type: "GCSM SO - Warranty", product: "Extended Warranty Plan - One Year", staff: "PHAN CHÍ TRUNG", points: 4, amount: 350000, status: "Hoàn thành" },
    { id: "72026111316054236901", time: "13/11/2026 16:05", type: "Center SO - Xuất bán", product: "Find X9s 12GB+256GB", staff: "HUỲNH HỒNG HUỆ", points: 7, amount: 20990000, status: "Hoàn thành" },
    { id: "72026110710153042761", time: "07/11/2026 10:15", type: "Center SO - Xuất bán", product: "Find X10 Pro Max 16GB+512GB + Teleconverter Kit", staff: "ĐOÀN MINH HÙNG", points: 14, amount: 50680000, status: "Hoàn thành" },
    { id: "VN001034-SO2611050002", time: "05/11/2026 10:57", type: "GCSM SO - Warranty", product: "Extended Warranty Plan - One Year", staff: "PHAN CHÍ TRUNG", points: 4, amount: 450000, status: "Hoàn thành" }
  ]
};

const STORAGE_KEY = "oppo_tg_dashboard_state_v3";
let appState = loadState();
let salesChartInstance = null;
let serviceMixChartInstance = null;

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && Array.isArray(parsed.sales)) return parsed;
    }
  } catch (e) {
    console.warn("Không đọc được LocalStorage:", e);
  }
  return structuredClone(DEFAULT_DATA);
}

// Lưu trạng thái hiện tại (dữ liệu upload hoặc Target điều chỉnh) theo lần cập nhật cuối cùng
function saveState(customTimestampLabel = null) {
  const now = new Date();
  const timeStr = `${now.toLocaleTimeString("vi-VN")} - ${now.toLocaleDateString("vi-VN")}`;
  if (customTimestampLabel) {
    appState.lastUpdated = `${customTimestampLabel} (Cập nhật lúc ${timeStr})`;
  } else if (!appState.lastUpdated.includes("Cập nhật lúc")) {
    appState.lastUpdated = `${appState.lastUpdated} (Lưu lúc ${timeStr})`;
  } else {
    appState.lastUpdated = appState.lastUpdated.replace(/\(Cập nhật lúc.*\)|\(Lưu lúc.*\)/, `(Cập nhật lúc ${timeStr})`);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

function formatVND(val) {
  return Number(val || 0).toLocaleString("vi-VN") + " đ";
}

function cleanStaffName(raw) {
  if (!raw) return "Khác";
  return String(raw).replace(/（.*?）|\(.*?\)/g, "").trim().toUpperCase();
}

function renderDashboard() {
  document.getElementById("shopTitle").textContent = appState.shopName;
  document.getElementById("scCode").textContent = appState.scCode;
  document.getElementById("lastUpdated").textContent = appState.lastUpdated;

  const totalTarget = appState.sales.reduce((sum, item) => sum + Number(item.target || 0), 0);
  const totalActual = appState.sales.reduce((sum, item) => sum + Number(item.actual || 0), 0);
  const pctTotal = totalTarget > 0 ? ((totalActual / totalTarget) * 100).toFixed(1) : 0;
  const diffTotal = totalActual - totalTarget;

  document.getElementById("valTotalScore").textContent = totalActual;
  document.getElementById("tgtTotalScore").textContent = totalTarget;
  document.getElementById("badgeTotalScore").textContent = `${pctTotal}%`;
  document.getElementById("barTotalScore").style.width = `${Math.min(pctTotal, 100)}%`;
  document.getElementById("diffTotalScore").textContent = diffTotal >= 0 ? `+${diffTotal}` : diffTotal;

  const s = appState.service;
  document.getElementById("valTotalTickets").textContent = s.volumeTotal;
  document.getElementById("lblChartTickets").textContent = s.volumeTotal;
  document.getElementById("valTat1h").textContent = `${s.tat1hRate}%`;
  document.getElementById("valNps").textContent = `${s.npsRate}%`;
  document.getElementById("valCancelRate").textContent = `${s.cancelRate}%`;
  document.getElementById("valKL").textContent = `${s.klCount} (${((s.klCount / (s.klCount + s.dlCount || 1)) * 100).toFixed(0)}%)`;
  document.getElementById("valDL").textContent = `${s.dlCount} (${((s.dlCount / (s.klCount + s.dlCount || 1)) * 100).toFixed(0)}%)`;
  document.getElementById("valFilm").textContent = `${s.filmTotal} phiếu (${s.filmRate}%)`;

  renderSalesTable();
  renderTechTable();
  renderStaffContributionTable();
  populateProductFilter();
  renderProductDetailTable();
  renderOrderDetailTable();
  renderCharts();
}

function renderSalesTable() {
  const tbody = document.querySelector("#salesTable tbody");
  tbody.innerHTML = "";
  let achievedCount = 0;

  appState.sales.forEach(item => {
    const pct = item.target > 0 ? (item.actual / item.target) * 100 : (item.actual > 0 ? 100 : 0);
    const diff = item.actual - item.target;
    if (pct >= 100) achievedCount++;

    let statusHtml = `<span class="badge">Đạt (${pct.toFixed(0)}%)</span>`;
    if (pct >= 120) statusHtml = `<span class="badge">Vượt trội</span>`;
    else if (pct >= 80 && pct < 100) statusHtml = `<span class="badge badge-warn">Cận đích</span>`;
    else if (pct < 80) statusHtml = `<span class="badge badge-danger">Cần đẩy mạnh</span>`;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${item.category}</strong></td>
      <td class="num">${item.target}</td>
      <td class="num"><strong>${item.actual}</strong></td>
      <td class="num" style="color:${diff >= 0 ? '#10b981' : '#ef4444'}">${diff >= 0 ? '+' + diff : diff}</td>
      <td class="num">${pct.toFixed(1)}%</td>
      <td>${statusHtml}</td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById("salesSummaryText").textContent = `${achievedCount}/${appState.sales.length} nhóm đạt & vượt Target`;
}

// Yêu cầu 4: Chỉ tập trung vào 2 nhân viên kỹ thuật chính
function renderTechTable() {
  const tbody = document.querySelector("#techTable tbody");
  tbody.innerHTML = "";
  appState.technicians.slice(0, 2).forEach(t => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${t.name}</strong></td>
      <td><code>${t.code}</code></td>
      <td class="num">${t.repairNormal}</td>
      <td class="num">${t.addonNormal}</td>
      <td class="num">${t.soNormal + t.soFindN}</td>
      <td class="num"><strong style="color:#10b981">${t.newVol}</strong></td>
      <td class="num">${t.tat1h}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Yêu cầu 5: Đánh giá Đóng Góp Doanh Số & Điểm Bán Hàng Theo Nhân Sự
function renderStaffContributionTable() {
  const tbody = document.querySelector("#staffContributionTable tbody");
  tbody.innerHTML = "";

  const staffList = appState.staffContributions.map(st => {
    const total = Number(st.devicePts || 0) + Number(st.accPts || 0) + Number(st.carePts || 0);
    return { ...st, total };
  });

  const grandTotal = staffList.reduce((acc, s) => acc + s.total, 0);
  document.getElementById("staffTotalBadge").textContent = `Tổng điểm nhân sự ghi nhận: ${grandTotal} điểm`;

  staffList.forEach(st => {
    const sharePct = grandTotal > 0 ? ((st.total / grandTotal) * 100).toFixed(1) : 0;
    const kpiPct = st.targetPts > 0 ? ((st.total / st.targetPts) * 100).toFixed(0) : 100;

    let ratingBadge = `<span class="badge">Hoàn thành (${kpiPct}% KPI)</span>`;
    if (kpiPct >= 115) ratingBadge = `<span class="badge">Xuất sắc (${kpiPct}% KPI)</span>`;
    else if (kpiPct < 90) ratingBadge = `<span class="badge badge-warn">Cần bám sát (${kpiPct}% KPI)</span>`;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${st.name}</strong></td>
      <td>${st.role} <br><small style="color:var(--text-muted)">${st.code}</small></td>
      <td class="num">${st.devicePts}</td>
      <td class="num">${st.accPts}</td>
      <td class="num">${st.carePts}</td>
      <td class="num"><strong style="color:#10b981;font-size:0.95rem">${st.total}</strong></td>
      <td class="num">
        <div class="contrib-bar-wrap">
          <span>${sharePct}%</span>
          <div class="contrib-bar"><div class="contrib-bar-fill" style="width:${sharePct}%"></div></div>
        </div>
      </td>
      <td>${ratingBadge}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Yêu cầu 3: Chi tiết doanh số sản phẩm
function populateProductFilter() {
  const select = document.getElementById("filterProductCat");
  const currentVal = select.value;
  const cats = [...new Set(appState.productDetails.map(p => p.category))];
  select.innerHTML = `<option value="ALL">Tất cả nhóm hàng (${cats.length})</option>`;
  cats.forEach(c => {
    select.innerHTML += `<option value="${c}">${c}</option>`;
  });
  if (cats.includes(currentVal)) select.value = currentVal;
}

function renderProductDetailTable() {
  const tbody = document.querySelector("#productDetailTable tbody");
  const filterCat = document.getElementById("filterProductCat").value;
  tbody.innerHTML = "";

  const filtered = filterCat === "ALL"
    ? appState.productDetails
    : appState.productDetails.filter(p => p.category === filterCat);

  let sumQty = 0, sumPts = 0, sumRev = 0;

  filtered.forEach(p => {
    const pts = Number((p.qty * p.pointRate).toFixed(1));
    sumQty += Number(p.qty);
    sumPts += pts;
    sumRev += Number(p.revenue);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><code>${p.sku}</code></td>
      <td><strong>${p.name}</strong></td>
      <td><span class="badge badge-info">${p.category}</span></td>
      <td class="num">${p.qty}</td>
      <td class="num">x${Number(p.pointRate).toFixed(1)}</td>
      <td class="num"><strong style="color:#10b981">${pts}</strong></td>
      <td class="num">${formatVND(p.revenue)}</td>
    `;
    tbody.appendChild(tr);
  });

  const tfoot = document.createElement("tr");
  tfoot.style.background = "rgba(15, 23, 42, 0.65)";
  tfoot.innerHTML = `
    <td colspan="3"><strong>TỔNG CỘNG (${filtered.length} dòng sản phẩm)</strong></td>
    <td class="num"><strong>${sumQty}</strong></td>
    <td class="num">-</td>
    <td class="num"><strong style="color:#10b981">${sumPts.toFixed(1)}</strong></td>
    <td class="num"><strong>${formatVND(sumRev)}</strong></td>
  `;
  tbody.appendChild(tfoot);
}

// Yêu cầu 2: Chi tiết đơn hàng
function renderOrderDetailTable() {
  const tbody = document.querySelector("#orderDetailTable tbody");
  const keyword = document.getElementById("searchOrderInput").value.trim().toLowerCase();
  const statusFilter = document.getElementById("filterOrderStatus").value;
  tbody.innerHTML = "";

  const filtered = appState.orderDetails.filter(o => {
    const matchStatus = statusFilter === "ALL" || o.status === statusFilter;
    const matchKey = !keyword ||
      String(o.id).toLowerCase().includes(keyword) ||
      String(o.product).toLowerCase().includes(keyword) ||
      String(o.staff).toLowerCase().includes(keyword) ||
      String(o.type).toLowerCase().includes(keyword);
    return matchStatus && matchKey;
  });

  filtered.forEach(o => {
    let badgeCls = "badge";
    if (o.status === "Đang xử lý") badgeCls = "badge badge-warn";
    else if (o.status === "Đã hủy") badgeCls = "badge badge-danger";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><code>${o.id}</code></td>
      <td><small>${o.time}</small></td>
      <td>${o.type}</td>
      <td><strong>${o.product}</strong></td>
      <td>${o.staff}</td>
      <td class="num"><strong>${o.points}</strong></td>
      <td class="num">${formatVND(o.amount)}</td>
      <td><span class="${badgeCls}">${o.status}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById("filterProductCat").addEventListener("change", renderProductDetailTable);
document.getElementById("searchOrderInput").addEventListener("input", renderOrderDetailTable);
document.getElementById("filterOrderStatus").addEventListener("change", renderOrderDetailTable);

function renderCharts() {
  const ctxSales = document.getElementById("salesChart").getContext("2d");
  if (salesChartInstance) salesChartInstance.destroy();

  salesChartInstance = new Chart(ctxSales, {
    type: "bar",
    data: {
      labels: appState.sales.map(x => x.category),
      datasets: [
        {
          label: "Target (Điểm)",
          data: appState.sales.map(x => x.target),
          backgroundColor: "rgba(148, 163, 184, 0.35)",
          borderColor: "#94a3b8",
          borderWidth: 1,
          borderRadius: 6
        },
        {
          label: "Thực đạt (Điểm)",
          data: appState.sales.map(x => x.actual),
          backgroundColor: "#009b72",
          borderColor: "#10b981",
          borderWidth: 1,
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: "#f8fafc" } } },
      scales: {
        x: { ticks: { color: "#94a3b8" }, grid: { display: false } },
        y: { ticks: { color: "#94a3b8" }, grid: { color: "#334155" } }
      }
    }
  });

  const ctxMix = document.getElementById("serviceMixChart").getContext("2d");
  if (serviceMixChartInstance) serviceMixChartInstance.destroy();
  const s = appState.service;

  serviceMixChartInstance = new Chart(ctxMix, {
    type: "doughnut",
    data: {
      labels: ["After Sale (Sửa chữa)", "Sale Order (Bán PK)", "Customer Rel (CSKH/Dán)", "Simple Service"],
      datasets: [{
        data: [s.afterSale, s.saleOrder, s.customerRel, s.simpleService],
        backgroundColor: ["#10b981", "#38bdf8", "#f59e0b", "#a855f7"],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom", labels: { color: "#f8fafc", boxWidth: 12 } } }
    }
  });
}

// Bóc tách trực tiếp từ cấu trúc file 2026-KPI NEW 5.3.8-TECH-T11 - NEW.xlsx
document.getElementById("excelUpload").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (evt) {
    try {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // 1. Sheet Tổng hợp
      if (workbook.Sheets["Tổng hợp"]) {
        const rows = XLSX.utils.sheet_to_json(workbook.Sheets["Tổng hợp"], { header: 1 });
        if (rows[2] && rows[2][0]) appState.shopName = rows[2][0];

        const catMap = [
          { name: "PHONE", tCol: 4, aCol: 5 },
          { name: "TAI NGHE", tCol: 7, aCol: 8 },
          { name: "PAD", tCol: 10, aCol: 11 },
          { name: "ỐP LƯNG", tCol: 13, aCol: 14 },
          { name: "Oppo Care", tCol: 16, aCol: 17 },
          { name: "MDCL", tCol: 19, aCol: 20 },
          { name: "Sạc dự phòng", tCol: 22, aCol: 23 },
          { name: "WATCH", tCol: 26, aCol: 27 }
        ];

        if (rows[2]) {
          appState.sales = catMap.map(c => ({
            category: c.name,
            target: Number(rows[2][c.tCol]) || 0,
            actual: Number(rows[2][c.aCol]) || 0
          }));
        }

        // Lấy đúng 2 KTV
        const techs = [];
        for (let r = 11; r < rows.length; r++) {
          if (rows[r] && rows[r][2] && rows[r][3]) {
            techs.push({
              code: String(rows[r][2]).trim(),
              name: String(rows[r][3]).trim(),
              repairNormal: Number(rows[r][6]) || 0,
              addonNormal: Number(rows[r][7]) || 0,
              soFindN: Number(rows[r][8]) || 0,
              soNormal: Number(rows[r][9]) || 0,
              newVol: Number(rows[r][10]) || 0,
              tat1h: "99%+"
            });
          }
          if (techs.length === 2) break;
        }
        if (techs.length > 0) appState.technicians = techs;
      }

      // 2. Sheet KPI-KT (lấy TAT 1H chính xác từng KTV)
      if (workbook.Sheets["KPI-KT"]) {
        const ktRows = XLSX.utils.sheet_to_json(workbook.Sheets["KPI-KT"], { header: 1 });
        for (let r = 3; r <= 4; r++) {
          if (ktRows[r] && ktRows[r][2]) {
            const code = String(ktRows[r][2]).trim();
            const tatVal = Number(ktRows[r][34]);
            const found = appState.technicians.find(t => t.code === code);
            if (found && !isNaN(tatVal)) {
              found.tat1h = `${(tatVal * 100).toFixed(2)}%`;
            }
          }
        }
      }

      // 3. Sheet KPI-SC
      if (workbook.Sheets["KPI-SC"]) {
        const kpiRows = XLSX.utils.sheet_to_json(workbook.Sheets["KPI-SC"], { header: 1 });
        const d = kpiRows[3];
        if (d) {
          appState.scCode = d[1] || appState.scCode;
          appState.service.volumeTotal = Number(d[9]) || appState.service.volumeTotal;
          appState.service.cancelCount = Number(d[19]) || appState.service.cancelCount;
          appState.service.cancelRate = Number(((Number(d[20]) || 0) * 100).toFixed(2));
          appState.service.klCount = Number(d[21]) || appState.service.klCount;
          appState.service.dlCount = Number(d[23]) || appState.service.dlCount;
          appState.service.afterSale = Number(d[31]) || appState.service.afterSale;
          appState.service.customerRel = Number(d[32]) || appState.service.customerRel;
          appState.service.saleOrder = Number(d[33]) || appState.service.saleOrder;
          appState.service.simpleService = Number(d[34]) || appState.service.simpleService;
          appState.service.tat1hRate = Number(((Number(d[60]) || 0) * 100).toFixed(2));
          appState.service.npsRate = Number(((Number(d[74]) || 0) * 100).toFixed(2));
        }
      }

      // 4. Bóc tách Center SO & GCSM SO cho Đơn hàng, Sản phẩm và Nhân sự
      const parsedOrders = [];
      const productMap = new Map();
      const staffMap = new Map();

      const addStaffScore = (rawName, cat, pts) => {
        if (!pts || pts <= 0) return;
        const name = cleanStaffName(rawName);
        if (!staffMap.has(name)) {
          staffMap.set(name, { name, role: "Nhân sự Shop", code: "NV-VN001034", devicePts: 0, accPts: 0, carePts: 0, targetPts: 60 });
        }
        const st = staffMap.get(name);
        const cUpper = String(cat || "").toUpperCase();
        if (cUpper.includes("PHONE") || cUpper.includes("PAD")) st.devicePts += pts;
        else if (cUpper.includes("CARE") || cUpper.includes("DÁN") || cUpper.includes("MDCL")) st.carePts += pts;
        else st.accPts += pts;
      };

      const addProductItem = (sku, name, cat, qty, pts, rev) => {
        const key = `${cat}__${name}`;
        if (!productMap.has(key)) {
          productMap.set(key, { sku: sku || "SP-OPPO", name, category: cat, qty: 0, totalPts: 0, revenue: 0 });
        }
        const item = productMap.get(key);
        item.qty += qty;
        item.totalPts += pts;
        item.revenue += rev;
      };

      if (workbook.Sheets["Center SO"]) {
        const cRows = XLSX.utils.sheet_to_json(workbook.Sheets["Center SO"], { header: 1 });
        for (let r = 3; r < cRows.length; r++) {
          const row = cRows[r];
          if (!row || !row[6]) continue;
          const orderId = String(row[5] || "");
          const time = String(row[3] || "");
          const sku = String(row[9] || "N/A");
          const prodName = String(row[12] || "").trim();
          const qty = Number(row[14]) || 1;
          const paid = Number(row[22]) || 0;
          const staff = cleanStaffName(row[40] || row[36]);
          const exportType = String(row[46] || "Xuất bán");
          const status = String(row[48] || "Hiệu lực") === "Hiệu lực" ? "Hoàn thành" : String(row[48]);
          const rawType = String(row[71] || row[11] || "Khác").toUpperCase();
          const pts = Number(row[72]) || 0;

          if (pts > 0 || paid > 0) {
            let normCat = rawType === "0" ? (prodName.toLowerCase().includes("dán") ? "MDCL" : "PHONE") : rawType;
            if (normCat === "Phone") normCat = "PHONE";

            parsedOrders.push({
              id: orderId,
              time,
              type: `Center SO (${exportType})`,
              product: prodName,
              staff,
              points: pts,
              amount: paid,
              status
            });

            if (pts > 0) {
              addProductItem(sku, prodName, normCat, qty, pts, paid);
              addStaffScore(staff, normCat, pts);
            }
          }
        }
      }

      if (workbook.Sheets["GCSM SO"]) {
        const gRows = XLSX.utils.sheet_to_json(workbook.Sheets["GCSM SO"], { header: 1 });
        for (let r = 1; r < gRows.length; r++) {
          const row = gRows[r];
          if (!row || !row[0]) continue;
          const orderId = String(row[0]);
          const status = String(row[6] || "") === "Completed" ? "Hoàn thành" : String(row[6] || "");
          const staff = cleanStaffName(row[10]);
          const time = String(row[12] || row[11] || "");
          const paid = Number(String(row[16] || "0").replace(/,/g, "")) || 0;
          const prodName = String(row[41] || "").trim();
          const qty = Number(row[42]) || 1;
          const sku = String(row[44] || "GCSM");
          const rawType = String(row[56] || "").trim();
          const pts = Number(row[57]) || 0;

          if (pts > 0 || paid > 0) {
            let normCat = rawType === "Miếng dán có phí" ? "MDCL" : (rawType || "Phụ kiện GCSM");
            parsedOrders.push({
              id: orderId,
              time,
              type: `GCSM SO (${row[34] || "Service"})`,
              product: prodName,
              staff,
              points: pts,
              amount: paid,
              status
            });

            if (pts > 0) {
              addProductItem(sku, prodName, normCat, qty, pts, paid);
              addStaffScore(staff, normCat, pts);
            }
          }
        }
      }

      if (parsedOrders.length > 0) {
        parsedOrders.sort((a, b) => b.time.localeCompare(a.time));
        appState.orderDetails = parsedOrders;
      }

      if (productMap.size > 0) {
        appState.productDetails = Array.from(productMap.values()).map(p => ({
          sku: p.sku,
          name: p.name,
          category: p.category,
          qty: p.qty,
          pointRate: p.qty > 0 ? Number((p.totalPts / p.qty).toFixed(2)) : 1,
          revenue: p.revenue
        }));
      }

      if (staffMap.size > 0) {
        appState.staffContributions = Array.from(staffMap.values()).sort(
          (a, b) => (b.devicePts + b.accPts + b.carePts) - (a.devicePts + a.accPts + a.carePts)
        );
      }

      saveState(file.name);
      renderDashboard();
      alert("✅ Đã bóc tách & lưu dữ liệu mới nhất từ file: " + file.name);
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi đọc file Excel. Vui lòng kiểm tra lại định dạng file!");
    }
  };
  reader.readAsArrayBuffer(file);
});

// Modal Chỉnh sửa & Lưu Target
const targetModal = document.getElementById("targetModal");
document.getElementById("btnEditTarget").addEventListener("click", () => {
  const grid = document.getElementById("targetInputsGrid");
  grid.innerHTML = "";
  appState.sales.forEach((item, idx) => {
    grid.innerHTML += `
      <div class="target-field">
        <label>${item.category} (Hiện đạt: ${item.actual})</label>
        <input type="number" min="0" data-idx="${idx}" value="${item.target}" />
      </div>
    `;
  });
  targetModal.classList.remove("hidden");
});

document.getElementById("closeTargetModal").addEventListener("click", () => targetModal.classList.add("hidden"));

document.getElementById("btnSaveTarget").addEventListener("click", () => {
  document.querySelectorAll("#targetInputsGrid input").forEach(inp => {
    const idx = Number(inp.dataset.idx);
    appState.sales[idx].target = Number(inp.value) || 0;
  });
  saveState("Điều chỉnh Target thủ công");
  renderDashboard();
  targetModal.classList.add("hidden");
});

document.getElementById("btnResetDefault").addEventListener("click", () => {
  if (confirm("Khôi phục toàn bộ dữ liệu & Target về bản gốc của file T11?")) {
    localStorage.removeItem(STORAGE_KEY);
    appState = structuredClone(DEFAULT_DATA);
    renderDashboard();
    targetModal.classList.add("hidden");
  }
});

// Modal Export Báo Cáo
const reportModal = document.getElementById("reportModal");
document.getElementById("btnExportReport").addEventListener("click", () => {
  const totalTarget = appState.sales.reduce((s, i) => s + i.target, 0);
  const totalActual = appState.sales.reduce((s, i) => s + i.actual, 0);
  const pct = totalTarget > 0 ? ((totalActual / totalTarget) * 100).toFixed(1) : 0;
  const s = appState.service;

  const salesLines = appState.sales
    .map(i => `- ${i.category}: ${i.actual}/${i.target} điểm (${i.target > 0 ? ((i.actual / i.target) * 100).toFixed(0) : 100}%)`)
    .join("\n");

  const techLines = appState.technicians.slice(0, 2)
    .map(t => `- ${t.name} (${t.code}): ${t.newVol} điểm năng suất | TAT 1H: ${t.tat1h}`)
    .join("\n");

  const staffLines = appState.staffContributions
    .map(st => {
      const tot = st.devicePts + st.accPts + st.carePts;
      return `- ${st.name}: ${tot} điểm (Máy: ${st.devicePts}, PK/IoT: ${st.accPts}, Care/MDCL: ${st.carePts})`;
    })
    .join("\n");

  const summary = `📊 BÁO CÁO VẬN HÀNH - ${appState.shopName.toUpperCase()}
Mã trạm: ${appState.scCode} | Nguồn: ${appState.lastUpdated}
--------------------------------------------------
1. KẾT QUẢ BÁN HÀNG (BRANDSHOP):
- Tổng điểm: ${totalActual} / ${totalTarget} điểm (Đạt ${pct}%)
${salesLines}

2. ĐÓNG GÓP DOANH SỐ & ĐIỂM BÁN HÀNG THEO NHÂN SỰ:
${staffLines}

3. CHỈ SỐ DỊCH VỤ & NĂNG SUẤT 2 KỸ THUẬT VIÊN:
- Tổng phiếu tiếp nhận: ${s.volumeTotal} phiếu | TAT 1H: ${s.tat1hRate}% | NPS: ${s.npsRate}%
- Tỷ lệ Khách lẻ / Đại lý: ${s.klCount} KL / ${s.dlCount} ĐL | Dán MH: ${s.filmTotal} phiếu
${techLines}
--------------------------------------------------`;

  document.getElementById("reportTextOutput").value = summary;
  reportModal.classList.remove("hidden");
});

document.getElementById("closeReportModal").addEventListener("click", () => reportModal.classList.add("hidden"));

document.getElementById("btnCopyReport").addEventListener("click", () => {
  const txt = document.getElementById("reportTextOutput");
  txt.select();
  navigator.clipboard.writeText(txt.value);
  alert("📋 Đã copy báo cáo ngắn gọn vào bộ nhớ tạm!");
});

document.getElementById("btnDownloadTxt").addEventListener("click", () => {
  const content = document.getElementById("reportTextOutput").value;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `Bao_Cao_Nhanh_${appState.scCode}.txt`;
  a.click();
});

document.getElementById("btnPrintPdf").addEventListener("click", () => {
  reportModal.classList.add("hidden");
  window.print();
});

renderDashboard();
