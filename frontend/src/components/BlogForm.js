import React from 'react'

const BlogForm = ({handleBlogAdd, newBlog, setters}) => {
  return (
    <div>
      <form onSubmit={handleBlogAdd}>
      <div>
          Title
            <input 
              type="text" 
              value={newBlog.title} 
              name="Title"
              onChange={({target}) => setters.title(target.value)}
            />
        </div>
        <div>
          Author
            <input 
              type="text" 
              value={newBlog.author} 
              name="Author"
              onChange={({target}) => setters.author(target.value)}
            />
        </div>
        <div>
          Url
            <input 
              type="text" 
              value={newBlog.url} 
              name="Url"
              onChange={({target}) => setters.url(target.value)}
            />
        </div>
        <div>
          Likes
            <input 
              type="number" 
              value={newBlog.likes} 
              name="Likes"
              onChange={({target}) => setters.likes(target.value)}
            />
        </div>
        <button type="submit">tallenna</button>
      </form>
    </div>
  )
}

export default BlogForm