import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const { id, title, author } = blog

  const blogStyle = {
    paddingBlock: 10,
    paddingInline: 5,
    border: 'solid',
    borderWidth: 1,
    marginBlock: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      <Link to={`/blogs/${id}`}>
        {title} - {author}
      </Link>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
