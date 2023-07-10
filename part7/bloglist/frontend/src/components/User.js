import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllUsers } from '../reducers/userReducer'

const User = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const user = useSelector(({ users }) => users.users.find((u) => u.id === id))

  useEffect(() => {
    if (!user) {
      dispatch(getAllUsers())
    }
  }, [])

  if (!user) return <h2>loading...</h2>
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
