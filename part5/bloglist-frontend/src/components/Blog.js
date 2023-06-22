import { useState } from "react"

const Blog = ({ blog: { title, author, url, likes, user } }) => {
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

  return (
    <div style={blogStyle}>
      <div>
        { title } - { author }
        <button onClick={toggleVisibility}>{ visible ? 'hide' : 'view' }</button>
      </div>
      <div style={showWhenVisible}>
        { url }
        <div>
          likes: { likes }
          <button>like</button>
        </div>
        { user.name }
      </div>
    </div>
  )
}

export default Blog
