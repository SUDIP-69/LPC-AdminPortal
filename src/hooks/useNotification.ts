import { useCallback } from 'react'
import toast from 'react-hot-toast'

type NotificationType = 'success' | 'error' | 'info' | 'warning'

interface NotificationOptions {
  duration?: number
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
}

export function useNotification() {
  const showNotification = useCallback(
    (message: string, type: NotificationType = 'info', options?: NotificationOptions) => {
      const defaultOptions = {
        duration: 4000,
        position: 'top-right' as const,
      }

      const toastOptions = {
        ...defaultOptions,
        ...options,
      }

      switch (type) {
        case 'success':
          toast.success(message, toastOptions)
          break
        case 'error':
          toast.error(message, toastOptions)
          break
        case 'warning':
          toast(message, {
            ...toastOptions,
            icon: '⚠️',
          })
          break
        default:
          toast(message, toastOptions)
      }
    },
    []
  )

  const showSuccess = useCallback(
    (message: string, options?: NotificationOptions) => {
      showNotification(message, 'success', options)
    },
    [showNotification]
  )

  const showError = useCallback(
    (message: string, options?: NotificationOptions) => {
      showNotification(message, 'error', options)
    },
    [showNotification]
  )

  const showWarning = useCallback(
    (message: string, options?: NotificationOptions) => {
      showNotification(message, 'warning', options)
    },
    [showNotification]
  )

  const showInfo = useCallback(
    (message: string, options?: NotificationOptions) => {
      showNotification(message, 'info', options)
    },
    [showNotification]
  )

  const dismissAll = useCallback(() => {
    toast.dismiss()
  }, [])

  return {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    dismissAll,
  }
}

// Example usage:
/*
const { showSuccess, showError, showWarning, showInfo } = useNotification()

// Show a success notification
showSuccess('Operation completed successfully!')

// Show an error notification
showError('Something went wrong!')

// Show a warning notification
showWarning('Please review your changes before proceeding.')

// Show an info notification
showInfo('New updates are available.')

// Show a custom notification
showNotification('Custom message', 'info', {
  duration: 5000,
  position: 'bottom-center',
})
*/ 