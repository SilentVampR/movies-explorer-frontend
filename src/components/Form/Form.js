import React from 'react';
import Logo from '../Logo/Logo';
import { Link } from "react-router-dom";
import './Form.css';

function Form({ fieldsList, textsList, onSubmit, isDisabled, isValid, errors }) {
  const renderInput = (input) => {
    const name = input.name;
    const text = input.text;
    const handle = input.handle;
    const formParams = {
      type: input.type,
      name: name,
      id: name,
      className: (errors[name] && !isValid) ? 'form__input form__input_state_not-valid' : 'form__input',
      placeholder: text,
    };
    if (input.params) {
      input.params.map((i) => formParams[i.name] = i.parametr);
    }
    if (handle) {
      formParams.onChange = handle;
    }
    if (input.required) {
      formParams.required = true;
    }
    return <div className="form__input-container" key={input.id}>
      <label className="form__input-label" htmlFor={name}>{text}</label>
      <input {...formParams} />
      <span className={`form__text-error${(errors[name] && !isValid) ? ' form__text-error_state_not-valid' : ''}`}>{errors[name] || ""}</span>
    </div>
  }
  if (fieldsList && textsList && onSubmit) {
    return (
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3 className="form__title">{textsList.title}</h3>
        <div className="form__container">
          <div className="form__inputs">
            {fieldsList.map((i) => renderInput(i))}
          </div>
          <div className="form__footer">
            <button
              className={`form__submit-button${isDisabled ? ' form__submit-button_disabled' : ''}`}
              type="submit"
              disabled={isDisabled}
            >
              {textsList.button}
            </button>
            <p className="form__footer-text">{(textsList.footerText) ? textsList.footerText : ''}{textsList.linkTo ? <Link to={textsList.linkTo} className="form__footer-link">{textsList.linkText}</Link> : ''}</p>
          </div>
        </div>
      </form>
    );
  }
  return (
    <p className="form__error">Ошибка загрузки формы (не все параметры переданы)</p> //Выдавать общий компонент ошибки с текстом
  );
}

export default Form;
