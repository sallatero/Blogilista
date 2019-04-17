import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'

const LoginForm = ({ handleSubmit }) => {
  const username = useField('text')
  const password = useField('password')

  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  const preSubmit = (event) => {
    username.reset()
    password.reset()
    handleSubmit(event)
  }

  return (
    <div className='loginForm'>
      <h2>Kirjaudu sisään</h2>

      <form onSubmit={preSubmit}>
        <div>
          Käyttäjätunnus
          <input {...username.att} />
        </div>
        <div>
          Salasana
          <input {...password.att} />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

export default LoginForm