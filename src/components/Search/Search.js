import React, { useEffect } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import './Search.css';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Search({ isSending, onSearch, shortMovies, setShortMovies }) {
  const { values, errors, isValid, handleOnChange, resetForm } = useFormWithValidation();

  const localSearchShort = localStorage.getItem('searchShort');
  const localSearchWord = localStorage.getItem('searchWord');
  useEffect(() => {
    console.log('Check short - (' + localSearchShort + ')')
    if(localSearchShort) {
      setShortMovies(localSearchShort);
    }
  }, [localSearchShort])

  useEffect(() => {
    console.log('Change short - (' + shortMovies + ')')
    resetForm({
      ...values,
      shortMovies: shortMovies
    }, errors, isValid);
  }, [shortMovies, resetForm]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSearch(values);
  }

  const handleCheckBox = (e) => {
    e.target.classList.toggle('checkbox-stylized_enabled');
    setShortMovies(!shortMovies);
  }

  return (
    <section className="search">
      <form className="search-form" onSubmit={handleOnSubmit}>
        <input
          className="search-form__input"
          name="movieName"
          onChange={handleOnChange}
          required
          placeholder="Фильм"
          minLength="2"
          pattern='[a-zA-Zа-яА-Я0-9 -]{1,}'
          value={(localSearchWord!== null) ? localSearchWord : ""}
        />
        <input
          className="search-form__checkbox"
          name="shortMovies"
          onChange={handleOnChange}
          checked={shortMovies}
          type="checkbox"
          hidden
        />
        <button className={`search-form__button${(isSending || !isValid) ? ' search-form__button_disabled' : ''}`} disabled={isSending || !isValid}></button>
        <span className={`search-form__error${(errors.movieName && !isValid) ? ' search-form__error_state_not-valid' : ''}`}>{errors.movieName ? errors.movieName : ''}</span>
      </form>
      <div className="short-movies">
        <p className="short-movies__label">Короткометражки</p>
        <Checkbox handleCheckBox={handleCheckBox} shortMovies={shortMovies} />
      </div>
    </section>
  );
}

export default Search;
