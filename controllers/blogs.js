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
    //Tarkistetaan että url ja title on annettu
    if(blog.title === '' || blog.title === null) {
      return response.status(400).json({error: 'title missing'})
    }
    if(blog.url === '' || blog.url === null) {
      return response.status(400).json({error: 'url missing'})
    }
    if (!request.token) {
      return response.status(401).json({error: 'token missing or invalid'})
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'})
    }
    
    //Haetaan käyttäjä kannasta ja annetaan se viitteeksi blogille
    const user = await User.findById(decodedToken.id)
    console.log('user: ', user)
    blog.user = user.id
    const savedBlog = await blog.save() //Talletetaan blogi
    console.log('savedBlog: ', savedBlog)
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
    if (!request.token) {
      return response.status(401).json({error: 'token missing or invalid'})
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'})
    }

    const body = request.body
    const putThis = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    const oldVersion = await Blog.findById(request.params.id)
    if (!oldVersion) {
      return response.status(404).json({error: 'blog does not exist'})
    }
    const newVersion = await Blog.findByIdAndUpdate(request.params.id, putThis, {new: true})
    if (newVersion) {
      response.status(204).json(newVersion.toJSON())
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter