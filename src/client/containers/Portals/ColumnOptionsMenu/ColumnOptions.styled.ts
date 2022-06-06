import styled from 'styled-components';

export const StyledOptionMenu = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 5;
  width: 320px;
  min-height: 220px;
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
    background-color: #005c99;
    color: #fff;
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

  fieldset {
    margin: 0 3px;
    font-size: 12px;
    padding: 0;
    legend {
      font-style: italic;
    }
  }

  label {
    font-size: 12px;
    text-align: left;
    margin: 0;
    padding: 0;
    min-width: 50%;
  }

  input[type='submit'] {
    width: 80px;
    background-color: #005c99;
    color: #fff;
    border: none;
    border-radius: 3px;
    margin: 15px 0 10px 20px;
    cursor: pointer;
    &:hover {
      background-color: #ff3333;
    }
  }

  .columnOptionSection {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    width: 100%;
    section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px dotted gray;
      margin: 0;
      padding: 0 0 0 10px;

      &:first-child {
        flex-direction: column;
        align-items: flex-start;
        background-color: #718dc1;
        padding: 10px;
        background-image: linear-gradient(to right, #718dc1, #99bbff, #99bbff);
        color: #fff;
        h4 {
          text-align: left;
          margin: 0;
          color: #fff;
        }
        p {
          font-size: 12px;
          margin: 2px 0;
        }
      }

      &:nth-child(2) {
        padding: 0 10px;
        input {
          width: 150px;
          margin: 0;
        }
      }
      label {
        text-align: left;
      }
      input {
        margin: 0 5px;
        width: 20px;
        height: 20px;
      }
    }
  }
`;
