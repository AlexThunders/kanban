import React from 'react';
import { IconType } from 'react-icons/lib';

export interface INavFolderProps {
  dataTestID: string;
  text: string;
  label: string;
  disabled?: boolean;
  icon: IconType;
}

const NavBtn: React.FC<INavFolderProps> = ({
  dataTestID,
  label,
  text,
  disabled = false,
  icon: IconCmp,
}) => {
  return (
    <button
      aria-label={label}
      title={label}
      type="button"
      disabled={disabled}
      data-testid={dataTestID}
      className={label === 'Clear All Data' ? 'clearalldata' : 'trashbtn'}
    >
      <span>{text}</span>
      <IconCmp
        size={16}
        className="nav-folder-button-icon"
        aria-hidden="true"
        focusable="false"
      />
    </button>
  );
};

export default NavBtn;
