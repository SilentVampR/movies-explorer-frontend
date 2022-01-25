import './SideMenu.css';
import { NavLink, } from "react-router-dom";

function SideMenu(props) {
  return (
    <div className={`side-menu${(props.isSideMenuOpened) ? ' side-menu_opened' : ''}`}>
      <button className="side-menu__close-button" onClick={props.handleMenuClose}></button>
      <div className="side-menu__top-container">
        <NavLink activeClassName="side-menu__link_active" exact={true} to="/" className="side-menu__link" onClick={props.handleMenuClose}>Главная</NavLink>
        <NavLink activeClassName="side-menu__link_active" to="/movies" className="side-menu__link" onClick={props.handleMenuClose}>Фильмы</NavLink>
        <NavLink activeClassName="side-menu__link_active" to="/saved-movies" className="side-menu__link" onClick={props.handleMenuClose}>Сохранённые фильмы</NavLink>
      </div>
      <div className="side-menu__bottom-container">
        <NavLink activeClassName="side-menu__link_active" to="/profile" className="side-menu__link side-menu__link_type_account" onClick={props.handleMenuClose}>Аккаунт</NavLink>
      </div>
    </div>
  );
}

export default SideMenu;
