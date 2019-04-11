import React, { useState } from 'react'

const Blog = ({ blog, addLike }) => {
  const [showAll, setShowAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log('Blog props: ', blog) //uuden blogin user ei ole {}

  //showWhenVisible: näytetään kun login-lomakkeen tulisi olla näkyvissä
  const showAllInfo = { display: showAll ? '' : 'none' }

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  const addLikes = () => {
    console.log('LIKE painettu.')
    console.log('blog.title: ', blog.title)
    console.log('blog.id: ', blog.id)
  }
  
  return (
    <div style={blogStyle}>
      <div onClick={toggleShowAll}>
        {blog.title} {blog.author} {blog.user ? blog.user.name : ''}
      </div>
      <div style={showAllInfo}>
        <p>{blog.url}</p> 
        <p>{blog.likes} likes <button onClick={() => addLike(blog.id)}>like</button></p>
        <p>added by {blog.user ? blog.user.name : ''}</p>
      </div>
    </div>
  )
}

export default Blog