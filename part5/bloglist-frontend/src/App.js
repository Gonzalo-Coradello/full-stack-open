import './index.css'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
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

  const handleCreate = async e => {
    e.preventDefault()
    try {
      const data = {
      title, author, url
    }

    const newBlog = await blogService.create(data)
    setBlogs(prev => prev.concat(newBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
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
        <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
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
      <BlogForm title={title} author={author} url={url} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} handleCreate={handleCreate} />
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
