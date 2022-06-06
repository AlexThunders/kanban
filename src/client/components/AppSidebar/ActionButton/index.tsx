import React, { MouseEventHandler } from 'react';
import { IconType } from 'react-icons/lib';
import { StyledActionButton } from './ActionButton.styled';

export interface IActionButtonProps {
  dataTestID: string;
  disabled?: boolean;
  handler: MouseEventHandler;
  icon?: IconType;
  label: string;
  text?: string;
}

const ActionButton: React.FC<IActionButtonProps> = ({
  dataTestID,
  disabled = false,
  handler,
  icon: IconCmp,
  label,
  text,
}) => {
  return (
    <StyledActionButton
      data-testid={dataTestID}
      className="action-button"
      aria-label={label}
      onClick={handler}
      disabled={disabled}
      title={label}
      type="button"
    >
      <span>{text}</span>
      {IconCmp !== undefined && (
        <IconCmp
          className="action-button-icon"
          aria-hidden="true"
          focusable="false"
          role="img"
        />
      )}
    </StyledActionButton>
  );
};
export default ActionButton;
