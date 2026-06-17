import { QueryClient } from '@tanstack/react-query'

/**
 * Tək, paylaşılan QueryClient instance-ı.
 * `main.tsx`-də QueryClientProvider-ə ötürülür.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 dəqiqə
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
