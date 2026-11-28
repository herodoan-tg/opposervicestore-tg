# OPPO Store Operations Dashboard (VN001034)

Dashboard theo dõi chỉ số bán hàng (Brandshop) & dịch vụ sau bán hàng (Service Center) trực quan trên nền web tĩnh.

## Tính năng chính
- **Tải sẵn dữ liệu thực tế** của OPPO Experience & Service Store Tiền Giang.
- **Upload file Excel (`.xlsx`)**: Tự động bóc tách dữ liệu từ các sheet `Tổng hợp` và `KPI-SC`.
- **Lưu trữ tự động (LocalStorage)**: Dữ liệu lần upload gần nhất và cấu hình Target được lưu ngay trên trình duyệt, không mất khi F5/tải lại trang.
- **Chỉnh sửa Target trực tiếp**: Cập nhật chỉ tiêu từng nhóm hàng và tính lại tỷ lệ % hoàn thành tức thì.
- **Export Báo Cáo Nhanh**: Tạo bản tóm tắt chuẩn gửi Zalo/Email, tải file `.txt` hoặc xuất PDF.

## Cách đưa lên GitHub Pages (Chạy trong 30 giây)
1. Tạo một Repository mới trên GitHub (ví dụ: `oppo-shop-dashboard`).
2. Giải nén file ZIP và upload toàn bộ 4 file (`index.html`, `style.css`, `app.js`, `README.md`) vào thư mục gốc của Repository.
3. Vào **Settings** → **Pages** → Mục **Branch** chọn `main` (`/root`) → Bấm **Save**.
4. Truy cập đường link GitHub Pages được cấp để sử dụng trên máy tính hoặc điện thoại.
