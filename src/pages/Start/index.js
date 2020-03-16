/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useEffect, useCallback, useState } from 'react';

import { toast } from 'react-toastify';

import {
  Form,
  Container,
  Row,
  Col,
  Badge,
  Button,
  Spinner,
} from 'react-bootstrap';

import api from '../../services/api';
import history from '../../services/history';

export default function Start() {
  document.title = 'Nosso Saldo';

  const [comboFriends, setComboFriends] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [loading, setLoading] = useState(false);

  // Função para carregar o combo de amigos
  const getComboFriends = useCallback(async () => {
    if (comboFriends) {
      return;
    }
    const response = await api.get('balance');

    const { formattedData, empty, err } = response.data;

    if (err) {
      toast.error(err);
      return;
    }

    if (empty) {
      toast.info('Convide algum usuário para iniciar');
      history.push('/usuarios');
    }

    if (formattedData) {
      setComboFriends(formattedData);
    }
  }, [comboFriends]);

  useEffect(() => {
    if (!comboFriends) {
      getComboFriends();
    }
  }, [comboFriends, getComboFriends, selectedFriend]);

  // Função para seleção da combobox
  const handleSelectFriend = useCallback(
    balanceId => {
      if (comboFriends && selectedFriend !== '#') {
        const balanceSelected = comboFriends.find(
          element => element._id === balanceId
        );

        if (balanceSelected) {
          setSelectedFriend(balanceSelected);
        }
      }
    },
    [comboFriends, selectedFriend]
  );

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);

      const cost = document.getElementById('cost').value;
      const message = document.getElementById('message').value;

      if (!Number(cost)) {
        toast.error('O valor precisa ser informado. Exemplo: 5.00');
        setLoading(false);
        return;
      }

      if (Number(cost) < 0) {
        toast.error('Apenas valor positivo é permitido');
        document.getElementById('cost').value = '';
        setLoading(false);
        return;
      }

      if (cost === '') {
        toast.error('O valor precisa ser informado');
        document.getElementById('cost').value = '';
        setLoading(false);
        return;
      }

      if (message === '') {
        toast.error('A mensagem precisa ser informada');
        document.getElementById('message').value = '';
        setLoading(false);
        return;
      }

      const balanceUpdateModel = {
        balanceId: selectedFriend._id,
        movimentation: {
          cost,
          message,
        },
      };

      const response = await api.put('balance/update', balanceUpdateModel);

      const { err } = response.data;

      if (err) {
        setLoading(false);
        toast.error(err);
        return;
      }

      if (response.data.message) {
        setLoading(false);
        toast.success(response.data.message);
        setComboFriends(false);
        setSelectedFriend(false);

        return;
      }

      toast.error('Erro ao salvar transação');

      setLoading(false);
      return;
    } catch (error) {
      toast.error('Erro ao salvar movimentação');
      setLoading(false);
    }
  }, [selectedFriend]);

  const formatValue = useCallback(value => {
    if (value === 0) {
      return `${value},00`;
    }
    if (value) {
      value = String(value);
      value = value.replace('.', ',');
      const splittedValue = value.split(',');

      if (splittedValue.length > 1) {
        const valueReturn =
          splittedValue[1].length === 2
            ? `${splittedValue[0]},${splittedValue[1]}`
            : `${splittedValue[0]},${splittedValue[1]}0`;

        return valueReturn;
      }
      return `${value},00`;
    }

    return false;
  }, []);

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
          <Form.Group controlId="exampleForm.ControlSelect1">
            <h5 style={{ color: '#F8F9FA' }}>Selecione um usuário</h5>
            <Form.Control
              as="select"
              name="balanceCombo"
              id="balanceCombo"
              onChange={e => handleSelectFriend(e.target.value)}
            >
              <option value="#" />
              {comboFriends &&
                comboFriends.map(x => (
                  <option key={x._id} value={x._id}>
                    {x.friendName}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
        </Container>
      </div>

      <br />

      {selectedFriend && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '14vh',
            border: 'solid 1px #ddd',
            borderRadius: '5px',
            background: '#563D7C',
          }}
        >
          <Container>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '8vh',
                border: 'solid 1px #ddd',
                borderRadius: '5px',
              }}
            >
              <Row>
                <Col md sm>
                  {selectedFriend.myBalance > 0 ? (
                    <>
                      <h5
                        style={{
                          color: '#F8F9FA',
                        }}
                      >
                        Seu crédito é de: &emsp;&emsp;
                        <Badge variant="success">
                          {`R$ ${formatValue &&
                            formatValue(selectedFriend.myBalance)}`}
                        </Badge>
                      </h5>
                    </>
                  ) : null}
                  {selectedFriend.myBalance < 0 ? (
                    <>
                      <h5
                        style={{
                          color: '#F8F9FA',
                        }}
                      >
                        Você deve :{' '}
                        <Badge variant="danger">
                          {`R$ ${formatValue &&
                            formatValue(selectedFriend.myBalance)}`}
                        </Badge>
                      </h5>
                    </>
                  ) : null}
                  {selectedFriend.myBalance === 0 ? (
                    <>
                      <h5
                        style={{
                          color: '#F8F9FA',
                        }}
                      >
                        Ninguém deve ninguém :{' '}
                        <Badge variant="secondary">
                          {`R$ ${formatValue &&
                            formatValue(selectedFriend.myBalance)}`}
                        </Badge>
                      </h5>
                    </>
                  ) : null}
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      )}

      <br />

      {/* ######### Área para entrada de custo e mensagem ############3 */}

      {selectedFriend && (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '36vh',
              minHeight: '256px',
              border: 'solid 1px #ddd',
              borderRadius: '5px',
              background: '#563D7C',
            }}
          >
            <Container>
              <div
                style={{
                  height: 'auto',
                  minHeight: '196px',
                  border: 'solid 1px #ddd',
                  borderRadius: '5px',
                }}
              >
                <Container>
                  <br />
                  <Row>
                    <div style={{ display: 'flex' }}>
                      <Col sm={4} xs={7} /* md={100} lg={100} */>
                        <h5 style={{ color: '#f8f9fa' }}>Adicionar crédito</h5>
                      </Col>

                      <Col sm /* xs={5}  */ /*  md={100} lg={100} */>
                        <Form.Control
                          type="number"
                          placeholder="R$ 5,00"
                          id="cost"
                        />
                      </Col>
                    </div>

                    <Col>
                      <br />
                      <h5 style={{ color: '#f8f9fa', marginBottom: '2vh' }}>
                        Mensagem
                      </h5>
                      <Form.Control
                        type="text"
                        placeholder="Cinema do dia tal..."
                        id="message"
                        style={{ height: '12vh' }}
                      />
                    </Col>
                  </Row>
                  <br />
                </Container>
              </div>
            </Container>
          </div>

          <br />

          {!loading ? (
            <Button
              variant="primary"
              size="lg"
              block
              onClick={() => handleSubmit()}
            >
              Salvar
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              block
              onClick={() => alert('Carregando...')}
            >
              <Spinner animation="grow" />
            </Button>
          )}
        </>
      )}
    </>
  );
}
