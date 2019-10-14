import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';

import logo from '../../assets/instagram.svg';

const schema = Yup.object().shape({
  login: Yup.number()
    .min(11, 'Modelo: 00999999999  DDD+Celular')
    .required(),
  password: Yup.string().required('Campo de senha é obrigatório'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ login, password }) {
    dispatch(signInRequest(String(login), password));
  }

  return (
    <>
      {/* <img src={logo} alt="whatsapp-logo" /> */}

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input
          name="login"
          type="number"
          placeholder="Seu celular com DDD sem o zero"
        />
        <Input name="password" type="password" placeholder="Sua senha" />

        <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
      </Form>
    </>
  );
}
