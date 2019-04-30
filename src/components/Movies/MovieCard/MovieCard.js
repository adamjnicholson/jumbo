import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import PosterArt from '../PosterArt/PosterArt'
import Rating from '../Rating/Rating'

import { formatDate } from '../../../shared/utility'

import classes from './MovieCard.module.css'

const MovieCard = props => {
  return (
    <div className={[classes.MovieCard, 'col col-m-6 col-t-4 col-d-3'].join(' ')}>
      <Link to={'/movie/' + props.movie.id} onClick={e => props.showDetails(e, props.movie.id)}>
        <PosterArt 
          imageId={props.movie.poster_path} 
          title={props.movie.title}
          loaded={props.imageLoaded}
        />
        <div className={classes.Details}>
          <h3>{props.movie.title}</h3>
          <div className="small">{formatDate(props.movie.release_date)}</div>
        </div>
        <Rating className={classes.Rating} rating={props.movie.vote_average} />
      </Link>
    </div>
  );
}

export default withRouter(MovieCard);