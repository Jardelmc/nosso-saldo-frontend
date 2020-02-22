import React, { useCallback, useState, useEffect } from 'react';

import { Container, Form, Button, Spinner, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';

export default function Users() {
  const [solicitations, setSolicitations] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInvite = useCallback(async () => {
    const email = document.getElementById('email').value;

    if (email === '') {
      toast.error('Entre com um email válido');
      return;
    }

    setLoading(true);

    const response = await api.post('friendRequest/add', {
      emailToInvite: email,
    });

    const { err, message } = response.data;

    if (err) {
      toast.error(err);
      setLoading(false);
      return;
    }

    if (message) {
      toast.success(message);
      setLoading(false);
      document.getElementById('email').value = '';
      return;
    }
    toast.error('Erro ao convidar usuário');

    setLoading(false);
  }, []);

  const getSolicitations = useCallback(async () => {
    try {
      const response = await api.get('friendRequest/get');

      const { payload, err } = response.data;

      if (err) {
        toast.error(err);
        return;
      }

      if (payload) {
        setSolicitations(payload);
      }
    } catch (error) {
      toast.error('Não foi possível atualizar solicitações');
    }
  }, []);

  const handleActionAboutInvite = useCallback(async (emailInvied, option) => {
    let response;
    if (option === 'accept') {
      response = await api.put('friendRequest/update', {
        emailAccepted: emailInvied,
      });

      if (response) {
        const { message, err } = response.data;

        if (err) {
          toast.error(err);
        }

        if (message) {
          toast.success(message);
          const node = document.getElementById(emailInvied);
          const actions = document.getElementById(`${emailInvied}-actions`);
          if (node.parentNode) {
            node.parentNode.removeChild(node);
            actions.parentNode.removeChild(actions);
          }
        }
      }
    }

    if (option === 'recuse') {
      response = await api.put('friendRequest/update', {
        emailRejected: emailInvied,
      });

      if (response) {
        const { message, err } = response.data;

        if (err) {
          toast.error(err);
        }

        if (message) {
          toast.success(message);
          const node = document.getElementById(emailInvied);
          const actions = document.getElementById(`${emailInvied}-actions`);
          if (node.parentNode) {
            node.parentNode.removeChild(node);
            actions.parentNode.removeChild(actions);
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    getSolicitations();
  });

  return (
    <>
      <br />
      <div
        style={{
          width: '100%',
          maxWidth: '512px',
          height: '24vw',
          maxHeight: '112px',
          background: '#563D7C',
          border: 'solid 1px #ddd',
          borderRadius: '5px',
          paddingTop: '5px',
        }}
      >
        <Container>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{ color: '#F8F9FA' }}>
              Convidar usuário pelo e-mail
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Email do usuário"
              id="email"
            />
          </Form.Group>
          <br />
          {!loading ? (
            <Button variant="success" onClick={() => handleInvite()} block>
              Convidar
            </Button>
          ) : (
            <Button variant="success">
              {' '}
              <Spinner animation="grow" />
            </Button>
          )}
        </Container>

        <br />
        <br />

        {solicitations && (
          <Table striped bordered hover responsive size="sm">
            <thead style={{ background: '#563D7C', borderRadius: '5px' }}>
              <th style={{ color: '#F8F9FA' }}>Nome</th>
              <th style={{ color: '#F8F9FA' }}>Email</th>
            </thead>

            <tbody>
              {solicitations &&
                solicitations.map(element => (
                  <>
                    <tr id={element.email}>
                      <td>
                        <strong>{element.name}</strong>
                      </td>
                      <td>{element.email}</td>
                    </tr>

                    <tr id={`${element.email}-actions`}>
                      <td colSpan="2">
                        <Button
                          variant="success"
                          block
                          size="sm"
                          onClick={() =>
                            handleActionAboutInvite(element.email, 'accept')
                          }
                        >
                          Aceitar
                        </Button>

                        <Button
                          variant="danger"
                          block
                          size="sm"
                          onClick={() =>
                            handleActionAboutInvite(element.email, 'reject')
                          }
                        >
                          Recusar
                        </Button>
                      </td>
                    </tr>
                  </>
                ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
}
