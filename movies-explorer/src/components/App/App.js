import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';

import api from '../../utils/api';

import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import SignOut from '../SignOut/SignOut';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import SideMenu from '../SideMenu/SideMenu';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import { savedMoviesList } from '../../utils/constants';

function App() {
  /*STATES*/
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setloggedIn] = useState(true); //Сменить на false после подключения API
  const [currentUser, setCurentUser] = useState({ name: 'Евгений', email: 'johnny.1983@yandex.ru' }); //Сменить на пустые значения, после подключения API
  const [films, setFilms] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSideMenuOpened, setIsSideMenuOpened] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isFormSended, setIsFormSended] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setSavedMovies( //Временное решение с сохраненными фильмами
      savedMoviesList
    )
    setIsLoading(false);
  }, []);

  const handlerBurgerClick = () => {
    setIsSideMenuOpened(true);
  }

  const handleMenuClose = () => {
    setIsSideMenuOpened(false);
  }

  useEffect(() => {
    setIsLoading(true);
    api.getInitialMovies()
      .then(res => setFilms(res))
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
  }, []);

  /* PROFILE */

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);

  }

  const handleUpdateUser = (data) => {
    /* api.editUserInfo(data) //Подключить API
    .then(res => setCurentUser(res.data))
      .then(() => closeAllPopups())
      .catch(err => console.log(err));*/
    setCurentUser(data);
    closeAllPopups();
  }

  /* END PROFILE */

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  }

  /* ALL POPUPS */

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
  }

  /* END ALL POPUPS */

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <BrowserRouter>
        <Switch>
          <Route
            path="/(|movies|saved-movies|profile)"
            component={() => (
              <Header
                loggedIn={loggedIn}
                handlerBurgerClick={handlerBurgerClick}
              />
            )}
          />
        </Switch>
        <main className="main">
          <Switch>
            <Route
              component={() => (
                <Landing
                  loggedIn={loggedIn}
                />
              )}
              path="/"
              exact
            />
            <Route
              path="/movies"
              exact
              component={() => (
                <Movies
                  films={films}
                  savedMovies={savedMovies}
                  isLoading={isLoading}
                />
              )}
            />
            <Route
              path="/saved-movies"
              exact
              component={() => (
                <SavedMovies
                  films={savedMovies}
                  isLoading={isLoading}
                />
              )}
            />
            <Route
              path="/profile"
              exact
              component={() => (
                <Profile
                  handleEditProfileClick={handleEditProfileClick}
                />
              )}
            />
            <Route
              path="/signin"
              component={SignIn}
            />
            <Route
              path="/signup"
              component={SignUp}
            />
            <Route
              path="/signout"
              component={SignOut}
            />
            <Route
              path="*"
              component={NotFound}
            />
          </Switch>
        </main>
        <Switch>
          <Route
            path="/(|movies|saved-movies)"
            component={Footer}
          />
          <Route
            path="/profile"
            exact
            component={() => (
              <EditProfilePopup
                loggedIn={loggedIn}
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onOverlayClick={handleOverlayClick}
                onUpdateUser={handleUpdateUser}
              />
            )}
          />
        </Switch>
        <SideMenu
          isSideMenuOpened={isSideMenuOpened}
          handleMenuClose={handleMenuClose}
        />
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
