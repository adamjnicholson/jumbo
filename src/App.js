import React, { useState, useEffect, useRef } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Movies from './components/Movies/Movies'
import Movie from './components/Movie/Movie'
import axios from './axios'

import classes from './App.module.css'
const App = props => {

  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [scrollAmount, setScrolledAmount] = useState(0)
  const main = useRef(null)

  useEffect(() => {
    if (props.location.pathname === '/' && main) {
      main.current.scrollTop = scrollAmount 
    }
  }, [props.location.pathname, scrollAmount])

  useEffect(() => {
     axios.get('/discover/movie?sort_by=popularity.desc&page=' + page)
      .then( res => {
       setMovies(movies => movies.concat(res.data.results))
      })
  }, [page])

  const scrollLoadMore = e => {
    const main = e.target
    const toBottom = main.scrollHeight - main.scrollTop - main.clientHeight
    if (toBottom < main.clientHeight) {
      setPage(page + 1)
    }
  }

  const onShowDetails = (e, id) => {
    e.preventDefault()
    setScrolledAmount(main.current.scrollTop)
    props.history.push('/movie/' + id)
  }

  return (
    <main 
      className={classes.Main} 
      onScroll={scrollLoadMore}
      ref={main}>
      <div className="container">
        <Switch>
          <Route path="/movie" component={Movie} />
          <Route path="/" exact render={() => <Movies movies={movies} showDetails={onShowDetails} /> } />
          <Redirect to="/" />
        </Switch>
      </div>
    </main>
  )
};

export default withRouter(App);