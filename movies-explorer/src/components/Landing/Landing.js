import React from 'react';
import './Landing.css';
import Project from './Project/Project';
import MainMenu from './MainMenu/MainMenu';
import About from './About/About';
import Tech from './Tech/Tech';
import Student from './Student/Student';
import ToTopButton from './ToTopButton/ToTopButton';

function Landing() {
  return (
    <>
      <Project />
      <MainMenu />
      <About />
      <Tech />
      <Student />
      <ToTopButton />
    </>
  );
}

export default Landing;
