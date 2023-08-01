const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.inititalBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blog posts are returned in JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog list application returns the correct amount of blog posts', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.inititalBlogs.length)
})

test('unique identifier property of the blog is named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

describe('addition of a new blog', () => {
  test('HTTP POST request to the /api/blogs URL successfully creates a new blog post', async () => {
    const newBlog = {
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      url: 'https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow',
      likes: 1000,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.inititalBlogs.length + 1)

    const savedBlog = await Blog.findOne({
      title: newBlog.title,
      author: newBlog.author,
    })
    expect(savedBlog.title).toContain('Thinking, Fast and Slow')
    expect(savedBlog.author).toContain('Daniel Kahneman')
    expect(savedBlog.url).toContain(
      'https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow'
    )
    expect(savedBlog.likes).toEqual(1000)
  })

  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: 'Moving AI governance forward',
      author: 'OpenAI',
      url: 'https://openai.com/blog/moving-ai-governance-forward',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.inititalBlogs.length + 1)

    const savedBlog = await Blog.findOne({
      title: newBlog.title,
      author: newBlog.author,
    })
    expect(savedBlog.likes).toEqual(0)
  })

  test('if the title is missing from the request data, the backend responds to the request with the status code 400 Bad Request', async () => {
    const newBlog = {
      author: 'OpenAI',
      url: 'https://openai.com/blog/moving-ai-governance-forward',
      likes: 12345,
    }

    const response = await api.post('/api/blogs').send(newBlog)

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'title is missing' })
  })

  test('if the url is missing from the request data, the backend responds to the request with the status code 400 Bad Request', async () => {
    const newBlog = {
      title: 'Moving AI governance forward',
      author: 'OpenAI',
      likes: 12345,
    }

    const response = await api.post('/api/blogs').send(newBlog)

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'url is missing' })
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const response = await api.delete('/api/blogs/5a422a851b54a676234d17f7')

    expect(response.status).toBe(204)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
