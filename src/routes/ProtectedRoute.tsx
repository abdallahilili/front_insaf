import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface Props {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  // Temporarily disabled for testing - remove this return to re-enable authentication
  return <>{children}</>

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" state={{ from: location }} replace />
  // }

  // return <>{children}</>
}
