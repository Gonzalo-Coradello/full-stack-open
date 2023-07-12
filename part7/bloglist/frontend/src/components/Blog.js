import { TableCell, TableRow, Link as MaterialLink } from '@mui/material'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const { id, title, author } = blog

  const blogStyle = {
    // paddingBlock: 10,
    // paddingInline: 5,
    // border: 'solid',
    // borderWidth: 1,
    // marginBlock: 5,
  }

  return (
    <TableRow style={blogStyle} className="blog">
      <TableCell>
        <MaterialLink component={Link} underline="hover" to={`/blogs/${id}`}>
          {title} - {author}
        </MaterialLink>
      </TableCell>
    </TableRow>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
