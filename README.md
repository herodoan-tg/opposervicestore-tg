# OPPO Experience & Service Store - Live Web Dashboard

Hệ thống web theo dõi chỉ số bán hàng & dịch vụ trực quan, cho phép upload file Excel/JSON mới và đồng bộ dữ liệu theo thời gian thực cho tất cả người dùng truy cập link.

## Cấu trúc thư mục dự án
- `public/index.html`: Giao diện web trực quan (Tổng quan KPI, Phân tích từng nhân viên, Chi tiết đơn GCSM/Center SO, Modal Upload dữ liệu, Export báo cáo nhanh).
- `api/data.js`: Serverless API xử lý đọc/ghi dữ liệu thời gian thực khi người dùng upload file mới.
- `data/dashboard.json`: Dữ liệu mặc định ban đầu của cửa hàng.
- `data/OPPO_Store_KPI_Data.xlsx`: File Excel chuẩn mẫu dùng để nhập liệu hằng ngày và upload lên web.
- `vercel.json`: Cấu hình định tuyến chạy trơn tru trên Vercel.

## Hướng dẫn đưa lên GitHub & Deploy Vercel
1. Giải nén toàn bộ file trong gói ZIP này vào thư mục repository trên máy tính và **Push lên GitHub**.
2. Truy cập [Vercel](https://vercel.com), chọn **Import Project** từ repository GitHub vừa đẩy lên và bấm **Deploy** (không cần chỉnh sửa Build Command).
3. **Để lưu trữ vĩnh viễn dữ liệu sau mỗi lần upload trên web** (khuyên dùng 1 trong 2 cách sau trong mục *Settings > Environment Variables* trên Vercel):
   - **Cách 1 (Đồng bộ thẳng về GitHub):** Thêm 2 biến môi trường:
     - `GITHUB_TOKEN`: Personal Access Token (quyền `repo`) của bạn.
     - `GITHUB_REPO`: Tên repo dạng `ten-tai-khoan/ten-repo` (ví dụ: `minhhung/oppo-dashboard`).
     *(Mỗi khi bạn upload file Excel mới trên web, hệ thống sẽ tự động commit cập nhật thẳng file `data/dashboard.json` trên GitHub để mọi người vào link luôn thấy dữ liệu mới nhất!)*
   - **Cách 2 (Dùng Upstash Redis / Vercel KV):** Kết nối Storage KV trên Vercel (tự động tạo `KV_REST_API_URL` và `KV_REST_API_TOKEN`).
   - *(Tùy chọn)* Thêm biến `UPLOAD_PIN` nếu muốn đặt mật khẩu cho nút Upload dữ liệu.
