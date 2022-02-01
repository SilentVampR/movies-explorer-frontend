import React from 'react';
import './SavedMovies.css';

import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {

  return (
    <>
      <Search
        isSending={props.isSending}
        onSearch={props.onSearch}
        shortMovies={props.shortMovies}
        setShortMovies={props.setShortMovies}
      />
      <section className="movies">
        <MoviesCardList films={props.films} isLoading={props.isLoading} page="saved-movies" />
      </section>
    </>
  );
}

export default SavedMovies;
