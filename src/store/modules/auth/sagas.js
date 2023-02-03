import { call, put, all, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);
    toast.success('Usuário logado com sucesso!');
  } catch (e) {
    yield put(actions.loginFailure());
    toast.error('O usuário precisa estar logado!');
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const { id, nome, email, password } = payload;

  try {
    if (id) {
      if (password.length > 0) {
        yield call(axios.put, '/users', {
          email,
          nome,
          password,
        });
        yield put(actions.registerUpdatedSuccess({ nome, email, password }));
        toast.success('Dados alterados com sucesso!');
      } else {
        yield call(axios.put, '/users', {
          email,
          nome,
        });
        yield put(actions.registerUpdatedSuccess({ nome, email, password }));
        toast.success('Dados alterados com sucesso!');
      }
    } else {
      yield call(axios.post, '/users', {
        email,
        nome,
        password,
      });
      yield put(actions.registerCreatedSuccess({ nome, email, password }));
      history.push('/login');
      toast.success('Cadastro realizado com sucesso!');
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      yield put(actions.loginFailure());
      toast.error('Você precisar fazer login novamente.');
      return history.push('/login');
    }

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
