import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, Download, MoreHorizontal, Plus, Sparkles, Wrench } from 'lucide-react'
import StatCard from '../../components/data-display/StatCard.jsx'
import { dashboardData } from '../../config/navigation.js'
import './DashboardPage.css'

const tasks = [
  { id: 'WO-2481', title: 'Bảo trì máy in văn phòng', asset: 'Máy in HP LaserJet · Tầng 3', status: 'Đang xử lý', tone: 'blue', time: '09:30' },
  { id: 'WO-2478', title: 'Kiểm tra điều hòa phòng họp', asset: 'Điều hòa Daikin · Phòng họp A', status: 'Chờ tiếp nhận', tone: 'amber', time: '10:15' },
  { id: 'WO-2472', title: 'Thay pin bộ lưu điện UPS', asset: 'UPS APC 1500VA · Phòng IT', status: 'Hoàn thành', tone: 'green', time: 'Hôm qua' },
]

export default function DashboardPage({ role }) {
  const data = dashboardData[role.id]
  return (
    <div className="dashboard-page">
      <section className="page-heading dashboard-heading">
        <div><p className="eyebrow">TỔNG QUAN HÔM NAY</p><h1>{data.greeting}</h1><p className="page-description">{data.description}</p></div>
        {role.id === 'equipment-user' ? <Link className="button button--primary" to={`/${role.id}/requests`}><Plus size={16} /> Tạo yêu cầu</Link> : <button className="button button--secondary" type="button"><Download size={15} /> Xuất báo cáo</button>}
      </section>
      <section className="stats-grid" aria-label="Chỉ số tổng quan">
        {data.stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
      </section>
      <section className="dashboard-grid">
        <article className="panel task-panel">
          <div className="panel__header"><div><h2>Công việc gần đây</h2><p>Theo dõi các hoạt động bảo trì mới nhất</p></div><Link to={`/${role.id}/${role.id === 'equipment-user' ? 'requests' : 'work-orders'}`} className="text-link">Xem tất cả <ArrowRight size={13} /></Link></div>
          <div className="task-list">
            {tasks.map((task) => <div className="task-row" key={task.id}><span className={`task-symbol task-symbol--${task.tone}`}><Wrench size={15} /></span><div className="task-row__main"><strong>{task.title}</strong><span>{task.asset}</span></div><span className={`status-pill status-pill--${task.tone}`}>{task.status}</span><span className="task-time">{task.time}</span></div>)}
          </div>
        </article>
        <article className="panel health-panel">
          <div className="panel__header"><div><h2>Tình trạng thiết bị</h2><p>Tổng quan hoạt động</p></div><button className="more-button" aria-label="Tùy chọn" type="button"><MoreHorizontal size={19} /></button></div>
          <div className="health-score"><div className="donut"><span>96.8<small>%</small></span></div><div><strong>Hoạt động tốt</strong><p>Thiết bị đang vận hành ổn định</p></div></div>
          <div className="health-legend"><span><i className="legend-dot legend-dot--green" />Hoạt động <strong>240</strong></span><span><i className="legend-dot legend-dot--amber" />Cần bảo trì <strong>06</strong></span><span><i className="legend-dot legend-dot--red" />Ngừng hoạt động <strong>02</strong></span></div>
        </article>
      </section>
      <section className="notice-bar"><span className="notice-bar__icon"><Sparkles size={16} /></span><div><strong>Lịch bảo trì sắp tới</strong><p>Xem lịch thiết bị cần bảo trì để chủ động sắp xếp công việc.</p></div><Link className="text-link" to={`/${role.id}/equipment`}>Xem lịch <CalendarDays size={13} /></Link></section>
    </div>
  )
}
