import React from 'react'

const Image = props => {
  if (!props.id) return false
  
  const size = props.size ? props.size : '/w500'
  return <img 
    src={'https://image.tmdb.org/t/p' + size + props.id} 
    alt={props.alt} 
    onLoad={props.loaded}
  />
}

export default Image;