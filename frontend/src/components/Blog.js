import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  //showWhenVisible: näytetään kun login-lomakkeen tulisi olla näkyvissä
  const showAllInfo = { display: showAll ? '' : 'none' }

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  console.log('blog.user on: ', blog.user)
  return (
    <div style={blogStyle}>
      <div onClick={toggleShowAll}>
        {blog.title} {blog.author}
      </div>
      <div style={showAllInfo}>
        <p>{blog.url}</p> 
        <p>{blog.likes} likes <button>like</button></p>
        <p>added by {blog.user ? blog.user.name : ''}</p>
      </div>
    </div>
  )
}

export default Blog