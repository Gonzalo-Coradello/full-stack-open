import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

export const useNotification = () => {
  const dispatch = useDispatch()

  const setSuccessNotification = (message, timeOut = 5) => {
    dispatch(setNotification({ status: 'success', message }, timeOut))
  }

  const setErrorNotification = (message, timeOut = 5) => {
    dispatch(setNotification({ status: 'error', message }, timeOut))
  }

  return { setSuccessNotification, setErrorNotification }
}
