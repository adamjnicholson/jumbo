import React from 'react'
import Image from '../../UI/Image/Image'
import classes from './PosterArt.module.css'

const PosterArt = props => {
  const poster = [props.className, classes.PosterArt, props.single ? classes.Single : ''].join(' ')

  return (
    <div className={poster}>
      <Image id={props.imageId} alt={props.title} loaded={props.loaded} />
    </div>
  )
}

export default PosterArt;  