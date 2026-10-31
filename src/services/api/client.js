const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API request failed (${response.status}): ${response.statusText}`)
  }

  if (response.status === 204) return null
  return response.json()
}
