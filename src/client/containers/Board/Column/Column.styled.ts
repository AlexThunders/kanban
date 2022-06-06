import styled from 'styled-components';

interface StyledDivProps {
  isDragginOver: boolean;
}

interface StyledColumnProps {
  isDragDisabled: boolean;
}

export const StyledColumn = styled.section<StyledColumnProps>`
  display: flex;
  position: relative;
  flex-direction: column;
  margin: 0;
  padding: 0 2px;
  min-width: 100px;
  width: 100%;
  flex: 1;
  height: 100%;

  h4 {
    text-align: center;
    background-color: ${(props) => (props.isDragDisabled ? '#998ba7' : 'gray')};
    margin: 0 20px 0 0;
    padding: 5px;
    color: #fff;
    overflow: hidden;
    max-height: 25px;
    white-space: nowrap;
  }
`;

export const TaskList = styled.ul<StyledDivProps>`
  margin: 0;
  padding: 0;
  min-height: 75px;
  flex-grow: 1;
  border: 1px solid gray;
  background-color: ${(props) =>
    props.isDragginOver ? '#ff9999' : 'lightgray'};

  .noTasksInfo {
    font-style: italic;
    font-size: 10px;
    color: purple;
  }

  .errorMsgToolTip {
    position: absolute;
    z-index: 88;
    left: 0;
    top: 0;
    width: 100%;
    margin: 0;
    background-color: #ffb3b3;
    padding: 2px;
    color: red;
    font-size: 12px;
    min-width: 120px;
    min-height: 30px;
  }
`;
