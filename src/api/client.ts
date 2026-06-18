import axios, { AxiosError } from 'axios'

import type { ApiError } from '../types/apiError'

/**
 * Mərkəzi axios instance-ı. baseURL `.env`-dəki `VITE_API_URL`-dan gəlir.
 * Bütün API çağırışları bunun üzərindən getməlidir.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Səhvləri normallaşdır: backend mesajını çıxar, 401-də logout et.
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; errors?: any }>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      window.location.replace('/login')
    }

    const normalized: ApiError = {
      message:
        error.response?.data?.message ??
        error.message ??
        'Gözlənilməz xəta baş verdi',
      status: error.response?.status ?? 0,
      errors: error.response?.data?.errors ?? null,
    }
    return Promise.reject(normalized)
  },
)
