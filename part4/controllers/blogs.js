const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  if(!blog) {
    response.status(404).end()
  }
  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const blogData = request.body
  const user = await User.findOne({})

  const blog = new Blog({
    ...blogData,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const result = await Blog.findByIdAndRemove(id)
  if(!result) {
    response.status(404).end()
  }
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const data = request.body

  const blogToUpdate = await Blog.findOne({ _id: id})

  if(!blogToUpdate) {
    return response.status(404).end()
  }

  const newBlog = {
    ...blogToUpdate.doc,
    ...data
  }
  
  const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter