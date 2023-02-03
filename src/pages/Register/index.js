import React, { useState } from 'react';
import { toast } from 'react-toastify';
import isEmail from 'validator/lib/isEmail';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../services/axios';
import history from '../../services/history';

import { Container, Form } from '../../styles/GlobalStyles';
import { ExcluirConta, Exclamation } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';
import * as colors from '../../config/colors';

export default function Register() {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.auth.user.id);
  const nomeStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.email);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [showExclamation, setShowExclamation] = useState(false);

  const [nome, setNome] = useState(['']);
  const [email, setEmail] = useState(['']);
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    if (!id) return;
    setNome(nomeStored);
    setEmail(emailStored);
  }, [emailStored, id, nomeStored]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 a 255 caracteres.');
    }

    if (!isEmail(String(email))) {
      formErrors = true;
      toast.error('Email inválido.');
    }

    if (!id && (password.length < 6 || password.length > 20)) {
      formErrors = true;
      toast.error('Senha deve ter entre 6 a 20 caracteres.');
    }

    if (formErrors) return;

    dispatch(actions.registerRequest({ nome, email, password, id }));
  };

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    e.currentTarget.remove();
    setShowExclamation(true);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(actions.updateIsLoading(true));
    try {
      await axios.delete(`/users/`);
      dispatch(actions.updateIsLoading(false));
      toast.success('Usuário excluído com sucesso.');
      dispatch(actions.loginFailure());
      history.push('/');
    } catch (err) {
      dispatch(actions.updateIsLoading(false));
      toast.error('Erro ao excluir usuário.');
    }
  };
  return (
    <>
      <Loading isLoading={isLoading} />

      <Container>
        <h1>{id ? 'Editar dados' : 'Crie sua conta'}</h1>

        <Form onSubmit={handleSubmit}>
          <label htmlFor="nome">
            Nome:
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome..."
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email..."
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite uma senha..."
            />
          </label>
          <button type="submit">{id ? 'SALVAR' : 'CADASTRAR'}</button>

          {id && (
            <ExcluirConta>
              <Link to="#" onClick={handleDeleteAsk}>
                <span>Excluir conta</span>
              </Link>
              <Exclamation
                onClick={(e) => handleDelete(e)}
                className={showExclamation ? 'confirm' : 'notConfirm'}
              >
                <span>Tem certeza que deseja excluir esta conta?</span>
                <br />
                <small>
                  A ação não poderá ser desfeita após a confirmação!
                </small>
              </Exclamation>
            </ExcluirConta>
          )}
        </Form>
      </Container>
    </>
  );
}
