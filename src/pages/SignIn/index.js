import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { Form, Button, Badge, Spinner } from 'react-bootstrap';
import { signInRequest } from '../../store/modules/auth/actions';

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
      <br />
      <h2>Login</h2>
      <h5>
        Nosso-saldo{' '}
        <Badge pill variant="info">
          beta
        </Badge>
      </h5>
      <br />
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Seu email" id="email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Senha (mínimo 6 caractéres)"
            id="password"
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Manter conectado" id="permanent" />
        </Form.Group>
        <br />
        {!loading ? (
          <Button
            variant="primary"
            type="button"
            size="lg"
            block
            onClick={() => handleSubmit()}
          >
            Login
          </Button>
        ) : (
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Aguarde...
          </Button>
        )}
      </Form>
    </>
  );
}
