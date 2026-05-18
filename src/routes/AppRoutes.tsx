import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import AppLayout from '../layouts/AppLayout'

// Public pages
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/auth/LoginPage'
import OTPPage from '../pages/auth/OTPPage'
import JoinPage from '../pages/auth/JoinPage'

// Protected pages
import DashboardHome from '../pages/dashboard/DashboardHome'
import MembersPage from '../pages/members/MembersPage'
import MemberDetailPage from '../pages/members/MemberDetailPage'
import ReferralsPage from '../pages/referrals/ReferralsPage'
import OrganizationPage from '../pages/organization/OrganizationPage'
import AnalyticsPage from '../pages/dashboard/AnalyticsPage'
import NotificationsPage from '../pages/dashboard/NotificationsPage'
import SettingsPage from '../pages/settings/SettingsPage'
import ProfilePage from '../pages/settings/ProfilePage'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/otp" element={<OTPPage />} />
      <Route path="/join" element={<JoinPage />} />

      {/* Protected */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/members/:id" element={<MemberDetailPage />} />
        <Route path="/referrals" element={<ReferralsPage />} />
        <Route path="/organization" element={<OrganizationPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
