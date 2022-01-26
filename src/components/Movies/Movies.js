import React from 'react';
import './Movies.css';

import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMore from '../ShowMore/ShowMore';

function Movies(props) {
  return (
    <>
      <Search />
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
