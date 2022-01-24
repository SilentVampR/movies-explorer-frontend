import './Logo.css';
import { Link, } from "react-router-dom";

function Logo(props) {
  return (
    (props.uri === "/") ? <div className="logo"></div> : <Link to="/" className="logo"></Link>
  );
}

export default Logo;
