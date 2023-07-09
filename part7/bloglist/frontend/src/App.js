import './index.css'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useNotification } from './hooks'

const App = () => {
  const { setSuccessNotification, setErrorNotification } = useNotification()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (data) => {
    try {
      const user = await loginService.login(data)
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setSuccessNotification(`${user.name} logged in`)
    } catch (exception) {
      setErrorNotification('Wrong credentials')
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    const name = user.name
    window.localStorage.removeItem('user')
    setUser(null)
    setSuccessNotification(`${name} logged out`)
  }

  const createBlog = async (data) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(data)
      setBlogs((prev) => prev.concat(newBlog))
      setSuccessNotification(
        `New blog "${newBlog.title}" by ${newBlog.author} created`,
      )
    } catch (exception) {
      setErrorNotification(exception.response.data.error)
    }
  }

  const updateBlog = async (id, data) => {
    try {
      const updatedBlog = await blogService.update(id, data)
      setBlogs((prev) =>
        prev.map((blog) => (blog.id === id ? updatedBlog : blog)),
      )
    } catch (exception) {
      setErrorNotification(exception.response.data.error)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs((prev) => prev.filter((b) => b.id !== id))
      setSuccessNotification('Blog deleted')
    } catch (exception) {
      setErrorNotification(exception.response.data.error)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Log in</h2>
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
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
