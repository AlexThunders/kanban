import React from 'react';
import { StyledHeader } from './Header.styled';

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <h1>Kanban</h1>
      <a
        title="alexthunders.ru"
        href="https://alexthunders.ru"
      >
        Home
      </a>
    </StyledHeader>
  );
};

export default Header;
