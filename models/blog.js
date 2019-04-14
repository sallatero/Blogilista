const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Blog must have a title'] },
  author: String,
  url: { type: String, required: [true, 'Blog must have a url'] },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id
    delete returnedObj._id
    delete returnedObj.__v
  }
})
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog