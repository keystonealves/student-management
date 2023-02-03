import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
  FaPlus,
} from 'react-icons/fa';

import { toast } from 'react-toastify';
import * as colors from '../../config/colors';
import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import {
  AlunoContainer,
  ProfilePicture,
  NovoAluno,
  TitleAndButton,
} from './styled';
import history from '../../services/history';

import Loading from '../../components/Loading';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunos');
      setAlunos(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    e.persist();

    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);
      setIsLoading(false);
      toast.success('Aluno excluído com sucesso!');
    } catch (err) {
      const status = get(err, 'response.status', []);
      if (status === 401) {
        setIsLoading(false);
        toast.error('O usuário precisa estar logado!');
      } else {
        setIsLoading(false);
        toast.error('Ops, ocorreu um erro ao tentar excluir o aluno!');
      }
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <Container>
        <TitleAndButton>
          <h1>Alunos</h1>

          <NovoAluno to="/aluno/">
            <FaPlus />
            <span>Novo Aluno</span>
          </NovoAluno>
        </TitleAndButton>

        <AlunoContainer>
          <table>
            <tbody>
              <tr>
                <th> </th>
                <th align="left">Nome</th>
                <th align="left">Email</th>
                <th align="left"> </th>
                <th align="left"> </th>
              </tr>

              {alunos.map((aluno, index) => (
                <tr key={String(aluno.id)}>
                  {/* Foto do Perfil */}
                  <td width="12%" align="center" className="fotoUsers">
                    <ProfilePicture>
                      {get(aluno, 'Fotos[0].url', false) ? (
                        <img crossOrigin="" src={aluno.Fotos[0].url} alt="" />
                      ) : (
                        <FaUserCircle size={45} className="fotoUser" />
                      )}
                    </ProfilePicture>
                  </td>

                  {/* Nome do Aluno */}
                  <td width="23%" className="tdNome">
                    <span>{aluno.nome}</span>
                  </td>

                  {/* Email do Aluno */}
                  <td width="45%" className="tdEmail">
                    <span>{aluno.email}</span>
                  </td>

                  {/* Ações de Edit e Delete */}
                  <td width="5%" align="center" className="icons">
                    <Link to={`/aluno/${aluno.id}/edit`}>
                      <FaEdit size={16} className="iconActions edit" />
                    </Link>
                  </td>

                  <td width="5%" align="center" className="icons">
                    <Link
                      onClick={handleDeleteAsk}
                      to={`/aluno/${aluno.id}/delete`}
                    >
                      <FaWindowClose size={16} className="iconActions delete" />
                    </Link>
                    <FaExclamation
                      onClick={(e) => handleDelete(e, aluno.id, index)}
                      size={16}
                      display="none"
                      cursor="pointer"
                      color={colors.primaryColorRed}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AlunoContainer>
      </Container>
    </>
  );
}
