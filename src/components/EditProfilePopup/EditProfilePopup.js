import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditProfilePopup(props) {

  const [name, setName] = React.useState('');

  const [email, setAbout] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.email);
  }, [currentUser]);
  const handleOnChangeName = (e) => {
    setName(e.target.value);
  }

  const handleOnChangeEmail = (e) => {
    setAbout(e.target.value);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.onUpdateUser({
      name,
      email,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      type="profile-edit"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverlayClick={props.onOverlayClick}
      onSubmit={handleOnSubmit}
    >
      <div className="popup__input-container">
        <label htmlFor="profileUserName" className="popup__input-label">Имя</label>
        <input type="text" id="profileUserName" name="profileUserName" className="popup__input" placeholder="Имя" required minLength="2" maxLength="30" value={name} onChange={handleOnChangeName} />
        <span className="popup__text-error"></span>
      </div>
      <div className="popup__input-container">
        <label htmlFor="profileUserEmail" className="popup__input-label">E-mail</label>
        <input type="email" id="profileUserEmail" name="profileUserEmail" className="popup__input" placeholder="E-mail" required value={email} onChange={handleOnChangeEmail} />
        <span className="popup__text-error">Ошибочка вышла</span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
