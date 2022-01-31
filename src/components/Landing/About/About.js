import React from 'react';
import './About.css';

function About() {
  return (
    <section className="section about" id="about">
      <h2 className="section__title">О проекте</h2>
      <div className="about__container">
        <article className="about__arcticle">
          <h3 className="about__title">Дипломный проект включал 5&nbsp;этапов</h3>
          <p className="about__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и
            финальные
            доработки.</p>
        </article>
        <article className="about__arcticle">
          <h3 className="about__title">На выполнение диплома ушло 5&nbsp;недель</h3>
          <p className="about__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
            успешно
            защититься.</p>
        </article>
      </div>
      <div className="stage">
        <div className="stage__column stage__column_color_green">1 неделя</div>
        <div className="stage__column stage__column_color_gray">4 недели</div>
        <div className="stage__column">Back-end</div>
        <div className="stage__column">Front-end</div>
      </div>
    </section>
  );
}

export default About;
