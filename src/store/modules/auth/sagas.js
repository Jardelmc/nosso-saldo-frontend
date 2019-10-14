import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { signInSuccess, signFailure } from './actions';

import api from '../../../services/api';
import history from '../../../services/history';

export function* signIn({ payload }) {
  try {
    const { login, password } = payload;

    const response = yield call(api.post, 'login', { login, password });

    const { token } = response.data;

    if (token) {
      yield put(signInSuccess(token, login));

      history.push('/inicio');
    }
  } catch (error) {
    toast.error('Erro ao fazer login');
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
