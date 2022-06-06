import styled from 'styled-components';

export const BordInfoStyled = styled.div`
  grid-area: info;
  /* background-color: #99b3ff; */
  padding: 0;

  .info {
    grid-area: info;
    height: 20px;
    margin-left: 2px;
  }

  .ticker {
    position: relative;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .infohead {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0 0 0 3px;
    width: 18px;
    height: 20px;
    line-height: 20px;
    background-color: #b366ff;
    color: white;
    font-size: 12px;
    text-transform: uppercase;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    z-index: 1;
  }

  .infohead::after {
    content: '';
    position: absolute;
    width: 0;
    top: 0;
    right: -40px;
    border-width: 40px;
    border-style: solid;
    z-index: -1;
    border-color: #b366ff transparent transparent transparent;
  }

  .infoline {
    margin: 0;
    padding: 0;
    height: 20px;
  }

  .infoline p {
    margin: 0;
    padding: 0;
    font-size: 14px;
    opacity: 0.8;
    line-height: 20px;
    animation: moveinfo 30s linear infinite;
    word-break: keep-all;
  }

  @keyframes moveinfo {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;
