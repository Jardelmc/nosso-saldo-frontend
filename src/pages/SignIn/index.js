import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { signInRequest } from '../../store/modules/auth/actions';

import { ContainerComponent } from '../../components/Container';
import { Content } from './styles';

const schema = Yup.object().shape({
  email: Yup.string().required('Campo email é obrigatório'),
  password: Yup.string()
    .min(6, 'Senha incorreta')
    .required('Campo de senha é obrigatório'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const handleSubmit = useCallback(() => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    schema
      .isValid({ email, password })
      .then(() => {
        dispatch(signInRequest(email, password));
      })
      .catch(() => {
        toast.error('Por favor, verifique os campos');
      });
  }, [dispatch]);

  return (
    <>
      {/* <img src={logo} alt="whatsapp-logo" /> */}
      <ContainerComponent>
        <Content>
          <form>
            <input
              name="email"
              type="email"
              placeholder="Seu email"
              id="email"
            />
            <input
              name="password"
              type="password"
              placeholder="Sua senha"
              id="password"
            />

            <button type="button" onClick={() => handleSubmit()}>
              {loading ? 'Carregando...' : 'Acessar'}
            </button>
          </form>
        </Content>
      </ContainerComponent>
    </>
  );
}
