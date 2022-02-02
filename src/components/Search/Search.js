import React, { useEffect, useContext } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import './Search.css';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Search({
  isSending,
  onFilter,
  shortMovies,
  setShortMovies,
  localData,
  isFiltered,
  isSavedFiltered
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isValid, handleOnChange, resetForm } = useFormWithValidation();

  useEffect(() => {
    resetForm({
      ...values,
      shortMovies: shortMovies,
      searchWord: (localData && localData.searchWord) ? localData.searchWord : values.searchWord
    }, errors, (localData && (localData.searchWord || shortMovies)) ? true : isValid);
  }, [shortMovies, resetForm, currentUser, localData]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onFilter(values);
  }

  const handleCheckBox = (e) => {
    e.target.classList.toggle('checkbox-stylized_enabled');
    setShortMovies(!shortMovies);
    if (isFiltered && isValid) {
      values.shortMovies = !shortMovies;
      onFilter(values);
    }
    if (isSavedFiltered && isValid) {
      values.shortMovies = !shortMovies;
      onFilter(values);
    }
  }

  return (
    <section className="search">
      <form className="search-form" onSubmit={handleOnSubmit}>
        <input
          className="search-form__input"
          name="searchWord"
          onChange={handleOnChange}
          placeholder="Фильм"
          pattern='[a-zA-Zа-яА-Яё0-9 -]{1,}'
          value={values.searchWord || ""}
        />
        <input
          className="search-form__checkbox"
          name="shortMovies"
          onChange={handleOnChange}
          checked={shortMovies}
          type="checkbox"
          hidden
        />
        <button
          className={`search-form__button${(isSending || !isValid) ? ' search-form__button_disabled' : ''}`}
          disabled={isSending || !isValid}></button>
        <span
          className={`search-form__error${(errors.searchWord && !isValid) ? ' search-form__error_state_not-valid' : ''}`}
        >
          {errors.searchWord ? errors.searchWord : ''}
        </span>
      </form>
      <div className="short-movies">
        <p className="short-movies__label">Короткометражки</p>
        <Checkbox handleCheckBox={handleCheckBox} shortMovies={shortMovies} />
      </div>
    </section>
  );
}

export default Search;
