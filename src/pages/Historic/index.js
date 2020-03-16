/* eslint-disable consistent-return */
/* eslint-disable no-empty */
/* eslint-disable react/forbid-prop-types */
import React, { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Form, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Scroll } from './styles';

import api from '../../services/api';

export default function Historic({ match }) {
  document.title = 'Nosso Saldo';

  const { email } = useSelector(state => state.auth);

  const [comboFriends, setComboFriends] = useState(false);
  const [historicData, setHistoricData] = useState(false);

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
    }

    if (formattedData) {
      setComboFriends(formattedData);
    }
  }, [comboFriends]);

  // Função para seleção da combobox

  const getHistoricData = useCallback(async balanceId => {
    if (balanceId === '#') {
      return;
    }
    if (balanceId) {
      const response = await api.get(`balance/historic/${balanceId}`);

      if (response) {
        const { err, payload } = response.data;

        if (err) {
          toast.info(err);
          return;
        }

        if (payload) {
          setHistoricData(payload);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!comboFriends) {
      getComboFriends();
    }
  }, [comboFriends, getComboFriends]);

  useEffect(() => {
    const { balanceId } = match.params;

    if (balanceId) {
      getHistoricData(balanceId);
    }
  });

  const formatName = useCallback(name => {
    if (name) {
      const formattedName = name.split(' ')[0];

      return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
    }
  }, []);

  const colorOfCoastLabel = useCallback(
    ownerBalanceEmail => {
      if (ownerBalanceEmail && email) {
        if (ownerBalanceEmail === email) {
          return '#5cb85c';
        }
        return '#d9534f';
      }
      return '#292b2c';
    },
    [email]
  );

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
              onChange={e => getHistoricData(e.target.value)}
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

        <br />
      </div>

      <Scroll>
        <Table responsive bordered striped>
          <thead>
            <tr
              style={{
                color: '#fff',
                tableLayout: 'fixed',
                background: '#563D7C',
              }}
            >
              <th>Valor</th>
              <th>Criado por</th>
              <th>Data</th>
            </tr>
          </thead>

          <tbody>
            {historicData &&
              historicData.map(element => (
                <>
                  <tr>
                    <td>
                      <strong
                        style={{
                          color: `${colorOfCoastLabel(element.createdByEmail)}`,
                        }}
                      >
                        R$ {element.cost}
                      </strong>
                    </td>
                    <td>{formatName(element.createdBy)}</td>
                    <td>{element.date}</td>
                  </tr>

                  <tr style={{ background: '#fff' }}>
                    <td colSpan="3" style={{ borderRadius: '5px' }}>
                      <strong style={{ color: '#563D7C' }}>Mensagem:</strong>
                      <br />
                      {element.message}
                    </td>
                  </tr>

                  <tr>
                    <div
                      style={{
                        height: '3px',
                        background: `${colorOfCoastLabel(
                          element.createdByEmail
                        )}`,
                      }}
                    />
                  </tr>
                  <tr>
                    <div
                      style={{
                        height: '3px',
                        background: `${colorOfCoastLabel(
                          element.createdByEmail
                        )}`,
                      }}
                    />
                  </tr>
                </>
              ))}
          </tbody>
        </Table>
      </Scroll>
    </>
  );
}

Historic.propTypes = {
  match: PropTypes.any.isRequired,
};
