import React from 'react';
import './SavedMovies.css';

import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({
  isSending,
  onFilter,
  shortMovies,
  setShortMovies,
  movies,
  isLoading,
}) {
  return (
    <>
      <Search
        isSending={isSending}
        onFilter={onFilter}
        shortMovies={shortMovies}
        setShortMovies={setShortMovies}
      />
      <section className="movies">
        <MoviesCardList
          movies={movies}
          isLoading={isLoading}
          page="saved-movies" />
      </section>
    </>
  );
}

export default SavedMovies;
