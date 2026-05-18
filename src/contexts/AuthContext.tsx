import { createContext, useContext, useEffect, useReducer, ReactNode } from 'react'
import { AuthState, User } from '../models/auth.model'
import { getToken, getStoredUser, setToken, setStoredUser, removeToken } from '../utils/localStorage'

interface AuthContextType extends AuthState {
  login: (token: string, user: User) => void
  logout: () => void
  updateUser: (user: User) => void
}

type AuthAction =
  | { type: 'LOGIN'; payload: { token: string; user: User } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean }

const initialState: AuthState = {
  user: getStoredUser(),
  token: getToken(),
  isAuthenticated: !!getToken(),
  isLoading: false,
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      }
    case 'LOGOUT':
      return {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      }
    case 'UPDATE_USER':
      return { ...state, user: action.payload }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const token = getToken()
    if (!token) {
      dispatch({ type: 'LOGOUT' })
    }
  }, [])

  const login = (token: string, user: User) => {
    setToken(token)
    setStoredUser(user)
    dispatch({ type: 'LOGIN', payload: { token, user } })
  }

  const logout = () => {
    removeToken()
    dispatch({ type: 'LOGOUT' })
  }

  const updateUser = (user: User) => {
    setStoredUser(user)
    dispatch({ type: 'UPDATE_USER', payload: user })
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
