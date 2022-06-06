import styled from 'styled-components';

export const Intro = styled.section`
  padding: 10px 20px;

  @media (min-width: 800px) {
    grid-column: 1 / span 7;
  }

  p {
    width: 100%;
    font-size: 12px;
  }

  button {
    margin-left: 3px;
    border: 1px dotted gray;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      color: purple;
    }
  }
`;
