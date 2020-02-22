import React from 'react';

import { Nav } from 'react-bootstrap';
import { DivMenu } from './styles';

export function HeaderComponentUnsigned() {
  return (
    <Nav
      justify
      variant="tabs"
      defaultActiveKey="/"
      style={{ background: '#563D7C' }}
    >
      <DivMenu>
        <Nav.Item>
          <Nav.Link
            href="/"
            style={{ color: '#F8F9FA', fontWeight: 'bold' }}
            eventKey="link-1"
          >
            Inicio
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/login"
            style={{ color: '#F8F9FA', fontWeight: 'bold' }}
            eventKey="link-2"
          >
            Login
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/cadastrar"
            style={{ color: '#F8F9FA', fontWeight: 'bold' }}
            eventKey="link-3"
          >
            Cadastrar
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            style={{ color: '#F8F9FA', fontWeight: 'bold' }}
            eventKey="disabled"
            disabled
          >
            Sair
          </Nav.Link>
        </Nav.Item>
      </DivMenu>
    </Nav>
  );
}

export function HeaderComponentSigned() {
  return (
    <Nav
      justify
      variant="tabs"
      defaultActiveKey="/"
      style={{ background: '#563D7C' }}
    >
      <DivMenu>
        <Nav.Item>
          <Nav.Link
            href="/inicio"
            style={{ color: '#F8F9FA', fontWeight: 'bold' }}
            eventKey="link-1"
          >
            Inicio
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            href="/usuarios"
            style={{ color: '#F8F9FA', fontWeight: 'bold' }}
            eventKey="link-2"
          >
            Usuários
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            href="/historico"
            style={{ color: '#F8F9FA', fontWeight: 'bold' }}
            eventKey="link-3"
          >
            Historico
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            href="/"
            style={{ color: '#F8F9FA', fontWeight: 'bold' }}
            eventKey="link-4"
            onClick={() => localStorage.removeItem('persist:nosso-saldo')}
          >
            Sair
          </Nav.Link>
        </Nav.Item>
      </DivMenu>
    </Nav>
  );
}
