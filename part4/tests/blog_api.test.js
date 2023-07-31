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

afterAll(async () => {
  await mongoose.connection.close()
})
