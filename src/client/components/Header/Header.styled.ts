import styled from 'styled-components';

export const StyledHeader = styled.header`
  grid-area: header;
  position: relative;
  padding: 10px 0;
  background-color: #666699;
  width: 100%;
  h1 {
    margin: 5px 0;
    text-align: center;
    color: #fff;
    letter-spacing: 3px;
    text-transform: uppercase;
    font-size: 20px;
  }

  a {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    margin: 0;
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      color: #e6e600;
    }
  }
`;
