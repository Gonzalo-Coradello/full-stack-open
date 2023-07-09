import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { useNotification } from '../hooks'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { setSuccessNotification, setErrorNotification } = useNotification()
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const error = await dispatch(
        login({ username: username.value, password: password.value }),
      )
      if (error) {
        return setErrorNotification('Wrong credentials')
      }
      setSuccessNotification('Logged in successfully')
    } catch (exception) {
      setErrorNotification('Wrong credentials')
    } finally {
      resetUsername()
      resetPassword()
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input id="username" name="Username" {...username} />
      </div>
      <div>
        password
        <input id="password" name="Password" {...password} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
