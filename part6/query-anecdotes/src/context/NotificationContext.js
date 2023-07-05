import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'REMOVE':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notification, dispatchNotification] = useReducer(notificationReducer, '')

  const setNotification = notificationMessage => {
    dispatchNotification({ type: 'SET', payload: notificationMessage })
    setTimeout(() => {
      dispatchNotification({ type: 'REMOVE' })
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const result = useContext(NotificationContext)
  return result[0]
}

export const useNotificationDispatch = () => {
  const result = useContext(NotificationContext)
  return result[1]
}

export default NotificationContext
