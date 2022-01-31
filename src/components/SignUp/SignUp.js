import React, { useState } from 'react';
import './SignUp.css';
import Form from '../Form/Form';

function SignUp({ isSending, onSignUp }) {
  const [data, setData] = useState({
    email: '',
    password: '',
    error: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    onSignUp({ name, email, password });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  const fieldsList = [
    {
      id: 1,
      name: 'name',
      text: 'Имя',
      type: 'text',
      handle: handleChange,
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
      handle: handleChange,
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
      handle: handleChange,
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
      <Form fieldsList={fieldsList} isSending={isSending} textsList={textsList} onSubmit={handleSubmit} />
    </section>
  );
}

export default SignUp;
