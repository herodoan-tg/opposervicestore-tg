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

const STORAGE_KEY = "oppo_tg_dashboard_state_v6";
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
    const legacy = JSON.parse(localStorage.getItem("oppo_tg_dashboard_state_v5") || "null");
    const clean = emptyImportedState(getTargetOverrides());
    if (legacy && Array.isArray(legacy.sales)) {
      clean.sales.forEach(item => {
        const old = legacy.sales.find(x => x.category === item.category);
        if (!Object.prototype.hasOwnProperty.call(getTargetOverrides(), item.category) && old) {
          item.target = Number(old.target) || 0;
        }
      });
    }
    return clean;
  } catch (e) {
    console.warn("Không đọc được LocalStorage:", e);
    return emptyImportedState(getTargetOverrides());
  }
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
  document.getElementById("tat1hMain").textContent = s.tat1hRate == null ? "N/A" : `${Number(s.tat1hRate).toFixed(2)}%`;
  document.getElementById("tatKs1h").textContent = s.tatKs1hRate == null ? "N/A" : `${Number(s.tatKs1hRate).toFixed(2)}%`;
  document.getElementById("tat24h").textContent = s.tat24hRate == null ? "N/A" : `${Number(s.tat24hRate).toFixed(2)}%`;
  document.getElementById("tat72h").textContent = s.tat72hRate == null ? "N/A" : `${Number(s.tat72hRate).toFixed(2)}%`;
  document.getElementById("valTotalTickets").textContent = s.volumeTotal;
  document.getElementById("lblChartTickets").textContent = s.volumeTotal;
  document.getElementById("valNps").textContent = s.npsRate == null ? "N/A" : `${s.npsRate}%`;
  document.getElementById("valCancelRate").textContent = s.cancelRate == null ? "N/A" : `${Number(s.cancelRate).toFixed(2)}%`;
  document.getElementById("valKL").textContent = `${s.klCount} (${((s.klCount / (s.klCount + s.dlCount || 1)) * 100).toFixed(0)}%)`;
  document.getElementById("valDL").textContent = `${s.dlCount} (${((s.dlCount / (s.klCount + s.dlCount || 1)) * 100).toFixed(0)}%)`;
  document.getElementById("valFilm").textContent = `${s.filmTotal} phiếu (${Number(s.filmRate || 0).toFixed(1)}%)`;

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
    const pctNum = r.pct == null ? null : Number(r.pct);
    let badgeHtml = `<span class="badge">${r.note || "Đạt"}</span>`;
    if (pctNum !== null && pctNum < 80 && !String(r.item || "").toLowerCase().includes("hủy")) {
      badgeHtml = `<span class="badge badge-warn">${r.note || "Cần đẩy mạnh"}</span>`;
    }

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${r.item}</strong></td>
      <td class="num">${r.target}</td>
      <td class="num"><strong>${r.actual}</strong></td>
      <td class="num"><strong style="color:var(--oppo-green)">${r.score}</strong></td>
      <td class="num">${pctNum === null ? "N/A" : pctNum.toFixed(1) + "%"}</td>
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
  appState.technicians.forEach(t => {
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
// Parser chuẩn cho workbook Tiền Giang - Tổng Hợp Sale V1.4 - T11
function excelNum(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (value === null || value === undefined || value === "") return 0;
  const n = Number(String(value).replace(/[₫đ\s]/gi, "").replace(/,/g, "").trim());
  return Number.isFinite(n) ? n : 0;
}
function excelText(value) {
  return value === null || value === undefined ? "" : String(value).trim();
}
function categoryFrom(rawType, classification, product) {
  const text = [rawType, classification, product].map(excelText).join(" ").toUpperCase();
  if (/\bPHONE\b|\bĐIỆN THOẠI\b/.test(text) || /RENO|FIND X|A[0-9]/.test(text)) return "PHONE";
  if (/\bPAD\b|TABLET|MÁY TÍNH BẢNG/.test(text)) return "PAD";
  if (/TAI NGHE|EARBUD|EARPHONE|HEADPHONE|ENCO/.test(text)) return "TAI NGHE";
  if (/OPPO CARE|WARRANTY|BẢO HÀNH|WARRANTY SERVICE/.test(text)) return "Oppo Care";
  if (/MDCL|MIẾNG DÁN|PROTECTIVE FILM|PAID FILM|SCREEN PROTECT/.test(text)) return "MDCL";
  if (/ỐP|CASE|COVER|PROTECTIVE SHELL|HANDSET PROTECTIVE SHELL/.test(text)) return "ỐP LƯNG";
  if (/SẠC DỰ PHÒNG|POWER BANK/.test(text)) return "Sạc dự phòng";
  if (/WATCH|ĐỒNG HỒ/.test(text)) return "WATCH";
  if (/IOT|PHỤ KIỆN|ACCESSORIES|SPARE PART/.test(text)) return "Phụ kiện & IoT";
  return excelText(rawType) || excelText(classification) || "Khác";
}
function dateLabel(value) {
  if (value instanceof Date) return value.toLocaleString("vi-VN");
  return excelText(value);
}
function cleanStaff(value) {
  const name = normalizeStaffName(value);
  return name === "CHƯA GÁN NHÂN VIÊN" ? name : name.replace(/\s+/g, " ").trim();
}
function getTargetOverrides() {
  try { return JSON.parse(localStorage.getItem("oppo_tg_dashboard_targets_v1") || "{}"); }
  catch (_) { return {}; }
}
function persistTargetOverrides() {
  const values = {};
  appState.sales.forEach(item => { values[item.category] = Number(item.target) || 0; });
  localStorage.setItem("oppo_tg_dashboard_targets_v1", JSON.stringify(values));
}
function emptyImportedState(targets = null) {
  const state = structuredClone(DEFAULT_DATA);
  state.lastUpdated = "Chưa tải dữ liệu – vui lòng upload workbook V1.4";
  state.sales = DEFAULT_DATA.sales.map(item => ({
    category: item.category,
    target: targets && Object.prototype.hasOwnProperty.call(targets, item.category)
      ? Number(targets[item.category]) || 0 : 0,
    actual: 0
  }));
  state.kpiReportRows = [];
  state.service = {
    volumeTotal: 0, afterSale: 0, customerRel: 0, saleOrder: 0, simpleService: 0,
    cancelCount: 0, cancelRate: null, tat1hRate: null, tatKs1hRate: null,
    tat24hRate: null, tat72hRate: null, npsRate: null,
    klCount: 0, dlCount: 0, filmTotal: 0, filmRate: 0
  };
  state.technicians = [];
  state.staffContributions = [];
  state.productDetails = [];
  state.orderDetails = [];
  return state;
}

document.getElementById("excelUpload").addEventListener("change", function (e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (evt) {
    try {
      const workbook = XLSX.read(new Uint8Array(evt.target.result), {
        type: "array", cellDates: true
      });
      const required = ["Tổng hợp", "GCSM SO", "Center SO", "Rule"];
      const missing = required.filter(name => !workbook.Sheets[name]);
      if (missing.length) throw new Error("Thiếu sheet bắt buộc: " + missing.join(", "));

      const savedTargets = getTargetOverrides();
      const next = emptyImportedState(savedTargets);
      const summaryRows = XLSX.utils.sheet_to_json(workbook.Sheets["Tổng hợp"], {
        header: 1, defval: null
      });
      const summary = summaryRows[2] || [];
      next.shopName = excelText(summary[0]) || next.shopName;
      next.scCode = "VN001034";

      // Doanh số/điểm thực đạt lấy từ đúng dòng tổng hợp shop.
      const salesCols = [
        ["PHONE", 4, 5], ["TAI NGHE", 7, 8], ["PAD", 10, 11],
        ["ỐP LƯNG", 13, 14], ["Oppo Care", 16, 17], ["MDCL", 19, 20],
        ["Sạc dự phòng", 22, 23], ["WATCH", 26, 27]
      ];
      next.sales = salesCols.map(([category, targetCol, actualCol]) => ({
        category,
        target: Object.prototype.hasOwnProperty.call(savedTargets, category)
          ? Number(savedTargets[category]) || 0 : excelNum(summary[targetCol]),
        actual: excelNum(summary[actualCol])
      }));
      next.salesTotal = { target: excelNum(summary[1]), actual: excelNum(summary[2]) };
      next.baseTargets = Object.fromEntries(salesCols.map(([category, targetCol]) =>
        [category, excelNum(summary[targetCol])]
      ));

      // Kỹ thuật viên: Tổng hợp!C:K, dữ liệu bắt đầu dòng 12 (index 11).
      next.technicians = [];
      for (let r = 11; r < summaryRows.length; r++) {
        const row = summaryRows[r] || [];
        const code = excelText(row[2]);
        const name = excelText(row[3]);
        if (!code || !name) continue;
        next.technicians.push({
          code, name: cleanStaff(name),
          findFold: excelNum(row[4]), machineStraight: excelNum(row[5]),
          repairNormal: excelNum(row[6]), addonNormal: excelNum(row[7]),
          soFindN: excelNum(row[8]), soNormal: excelNum(row[9]),
          newVol: excelNum(row[10]), tat1h: "N/A"
        });
      }

      // KPI报表: đúng vùng B32:G37 của sheet Tổng hợp.
      next.kpiReportRows = [];
      for (let r = 31; r < Math.min(summaryRows.length, 40); r++) {
        const row = summaryRows[r] || [];
        const item = excelText(row[1]);
        if (!item || item.toUpperCase() === "KPI") continue;
        const actual = excelNum(row[3]);
        const target = excelNum(row[4]);
        const pctValue = row[5] === null || row[5] === undefined ? null : excelNum(row[5]);
        const pct = pctValue === null ? null : (pctValue <= 2 ? pctValue * 100 : pctValue);
        next.kpiReportRows.push({
          item, target, actual, score: actual, pct,
          note: excelText(row[6]) || (pct === null ? "Chưa có dữ liệu" : (pct >= 100 ? "ĐẠT" : "CHƯA ĐẠT"))
        });
      }

      // Các chỉ số dịch vụ chỉ đọc trường có thật trong sheet Tổng hợp.
      const tatRow = summaryRows[23] || [];
      const customerMix = summaryRows[18] || [];
      next.service.tatKs1hRate = tatRow[1] == null ? null : excelNum(tatRow[1]) * 100;
      next.service.tat1hRate = tatRow[3] == null ? null : excelNum(tatRow[3]) * 100;
      next.service.klCount = excelNum(customerMix[1]);
      next.service.dlCount = excelNum(customerMix[3]);
      next.service.filmTotal = excelNum(customerMix[5]) + excelNum(customerMix[6]) + excelNum(customerMix[7]);
      next.service.filmRate = excelNum(customerMix[8]) * 100;

      // Bảng Rule dùng để tra điểm và loại hàng khi dòng giao dịch chưa có Type/Điểm.
      const ruleRows = XLSX.utils.sheet_to_json(workbook.Sheets["Rule"], { header: 1, defval: null });
      const ruleMap = new Map();
      for (let r = 1; r < ruleRows.length; r++) {
        const row = ruleRows[r] || [];
        const model = excelText(row[0]);
        if (model) ruleMap.set(model.toLowerCase(), {
          model, points: excelNum(row[1]), category: excelText(row[2])
        });
      }

      const productMap = new Map();
      const staffMap = new Map();
      const orderMap = new Map();

      function ensureStaff(name, source) {
        const staff = cleanStaff(name);
        if (!staffMap.has(staff)) staffMap.set(staff, {
          name: staff, sources: new Set(), orders: new Set(),
          devicePts: 0, accPts: 0, carePts: 0, revenue: 0
        });
        const item = staffMap.get(staff);
        item.sources.add(source);
        return item;
      }
      function addProduct(source, sku, product, category, staffName, qty, points, revenue) {
        const staff = cleanStaff(staffName);
        const name = excelText(product) || "Sản phẩm / Dịch vụ";
        const code = excelText(sku) || "N/A";
        const cat = categoryFrom(category, "", name);
        const key = [source, code, name, cat, staff].join("|");
        if (!productMap.has(key)) productMap.set(key, {
          sku: code, name, category: cat, source, staff, qty: 0, points: 0, revenue: 0
        });
        const p = productMap.get(key);
        p.qty += excelNum(qty);
        p.points += excelNum(points);
        p.revenue += excelNum(revenue);
      }
      function addStaffContribution(source, orderId, staffName, category, points, revenue) {
        const staff = ensureStaff(staffName, source);
        if (orderId) staff.orders.add(String(orderId));
        const cat = categoryFrom(category, "", "");
        const pts = excelNum(points);
        staff.revenue += excelNum(revenue);
        if (cat === "PHONE" || cat === "PAD") staff.devicePts += pts;
        else if (cat === "Oppo Care" || cat === "MDCL") staff.carePts += pts;
        else staff.accPts += pts;
      }
      function addOrderLine(source, orderId, time, type, product, staff, points, amount, status) {
        const id = String(orderId || "");
        if (!id) return;
        if (!orderMap.has(source + "|" + id)) orderMap.set(source + "|" + id, {
          id, source, time: dateLabel(time), type, products: [],
          staff: cleanStaff(staff), points: 0, amount: 0, status: status || "Hoàn thành"
        });
        const order = orderMap.get(source + "|" + id);
        if (product && !order.products.includes(excelText(product))) order.products.push(excelText(product));
        order.points += excelNum(points);
        order.amount += excelNum(amount);
        if (order.staff === "CHƯA GÁN NHÂN VIÊN" && staff) order.staff = cleanStaff(staff);
        if (status === "Đã hủy") order.status = "Đã hủy";
        else if (status && order.status !== "Đã hủy") order.status = status;
      }

      // Center SO: chỉ đọc dòng chi tiết (G=Đơn hàng chi tiết), tránh dòng tổng đơn.
      const centerRows = XLSX.utils.sheet_to_json(workbook.Sheets["Center SO"], {
        header: 1, defval: null
      });
      const centerHeaders = new Map();
      for (let r = 4; r < centerRows.length; r++) {
        const row = centerRows[r] || [];
        const orderId = excelText(row[5]);
        const detailId = excelText(row[6]);
        if (orderId && !detailId) {
          centerHeaders.set(orderId, {
            staff: excelText(row[40]) || excelText(row[42]) || excelText(row[36]),
            amount: excelNum(row[22]),
            time: row[3]
          });
        }
      }
      for (let r = 4; r < centerRows.length; r++) {
        const row = centerRows[r] || [];
        const orderId = excelText(row[6]);
        const exportType = excelText(row[46]);
        const statusRaw = excelText(row[48]);
        if (!orderId || exportType !== "Xuất bán" || (statusRaw && statusRaw !== "Hiệu lực")) continue;

        const product = excelText(row[12]) || excelText(row[70]);
        if (!product) continue;
        const header = centerHeaders.get(orderId) || {};
        const staff = excelText(row[40]) || excelText(row[42]) || header.staff || excelText(row[36]);
        const sku = excelText(row[9]);
        const category = excelText(row[71]) || excelText(row[11]);
        const rule = ruleMap.get(product.toLowerCase()) || ruleMap.get(excelText(row[70]).toLowerCase());
        const points = row[72] !== null && row[72] !== undefined && row[72] !== ""
          ? excelNum(row[72]) : (rule ? rule.points : 0);
        const revenue = excelNum(row[16]); // doanh thu bán lẻ của từng dòng chi tiết
        const qty = excelNum(row[14]);
        const time = row[3] || header.time;
        const cat = categoryFrom(category, "", product);

        addProduct("Center SO", sku, product, cat, staff, qty, points, revenue);
        addStaffContribution("Center SO", orderId, staff, cat, points, revenue);
        addOrderLine("Center SO", orderId, time, "Sale Order (Xuất bán)", product, staff, points, revenue, "Hoàn thành");
      }

      // GCSM SO: AQ=tên sản phẩm, AR=số lượng, AT=mã hàng, BF=Type, BG=Điểm.
      const gcsmRows = XLSX.utils.sheet_to_json(workbook.Sheets["GCSM SO"], {
        header: 1, defval: null
      });
      const gcsmOrderIds = new Set();
      let gcsmCancelled = 0;
      for (let r = 1; r < gcsmRows.length; r++) {
        const row = gcsmRows[r] || [];
        const orderId = excelText(row[0]);
        const product = excelText(row[42]);
        if (!orderId || !product) continue;

        const rawStatus = excelText(row[6]);
        const status = /cancel|hủy/i.test(rawStatus) ? "Đã hủy" :
          (rawStatus === "Completed" ? "Hoàn thành" : (rawStatus || "Hoàn thành"));
        const staff = excelText(row[10]);
        const category = excelText(row[56]) || excelText(row[41]) || excelText(row[40]) || excelText(row[39]);
        const rule = ruleMap.get(product.toLowerCase()) || ruleMap.get(excelText(row[48]).toLowerCase());
        const points = row[57] !== null && row[57] !== undefined && row[57] !== ""
          ? excelNum(row[57]) : (rule ? rule.points : 0);
        const revenue = status === "Đã hủy" ? 0 : excelNum(row[28]);
        const qty = excelNum(row[43]);
        const time = row[12] || row[11];
        const type = "Service Ticket (" + (excelText(row[34]) || category || "GCSM") + ")";

        gcsmOrderIds.add(orderId);
        if (status === "Đã hủy") gcsmCancelled++;
        if (status !== "Đã hủy") {
          addProduct("GCSM SO", row[45], product, category, staff, qty, points, revenue);
          addStaffContribution("GCSM SO", orderId, staff, category, points, revenue);
        }
        addOrderLine("GCSM SO", orderId, time, type, product, staff,
          status === "Đã hủy" ? 0 : points, revenue, status);
      }

      next.productDetails = Array.from(productMap.values())
        .sort((a, b) => b.points - a.points || b.revenue - a.revenue);
      next.staffContributions = Array.from(staffMap.values()).map(st => ({
        name: st.name, sources: Array.from(st.sources), orderCount: st.orders.size,
        devicePts: Number(st.devicePts.toFixed(2)),
        accPts: Number(st.accPts.toFixed(2)),
        carePts: Number(st.carePts.toFixed(2)),
        revenue: Math.round(st.revenue)
      })).sort((a, b) =>
        (b.devicePts + b.accPts + b.carePts) - (a.devicePts + a.accPts + a.carePts)
      );
      next.orderDetails = Array.from(orderMap.values()).map(order => ({
        ...order, product: order.products.join(" + ")
      })).sort((a, b) => String(b.time).localeCompare(String(a.time)));

      next.service.volumeTotal = gcsmOrderIds.size;
      next.service.cancelCount = gcsmCancelled;
      next.service.cancelRate = gcsmOrderIds.size ? gcsmCancelled / gcsmOrderIds.size * 100 : null;
      next.service.saleOrder = next.orderDetails.filter(o => o.source === "Center SO").length;
      next.service.afterSale = next.orderDetails.filter(o => o.source === "GCSM SO").length;
      next.service.customerRel = 0;
      next.service.simpleService = 0;

      next.lastUpdated = "Đã tải " + file.name + " • " + new Date().toLocaleString("vi-VN");
      next.importMeta = {
        fileName: file.name, importedAt: new Date().toISOString(),
        gcsmRows: Math.max(0, gcsmRows.length - 1),
        centerRows: Math.max(0, centerRows.length - 4),
        orderCount: next.orderDetails.length,
        productCount: next.productDetails.length,
        staffCount: next.staffContributions.length,
        kpiRows: next.kpiReportRows.length
      };

      appState = next;
      saveState("Đồng bộ Excel V1.4");
      renderDashboard();
      alert(
        "Đã đồng bộ dữ liệu từ " + file.name +
        "\nĐơn hàng/phiếu: " + next.orderDetails.length +
        "\nSản phẩm: " + next.productDetails.length +
        "\nNhân viên: " + next.staffContributions.length +
        "\nDòng KPI báo cáo: " + next.kpiReportRows.length
      );
    } catch (err) {
      console.error("Lỗi import workbook:", err);
      alert("Không thể đọc workbook: " + (err && err.message ? err.message : "Lỗi không xác định") +
        "\nDữ liệu hiện tại được giữ nguyên.");
    } finally {
      e.target.value = "";
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
    appState.sales[idx].target = Math.max(0, Number(inp.value) || 0);
  });
  persistTargetOverrides();
  saveState("Đã lưu Target chỉnh sửa gần nhất");
  renderDashboard();
  targetModal.classList.add("hidden");
});

document.getElementById("btnResetDefault").addEventListener("click", () => {
  if (confirm("Khôi phục toàn bộ dữ liệu & Target về bản gốc của file T11?")) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("oppo_tg_dashboard_targets_v1");
    const baselineTargets = appState.baseTargets || {};
    appState = emptyImportedState(null);
    appState.baseTargets = baselineTargets;
    appState.sales.forEach(item => {
      item.target = Number(baselineTargets[item.category]) || 0;
    });
    saveState("Đã xóa Target tùy chỉnh");
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
    .join("\n");

  const techLines = appState.technicians
    .map(t => `- ${t.name} (${t.code}): ${t.newVol} điểm năng suất | TAT 1H: ${t.tat1h}`)
    .join("\n");

  const staffLines = appState.staffContributions
    .map(st => {
      const tot = Number(st.devicePts || 0) + Number(st.accPts || 0) + Number(st.carePts || 0);
      return `- ${st.name}: ${tot.toFixed(1)} điểm (Máy: ${st.devicePts}, PK/IoT: ${st.accPts}, Care/MDCL: ${st.carePts}) | Doanh thu: ${formatVND(st.revenue)}`;
    })
    .join("\n");

  const summary = `📊 BÁO CÁO VẬN HÀNH - ${appState.shopName.toUpperCase()}
Mã trạm: ${appState.scCode} | Cập nhật: ${appState.lastUpdated}
--------------------------------------------------
1. KẾT QUẢ BÁN HÀNG (BRANDSHOP):
- Tổng điểm: ${totalActual} / ${totalTarget} điểm (Đạt ${pct}%)
${salesLines}

2. ĐÁNH GIÁ KPI SERVICE 2025 (TAT):
- TAT 1H: ${s.tat1hRate == null ? "N/A" : s.tat1hRate + "%"} | TAT-KS 1H: ${s.tatKs1hRate == null ? "N/A" : s.tatKs1hRate + "%"} | TAT 24H: ${s.tat24hRate == null ? "N/A" : s.tat24hRate + "%"} | TAT 72H: ${s.tat72hRate == null ? "N/A" : s.tat72hRate + "%"}
- Tổng phiếu: ${s.volumeTotal} phiếu | NPS: ${s.npsRate == null ? "N/A" : s.npsRate + "%"} | Tỷ lệ hủy: ${s.cancelRate == null ? "N/A" : s.cancelRate + "%"}

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
