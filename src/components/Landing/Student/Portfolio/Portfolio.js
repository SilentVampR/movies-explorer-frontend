import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__links">
        <li className="portfolio__link-container">
          <a href="http://silentvampr-ru.1gb.ru/" className="portfolio__link" target="_blank" rel="noreferrer">
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__link-container">
          <a href="https://silentvampr.github.io/russian-travel/" className="portfolio__link" target="_blank" rel="noreferrer">
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__link-container">
          <a href="https://silentvampr.nomoredomains.work/" className="portfolio__link" target="_blank" rel="noreferrer">
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;

