import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({updateUser, addMessage}) => {
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
      const response = await loginService.login({
        username, password
      })
      if (response.errorTitle && response.statusCode) { //Authentication problem
        resetUserFields()
        addMessage(`Kirjautuminen ei onnistunut: ${response.errorTitle}`, true)
        return
      } else {
        updateUser(response)
        resetUserFields()
        addMessage('Kirjautuminen onnistui', false)
      
        const user = response
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        resetUserFields()
        updateUser(user)
        addMessage(`Tervetuloa ${user.name}`, false)
      }
    } catch(exception) {
      addMessage('kirjautuminen epäonnistui', true)
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