const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  //console.log('array to go trough: ', blogs)
  const totalLikes = blogs.reduce((sum, blog) => {
    //console.log('sum: ', sum, ', blog likes: ', blog.likes)
    return sum + blog.likes
  }, 0)
  return totalLikes
}

//Etsii sen blogin jolla on eniten likejä
const favoriteBlog = (blogs) => {
  let traceInitial = {
    title: '',
    _id: '',
    author: '',
    likes: 0
  }
  const favoriteBlog = blogs.reduce((trace, blog) => {
    if (blog.likes > trace.likes) {
      trace.title = blog.title
      trace.likes = blog.likes
      trace.author = blog.author
      trace._id = blog._id
    }
    return trace
  }, traceInitial)
  console.log(`blog with most likes: ${JSON.stringify(favoriteBlog)}`)
  return favoriteBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}