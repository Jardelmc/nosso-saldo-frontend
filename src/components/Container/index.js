/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export function ContainerComponent({ children }) {
  return <Container>{children}</Container>;
}

ContainerComponent.propTypes = {
  children: PropTypes.any.isRequired,
};
