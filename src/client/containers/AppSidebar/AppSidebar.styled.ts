import styled from 'styled-components';

export const StyledAppSideBar = styled.aside`
  margin-bottom: 21px;
  height: 109px;
  min-height: 128px;
  z-index: 2;

  .trashbtn {
    border: none;
    height: 34px;
  }
  @media screen and (min-width: 420px) {
    padding: 0 50px;
    .clearalldata {
      padding: 0 10px;
      width: 100%;
    }
    .trashbtn {
      border: none;
      width: 100%;
      padding: 0 10px;
    }
  }
  @media screen and (min-width: 620px) {
    padding: 0 100px;
  }
  @media screen and (min-width: 720px) {
    padding: 0 150px;
  }
  @media screen and (min-width: 800px) {
    /* max-width: 130px; */
    margin-top: -20px;
    padding: 0;
  }

  a {
    button {
      margin: 0;
      width: 100%;
    }
  }

  button,
  a {
    text-decoration: none;
    font-size: 0.5rem;
    background-color: #cacaf1;
    border: 1px solid gray;
    color: #111;
    width: 50%;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
      color: #400080;
    }
    &:active {
      transform: scale(0.99);
      background-color: #9595b7;
      color: #fff;
    }
    @media screen and (min-width: 420px) {
      padding: 0;
      width: 100%;
    }
  }

  .action-button {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: gray;
    width: 100%;
    padding: 6px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 4px;
    color: #fff;
    background-color: rgb(89, 81, 97);
    display: flex;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      opacity: 0.8;
      color: #ff9999;
      .action-button-icon {
        color: #ff4d4d;
      }
    }
    @media screen and (min-width: 800px) {
      letter-spacing: 2px;
      width: 100%;
      span {
        margin: 0;
        font-size: 10px;
      }
    }

    .action-button-icon {
      color: #faa;
      font-size: 20px;
      margin: 0;
    }
  }

  section {
    display: flex;
    flex-direction: row;
    padding: 0;
    button {
      height: 36px;
      margin: 0;
      padding: 15px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span {
        margin: 0 10px;
        text-align: left;
      }
    }

    @media screen and (min-width: 420px) {
      width: 100%;
      padding: 0;
    }
    @media screen and (min-width: 800px) {
      flex-direction: column;
      padding: 0;
      margin-top: 1px;
      span {
        margin: 6px;
      }
    }
  }

  .nav-folder-button-icon {
    color: rgb(80, 64, 172);
  }
`;
