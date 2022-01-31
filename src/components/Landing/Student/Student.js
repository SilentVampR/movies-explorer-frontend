import React from 'react';
import './Student.css';
import avatar from '../../../images/me_avatar.jpg';
import Portfolio from './Portfolio/Portfolio';

function Student() {
  return (
    <section className="section student" id="student">
      <h2 className="section__title">Студент</h2>
      <div className="student__container">
        <img src={avatar} alt="Фото Евгений Корсунов" className="student__photo" />
        <div>
          <div className="student__about-container">
            <div>
              <h3 className="student__name">Евгений</h3>
              <p className="student__subtitle">Web-разработчик, 38 лет</p>
              <p className="student__about">Родился и живу в Благовещенске, амурской области. Более 10 лет работаю
                системным
                администриром и иногда практикуюсь в программировании и веб-разработке.</p>
              <p className="student__about">Помимо веб-разработки обладаю навыками работы в графических (векторные,
                растровые) и видео редакторах.</p>
            </div>
            <ul className="student__links">
              <li>
                <a href="https://www.instagram.com/silentvampr/" className="student__link" target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://github.com/SilentVampR/" className="student__link" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Portfolio/>
    </section>
  );
}

export default Student;
