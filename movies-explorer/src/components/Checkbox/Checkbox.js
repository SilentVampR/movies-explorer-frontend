import React from 'react';
import './Checkbox.css';

function Checkbox(props) {
  return (
    <button className="checkbox-stylized" onClick={props.handleCheckBox}></button>
  );
}

export default Checkbox;
