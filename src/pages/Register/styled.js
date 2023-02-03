import styled from 'styled-components';
import * as colors from '../../config/colors';

export const ExcluirConta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 18px;

  a {
    color: ${colors.primaryDarkColor};
    transition: all 0.25s;

    &:hover {
      color: ${colors.primaryColorRed};
      font-size: 1.2em;
    }
  }

  .notConfirm {
    display: none;
  }

  .confirm {
    border: 1px solid ${colors.primaryColorRed};
    border-radius: 6px;
    padding: 3px 30px;
    display: block;
    color: ${colors.primaryColorRed};
    font-size: 1em;
    font-weight: 500;
    cursor: pointer;
    background: rgba(255,255,255,0.3);

    & small {
      font-size: 0.9em;
      color: ${colors.primaryDarkColor};
      font-weight: 300;
    }
  }
`;

export const Exclamation = styled.div`
`;
