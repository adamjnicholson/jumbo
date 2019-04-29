import React, { Fragment, useState } from 'react'
import MovieCard from './MovieCard/MovieCard'
import Backdrop from '../UI/Backdrop/Backdrop'
import Spinner from '../UI/Spinner/Spinner'

const Movies = props => {

  const [imagesLoaded, setImagesLoaded] = useState(false)

  const checkImagesLoaded = () => {
    const imgs = document.querySelectorAll('img')
    const imgsLoaded = [...imgs].map(img => img.complete).every(img => img)
    setImagesLoaded(imgsLoaded)
  }

  const content = (
    props.movies.map( movie => (
      <MovieCard 
        key={movie.id} 
        movie={movie}
        showDetails={props.showDetails}
        imageLoaded={checkImagesLoaded} 
      />
    ))
  )

  return (
    <Fragment>
      <h2>Popular Movies</h2>
      <div className="row">
        {content}
      </div>
      <Backdrop show={!imagesLoaded}>
        <Spinner />
      </Backdrop>
    </Fragment>
  )
}

export default Movies;