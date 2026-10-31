import { useEffect, useState } from 'react'
import { apiRequest } from '../services/api/client.js'

const EMPTY_OPTIONS = {}

export function useApi(path, options = EMPTY_OPTIONS) {
  const [state, setState] = useState({ path: null, data: null, loading: true, error: null })

  useEffect(() => {
    let active = true
    apiRequest(path, options)
      .then((data) => active && setState({ path, data, loading: false, error: null }))
      .catch((error) => active && setState({ path, data: null, loading: false, error }))
    return () => { active = false }
  }, [path, options])

  return state.path === path ? state : { data: null, loading: true, error: null }
}
