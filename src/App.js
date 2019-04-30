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
    useEffect(() => {
    let searchQuery = new URLSearchParams(props.location.search).get('s')
    if (!searchQuery) {
      searchQuery = ''
    }

    setSearchPage( searchQuery ? 1 : 0)
    setSearchQuery(searchQuery)
    setSearchInput(searchQuery)
    setShowingSearch(!!searchQuery)
  }, [props.location.search])

  useEffect(() => {
    if (searchPage && searchQuery && !loading) {
      setLoading(true)
      axios.get('/search/movie?include_adult=false&query=' + searchQuery + '&page=' + searchPage)
        .then( res => {
          setLoading(false)
          setMaxSearchPages(res.data.total_pages)
          if (searchPage === 1) {
            setSearchedMovies(res.data.results)
          } else {
            setSearchedMovies(searchMovies => searchMovies.concat(res.data.results))
          }
        })
        .catch (err => {
          setLoading(false)
          console.log(err.response)
        })
    }
  }, [searchPage, searchQuery])
  
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
  const currentPage = showingSearch ? searchPage : page
  const heading = showingSearch ? 'Search: ' + searchQuery : 'Popular Movies'
  const showSpinner = showingSearch ? searchPage < maxSeachPages : page < maxPages

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
              page={currentPage}
              changed={onSearchChanged}
              submit={onSearchSubmit}
              showSpinner={showSpinner} />
          )} />
          <Redirect to="/" />
        </Switch>
      </div>
    </main>
  )
};

export default withRouter(App);