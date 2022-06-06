import styled from 'styled-components';

interface MenuProps {
  expired: boolean;
}

export const StyledOptionMenu = styled.div<MenuProps>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  width: 320px;
  min-height: 365px;
  background-color: #99bbff;
  border-radius: 5px;
  padding-bottom: 10px;
  overflow-y: auto;

  h3 {
    margin: 0 0 5px 0;
    width: 100%;
    text-align: center;
    padding: 5px 0;
    font-size: 10px;
    background-color: ${(props) => (props.expired ? '#ffcc00' : '#005c99')};
    color: ${(props) => (props.expired ? '#801a00' : '#fff')};
    position: sticky;
    top: 0;
    left: 0;

    .closeIcon {
      position: absolute;
      right: 0;
      margin: 0 7px 0 2px;
      cursor: pointer;
      font-size: 18px;
      &:hover {
        opacity: 0.8;
        transform: scale(1.1);
        color: #ff3333;
      }
    }
  }

  .errMsg {
    margin: 10px;
    color: red;
    font-weight: 700;
  }

  h4 {
    font-size: 12px;
    margin: 2px 10px;
  }

  fieldset {
    margin: 0 3px;
    legend {
      font-style: italic;
    }
  }

  label {
    width: 20%;
    margin-right: 5px;
    font-size: 12px;
    text-align: left;
  }

  section {
    display: flex;
    justify-content: flex-start;
    margin: 10px 0;
  }

  input,
  textarea,
  select {
    width: 75%;
    margin-left: 15px;
    min-height: 36px;
    font-size: 12px;
  }

  select {
    option {
      font-size: 16px;
    }
  }

  input[type='submit'] {
    width: 80px;
    background-color: #005c99;
    color: #fff;
    border: none;
    border-radius: 3px;
    padding: 0 5px;
    cursor: pointer;
    &:hover {
      background-color: #ff3333;
    }
  }

  textarea {
    resize: vertical;
    max-height: 140px;
  }

  .taskOptionSection {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0;
    section {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px dotted gray;
      margin: 0;
      width: 50%;
      &:first-child {
        border-right: none;
      }
      label {
        text-align: left;
      }
      input {
        margin-left: 30px;
        width: 20px;
      }
    }
  }
`;
