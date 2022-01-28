import React from 'react';
import './SavedMovies.css';

import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {

  return (
    <>
      <Search />
      <section className="movies">
        <MoviesCardList films={props.films} isLoading={props.isLoading} page="saved-movies" />
      </section>
    </>
  );
}

export default SavedMovies;
