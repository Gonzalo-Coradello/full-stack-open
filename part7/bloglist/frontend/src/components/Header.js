import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../reducers/userReducer'
import { useNotification } from '../hooks'

const Header = () => {
  const user = useSelector(({ users }) => users.loggedUser)
  const dispatch = useDispatch()
  const { setSuccessNotification } = useNotification()

  const handleLogout = (e) => {
    e.preventDefault()
    const name = user.name
    dispatch(removeUser())
    setSuccessNotification(`${name} logged out`)
  }

  return (
    <div>
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
    </div>
  )
}

export default Header
