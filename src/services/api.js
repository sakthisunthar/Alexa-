const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(
      body?.detail || body?.message || `Request failed (${res.status})`
    );
  }
  return res.json();
}

export const api = {
  checkHealth: () => request('/api/health'),

  generateTrip: (data) =>
    request('/api/trips/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getTrip: (id) => request(`/api/trips/${id}`),

  sendMessage: (payload) =>
    request('/api/chat', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  modifyTrip: (id, data) =>
    request(`/api/trips/${id}/modify`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getToolActivity: (tripId) => request(`/api/trips/${tripId}/tools`),
};
