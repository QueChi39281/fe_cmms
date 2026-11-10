import { useLocation } from 'react-router-dom'
import { ClipboardList, Cpu, Plus, Wrench } from 'lucide-react'

const iconByPath = {
  equipment: Cpu,
  'work-orders': Wrench,
  requests: ClipboardList,
}

const copyByPath = {
  equipment: ['Danh sách thiết bị', 'Quản lý hồ sơ, vị trí và tình trạng hoạt động của thiết bị.'],
  requests: ['Yêu cầu sửa chữa', 'Tiếp nhận, theo dõi và cập nhật trạng thái yêu cầu bảo trì.'],
  'work-orders': ['Lệnh công việc', 'Phân công kỹ thuật viên và theo dõi tiến độ sửa chữa.'],
  users: ['Người dùng', 'Quản lý tài khoản và phân quyền truy cập hệ thống.'],
  reports: ['Báo cáo', 'Tổng hợp hiệu suất thiết bị và hoạt động bảo trì.'],
  settings: ['Cài đặt hệ thống', 'Cấu hình thông tin và tùy chọn không gian làm việc.'],
}

export default function ResourcePage({ title, role }) {
  const path = useLocation().pathname.split('/').at(-1)
  const [heading, description] = copyByPath[path] ?? [title, 'Quản lý thông tin trong không gian bảo trì.']
  const EmptyIcon = iconByPath[path] ?? ClipboardList

  return (
    <section className="resource-page">
      <div className="page-heading">
        <div><p className="eyebrow">{role.label}</p><h1>{heading}</h1><p className="page-description">{description}</p></div>
        <button className="button button--primary" type="button"><Plus size={16} /> Tạo mới</button>
      </div>
      <div className="empty-panel">
        <span className="empty-panel__icon"><EmptyIcon size={22} strokeWidth={1.8} /></span>
        <h2>Khu vực {heading.toLowerCase()}</h2>
        <p>Giao diện đã sẵn sàng để kết nối dữ liệu từ API.</p>
        <button className="button button--secondary" type="button"><Plus size={16} /> Thêm {title.toLowerCase()}</button>
      </div>
    </section>
  )
}
