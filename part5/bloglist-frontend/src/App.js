import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  // const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

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
    } catch (exception) {
      console.log(exception)
      // setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }
  } 

  const handleLogout = e => {
    e.preventDefault()
    window.localStorage.removeItem('user')
    setUser(null)
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
    
  } catch (exception) {
    console.log(exception)
    // setErrorMessage('Wrong credentials')
    // setTimeout(() => {
    //   setErrorMessage(null)
    // }, 5000)
  }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in</h2>
        <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
      </div>
    )
  }

  return (
    <div>
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
