import axios from 'axios'

// Shared axios instance used by all Kubb-generated clients.
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
