const TOKEN_KEY = 'wosaej_token'
const USER_KEY = 'wosaej_user'

export const getToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export const getStoredUser = () => {
  try {
    const user = localStorage.getItem(USER_KEY)
    return user ? JSON.parse(user) : null
  } catch {
    return null
  }
}

export const setStoredUser = (user: unknown): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}
