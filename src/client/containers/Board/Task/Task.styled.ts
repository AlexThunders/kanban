import styled from 'styled-components';

interface StyledDivProps {
  isDragging: boolean;
  isDragDisabled: boolean;
  openedCategory: string;
  category: string;
  showTaskEditor: boolean;
  expired?: string;
}

interface HandleProps {
  important: boolean;
}

export const StyledTask = styled.li<StyledDivProps>`
  /* position: relative; */

  position: ${(props) => (props.isDragging ? 'static' : 'relative')};

  overflow: hidden;
  margin: 4px 0;
  padding: 5px 2px;
  color: ${(props) => (props.expired ? '#b30000' : '#111')};
  font-weight: ${(props) => (props.expired ? '900' : '400')};
  font-size: 14px;
  width: 100%;

  display: ${(props) =>
    props.openedCategory === 'All'
      ? 'block'
      : props.openedCategory === props.category
      ? 'block'
      : 'none'};

  background-color: ${(props) =>
    props.isDragDisabled
      ? '#a3a3c2'
      : props.isDragging
      ? 'lightgreen'
      : props.expired
      ? '#ffffb3'
      : 'white'};

  span {
    text-align: left;
    margin: 0 10px 0 24px;
    font-size: 12px;
  }

  button {
    position: absolute;
    width: 20px;
    height: 100%;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    color: #fff;
    transition: 0.1s;
    font-size: 18px;
    z-index: 1;
    cursor: pointer;

    background-color: ${(props) =>
      props.showTaskEditor ? 'white' : '#a3a3c2'};

    span {
      display: none;
    }
    &:hover {
      color: purple;
      background-color: ${(props) =>
        props.showTaskEditor ? 'lightgreen' : 'white'};
    }
    &:active {
      color: red;
    }
  }
`;

export const Handle = styled.div<HandleProps>`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 5px;
  width: 15px;
  min-width: 15px;
  height: 15px;
  border-radius: 6px;
  margin-right: 10px;
  transition: 0.2s;
  background-color: ${(props) => (props.important ? '#ff4d4d' : 'gray')};

  &:hover {
    background-color: brown;
  }
`;
