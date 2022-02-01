import React from 'react';
import './SignIn.css';
import Form from '../Form/Form';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function SignIn({ isSending, onSignIn }) {
  const { values, errors, isValid, handleOnChange } = useFormWithValidation();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSignIn(values);
  }

  const fieldsList = [
    {
      id: 1,
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
      required: true
    },
    {
      id: 2,
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
      required: true
    }
  ];
  const textsList = {
    title: 'Рады видеть!',
    button: isSending ? 'Обработка...' : 'Войти',
    footerText: 'Еще не зарегистрированы?',
    linkTo: '/signup',
    linkText: 'Регистрация'
  }
  return (
    <section className="signin">
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

export default SignIn;
