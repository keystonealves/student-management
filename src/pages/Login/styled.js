import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as colors from '../../config/colors';

export const EsqueceuSenha = styled.div`
 margin-top: 15px;
`;

export const TitleAndButton = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CadastreSe = styled(Link)`
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
