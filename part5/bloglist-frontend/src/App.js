import './index.css'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState('success')

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async data => {
    try {
      const user = await loginService.login(data)
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setNotificationMessage(`${user.name} logged in`)
    } catch (exception) {
      setNotificationStatus('error')
      setNotificationMessage('Wrong credentials')
    } finally {
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationStatus('success')
      }, 5000)
    }
  } 

  const handleLogout = e => {
    e.preventDefault()
    const name = user.name
    window.localStorage.removeItem('user')
    setUser(null)
    setNotificationMessage(`${name} logged out`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const createBlog = async (data) => {
    try {
    const newBlog = await blogService.create(data)
    setBlogs(prev => prev.concat(newBlog))
    setNotificationMessage(`New blog "${newBlog.title}" by ${newBlog.author} created`)
  } catch (exception) {
    setNotificationStatus('error')
    setNotificationMessage(exception.response.data.error)
  } finally {
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationStatus('success')
    }, 5000)
  }
  }

  if (user === null) {
    return (
      <div>
        <Notification status={notificationStatus} message={notificationMessage} />
        <h2>Log in</h2>
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <Notification status={notificationStatus} message={notificationMessage} />
      <h2>blogs</h2>
      { user && <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div> }
      <Togglable buttonLabel='new note'>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
