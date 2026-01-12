import { useToast } from 'vue-toast-notification'

export const useModernToast = () => {
  const toast = useToast()

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const config = {
      position: 'top-right' as const,
      duration: 4000,
      dismissible: true,
      pauseOnHover: true,
    }

    switch (type) {
      case 'success':
        toast.success(message, config)
        break
      case 'error':
        toast.error(message, config)
        break
      case 'warning':
        toast.warning(message, config)
        break
      default:
        toast.info(message, config)
    }
  }

  return {
    success: (message: string) => showToast(message, 'success'),
    error: (message: string) => showToast(message, 'error'),
    info: (message: string) => showToast(message, 'info'),
    warning: (message: string) => showToast(message, 'warning'),
  }
}
