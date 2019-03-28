//const http = require('http')
const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const blogsRouter = require('./controllers/blogs')
const cors = require('cors')
const mongoose = require('mongoose')

//Yhdistetään tietokantaan
console.log('connecting to db at ', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
//lisää then ja catch

//Otetaan middlewareja käyttöön
app.use(cors())
app.use(bodyParser.json())

//Otetaan blogsRouter käyttöön ja käytetään sitä vain jos polun alku on /api/blogs
app.use('/api/blogs', blogsRouter)

module.exports = app