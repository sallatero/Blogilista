import React, { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  //hideWhenVisible: piilotetaan kun login-lomake on näkyvissä
  const hideWhenVisible = { display: visible ? 'none' : '' }
  //showWhenVisible: näytetään kun login-lomakkeen tulisi olla näkyvissä
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  /* 
  Eka div (hideWhenVisible) on sellainen nappula, joka tuo esiin sen 'masterin'.
  Nappula on piilossa kun sen 'master' on näkyvillä

  Toinen div (showWhenVisible) on edellisen master, sen yhteydessä on nappula,
  jolla master voidaan piilottaa
  */
  return (
    <div>
      <div style={hideWhenVisible}> 
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable