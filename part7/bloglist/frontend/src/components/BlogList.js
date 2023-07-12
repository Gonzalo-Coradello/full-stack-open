import { useSelector } from 'react-redux'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useRef } from 'react'
import { Paper, Table, TableContainer, Typography } from '@mui/material'

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const blogFormRef = useRef()

  return (
    <div>
      <Typography variant="h3" textAlign="center" mb={4}>
        Blogs
      </Typography>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <TableContainer
        component={Paper}
        sx={{ marginTop: 2, width: 'fit-content', marginInline: 'auto' }}
      >
        <Table>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList
