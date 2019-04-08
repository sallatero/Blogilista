const blogsRouter = require('express').Router()
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

blogsRouter.post('/', async (request, response, next) => {
  //Luodaan uusi blogi-olio pyynnön perusteella
  const blog = new Blog(request.body)
  try {
    if (!request.token) {
      return response.status(401).json({error: 'token missing or invalid'})
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'})
    }
    //Haetaan käyttäjä kannasta ja annetaan se viitteeksi blogille
    const user = await User.findById(decodedToken.id)
    blog.user = user.id

    //Myös tässä voisi tehdä tarkistuksen että url ja title on annettu ja likes default setting

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
    //decodedToken: {username: <username>, id: <userid>}
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'})
    }
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() !== decodedToken.id.toString()) {
      response.status(401).json({error: 'unauthorized user'})
    }
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