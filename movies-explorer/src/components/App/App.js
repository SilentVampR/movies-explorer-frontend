import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter, Navigate, withRouter } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';

import api from '../../utils/api';

import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';

function App() {
  /*STATES*/
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setloggedIn] = useState(false);
  const [currentUser, setCurentUser] = useState({ name: '', email: '' });
  const [films, setFilms] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    api.getInitialFilms()
    .then(res => setFilms(res))
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [])

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
              path="/movies"
              //component={Movies}
              component={() => (<Movies films={films} />)}
            />
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
