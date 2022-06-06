import React from 'react';
import { StyledErrMsg } from './ErrorMsg.styled';

interface IProps {
  msg: string;
}

const ErrorMsg: React.FC<IProps> = ({ msg }) => {
  return (
    <StyledErrMsg>
      <h6>{msg}</h6>
      <p>An error occured while fetching info about your address.</p>
    </StyledErrMsg>
  );
};

export default ErrorMsg;
