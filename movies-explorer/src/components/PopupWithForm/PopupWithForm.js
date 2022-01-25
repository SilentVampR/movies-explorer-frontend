function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.type}${props.isOpen ? ' popup_opened' : ''}`} onClick={props.onOverlayClick}>
      <form className="popup__form-container" name={props.type} onSubmit={props.onSubmit}>
        <h2 className="popup__title">{props.title}</h2>
        <div>
          {props.children}
        </div>
        <button className="popup__submit-button">{props.buttonText}</button>
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
      </form>
    </div>
  );
}

export default PopupWithForm;
