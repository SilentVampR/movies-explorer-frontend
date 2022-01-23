import React from 'react';
import './Movie.css';
import { beatFilmApiURL } from '../../utils/constants';

function Movie(props) {
  const thumb = beatFilmApiURL + props.thumb;
  const title = props.title;
  console.log(props.duration);
  const durationHour = Math.floor(props.duration/60);
  const durationMinute = props.duration - durationHour * 60;

  return (
    <div className="movie">
      <img src={thumb} alt={title} className="movie__thumb" />
      <div className="movie__footer">
        <h2 className="movie__title">{title}</h2>
        <button className="movie__button"></button>
      </div>
      <p className="movie__duration">{durationHour}ч {durationMinute}м</p>
    </div>
  );
}

export default Movie;
