import { createContext, useCallback, useEffect, useState } from 'react'
import * as authService from '../services/authService'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshCurrentUser = useCallback(async () => {
    try {
      const profile = await authService.getCurrentUser()
      setCurrentUser(profile)
      return profile
    } catch (error) {
      setCurrentUser(null)
      return null
    }
  }, [])

  useEffect(() => {
    async function checkSession() {
      setIsLoading(true)
      await refreshCurrentUser()
      setIsLoading(false)
    }
    checkSession()
  }, [refreshCurrentUser])

  async function register({ username, email, password }) {
    await authService.register({ username, email, password })
  }

  async function login({ login, password }) {
    await authService.login({ login, password })
    await refreshCurrentUser()
  }

  async function logout() {
    try {
      await authService.logout()
    } finally {
      setCurrentUser(null)
    }
  }

  const value = {
    currentUser,
    isLoading,
    isAuthenticated: Boolean(currentUser),
    register,
    login,
    logout,
    refreshCurrentUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}