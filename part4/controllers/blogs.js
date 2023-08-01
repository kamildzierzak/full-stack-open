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

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  if (!body.title || !body.author || !body.url || !body.likes) {
    return response.status(400).send({ error: 'missing fields' })
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updatedBlog)
})

module.exports = blogsRouter
