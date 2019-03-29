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

module.exports = {
  dummy,
  totalLikes
}