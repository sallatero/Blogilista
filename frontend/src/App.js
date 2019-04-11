import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LogoutButton from './components/LogoutButton'
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogLikes, setNewBlogLikes] = useState(0)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [err, setErr] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false)

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
/*
  const addBlog = (blog) => {
    setBlogs(blogs.concat(blog))
  }
  const updateUser = (user) => {
    setUser(user)
  } */
  const addMessage = (message, err) => {
    setErr(err)
    setMessage(message)
      setTimeout(() => {
        setMessage('')
      }, 3000)
  }

  const resetBlogFields = () => {
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
    setNewBlogLikes(0)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const response = await loginService.login({
        username, password
      })
      if (response.errorTitle && response.statusCode) { //Authentication problem
        setUsername('')
        setPassword('')
        addMessage(`Kirjautuminen ei onnistunut: ${response.errorTitle}`, true)
        return
      } else {
        const user = response        
        setUser(user)
        setUsername('')
        setPassword('')
        addMessage('Kirjautuminen onnistui', false)
      
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        addMessage(`Tervetuloa ${user.name}`, false)
      }
    } catch(exception) {
      addMessage('kirjautuminen epäonnistui', true)
    }
  }

  //Ref loginformiin
  const loginFormRef = React.createRef()

  /*
    loginForm()-funktio kutsuu komponentteja
    - Togglable
      joka hoitaa näkyvyyden vaihtelun käärimällä lapsielementin <LoginForm>
      itsensä sisään
    - LoginForm
      joka huolehtii itse kirjautumislomakkeen ulkoasusta
  */
  const loginform = () => {
    return (
      <Togglable buttonLabel="login" ref={loginFormRef}>
        <LoginForm 
          handleSubmit={handleLogin} 
          handleUsernameChange={({ target }) => setUsername(target.value)} 
          handlePasswordChange={({ target }) => setPassword(target.value)} 
          username={username}
          password={password}
        />
      </Togglable>
    )
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out user')
    try {
      window.localStorage.clear()
      blogService.setToken(null)
      setUser(null)
      addMessage('Hei hei!', false)
    } catch(exception) {
      addMessage('uloskirjaus ei onnistunut', true)
    }
  }

  const handleBlogLike = async (id) => {
    const oldVersion = blogs.find(b => b.id === id)
    const newVersion = {...oldVersion, likes: oldVersion.likes + 1}
    try {
      const response = await blogService.update(id, newVersion)
      setBlogs(blogs.map(b => b.id !== id ? b : newVersion))
      addMessage('blogin likettäminen onnistui', false)
    }catch (exception) {
      addMessage('Blogin likettäminen ei onnistunut', true)
    }
  }

  const handleBlogAdd = async (event) => {
    event.preventDefault()
    /* blogFormRef-refin ja Togglablen hookin ansiosta
      voidaan tässä kutsua Togglablen funktiota toggleVisibility, 
      joka piilottaa bloginlisäysformin. */
    blogFormRef.current.toggleVisibility()
    console.log('adding a new blog', newBlogTitle)
    try {
      const response = await blogService.create({
        title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl, likes: newBlogLikes
      })
      console.log('App response: ', response) //user ei ole {}
      if (response.errorTitle && response.statusCode) { //Validation problem
        console.log('validation issue: ', response)
        resetBlogFields()
        addMessage(`blogin lisääminen ei onnistunut: ${response.errorTitle}`, true)
      } else {
        setBlogs(blogs.concat(response))
        //console.log('BLOGS: ', blogs)
        resetBlogFields()
        addMessage('blogin lisääminen onnistui', false)
      }
    } catch(exception) {
      //Jos käyttäjän token on vanhentunut
      addMessage('Istuntosi on vanhentunut. Kirjaudu uudelleen sisään.', true)
      window.localStorage.clear()
      blogService.setToken(null)
      setUser(null)
    }
  }

  //Ref blogiformiin
  const blogFormRef = React.createRef()

  /*
    blogForm()-funktio kutsuu komponentteja
    - Togglable
      joka hoitaa näkyvyyden vaihtelun käärimällä lapsielementin <BlogForm>
      itsensä sisään
    - BlogForm
      joka huolehtii itse bloginlisäyslomakkeen ulkoasusta
  */
  const handleTitle = ({ target }) => setNewBlogTitle(target.value)
  const handleAuthor = ({ target }) => setNewBlogAuthor(target.value) 
  const handleUrl = ({ target }) => setNewBlogUrl(target.value)
  const handleLikes = ({ target }) => setNewBlogLikes(target.value)

  const blogform = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm 
          handleSubmit={handleBlogAdd}
          handleBlogTitleChange={handleTitle}
          handleBlogAuthorChange={handleAuthor}
          handleBlogUrlChange={handleUrl}
          handleBlogLikesChange={handleLikes}
          blogTitle={newBlogTitle}
          blogAuthor={newBlogAuthor}
          blogUrl={newBlogUrl}
          blogLikes={newBlogLikes}
        />
    </Togglable>
    )
  }

  //console.log('BLOGS ennen returnia: ', blogs)
  return (
    <div>
      <h1>Blogilista-sovellus</h1>
      <Notification message={message} err={err}/>
      
      {user === null ?
        <div>{loginform()}</div> :
        <div>
          <p>{user.name} logged in</p>
          <LogoutButton handleSubmit={handleLogout} />
          {blogform()}
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} addLike={handleBlogLike}/>
          )}
        </div>
      }
    </div>
  )
}

export default App