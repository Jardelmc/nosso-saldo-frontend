/* eslint-disable no-empty */
/* eslint-disable react/forbid-prop-types */
import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container, Form, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

import api from '../../services/api';

export default function Historic({ match }) {
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
          'border-radius': '5px',
          'padding-top': '5px',
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

        <Container>
          <Table responsive>
            <thead>
              <tr>
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
                      <td>R$ {element.cost}</td>
                      <td>{element.createdBy}</td>
                      <td>{element.date}</td>
                    </tr>

                    <tr style={{ background: '#fff' }}>
                      <td colSpan="3" style={{ borderRadius: '5px' }}>
                        {element.message}
                      </td>
                    </tr>
                    <br />
                    <br />
                  </>
                ))}
            </tbody>
          </Table>
        </Container>
      </div>

      <br />
    </>
  );
}

Historic.propTypes = {
  match: PropTypes.any.isRequired,
};
