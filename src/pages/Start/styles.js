import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { lighten } from 'polished';

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
  display: flex;
  margin-top: 5vw;
  width: 80vw;
  max-width: 512px;
  height: 16vw;
  max-height: 196px;
  background: #f4fff8;
  border-radius: 5px;
  position: relative;

  span {
    position: absolute;
    left: 2vw;
    top: 5vw;
    font-size: 5vw;
  }

  div {
    position: absolute;
    right: 1vw;
    top: 1vw;
    width: 20vw;
    height: 14vw;
    background: #b3ffa5;
    border-radius: 50%;

    h2 {
      position: absolute;
      right: 8vw;
      top: 6vw;
      font-size: 2.5vw;
    }
  }
`;

export const DivInputs = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 5vw;
  width: 80vw;
  max-width: 512px;
  height: 40vw;
  max-height: 196px;
  background: #f4fff8;
  border-radius: 5px;
  position: relative;

  label {
    margin: 3.5vw auto;
    color: #000;
    font-size: 4vw;
  }

  input + label {
    position: absolute;
    left: 4vw;
    top: 13vw;
  }

  input {
    padding-left: 9vw;
    margin: 2vw auto;
    width: 32vw;
    height: 8vw;
    border-radius: 5px;
    background: ${lighten(0.1, '#b3ffa5')};
  }

  textarea {
    margin: auto auto 2vw auto;
    border-radius: 5px;
    background: none;
    padding: 2vw 2vw 2vw 2vw;
  }
`;

export const SendButton = styled.button`
  margin-top: 6vw;
  width: 80vw;
  height: 10vw;
  background: #3b9eff;
  border: 0;
  border-radius: 5px;
  color: #fff;
`;
