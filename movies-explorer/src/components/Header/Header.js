import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from './Logo/Logo';


function Header() {
  return (
    <header className="header header_main-page">
      <div className="header__container">
        <Logo/>
        <div className="top-menu">
          <Link to="/signup" className="top-menu__link">Регистрация</Link>
          <Link to="/signin" className="signin-button">Войти</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
