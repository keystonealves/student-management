import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import * as actions from '../../store/modules/auth/actions';
import { Container, Form } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading/index';
import { Title, Form1 } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';

export default function Fotos({ match }) {
  const id = get(match, 'params.id', '');
  const [isLoading, setIsloading] = useState(false);
  const [foto, setFoto] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        setIsloading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const fotos = get(data, 'Fotos[0].url', '');
        setFoto(fotos);
        setIsloading(false);
      } catch (err) {
        setIsloading(false);
        history.push('/');
        toast.error('Erro ao obter imagem');
      }
    };
    getData();
  }, [id]);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fotoURL = URL.createObjectURL(file);
    setFoto(fotoURL);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', file);

    try {
      setIsloading(true);
      await axios.post('/fotos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Foto enviada com sucesso!');
      setIsloading(false);
    } catch (err) {
      const { status } = get(err, 'response', '');
      toast.error('Erro ao enviar a foto.');

      if (status === 401) dispatchEvent(actions.loginFailure());
      setIsloading(false);
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />

      <Container>
        <Title>Fotos</Title>

        <Form1>
          <label htmlFor="foto">
            {foto ? <img src={foto} alt="Foto" crossOrigin="" /> : 'Selecionar'}
            <input type="file" id="foto" onChange={handleChange} />
          </label>
        </Form1>
      </Container>
    </>
  );
}

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
