import React, { Fragment, useState } from 'react'
import {FaSearch} from 'react-icons/fa'

import MovieCard from './MovieCard/MovieCard'
import Backdrop from '../UI/Backdrop/Backdrop'
import Spinner from '../UI/Spinner/Spinner'
import Form from '../Form/Form'
import classes from './Movies.module.css'
const Movies = props => {

  const [imagesLoaded, setImagesLoaded] = useState(false)
  const inputs = {
    search: {
      type: 'text',
      placeholder: 'Search',
      value: props.searchVal
    }
  }

  const checkImagesLoaded = () => {
    const imgs = document.querySelectorAll('img')
    const imgsLoaded = [...imgs].map(img => img.complete).every(img => img)
    setImagesLoaded(imgsLoaded)
  }

  let content = ''
  let heading = ''

  if (props.movies.length === 0 && props.showingSearch) {
    content = <h3 className="col">Sorry, no movies can be found. Please try to search for something else.</h3>
  }

  if (props.movies.length) {
    content = (
      props.movies.map( movie => (
        <MovieCard 
          key={movie.id} 
          movie={movie}
          showDetails={props.showDetails}
          imageLoaded={checkImagesLoaded} 
        />
      ))
    )
    heading =  <h2>{props.heading}</h2>
  }

  const onSubmit = e => {
    setImagesLoaded(false)
    props.submit(e)
  }

  return (
    <Fragment>
      
      <Form 
        className={classes.SearchForm}
        submit={onSubmit} 
        inputs={inputs}
        changed={props.changed}>
        <div className={classes.ButtonContainer}>
          <FaSearch />
          <input type="submit" />
        </div>
      </Form>
      {heading}
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