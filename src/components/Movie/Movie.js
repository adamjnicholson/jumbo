import React, { Fragment, useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { formatDate, hourMins } from '../../shared/utility'
import axios from '../../axios'

import Image from '../UI/Image/Image'
import PosterArt from '../Movies/PosterArt/PosterArt'
import Backdrop from '../UI/Backdrop/Backdrop'
import Spinner from '../UI/Spinner/Spinner'
import Modal from '../UI/Modal/Modal'
import Button from '../UI/Button/Button'

import {FaArrowLeft} from 'react-icons/fa'

import classes from './Movie.module.css'

const Movie = props => {
  const [movie, setMovie] = useState(null)
  const [error, setError] = useState(null)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    const movieId = props.location.pathname.split('/').slice(-1)[0]
    axios.get('/movie/' + movieId)
      .then( res => {
        setMovie(res.data)
        setError(null)
      })
      .catch ( err => {
        setError(error => error ? error : err.response.data)
        console.log(err.response)
      })
  }, [props.location.pathname])
  
  const movieDetails = ['row', classes.MovieDetails].join(' ')
  const metaData = [classes.MetaData, 'small'].join(' ')

  const checkImagesLoaded = () => {
    const imgs = document.querySelectorAll('img')
    const imgsLoaded = [...imgs].map(img => img.complete).every(img => img)
    setImagesLoaded(imgsLoaded)
  }

  let content = null
  if (movie) {
    content = (
      <Fragment>
        <header className="row">
          <Image id={movie.backdrop_path} alt={movie.title} loaded={checkImagesLoaded} />
          <Link to="/" className={classes.Back}>
            <FaArrowLeft />
          </Link>
        </header>
        <main className={movieDetails}>
          <div className="col col-m-5 no-right">
            <PosterArt 
              className={classes.Poster} 
              imageId={movie.poster_path} 
              title={movie.title} single 
              loaded={checkImagesLoaded}/>
          </div>
          <div className="col col-m-7">
            <h1>{movie.title}</h1>
            <div className={metaData}>
              <div className={classes.Date}>{formatDate(movie.release_date, 'y')}</div>
              <div className="rating">{movie.vote_average * 10 + '% User Score'}</div>
              <div className={classes.Runtime}>{hourMins(movie.runtime)}</div>
            </div>
          </div>
          <div className="col">
            <div className={classes.Overview}>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
            </div>
          </div>
        </main>
      </Fragment>
    )
  } else if (error) {
    content = (
      <Backdrop show>
        <Modal>
          {error.status_message}
          <Button clicked={() => props.history.replace('/')}>Close</Button>
        </Modal>
      </Backdrop>
    )
  }

  return (
    <Fragment>
    { content }
     <Backdrop show={!imagesLoaded && !error}>
       <Spinner />
     </Backdrop>
    </Fragment>
  
  )
}


export default withRouter(Movie);