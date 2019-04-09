import React from 'react'
import blogService from '../services/blogs'

const LogoutButton = ({resetUser, setMessage}) => {

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out user')
    try {
      window.localStorage.clear()
      blogService.setToken(null)
      resetUser()
    } catch(exception) {
      setMessage('uloskirjaus ei onnistunut')
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