import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  align-items: center;
  margin-top: 96px;

  label {
    font-size: 5vw;
    color: #f4fff8;
    margin-bottom: 12px;
  }

  select {
    width: 80vw;
    height: 10vw;
    background: #f4fff8;
    border: 0;
    border-radius: 5px;
  }

  @media (min-width: 600px) {
    label {
      font-size: 24px;
      color: #f4fff8;
    }

    select {
      height: 32px;
      max-width: 512px;
    }
  }
`;

export const DivBalance = styled.div`
  width: 80vw;
  height: 10vw;
  background: #f4fff8;
  max-width: 512px;
`;
