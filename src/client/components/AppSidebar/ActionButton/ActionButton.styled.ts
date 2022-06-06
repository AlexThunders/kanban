import styled from 'styled-components';

interface IProps {
  title: string;
}

export const StyledActionButton = styled.button<IProps>`
  cursor: pointer;
  margin: 0;
  transition: 0.2s;
  width: ${(props) => (props.title === 'column-options' ? '20px' : '35px')};
  height: ${(props) =>
    props.title === 'column-options'
      ? '25px'
      : props.title === 'Create new task'
      ? '40px'
      : '24px'};
  background: ${(props) => props.title === 'column-options' && 'gray'};
  border: ${(props) => props.title === 'column-options' && 'none'};
  position: ${(props) => props.title === 'column-options' && 'absolute'};
  top: ${(props) => (props.title === 'column-options' ? 0 : '7px')};
  right: ${(props) => (props.title === 'column-options' ? '2px' : '4px')};

  &:hover {
    color: ${(props) => props.title === 'column-options' && 'yellow'};
  }
`;
