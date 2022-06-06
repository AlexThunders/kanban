import React, { useState } from 'react';
import {
  BsChevronDown,
  BsChevronRight,
  BsFillLayersFill,
} from 'react-icons/bs';

export interface ICollapseCategoryListButton {
  dataTestID: string;
  handler: () => void;
  label: string;
  isCategoryListOpen: boolean;
  showIcon: boolean;
}

const CollapseCategoryListButton: React.FC<ICollapseCategoryListButton> = ({
  dataTestID,
  handler,
  label,
  isCategoryListOpen,
  showIcon,
}) => {
  const [collapsedBtn, setCollapsedBtn] = useState<boolean>(false);

  const handleBtnCollapse = (e: React.KeyboardEvent<Element>) => {
    if (e.keyCode === 13) {
      setCollapsedBtn((prevCollapsedState) => !prevCollapsedState);
    }
  };

  return (
    <button
      type="button"
      data-testid={dataTestID}
      className="category-collapese-btn"
      onClick={handler}
      onKeyDown={handleBtnCollapse}
      aria-label={label}
      aria-expanded={collapsedBtn}
    >
      <span>Categories</span>
      {showIcon ? (
        isCategoryListOpen ? (
          <BsChevronDown size={16} />
        ) : (
          <BsChevronRight size={16} />
        )
      ) : (
        <BsFillLayersFill size={16} />
      )}
    </button>
  );
};

export default CollapseCategoryListButton;
