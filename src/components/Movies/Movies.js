import React from 'react';
import './Movies.css';

import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMore from '../ShowMore/ShowMore';

function Movies(props) {
  return (
    <>
      <Search
        isSending={props.isSending}
        onSearch={props.onSearch}
        shortMovies={props.shortMovies}
        setShortMovies={props.setShortMovies}
       />
      <section className="movies">
        <MoviesCardList
          films={props.films}
          isLoading={props.isLoading}
          savedMovies={props.savedMovies}
          page="movies"
        />
        <ShowMore />
      </section>
    </>
  );
}

export default Movies;
