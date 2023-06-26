import './index.css'
import { useState, useEffect, useRef } from 'react'
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
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStatus, setNotificationStatus] = useState('success')
  const blogFormRef = useRef()

  useEffect(() => {
    (async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    })()
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

  const createBlog = async data => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(data)
      setBlogs(prev => prev.concat(newBlog))
      setNotificationMessage(
        `New blog "${newBlog.title}" by ${newBlog.author} created`
      )
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

  const updateBlog = async (id, data) => {
    try {
      const updatedBlog = await blogService.update(id, data)
      setBlogs(prev => prev.map(blog => blog.id === id ? updatedBlog : blog))
      // setNotificationMessage(`Blog "${updatedBlog.title}" by ${updatedBlog.author} updated`)
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

  const deleteBlog = async id => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(prev => prev.filter(b => b.id !== id))
      setNotificationMessage('Blog deleted')
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
        <Notification
          status={notificationStatus}
          message={notificationMessage}
        />
        <h2>Log in</h2>
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <Notification status={notificationStatus} message={notificationMessage} />
      <h2>blogs</h2>
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleUpdate={updateBlog}
          handleDelete={deleteBlog}
        />
      ))}
    </div>
  )
}

export default App
