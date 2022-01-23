import { beatFilmApiURL } from './constants';

class Api {
  constructor({apiURL, headers}){
    this._apiURL = apiURL;
    this._headers = headers;
  }

  _checkResponse(res, text) {
    if(res.ok){
      return res.json();
    }
    return Promise.reject(`${text} - ${res.status}`);
  }

  getInitialFilms() {
    return fetch(this._apiURL + '/beatfilm-movies', {
      headers: this._headers
    })
      .then(res => {
        return this._checkResponse(res, 'Ошибка получения фильмов с сервера');
      })
  }
}
const api = new Api({ apiURL:beatFilmApiURL, headers: {
  'Content-Type': 'application/json; charset=UTF-8'
} });
export default api;
