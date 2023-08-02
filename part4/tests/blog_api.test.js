const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

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

  describe('update of a blog', () => {
    test('succeeds with valid data', async () => {
      const fakeBody = {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 111,
      }

      const response = await api
        .put('/api/blogs/5a422bc61b54a676234d17fc')
        .send(fakeBody)

      const updatedBlog = await Blog.findOne({
        _id: '5a422bc61b54a676234d17fc',
      })

      expect(response.body.likes).toEqual(111)
      expect(updatedBlog.likes).toEqual(111)
    })

    test('fails with status code 400 if invalid data', async () => {
      const fakeBody = {
        title: 'Type wars',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 111,
      }

      const response = await api
        .put('/api/blogs/5a422bc61b54a676234d17fc')
        .send(fakeBody)

      expect(response.status).toBe(400)
    })
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'user',
      name: 'User Usersky',
      password: 'qwerty',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'qwerty',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
