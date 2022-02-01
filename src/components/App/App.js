import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedComponent from '../ProtectedComponent/ProtectedComponent';
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

  /* STATES */
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки данных
  const [isAuthChecking, setIsAuthChecking] = useState(true); // Состояние проверки аутентификации. По умолчанию включено
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Состояние авторизации пользователя
  const [currentUser, setCurentUser] = useState({}); // Данные пользователя
  const [beatMovies, setBeatMovies] = useState([]); // Загруженные фильмы с сервера
  const [savedMovies, setSavedMovies] = useState([]); // Сохраненные фильмы пользователя в нашей базе данных
  const [isSideMenuOpened, setIsSideMenuOpened] = useState(false); // Состояние бокового меню (по умолчанию закрыто)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); // Состояние попапа формы редактирования профиля
  const [isFormSending, setIsFormSending] = useState(false); // Состояние отправки данных на сервер
  const [isShortMovieSelected, setIsShortMovieSelected] = useState(false); // Состояние чекбокса сохраненных фильмов
  const [localData, setLocalData] = useState({});
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [cardsOnPage, setCardsOnPage] = useState(3);
  const [step, setStep] = useState(cardsOnPage);

  /* Общий обработчик ошибок */
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
    if (type === 'signout') {
      return console.log(`Ошибка обработки запроса (попытка выхода из приложения). Статус: ${status}`);
    }
    return console.log(`Ошибка обработки запроса. Статус: ${status}`);
  }

  /* ПРОВЕРКА АУТЕНТИФИКАЦИИ */

  useEffect(() => {
    setIsAuthChecking(true);
    myApi.getUserInfo()
      .then(res => {
        setCurentUser({
          name: res.data.name,
          email: res.data.email,
          id: res.data._id // ID пользователя пока сохраняем, например для идентификации данных в локальном хранилище
        });
        setIsLoggedIn(true);
      })
      .catch(err => {
        setIsLoggedIn(false);
        handleResponseError('authcheck', err.status);
      })
      .finally(() => setIsAuthChecking(false));
  }, []);

  /* ДОСТАЕМ ДАННЫЕ ИЗ ЛОКАЛЬНОГО ХРАНИЛИЩА */

  useEffect(() => {
    if (isLoggedIn) {
      setLocalData(JSON.parse(localStorage.getItem('searchMovies')));
    }
  }, [isLoggedIn]);

  /* ПРОВЕРКА СООТВЕТСВИЯ ЛОКАЛЬНОГО ХРАНИЛИЩА ТЕКУЩЕМУ ПОЛЬЗОВАТЕЛЮ */

  useEffect(() => {
    if (localData.userId !== currentUser.id) {
      localStorage.clear();
      setLocalData({});
    }
    console.log(localData);
    if (localData.searchWord) {
      onSearchMovies(localData);
    }
  }, []);

  /* РЕГИСТРАЦИЯ */

  const handleSignUp = ({ name, email, password }) => {
    setIsFormSending(true);
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
      .finally(() => setIsFormSending(false));
  }

  /* ВХОД */
  const handleSignIn = ({ email, password }) => {
    setIsFormSending(true);
    auth.signIn({ email, password })
      .then((res) => {
        setIsLoggedIn(true);
        setCurentUser({ name: res.name, email: res.email });
        history.push('/movies');
      })
      .catch(err => {
        handleResponseError('signin', err);
      })
      .finally(() => setIsFormSending(false));
  }

  /* ВЫХОД */
  const handleSignOut = () => {
    auth.signOut()
      .then(() => setIsLoggedIn(false))
      .then(() => localStorage.clear())
      .catch(err => handleResponseError('signout', err))
      .finally(() => {
        history.push('/');
      })
  }

  /* ЗАГРУЗКА СОХРАНЕННЫХ ФИЛЬМОВ (ТОЛЬКО ДЛЯ АВТОРИЗОВАННЫХ) */
  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      setSavedMovies( //Временное решение с сохраненными фильмами
        savedMoviesList
      )
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  /* ОБРАБОТЧИКИ КНОПОК МЕНЮ */
  const handlerBurgerClick = () => {
    setIsSideMenuOpened(true);
  }

  const handleMenuClose = () => {
    setIsSideMenuOpened(false);
  }

  /* ОБРАБОТКА КНОПКИ ЕЩЕ */

  const handleShowMore = () => {
    setStep(step + cardsOnPage);
  }

  /* ЗАГРУЗКА КАРТОЧЕК С СЕРВЕРА BEATFILMS */
  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      moviesApi.getInitialMovies()
        .then(res => setBeatMovies(res))
        .catch(err => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    }
  }, [isLoggedIn]);

  /* ПОИСК */

  const compareSearch = (str, word) => {
    //console.log(str.toLowerCase().includes(word.toLowerCase()));
    return str.toLowerCase().includes(word.toLowerCase());
    // НУЖНО РЕШИТЬ ПРОБЛЕМУ С БУКВОЙ Ё
  }

  const searchMovie = (films, searchWord, short) => {
    // films.forEach(i=>console.log(i.nameRU));
    if (short) {
      return films.filter((movie) => compareSearch(movie.nameRU, searchWord) && movie.duration <= 40);
      //return films.filter((movie) => movie.nameRU.toLowerCase().includes(searchWord.toLowerCase()) && movie.duration <= 40);
    }
    return films.filter((movie) => compareSearch(movie.nameRU, searchWord));
  }

  const onSearchMovies = (data) => {
    setIsLoading(true);
    setIsFormSending(true);
    console.log(data.shortMovies);
    setStep(cardsOnPage);
    setFilteredMovies(searchMovie(beatMovies, data.searchWord, data.shortMovies));
    localStorage.setItem('searchMovies', JSON.stringify({
      userId: currentUser.id,
      shortMovies: data.shortMovies,
      searchWord: data.searchWord
    }));
    setLocalData(JSON.parse(localStorage.getItem('searchMovies')));
    setIsLoading(false);
    setIsFormSending(false);
  }

  const onSearchSavedMovies = (data) => {
    setStep(cardsOnPage);
    setFilteredSavedMovies(searchMovie(savedMovies, data.searchWord, data.shortMovies));
  }

  /* PROFILE */

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleUpdateUser = (data) => {
    setIsFormSending(true);
    myApi.editUserInfo(data)
      .then((res) => {
        setCurentUser(res.data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsFormSending(false));
  }

  /* END PROFILE */

  /* ОБРАБОТЧИКИ ДЛЯ ЗАКРЫТИЯ ПОПАПОВ */
  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  }

  /* ALL POPUPS */

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
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
            >
              <Header
                isLoggedIn={isLoggedIn}
                handlerBurgerClick={handlerBurgerClick}
              />
            </Route>
          </Switch>
          <main className="main">
            <Switch>
              <Route
                component={() => (
                  <Landing />
                )}
                path="/"
                exact
              />
              <ProtectedRoute
                path="/movies"
                exact
                component={Movies}
                movies={filteredMovies}
                savedMovies={savedMovies}
                isLoading={isLoading}
                isLoggedIn={isLoggedIn}
                isAuthChecking={isAuthChecking}
                isSending={isFormSending}
                onSearch={onSearchMovies}
                shortMovies={isShortMovieSelected}
                setShortMovies={setIsShortMovieSelected}
                localData={localData}
                step={step}
                handleShowMore={handleShowMore}
              />
              <ProtectedRoute
                path="/saved-movies"
                exact
                component={SavedMovies}
                movies={savedMovies}
                filteredMovies={filteredSavedMovies}
                isLoading={isLoading}
                isAuthChecking={isAuthChecking}
                isLoggedIn={isLoggedIn}
                isSending={isFormSending}
                onSearch={onSearchSavedMovies}
                shortMovies={isShortMovieSelected}
                setShortMovies={setIsShortMovieSelected}
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
                exact
              >
                <SignIn
                  isLoggedIn={isLoggedIn}
                  onSignIn={handleSignIn}
                  isSending={isFormSending}
                />
              </Route>
              <Route
                path="/signup"
                exact
              >
                <SignUp
                  isLoggedIn={isLoggedIn}
                  onSignUp={handleSignUp}
                  isSending={isFormSending}
                />
              </Route>
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
          </Switch>
          <ProtectedComponent
            component={EditProfilePopup}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onOverlayClick={handleOverlayClick}
            onUpdateUser={handleUpdateUser}
            isSending={isFormSending}
            isLoggedIn={isLoggedIn}
          />
          <SideMenu
            isSideMenuOpened={isSideMenuOpened}
            handleMenuClose={handleMenuClose}
          />
        </>)}
    </CurrentUserContext.Provider>
  );
}

export default App;
