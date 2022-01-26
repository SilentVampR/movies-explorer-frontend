import './LeftMenu.css';
import { Link, } from "react-router-dom";

function LeftMenu() {
  return (
    <>
      <Link to="/movies" className="top-menu__link">Фильмы</Link>
      <Link to="/saved-movies" className="top-menu__link">Сохранённые фильмы</Link>
    </>
  );
}

export default LeftMenu;
