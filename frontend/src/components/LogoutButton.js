import React from 'react'
import blogService from '../services/blogs'

const LogoutButton = ({updateUser, addMessage}) => {

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out user')
    try {
      window.localStorage.clear()
      blogService.setToken(null)
      updateUser(null)
      addMessage('Hei hei!', false)
    } catch(exception) {
      addMessage('uloskirjaus ei onnistunut', true)
    }
  }

  return (
    <div>
      <form>
        <button type="submit" onClick={handleLogout}>logout</button>
      </form>
    </div>
  )
}

export default LogoutButton