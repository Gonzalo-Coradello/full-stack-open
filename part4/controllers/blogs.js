const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
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
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
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