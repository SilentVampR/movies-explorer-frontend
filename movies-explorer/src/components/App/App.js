import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter, Navigate, withRouter } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';
import Footer from '../Footer/Footer';

function App() {
  /*STATES*/
  const [loggedIn, setloggedIn] = useState(false);
  const [currentUser, setCurentUser] = useState({ name: '', email: '' });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <BrowserRouter>
        <Header />
        <main className="main">

          <Switch>
            <Route
              component={Landing}
              path="/"
              exact
              loggedIn={loggedIn}
            />
            {/*<ProtectedRoute
            component={ImagePopup}
            loggedIn={loggedIn}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
            card={selectedCard}
            onOverlayClick={handleOverlayClick}
          />*/}
            <Route
              path="/signin"
              component={Signin}
            />
            <Route
              path="/signup"
              component={Signup}
            />
          </Switch>
        </main>
        <Footer />
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
