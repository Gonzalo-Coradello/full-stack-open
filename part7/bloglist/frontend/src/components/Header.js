import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../reducers/userReducer'
import { useNotification } from '../hooks'
import { Link } from 'react-router-dom'

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
          <nav>
            <Link to="/">blogs</Link>
            <Link to="/users">users</Link>
          </nav>
          <div>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
