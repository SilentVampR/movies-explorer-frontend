import React, { useEffect, useState } from 'react';
import './MovieCard.css';
import { beatFilmApiURL, urlPattern } from '../../utils/constants';

function MovieCard({ page, savedMovies, handleSaveMovie, handleDeleteMovie, movie }) {
  const [buttonType, setButtonType] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [savedMovieId, setSavedMovieId] = useState('');

  const thumb = movie.image.url ? beatFilmApiURL + movie.image.url : movie.image;
  const title = movie.nameRU;
  const durationHour = Math.floor(movie.duration / 60);
  const durationMinute = movie.duration - durationHour * 60;

  const checkUrl = (link) => {
    return urlPattern.test(link) ? link : 'https://youtu.be/dQw4w9WgXcQ';
  }

  useEffect(() => {
    if (savedMovies && page !== 'saved-movies') {
      savedMovies.some((item) => {
        if(item.movieId === movie.id) {
          setIsSaved(true);
          setSavedMovieId(item._id);
        }
      })
    }
  }, [page, savedMovies, movie.id]);

  useEffect(() => {
    (page === 'movies' && isSaved) && setButtonType('saved');
    (page === 'saved-movies') && setButtonType('delete');
  }, [isSaved, page]);

  return (
    <div className="movie">
      <a href={checkUrl(movie.trailerLink ? movie.trailerLink : movie.trailer)} className="movie__trailer-link" target="_blank" rel="noreferrer">
        <img src={thumb} alt={title} className="movie__thumb" />
      </a>
      <div className="movie__footer">
        <h2 className="movie__title">{title}</h2>
        <button className={`movie__button${buttonType ? ' movie__button_type_' + buttonType: ''}`} onClick={!buttonType ? () => handleSaveMovie(movie) : () => handleDeleteMovie(movie._id || savedMovieId)}></button>
      </div>
      <p className="movie__duration">{durationHour}ч {durationMinute}м</p>
    </div>
  );
}

export default MovieCard;
