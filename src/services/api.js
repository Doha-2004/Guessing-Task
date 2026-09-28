// Thin wrapper around fetch for talking to the Guessly backend.
//
// Auth note: the backend's AuthResponse/ProfileResponse never include a JWT
// in the body, and the Swagger security scheme description says you can
// "log in through /api/auth/login to use the session cookie" — so this app
// authenticates with the session cookie the backend sets on login, not a
// bearer token. That's why every request below is sent with
// `credentials: 'include'`. For this to work, the deployed backend's CORS
// policy must allow credentials from this app's origin (Access-Control-
// Allow-Origin set to the exact origin + Access-Control-Allow-Credentials:
// true). That's a backend/CORS configuration detail we can't verify or fix
// from the frontend — if login "succeeds" but you're immediately treated as
// logged out, this is the first thing to check with whoever runs the API.

const RAW_API_BASE_URL = import.meta.env.DEV
  ? ''
  : import.meta.env.VITE_API_URL || 'https://guessing-task-api.runasp.net'
const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, '')

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function apiRequest(path, { method = 'GET', body } = {}) {
  let response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch (networkError) {
    // fetch throws (rather than rejecting with a response) on network
    // failures, CORS blocks, DNS errors, etc.
    throw new ApiError('Could not reach the server. Please check your connection.', 0)
  }

  // GET /api/game/current returns 204 when there is no active game.
  if (response.status === 204) {
    return null
  }

  const rawText = await response.text()
  let data = null

  if (rawText) {
    try {
      data = JSON.parse(rawText)
    } catch {
      // Non-JSON body (shouldn't normally happen for this API) — ignore.
      data = null
    }
  }

  if (!response.ok) {
    throw new ApiError(extractErrorMessage(data, response.status), response.status)
  }

  return data
}

function extractErrorMessage(data, status) {
  if (data) {
    if (typeof data === 'string' && data.trim()) return data

    if (typeof data.message === 'string' && data.message) return data.message
    if (typeof data.title === 'string' && data.title) return data.title // ASP.NET ProblemDetails

    // ASP.NET model validation errors: { errors: { fieldName: ["message"] } }
    if (data.errors && typeof data.errors === 'object') {
      const firstFieldErrors = Object.values(data.errors)[0]
      if (Array.isArray(firstFieldErrors) && firstFieldErrors.length > 0) {
        return firstFieldErrors[0]
      }
    }
  }

  switch (status) {
    case 400:
      return 'Please check your input and try again.'
    case 401:
      return 'You need to log in to continue.'
    case 404:
      return 'The requested resource was not found.'
    case 409:
      return 'This action could not be completed. Please try again.'
    case 500:
      return 'Something went wrong on the server. Please try again later.'
    default:
      return 'Something went wrong. Please try again.'
  }
}