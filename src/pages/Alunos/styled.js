import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as colors from '../../config/colors';

export const AlunoContainer = styled.div`
  margin-top: 20px;
  color: #cccccc;
  overflow-x: auto;

  span {
    color: ${colors.primaryColor};
  }

  table {
    width: 100%;
    color: ${colors.primaryDarkColor};

    & th {
      font-weight: 500;
      font-style: italic;
    }

    & th, td {
      vertical-align: middle;
      padding: 5px 10px 0px;
    }

    & td {
      border-top: 1px solid rgba(255,255,255,0.3)
    }

    & .tdNome {
      font-weight: 600;
      padding-top: 0px;
    }

    & .tdEmail {
      padding-top: 0px;
    }


    & .fotoUser {
      color: #fff;
    }

    & .iconActions{
      transition: 300ms;
    }

    & .edit:hover{
      color: ${colors.primaryDarkColor};
      transform: scale(1.2);
    }

    & .delete:hover{
      color: ${colors.primaryColorRed};
      transform: scale(1.2);
    }
  }


`;

export const ProfilePicture = styled.div`
  img {
      width: 45px;
      height: 45px;
      object-fit: cover;
      border-radius: 50%;
  }
`;

export const TitleAndButton = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const NovoAluno = styled(Link)`
  text-decoration: none;
  color: ${colors.primaryDarkColor};
  font-size: 0.8em;
  outline: 1px solid ${colors.primaryDarkColor} ;
  /* border: 1px solid ${colors.primaryDarkColor}; */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 15px;
  border-radius: 6px;
  transition: all 0.3s;
  font-weight: 400;

  &:hover {
    outline: none;
    background: ${colors.primaryDarkColor};
    color: #fff;
  }
`;
