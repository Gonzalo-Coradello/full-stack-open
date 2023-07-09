import './index.css'
import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
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
import { setUser, login, removeUser } from './reducers/userReducer'

const App = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)
  const { setSuccessNotification, setErrorNotification } = useNotification()

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
    }
  }, [])

  const handleLogin = async (data) => {
    try {
      const error = await dispatch(login(data))
      if (error) {
        return setErrorNotification('Wrong credentials')
      }
      setSuccessNotification('Logged in successfully')
    } catch (exception) {
      console.log(exception)
      setErrorNotification('Wrong credentials')
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    const name = user.name
    dispatch(removeUser())
    setSuccessNotification(`${name} logged out`)
  }

  const handleCreate = async (data) => {
    try {
      blogFormRef.current.toggleVisibility()
      const error = await dispatch(createBlog(data))
      if (error) {
        return setErrorNotification(error)
      }
      setSuccessNotification(
        `New blog "${data.title}" by ${data.author} created`,
      )
    } catch (exception) {
      setErrorNotification(exception.message)
    }
  }

  const handleUpdate = async (id, data) => {
    try {
      dispatch(updateBlog(id, data))
    } catch (exception) {
      setErrorNotification(exception.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      dispatch(deleteBlog(id))
      setSuccessNotification('Blog deleted')
    } catch (exception) {
      setErrorNotification(exception.message)
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
