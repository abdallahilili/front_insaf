import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { SidebarProvider } from './contexts/SidebarContext'
import { NotificationProvider } from './contexts/NotificationContext'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SidebarProvider>
          <NotificationProvider>
            <AppRoutes />
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  fontFamily: 'Cairo, sans-serif',
                  direction: 'rtl',
                  borderRadius: '12px',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                },
                success: {
                  iconTheme: { primary: '#16a34a', secondary: '#fff' },
                },
                error: {
                  iconTheme: { primary: '#dc2626', secondary: '#fff' },
                },
              }}
            />
          </NotificationProvider>
        </SidebarProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
