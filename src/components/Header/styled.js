import styled from 'styled-components';
// import { Link } from 'react-router-dom';
import * as colors from '../../config/colors';

export const Nav = styled.nav`
  height: 60px;
  background: ${colors.primaryDarkColor};
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  a {
    display: flex;
    align-items: center;
    color: #fff;
    margin: 0 20px 0 0;
    font-weight: 500;
  }

  a:hover {
    fill-opacity: 0.5;
    transition: 0.2s;
  }

    & p {
      border: 1px solid rgba(255,255,255,0.3);
      padding: 5px 10px;
      border-radius: 6px;
      font-size: 0.8em;

      & span {
      color: ${colors.warningColor};
    }
  }
`;

export const Footer = styled.footer`
  background-color: rgba(0,0,0,0.6);
  color: rgba(255,255,255,0.6);
  text-align: center;
  padding: 10px;
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: 0.8em;
  margin-top: 10px;
  z-index: 99999;

  & span {
    color: ${colors.warningColor}
  }
`;
