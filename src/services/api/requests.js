import { apiRequest } from './client.js'

export const getMaintenanceRequests = () => apiRequest('/maintenance-requests')
export const createMaintenanceRequest = (payload) => apiRequest('/maintenance-requests', { method: 'POST', body: JSON.stringify(payload) })
export const updateMaintenanceRequest = (id, payload) => apiRequest(`/maintenance-requests/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(payload) })
