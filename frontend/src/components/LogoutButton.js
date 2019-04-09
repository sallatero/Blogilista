import React from 'react'

const LogoutButton = ({handleLogout}) => {

  return (
    <div>
      <form>
        <button type="submit" onClick={handleLogout}>logout</button>
      </form>
    </div>
  )
}

export default LogoutButton