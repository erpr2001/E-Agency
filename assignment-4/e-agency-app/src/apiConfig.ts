const API_BASE_URL = 'http://localhost:3000';

export const API_ENDPOINTS = {
  users: {
    list: `${API_BASE_URL}/users`,
    create: `${API_BASE_URL}/users`,
    get: (id: string) => `${API_BASE_URL}/users/${id}`,
    update: (id: string) => `${API_BASE_URL}/users/${id}`,
    delete: (id: string) => `${API_BASE_URL}/users/${id}`,
  },
  bookings: {
    list: `${API_BASE_URL}/bookings`,
    create: `${API_BASE_URL}/bookings`,
    get: (id: string) => `${API_BASE_URL}/bookings/${id}`,
    update: (id: string) => `${API_BASE_URL}/bookings/${id}`,
    delete: (id: string) => `${API_BASE_URL}/bookings/${id}`,
  },
  gallery: {
    upload: `${API_BASE_URL}/gallery/upload`,
    list: `${API_BASE_URL}/gallery`,
    get: (id: string) => `${API_BASE_URL}/gallery/${id}`,
    update: (id: string) => `${API_BASE_URL}/gallery/${id}`,
    delete: (id: string) => `${API_BASE_URL}/gallery/${id}`,
  },
};