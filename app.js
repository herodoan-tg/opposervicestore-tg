const DEFAULT_DATA = {
  shopName: "OPPO Experience & Service Store Tiền Giang",
  scCode: "VN001034",
  lastUpdated: "Dữ liệu gốc T11/2026 (27/11/2026)",
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
  // Yêu cầu 4: Chỉ tập trung vào đúng 2 nhân viên kỹ thuật
  technicians: [
    { name: "PHAN CHÍ TRUNG", code: "D70979015", repairNormal: 183, addonNormal: 45.5, soNormal: 70, soFindN: 4, newVol: 302.5, tat1h: "98.63%" },
    { name: "ĐOÀN MINH HÙNG", code: "D24248811", repairNormal: 6, addonNormal: 1.5, soNormal: 7, soFindN: 0, newVol: 14.5, tat1h: "100%" }
  ],
  // Yêu cầu 5: Đánh giá Đóng Góp Doanh Số & Điểm Bán Hàng Theo Nhân Sự
  staffContributions: [
    { name: "NGUYỄN THỊ THANH THẢO", role: "Tư vấn bán hàng (PB)", code: "PB0010341", devicePts: 54, accPts: 18, carePts: 42, targetPts: 95 },
    { name: "TRẦN MINH KHANG", role: "Tư vấn bán hàng (PB)", code: "PB0010342", devicePts: 47, accPts: 14, carePts: 36, targetPts: 90 }
  ],
  // Yêu cầu 3: Chi tiết doanh số sản phẩm
  productDetails: [
    { sku: "CPH2659", name: "OPPO Reno12 F 5G (8GB/256GB)", category: "PHONE", qty: 38, pointRate: 1.0, revenue: 360620000 },
    { sku: "CPH2669", name: "OPPO A3x (4GB/128GB)", category: "PHONE", qty: 42, pointRate: 1.0, revenue: 167580000 },
    { sku: "CPH2639", name: "OPPO Reno12 5G (12GB/256GB)", category: "PHONE", qty: 21, pointRate: 1.0, revenue: 272790000 },
    { sku: "ETE51", name: "OPPO Enco Buds2 Pro", category: "TAI NGHE", qty: 10, pointRate: 1.0, revenue: 7900000 },
    { sku: "OP-CASE-R12", name: "Ốp lưng chính hãng OPPO Series", category: "ỐP LƯNG", qty: 12, pointRate: 1.0, revenue: 3480000 },
    { sku: "OCARE-12M", name: "Gói bảo hành mở rộng / Rơi vỡ Oppo Care", category: "Oppo Care", qty: 24, pointRate: 1.0, revenue: 19200000 },
    { sku: "MDCL-UV", name: "Miếng dán cường lực / Film PPF chính hãng", category: "MDCL", qty: 54, pointRate: 1.0, revenue: 8100000 },
    { sku: "PB-VOOC-10K", name: "Sạc dự phòng OPPO SuperVOOC 10.000mAh", category: "Sạc dự phòng", qty: 10, pointRate: 1.0, revenue: 8900000 }
  ],
  // Yêu cầu 2: Chi tiết đơn hàng
  orderDetails: [
    { id: "SO261127001", time: "27/11/2026 16:45", type: "Bán máy & Care", product: "OPPO Reno12 5G + Oppo Care 12T", staff: "NGUYỄN THỊ THANH THẢO", points: 2, amount: 13790000, status: "Hoàn thành" },
    { id: "SO261127002", time: "27/11/2026 15:20", type: "Bán phụ kiện", product: "Tai nghe OPPO Enco Buds2 Pro + MDCL", staff: "TRẦN MINH KHANG", points: 2, amount: 940000, status: "Hoàn thành" },
    { id: "SO261127003", time: "27/11/2026 14:10", type: "Bán máy", product: "OPPO A3x (4GB/128GB)", staff: "NGUYỄN THỊ THANH THẢO", points: 1, amount: 3990000, status: "Hoàn thành" },
    { id: "SO261127004", time: "27/11/2026 11:35", type: "Dịch vụ SO", product: "Dán màn hình MDCL + Ốp lưng Reno12 F", staff: "PHAN CHÍ TRUNG", points: 2, amount: 440000, status: "Hoàn thành" },
    { id: "SO261127005", time: "27/11/2026 10:15", type: "Bán phụ kiện", product: "Sạc dự phòng SuperVOOC 10.000mAh", staff: "TRẦN MINH KHANG", points: 1, amount: 890000, status: "Hoàn thành" },
    { id: "SO261126018", time: "26/11/2026 17:05", type: "Bán máy", product: "OPPO Reno12 F 5G (8GB/256GB)", staff: "TRẦN MINH KHANG", points: 1, amount: 9490000, status: "Hoàn thành" },
    { id: "SO261126014", time: "26/11/2026 15:50", type: "Dịch vụ SO", product: "Gói Oppo Care+ Rơi vỡ màn hình", staff: "NGUYỄN THỊ THANH THẢO", points: 1, amount: 800000, status: "Đang xử lý" },
    { id: "SO261126009", time: "26/11/2026 09:30", type: "Bán phụ kiện", product: "Miếng dán cường lực chống nhìn trộm", staff: "ĐOÀN MINH HÙNG", points: 0, amount: 200000, status: "Đã hủy" }
  ]
};

const STORAGE_KEY = "oppo_tg_dashboard_state_v2";
let appState = loadState();
let salesChartInstance = null;
let serviceMixChartInstance = null;

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn("Không đọc được LocalStorage:", e);
  }
  return structuredClone(DEFAULT_DATA);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

function formatVND(val) {
  return Number(val || 0).toLocaleString("vi-VN") + " đ";
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

// Yêu cầu 4: Chỉ hiển thị tối đa 2 nhân viên kỹ thuật
function renderTechTable() {
  const tbody = document.querySelector("#techTable tbody");
  tbody.innerHTML = "";
  const twoTechs = appState.technicians.slice(0, 2);

  twoTechs.forEach(t => {
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

// Yêu cầu 5: Bảng Đánh giá Đóng Góp Doanh Số & Điểm Bán Hàng Theo Nhân Sự
function renderStaffContributionTable() {
  const tbody = document.querySelector("#staffContributionTable tbody");
  tbody.innerHTML = "";

  const staffList = appState.staffContributions.map(st => {
    const total = Number(st.devicePts || 0) + Number(st.accPts || 0) + Number(st.carePts || 0);
    return { ...st, total };
  });

  const grandTotal = staffList.reduce((acc, s) => acc + s.total, 0);
  document.getElementById("staffTotalBadge").textContent = `Tổng điểm quy đổi: ${grandTotal} điểm`;

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
      <td class="num">x${p.pointRate}</td>
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
    <td class="num"><strong style="color:#10b981">${sumPts}</strong></td>
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
      o.id.toLowerCase().includes(keyword) ||
      o.product.toLowerCase().includes(keyword) ||
      o.staff.toLowerCase().includes(keyword) ||
      o.type.toLowerCase().includes(keyword);
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

// Upload Excel (.xlsx) & bóc tách tự động
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

        // Lấy đúng 2 KTV từ sheet Tổng hợp
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

      // Hỗ trợ đọc thêm sheet tùy chọn nếu file Excel có sẵn: "DonHang", "SanPham", "NhanSu"
      if (workbook.Sheets["SanPham"]) {
        const spRows = XLSX.utils.sheet_to_json(workbook.Sheets["SanPham"]);
        if (spRows.length > 0) {
          appState.productDetails = spRows.map(r => ({
            sku: r["SKU"] || r["Mã SP"] || "N/A",
            name: r["Tên sản phẩm"] || r["Product"] || "",
            category: r["Nhóm hàng"] || r["Category"] || "Khác",
            qty: Number(r["Số lượng"] || r["Qty"] || 0),
            pointRate: Number(r["Hệ số"] || r["Rate"] || 1),
            revenue: Number(r["Doanh thu"] || r["Revenue"] || 0)
          }));
        }
      }

      if (workbook.Sheets["DonHang"]) {
        const dhRows = XLSX.utils.sheet_to_json(workbook.Sheets["DonHang"]);
        if (dhRows.length > 0) {
          appState.orderDetails = dhRows.map(r => ({
            id: r["Mã đơn"] || r["Order ID"] || "",
            time: r["Ngày giờ"] || r["Time"] || "",
            type: r["Loại giao dịch"] || r["Type"] || "Bán hàng",
            product: r["Sản phẩm"] || r["Product"] || "",
            staff: r["Nhân viên"] || r["Staff"] || "",
            points: Number(r["Điểm"] || r["Points"] || 0),
            amount: Number(r["Giá trị"] || r["Amount"] || 0),
            status: r["Trạng thái"] || r["Status"] || "Hoàn thành"
          }));
        }
      }

      if (workbook.Sheets["NhanSu"]) {
        const nsRows = XLSX.utils.sheet_to_json(workbook.Sheets["NhanSu"]);
        if (nsRows.length > 0) {
          appState.staffContributions = nsRows.map(r => ({
            name: r["Họ tên"] || r["Name"] || "",
            role: r["Chức danh"] || r["Role"] || "Tư vấn bán hàng",
            code: r["Mã NV"] || r["Code"] || "",
            devicePts: Number(r["Điểm máy"] || 0),
            accPts: Number(r["Điểm phụ kiện"] || 0),
            carePts: Number(r["Điểm Care/MDCL"] || 0),
            targetPts: Number(r["Target"] || 90)
          }));
        }
      }

      const now = new Date();
      appState.lastUpdated = `${file.name} (${now.toLocaleTimeString("vi-VN")} - ${now.toLocaleDateString("vi-VN")})`;
      saveState();
      renderDashboard();
      alert("✅ Đã cập nhật & lưu trữ dữ liệu từ file: " + file.name);
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi đọc file Excel. Vui lòng kiểm tra lại định dạng file!");
    }
  };
  reader.readAsArrayBuffer(file);
});

// Modal Target
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
  saveState();
  renderDashboard();
  targetModal.classList.add("hidden");
});

document.getElementById("btnResetDefault").addEventListener("click", () => {
  if (confirm("Khôi phục toàn bộ dữ liệu & Target về mặc định ban đầu?")) {
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
      return `- ${st.name}: ${tot} điểm (Máy: ${st.devicePts}, PK: ${st.accPts}, Care/MDCL: ${st.carePts})`;
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
