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
  handleDeleteMovie,
  setIsSavedFiltered,
  isSavedFiltered,
}) {
  return (
    <>
      <Search
        isSending={isSending}
        onFilter={onFilter}
        shortMovies={shortMovies}
        setShortMovies={setShortMovies}
        isSavedFiltered={isSavedFiltered}
      />
      <section className="movies">
        <MoviesCardList
          movies={movies}
          isLoading={isLoading}
          handleDeleteMovie={handleDeleteMovie}
          setIsSavedFiltered={setIsSavedFiltered}
          page="saved-movies" />
      </section>
    </>
  );
}

export default SavedMovies;
