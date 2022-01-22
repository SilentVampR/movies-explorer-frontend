import React from 'react';
import './Landing.css';
import Project from './Project/Project';
import MainMenu from './MainMenu/MainMenu';
import About from './About/About';
import Tech from './Tech/Tech';
import Student from './Student/Student';

function Landing() {
  return (
    <>
      <Project />
      <MainMenu />
      <About />
      <Tech />
      <Student />
    </>
  );
}

export default Landing;
