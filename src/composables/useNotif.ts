import { useToast } from 'vue-toast-notification'

export const useNotif = () => {
  const toast = useToast()

  const notifySuccess = (message: string) => {
    toast.success(message, {
      // Options supplémentaires si besoin (ex: icône spécifique)
    })
  }

  const notifyError = (message: string) => {
    toast.error(message, {
      // Options supplémentaires si besoin
    })
  }

  const notifyInfo = (message: string) => {
    toast.info(message)
  }

  const notifyWarning = (message: string) => {
    toast.warning(message)
  }

  return {
    notifySuccess,
    notifyError,
    notifyInfo,
    notifyWarning,
  }
}
