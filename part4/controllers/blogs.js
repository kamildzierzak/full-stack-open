const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title) {
    return response.status(400).json({ error: 'title is missing' })
  }

  if (!body.url) {
    return response.status(400).json({ error: 'url is missing' })
  }

  if (!body.likes) {
    body.likes = 0
  }

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(blog.id)
    // remove references from blogs array in user
    await user.updateOne({
      $pull: {
        blogs: blog.id,
      },
    })
    return response.status(204).end()
  } else {
    return response.status(401).json({ error: 'user invalid' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  if (!body.title || !body.author || !body.url || !body.likes || !body.user) {
    return response.status(400).send({ error: 'missing fields' })
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user.id,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updatedBlog)
})

module.exports = blogsRouter
