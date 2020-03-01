import React from 'react';

import { Container, Card, Figure } from 'react-bootstrap';

import seubarriga from '../../assets/seubarriga.jpg';

export default function Index() {
  document.title = 'Nosso Saldo';

  return (
    <>
      <Container>
        <br />
        <br />

        <Card bg="success" text="white">
          <Card.Body>
            <Card.Title>NOSSO SALDO</Card.Title>
            <Card.Text>
              Sistema para controle de finanças entre usuários
            </Card.Text>
          </Card.Body>
        </Card>

        <br />
        <br />

        <Card border="success" body>
          1º Cadastre-se com seu e-mail
        </Card>

        <br />

        <Card border="success" body>
          2º Envie um convite para um amigo e peça para ele aceitar a
          solicitação
        </Card>

        <br />

        <Card border="success" body>
          Pronto, vocês já podem controlar seus gastos! <br /> <br />
          Exemplo: Se você pagou a viagem de uber sozinho e a corrida deu R$
          20,00. Acidione R$ 10,00 de créditos para você em relação ao seu
          amigo.
        </Card>

        <br />

        <div style={{ position: 'relative' }}>
          <Figure>
            <Figure.Image
              style={{
                borderRadius: '5px',
                position: 'absolute',
                left: '43%',
              }}
              width={56}
              height={56}
              alt="Seu Barriga cobrando dinheiro"
              src={seubarriga}
            />
          </Figure>
        </div>
      </Container>
    </>
  );
}
