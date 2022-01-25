import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__about">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <ul className="footer__links">
          <li className="footer__link-container"><a href="https://practicum.yandex.ru" className="footer__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
          <li className="footer__link-container"><a href="https://github.com/SilentVampR/" className="footer__link" target="_blank" rel="noreferrer">Github</a></li>
          <li className="footer__link-container"><a href="https://www.instagram.com/silentvampr/" className="footer__link" target="_blank" rel="noreferrer">Instagram</a></li>
        </ul>
        <p className="footer__copyright">&copy;2022</p>
      </div>
    </footer>
  );
}

export default Footer;
