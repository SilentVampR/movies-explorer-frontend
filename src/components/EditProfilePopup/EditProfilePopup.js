import React, { useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function EditProfilePopup(props) {

  const currentUser = useContext(CurrentUserContext);

  const { values, errors, isValid, handleOnChange, resetForm } = useFormWithValidation();

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  useEffect(() => {
    if (currentUser.name === values.name && currentUser.email === values.email) {
      resetForm(currentUser, {}, false);
    }
  },[currentUser, values, resetForm]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.onUpdateUser(values);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      type="profile-edit"
      buttonText={props.isSending ? " Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverlayClick={props.onOverlayClick}
      onSubmit={handleOnSubmit}
      isDisabled={!isValid || props.isSending}
    >
      <div className="form__input-container">
        <label htmlFor="name" className="form__input-label">Имя</label>
        <input
          type="text"
          id="name"
          name="name"
          className={`form__input${(errors.name && !isValid) ? ' form__input_state_not-valid' : ''}`}
          placeholder="Имя"
          required
          minLength="2"
          maxLength="30"
          pattern='[a-zA-Zа-яА-Я -]{1,}'
          value={values.name || ""}
          onChange={handleOnChange}
        />
        <span className={`form__text-error${(errors.name && !isValid) ? ' form__text-error_state_not-valid' : ''}`}>{errors.name || ""}</span>
      </div>
      <div className="form__input-container">
        <label htmlFor="email" className="form__input-label">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          className={`form__input${(errors.email && !isValid) ? ' form__input_state_not-valid' : ''}`}
          placeholder="E-mail"
          required
          value={values.email || ""}
          onChange={handleOnChange}
        />
        <span className={`form__text-error${(errors.email && !isValid) ? ' form__text-error_state_not-valid' : ''}`}>{errors.email || ""}</span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
