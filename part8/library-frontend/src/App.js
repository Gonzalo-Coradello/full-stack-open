import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqueByTitle = a => {
    console.log('UNIQUE BY TITLE', a)
    let seen = new Set()
    return a.filter(item => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueByTitle(allBooks.concat({ ...addedBook })),
    }
  })
}

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('error')
  const client = useApolloClient()

  const notify = (message, type) => {
    setNotificationType(type)
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 10000)
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      notify(
        `New book "${addedBook.title}" by ${addedBook.author.name} added`,
        'success'
      )
      updateCache(
        client.cache,
        { query: ALL_BOOKS, variables: { genre: null } },
        addedBook
      )
    },
  })

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
      <Notify message={notification} type={notificationType} />
      {token ? (
        <Outlet />
      ) : (
        <div>
          <h2>Login</h2>
          <LoginForm setToken={setToken} setError={notify} />
        </div>
      )}
    </>
  )
}

export default App
