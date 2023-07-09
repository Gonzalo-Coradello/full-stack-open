import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleUpdate, handleDelete }) => {
  const { id, title, author, likes, url } = blog
  const blogUser = blog.user

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingBlock: 10,
    paddingInline: 5,
    border: 'solid',
    borderWidth: 1,
    marginBlock: 5,
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const addLike = () => {
    handleUpdate(id, { likes: likes + 1 })
  }

  const deleteBlog = () => {
    if (window.confirm(`Do you want to remove blog ${title} by ${author}?`)) {
      handleDelete(id)
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {title} - {author}
        <button className="toggle" onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showWhenVisible} className="blogInfo">
        {url}
        <div>
          likes: {likes}
          <button onClick={addLike}>like</button>
        </div>
        {blogUser.name}
        {blogUser.name === user.name && (
          <button onClick={deleteBlog} style={{ display: 'block' }}>
            remove
          </button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Blog
