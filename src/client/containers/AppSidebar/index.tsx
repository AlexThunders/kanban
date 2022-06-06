import React, { useEffect, useState } from 'react';
import { BsPlus, BsFillTrashFill, BsKanban } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ActionButton from '../../components/AppSidebar/ActionButton';
import { TestID } from '../../../resources/TestID';
import { LabelText } from '../../utils/labelText';
import NavBtn from '../../components/AppSidebar/NavBtn';
import CategoryList from '../CategoryList';
import { StyledAppSideBar } from './AppSidebar.styled';
import AddTaskMenu from '../Portals/AddTaskMenu';
import { clearAllData, closePortal, openPortal } from '../../slices/tasks';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { mainDevPath } from '../App';

const AppSidebar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { openedPortals, currentPage } = useAppSelector((state) => state.board);
  const dispatch = useDispatch();

  useEffect(() => {
    if (openedPortals.openedAddTaskPortal.length > 0) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }, [openedPortals]);

  const newTaskHandler = () => {
    dispatch(
      openPortal({ portalTitle: 'add-task-menu', portalType: 'add-task-menu' })
    );
  };

  const closeAddTaskMenu = () => {
    dispatch(closePortal('add-task-menu'));
  };

  const clearAllBoardData = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm('All of your tasks will be permanently deleted')) {
      dispatch(clearAllData());
    }
  };

  return (
    <>
      {currentPage === '/' && (
        <StyledAppSideBar className="appsidebar">
          <ActionButton
            dataTestID={TestID.ACTION_BUTTON}
            text={LabelText.ADD_TASK}
            label={LabelText.CREATE_NEW_TASK}
            handler={newTaskHandler}
            icon={BsPlus}
          />
          <CategoryList />
          <section>
            {currentPage === '/' && (
              <button
                type="button"
                className="clearalldata"
                title={LabelText.CLEAR_ALL_DATA}
                onClick={clearAllBoardData}
              >
                {LabelText.CLEAR_ALL_DATA}
              </button>
            )}
            {/* <Link
            to={currentPage === '/' ? `${mainProdPath}/trashcan` : mainProdPath}
          > */}
            <Link to={currentPage === '/' ? `/trashcan` : mainDevPath}>
              <NavBtn
                dataTestID={currentPage === '/' ? TestID.TRASH : TestID.BOARD}
                label={
                  currentPage === '/'
                    ? LabelText.TRASH
                    : LabelText.MOVE_TO_BOARD
                }
                text={
                  currentPage === '/'
                    ? LabelText.TRASH
                    : LabelText.MOVE_TO_BOARD
                }
                icon={currentPage === '/' ? BsFillTrashFill : BsKanban}
              />
            </Link>
          </section>
        </StyledAppSideBar>
      )}

      {showMenu && <AddTaskMenu handleClose={closeAddTaskMenu} />}
    </>
  );
};

export default AppSidebar;
