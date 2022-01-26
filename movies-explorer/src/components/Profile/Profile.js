import React from 'react';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const userName = currentUser.name;
  const userEmail = currentUser.email;

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {userName}!</h1>
      {/* ВРЕМЕННОЕ СООБЩЕНИЕ ОБ ОШИБКЕ - ИСПРАВИТЬ НА КОМПОНЕНТ ОБРАБОТКИ ОШИБОК */}
      <span className="profile__edit-message-text">Hello</span>
      <ul className="profile__fields">
        <li className="profile__field"><p className="profile__field-text">Имя</p><p className="profile__field-text profile__field-text_type_name">{userName}</p></li>
        <li className="profile__field"><p className="profile__field-text">E-mail</p><p className="profile__field-text profile__field-text_type_email">{userEmail}</p></li>
      </ul>
      <div className="profile__links">
        <button className="profile__edit-button" onClick={props.handleEditProfileClick}>Редактировать</button>
        <Link to="/signout" className="profile__logout-link">Выйти из аккаунта</Link>
      </div>
    </section>
  );
}

export default Profile;
