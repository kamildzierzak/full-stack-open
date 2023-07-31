const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (blog.title === undefined) {
    return response.status(400).json({ error: 'title is missing' })
  }

  if (blog.url === undefined) {
    return response.status(400).json({ error: 'url is missing' })
  }

  if (blog.likes === undefined) {
    blog.likes = 0
  }

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter
