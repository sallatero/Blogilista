import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogLikes, setNewBlogLikes] = useState(0)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch(exception) {
      setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const handleBlogAdd = async (event) => {
    event.preventDefault()
    console.log('adding a new blog', newBlogTitle)
    try {
      const blog = await blogService.create({
        title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl, likes: newBlogLikes
      })
      setBlogs(blogs.concat(blog))
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
      setNewBlogLikes(0)

    } catch(exception) {
      setErrorMessage('blogin lisääminen ei onnistunut')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const loginform = () => {
    return (
    <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>  
    )
  }

  const blogform = () => {
    return (
      <BlogForm handleBlogAdd={handleBlogAdd} newBlog={{title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl, likes: newBlogLikes}} setters={{title: setNewBlogTitle, author: setNewBlogAuthor, url: setNewBlogUrl, likes: setNewBlogLikes}} />
    )
  } 
  console.log('user: ', user)
  return (
    <div>
      <h1>Blogilista</h1>
      <Notification message={errorMessage}/>
      
      {user === null ?
        <div><h2>Log in</h2>{loginform()}</div> :
        <div>
          <p>{user.name} logged in</p>
          {blogform()}
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App