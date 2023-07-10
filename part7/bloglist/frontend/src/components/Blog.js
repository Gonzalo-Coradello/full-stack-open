import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { useNotification } from '../hooks'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(({ users }) => users.loggedUser)
  const { setSuccessNotification, setErrorNotification } = useNotification()
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

  const handleUpdate = async (id, data) => {
    try {
      dispatch(updateBlog(id, data))
    } catch (exception) {
      setErrorNotification(exception.message)
    }
  }

  const addLike = () => {
    handleUpdate(id, { likes: likes + 1 })
  }

  const handleDelete = () => {
    if (window.confirm(`Do you want to remove blog ${title} by ${author}?`)) {
      try {
        dispatch(deleteBlog(id))
        setSuccessNotification('Blog deleted')
      } catch (exception) {
        setErrorNotification(exception.message)
      }
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
          <button onClick={handleDelete} style={{ display: 'block' }}>
            remove
          </button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
