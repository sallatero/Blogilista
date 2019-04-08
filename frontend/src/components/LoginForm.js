import React from 'react'

const LoginForm = ({handleLogin, username, password, setUsername, setPassword}) => {

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