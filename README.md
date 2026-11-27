# Dashboard Theo Dõi Chỉ Số KPI Khu Vực (KPI-SC) - T11/2026

Gói dữ liệu và giao diện trực quan hóa từ sheet `KPI-SC` (`2026-KPI NEW 5.3.8-TECH-T11 - NEW.xlsx`).

## Cấu trúc thư mục
- `index.html`: Trang web Dashboard tương tác (lọc theo khu vực, loại trạm SC/SRC, biểu đồ NPS và cảnh báo Final TAT).
- `data/kpi_sc_t11.json`: Dữ liệu JSON chuẩn hóa đầy đủ 46 trung tâm (43 SC + 3 SRC) và tổng hợp toàn quốc (`VN`).
- `data/kpi_sc_t11.csv`: Bảng dữ liệu phẳng định dạng CSV (UTF-8 BOM) mở trực tiếp bằng Excel hoặc Google Sheets.

## Hướng dẫn đưa lên GitHub Pages / Vercel
1. Giải nén toàn bộ thư mục này và tải lên repository GitHub của bạn.
2. Trên GitHub, vào **Settings > Pages**, chọn Branch `main` và thư mục `/root`, nhấn **Save** để kích hoạt giao diện web.
