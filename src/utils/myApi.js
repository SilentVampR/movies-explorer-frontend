import { myApiURL } from './constants';

class MyApi {
  constructor({ apiURL, headers }) {
    this._apiURL = apiURL;
    this._headers = headers;
  }

  _checkResponse(res, text) {
    return res.ok ? res.json() : Promise.reject({ error: text, status: res.status });
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

  addMovie(data) {
    return fetch(this._apiURL + '/movies', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        movieId: data.id,
        thumbnail: data.thumbnail,
        trailer: data.trailer,
        image: data.image,
        description: data.description,
        year: data.year,
        duration: data.duration,
        director: data.direcrot,
        country: data.country,
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
