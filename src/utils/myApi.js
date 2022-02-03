import { myApiURL, urlPattern, beatFilmApiURL } from './constants';

class MyApi {
  constructor({ apiURL, headers }) {
    this._apiURL = apiURL;
    this._headers = headers;
  }

  _checkResponse(res, text) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  getUserInfo() {
    return fetch(`${this._apiURL}/users/me`, {
      credentials: 'include',
      method: 'GET',
      headers: this._headers
    })
      .then(res => {
        return this._checkResponse(res, 'Ошибка получения информации о пользователе с сервера');
      })
  }

  editUserInfo(data) {
    return fetch(this._apiURL + '/users/me', {
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        email: data.email
      }),
      headers: this._headers
    })
      .then(res => {
        return this._checkResponse(res, 'Ошибка изменения информации пользователя');
      })
  }

  getSavedMovies() {
    return fetch(`${this._apiURL}/movies`, {
      credentials: 'include',
      method: 'GET',
      headers: this._headers
    })
      .then(res => {
        return this._checkResponse(res, 'Ошибка получения информации о пользователе с сервера');
      })
  }

  addMovie(data) {
    const trailerLink = urlPattern.test(data.trailerLink) ? data.trailerLink : 'https://youtu.be/dQw4w9WgXcQ';
    const thumbnailUrl = beatFilmApiURL + data.image.formats.thumbnail.url;
    const imageUrl = beatFilmApiURL + data.image.url;
    return fetch(this._apiURL + '/movies', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({
        nameRU: data.nameRU,
        nameEN: data.nameEN ? data.nameEN : data.nameRU,
        movieId: data.id,
        thumbnail: thumbnailUrl,
        trailer: trailerLink,
        image: imageUrl,
        description: data.description,
        year: data.year,
        duration: data.duration,
        director: data.director,
        country: data.country ? data.country : 'Не указана',
      }),
      headers: this._headers
    })
      .then(res => {
        return this._checkResponse(res, 'Ошибка добавления фильма');
      })
  }

  removeMovie(id) {
    return fetch(this._apiURL + '/movies/' + id, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        return this._checkResponse(res, 'Ошибка удаления фильма с сервера');
      })
  }
}

const myApi = new MyApi({
  apiURL: myApiURL, headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

export default myApi;
