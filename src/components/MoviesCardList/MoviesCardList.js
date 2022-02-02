import React from 'react';
import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ isLoading, movies, cardsOnPage, page, savedMovies, handleSaveMovie }) {
  return (
    <>
      {isLoading ? <Preloader /> :
        movies ? (
          movies.length > 0 ? (
          <div className="movies__container">
            {
              movies.slice(0, cardsOnPage).map((item) => (
                <MovieCard
                  key={item.id}
                  page={page}
                  savedMovies={savedMovies}
                  handleSaveMovie={handleSaveMovie}
                  movie={item}
                />
              ))
            }
          </div>
          ) : <div className="movies__no-movies-text">Поиск не дал результатов</div>
        ) :
          <div className="movies__no-movies-text">Нет сохраненных фильмов</div>
      }
    </>
  );
}

export default MoviesCardList;
