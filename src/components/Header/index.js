import React from 'react';
import { Link } from 'react-router-dom';

import { Header } from './styles';

export function HeaderComponentUnsigned() {
  return (
    <Header>
      <nav>
        <Link to="inicio">Inicio</Link>
        <span>|</span>
        <Link to="cadastrar">Cadastrar</Link>
      </nav>
    </Header>
  );
}

export function HeaderComponentSigned() {
  return (
    <Header>
      <nav>
        <Link to="inicio">Inicio</Link>
        <span>|</span>
        <Link to="historico">Histórico</Link>
        <span>|</span>
        <Link to="convidar">Convidar usuário</Link>
      </nav>
    </Header>
  );
}
