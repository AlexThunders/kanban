import styled from 'styled-components';

export const StyledTrashcan = styled.div`
  position: absolute;
  top: 280px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 0 30px 50px;
  margin: 0;
  z-index: 50;

  section {
    display: flex;
    flex-direction: row;
    padding: 0;
    margin: 0 0 25px 0;
    font-size: 16px;
  }

  a {
    margin: 0 25px 0 0;
    padding: 7px 2px;
    background-color: #008000;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
    min-width: 110px;
  }

  button {
    min-width: 110px;
    border-radius: 4px;
    margin: 0;
    padding: 5px 2px;
    font-size: 18px;
    border: none;
    transition: 0.3s;
    background-color: #ff9999;
    cursor: pointer;
    &:hover {
      color: #fff !important;
      background-color: red !important;
    }
  }

  ul li {
    margin: 5px 10px;
    border-bottom: 4px groove gray;
    list-style-type: circle;
    &:hover {
      color: blueviolet;
    }
  }

  @media screen and (min-width: 420px) {
    top: 230px;

    button {
      margin: 0;
    }
  }
  @media screen and (min-width: 800px) {
    top: 200px;
  }
`;
