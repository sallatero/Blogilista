import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({addBlog, setMessage, updateUser}) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogLikes, setNewBlogLikes] = useState(0)

  const resetBlogFields = () => {
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
    setNewBlogLikes(0)
  }

  const handleBlogAdd = async (event) => {
    event.preventDefault()
    console.log('adding a new blog', newBlogTitle)
    try {
      const blog = await blogService.create({
        title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl, likes: newBlogLikes
      })
      addBlog(blog)
      resetBlogFields()

    } catch(exception) {
      //Jos blogin lisääminen ei onnistunut
      setMessage('blogin lisääminen ei onnistunut')
      window.localStorage.clear()
      blogService.setToken(null)
      updateUser(null)
    }
  }

  return (
    <div>
      <form onSubmit={handleBlogAdd}>
      <div>
          Title
            <input 
              type="text" 
              value={newBlogTitle} 
              name="Title"
              onChange={({target}) => setNewBlogTitle(target.value)}
            />
        </div>
        <div>
          Author
            <input 
              type="text" 
              value={newBlogAuthor} 
              name="Author"
              onChange={({target}) => setNewBlogAuthor(target.value)}
            />
        </div>
        <div>
          Url
            <input 
              type="text" 
              value={newBlogUrl} 
              name="Url"
              onChange={({target}) => setNewBlogUrl(target.value)}
            />
        </div>
        <div>
          Likes
            <input 
              type="number" 
              value={newBlogLikes} 
              name="Likes"
              onChange={({target}) => setNewBlogLikes(target.value)}
            />
        </div>
        <button type="submit">tallenna</button>
      </form>
    </div>
  )
}

export default BlogForm