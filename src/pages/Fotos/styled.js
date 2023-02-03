import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Title = styled.h1`
  text-align: center;
`;

export const Form1 = styled.form`
  label {
    width: 180px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;
    outline: 4px dashed ${colors.primaryColor};
    margin: 30px auto;
    cursor: pointer;
    border-radius: 50%;

    img {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      object-fit: cover;
    }

  }
  input {
    display: none;
  }
`;
