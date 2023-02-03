import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { isEmail, isInt, isFloat } from 'validator';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FaEdit, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import * as actions from '../../store/modules/auth/actions';

import axios from '../../services/axios';
import history from '../../services/history';
import { Container, Form } from '../../styles/GlobalStyles';
import { ProfilePicture, Title } from './styled';
import Loading from '../../components/Loading';

export default function Aluno({ match }) {
  const id = get(match, 'params.id', '');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [foto, setFoto] = useState('');
  const [isLoading, setIsloading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line no-useless-return
    if (!id) return;

    async function getData() {
      try {
        setIsloading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const fotos = get(data, 'Fotos[0].url', '');
        setFoto(fotos);

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);

        setIsloading(false);
      } catch (err) {
        setIsloading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) {
          errors.map((error) => toast.error(error));
          history.push('/');
        }
      }
    }
    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = false;

    // Validando os dados
    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 a 255 caracteres');
    }

    if (sobrenome.length < 3 || sobrenome.length > 255) {
      formErrors = true;
      toast.error('Sobrenome deve ter entre 3 a 255 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido');
    }

    if (!isInt(String(idade))) {
      formErrors = true;
      toast.error('Idade inválida');
    }

    if (!isFloat(String(peso))) {
      formErrors = true;
      toast.error('Peso inválido');
    }

    if (!isFloat(String(altura))) {
      formErrors = true;
      toast.error('Altura inválida');
    }

    if (formErrors) return;

    try {
      setIsloading(true);
      if (id) {
        // edit
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        setIsloading(false);
        toast.success('Aluno editado com sucesso!');
      } else {
        // create
        const { data } = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        setIsloading(false);
        toast.success('Aluno criado com sucesso!');
        history.push(`/`);
      }
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }

      if (status === 401) dispatch(actions.loginFailure());
      setIsloading(false);
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <Container>
        <Title>{id ? 'Editar ' : 'Cadastrar novo '}aluno</Title>

        {id && (
          <ProfilePicture>
            {foto ? (
              <img src={foto} alt={nome} crossOrigin="" />
            ) : (
              <FaUserCircle size={180} className="fotoUser" />
            )}
            <Link to={`/fotos/${id}`}>
              <FaEdit size={18} />
            </Link>
          </ProfilePicture>
        )}

        <Form onSubmit={handleSubmit}>
          <label htmlFor="nome">
            Nome:
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome do aluno..."
            />
          </label>

          <label htmlFor="sobrenome">
            Sobrenome:
            <input
              type="text"
              id="sobrenome"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              placeholder="Digite o sobrenome do aluno..."
            />
          </label>

          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite o email do aluno..."
            />
          </label>

          <label htmlFor="idade">
            Idade:
            <input
              type="number"
              id="idade"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              placeholder="Digite a idade do aluno..."
            />
          </label>

          <label htmlFor="peso">
            Peso:
            <input
              type="text"
              id="peso"
              value={peso}
              onChange={(e) => setPeso(e.target.value.replace(',', '.'))}
              placeholder="Digite o peso do aluno..."
            />
          </label>

          <label htmlFor="altura">
            Altura:
            <input
              type="text"
              id="altura"
              value={altura}
              onChange={(e) => setAltura(e.target.value.replace(',', '.'))}
              placeholder="Digite o altura do aluno..."
            />
          </label>

          <button type="submit">
            {id ? 'SALVAR ALTERAÇÕES' : 'CADASTRAR ALUNO'}
          </button>
        </Form>
      </Container>
    </>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
