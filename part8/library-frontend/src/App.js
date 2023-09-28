import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const notify = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <>
      <nav>
        <Link to='/authors'>authors</Link>
        <Link to='/books'>books</Link>
        <Link to='/add'>add book</Link>
        <Link to='/recommend'>recommend</Link>
        <button onClick={logout}>logout</button>
      </nav>
      {token ? (
        <Outlet />
      ) : (
        <div>
          <Notify errorMessage={errorMessage} />
          <h2>Login</h2>
          <LoginForm setToken={setToken} setError={notify} />
        </div>
      )}
    </>
  )
}

export default App
