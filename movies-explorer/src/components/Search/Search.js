import React, { useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import './Search.css';

function Search() {

  const [movieName, setMovieName] = useState('');
  const [isShortMovieSelected, setIsShortMovieSelected] = useState(false);

  const handleChangeMovieName = (e) => {
    setMovieName(e.target.value);
  }

  const handleChangeCheckBox = () => {
    //React ругается на его отсутсвие, поэтому пока он здесь
  }

  const handleCheckBox = (e) => {
    e.target.classList.toggle('checkbox-stylized_enabled');
    setIsShortMovieSelected(!isShortMovieSelected);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(movieName + ' - ' + isShortMovieSelected);
  }

  return (
    <section className="search">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-form__input"
          name="movieName"
          onChange={handleChangeMovieName}
          required
          placeholder="Фильм"
          minLength="2"
        />
        <input
          className="search-form__checkbox"
          name="shortMovies"
          onChange={handleChangeCheckBox}
          checked={isShortMovieSelected}
          type="checkbox"
          hidden
        />
        <button className="search-form__button"></button>
      </form>
      <div className="short-movies">
        <p className="short-movies__label">Короткометражки</p>
        <Checkbox handleCheckBox={handleCheckBox} />
      </div>
    </section>
  );
}

export default Search;
