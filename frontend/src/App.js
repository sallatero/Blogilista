import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LogoutButton from './components/LogoutButton'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [newBlogTitle, setNewBlogTitle] = useState('')
  //const [newBlogAuthor, setNewBlogAuthor] = useState('')
  //const [newBlogUrl, setNewBlogUrl] = useState('')
  //const [newBlogLikes, setNewBlogLikes] = useState(0)
  const [user, setUser] = useState(null)
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [err, setErr] = useState(false)

  //Haetaan kannasta blogit
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  //Haetaan kirjautuneen käyttäjän tiedot ekalla latauksella
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blog) => {
    setBlogs(blogs.concat(blog))
  }
  const updateUser = (user) => {
    setUser(user)
  }
  const addMessage = (message, err) => {
    setErr(err)
    setMessage(message)
      setTimeout(() => {
        setMessage('')
      }, 3000)
  }

  const loginform = () => {
    return (
    <LoginForm addMessage={addMessage} updateUser={updateUser}/>  
    )
  }

  const blogform = () => {
    return (
      <BlogForm addBlog={addBlog} addMessage={addMessage} updateUser={updateUser}/>
    )
  } 
  console.log('user: ', user)

  return (
    <div>
      <h1>Blogilista</h1>
      <Notification message={message} err={err}/>
      
      {user === null ?
        <div><h2>Log in</h2>{loginform()}</div> :
        <div>
          <p>{user.name} logged in</p>
          <LogoutButton updateUser={updateUser} addMessage={addMessage}/>
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