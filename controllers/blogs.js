const blogsRouter = require('express').Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1, id: 1})
    response.json(blogs.map(blog => blog.toJSON()))
  } catch(exception) {
    next(exception)
  }
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'})
    }
    //Haetaan ensimmäinen käyttäjä kannasta
    const user = await User.findById(decodedToken.id)
    //Luodaan uusi blogi-olio ja sille viitteeksi löydetty käyttäjä
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
    const savedBlog = await blog.save() //Talletetaan blogi
    user.blogs = user.blogs.concat(savedBlog._id) //Lisätään blogi käyttäjän alle
    await user.save()
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