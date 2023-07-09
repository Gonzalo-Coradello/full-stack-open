import PropTypes from 'prop-types'
import { useField } from '../hooks'

const LoginForm = ({ handleLogin }) => {
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('text')

  const login = (e) => {
    e.preventDefault()
    handleLogin({ username: username.value, password: password.value })
    resetUsername()
    resetPassword()
  }

  return (
    <form onSubmit={login}>
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

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
