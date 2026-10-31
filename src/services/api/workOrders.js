import { apiRequest } from './client.js'

export const getWorkOrders = () => apiRequest('/work-orders')
export const updateWorkOrder = (id, payload) => apiRequest(`/work-orders/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(payload) })
