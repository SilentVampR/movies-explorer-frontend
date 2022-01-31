import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';
import * as auth from '../../utils/auth';

import moviesApi from '../../utils/beatFilmsApi';
import myApi from '../../utils/myApi';

import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import SideMenu from '../Navigation/SideMenu/SideMenu';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import { savedMoviesList } from '../../utils/constants';
import Preloader from '../Preloader/Preloader';

function App() {
  const history = useHistory();

  /*STATES*/
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurentUser] = useState({ name: '', email: '' });
  const [films, setFilms] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSideMenuOpened, setIsSideMenuOpened] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isFormSending, setIsFormSending] = useState(false);

  const handleResponseError = (type, status) => {
    if (type === 'signin') {
      if (status === 400) {
        return console.log(`Не заполнено одно из полей. Статус: ${status}`);
      } else if (status === 401) {
        return console.log(`Неверно указан email или пароль. Статус: ${status}`);
      } else {
        return console.log(`Ошибка обработки запроса (попытка авторизации). Статус: ${status}`);
      }
    }
    if (type === 'authcheck') {
      if (status === 400) {
        return console.log(`Куки не установлены. Статус: ${status}`);
      } else if (status === 401) {
        return console.log(`Ошибка авторизации. Статус: ${status}`);
      } else {
        return console.log(`Ошибка обработки запроса (проверка авторизации). Статус: ${status}`);
      }
    }
    return console.log(`Ошибка обработки запроса. Статус: ${status}`);
  }

  useEffect(() => {
    authCheck();
  }, [])

  const authCheck = () => {
    setIsAuthChecking(true);
    myApi.getUserInfo()
      .then(res => {
        setCurentUser({
          name: res.data.name,
          email: res.data.email
        });
        setIsLoggedIn(true);
      })
      .catch(err => {
        setIsLoggedIn(false);
        handleResponseError('authcheck', err.status);
      })
      .finally(() => setIsAuthChecking(false));
  }

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
    moviesApi.getInitialMovies()
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
    setIsFormSending(true);
    myApi.editUserInfo(data)
      .then(res => setCurentUser(res.data))
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setIsFormSending(false));
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

  /* РЕГИСТРАЦИЯ */

  const handleSignUp = ({ name, email, password }) => {
    auth.signUp({ name, email, password })
      .then(() => {
        history.push('./signin');
        /*setIsInfoTooltipPopupOpen({
          opened: true,
          error: false,
          message: 'Вы успешно зарегистрировались!'
        });*/
      })
      .catch(err => {
        handleResponseError('Некорректно заполнено одно из полей', err);
        /*setIsInfoTooltipPopupOpen({
          opened: true,
          error: true,
          message: 'Что-то пошло не так! Попробуйте ещё раз.'
        });*/
      })
  }

  /* ВХОД */
  const handleSignIn = ({ email, password }) => {
    setIsFormSending(true)
    auth.signIn({ email, password })
      .then((res) => {
        setCurentUser({ name: res.name, email: res.email });
        setIsLoggedIn(true);
        setIsFormSending(false);
      })
      .catch(err => {
        handleResponseError('signin', err);
      })
      .finally(() => history.push('/'));
  }

  /* ВЫХОД */
  const handleSignOut = () => {
    auth.signOut();
    history.push('/');
    setIsLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {isAuthChecking ? (
        <Preloader fullscreen />
      ) : (
        <>
          <Switch>
            <Route
              path="/(|movies|saved-movies|profile)"
              component={() => (
                <Header
                  isLoggedIn={isLoggedIn}
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
                    isLoggedIn={isLoggedIn}
                  />
                )}
                path="/"
                exact
              />
              <ProtectedRoute
                path="/movies"
                exact
                component={Movies}
                films={films}
                savedMovies={savedMovies}
                isLoading={isLoading}
                isAuthChecking={isAuthChecking}
                isLoggedIn={isLoggedIn}
              />
              <ProtectedRoute
                path="/saved-movies"
                exact
                component={SavedMovies}
                films={savedMovies}
                isLoading={isLoading}
                isAuthChecking={isAuthChecking}
                isLoggedIn={isLoggedIn}
              />
              <ProtectedRoute
                path="/profile"
                exact
                component={Profile}
                handleEditProfileClick={handleEditProfileClick}
                isAuthChecking={isAuthChecking}
                onSignOut={handleSignOut}
                isLoggedIn={isLoggedIn}
              />
              <Route
                path="/signin"
                component={() => (
                  <SignIn
                    isLoggedIn={isLoggedIn}
                    onSignIn={handleSignIn}
                    isSending={isFormSending}
                  />
                )}
              />
              <Route
                path="/signup"
                component={() => (
                  <SignUp
                    isLoggedIn={isLoggedIn}
                    onSignUp={handleSignUp}
                    isSending={isFormSending}
                  />
                )}
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
                  isLoggedIn={isLoggedIn}
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onOverlayClick={handleOverlayClick}
                  onUpdateUser={handleUpdateUser}
                  isSending={isFormSending}
                />
              )}
            />
          </Switch>
          <SideMenu
            isSideMenuOpened={isSideMenuOpened}
            handleMenuClose={handleMenuClose}
          />
        </>)}
    </CurrentUserContext.Provider>
  );
}

export default App;
