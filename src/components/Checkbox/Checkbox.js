import React from 'react';
import './Checkbox.css';

function Checkbox({ shortMovies, handleCheckBox }) {
  return (
    <button className={`checkbox-stylized${shortMovies ? ' checkbox-stylized_enabled' : ''}`} onClick={handleCheckBox}></button>
  );
}

export default Checkbox;
