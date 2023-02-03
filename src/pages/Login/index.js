import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import isEmail from 'validator/lib/isEmail';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { FaPlus } from 'react-icons/fa';

import { Container, Form } from '../../styles/GlobalStyles';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';
import { EsqueceuSenha, TitleAndButton, CadastreSe } from './styled';

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');

  const isLoading = useSelector((state) => state.auth.isLoading);

  const [email, setEmail] = useState(['']);
  const [password, setPassword] = useState(['']);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = false;

    if (!isEmail(String(email))) {
      formErrors = true;
      toast.error('Email inválido!');
    }

    if (password.length < 6 || password.length > 20) {
      formErrors = true;
      toast.error('Senha inválida!');
    }

    if (formErrors) return;

    dispatch(actions.loginRequest({ email, password, prevPath }));
  };

  return (
    <>
      <Loading isLoading={isLoading} />

      <Container>
        <TitleAndButton>
          <h1>Login</h1>

          <CadastreSe to="/register">
            <FaPlus />
            <span>Crie uma nova conta</span>
          </CadastreSe>
        </TitleAndButton>

        <Form onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
            />
          </label>

          <label htmlFor="password">
            Senha:
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha..."
            />
          </label>

          <button type="submit">ENTRAR</button>

          <Link to="#">
            <EsqueceuSenha>
              <span>Esqueceu sua senha?</span>
            </EsqueceuSenha>
          </Link>
        </Form>
      </Container>
    </>
  );
}
