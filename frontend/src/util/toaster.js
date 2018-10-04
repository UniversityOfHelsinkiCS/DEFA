import { toast } from 'react-toastify'

const toaster = () => next => action => {
  if (action.toast) {
    toast(action.toast.message, action.toast.options)
  }
  next(action)
}

export default toaster
