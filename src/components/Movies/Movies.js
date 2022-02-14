import React from 'react';
import './Movies.css';

import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMore from '../ShowMore/ShowMore';

function Movies({
  isSending,
  onFilter,
  shortMovies,
  setShortMovies,
  localFilteredMovies,
  movies,
  isLoading,
  savedMovies,
  cardsOnPage,
  handleShowMore,
  isFiltered,
  handleSaveMovie,
  handleDeleteMovie,
  isUnSaving,
  isSaving
}) {
  return (
    <>
      <Search
        isSending={isSending}
        onFilter={onFilter}
        shortMovies={shortMovies}
        setShortMovies={setShortMovies}
        localFilteredMovies={localFilteredMovies}
        isFiltered={isFiltered}
      />
      <section className="movies">
        <MoviesCardList
          movies={movies}
          isLoading={isLoading}
          savedMovies={savedMovies}
          page="movies"
          shortMovies={shortMovies}
          cardsOnPage={cardsOnPage}
          handleSaveMovie={handleSaveMovie}
          handleDeleteMovie={handleDeleteMovie}
          isFiltered={isFiltered}
          isUnSaving={isUnSaving}
          isSaving={isSaving}
        />
        <ShowMore
          handleShowMore={handleShowMore}
          cardsOnPage={cardsOnPage}
          movies={movies}
        />
      </section>
    </>
  );
}

export default Movies;
