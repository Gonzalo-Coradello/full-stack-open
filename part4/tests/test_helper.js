const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: 'Test blog',
    author: 'Gonzalo',
    url: 'http://localhost:3001/api/blogs',
    likes: 2,
  },
  {
    title: 'Test blog 2',
    author: 'Gonzalo',
    url: 'http://localhost:3001/api/blogs',
    likes: 5,
  },
]

const newBlog = {
  title: 'Test blog 3',
  author: 'Gonzalo',
  url: 'http://localhost:3001/api/blogs',
  likes: 0,
}

const nonExistingId = async () => {
  const blog = new Blog(newBlog)
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}