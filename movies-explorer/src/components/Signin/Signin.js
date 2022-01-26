import React, { useState } from 'react';
import './SignIn.css';
import Form from '../Form/Form';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(`${email} - ${password}`); //Вместо этого потом отправляем запрос в API

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
      id: 2,
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
    title: 'Рады видеть!',
    button: 'Войти',
    footerText: 'Еще не зарегистрированы?',
    linkTo: '/signup',
    linkText: 'Регистрация'
  }
  return (
    <section className="signin">
      <Form fieldsList={fieldsList} textsList={textsList} onSubmit={handleOnSubmit} />
    </section>
  );
}

export default SignIn;
