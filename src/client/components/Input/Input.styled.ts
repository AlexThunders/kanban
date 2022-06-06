import styled from 'styled-components';

interface InputProps {
  type: string;
}

export const StyledInput = styled.input<InputProps>`
  margin-left: ${(props) => (props.type === 'text' ? '20px' : '0px')};

  width: 85%;
  @media screen and (min-width: 420px) {
    width: 70%;
  }
`;
