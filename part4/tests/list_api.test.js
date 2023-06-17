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

  test('a blog is successfully created', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const blogsWithoutId = blogsAtEnd.map(({ title, author, url, likes }) => ({ title, author, url, likes }))

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsWithoutId).toContainEqual(helper.newBlog)
  })

  test('the likes property defaults to 0 when it is missing', async () => {
    const newBlog = {
      title: 'Red, green, refactor',
      author: 'Gonzalo Coradello',
      url: 'http://localhost:3001/api/blogs/4'
    }

    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.body.likes).toEqual(0)
  })
  
  test('a blog with missing content is not added', async () => {
    const blogWithoutTitle = {
      author: 'Gonzalo Coradello',
      url: 'http://localhost:3001/api/blogs',
      likes: 0
    }

    const blogWithoutUrl = {
      title: 'Testing is fun',
      author: 'Gonzalo Coradello',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)
      
    await api
    .post('/api/blogs')
    .send(blogWithoutUrl)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
