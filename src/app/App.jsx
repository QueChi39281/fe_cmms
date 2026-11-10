import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../features/auth/pages/HomePage.jsx'
import AppLayout from '../components/layout/AppLayout.jsx'
import DashboardPage from '../features/dashboard/DashboardPage.jsx'
import EquipmentListPage from '../features/equipment/pages/EquipmentListPage.jsx'
import MaintenanceRequestsPage from '../features/requests/pages/MaintenanceRequestsPage.jsx'
import WorkOrdersPage from '../features/work-orders/pages/WorkOrdersPage.jsx'
import UsersPage from '../features/users/pages/UsersPage.jsx'
import ReportsPage from '../features/reports/pages/ReportsPage.jsx'
import SettingsPage from '../features/settings/pages/SettingsPage.jsx'
import { navigationByRole, roles } from '../config/navigation.js'

const pageByPath = {
  equipment: EquipmentListPage,
  requests: MaintenanceRequestsPage,
  'work-orders': WorkOrdersPage,
  users: UsersPage,
  reports: ReportsPage,
  settings: SettingsPage,
}

function RoleRoutes() {
  return roles.map((role) => (
    <Route key={role.id} path={`/${role.id}`} element={<AppLayout role={role} />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<DashboardPage role={role} />} />
      {navigationByRole[role.id]
        .filter((item) => item.path !== 'dashboard')
        .map((item) => {
          const Page = pageByPath[item.path]
          return <Route key={item.path} path={item.path} element={<Page role={role} />} />
        })}
    </Route>
  ))
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {RoleRoutes()}
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  )
}
