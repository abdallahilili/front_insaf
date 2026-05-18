import { useAuth } from '../contexts/AuthContext'
import { canManageMembers, canViewAnalytics, canManageOrganization, isAdmin } from '../utils/permissions'

export function useUserPermissions() {
  const { user } = useAuth()
  const role = user?.role ?? 'member'

  return {
    canManageMembers: canManageMembers(role),
    canViewAnalytics: canViewAnalytics(role),
    canManageOrganization: canManageOrganization(role),
    isAdmin: isAdmin(role),
    role,
  }
}
