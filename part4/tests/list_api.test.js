const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)
mongoose.set('bufferTimeoutMS', 30000)

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

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
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

  test('all the blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('the unique identifier property is named id', async () => {
    const result = await api.get('/api/blogs')

    expect(result.body[0].id).toBeDefined()
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

    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('Test blog 3')
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

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
