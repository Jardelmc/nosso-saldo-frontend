import styled from 'styled-components';
import { darken } from 'polished';

export const Content = styled.div`
  display: flex;
  justify-content: center;
  margin: 50% auto;
  align-items: center;
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #f4fff8;
      margin: 0 0 10px;

      &::placeholder {
        color: #f4fff8;
      }
    }

    span {
      color: #f4fff8;
      align-self: flex-start;
      margin: 0 0 5px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #3b9eff;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#3b9eff')};
      }
    }
  }
`;
