import React from 'react'
//import blogService from '../services/blogs'

const BlogForm = ({
  handleSubmit,
  handleBlogTitleChange,
  handleBlogAuthorChange,
  handleBlogUrlChange,
  handleBlogLikesChange,
  blogTitle,
  blogAuthor,
  blogUrl,
  blogLikes
}) => {
  return (
    <div>
      <h2>Lisää blogi</h2>

      <form onSubmit={handleSubmit}>
        <div>
          Title
          <input
            type="text"
            value={blogTitle}
            name="Title"
            onChange={handleBlogTitleChange}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={handleBlogAuthorChange}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            value={blogUrl}
            name="Url"
            onChange={handleBlogUrlChange}
          />
        </div>
        <div>
          Likes
          <input
            type="number"
            value={blogLikes}
            name="Likes"
            onChange={handleBlogLikesChange}
          />
        </div>
        <button type="submit">tallenna</button>
      </form>
    </div>
  )
}

/*
const BlogForm = ({
  addBlog,
  addMessage,
  updateUser}) => {
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
      const response = await blogService.create({
        title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl, likes: newBlogLikes
      })
      if (response.errorTitle && response.statusCode) { //Validation problem
        console.log('validation issue: ', response)
        resetBlogFields()
        addMessage(`blogin lisääminen ei onnistunut: ${response.errorTitle}`, true)
      } else {
        addBlog(response)
        resetBlogFields()
        addMessage('blogin lisääminen onnistui', false)
      }
    } catch(exception) {
      //Jos käyttäjän token on vanhentunut
      addMessage('Istuntosi on vanhentunut. Kirjaudu uudelleen sisään.', true)
      window.localStorage.clear()
      blogService.setToken(null)
      updateUser(null)
    }
  }

  return (
    <div>
      <h2>Lisää blogi</h2>
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
*/
export default BlogForm