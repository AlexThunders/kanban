import React from 'react';
import { IconType } from 'react-icons/lib';
import { LabelText } from '../../../utils/labelText';

export interface IAddCategoryButtonProps {
  dataTestID: string;
  handler: (adding: boolean) => void;
  label: string;
  icon: IconType;
  disabled?: boolean;
}

const AddCategoryButton: React.FC<IAddCategoryButtonProps> = ({
  dataTestID,
  handler,
  label,
  icon: IconCmp,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      data-testid={dataTestID}
      className="add-category-btn"
      onClick={() => handler(true)}
      aria-label={label}
      title={LabelText.ADD_CATEGORY}
      disabled={disabled}
    >
      <span>Add category</span>
      <IconCmp
        className="add-category-btn-icon"
        aria-hidden="true"
        role="img"
        focusable="false"
      />
    </button>
  );
};

export default AddCategoryButton;
