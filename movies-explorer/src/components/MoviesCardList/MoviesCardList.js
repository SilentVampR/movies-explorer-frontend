import React from 'react';
import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard';

function MoviesCardList(props) {
  let step = 6;
  return (
    <div className="movies__container">
      {props.films.map((item) => (
        (item.id <= step) &&
        <MovieCard
          key={item.id}
          id={item.id}
          title={item.nameRU}
          duration={item.duration}
          thumb={item.image.url}
          page={props.page}
          savedMovies={props.savedMovies}
        />))}
    </div>
  );
}

export default MoviesCardList;
