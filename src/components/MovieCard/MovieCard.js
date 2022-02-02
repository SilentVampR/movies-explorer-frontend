import React, { useEffect, useState } from 'react';
import './MovieCard.css';
import { beatFilmApiURL, urlPattern } from '../../utils/constants';

function MovieCard({ page, savedMovies, hanleSaveMovie, movie }) {
  // id={item.id}
  // title={item.nameRU}
  // duration={item.duration}
  // thumb={item.image.url}

  const [buttonType, setButtonType] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const thumb = beatFilmApiURL + movie.image.url;
  const title = movie.nameRU;
  const durationHour = Math.floor(movie.duration / 60);
  const durationMinute = movie.duration - durationHour * 60;

  const checkUrl = (link) => {
    return urlPattern.test(link) ? link : 'https://youtu.be/dQw4w9WgXcQ';
  }

  useEffect(() => {
    if (savedMovies && page !== 'saved-movies') {
      setIsSaved(savedMovies.some(item => item.id === movie.id));
    }
  }, [page, savedMovies, movie.id]);

  useEffect(() => {
    (page === 'movies' && isSaved) && setButtonType(' movie__button_type_saved');
    (page === 'saved-movies') && setButtonType(' movie__button_type_delete');
  }, [isSaved, page]);
//console.log(movie);
  return (
    <div className="movie">
      <a href={checkUrl(movie.trailerLink)} className="movie__trailer-link" target="_blank" rel="noreferrer">
        <img src={thumb} alt={title} className="movie__thumb" />
      </a>
      <div className="movie__footer">
        <h2 className="movie__title">{title}</h2>
        <button className={`movie__button` + buttonType}></button>
      </div>
      <p className="movie__duration">{durationHour}ч {durationMinute}м</p>
    </div>
  );
}

export default MovieCard;
