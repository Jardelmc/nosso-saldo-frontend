import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { Wrapper } from './styles';
import { HeaderComponentUnsigned } from '../../../components/Header';
import { ContainerComponent } from '../../../components/Container';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <HeaderComponentUnsigned />
      <ContainerComponent>{children}</ContainerComponent>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
