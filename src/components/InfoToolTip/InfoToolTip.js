import React from 'react';
import './InfoToolTip.css';

function InfoToolTip ( { isOpened, onClose, onOverlayClick} ) {
  return(
    <>
    <div className={`info-tooltip ${isOpened.opened ? ' info-tooltip_opened' : ''}`} onClick={onOverlayClick}>
      <div className={`info-tooltip__container ${isOpened.error ? 'info-tooltip__container_type_error' : ''}${isOpened.opened ? ' info-tooltip__container_opened' : ''}`}>
        <div className={`info-tooltip__icon info-tooltip__icon_type_${isOpened.error ? 'error' : 'success'}`}></div>
        <p className="info-tooltip__message">{isOpened.message}</p>
        <button className="info-tooltip__close-button" type="button" onClick={onClose}></button>
      </div>
    </div>
    </>
  )
}

export default InfoToolTip;
