import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 64px;
  background: #32234c;
  position: absolute;
  top: 0;

  nav {
    span {
      color: #f4fff8;
      font-weight: bold;
      font-size: 1.1rem;
    }

    a {
      color: #f4fff8;
      font-size: 1.1rem;
      transition: color 0.3s;
      margin-left: 1em;
      margin-right: 1em;

      &:hover {
        color: #f4fff8;
        font-weight: 700;
        font-size: 1.4rem;
        transition: 0.5s;
        border-bottom: solid 2px #f4fff8;
        width: 120%;
      }
    }
  }
`;
