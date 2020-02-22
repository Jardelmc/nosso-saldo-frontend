import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { Wrapper, MasterResponsive, Responsive } from './styles';
import { HeaderComponentSigned } from '../../../components/Header';
import { ContainerComponent } from '../../../components/Container';

export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <HeaderComponentSigned />
      <MasterResponsive>
        <Responsive>
          <ContainerComponent>{children}</ContainerComponent>
        </Responsive>
      </MasterResponsive>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
