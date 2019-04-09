import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({updateUser, setMessage}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const resetUserFields = () => {
    setUsername('')
    setPassword('')
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
      resetUserFields()
      updateUser(user)

    } catch(exception) {
      setMessage('käyttäjätunnus tai salasana virheellinen')
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Käyttäjätunnus 
            <input 
              type="text" 
              value={username} 
              name="Username"
              onChange={({target}) => setUsername(target.value)}
            />
        </div>
        <div>
          Salasana
            <input 
              type="password" 
              value={password} 
              name="Password"
              onChange={({target}) => setPassword(target.value)}
            />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

export default LoginForm