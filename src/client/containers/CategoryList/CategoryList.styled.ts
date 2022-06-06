import styled from 'styled-components';

export const StyledCategoryMenu = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;

  input {
    width: 50%;
    margin: 0;
    padding: 4px;
    @media screen and (min-width: 420px) {
      width: 100%;
    }
  }

  @media screen and (min-width: 420px) {
    width: 100%;
    justify-content: flex-start;
  }

  .category-collapese-btn {
    width: 50%;
    @media screen and (min-width: 420px) {
      width: 98%;
    }
    @media screen and (min-width: 800px) {
      width: 100%;
      padding: 10px 5px;
    }
  }

  .add-category-btn {
    padding: 5px 0;
    @media screen and (min-width: 420px) {
      width: 100%;
    }
    @media screen and (min-width: 800px) {
      padding: 10px 5px;
    }

    .add-category-btn-icon {
      font-size: 20px;
      margin: 0;
      color: rgb(80, 64, 172);
    }
  }

  .addCategoryInput {
    position: absolute;
    background-color: green;
    top: 200px;
    padding: 5px 0;
    left: 0;
    height: 25px;
    width: 200px;
  }
`;

export const StyledCategoryButtons = styled.div`
  z-index: 5;
  width: 100%;
  margin-top: 0;
  button {
    position: relative;
    background-color: #9292b9 !important;
    width: 100% !important;
    color: #fff !important;
    padding: 10px !important;
    &:hover {
      opacity: 1 !important;
      background-color: #7373a5 !important;
    }

    .delCategoryIcon {
      font-size: 16px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      margin: 0 3px 0 10px;
      transition: 0.2s;
      &:hover {
        color: #ff4d4d;
        transform: translateY(-50%) scale(1.5);
      }
    }
  }
`;
