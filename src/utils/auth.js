import { myApiURL } from './constants';

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.status);
}

export const signUp = ({ name, email, password }) => {
  return fetch(`${myApiURL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })
    .then(checkResponse)
};

export const signIn = ({ email, password }) => {
  return fetch(`${myApiURL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(checkResponse)
};

/*export const getUserData = () => {
  return fetch(`${myApiURL}/users/me`, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
    .then(checkResponse)
}*/

export const signOut = () => {
  return fetch(`${myApiURL}/signout`, {
    credentials: 'include',
    method: 'GET',
  })
    .then(checkResponse)
}
