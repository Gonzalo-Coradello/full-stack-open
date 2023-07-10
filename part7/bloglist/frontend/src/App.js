import './index.css'
import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { Routes, Route } from 'react-router-dom'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Header from './components/Header'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ users }) => users.loggedUser)

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
  }, [])

  return (
    <div>
      <Header />
      <Notification />
      <Routes>
        <Route path="/" element={user ? <BlogList /> : <LoginForm />} />
        <Route path="/users" element={<UserList />} />
        {/* <Route path='/register' element={<RegisterForm />} /> */}
        {/* <Route path='/blogs/:id' element={<Blogs />} /> */}
        {/* <Route path='/users/:id' element={<Users />} /> */}
      </Routes>
    </div>
  )
}

export default App
