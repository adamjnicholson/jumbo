import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Movies from './components/Movies/Movies'
import Movie from './components/Movie/Movie'
import axios from './axios'

import classes from './App.module.css'
const App = props => {

  const [maxPages, setMaxPages] = useState(1)
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])

  const [showingSearch, setShowingSearch] = useState(false)
  const [maxSeachPages, setMaxSearchPages] = useState(1)
  const [searchPage, setSearchPage] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchMovies, setSearchedMovies] = useState([])
  const [searchInput, setSearchInput] = useState('')

  const [loading, setLoading] = useState(false)
  const [scrollAmount, setScrolledAmount] = useState(0)
  const main = useRef(null)

  //SEARCH
  const getSearchQuery = useCallback( () => {
    let searchQuery = new URLSearchParams(props.location.search).get('s')
    if (!searchQuery) {
      searchQuery = ''
      props.history.replace('/')
    }

    setShowingSearch(!!searchQuery)
    setSearchPage( searchQuery ? 1 : 0)
    setSearchQuery(searchQuery)
    setSearchInput(searchQuery)
  }, [props.location.search])

  useEffect(() => {
    getSearchQuery()
  }, [getSearchQuery])

  // useEffect(() => {
  //   if (searchPage && searchQuery && !loading) {
  //     setLoading(true)
  //     axios.get('/search/movie?include_adult=false&query=' + searchQuery + '&page=' + searchPage)
  //       .then( res => {
  //         setLoading(false)
  //         setMaxSearchPages(res.data.total_pages)
  //         if (searchPage === 1) {
  //           setSearchedMovies(res.data.results)
  //         } else {
  //           setSearchedMovies(searchMovies => searchMovies.concat(res.data.results))
  //         }
  //       })
  //       .catch (err => {
  //         setLoading(false)
  //         console.log(err.response)
  //       })
  //   }
  // }, [searchPage, searchQuery])
  
  const onSearchChanged = e => {
    setSearchInput(e.target.value)
  }

  const onSearchSubmit = e => {
    e.preventDefault()
    if (searchInput !== searchQuery) {
      setSearchPage(1)
      props.history.push('/?s=' + searchInput)
    }
  }

  //SCROLLING
  useEffect(() => {
    if (props.location.pathname === '/' && main) {
      main.current.scrollTop = scrollAmount 
    }
  }, [props.location.pathname, scrollAmount])


  const scrollLoadMore = e => {
    const main = e.target
    const toBottom = main.scrollHeight - main.scrollTop - main.clientHeight
    if (toBottom === 0 ) {
      if (showingSearch && searchPage < maxSeachPages) {
        setSearchPage(searchPage + 1)
      } else if (page < maxPages) {
        setPage(page + 1)
      }
    }
  }

  const onShowDetails = (e, id) => {
    e.preventDefault()
    console.log(id)
    setScrolledAmount(main.current.scrollTop)
    props.history.push('/movie/' + id)
  }

  //LOAD MOVIES
  useEffect(() => {
    if (!loading) {
      axios.get('/discover/movie?sort_by=popularity.desc&page=' + page)
        .then( res => {
          setLoading(false)
          setMaxPages(res.data.total_pages)
          setMovies(movies => movies.concat(res.data.results))
      })
    }
  }, [page])

  const moviesToShow = showingSearch ? searchMovies : movies
  const heading = showingSearch ? 'Search: ' + searchQuery : 'Popular Movies'
  console.log(props)
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
              movies={moviesToShow} 
              heading={heading}
              showingSearch={showingSearch}
              showDetails={onShowDetails}
              searchVal={searchInput}
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