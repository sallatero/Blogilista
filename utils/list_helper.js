const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

//Etsii blogien joukosta sen kirjoittajan, jolla on eniten blogeja. 
//Palauttaa kirjailijan nimen ja blogien määrän
const mostBlogs = (blogs) => {
  //Lasketaan authoreiden blogien määrät
  const bloggers = lodash.countBy(blogs, (blog) => {
    return blog.author
  })

  //Käydään bloggers läpi ja laitetaan authorit ja blogien määrät taulukkoon
  //key, value -pareihin: author, count
  let bloggersList = []
  const addBlogger = (value, key) => {
    let newB = { author: key, count: value }
    let temp = bloggersList.concat(newB)
    bloggersList = temp
  }
  lodash.forIn(bloggers, (value, key) => {
    addBlogger(value, key)
  })
  //console.log(`bloggers list: ${JSON.stringify(bloggersList)}`)
  
  //Etsitään author, jolla eniten blogeja
  let bestBlogger = lodash.maxBy(bloggersList, (o) => {
    return o.count
  })
  /*
  if (!bestBlogger) {
    bestBlogger = {}
  }*/
  return bestBlogger
}

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
  return totalLikes
}

//Etsii sen blogin jolla on eniten likejä ja palauttaa sen, jos blogs on {} palauttaa falsyn
const favoriteBlog = (blogs) => {

  let favoriteBlog = lodash.maxBy(blogs, (o) => {
    return o.likes
  })
  return favoriteBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}