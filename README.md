# OPPO Store Operations Dashboard v3 (VN001034)

Dashboard theo dõi chỉ số bán hàng (Brandshop), hiệu suất nhân sự & dịch vụ sau bán hàng (Service Center) trên nền web tĩnh, đồng bộ dữ liệu thực tế từ file `2026-KPI NEW 5.3.8-TECH-T11 - NEW.xlsx`.

## Tính năng chính (v3)
1. **KPI Tổng Quan Tinh Gọn**: Tập trung vào **Tổng điểm doanh số (211/176 điểm)** và **KPI TAT 1H (99.44%)**, loại bỏ các thẻ phụ không cần thiết.
2. **Chi Tiết Đơn Hàng (`Center SO` & `GCSM SO`)**: Tra cứu mã đơn, ngày giờ, sản phẩm, nhân viên phụ trách, điểm và doanh thu thực thu kèm thanh tìm kiếm và lọc trạng thái.
3. **Chi Tiết Doanh Số Sản Phẩm**: Tổng hợp sản lượng bán, hệ số điểm trung bình, tổng điểm quy đổi và doanh thu từng dòng sản phẩm.
4. **Năng Suất Kỹ Thuật Viên (2 KTV)**: Theo dõi chuyên sâu 2 KTV chính (`PHAN CHÍ TRUNG` và `ĐOÀN MINH HÙNG`).
5. **Đánh Giá Đóng Góp Doanh Số & Điểm Bán Hàng Theo Nhân Sự**: Tính tổng điểm đóng góp (Máy, Phụ kiện & IoT, Oppo Care & MDCL) và tỷ trọng % từng nhân sự.
6. **Lưu Trữ Theo Lần Cập Nhật Cuối**: Mọi thao tác Upload Excel mới hoặc điều chỉnh Target thủ công đều tự động lưu vào `localStorage` kèm thời gian cập nhật cuối cùng.

## Hướng dẫn triển khai GitHub Pages
1. Giải nén file `oppo-tiengiang-dashboard-v3.zip`.
2. Upload toàn bộ 4 file (`index.html`, `style.css`, `app.js`, `README.md`) lên thư mục gốc của Repository GitHub.
3. Vào **Settings** → **Pages** → Chọn nhánh `main` (`/root`) → Bấm **Save**.
