import './PopupWithForm.css';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.type}${props.isOpen ? ' popup_opened' : ''}`} onClick={props.onOverlayClick}>
      <form className="form popup__form" name={props.type} onSubmit={props.onSubmit}>
        <h2 className="form__title popup__title">{props.title}</h2>
        <div>
          {props.children}
        </div>
        <button
          className={`popup__submit-button${props.isDisabled ? ' popup__submit-button_disabled' : ''}`}
          disabled={props.isDisabled}
        >
          {props.buttonText}
        </button>
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
      </form>
    </div>
  );
}

export default PopupWithForm;
