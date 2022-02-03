import React, { useEffect } from 'react';
import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({
  isLoading,
  movies,
  cardsOnPage,
  page,
  savedMovies,
  handleSaveMovie,
  handleDeleteMovie,
  setIsSavedFiltered,
  isFiltered,
  isSavedFiltered,
}) {
  useEffect(() => {
    if(setIsSavedFiltered){
      setIsSavedFiltered(false)
    }
  },[setIsSavedFiltered]);
  return (
    <>
      {isLoading ? <Preloader /> :
        movies ? (
          movies.length > 0 ? (
          <div className="movies__container">
            {
              movies.slice(0, cardsOnPage).map((item) => (
                <MovieCard
                  key={item.id ? item.id : item.movieId}
                  page={page}
                  savedMovies={savedMovies}
                  handleSaveMovie={handleSaveMovie}
                  handleDeleteMovie={handleDeleteMovie}
                  movie={item}
                />
              ))
            }
          </div>
          ) : (isFiltered || isSavedFiltered) && <div className="movies__no-movies-text">Поиск не дал результатов</div>
        ) :
          <div className="movies__no-movies-text">Нет сохраненных фильмов</div>
      }
    </>
  );
}

export default MoviesCardList;
