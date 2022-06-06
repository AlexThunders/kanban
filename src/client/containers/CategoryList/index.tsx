import React, { MutableRefObject, useRef, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { MdDeleteForever } from 'react-icons/md';
import { TestID } from '../../../resources/TestID';
import AddCategoryButton from '../../components/AppSidebar/AddCategoryButton';
import CollapseCategoryListButton from '../../components/AppSidebar/CollapseCategoryListButton';
import { LabelText } from '../../utils/labelText';
import {
  StyledCategoryButtons,
  StyledCategoryMenu,
} from './CategoryList.styled';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { showCategory, addCategory, deleteCategory } from '../../slices/tasks';
import Input from '../../components/Input';

const CategoryList: React.FC = () => {
  const [isCategoryListOpen, setCategoryListOpen] = useState(false);
  const { categories } = useAppSelector((state) => state.board);
  const [showMenu, setShowMenu] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const dispatch = useDispatch();
  const addCatInpEl = useRef() as MutableRefObject<HTMLInputElement>;

  const handleAddCategory = () => {
    setShowMenu(true);
    setCategoryListOpen(true);
    setTimeout(() => {
      addCatInpEl.current.focus();
    }, 1000);
  };

  const switchToNextInput = () => {};

  const saveNewCategory = (
    val: string | boolean,
    id: string,
    submitVal: boolean | undefined
  ) => {
    setNewCategory(val as string);
    if (submitVal) {
      dispatch(addCategory(newCategory));
      setShowMenu(false);
    }
  };

  const handleCollapsedBtn = () => {
    setCategoryListOpen(!isCategoryListOpen);
    setShowMenu(false);
  };

  const handleDelete = (category: string) => dispatch(deleteCategory(category));

  return (
    <>
      <StyledCategoryMenu>
        <CollapseCategoryListButton
          dataTestID={TestID.CATEGORY_COLLAPSE_BUTTON}
          handler={handleCollapsedBtn}
          label={LabelText.COLLAPSE_CATEGORY}
          showIcon={categories.length > 0}
          isCategoryListOpen={isCategoryListOpen}
        />
        {showMenu ? (
          <Input
            type="text"
            provideInpValue={saveNewCategory}
            dataTestID={TestID.INPUT}
            id={TestID.INPUT}
            switchToNextInput={switchToNextInput}
            maxInputLength={15}
            ref={addCatInpEl}
          />
        ) : (
          <AddCategoryButton
            dataTestID={TestID.ADD_CATEGORY_BUTTON}
            handler={handleAddCategory}
            label={LabelText.ADD_CATEGORY}
            icon={FiPlus}
          />
        )}
      </StyledCategoryMenu>
      <StyledCategoryButtons>
        {isCategoryListOpen &&
          categories.map((category) => (
            <button
              type="button"
              onClick={() => dispatch(showCategory(category))}
              key={uuid()}
            >
              {category}
              {category !== 'All' && (
                <MdDeleteForever
                  className="delCategoryIcon"
                  onClick={() => handleDelete(category)}
                />
              )}
            </button>
          ))}
      </StyledCategoryButtons>
    </>
  );
};

export default CategoryList;
