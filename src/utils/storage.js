// Small wrapper around localStorage so the rest of the app never touches
// JSON.parse/stringify or try/catch blocks directly.

export function getItem(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch (error) {
    console.error(`Failed to read "${key}" from storage`, error)
    return fallback
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Failed to write "${key}" to storage`, error)
    return false
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Failed to remove "${key}" from storage`, error)
  }
}
