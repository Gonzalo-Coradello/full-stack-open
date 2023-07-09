import { useSelector } from 'react-redux'

const Notification = () => {
  const { status, message } = useSelector((state) => state.notification)

  if (!message) return null

  return (
    <div className={`${status === 'success' ? 'success' : 'error'}`}>
      {message}
    </div>
  )
}

export default Notification
