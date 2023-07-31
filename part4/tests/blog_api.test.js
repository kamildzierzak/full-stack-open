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

test('unique identifier property of the blog is names id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

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

afterAll(async () => {
  await mongoose.connection.close()
})
