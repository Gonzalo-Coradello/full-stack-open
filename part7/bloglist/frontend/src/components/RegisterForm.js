import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { registerUser } from '../reducers/userReducer'
import { useNotification } from '../hooks'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { setSuccessNotification, setErrorNotification } = useNotification()
  const { reset: resetName, ...name } = useField('text')
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const error = await dispatch(
        registerUser({
          name: name.value,
          username: username.value,
          password: password.value,
        }),
      )
      if (error) {
        return setErrorNotification(error)
      }
      setSuccessNotification('Registered successfully')
    } catch (exception) {
      setErrorNotification(exception)
    } finally {
      resetName()
      resetUsername()
      resetPassword()
      navigate('/')
    }
  }

  return (
    <div>
      <h2>register</h2>
      <form onSubmit={handleRegister}>
        <div>
          full name
          <input id="username" name="Name" {...name} />
        </div>
        <div>
          username
          <input id="username" name="Username" {...username} />
        </div>
        <div>
          password
          <input id="password" name="Password" {...password} />
        </div>
        <button type="submit">register</button>
      </form>
    </div>
  )
}

export default RegisterForm
