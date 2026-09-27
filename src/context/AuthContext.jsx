import { createContext, useEffect, useState } from 'react'
import { getItem, setItem } from '../utils/storage'
import { STORAGE_KEYS, DEFAULT_STATS } from '../utils/constants'
import { isValidEmail } from '../utils/validation'

export const AuthContext = createContext(null)

// This is a frontend-only mock of authentication. Real credential storage and
// verification would happen on a backend; here we keep a "users table" in
// localStorage purely so Login/Register have something to check against.
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = getItem(STORAGE_KEYS.CURRENT_USER, null)
    setCurrentUser(storedUser)
    setIsLoading(false)
  }, [])

  function getUsers() {
    return getItem(STORAGE_KEYS.USERS, [])
  }

  function saveUsers(users) {
    setItem(STORAGE_KEYS.USERS, users)
  }

  async function register({ name, email, password }) {
    await wait(500)

    const users = getUsers()
    const existingUser = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    )

    if (existingUser) {
      throw new Error('An account with this email already exists.')
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password, // mock-only: never store plain-text passwords in a real app
    }

    saveUsers([...users, newUser])

    // Give every new player a fresh stats record.
    setItem(`${STORAGE_KEYS.STATS}_${newUser.id}`, DEFAULT_STATS)

    return newUser
  }

  async function login({ email, password }) {
    await wait(500)

    if (!isValidEmail(email)) {
      throw new Error('Enter a valid email address.')
    }

    const users = getUsers()
    const matchedUser = users.find(
      (user) => user.email.toLowerCase() === email.trim().toLowerCase()
    )

    if (!matchedUser || matchedUser.password !== password) {
      throw new Error('Incorrect email or password.')
    }

    const { password: _password, ...safeUser } = matchedUser
    setItem(STORAGE_KEYS.CURRENT_USER, safeUser)
    setCurrentUser(safeUser)

    return safeUser
  }

  function logout() {
    setItem(STORAGE_KEYS.CURRENT_USER, null)
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    isLoading,
    isAuthenticated: Boolean(currentUser),
    register,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
