const blogsRouter = require('express').Router()
const mongoose = require('mongoose')

const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})


blogsRouter.delete('/:id', async (request, response, next) => {
  
  try {
    const deletable = await Blog.findByIdAndRemove(request.params.id)

    if (deletable) {
      //console.log('tietokannasta löytyi id:llä ', request.params.id)
      response.status(204).end()
    } else {
      response.status(204).end()
    }
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  
  try {
    const body = request.body

    const blog = {
      likes: body.likes
    }
    const exists = await Blog.findById(request.params.id)
    if (!exists) {
      response.status(404).end()
      return
    }
    if (!body.likes) {
      response.status(400).end()
      return
    }

    const modified = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})

    if (modified) {
      response.status(204).json(modified.toJSON())
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter