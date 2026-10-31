import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { navigationByRole, roles } from '../../config/navigation.js'
import './AppLayout.css'

export default function AppLayout({ role }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const links = navigationByRole[role.id]
  const activeLabel = links.find((item) => location.pathname.endsWith(`/${item.path}`))?.label ?? 'Tổng quan'

  function changeRole(event) {
    navigate(`/${event.target.value}/dashboard`)
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'sidebar--open' : ''}`}>
        <a className="brand" href={`/${role.id}/dashboard`} aria-label="FixFlow - trang chủ">
          <span className="brand__mark">F</span>
          <span>fixflow<span className="brand__dot">.</span></span>
        </a>
        <div className="workspace-label">KHÔNG GIAN LÀM VIỆC</div>
        <nav className="side-nav" aria-label="Điều hướng chính">
          {links.map((item) => (
            <NavLink
              key={item.path}
              to={`/${role.id}/${item.path}`}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
            >
              <span className="nav-link__icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
              {item.path === 'requests' && role.id !== 'equipment-user' && <span className="nav-link__count">5</span>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar__bottom">
          <div className="help-card">
            <span className="help-card__icon">?</span>
            <div><strong>Cần trợ giúp?</strong><span>Liên hệ bộ phận hỗ trợ</span></div>
          </div>
          <button className="profile" type="button">
            <span className="avatar avatar--profile">MA</span>
            <span className="profile__details"><strong>Minh Anh</strong><small>{role.label}</small></span>
            <span className="profile__more">···</span>
          </button>
        </div>
      </aside>

      {menuOpen && <button className="sidebar-scrim" aria-label="Đóng menu" onClick={() => setMenuOpen(false)} />}

      <main className="main-area">
        <header className="topbar">
          <button className="menu-toggle" aria-label="Mở menu" onClick={() => setMenuOpen(true)}>☰</button>
          <div className="breadcrumbs"><span>Không gian làm việc</span><span className="breadcrumbs__slash">/</span><strong>{activeLabel}</strong></div>
          <div className="topbar__actions">
            <label className="role-switcher">
              <span className="sr-only">Chọn giao diện vai trò</span>
              <select value={role.id} onChange={changeRole}>
                {roles.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}
              </select>
            </label>
            <button className="icon-button notification-button" aria-label="Thông báo" type="button">♧<span /></button>
            <span className="avatar avatar--top">MA</span>
          </div>
        </header>
        <div className="page-content"><Outlet /></div>
      </main>
    </div>
  )
}
