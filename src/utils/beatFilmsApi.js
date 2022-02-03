import { beatFilmApiURL } from './constants';

class Api {
  constructor({apiURL, headers}){
    this._apiURL = apiURL;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  getInitialMovies() {
    return fetch(this._apiURL + '/beatfilm-movies', {
      headers: this._headers
    })
      .then(res => {
        return this._checkResponse(res);
      })
  }

  getSaved
}
const moviesApi = new Api({ apiURL:beatFilmApiURL, headers: {
  'Content-Type': 'application/json; charset=UTF-8'
} });
export default moviesApi;
