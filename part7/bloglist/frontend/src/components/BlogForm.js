import { useDispatch } from 'react-redux'
import { useField, useNotification } from '../hooks'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()
  const { setSuccessNotification, setErrorNotification } = useNotification()
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')

  const resetFields = () => {
    resetTitle('')
    resetAuthor('')
    resetUrl('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = {
        title: title.value,
        author: author.value,
        url: url.value,
      }
      blogFormRef.current.toggleVisibility()
      resetFields()
      const error = await dispatch(createBlog(data))
      if (error) {
        return setErrorNotification(error)
      }
      setSuccessNotification(
        `New blog "${data.title}" by ${data.author} created`,
      )
    } catch (exception) {
      setErrorNotification(exception.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input name="Title" placeholder="write blog title here" {...title} />
      </div>
      <div>
        author
        <input name="Author" placeholder="John Doe" {...author} />
      </div>
      <div>
        url
        <input name="Url" placeholder="https://yoursite.com" {...url} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
