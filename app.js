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
  // Bảng báo cáo KPI / KPI报表 trên sheet Tổng hợp
  kpiReportRows: [
    { item: "Tổng điểm bán hàng Brandshop (PHONE, IoT, Care, MDCL)", target: 176, actual: 211, score: 211, pct: 119.9, note: "Vượt chỉ tiêu" },
    { item: "Năng suất kỹ thuật viên (Tổng khối lượng quy đổi KTV)", target: 250, actual: 317, score: 317, pct: 126.8, note: "Đạt vượt mức" },
    { item: "TAT 1H (Sửa chữa nhanh trong 1 giờ)", target: 95.0, actual: 99.44, score: 99.44, pct: 104.7, note: "Đạt chuẩn" },
    { item: "TAT-KS 1H (Kiểm tra/Dịch vụ nhanh 1 giờ)", target: 95.0, actual: 100.0, score: 100.0, pct: 105.3, note: "Đạt chuẩn" },
    { item: "Chỉ số hài lòng khách hàng NPS", target: 15.0, actual: 17.86, score: 17.86, pct: 119.1, note: "Vượt chuẩn" },
    { item: "Tỷ lệ hủy phiếu dịch vụ (Cancel Rate)", target: 6.0, actual: 4.26, score: 4.26, pct: 71.0, note: "Kiểm soát tốt" }
  ],
  // TAT tập trung vào các chỉ số ở mục ĐÁNH GIÁ KPI SERVICE 2025
  service: {
    volumeTotal: 446,
    afterSale: 190,
    customerRel: 86,
    saleOrder: 161,
    simpleService: 9,
    cancelCount: 19,
    cancelRate: 4.26,
    tat1hRate: 99.44,
    tatKs1hRate: 100.0,
    tat24hRate: 100.0,
    tat72hRate: 100.0,
    npsRate: 17.86,
    klCount: 150,
    dlCount: 100,
    filmTotal: 161,
    filmRate: 36.1
  },
  technicians: [
    { name: "PHAN CHÍ TRUNG", code: "D70979015", repairNormal: 183, addonNormal: 45.5, soNormal: 70, soFindN: 4, newVol: 302.5, tat1h: "98.63%" },
    { name: "ĐOÀN MINH HÙNG", code: "D24248811", repairNormal: 6, addonNormal: 1.5, soNormal: 7, soFindN: 0, newVol: 14.5, tat1h: "100%" }
  ],
  staffContributions: [
    { name: "ĐOÀN MINH HÙNG", sources: ["Center SO", "GCSM SO"], orderCount: 14, devicePts: 63, accPts: 22, carePts: 12, revenue: 132649000 },
    { name: "PHAN CHÍ TRUNG", sources: ["GCSM SO"], orderCount: 25, devicePts: 0, accPts: 2, carePts: 56, revenue: 16480000 },
    { name: "HUỲNH HỒNG HUỆ", sources: ["Center SO", "GCSM SO"], orderCount: 12, devicePts: 38, accPts: 8, carePts: 4, revenue: 65828200 }
  ],
  productDetails: [
    { sku: "CPH2859", name: "OPPO Reno16 F 5G 8GB+256GB", category: "PHONE", source: "Center SO", staff: "ĐOÀN MINH HÙNG", qty: 6, points: 30, revenue: 78090000 },
    { sku: "CPH-R15P", name: "OPPO Reno15 Pro 5G 12GB+256GB", category: "PHONE", source: "Center SO", staff: "ĐOÀN MINH HÙNG", qty: 2, points: 16, revenue: 28280000 },
    { sku: "CPH-R16", name: "OPPO Reno16 5G 8GB+256GB", category: "PHONE", source: "Center SO", staff: "ĐOÀN MINH HÙNG", qty: 2, points: 10, revenue: 32480000 },
    { sku: "CPH2913", name: "OPPO Find X10 Pro Max 16GB+512GB", category: "PHONE", source: "Center SO", staff: "ĐOÀN MINH HÙNG", qty: 1, points: 9, revenue: 43690000 },
    { sku: "CPH-FX9S", name: "OPPO Find X9s 12GB+256GB / 512GB", category: "PHONE", source: "Center SO", staff: "HUỲNH HỒNG HUỆ", qty: 2, points: 14, revenue: 20990000 },
    { sku: "CPH-R15", name: "OPPO Reno15 5G (8GB/12GB+256GB)", category: "PHONE", source: "Center SO", staff: "HUỲNH HỒNG HUỆ", qty: 2, points: 16, revenue: 26530000 },
    { sku: "CPH-A6", name: "OPPO A6 Pro / A6x / A6t Series", category: "PHONE", source: "Center SO", staff: "HUỲNH HỒNG HUỆ", qty: 4, points: 8, revenue: 8690000 },
    { sku: "IOT-AUDIO", name: "Tai nghe Enco Buds3 / Enco Air3 / Enco Buds2", category: "TAI NGHE", source: "Center SO", staff: "ĐOÀN MINH HÙNG", qty: 5, points: 10, revenue: 2700000 },
    { sku: "CASE-OP", name: "Ốp lưng từ tính ROCK / RORO JUMP OPPO", category: "ỐP LƯNG", source: "Center SO", staff: "ĐOÀN MINH HÙNG", qty: 4, points: 12, revenue: 748000 },
    { sku: "OCARE-1Y", name: "Gói Extended Warranty / Screen Protection 1 Năm", category: "Oppo Care", source: "GCSM SO", staff: "PHAN CHÍ TRUNG", qty: 6, points: 24, revenue: 1846000 },
    { sku: "MDCL-GCSM", name: "Miếng dán cường lực / Film bảo vệ (GCSM & Center)", category: "MDCL", source: "GCSM SO", staff: "PHAN CHÍ TRUNG", qty: 54, points: 54, revenue: 6930000 },
    { sku: "SDP-VOOC", name: "Sạc dự phòng SDP AS-182-45 / FP-110 / JB-200", category: "Sạc dự phòng", source: "GCSM SO", staff: "HUỲNH HỒNG HUỆ", qty: 5, points: 10, revenue: 3116800 }
  ],
  orderDetails: [
    { id: "72026112510183295711", source: "Center SO", time: "25/11/2026 10:18", type: "Sale Order (Xuất bán)", product: "Reno15 Pro 5G 12GB+256GB (+ Enco Buds3)", staff: "ĐOÀN MINH HÙNG", points: 10, amount: 13890000, status: "Hoàn thành" },
    { id: "72026112315435141171", source: "Center SO", time: "23/11/2026 15:43", type: "Sale Order (Xuất bán)", product: "A6 Pro 5G 8GB+256GB (+ Enco Buds3)", staff: "HUỲNH HỒNG HUỆ", points: 5, amount: 8690000, status: "Hoàn thành" },
    { id: "VN001034-SO2611230004", source: "GCSM SO", time: "23/11/2026 17:01", type: "Service Ticket (Warranty)", product: "Extended Warranty Plan - One Year", staff: "HUỲNH HỒNG HUỆ", points: 4, amount: 149000, status: "Hoàn thành" },
    { id: "VN001034-SO2611230001", source: "GCSM SO", time: "23/11/2026 08:43", type: "Service Ticket (Accessory)", product: "Sạc dự phòng SDP AS-182-45 Bạc", staff: "HUỲNH HỒNG HUỆ", points: 2, amount: 719200, status: "Hoàn thành" },
    { id: "72026112115353333151", source: "Center SO", time: "21/11/2026 15:35", type: "Sale Order (Xuất bán)", product: "Reno16 F 5G 8GB+256GB (+ Enco Buds3)", staff: "ĐOÀN MINH HÙNG", points: 7, amount: 11990000, status: "Hoàn thành" },
    { id: "72026111912304805961", source: "Center SO", time: "19/11/2026 12:30", type: "Sale Order (Phụ kiện)", product: "MDCL Reno16F_K23 + Ốp lưng RORO JUMP", staff: "ĐOÀN MINH HÙNG", points: 4, amount: 499000, status: "Hoàn thành" },
    { id: "VN001034-SO2611160006", source: "GCSM SO", time: "16/11/2026 15:19", type: "Service Ticket (Warranty)", product: "Extended Warranty Plan - One Year", staff: "PHAN CHÍ TRUNG", points: 4, amount: 350000, status: "Hoàn thành" },
    { id: "72026111316054236901", source: "Center SO", time: "13/11/2026 16:05", type: "Sale Order (Xuất bán)", product: "Find X9s 12GB+256GB", staff: "HUỲNH HỒNG HUỆ", points: 7, amount: 20990000, status: "Hoàn thành" },
    { id: "72026110710153042761", source: "Center SO", time: "07/11/2026 10:15", type: "Sale Order (Xuất bán)", product: "Find X10 Pro Max 16GB+512GB + Teleconverter Kit", staff: "ĐOÀN MINH HÙNG", points: 14, amount: 50680000, status: "Hoàn thành" },
    { id: "VN001034-SO2611050002", source: "GCSM SO", time: "05/11/2026 10:57", type: "Service Ticket (Warranty)", product: "Extended Warranty Plan - One Year", staff: "PHAN CHÍ TRUNG", points: 4, amount: 450000, status: "Hoàn thành" }
  ]
};

const STORAGE_KEY = "oppo_tg_dashboard_state_v5";
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

function saveState(customActionLabel = null) {
  const now = new Date();
  const timeStr = `${now.toLocaleTimeString("vi-VN")} - ${now.toLocaleDateString("vi-VN")}`;
  if (customActionLabel) {
    appState.lastUpdated = `${customActionLabel} (Lưu lần cuối: ${timeStr})`;
  } else if (!appState.lastUpdated.includes("Lưu lần cuối:")) {
    appState.lastUpdated = `${appState.lastUpdated} (Lưu lần cuối: ${timeStr})`;
  } else {
    appState.lastUpdated = appState.lastUpdated.replace(/\(Lưu lần cuối:.*\)/, `(Lưu lần cuối: ${timeStr})`);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

function formatVND(val) {
  return Number(val || 0).toLocaleString("vi-VN") + " đ";
}

function normalizeStaffName(raw) {
  if (!raw) return "CHƯA GÁN NHÂN VIÊN";
  const cleaned = String(raw)
    .replace(/（.*?）|\(.*?\)|\[.*?\]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned ? cleaned.toUpperCase() : "CHƯA GÁN NHÂN VIÊN";
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

  // TAT tập trung các chỉ số ở mục ĐÁNH GIÁ KPI SERVICE 2025
  const s = appState.service;
  document.getElementById("tat1hMain").textContent = `${Number(s.tat1hRate || 0).toFixed(2)}%`;
  document.getElementById("tatKs1h").textContent = `${Number(s.tatKs1hRate ?? 100).toFixed(2)}%`;
  document.getElementById("tat24h").textContent = `${Number(s.tat24hRate ?? 100).toFixed(2)}%`;
  document.getElementById("tat72h").textContent = `${Number(s.tat72hRate ?? 100).toFixed(2)}%`;
  document.getElementById("valTotalTickets").textContent = s.volumeTotal;
  document.getElementById("lblChartTickets").textContent = s.volumeTotal;
  document.getElementById("valNps").textContent = `${s.npsRate}%`;
  document.getElementById("valCancelRate").textContent = `${s.cancelRate}%`;
  document.getElementById("valKL").textContent = `${s.klCount} (${((s.klCount / (s.klCount + s.dlCount || 1)) * 100).toFixed(0)}%)`;
  document.getElementById("valDL").textContent = `${s.dlCount} (${((s.dlCount / (s.klCount + s.dlCount || 1)) * 100).toFixed(0)}%)`;
  document.getElementById("valFilm").textContent = `${s.filmTotal} phiếu (${s.filmRate}%)`;

  renderKpiReportTable();
  renderSalesTable();
  renderTechTable();
  renderStaffContributionTable();
  populateProductFilters();
  renderProductDetailTable();
  renderOrderDetailTable();
  renderCharts();
}

// Bảng báo cáo KPI / KPI报表 trên sheet Tổng hợp
function renderKpiReportTable() {
  const tbody = document.querySelector("#kpiReportTable tbody");
  tbody.innerHTML = "";

  const rows = Array.isArray(appState.kpiReportRows) ? appState.kpiReportRows : [];
  rows.forEach(r => {
    const pctNum = Number(r.pct || 0);
    let badgeHtml = `<span class="badge">${r.note || "Đạt"}</span>`;
    if (pctNum < 80 && !String(r.item || "").toLowerCase().includes("hủy")) {
      badgeHtml = `<span class="badge badge-warn">${r.note || "Cần đẩy mạnh"}</span>`;
    }

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${r.item}</strong></td>
      <td class="num">${r.target}</td>
      <td class="num"><strong>${r.actual}</strong></td>
      <td class="num"><strong style="color:var(--oppo-green)">${r.score}</strong></td>
      <td class="num">${pctNum.toFixed(1)}%</td>
      <td>${badgeHtml}</td>
    `;
    tbody.appendChild(tr);
  });
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
      <td class="num" style="color:${diff >= 0 ? 'var(--oppo-green)' : 'var(--danger)'}">${diff >= 0 ? '+' + diff : diff}</td>
      <td class="num">${pct.toFixed(1)}%</td>
      <td>${statusHtml}</td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById("salesSummaryText").textContent = `${achievedCount}/${appState.sales.length} nhóm đạt & vượt Target`;
}

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
      <td class="num"><strong style="color:var(--oppo-green)">${t.newVol}</strong></td>
      <td class="num">${t.tat1h}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderStaffContributionTable() {
  const tbody = document.querySelector("#staffContributionTable tbody");
  tbody.innerHTML = "";

  const staffList = appState.staffContributions.map(st => {
    const totalPts = Number((Number(st.devicePts || 0) + Number(st.accPts || 0) + Number(st.carePts || 0)).toFixed(1));
    return { ...st, totalPts };
  });

  const grandTotalPts = staffList.reduce((acc, s) => acc + s.totalPts, 0);
  document.getElementById("staffTotalBadge").textContent =
    `Tổng điểm nhân sự (GCSM SO + Center SO): ${grandTotalPts.toFixed(1)} điểm`;

  staffList.forEach(st => {
    const sharePct = grandTotalPts > 0 ? ((st.totalPts / grandTotalPts) * 100).toFixed(1) : 0;
    const srcText = Array.isArray(st.sources) && st.sources.length > 0 ? st.sources.join(" + ") : "GCSM SO / Center SO";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${st.name}</strong></td>
      <td><span class="badge badge-info">${srcText}</span></td>
      <td class="num">${st.orderCount || 0}</td>
      <td class="num">${Number(st.devicePts || 0).toFixed(1)}</td>
      <td class="num">${Number(st.accPts || 0).toFixed(1)}</td>
      <td class="num">${Number(st.carePts || 0).toFixed(1)}</td>
      <td class="num"><strong style="color:var(--oppo-green);font-size:0.95rem">${st.totalPts.toFixed(1)}</strong></td>
      <td class="num"><strong>${formatVND(st.revenue)}</strong></td>
      <td class="num">
        <div class="contrib-bar-wrap">
          <span>${sharePct}%</span>
          <div class="contrib-bar"><div class="contrib-bar-fill" style="width:${sharePct}%"></div></div>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function populateProductFilters() {
  const catSelect = document.getElementById("filterProductCat");
  const staffSelect = document.getElementById("filterProductStaff");
  const curCat = catSelect.value;
  const curStaff = staffSelect.value;

  const cats = [...new Set(appState.productDetails.map(p => p.category).filter(Boolean))];
  const staffs = [...new Set(appState.productDetails.map(p => p.staff).filter(Boolean))];

  catSelect.innerHTML = `<option value="ALL">Tất cả nhóm hàng (${cats.length})</option>`;
  cats.forEach(c => { catSelect.innerHTML += `<option value="${c}">${c}</option>`; });
  if (cats.includes(curCat)) catSelect.value = curCat;

  staffSelect.innerHTML = `<option value="ALL">Tất cả nhân viên (${staffs.length})</option>`;
  staffs.forEach(s => { staffSelect.innerHTML += `<option value="${s}">${s}</option>`; });
  if (staffs.includes(curStaff)) staffSelect.value = curStaff;
}

function renderProductDetailTable() {
  const tbody = document.querySelector("#productDetailTable tbody");
  const srcFilter = document.getElementById("filterProductSource").value;
  const catFilter = document.getElementById("filterProductCat").value;
  const staffFilter = document.getElementById("filterProductStaff").value;
  tbody.innerHTML = "";

  const filtered = appState.productDetails.filter(p => {
    const matchSrc = srcFilter === "ALL" || p.source === srcFilter;
    const matchCat = catFilter === "ALL" || p.category === catFilter;
    const matchStaff = staffFilter === "ALL" || p.staff === staffFilter;
    return matchSrc && matchCat && matchStaff;
  });

  let sumQty = 0, sumPts = 0, sumRev = 0;

  filtered.forEach(p => {
    const pts = Number(p.points || 0);
    sumQty += Number(p.qty || 0);
    sumPts += pts;
    sumRev += Number(p.revenue || 0);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><code>${p.sku}</code></td>
      <td><strong>${p.name}</strong></td>
      <td><span class="badge badge-info">${p.category}</span></td>
      <td>${p.source}</td>
      <td><strong>${p.staff}</strong></td>
      <td class="num">${p.qty}</td>
      <td class="num"><strong style="color:var(--oppo-green)">${pts.toFixed(1)}</strong></td>
      <td class="num">${formatVND(p.revenue)}</td>
    `;
    tbody.appendChild(tr);
  });

  const tfoot = document.createElement("tr");
  tfoot.style.background = "#eef2f6";
  tfoot.innerHTML = `
    <td colspan="5"><strong>TỔNG CỘNG (${filtered.length} dòng sản phẩm)</strong></td>
    <td class="num"><strong>${sumQty}</strong></td>
    <td class="num"><strong style="color:var(--oppo-green)">${sumPts.toFixed(1)}</strong></td>
    <td class="num"><strong>${formatVND(sumRev)}</strong></td>
  `;
  tbody.appendChild(tfoot);
}

function renderOrderDetailTable() {
  const tbody = document.querySelector("#orderDetailTable tbody");
  const keyword = document.getElementById("searchOrderInput").value.trim().toLowerCase();
  const srcFilter = document.getElementById("filterOrderSource").value;
  const statusFilter = document.getElementById("filterOrderStatus").value;
  tbody.innerHTML = "";

  const filtered = appState.orderDetails.filter(o => {
    const matchSrc = srcFilter === "ALL" || o.source === srcFilter;
    const matchStatus = statusFilter === "ALL" || o.status === statusFilter;
    const matchKey = !keyword ||
      String(o.id).toLowerCase().includes(keyword) ||
      String(o.product).toLowerCase().includes(keyword) ||
      String(o.staff).toLowerCase().includes(keyword) ||
      String(o.type).toLowerCase().includes(keyword) ||
      String(o.source).toLowerCase().includes(keyword);
    return matchSrc && matchStatus && matchKey;
  });

  filtered.forEach(o => {
    let badgeCls = "badge";
    if (o.status === "Đang xử lý") badgeCls = "badge badge-warn";
    else if (o.status === "Đã hủy") badgeCls = "badge badge-danger";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><code>${o.id}</code></td>
      <td><span class="badge badge-info">${o.source}</span></td>
      <td><small>${o.time}</small></td>
      <td>${o.type}</td>
      <td><strong>${o.product}</strong></td>
      <td><strong>${o.staff}</strong></td>
      <td class="num"><strong style="color:var(--oppo-green)">${Number(o.points || 0).toFixed(1)}</strong></td>
      <td class="num">${formatVND(o.amount)}</td>
      <td><span class="${badgeCls}">${o.status}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById("filterProductSource").addEventListener("change", renderProductDetailTable);
document.getElementById("filterProductCat").addEventListener("change", renderProductDetailTable);
document.getElementById("filterProductStaff").addEventListener("change", renderProductDetailTable);
document.getElementById("searchOrderInput").addEventListener("input", renderOrderDetailTable);
document.getElementById("filterOrderSource").addEventListener("change", renderOrderDetailTable);
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
          backgroundColor: "#cbd5e1",
          borderColor: "#64748b",
          borderWidth: 1,
          borderRadius: 6
        },
        {
          label: "Thực đạt (Điểm)",
          data: appState.sales.map(x => x.actual),
          backgroundColor: "#059669",
          borderColor: "#047857",
          borderWidth: 1,
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: "#0f172a" } } },
      scales: {
        x: { ticks: { color: "#334155" }, grid: { display: false } },
        y: { ticks: { color: "#334155" }, grid: { color: "#e2e8f0" } }
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
        backgroundColor: ["#059669", "#0284c7", "#d97706", "#7c3aed"],
        borderWidth: 2,
        borderColor: "#ffffff"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom", labels: { color: "#0f172a", boxWidth: 12 } } }
    }
  });
}

// Bóc tách dữ liệu Excel theo cấu trúc file 2026-KPI NEW 5.3.8-TECH-T11 - NEW.xlsx
document.getElementById("excelUpload").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (evt) {
    try {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });

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

        // Bóc tách bảng báo cáo KPI / KPI报表 trên sheet Tổng hợp
        const extractedKpiReport = [];
        for (let r = 0; r < rows.length; r++) {
          const row = rows[r];
          if (!row) continue;
          const rowText = row.map(x => String(x || "")).join(" ");
          if (rowText.includes("KPI报表") || rowText.includes("Báo cáo KPI") || rowText.includes("KPI")) {
            // Tìm các dòng số liệu kế tiếp có tên hạng mục + số liệu
            for (let k = r + 1; k < Math.min(rows.length, r + 20); k++) {
              const kr = rows[k];
              if (!kr) continue;
              const label = String(kr[0] || kr[1] || kr[2] || "").trim();
              const nums = kr.filter(v => typeof v === "number" && !isNaN(v));
              if (label && label.length > 2 && !label.includes("KPI报表") && nums.length >= 2) {
                const tgt = nums[0];
                const act = nums[1];
                const sc = nums[2] !== undefined ? nums[2] : act;
                const pct = tgt > 0 ? Number(((act / tgt) * 100).toFixed(1)) : 100;
                extractedKpiReport.push({
                  item: label,
                  target: tgt,
                  actual: act,
                  score: sc,
                  pct,
                  note: pct >= 100 ? "Đạt / Vượt" : "Theo dõi"
                });
              }
            }
            if (extractedKpiReport.length > 0) break;
          }
        }
        if (extractedKpiReport.length > 0) {
          appState.kpiReportRows = extractedKpiReport;
        }

        const techs = [];
        for (let r = 11; r < rows.length; r++) {
          if (rows[r] && rows[r][2] && rows[r][3]) {
            techs.push({
              code: String(rows[r][2]).trim(),
              name: normalizeStaffName(rows[r][3]),
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

      // Sheet tổng thể / KPI-SC: tập trung ĐÁNH GIÁ KPI SERVICE 2025 cho TAT
      const totalSheet = workbook.Sheets["KPI-SC"] || workbook.Sheets["Tổng thể"];
      if (totalSheet) {
        const kpiRows = XLSX.utils.sheet_to_json(totalSheet, { header: 1 });
        const d = kpiRows[3] || kpiRows[2] || [];
        if (d.length > 0) {
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
          appState.service.tat1hRate = Number(((Number(d[60]) || 0.9944) * 100).toFixed(2));
          appState.service.tatKs1hRate = Number(((Number(d[61]) || 1) * 100).toFixed(2));
          appState.service.tat24hRate = Number(((Number(d[62]) || 1) * 100).toFixed(2));
          appState.service.tat72hRate = Number(((Number(d[63]) || 1) * 100).toFixed(2));
          appState.service.npsRate = Number(((Number(d[74]) || 0) * 100).toFixed(2));
        }
      }

      const parsedOrders = [];
      const productMap = new Map();
      const staffMap = new Map();

      const recordStaff = (rawName, sourceName, cat, pts, rev) => {
        const name = normalizeStaffName(rawName);
        if (!staffMap.has(name)) {
          staffMap.set(name, {
            name,
            sources: new Set(),
            orderCount: 0,
            devicePts: 0,
            accPts: 0,
            carePts: 0,
            revenue: 0
          });
        }
        const st = staffMap.get(name);
        st.sources.add(sourceName);
        st.orderCount += 1;
        st.revenue += Number(rev || 0);

        const p = Number(pts || 0);
        const cUpper = String(cat || "").toUpperCase();
        if (cUpper.includes("PHONE") || cUpper.includes("PAD")) st.devicePts += p;
        else if (cUpper.includes("CARE") || cUpper.includes("DÁN") || cUpper.includes("MDCL") || cUpper.includes("FILM")) st.carePts += p;
        else st.accPts += p;
      };

      const recordProduct = (sku, name, cat, sourceName, staffName, qty, pts, rev) => {
        const cleanName = String(name || "").trim() || "Sản phẩm / Dịch vụ OPPO";
        const key = `${sourceName}__${cat}__${staffName}__${cleanName}`;
        if (!productMap.has(key)) {
          productMap.set(key, {
            sku: sku || "N/A",
            name: cleanName,
            category: cat,
            source: sourceName,
            staff: staffName,
            qty: 0,
            points: 0,
            revenue: 0
          });
        }
        const item = productMap.get(key);
        item.qty += Number(qty || 1);
        item.points += Number(pts || 0);
        item.revenue += Number(rev || 0);
      };

      if (workbook.Sheets["Center SO"]) {
        const cRows = XLSX.utils.sheet_to_json(workbook.Sheets["Center SO"], { header: 1 });
        for (let r = 3; r < cRows.length; r++) {
          const row = cRows[r];
          if (!row || (!row[5] && !row[12])) continue;

          const orderId = String(row[5] || `CSO-${r}`);
          const time = String(row[3] || "");
          const sku = String(row[9] || "N/A");
          const prodName = String(row[12] || "").trim();
          const qty = Number(row[14]) || 1;
          const paid = Number(row[22]) || 0;
          const staff = normalizeStaffName(row[40] || row[36] || row[18]);
          const exportType = String(row[46] || "Xuất bán");
          const rawStatus = String(row[48] || "Hiệu lực");
          const status = rawStatus === "Hiệu lực" ? "Hoàn thành" : rawStatus;
          const rawType = String(row[71] || row[11] || "Khác").toUpperCase();
          const pts = Number(row[72]) || 0;

          if (pts > 0 || paid > 0 || prodName) {
            let normCat = rawType === "0" ? (prodName.toLowerCase().includes("dán") ? "MDCL" : "PHONE") : rawType;
            if (normCat === "Phone") normCat = "PHONE";

            parsedOrders.push({
              id: orderId,
              source: "Center SO",
              time,
              type: `Sale Order (${exportType})`,
              product: prodName,
              staff,
              points: pts,
              amount: paid,
              status
            });

            recordStaff(staff, "Center SO", normCat, pts, paid);
            recordProduct(sku, prodName, normCat, "Center SO", staff, qty, pts, paid);
          }
        }
      }

      if (workbook.Sheets["GCSM SO"]) {
        const gRows = XLSX.utils.sheet_to_json(workbook.Sheets["GCSM SO"], { header: 1 });
        for (let r = 1; r < gRows.length; r++) {
          const row = gRows[r];
          if (!row || (!row[0] && !row[41])) continue;

          const orderId = String(row[0] || `GCSM-${r}`);
          const rawStatus = String(row[6] || "");
          const status = rawStatus === "Completed" ? "Hoàn thành" : (rawStatus || "Hoàn thành");
          const staff = normalizeStaffName(row[10] || row[9] || row[8]);
          const time = String(row[12] || row[11] || "");
          const paid = Number(String(row[16] || "0").replace(/,/g, "")) || 0;
          const prodName = String(row[41] || row[34] || "").trim();
          const qty = Number(row[42]) || 1;
          const sku = String(row[44] || "GCSM");
          const rawType = String(row[56] || row[34] || "").trim();
          const pts = Number(row[57]) || 0;

          if (pts > 0 || paid > 0 || prodName) {
            let normCat = rawType === "Miếng dán có phí" ? "MDCL" : (rawType || "Dịch vụ GCSM");

            parsedOrders.push({
              id: orderId,
              source: "GCSM SO",
              time,
              type: `Service Ticket (${row[34] || "GCSM"})`,
              product: prodName,
              staff,
              points: pts,
              amount: paid,
              status
            });

            recordStaff(staff, "GCSM SO", normCat, pts, paid);
            recordProduct(sku, prodName, normCat, "GCSM SO", staff, qty, pts, paid);
          }
        }
      }

      if (parsedOrders.length > 0) {
        parsedOrders.sort((a, b) => String(b.time).localeCompare(String(a.time)));
        appState.orderDetails = parsedOrders;
      }

      if (productMap.size > 0) {
        appState.productDetails = Array.from(productMap.values()).sort((a, b) => b.points - a.points);
      }

      if (staffMap.size > 0) {
        appState.staffContributions = Array.from(staffMap.values())
          .map(st => ({ ...st, sources: Array.from(st.sources) }))
          .sort((a, b) => (b.devicePts + b.accPts + b.carePts) - (a.devicePts + a.accPts + a.carePts));
      }

      saveState(`Upload file: ${file.name}`);
      renderDashboard();
      alert("✅ Đã đồng bộ dữ liệu từ file: " + file.name);
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi đọc file Excel. Vui lòng kiểm tra lại định dạng file!");
    }
  };
  reader.readAsArrayBuffer(file);
});

const targetModal = document.getElementById("targetModal");
document.getElementById("btnEditTarget").addEventListener("click", () => {
  const grid = document.getElementById("targetInputsGrid");
  grid.innerHTML = "";
  appState.sales.forEach((item, idx) => {
    grid.innerHTML += `
      <div class="target-field">
        <label>${item.category} (Hiện đạt: ${item.actual})</label>
        <input type="number" min="0" step="0.5" data-idx="${idx}" value="${item.target}" />
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
  saveState("Cập nhật Target lần cuối");
  renderDashboard();
  targetModal.classList.add("hidden");
});

document.getElementById("btnResetDefault").addEventListener("click", () => {
  if (confirm("Khôi phục toàn bộ dữ liệu & Target về bản gốc của file T11?")) {
    localStorage.removeItem(STORAGE_KEY);
    appState = structuredClone(DEFAULT_DATA);
    saveState("Khôi phục bản gốc T11");
    renderDashboard();
    targetModal.classList.add("hidden");
  }
});

const reportModal = document.getElementById("reportModal");
document.getElementById("btnExportReport").addEventListener("click", () => {
  const totalTarget = appState.sales.reduce((s, i) => s + i.target, 0);
  const totalActual = appState.sales.reduce((s, i) => s + i.actual, 0);
  const pct = totalTarget > 0 ? ((totalActual / totalTarget) * 100).toFixed(1) : 0;
  const s = appState.service;

  const salesLines = appState.sales
    .map(i => `- ${i.category}: ${i.actual}/${i.target} điểm (${i.target > 0 ? ((i.actual / i.target) * 100).toFixed(0) : 100}%)`)
    .join("
");

  const techLines = appState.technicians.slice(0, 2)
    .map(t => `- ${t.name} (${t.code}): ${t.newVol} điểm năng suất | TAT 1H: ${t.tat1h}`)
    .join("
");

  const staffLines = appState.staffContributions
    .map(st => {
      const tot = Number(st.devicePts || 0) + Number(st.accPts || 0) + Number(st.carePts || 0);
      return `- ${st.name}: ${tot.toFixed(1)} điểm (Máy: ${st.devicePts}, PK/IoT: ${st.accPts}, Care/MDCL: ${st.carePts}) | Doanh thu: ${formatVND(st.revenue)}`;
    })
    .join("
");

  const summary = `📊 BÁO CÁO VẬN HÀNH - ${appState.shopName.toUpperCase()}
Mã trạm: ${appState.scCode} | Cập nhật: ${appState.lastUpdated}
--------------------------------------------------
1. KẾT QUẢ BÁN HÀNG (BRANDSHOP):
- Tổng điểm: ${totalActual} / ${totalTarget} điểm (Đạt ${pct}%)
${salesLines}

2. ĐÁNH GIÁ KPI SERVICE 2025 (TAT):
- TAT 1H: ${s.tat1hRate}% | TAT-KS 1H: ${s.tatKs1hRate}% | TAT 24H: ${s.tat24hRate}% | TAT 72H: ${s.tat72hRate}%
- Tổng phiếu: ${s.volumeTotal} phiếu | NPS: ${s.npsRate}% | Tỷ lệ hủy: ${s.cancelRate}%

3. ĐÓNG GÓP DOANH SỐ & ĐIỂM BÁN HÀNG THEO NHÂN SỰ (GCSM SO + CENTER SO):
${staffLines}

4. NĂNG SUẤT 2 KỸ THUẬT VIÊN:
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
