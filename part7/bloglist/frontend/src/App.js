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
import { useDispatch, useSelector } from 'react-redux'
import {
  initializeBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from './reducers/blogReducer'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const { setSuccessNotification, setErrorNotification } = useNotification()

  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
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

  const handleCreate = async (data) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(data))
      setSuccessNotification(
        `New blog "${data.title}" by ${data.author} created`,
      )
    } catch (exception) {
      setErrorNotification(exception.response.data.error)
    }
  }

  const handleUpdate = async (id, data) => {
    try {
      dispatch(updateBlog(id, data))
    } catch (exception) {
      setErrorNotification(exception.response.data.error)
    }
  }

  const handleDelete = async (id) => {
    try {
      dispatch(deleteBlog(id))
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
        <BlogForm handleCreate={handleCreate} />
      </Togglable>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        ))}
    </div>
  )
}

export default App
