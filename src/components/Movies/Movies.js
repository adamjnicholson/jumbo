import React, { Fragment, useState } from 'react'
import {FaSearch} from 'react-icons/fa'

import MovieCard from './MovieCard/MovieCard'
import Backdrop from '../UI/Backdrop/Backdrop'
import Spinner from '../UI/Spinner/Spinner'
import Form from '../Form/Form'
import classes from './Movies.module.css'
const Movies = props => {

  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [inputs, setInputs] = useState({
    search: {
      type: 'text',
      placeholder: 'Search',
      value: props.search
    }
  })

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
      <Form 
        className={classes.SearchForm}
        submit={props.submit} 
        inputs={inputs}
        changed={props.changed}>
        <div className={classes.ButtonContainer}>
          <FaSearch />
          <input type="submit" />
        </div>
      </Form>
      
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