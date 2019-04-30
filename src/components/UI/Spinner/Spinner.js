import React from 'react'
import classes from './Spinner.module.css'

const Spinner = props => {
  const containerClasses = [
    classes.SpinnerContainer,
    props.center ? classes.Center : '',
    props.show ? classes.Show : ''
  ].join(' ')
  
  return (
    <div className={containerClasses}>
      <div className={classes.Spinner}>Loading...</div>
    </div>
  )
}

export default Spinner;