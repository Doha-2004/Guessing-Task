import { apiRequest } from './api'

// POST /api/auth/register — returns AuthResponse { userId, username, email, bestScore, expiresAt }
export function register({ username, email, password }) {
  return apiRequest('/api/auth/register', {
    method: 'POST',
    body: { username, email, password },
  })
}

// POST /api/auth/login — the backend's field is literally called "login"
// (it isn't restricted to email in the OpenAPI schema, so it likely accepts
// either the username or the email). Returns AuthResponse.
export function login({ login, password }) {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: { login, password },
  })
}

// POST /api/auth/logout
export function logout() {
  return apiRequest('/api/auth/logout', { method: 'POST' })
}

// GET /api/auth/me — returns ProfileResponse { userId, username, email,
// bestScore, gamesPlayed, gamesWon, dailyStreak, createdAt }
export function getCurrentUser() {
  return apiRequest('/api/auth/me')
}