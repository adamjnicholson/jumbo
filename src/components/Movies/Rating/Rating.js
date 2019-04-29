import React from 'react'
import classes from './Rating.module.css'

const Rating = props => {
  let ratingColour = 'Red'
  if (props.rating > 7.5) { ratingColour = 'Green'} else
  if (props.rating > 5) { ratingColour = 'Purple'}

  return (
    <div 
      className={[props.className, classes.Rating, classes[ratingColour]].join(' ')}>
      {props.rating * 10}%
    </div>
  )
}

export default Rating;