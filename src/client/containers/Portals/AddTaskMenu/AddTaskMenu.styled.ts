import styled from 'styled-components';

export const StyledAddTaskMenu = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -10%);
  z-index: 33;
  width: 320px;
  min-width: 300px;
  min-height: 250px;
  background-color: #ffb3b3;
  padding-bottom: 3px;

  h3 {
    margin: 0 0 10px 0;
    text-align: center;
    padding: 5px 0;
    background-color: #800000;
    color: #fff;
    font-size: 14px;

    .closeIcon {
      position: absolute;
      right: 0;
      margin: 0 10px;
      cursor: pointer;
      font-size: 18px;
      &:hover {
        opacity: 0.8;
        transform: scale(1.1);
      }
    }
  }

  .errorMsg {
    height: 30px;
    font-size: 14px;
    font-weight: 600;
    color: #cc0000;
    margin: 0 10px 5px;
  }

  fieldset {
    margin: 0 5px;
    font-size: 10px;
    legend {
      font-style: italic;
    }
  }

  label {
    text-align: left;
    margin: 0 5px 0 10px;
  }

  section {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    font-size: 10px;
  }

  input,
  textarea {
    width: 65%;
    min-height: 24px;
  }
  select {
    width: 50%;
    padding: 2px 5px;
    option {
      font-size: 16px;
    }
  }

  input[type='submit'] {
    width: 80px;
    background-color: #ff4d4d;
    color: #fff;
    border: none;
    border-radius: 3px;
    padding: 5px;
    cursor: pointer;
    &:hover {
      background-color: #ff3333;
    }
  }

  textarea {
    resize: vertical;
    max-height: 140px;
  }

  #important {
    width: 25px;
    margin: 0;
  }
`;
