const Notify = ({ message, type }) => {
  if (!message) {
    return null
  }
  return (
    <div style={{ color: type === 'error' ? 'red' : 'green' }}>{message}</div>
  )
}

export default Notify
