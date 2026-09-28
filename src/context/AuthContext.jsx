import { createContext, useCallback, useEffect, useState } from 'react'
import * as authService from '../services/authService'

export const AuthContext = createContext(null)

// Real backend auth. The session is a cookie set by the server on
// /api/auth/login (see services/api.js for why), so there's nothing to
// store locally here — on every load we just ask the backend "who am I?"
// via GET /api/auth/me. A failure there (401, or the server being
// unreachable) simply means "not logged in".
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
    // POST /api/auth/register succeeds with 201 + AuthResponse, but this app
    // keeps the existing flow of sending the user to /login afterwards
    // instead of treating registration as an automatic login.
    await authService.register({ username, email, password })
  }

  async function login({ login, password }) {
    await authService.login({ login, password })
    // AuthResponse from /login doesn't include gamesPlayed/gamesWon/
    // dailyStreak/createdAt (only ProfileResponse from /me does), so we
    // fetch the full profile right after logging in.
    await refreshCurrentUser()
  }

  async function logout() {
    try {
      await authService.logout()
    } finally {
      // Clear local state even if the request fails, so the UI doesn't get
      // stuck showing a logged-in screen the user can no longer use.
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