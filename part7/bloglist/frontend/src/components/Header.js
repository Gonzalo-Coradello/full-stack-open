import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../reducers/userReducer'
import { useNotification } from '../hooks'
import { Link, useNavigate } from 'react-router-dom'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'

const Header = () => {
  const user = useSelector(({ users }) => users.loggedUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { setSuccessNotification } = useNotification()

  const handleLogout = (e) => {
    e.preventDefault()
    const name = user.name
    dispatch(removeUser())
    navigate('/')
    setSuccessNotification(`${name} logged out`)
  }

  return (
    <AppBar>
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        {user ? (
          <>
            <Button variant="text" color="inherit" onClick={handleLogout}>
              logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/">
            login
          </Button>
        )}
        {user && (
          <Typography variant="body2" marginLeft="auto">
            {user.name} logged in
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
