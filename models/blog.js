const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {type: String, required: [true, 'Blog must have a title']},
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)