import styled from 'styled-components';

export const StyledBoard = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 0 0 50px;
  font-size: 12px;

  @media screen and (min-width: 420px) {
    flex-direction: row;
  }
`;
