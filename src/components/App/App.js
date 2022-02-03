import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedComponent from '../ProtectedComponent/ProtectedComponent';
import './App.css';
import * as auth from '../../utils/auth';
import getResponseError from '../../helpers/getResponseError';

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
import Preloader from '../Preloader/Preloader';
import InfoToolTip from '../InfoToolTip/InfoToolTip';

function App() {
  const history = useHistory();

  /* STATES */
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки данных
  const [isSaving, setIsSaving] = useState(false); // Состояние сохранения карточки (в работе)
  const [isFormSending, setIsFormSending] = useState(false); // Состояние отправки данных на сервер

  const [isAuthChecking, setIsAuthChecking] = useState(true); // Состояние проверки аутентификации. По умолчанию включено
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Состояние авторизации пользователя
  const [currentUser, setCurentUser] = useState({}); // Данные пользователя

  const [beatMovies, setBeatMovies] = useState([]); // Загруженные фильмы с сервера
  const [savedMovies, setSavedMovies] = useState([]); // Сохраненные фильмы пользователя в нашей базе данных

  const [isSideMenuOpened, setIsSideMenuOpened] = useState(false); // Состояние бокового меню (по умолчанию закрыто)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); // Состояние попапа формы редактирования профиля

  const toolTipParams = {
    opened: false, // false
    error: false, // false
    message: '', // ''
  }
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(toolTipParams);

  const [filteredMovies, setFilteredMovies] = useState([]); // Массив с отфильтрованными фильмами
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]); // Массив с отфильтрованными сохраненными фильмами

  const [isFiltered, setIsFiltered] = useState(false); // Применен ли фильтр на странице фильмы
  const [isSavedFiltered, setIsSavedFiltered] = useState(false); // Применен ли фильтр на странице фильмы

  const [isShortMovieSelected, setIsShortMovieSelected] = useState(false); // Состояние чекбокса сохраненных фильмов
  const [isSavedShortMovieSelected, setIsSavedShortMovieSelected] = useState(false); // Состояние чекбокса сохраненных фильмов в сохраненных

  const [isFirstStart, setIsFirstStart] = useState(true); //При первой загрузке проверяем локальное хранилище на предмет поисковых данных

  const [localData, setLocalData] = useState({}); // Локальные данные

  const [cardsOnPage, setCardsOnPage] = useState(12); // Количество карточек на странице. Зависит от ширины экрана.
  const [step, setStep] = useState(3); // Количество карточек, которые появляются после нажатия кнопки Еще

  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Состояние ширины окна при загрузке

  /* УСТАНОВКА ЗНАЧЕНИЙ ШАГА И ОБЩЕГО КОЛИЧЕСТВА КАРТОЧЕК В ЗАВИСИМОСТИ ОТ РАЗМЕРА ОКНА */

  useEffect(() => {
    const resize = () => {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // const resize = () => {
  //   setWindowWidth(window.innerWidth);
  // }
  // window.addEventListener('resize', resize);

  const toolTipHandler = (error, text) => {
    setIsInfoTooltipPopupOpen({
      opened: true,
      error: error,
      message: text
    });
    setTimeout(() => {
      setIsInfoTooltipPopupOpen({
        opened: false,
        error: error,
        message: text
      });
    }, 3500);
  }

  useEffect(() => {
    if (windowWidth >= 1280) {
      setStep(3);
      if (cardsOnPage <= 12 || isLoading) {
        setCardsOnPage(12)
      };
    } else if (windowWidth >= 768) {
      setStep(2);
      if (cardsOnPage <= 8 || isLoading) {
        setCardsOnPage(8)
      };
    } else {
      setStep(2);
      if (cardsOnPage <= 5 || isLoading) {
        setCardsOnPage(5)
      };
    }
    setIsLoading(false);
  }, [windowWidth, isLoading]);

  /* ПРОВЕРКА АУТЕНТИФИКАЦИИ */

  useEffect(() => {
    setIsAuthChecking(true);
    myApi.getUserInfo()
      .then(res => {
        setCurentUser({
          name: res.data.name,
          email: res.data.email,
          _id: res.data._id
        });
        setIsLoggedIn(true);
      })
      .catch(err => {
        setIsLoggedIn(false);
        console.log(getResponseError('authcheck', err)); //Или вывести сообщением сразу? Подумаем...
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
    if (localData) {
      if (localData.userId !== currentUser._id) {
        localStorage.clear();
        return setLocalData({});
      }
    }
  }, [localData]);

  /* ЕСЛИ ПОЛЬЗОВАТЕЛЬ БЫЛ АВТОРИЗОВАН И ИСПОЛЬЗОВАЛ ФИЛЬТРАЦИЮ - ЗАГРУЖАЕМ ПОСЛЕДНИЕ ЗНАЧЕНИЯ ФИЛЬТРА */

  useEffect(() => {
    if (localData && isFirstStart && beatMovies.length > 0) {
      setIsFirstStart(false);
      setIsShortMovieSelected(localData.shortMovies);
      onFilterMovies(localData);
    }
  }, [isFirstStart, localData, beatMovies]);

  /* РЕГИСТРАЦИЯ */

  const handleSignUp = ({ name, email, password }) => {
    setIsFormSending(true);
    auth.signUp({ name, email, password })
      .then(() => auth.signIn({ email, password })
        .then((res) => {
          setIsLoggedIn(true);
          setCurentUser({ name: res.name, email: res.email });
          history.push('/movies');
          toolTipHandler(false, 'Вы успешно зарегистрировались и авторизовались!');
        })
        .catch(err => toolTipHandler(true, getResponseError('signin', err))))
      .catch(err => toolTipHandler(true, getResponseError('signup', err)))
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
      .catch(err => toolTipHandler(true, getResponseError('signin', err)))
      .finally(() => setIsFormSending(false));
  }

  /* ВЫХОД */

  const handleSignOut = () => {
    auth.signOut()
      .then(() => setIsLoggedIn(false))
      .then(() => localStorage.clear())
      .catch(err => toolTipHandler(true, getResponseError('signout', err)))
      .finally(() => {
        history.push('/');
      })
  }

  /* ЗАГРУЗКА СОХРАНЕННЫХ ФИЛЬМОВ (ТОЛЬКО ДЛЯ АВТОРИЗОВАННЫХ) */

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      myApi.getSavedMovies()
        .then(res => setSavedMovies(res.data))
        .catch(err => console.log(getResponseError('getMovies', err))) //Ошибки в консоль. Это фоновая операция
        .finally(() => setIsLoading(false));
    }
  }, [isLoggedIn]);

  /* СОХРАНЕНИЕ И УДАЛЕНИЕ ФИЛЬМА ИЗ СОХРАНЕННЫХ */

  const handleSaveMovie = (data) => {
    setIsSaving(true);
    myApi.addMovie(data)
      .then(res => setSavedMovies([res.data, ...savedMovies]))
      .catch(err => toolTipHandler(true, getResponseError('saveMovie', err)))
      .finally(() => setIsSaving(false));
  }

  const handleDeleteMovie = (id) => {
    setIsSaving(true);
    myApi.removeMovie(id)
      .then(() => {
        setSavedMovies(movies => movies.filter((movie) => movie._id !== id));
        setFilteredSavedMovies(movies => movies.filter((movie) => movie._id !== id));
      })
      .catch(err => toolTipHandler(true, getResponseError('removeMovie', err)))
      .finally(() => setIsSaving(true));
  }

  /* ОБРАБОТЧИКИ КНОПОК МЕНЮ */

  const handlerBurgerClick = () => {
    setIsSideMenuOpened(true);
  }

  const handleMenuClose = () => {
    setIsSideMenuOpened(false);
  }

  /* ОБРАБОТКА КНОПКИ ЕЩЕ */

  const handleShowMore = () => {
    setCardsOnPage(cardsOnPage + step);
  }

  /* ЗАГРУЗКА КАРТОЧЕК С СЕРВЕРА BEATFILMS */

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      moviesApi.getInitialMovies()
        .then(res => setBeatMovies(res))
        .catch(err => console.log(getResponseError('beatMovies', err))) //Выводим в консоль пока
        .finally(() => setIsLoading(false));
    }
  }, [isLoggedIn]);

  /* ПОИСК */

  const compareStrings = (str, word) => {
    return str.replace(/(ё)/gi, 'е').toLowerCase().includes(word.replace(/(ё)/gi, 'е').toLowerCase());
  }

  const filterMovies = (films, searchWord, short) => {
    if (short) {
      if (searchWord.length !== 0) {
        return films.filter((movie) => compareStrings(movie.nameRU, searchWord) && movie.duration <= 40);
      }
      return films.filter((movie) => movie.duration <= 40);
    }
    return films.filter((movie) => compareStrings(movie.nameRU, searchWord));
  }

  const onFilterMovies = (data) => {
    setIsLoading(true);
    setIsFiltered(true);
    setIsFirstStart(false);
    setFilteredMovies(filterMovies(beatMovies, data.searchWord, data.shortMovies));
    localStorage.setItem('searchMovies', JSON.stringify({
      userId: currentUser._id,
      shortMovies: data.shortMovies,
      searchWord: data.searchWord
    }));
    setLocalData(JSON.parse(localStorage.getItem('searchMovies')));
  }

  const onFilterSavedMovies = (data) => {
    setIsSavedFiltered(true);
    setFilteredSavedMovies(filterMovies(savedMovies, data.searchWord, data.shortMovies));
    //setSavedMovies(filterMovies(savedMovies, data.searchWord, data.shortMovies));
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
        toolTipHandler(false, 'Данные успешно изменены');
        setIsEditProfilePopupOpen(false);
      })
      .catch(err => toolTipHandler(true, getResponseError('updateUser', err)))
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
    setIsInfoTooltipPopupOpen({ ...toolTipParams, opened: false });
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
                movies={isFiltered ? filteredMovies : beatMovies}
                savedMovies={savedMovies}
                isLoading={isLoading}
                isLoggedIn={isLoggedIn}
                isAuthChecking={isAuthChecking}
                isSending={isFormSending}
                onFilter={onFilterMovies}
                shortMovies={isShortMovieSelected}
                setShortMovies={setIsShortMovieSelected}
                localData={localData}
                cardsOnPage={cardsOnPage}
                handleShowMore={handleShowMore}
                isFiltered={isFiltered}
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
              />
              <ProtectedRoute
                path="/saved-movies"
                exact
                component={SavedMovies}
                movies={isSavedFiltered ? filteredSavedMovies : savedMovies}
                isLoading={isLoading}
                isAuthChecking={isAuthChecking}
                isLoggedIn={isLoggedIn}
                isSending={isFormSending}
                onFilter={onFilterSavedMovies}
                shortMovies={isSavedShortMovieSelected}
                setShortMovies={setIsSavedShortMovieSelected}
                handleDeleteMovie={handleDeleteMovie}
                setIsSavedFiltered={setIsSavedFiltered}
                isSavedFiltered={isSavedFiltered}
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
          <InfoToolTip
            isOpened={isInfoTooltipPopupOpen}
            onOverlayClick={handleOverlayClick}
            onClose={closeAllPopups}
          />
        </>)}
    </CurrentUserContext.Provider>
  );
}

export default App;
