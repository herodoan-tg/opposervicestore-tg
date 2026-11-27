import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Upload } from 'lucide-react';

// Dữ liệu mặc định ban đầu (khớp với file Tổng Hợp Sale V1.4.xlsx)
const DEFAULT_DATA = {
  regionTitle: 'Miền Tây 1',
  reportPeriod: 'THÁNG 11 NĂM 2026',
  fileName: 'Tổng Hợp Sale V1.4.xlsx',
  updatedAt: 'Chưa tải file mới (Đang hiển thị dữ liệu mẫu)',
  shops: [
    {
      name: 'OPPO Experience & Service Store Tiền Giang',
      totalTarget: 176,
      totalActual: 157,
      categories: {
        PHONE: { target: 68, actual: 75 },
        'TAI NGHE': { target: 6, actual: 10 },
        PAD: { target: 4, actual: 0 },
        WATCH: { target: 0, actual: 0 },
        'ỐP LƯNG': { target: 9, actual: 6 },
        'OPPO CARE': { target: 20, actual: 20 },
        'MIẾNG DÁN CÓ PHÍ': { target: 64, actual: 38 },
        'SẠC DỰ PHÒNG': { target: 6, actual: 8 },
      },
    },
  ],
};

// Thứ tự 8 nhóm sản phẩm hiển thị trên giao diện
const PRODUCT_GROUPS = [
  'PHONE',
  'TAI NGHE',
  'PAD',
  'WATCH',
  'ỐP LƯNG',
  'OPPO CARE',
  'MIẾNG DÁN CÓ PHÒNG'.replace('PHÒNG', 'PHÍ'),
  'SẠC DỰ PHÒNG',
];

// Ánh xạ tên cột trong sheet "Tổng hợp" sang chuẩn hiển thị
const HEADER_ALIASES = {
  'TỔNG ĐIỂM': 'TOTAL',
  'PHONE': 'PHONE',
  'TAI NGHE': 'TAI NGHE',
  'PAD': 'PAD',
  'WATCH': 'WATCH',
  'ỐP LƯNG': 'ỐP LƯNG',
  'OPPO CARE': 'OPPO CARE',
  'MDCL': 'MIẾNG DÁN CÓ PHÍ',
  'MIẾNG DÁN CÓ PHÍ': 'MIẾNG DÁN CÓ PHÍ',
  'SẠC DỰ PHÒNG': 'SẠC DỰ PHÒNG',
};

export default function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('oppo_sale_dashboard_v1');
    return saved ? JSON.parse(saved) : DEFAULT_DATA;
  });
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('oppo_sale_dashboard_v1', JSON.stringify(data));
  }, [data]);

  const formatTimestamp = () => {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMsg('');

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const workbook = XLSX.read(bstr, { type: 'binary' });

        // Ưu tiên đọc sheet "Tổng hợp", nếu không có thì lấy sheet đầu tiên
        const sheetName = workbook.SheetNames.includes('Tổng hợp')
          ? 'Tổng hợp'
          : workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null });

        // Tìm dòng tiêu đề chứa chữ "Shop name" hoặc "TỔNG ĐIỂM"
        let headerRowIdx = -1;
        for (let i = 0; i < Math.min(rows.length, 15); i++) {
          const rowStr = (rows[i] || []).map((c) => String(c || '').trim().toUpperCase());
          if (rowStr.includes('SHOP NAME') || rowStr.includes('TỔNG ĐIỂM')) {
            headerRowIdx = i;
            break;
          }
        }

        if (headerRowIdx === -1) {
          throw new Error('Không tìm thấy dòng tiêu đề ("Shop name" / "TỔNG ĐIỂM") trong sheet Tổng hợp.');
        }

        const headerRow = rows[headerRowIdx];
        // Xác định vị trí cột của từng nhóm (mỗi nhóm gồm 3 cột liên tiếp: Chỉ tiêu | Điểm | %)
        const colMap = {};
        headerRow.forEach((cell, idx) => {
          const cleanName = String(cell || '').trim().toUpperCase();
          if (HEADER_ALIASES[cleanName]) {
            colMap[HEADER_ALIASES[cleanName]] = idx;
          }
        });

        const parsedShops = [];
        for (let r = headerRowIdx + 1; r < rows.length; r++) {
          const row = rows[r];
          if (!row) continue;
          const shopName = String(row[0] || '').trim();

          // Dừng lại nếu gặp phần bảng "Tuần 1", "Tuần 2"... phía dưới
          if (/^TUẦN\s*\d+/i.test(shopName)) break;

          // Bỏ qua dòng trống hoặc dòng tổng tỷ lệ % phía dưới tên shop
          if (!shopName || shopName.toUpperCase() === 'TOTAL' || shopName.toUpperCase() === 'TỔNG') continue;

          const totalCol = colMap['TOTAL'] ?? 1;
          const totalTarget = Number(row[totalCol]) || 0;
          const totalActual = Number(row[totalCol + 1]) || 0;

          const categories = {};
          PRODUCT_GROUPS.forEach((group) => {
            const cIdx = colMap[group];
            if (cIdx !== undefined) {
              categories[group] = {
                target: Number(row[cIdx]) || 0,
                actual: Number(row[cIdx + 1]) || 0,
              };
            } else {
              categories[group] = { target: 0, actual: 0 };
            }
          });

          parsedShops.push({
            name: shopName,
            totalTarget,
            totalActual,
            categories,
          });
        }

        if (parsedShops.length === 0) {
          throw new Error('Không đọc được dữ liệu cửa hàng nào từ file Excel.');
        }

        // Lấy tháng/năm hiện tại hoặc giữ kỳ báo cáo
        const now = new Date();
        const periodText = `THÁNG ${now.getMonth() + 1} NĂM ${now.getFullYear()}`;

        setData({
          regionTitle: parsedShops.length > 1 ? 'Miền Tây 1' : 'OPPO Store Dashboard',
          reportPeriod: periodText,
          fileName: file.name,
          updatedAt: formatTimestamp(),
          shops: parsedShops,
        });
      } catch (err) {
        setErrorMsg(err.message || 'Lỗi khi đọc file Excel. Vui lòng kiểm tra định dạng file.');
      } finally {
        e.target.value = '';
      }
    };
    reader.readAsBinaryString(file);
  };

  // Tổng hợp số liệu toàn bộ các shop
  const totalKPI = data.shops.reduce((sum, s) => sum + s.totalTarget, 0);
  const totalAchieved = data.shops.reduce((sum, s) => sum + s.totalActual, 0);
  const completionPct = totalKPI > 0 ? ((totalAchieved / totalKPI) * 100).toFixed(1) : '0.0';

  const aggregatedCategories = PRODUCT_GROUPS.map((group) => {
    const target = data.shops.reduce((sum, s) => sum + (s.categories[group]?.target || 0), 0);
    const actual = data.shops.reduce((sum, s) => sum + (s.categories[group]?.actual || 0), 0);
    const pct = target > 0 ? ((actual / target) * 100).toFixed(1) : '0.0';
    return { name: group, target, actual, pct: Number(pct) };
  });

  // Xếp hạng cửa hàng theo % hoàn thành giảm dần
  const rankedShops = [...data.shops]
    .map((s) => {
      const pct = s.totalTarget > 0 ? (s.totalActual / s.totalTarget) * 100 : 0;
      return { ...s, pct };
    })
    .sort((a, b) => b.pct - a.pct);

  return (
    <div className="min-h-screen bg-[#F6F9F8] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Tiêu đề vùng */}
        <h1 className="text-center text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {data.regionTitle}
        </h1>

        {/* Thanh thương hiệu & nút tải file */}
        <div className="bg-gradient-to-r from-[#EAF5F0] via-white to-white rounded-2xl border border-emerald-100/80 shadow-sm px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="text-2xl font-black tracking-[0.18em] text-[#044735]">
              OPPO
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 tracking-wide mt-0.5">
              Experience & Service Store
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="text-right">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                KỲ BÁO CÁO
              </div>
              <div className="text-sm font-bold text-slate-800 mt-0.5">
                {data.reportPeriod}
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 bg-[#047857] hover:bg-[#065F46] active:scale-[0.99] text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Tải file Excel</span>
            </button>
          </div>
        </div>

        {/* Tiêu đề Sales Overview */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Sales Overview</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Theo dõi hiệu quả kinh doanh và tiến độ KPI toàn hệ thống
            </p>
          </div>
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
        </div>

        {/* Thanh trạng thái file */}
        <div className="bg-[#EAF5F0]/80 border border-emerald-200/70 rounded-xl py-2.5 px-4 text-center text-xs sm:text-sm text-slate-600">
          File: <span className="font-semibold text-slate-800">{data.fileName}</span> · Cập nhật:{' '}
          <span className="font-medium">{data.updatedAt}</span>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
            {errorMsg}
          </div>
        )}

        {/* 4 thẻ KPI tổng quan */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          <div className="p-6 text-center">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              TOTAL KPI
            </div>
            <div className="text-3xl font-extrabold text-slate-900 mt-2">
              {totalKPI.toLocaleString('vi-VN')}
            </div>
            <div className="text-xs text-slate-400 mt-1">Chỉ tiêu</div>
          </div>

          <div className="p-6 text-center">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              ACHIEVED
            </div>
            <div className="text-3xl font-extrabold text-slate-900 mt-2">
              {totalAchieved.toLocaleString('vi-VN')}
            </div>
            <div className="text-xs text-slate-400 mt-1">Điểm thực tế</div>
          </div>

          <div className="p-6 text-center">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              COMPLETION
            </div>
            <div className="text-3xl font-extrabold text-[#047857] mt-2">
              {completionPct}%
            </div>
            <div className="text-xs text-slate-400 mt-1">Tỷ lệ hoàn thành</div>
          </div>

          <div className="p-6 text-center">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              ACTIVE SHOPS
            </div>
            <div className="text-3xl font-extrabold text-slate-900 mt-2">
              {data.shops.length}
            </div>
            <div className="text-xs text-slate-400 mt-1">Shop trong báo cáo</div>
          </div>
        </div>

        {/* Khu vực chi tiết 2 cột: 01 / PRODUCT MIX & 02 / STORE PERFORMANCE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Cột trái: Product Mix (7 phần) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  01 / PRODUCT MIX
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  Hiệu suất theo sản phẩm
                </h3>
              </div>
              <span className="bg-slate-100 text-slate-600 text-[11px] font-bold px-2.5 py-1 rounded-md">
                {PRODUCT_GROUPS.length} NHÓM KPI
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {aggregatedCategories.map((cat) => (
                <div
                  key={cat.name}
                  className="rounded-xl border border-slate-100 bg-[#FAFBFB] p-4 text-center hover:border-emerald-200 transition"
                >
                  <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500 truncate">
                    {cat.name}
                  </div>
                  <div
                    className={`text-xl sm:text-2xl font-extrabold mt-2.5 ${
                      cat.pct >= 100
                        ? 'text-[#047857]'
                        : cat.pct > 0
                        ? 'text-emerald-600'
                        : 'text-slate-400'
                    }`}
                  >
                    {cat.pct.toFixed(1)}%
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2">
                    {cat.actual} / {cat.target} điểm
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cột phải: Store Performance (5 phần) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  02 / STORE PERFORMANCE
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  Xếp hạng cửa hàng
                </h3>
              </div>
              <span className="bg-slate-100 text-slate-600 text-[11px] font-bold px-2.5 py-1 rounded-md">
                {rankedShops.length} SHOP
              </span>
            </div>

            <div className="space-y-4">
              {rankedShops.map((shop, index) => {
                const barWidth = Math.min(shop.pct, 100);
                return (
                  <div key={shop.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xs font-semibold text-slate-400 w-5 shrink-0">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="font-semibold text-slate-800 truncate">
                          {shop.name}
                        </span>
                      </div>
                      <span className="font-bold text-slate-900 shrink-0">
                        {shop.pct.toFixed(1)}%
                      </span>
                    </div>

                    <div className="pl-7">
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#047857] rounded-full transition-all duration-500"
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}