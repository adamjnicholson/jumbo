import React from 'react'
import classes from './Button.module.css'

const Button = props => {
const colour = props.colour ? classes[props.colour] : ''
const buttonClasses = [colour, classes.Button].join(' ')

return (
  <button 
    className={buttonClasses}
    onClick={props.clicked}
  >
      {props.children}
    </button>
  )
}

export default Button;