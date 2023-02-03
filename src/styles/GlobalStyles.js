import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

// PARAMETROS GERAIS
export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    /* background: ${colors.primaryDarkColor}; */
    color: ${colors.primaryColor};
    background-image: linear-gradient(180deg,#2f6ed3 5%,#5095e4 20%,#5095e4 60%,#2f6ed3 95%);
    background-attachment: fixed;
    padding-bottom: 30px;
  }

  html, border-style, #root {
    height: 100%;
  }

  button {
    cursor: pointer;
    background: ${colors.primaryColor};
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 6px;
    transition: all 300ms;

    &:hover {
      background: ${colors.primaryDarkColor};
    }
  }

  a {
    text-decoration: none;
    color: ${colors.primaryColor};

    &:hover {
    }
  }

  ul {
    list-style: none;
  }

  h1 {
    font-size: 1.5em;
  }



`;

// PARAMETROS CONTAINER PRINCIPAL
export const Container = styled.section`
  max-width: 740px;
  width: 90%;
  /* background: #fff; */
  margin: 20px auto;
  padding: 20px;
  /* border-radius: 6px; */
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */

  background: rgba( 255, 255, 255, 0.3 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 6px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
`;

// PARAMETROS FORMULÁRIOS
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 12px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
  }

  input {
    margin-top: 2px;
    height: 36px;
    padding: 0 10px;
    font-size: 0.9em;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    border-radius: 6px;
    background: rgba( 255, 255, 255, 0.4 );

    &:focus {
      border: 2px solid rgba( 255, 255, 255, 0.5 );
      background: rgba( 255, 255, 255, 0.7 );
    }

    &::placeholder {
      color: rgba( 0, 0, 0, 0.25 );
    }
  }

  button {
    margin-top: 10px;
  }

`;
