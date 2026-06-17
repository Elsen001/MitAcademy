import axios, { AxiosError } from 'axios'

import { useAuthStore } from '@/store/auth-store'
import type { ApiError } from '@/types'

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
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Səhvləri normallaşdır: backend mesajını çıxar, 401-də logout et.
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
    }

    const normalized: ApiError = {
      message:
        error.response?.data?.message ??
        error.message ??
        'Gözlənilməz xəta baş verdi',
      statusCode: error.response?.status ?? 0,
    }
    return Promise.reject(normalized)
  },
)
