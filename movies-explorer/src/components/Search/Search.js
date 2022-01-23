import React from 'react';
import Checkbox from '../Checkbox/Checkbox';
import './Search.css';

function Search() {
  return (
    <section className="search">
      <form className="search-form">
        <input className="search-form__input" required placeholder="Фильм" />
        <input className="search-form__checkbox" type="checkbox" hidden />
        <button className="search-form__button"></button>
      </form>
      <div className="short-movies">
        <p className="short-movies__label">Короткометражки</p>
        <Checkbox/>
      </div>
    </section>
  );
}

export default Search;
