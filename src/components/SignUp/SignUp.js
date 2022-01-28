import React, { useState } from 'react';
import './SignUp.css';
import Form from '../Form/Form';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(`${name} - ${email} - ${password}`); //Вместо этого потом отправляем запрос в API

  }

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const fieldsList = [
    {
      id: 1,
      name: 'name',
      text: 'Имя',
      type: 'text',
      handle: handleChangeName,
      params: [
        {
          name: 'maxLength',
          parametr: 20,
        },
        {
          name: 'minLength',
          parametr: 2,
        },
      ],
      required: true,
    },
    {
      id: 2,
      name: 'email',
      text: 'E-mail',
      type: 'email',
      handle: handleChangeEmail,
      params: [
        {
          name: 'minLength',
          parametr: 2,
        },
      ],
      required: true,
    },
    {
      id: 3,
      name: 'password',
      text: 'Пароль',
      type: 'password',
      handle: handleChangePassword,
      params: [
        {
          name: 'minLength',
          parametr: 2,
        },
      ],
      required: true,
    }
  ];
  const textsList = {
    title: 'Добро пожаловать!',
    button: 'Зарегистрироваться',
    footerText: 'Уже зарегистрированы?',
    linkTo: '/signin',
    linkText: 'Войти'
  }

  return (
    <section className="signup">
      <Form fieldsList={fieldsList} textsList={textsList} onSubmit={handleOnSubmit} />
    </section>
  );
}

export default SignUp;
