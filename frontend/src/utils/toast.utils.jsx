import { toast } from 'react-toastify'

export const showNotification = (
  message,
  variant = 'error',
  position = 'TOP_RIGHT'
) => {
  toast[variant](message, {
    position: toast.POSITION[position],
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true
  })
}
