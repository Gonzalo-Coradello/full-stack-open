const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)
mongoose.set('bufferTimeoutMS', 30000)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
}, 100000)

describe('GET blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the unique identifier property is named id', async () => {
    const result = await api.get('/api/blogs')

    expect(result.body[0].id).toBeDefined()
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const blogsWithoutId = response.body.map(({ title, author, url, likes }) => ({ title, author, url, likes }))

    expect(blogsWithoutId).toContainEqual(helper.initialBlogs[0])
  })
})

describe('POST blogs', () => {

  const newBlog = {
    title: 'Test blog 3',
    author: 'Gonzalo',
    url: 'http://localhost:3001/api/blogs',
    likes: 0,
  }

  test('a blog is successfully created', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    const blogsWithoutId = blogsAtEnd.map(({ title, author, url, likes }) => ({ title, author, url, likes }))

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsWithoutId).toContainEqual(newBlog)
  })

  test('a blog with missing content is not added', async () => {
    const newBlog = {
      author: 'Gonzalo',
      url: 'http://localhost:3001/api/blogs'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
