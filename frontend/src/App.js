import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

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
  const resetUser = () => {
    setUser(null)
    setUsername('')
    setPassword('')
  }
  const setMessage = (message) => {
    setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch(exception) {
      setMessage('käyttäjätunnus tai salasana virheellinen')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out user', user.username)
    try {
      window.localStorage.clear()
      blogService.setToken(null)
      
      setUser(null)
      setUsername('')
      setPassword('')

    } catch(exception) {
      setMessage('uloskirjaus ei onnistunut')
    }
  }

  const loginform = () => {
    return (
    <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>  
    )
  }

  const blogform = () => {
    return (
      <BlogForm addBlog={addBlog} setMessage={setMessage} resetUser={resetUser}/>
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
          <LogoutButton handleLogout={handleLogout} />
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