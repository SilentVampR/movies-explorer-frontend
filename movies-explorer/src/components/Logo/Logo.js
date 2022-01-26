import './Logo.css';
import { Switch, Route, Link } from "react-router-dom";

function Logo() {
  return (
    <Switch>
      <Route path="/" exact>
        <div className="logo"></div>
      </Route>
      <Route path="/(signin|signup)">
        <div className="logo logo_type_sign"></div>
      </Route>
      <Route>
        <Link to="/" className="logo"></Link>
      </Route>
    </Switch>
  );
}

export default Logo;
