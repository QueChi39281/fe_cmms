# FixFlow — Quản lý bảo trì thiết bị

Ứng dụng frontend quản lý bảo trì/sửa chữa thiết bị điện tử, xây dựng bằng Vite, React và JavaScript. Các màn hình dùng chung layout/component, có điều hướng theo vai trò và responsive trên laptop, tablet, điện thoại.

## Chạy dự án

- Cài dependencies: `npm install`
- Chạy môi trường phát triển: `npm run dev`
- Build production: `npm run build`
- Kiểm tra lint: `npm run lint`

## Vai trò và màn hình

- `/admin/dashboard`: Quản trị viên — thiết bị, yêu cầu, lệnh công việc, người dùng, báo cáo, cài đặt.
- `/manager/dashboard`: Quản lý — theo dõi thiết bị, phê duyệt và phân công công việc.
- `/equipment-user/dashboard`: Người dùng thiết bị — thiết bị cá nhân và yêu cầu sửa chữa.
- `/technician/dashboard`: Kỹ thuật viên — công việc được giao và thiết bị.

Bộ chọn vai trò ở thanh trên cùng chuyển nhanh giữa bốn giao diện. Các trang danh sách hiện là khung giao diện để tiếp tục kết nối dữ liệu.

## Cấu trúc chính

```text
src/
├── app/                 # Khai báo routes và ứng dụng
├── assets/              # Hình ảnh, biểu tượng
├── components/          # Component dùng chung và layout
├── config/              # Cấu hình vai trò, menu, dashboard
├── context/             # Context dùng chung (xác thực)
├── features/            # Dashboard, thiết bị, yêu cầu, lệnh việc, người dùng...
├── hooks/               # React hooks dùng chung
├── pages/               # Màn hình vai trò
├── services/api/        # API client và các endpoint theo domain
├── styles/              # CSS toàn cục
└── utils/               # Hàm tiện ích
```

## Kết nối API

Tạo file `.env` từ `.env.example`, sau đó đặt `VITE_API_BASE_URL` trỏ đến API backend. Các hàm gọi API mẫu nằm trong `src/services/api/`; `apiRequest()` dùng Fetch API và có thể mở rộng để đính kèm token xác thực.

## Xuất cây thư mục Windows

Chạy `show-tree.cmd` để ghi cấu trúc project ra `PROJECT_TREE.md` (bỏ qua `node_modules`, `.git` và `dist`).
