const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { userExtractor } = require('../utils/middleware')

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

blogsRouter.post('/', userExtractor, async (request, response) => {
  const blogData = request.body
  const user = request.user

  const blog = new Blog({
    ...blogData,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const id = request.params.id
  const user = request.user

  const blog = await Blog.findById(id)

  if(!blog) {
    return response.status(404).end()
  }

  console.log(blog.user.toString())
  console.log(user._id.toString())

  if(blog.user.toString() !== user._id.toString()) {
    return response.status(403).json({ error: 'You can only delete your own blogs' })
  }

  await Blog.deleteOne({ _id: blog.id })
  response.status(204).end()
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
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