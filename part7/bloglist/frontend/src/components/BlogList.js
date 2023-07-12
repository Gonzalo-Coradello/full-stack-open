import { useSelector } from 'react-redux'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useRef } from 'react'
import { Box, Paper, Table, TableContainer, Typography } from '@mui/material'

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
      <Box maxWidth={650} mx="auto" mt={2}>
        <TableContainer component={Paper}>
          <Table>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
          </Table>
        </TableContainer>
      </Box>
    </div>
  )
}

export default BlogList
