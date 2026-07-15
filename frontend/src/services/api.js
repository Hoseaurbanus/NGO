import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/index.php'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  paramsSerializer: (params) => {
    const parts = []
    for (const [key, value] of Object.entries(params)) {
      if (value !== null && value !== undefined) {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      }
    }
    return parts.join('&')
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sf_access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refreshToken = localStorage.getItem('sf_refresh_token')
        if (refreshToken) {
          const { data } = await axios.post(`${API_BASE_URL}?route=auth/refresh`, {
            refresh_token: refreshToken,
          })
          localStorage.setItem('sf_access_token', data.access_token)
          localStorage.setItem('sf_refresh_token', data.refresh_token)
          originalRequest.headers.Authorization = `Bearer ${data.access_token}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        localStorage.removeItem('sf_access_token')
        localStorage.removeItem('sf_refresh_token')
        localStorage.removeItem('sf_user')
        window.location.href = '/auth/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

// Helper: convert path to query string format
// GET /programs → GET ?route=programs
// GET /programs/1 → GET ?route=programs/1
// POST /auth/login → POST ?route=auth/login
const originalGet = api.get.bind(api)
const originalPost = api.post.bind(api)
const originalPut = api.put.bind(api)
const originalDelete = api.delete.bind(api)

api.get = (url, config = {}) => {
  const route = url.replace(/^\//, '')
  return originalGet('', { ...config, params: { route, ...config.params } })
}

api.post = (url, data, config = {}) => {
  const route = url.replace(/^\//, '')
  return originalPost('', data, { ...config, params: { route, ...config.params } })
}

api.put = (url, data, config = {}) => {
  const route = url.replace(/^\//, '')
  return originalPut('', data, { ...config, params: { route, ...config.params } })
}

api.delete = (url, config = {}) => {
  const route = url.replace(/^\//, '')
  return originalDelete('', { ...config, params: { route, ...config.params } })
}

export default api
