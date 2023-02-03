import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 10px;
`;

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    object-fit: cover;
  }


  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    bottom: 0;
    color: #fff;
    background: ${colors.primaryColor};
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: all 0.25s;

    &:hover {
      color: ${colors.warningColor};
      background: ${colors.primaryDarkColor};
    }
  }

  .fotoUser {
      color: #fff;
    }
`;
