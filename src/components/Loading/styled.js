import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Container1 = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: rgba(0,0,0,0.8);

  .c-loader {
    animation: is-rotating 1s infinite;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    border: 6px solid #e5e5e5;
    /* border-image: linear-gradient(to right, red, yellow, green) 1; */
    border-top-color: ${colors.warningColor};
  }

  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }

  span {
    font-size: 1.2em;
    z-index: 2;
  }
`;
