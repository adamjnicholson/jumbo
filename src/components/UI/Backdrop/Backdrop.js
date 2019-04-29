import React from 'react'
import classes from './Backdrop.module.css'

const Backdrop = props => {
  const backdrop = [classes.Backdrop, props.show ? classes.Show : ''].join(' ')
  return <div className={backdrop}>{props.children}</div>
}

export default Backdrop;