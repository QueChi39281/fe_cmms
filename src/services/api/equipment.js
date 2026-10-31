import { apiRequest } from './client.js'

export const getEquipment = (params = '') => apiRequest(`/equipment${params}`)
export const getEquipmentById = (id) => apiRequest(`/equipment/${encodeURIComponent(id)}`)
export const createEquipment = (payload) => apiRequest('/equipment', { method: 'POST', body: JSON.stringify(payload) })
