import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '@services/api'
import { API_ENDPOINTS } from '@constants'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('sf_access_token')
    const savedUser = localStorage.getItem('sf_user')
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem('sf_user')
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    const data = await api.post(API_ENDPOINTS.AUTH_LOGIN, { email, password })
    localStorage.setItem('sf_access_token', data.access_token)
    localStorage.setItem('sf_refresh_token', data.refresh_token)
    localStorage.setItem('sf_user', JSON.stringify(data.user))
    setUser(data.user)
    return data.user
  }, [])

  const register = useCallback(async (userData) => {
    const data = await api.post(API_ENDPOINTS.AUTH_REGISTER, userData)
    localStorage.setItem('sf_access_token', data.access_token)
    localStorage.setItem('sf_refresh_token', data.refresh_token)
    localStorage.setItem('sf_user', JSON.stringify(data.user))
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.post(API_ENDPOINTS.AUTH_LOGOUT)
    } catch {
      // ignore
    }
    localStorage.removeItem('sf_access_token')
    localStorage.removeItem('sf_refresh_token')
    localStorage.removeItem('sf_user')
    setUser(null)
  }, [])

  const updateUser = useCallback((userData) => {
    localStorage.setItem('sf_user', JSON.stringify(userData))
    setUser(userData)
  }, [])

  const isAdmin = user?.role === 'super_admin' || user?.role === 'admin'
  const isVolunteer = user?.role === 'volunteer_manager' || user?.role === 'volunteer'
  const isEditor = user?.role === 'editor' || user?.role === 'content_manager'

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, isAdmin, isVolunteer, isEditor }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
