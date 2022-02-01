import React from 'react';
import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ isLoading, movies, page, savedMovies, step }) {
  console.log(movies);
  return (
    <>
      {isLoading ? <Preloader /> :
        movies ? (
          <div className="movies__container">
            {
              movies.slice(0, step).map((item) => (
                <MovieCard
                  key={item.id}
                  id={item.id}
                  title={item.nameRU}
                  duration={item.duration}
                  thumb={item.image.url}
                  page={page}
                  savedMovies={savedMovies}
                />
              ))
            }
          </div>
        ) :
          <div className="movies__no-movies-text">Нет сохраненных фильмов</div>
      }
    </>
  );
}

export default MoviesCardList;
