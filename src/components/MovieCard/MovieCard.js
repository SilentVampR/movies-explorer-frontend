import React, { useEffect, useState } from 'react';
import './MovieCard.css';
import { beatFilmApiURL } from '../../utils/constants';

function MovieCard(props) {
  const [buttonType, setButtonType] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const thumb = beatFilmApiURL + props.thumb;
  const title = props.title;
  const durationHour = Math.floor(props.duration / 60);
  const durationMinute = props.duration - durationHour * 60;
  useEffect(() => {
    if (props.savedMovies && props.page !== 'saved-movies') {
      setIsSaved(props.savedMovies.some(item => item.id === props.id));
    }
  }, [props.page, props.savedMovies, props.id]);

  useEffect(() => {
    (props.page === 'movies' && isSaved) && setButtonType(' movie__button_type_saved');
    (props.page === 'saved-movies') && setButtonType(' movie__button_type_delete');
  }, [isSaved, props.page]);

  return (
    <div className="movie">
      <img src={thumb} alt={title} className="movie__thumb" />
      <div className="movie__footer">
        <h2 className="movie__title">{title}</h2>
        <button className={`movie__button` + buttonType}></button>
      </div>
      <p className="movie__duration">{durationHour}ч {durationMinute}м</p>
    </div>
  );
}

export default MovieCard;
