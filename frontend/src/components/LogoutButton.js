import React from 'react'
//import blogService from '../services/blogs'

const LogoutButton = ({ handleSubmit }) => {
  return (
    <div>
      <button type="submit" onClick={handleSubmit}>logout</button>
    </div>
  )
}

/*
const LogoutButton = ({updateUser, addMessage}) => {


  return (
    <div>
      <form>
        <button type="submit" onClick={handleLogout}>logout</button>
      </form>
    </div>
  )
}
*/
export default LogoutButton