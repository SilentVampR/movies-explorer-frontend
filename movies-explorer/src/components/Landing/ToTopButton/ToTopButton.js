import React from 'react';
import './ToTopButton.css';
import { animateScroll as Scroll } from 'react-scroll';

function ToTopButton() {
  const scrollToTop = function () {
    Scroll.scrollToTop();
  };
  const btn = document.querySelector('.to-the-top');

  function scrolling() {
    window.pageYOffset > 700 ? btn.style.opacity = '1' : btn.style.opacity = '0';
  }

  window.onscroll = scrolling;

  return (
    <button onClick={scrollToTop} className="to-the-top"></button>
  );
}

export default ToTopButton;
