import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Form, Button, Badge } from 'react-bootstrap';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { signInRequest } from '../../store/modules/auth/actions';

import api from '../../services/api';

const schema = Yup.object({
  name: Yup.string()
    .min(2)
    .required(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6)
    .required(),
});

export default function SignUp() {
  document.title = 'Nosso Saldo';

  const dispatch = useDispatch();

  const handleSubmit = useCallback(async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    if (password !== passwordConfirm) {
      toast.error('As senhas não são iguais');
      document.getElementById('password').value = '';
      document.getElementById('passwordConfirm').value = '';
      return;
    }

    const apiCall = {
      async create() {
        const response = await api.post('user/create', {
          name,
          email,
          password,
        });

        if (response.status === 200) {
          const { message, err } = (await response).data;

          if (message) {
            toast.success(message);
            dispatch(signInRequest(email, password));
            return;
          }
          if (err) {
            toast.error(err);
          }
        }
      },
    };

    schema
      .isValid({ name, email, password })
      .then(valid =>
        valid
          ? apiCall.create()
          : toast.error(
              'Informe um e-mail válido e uma senha de mínimo 6 dígitos'
            )
      )
      .catch(() =>
        toast.error('Informe um e-mail válido e uma senha de mínimo 6 dígitos')
      );
  }, [dispatch]);

  return (
    <>
      <br />
      <h2>Novo cadastro</h2>
      <h5>
        Nosso-saldo{' '}
        <Badge pill variant="info">
          beta
        </Badge>
      </h5>
      <br />
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" placeholder="Seu nome" id="name" />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Seu email" id="email" />
          <Form.Text className="text-muted">
            Nunca compartilharemos seu e-mail com ninguém!.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Senha (mínimo 6 caractéres)"
            id="password"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Repia a Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repita a senha para confirmar"
            id="passwordConfirm"
          />
        </Form.Group>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Aceito os termos"
            onClick={() => alert('uauhahuauh que termos?')}
          />
        </Form.Group>
        <br />
        <Button
          variant="primary"
          type="button"
          size="lg"
          block
          onClick={() => handleSubmit()}
        >
          Cadastrar
        </Button>
      </Form>
    </>
  );
}
