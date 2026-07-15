import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/index.php'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Convert all requests to ?route= format
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sf_access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // Convert URL path to ?route= query param
  let url = config.url || ''
  if (url.startsWith('/')) url = url.substring(1)
  config.url = ''
  config.params = { route: url, ...config.params }

  return config
})

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

export default api
