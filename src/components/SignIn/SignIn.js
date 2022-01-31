import React, { useState } from 'react';
import './SignIn.css';
import Form from '../Form/Form';


function SignIn({ isSending, onSignIn }) {
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;
    onSignIn({ email, password });
  }

  const fieldsList = [
    {
      id: 1,
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
      id: 2,
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
    title: 'Рады видеть!',
    button: 'Войти',
    footerText: 'Еще не зарегистрированы?',
    linkTo: '/signup',
    linkText: 'Регистрация'
  }
  return (
    <section className="signin">
      <Form fieldsList={fieldsList} isSending={isSending} textsList={textsList} onSubmit={handleSubmit} />
    </section>
  );
}

export default SignIn;
