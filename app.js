//const http = require('http')
const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const blogsRouter = require('./controllers/blogs')
const cors = require('cors')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

mongoose.set('useFindAndModify', false)

//Yhdistetään tietokantaan
logger.info('connecting to db at ', config.mongoUrl)
mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
.then(() => {
    logger.info('connected to MongoDB')
})
.catch((error) => {
    logger.info('error connecting to MongoDB: ', error.message)  
})

//Otetaan middlewareja käyttöön
//app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
app.use(middleware.requestLogger)

//Otetaan blogsRouter käyttöön ja käytetään sitä vain jos polun alku on /api/blogs
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app