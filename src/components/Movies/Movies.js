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
  localData,
  movies,
  isLoading,
  savedMovies,
  cardsOnPage,
  handleShowMore,
  isFiltered,
  handleSaveMovie,
  handleDeleteMovie,
}) {
  return (
    <>
      <Search
        isSending={isSending}
        onFilter={onFilter}
        shortMovies={shortMovies}
        setShortMovies={setShortMovies}
        localData={localData}
        isFiltered={isFiltered}
      />
      <section className="movies">
        <MoviesCardList
          movies={movies}
          isLoading={isLoading}
          savedMovies={savedMovies}
          page="movies"
          shortMovies={shortMovies}
          localData={localData}
          cardsOnPage={cardsOnPage}
          handleSaveMovie={handleSaveMovie}
          handleDeleteMovie={handleDeleteMovie}
          isFiltered={isFiltered}
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
