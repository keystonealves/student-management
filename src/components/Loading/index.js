import React from 'react';
import PropTypes from 'prop-types';
import { Container1 } from './styled';

export default function Loading({ isLoading }) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!isLoading) return <></>;

  return (
    <Container1>
      <div className="c-loader" />
      <span>Carregando</span>
    </Container1>
  );
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
