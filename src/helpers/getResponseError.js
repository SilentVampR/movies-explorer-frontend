const getResponseError = (type, status) => {
  switch (type) {
    case 'authcheck':
      switch (status) {
        case 400:
          return 'Куки не установлены';
        case 401:
          return 'Для доступа ко всем функциям сайта необходимо войти';
        default:
          return 'Ошибка обработки запроса при проверке авторизации';
      }
    case 'signup':
      switch (status) {
        case 400:
          return 'Одно из полей содержит неверный формат';
        case 409:
          return 'Пользователь с таким E-mail уже существует';
        default:
          return `Ошибка обработки запроса при регистрации. Статус - ${status}`;
      }
    case 'signin':
      switch (status) {
        case 400:
          return 'Одно из полей содержит неверный формат';
        case 401:
          return 'Неверный логин или пароль';
        default:
          return `Ошибка обработки запроса при авторизации. Статус - ${status}`;
      }
    case 'signout':
      switch (status) {
        default:
          return `Ошибка обработки запроса при выходе. Статус - ${status}`;
      }
    case 'saveMovie':
      switch (status) {
        case 400:
          return 'Ошибка сохранения фильма. Одно из полей содержит неверное значение';
        case 409:
          return 'Ошибка сохранения фильма. Фильм с указанным ID уже сохранен для этого пользователя';
        default:
          return `Ошибка обработки запроса при сохранении фильма. Статус - ${status}`;
      }
    case 'removeMovie':
      switch (status) {
        case 400:
          return 'Ошибка удаления фильма. ID фильма имеет неверный формат'
        case 404:
          return 'Ошибка удаления фильма. Фильм с указанным ID не найден';
        case 403:
          return 'Недостаточно прав для выполнения данного действия';
        default:
          return `Ошибка обработки запроса при удалении фильма. Статус - ${status}`;
      }
    case 'getUser':
      switch (status) {
        case 404:
          return 'Запрашиваемый пользователь не найден'
        default:
          return `Ошибка обработки запроса при получении пользовательских данных. Статус - ${status}`;
      }
    case 'updateUser':
      switch (status) {
        case 400:
          return 'Одно из полей содержит неверный формат';
        case 404:
          return 'Запрашиваемый пользователь не найден'
        case 409:
          return 'Пользователь с таким E-mail уже существует';
        default:
          return 'Ошибка обработки запроса при получении пользовательских данных'
      }
    case 'beatMovies':
      return `Ошибка получения фильмов с сервера BeatMovies. Статус - ${status}`;
    case 'getMovies':
      return `Ошибка получения сохраненных фильмов с сервера. Статус - ${status}`;
    default:
      return `Ошибка обработки запроса. Статус - ${status}`;
  }
}

export default getResponseError;
