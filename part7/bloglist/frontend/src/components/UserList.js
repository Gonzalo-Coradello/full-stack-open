import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/userReducer'

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
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.username}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserList
