import React, { useState, useImperativeHandle } from 'react'

/*
Komponentin Togglable luova funktio on kääritty funktiokutsun forwardRef sisälle.
Näin Togglable pääsee käsiksi sille määriteltyyn refiin (esim. Appin BlogForm).

Togglable käyttää useImperativeHandle-hookia tarjotakseen sisäistä funktiotaan
toggleVisibility ulkopuolelta kutsuttavaksi.
*/
//hideWhenVisible: piilotetaan kun login-lomake on näkyvissä
//showWhenVisible: näytetään kun login-lomakkeen tulisi olla näkyvissä

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

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
})

export default Togglable