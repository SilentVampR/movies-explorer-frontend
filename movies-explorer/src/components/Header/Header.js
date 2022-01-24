import React, { useState, useEffect } from 'react';
import { Link, useHistory, withRouter } from "react-router-dom";
import './Header.css';
import LeftMenu from './LeftMenu/LeftMenu';
import Logo from './Logo/Logo';
import RightMenu from './RightMenu/RightMenu';

function Header(props) {
  const history = useHistory();

  const [headerStyle, setHeaderStyle] = useState('header');
  const [showLeftMenu, setShowLeftMenu] = useState(false);

  const uri = history.location.pathname;

  useEffect(() => {
    setHeaderStyle((uri === '/') ? 'header header_main-page' : 'header');
    setShowLeftMenu(props.loggedIn && uri !== '/signin' && uri !== '/signup' ? true : false);
  }, [uri, props.loggedIn]);

  return (
    <header className={headerStyle}>
      <div className="header__container">
        <Logo uri={uri} />
        <div className="top-menu">
          <div className="top-menu__left">
            {(showLeftMenu) &&
              <LeftMenu />
            }
          </div>
          <div className="top-menu__right">
            <RightMenu loggedIn={props.loggedIn} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default withRouter(Header);
