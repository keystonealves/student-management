import React from 'react';
import { Container } from '../../styles/GlobalStyles';
import { Title, Paragrafo } from './styled';

export default function Page404() {
  return (
    <Container>
      <Title>404</Title>
      <Paragrafo>Página não encontrada</Paragrafo>
    </Container>
  );
}
