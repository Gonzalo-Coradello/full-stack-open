import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  addComment,
  deleteBlog,
  initializeBlogs,
  updateBlog,
} from '../reducers/blogReducer'
import { useNotification } from '../hooks'

const BlogDetail = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector(({ blogs }) => blogs.find((b) => b.id === id))
  const user = useSelector(({ users }) => users.loggedUser)
  const { setSuccessNotification, setErrorNotification } = useNotification()
  const [comment, setComment] = useState('')

  useEffect(() => {
    if (!blog) {
      dispatch(initializeBlogs())
    }
  }, [])

  const handleUpdate = async (id, data) => {
    try {
      dispatch(updateBlog(id, data))
    } catch (exception) {
      setErrorNotification(exception.message)
    }
  }

  const addLike = () => {
    handleUpdate(id, { likes: blog.likes + 1 })
  }

  const handleDelete = () => {
    if (
      window.confirm(
        `Do you want to remove blog ${blog.title} by ${blog.author}?`,
      )
    ) {
      try {
        dispatch(deleteBlog(id))
        setSuccessNotification('Blog deleted')
      } catch (exception) {
        setErrorNotification(exception.message)
      }
    }
  }

  const handleComment = (e) => {
    e.preventDefault()
    dispatch(addComment(id, comment))
  }

  if (!blog) return <h2>loading...</h2>

  return (
    <div>
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={addLike}>like</button>
      </div>
      <p>added by {blog.user.name}</p>
      {blog.user.name === user.name && (
        <button onClick={handleDelete} style={{ display: 'block' }}>
          remove
        </button>
      )}
      <div>
        <h4>comments</h4>
        <form onSubmit={handleComment}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button>add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BlogDetail
