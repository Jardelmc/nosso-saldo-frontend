import React, { useCallback } from 'react';

import { Form, Button, Badge } from 'react-bootstrap';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
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
  const handleSubmit = useCallback(async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

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
  }, []);

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
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Senha (mínimo 6 caractéres)"
            id="password"
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
