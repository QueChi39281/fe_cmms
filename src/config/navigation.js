import {
  BarChart3,
  Check,
  ClipboardList,
  Cpu,
  LayoutDashboard,
  Settings,
  TrendingUp,
  Users,
  Wrench,
  Clock3,
} from 'lucide-react'

export const roles = [
  { id: 'admin', label: 'Quản trị viên', initials: 'AD' },
  { id: 'manager', label: 'Quản lý', initials: 'QL' },
  { id: 'equipment-user', label: 'Người dùng thiết bị', initials: 'ND' },
  { id: 'technician', label: 'Kỹ thuật viên', initials: 'KT' },
]

export const navigationByRole = {
  admin: [
    { label: 'Tổng quan', path: 'dashboard', icon: LayoutDashboard },
    { label: 'Thiết bị', path: 'equipment', icon: Cpu },
    { label: 'Yêu cầu sửa chữa', path: 'requests', icon: Clock3 },
    { label: 'Lệnh công việc', path: 'work-orders', icon: ClipboardList },
    { label: 'Người dùng', path: 'users', icon: Users },
    { label: 'Báo cáo', path: 'reports', icon: BarChart3 },
    { label: 'Cài đặt', path: 'settings', icon: Settings },
  ],
  manager: [
    { label: 'Tổng quan', path: 'dashboard', icon: LayoutDashboard },
    { label: 'Thiết bị', path: 'equipment', icon: Cpu },
    { label: 'Yêu cầu sửa chữa', path: 'requests', icon: Clock3 },
    { label: 'Lệnh công việc', path: 'work-orders', icon: ClipboardList },
    { label: 'Báo cáo', path: 'reports', icon: BarChart3 },
  ],
  'equipment-user': [
    { label: 'Tổng quan', path: 'dashboard', icon: LayoutDashboard },
    { label: 'Thiết bị của tôi', path: 'equipment', icon: Cpu },
    { label: 'Yêu cầu của tôi', path: 'requests', icon: Clock3 },
  ],
  technician: [
    { label: 'Tổng quan', path: 'dashboard', icon: LayoutDashboard },
    { label: 'Lệnh công việc', path: 'work-orders', icon: ClipboardList },
    { label: 'Thiết bị', path: 'equipment', icon: Cpu },
  ],
}

export const dashboardData = {
  admin: {
    greeting: 'Chào buổi sáng, Minh Anh',
    description: 'Đây là tình hình vận hành thiết bị của toàn hệ thống hôm nay.',
    stats: [
      { label: 'Tổng thiết bị', value: '248', change: '+12 tháng này', icon: Cpu, tone: 'blue' },
      { label: 'Yêu cầu đang mở', value: '18', change: '5 cần xử lý ngay', icon: Clock3, tone: 'amber' },
      { label: 'Đang bảo trì', value: '07', change: '3 kỹ thuật viên', icon: Wrench, tone: 'violet' },
      { label: 'Tỷ lệ hoạt động', value: '96.8%', change: '+2.4% tháng trước', icon: TrendingUp, tone: 'green' },
    ],
  },
  manager: {
    greeting: 'Chào buổi sáng, Minh Anh',
    description: 'Theo dõi tiến độ bảo trì và phân công công việc trong nhóm.',
    stats: [
      { label: 'Thiết bị phụ trách', value: '84', change: '4 khu vực', icon: Cpu, tone: 'blue' },
      { label: 'Chờ phê duyệt', value: '09', change: '3 ưu tiên cao', icon: Clock3, tone: 'amber' },
      { label: 'Lệnh công việc', value: '16', change: '11 đang thực hiện', icon: Wrench, tone: 'violet' },
      { label: 'Hoàn thành đúng hạn', value: '92%', change: '+4.1% tháng trước', icon: TrendingUp, tone: 'green' },
    ],
  },
  'equipment-user': {
    greeting: 'Xin chào, Minh Anh',
    description: 'Gửi yêu cầu sửa chữa và theo dõi tình trạng thiết bị của bạn.',
    stats: [
      { label: 'Thiết bị của tôi', value: '06', change: 'Tất cả đang hoạt động', icon: Cpu, tone: 'blue' },
      { label: 'Yêu cầu đang xử lý', value: '02', change: 'Cập nhật hôm nay', icon: Clock3, tone: 'amber' },
      { label: 'Đã hoàn thành', value: '12', change: 'Trong 12 tháng qua', icon: Check, tone: 'green' },
      { label: 'Lịch bảo trì', value: '01', change: 'Trong tuần này', icon: ClipboardList, tone: 'violet' },
    ],
  },
  technician: {
    greeting: 'Chào buổi sáng, Minh Anh',
    description: 'Danh sách công việc và lịch bảo trì được giao cho bạn.',
    stats: [
      { label: 'Công việc hôm nay', value: '05', change: '2 ưu tiên cao', icon: ClipboardList, tone: 'blue' },
      { label: 'Đang thực hiện', value: '03', change: 'Cập nhật tiến độ', icon: Wrench, tone: 'amber' },
      { label: 'Đã hoàn thành', value: '28', change: 'Trong tháng này', icon: Check, tone: 'green' },
      { label: 'Bảo trì định kỳ', value: '02', change: 'Lịch tuần này', icon: Clock3, tone: 'violet' },
    ],
  },
}
