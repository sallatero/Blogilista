import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {

  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

  return (
    <div className='loginForm'>
      <h2>Kirjaudu sisään</h2>

      <form onSubmit={handleSubmit}>
        <div>
          Käyttäjätunnus
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Salasana
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

/*
const LoginForm = ({updateUser, addMessage, visible}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //hideWhenVisible: Piilota login-nappi kun login-lomake on näkyvissä
  const hideWhenVisible = { display: visible ? 'none' : '' }
  //showWhenVisible: Näytä login-lomake kun sen tulisi olla näkyvissä
  const showWhenVisible = { display: visible ? '' : 'none' }


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
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}log in></button>
      </div>
      <div style={showWhenVisible}>
        <h2>Kirjaudu sisään</h2>
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
*/
export default LoginForm