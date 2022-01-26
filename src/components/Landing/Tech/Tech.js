import React from 'react';
import './Tech.css';

function Tech() {
  return (
    <section className="tech" id="tech">
      <h2 className="section__title">Технологии</h2>
      <h3 className="tech__title">7 технологий</h3>
      <p className="tech__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном
        проекте.
      </p>
      <div className="tech__container">
        <div className="tech__icon">HTML</div>
        <div className="tech__icon">CSS</div>
        <div className="tech__icon">JS</div>
        <div className="tech__icon">React</div>
        <div className="tech__icon">Git</div>
        <div className="tech__icon">Express.js</div>
        <div className="tech__icon">mongoDB</div>
      </div>
    </section>
  );
}

export default Tech;
