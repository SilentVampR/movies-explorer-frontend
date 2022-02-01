import React, { useState } from 'react';
import './SignUp.css';
import Form from '../Form/Form';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function SignUp({ isSending, onSignUp }) {
  const { values, errors, isValid, handleOnChange } = useFormWithValidation();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSignUp(values);
  }

  const fieldsList = [
    {
      id: 1,
      name: 'name',
      text: 'Имя',
      type: 'text',
      handle: handleOnChange,
      params: [
        {
          name: 'maxLength',
          parametr: 20,
        },
        {
          name: 'minLength',
          parametr: 2,
        },
        {
          name: 'pattern',
          parametr: '[a-zA-Zа-яА-Я -]{1,}'
        }
      ],
      required: true,
    },
    {
      id: 2,
      name: 'email',
      text: 'E-mail',
      type: 'email',
      handle: handleOnChange,
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
      handle: handleOnChange,
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
    button: isSending ? 'Отправляется...' : 'Зарегистрироваться',
    footerText: 'Уже зарегистрированы?',
    linkTo: '/signin',
    linkText: 'Войти'
  }

  return (
    <section className="signup">
      <Form
        fieldsList={fieldsList}
        isDisabled={isSending || !isValid}
        textsList={textsList}
        onSubmit={handleOnSubmit}
        isValid={isValid}
        errors={errors}
      />
    </section>
  );
}

export default SignUp;
