import { UserRole } from '../models/auth.model'

const roleHierarchy: Record<UserRole, number> = {
  admin: 4,
  regional_manager: 3,
  local_manager: 2,
  member: 1,
}

export const hasPermission = (userRole: UserRole, requiredRole: UserRole): boolean => {
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

export const canManageMembers = (role: UserRole): boolean =>
  hasPermission(role, 'local_manager')

export const canViewAnalytics = (role: UserRole): boolean =>
  hasPermission(role, 'local_manager')

export const canManageOrganization = (role: UserRole): boolean =>
  hasPermission(role, 'regional_manager')

export const isAdmin = (role: UserRole): boolean => role === 'admin'
