import React, { useState, useEffect, useRef } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Movies from './components/Movies/Movies'
import Movie from './components/Movie/Movie'
import axios from './axios'

import classes from './App.module.css'
const App = props => {

  const [maxPages, setMaxPages] = useState(1)
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])

  const [maxSeachPages, setMaxSearchPages] = useState(1)
  const [searchPage, setSearchPage] = useState(1)
  const [searchMovies, setSearchedMovies] = useState([])
  const [search, setSearch] = useState('')

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
        setMaxPages(res.data.total_pages)
        setMovies(movies => movies.concat(res.data.results))
      })
  }, [page])

  const scrollLoadMore = e => {
    const main = e.target
    const toBottom = main.scrollHeight - main.scrollTop - main.clientHeight
    if (toBottom < main.clientHeight ) {
      if (search && searchPage < maxSeachPages) {
        setSearchPage(searchPage + 1)
      } else if (page < maxPages) {
        setPage(page + 1)
      }
    }
  }

  const onShowDetails = (e, id) => {
    e.preventDefault()
    setScrolledAmount(main.current.scrollTop)
    props.history.push('/movie/' + id)
  }

  const onSearchChanged = e => {
    setSearch(e.target.value)
  }

  const onSearchSubmit = e => {
    e.preventDefault()
    axios.get('/search/movie?query=' + search)
      .then( res => {
        
        setMaxSearchPages(res.data.total_pages)
        setSearchedMovies(res.data.results)
      })
  }

  return (
    <main 
      className={classes.Main} 
      onScroll={scrollLoadMore}
      ref={main}>
      <div className="container">
        <Switch>
          <Route path="/movie" component={Movie} />
          <Route path="/" render={() => (
            <Movies 
              movies={search ? searchMovies : movies} 
              showDetails={onShowDetails}
              searchVal={search}
              changed={onSearchChanged}
              submit={onSearchSubmit} />
          )} />
          <Redirect to="/" />
        </Switch>
      </div>
    </main>
  )
};

export default withRouter(App);