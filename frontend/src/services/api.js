const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Request failed');
  }

  if (response.status === 204) return null;
  return response.json();
}

export const api = {
  getSummary: () => request('/portfolio/summary'),
  getHoldings: (search = '') => request(`/holdings?search=${encodeURIComponent(search)}`),
  createHolding: (payload) => request('/holdings', { method: 'POST', body: JSON.stringify(payload) }),
  getTransactions: () => request('/transactions'),
  createTransaction: (payload) => request('/transactions', { method: 'POST', body: JSON.stringify(payload) })
};
