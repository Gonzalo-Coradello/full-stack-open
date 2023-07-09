import { useField } from '../hooks'

const BlogForm = ({ createBlog }) => {
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')

  const resetFields = () => {
    resetTitle('')
    resetAuthor('')
    resetUrl('')
  }

  const addBlog = (e) => {
    e.preventDefault()
    const blogData = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    createBlog(blogData)
    resetFields()
  }

  return (
    <form onSubmit={addBlog}>
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
