import './RightMenu.css';
import { Link, } from "react-router-dom";

function RightMenu(props) {
  if (props.isLoggedIn) {
    return (
      <>
        <Link to="/profile" className="top-menu__link top-menu__link_type_account">Аккаунт</Link>
        <button className="burger-menu" onClick={props.handlerBurgerClick}></button>
      </>
    )
  }
  return (
    <>
      <Link to="/signup" className="top-menu__link">Регистрация</Link>
      <Link to="/signin" className="signin-button">Войти</Link>
    </>
  );
}

export default RightMenu;
