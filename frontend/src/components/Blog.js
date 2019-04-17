import React, { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog, username }) => {
  const [showAll, setShowAll] = useState(false)
  //console.log('BLOG Props: ', blog)
  let deletable = true
  if (blog.user) {
    deletable = blog.user.username === username
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  //showAllInfo: näytetään kun blogi on "avattu"
  const showAllInfo = { display: showAll ? '' : 'none' }
  //ableToDelete: blogin delete-nappula näkyy vain blogin lisänneelle käyttäjälle
  const ableToDelete = { display: deletable ? '' : 'none' }

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div onClick={toggleShowAll} className='defaultBlogView'>
        {blog.title} {blog.author}
      </div>
      <div style={showAllInfo} className='showAllBlogView'>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button onClick={() => addLike(blog.id)}>like</button></p>
        <p>added by {blog.user ? blog.user.name : ''}</p>
        <div style={ableToDelete}>
          <p><button onClick={() => deleteBlog(blog.id)}>delete</button></p>
        </div>
      </div>
    </div>
  )
}

export default Blog