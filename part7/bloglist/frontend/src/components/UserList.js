import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(({ users }) => users.users)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  if (!users) return <h2>Loading...</h2>

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>user</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
