import React from 'react';
import './MainMenu.css';
import { Link as AnchorLink } from 'react-scroll';

function MainMenu() {
  return (
    <nav className="main-menu">
        <ul className="main-menu__container">
          <li className="main-menu__item">
            <AnchorLink
              smooth={true}
              duration={500}
              className="main-menu__link"
              to="about">
              О проекте
            </AnchorLink>
          </li>
          <li className="main-menu__item">
            <AnchorLink
            smooth={true}
            duration={550}
            className="main-menu__link"
            to="tech">
            Технологии
            </AnchorLink>
            </li>
          <li className="main-menu__item">
            <AnchorLink
            smooth={true}
            duration={600}
            className="main-menu__link"
            to="student">
              Студент
              </AnchorLink>
              </li>
        </ul>
      </nav>
  );
}

export default MainMenu;
