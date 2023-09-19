import { Link, Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
      <nav>
        <Link to='/authors'>authors</Link>
        <Link to='/books'>books</Link>
        <Link to='/add'>add book</Link>
      </nav>
      <Outlet />
    </>
  )
}

export default App
