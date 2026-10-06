import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL || 'https://e23-2yp-peracom-swms-5.onrender.com'

const api = axios.create({
  baseURL: `${apiUrl.replace(/\/$/, '')}/api`,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
