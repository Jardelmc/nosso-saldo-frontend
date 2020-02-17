/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useEffect, useCallback, useState } from 'react';

import { toast } from 'react-toastify';
import { Container, DivBalance } from './styles';
import api from '../../services/api';
import history from '../../services/history';

export default function Start() {
  const [comboFriends, setComboFriends] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(false);

  // Função para carregar o combo de amigos
  const getComboFriends = useCallback(async () => {
    const response = await api.get('balance');

    const { formattedData, empty, err } = response.data;

    if (err) {
      toast.error(err);
      return;
    }

    if (empty) {
      toast.info('Convide algum usuário para iniciar');
      history.push('/convidar');
      return;
    }

    if (formattedData) {
      setComboFriends(formattedData);
    }
  }, []);

  useEffect(() => {
    getComboFriends();
  }, [getComboFriends]);

  const handleSelectFriend = useCallback(
    balanceId => {
      if (comboFriends) {
        const balanceSelected = comboFriends.find(
          element => element._id === balanceId
        );

        if (balanceSelected) {
          setSelectedFriend(balanceSelected);
        }
      }
    },
    [comboFriends]
  );

  return (
    <Container>
      {comboFriends && (
        <>
          <label htmlFor="balanceCombo">Selecione o usuário</label>
          <select
            name="balanceCombo"
            id="balanceCombo"
            onChange={e => handleSelectFriend(e.target.value)}
            value={selectedFriend}
          >
            {comboFriends.map(x => (
              <option key={x._id} value={x._id}>
                {x.friendName}
              </option>
            ))}
          </select>
        </>
      )}

      {selectedFriend && (
        <DivBalance>
          <span>Você deve {selectedFriend.friendName}</span>

          <div>
            {console.tron.log(selectedFriend)}
            <span>{selectedFriend.myBalance}</span>
          </div>
        </DivBalance>
      )}
    </Container>
  );
}
