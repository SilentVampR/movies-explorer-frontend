import React from 'react';
import './Movies.css';

import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMore from '../ShowMore/ShowMore';

function Movies({
  isSending,
  onSearch,
  shortMovies,
  setShortMovies,
  localData,
  movies,
  isLoading,
  savedMovies,
  step,
  handleShowMore,
  setIsSending,
}) {
  return (
    <>
      <Search
        isSending={isSending}
        onSearch={onSearch}
        shortMovies={shortMovies}
        setShortMovies={setShortMovies}
        localData={localData}
      />
      <section className="movies">
        <MoviesCardList
          movies={movies}
          isLoading={isLoading}
          savedMovies={savedMovies}
          page="movies"
          shortMovies={shortMovies}
          localData={localData}
          step={step}
        />
        <ShowMore
          handleShowMore={handleShowMore}
          step={step}
          movies={movies}
        />
      </section>
    </>
  );
}

export default Movies;
