import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { AdminLoginPage } from '../../features/auth/AdminLoginPage'
import { CustomersPage } from '../../features/customers/CustomersPage'
import { DashboardPage } from '../../features/dashboard/DashboardPage'
import { OrdersPage } from '../../features/orders/OrdersPage'
import { PackagesPage } from '../../features/packages/PackagesPage'
import { LandingPage } from '../../features/public/LandingPage'
import { TrackingDetailPage } from '../../features/public/TrackingDetailPage'
import { TrackingSearchPage } from '../../features/public/TrackingSearchPage'
import { QuotationsPage } from '../../features/quotations/QuotationsPage'
import { TrackingManagementPage } from '../../features/tracking/TrackingManagementPage'
import { AdminLayout } from '../../shared/layouts/AdminLayout'
import { PublicLayout } from '../../shared/layouts/PublicLayout'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="tracking" element={<TrackingSearchPage />} />
          <Route path="tracking/:code" element={<TrackingDetailPage />} />
        </Route>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="quotations" element={<QuotationsPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="packages" element={<PackagesPage />} />
          <Route path="tracking" element={<TrackingManagementPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

