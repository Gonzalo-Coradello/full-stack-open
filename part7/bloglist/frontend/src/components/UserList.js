import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(({ users }) => users.users)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  if (!users) return <h2>Loading...</h2>

  return (
    <div>
      <h2>users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>user</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </TableCell>
                <TableCell>{u.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList
