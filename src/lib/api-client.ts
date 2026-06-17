import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import type { ApiError } from "../types/apiError";
import { showError } from "./toast";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/*
 * REQUEST INTERCEPTOR
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR
 */
apiClient.interceptors.response.use(
  (response) => response,

  (error: AxiosError<any>) => {
    const status = error.response?.status;

    // =========================
    // 401 → logout + redirect
    // =========================
    if (status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      showError("Session expired. Please login again.");
      window.location.replace("/login");
    }

    // =========================
    // normalize error
    // =========================
    const normalizedError: ApiError = {
      status: status ?? 500,
      message:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
      errors: error.response?.data?.errors ?? null,
    };

    // global toast (optional)
    if (status !== 401) {
      showError(normalizedError.message);
    }

    return Promise.reject(normalizedError);
  }
);

export default apiClient;