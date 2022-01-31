import React from 'react';
import './Tech.css';

function Tech() {
  return (
    <section className="section tech" id="tech">
      <div className="tech__wrapper">
        <h2 className="section__title">Технологии</h2>
        <h3 className="tech__title">7 технологий</h3>
        <p className="tech__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном
          проекте.
        </p>
        <ul className="tech__container">
          <li className="tech__icon">HTML</li>
          <li className="tech__icon">CSS</li>
          <li className="tech__icon">JS</li>
          <li className="tech__icon">React</li>
          <li className="tech__icon">Git</li>
          <li className="tech__icon">Express.js</li>
          <li className="tech__icon">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Tech;
