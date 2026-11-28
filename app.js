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
    volumeNew: 316.5,
    techProductivity: 158.25,
    afterSale: 190,
    customerRel: 86,
    saleOrder: 161,
    simpleService: 9,
    cancelCount: 19,
    cancelRate: 4.26,
    tat1hRate: 99.44,
    npsRate: 17.86,
    diagReq: 279,
    diagDone: 277,
    klCount: 150,
    dlCount: 100,
    filmTotal: 161,
    filmRate: 36.1
  },
  technicians: [
    { name: "PHAN CHÍ TRUNG", code: "D70979015", repairNormal: 183, addonNormal: 45.5, soNormal: 70, soFindN: 4, newVol: 302.5, tat1h: "98.63%" },
    { name: "ĐOÀN MINH HÙNG", code: "D24248811", repairNormal: 6, addonNormal: 1.5, soNormal: 7, soFindN: 0, newVol: 14.5, tat1h: "100%" }
  ]
};

const STORAGE_KEY = "oppo_tg_dashboard_state_v1";
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
  document.getElementById("valServiceVol").textContent = s.volumeNew;
  document.getElementById("valTotalTickets").textContent = s.volumeTotal;
  document.getElementById("valTechProd").textContent = s.techProductivity;
  document.getElementById("valTat1h").textContent = `${s.tat1hRate}%`;
  document.getElementById("valNps").textContent = `${s.npsRate}%`;
  document.getElementById("valDiagDone").textContent = s.diagDone;
  document.getElementById("valDiagReq").textContent = s.diagReq;
  document.getElementById("valCancelRate").textContent = `${s.cancelRate}%`;
  document.getElementById("valKL").textContent = `${s.klCount} (${((s.klCount / (s.klCount + s.dlCount || 1)) * 100).toFixed(0)}%)`;
  document.getElementById("valDL").textContent = `${s.dlCount} (${((s.dlCount / (s.klCount + s.dlCount || 1)) * 100).toFixed(0)}%)`;
  document.getElementById("valFilm").textContent = `${s.filmTotal} phiếu (${s.filmRate}%)`;

  renderSalesTable();
  renderTechTable();
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
      <td class="num"><strong style="color:#10b981">${t.newVol}</strong></td>
      <td class="num">${t.tat1h}</td>
    `;
    tbody.appendChild(tr);
  });
}

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
        }
        if (techs.length > 0) appState.technicians = techs;
      }

      if (workbook.Sheets["KPI-SC"]) {
        const kpiRows = XLSX.utils.sheet_to_json(workbook.Sheets["KPI-SC"], { header: 1 });
        const d = kpiRows[3];
        if (d) {
          appState.scCode = d[1] || appState.scCode;
          appState.service.volumeNew = Number(d[6]) || appState.service.volumeNew;
          appState.service.techProductivity = Number(d[8]) || appState.service.techProductivity;
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
          appState.service.diagReq = Number(d[82]) || appState.service.diagReq;
          appState.service.diagDone = Number(d[83]) || appState.service.diagDone;
        }
      }

      const now = new Date();
      appState.lastUpdated = `${file.name} (${now.toLocaleTimeString("vi-VN")} - ${now.toLocaleDateString("vi-VN")})`;
      saveState();
      renderDashboard();
      alert("✅ Đã cập nhật & lưu trữ dữ liệu từ file: " + file.name);
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi đọc file Excel. Vui lòng đảm bảo đúng định dạng file báo cáo OPPO!");
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
    .map(t => `- ${t.name} (${t.code}): ${t.newVol} điểm năng suất`)
    .join("\n");

  const summary = `📊 BÁO CÁO VẬN HÀNH - ${appState.shopName.toUpperCase()}
Mã trạm: ${appState.scCode} | Nguồn: ${appState.lastUpdated}
--------------------------------------------------
1. KẾT QUẢ BÁN HÀNG (BRANDSHOP):
- Tổng điểm: ${totalActual} / ${totalTarget} điểm (Đạt ${pct}%)
${salesLines}

2. CHỈ SỐ DỊCH VỤ & KPI TRẠM (SERVICE):
- Tổng Volume: ${s.volumeTotal} phiếu | Volume năng suất mới: ${s.volumeNew} điểm
- Năng suất bình quân/KTV: ${s.techProductivity} điểm
- TAT 1H sửa chữa: ${s.tat1hRate}% | Chẩn đoán sau SC: ${s.diagDone}/${s.diagReq} ca
- Tỷ lệ Khách lẻ / Đại lý: ${s.klCount} KL / ${s.dlCount} ĐL | Dán MH: ${s.filmTotal} phiếu

3. NĂNG SUẤT KỸ THUẬT VIÊN:
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
