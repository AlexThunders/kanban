import React, { useEffect, useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { BsThreeDots } from 'react-icons/bs';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { TestID } from '../../../../resources/TestID';
import { ITask } from '../../../types/board';
import { LabelText } from '../../../utils/labelText';
import ActionButton from '../../../components/AppSidebar/ActionButton';
import Task from '../Task';
import { StyledColumn, TaskList } from './Column.styled';
import { ColumnOptionsMenu } from '../../Portals/ColumnOptionsMenu';
import { useAppSelector } from '../../../hooks/useTypedSelector';
import { openPortal, closePortal } from '../../../slices/tasks';

export interface IColumn {
  id: string;
  title: string;
  taskIds: string[];
  isDragDisabled: boolean;
  isDropDisabled: boolean;
}

interface IColumnProps {
  column: IColumn;
  tasks: ITask[];
  index: number;
  disabled: boolean;
}

const Column: React.FC<IColumnProps> = ({ column, tasks, index }) => {
  const { openedPortals, error } = useAppSelector((state) => state.board);
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      openedPortals.openedColumnPortal.length > 0 &&
      openedPortals.openedColumnPortal[0] === column.title
    ) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }, [openedPortals]);

  const openColumnMenu = () => {
    dispatch(
      openPortal({ portalTitle: column.title, portalType: 'column-menu' })
    );
  };

  const closeColumnOptionsMenu = () => {
    dispatch(closePortal('column-menu'));
  };

  return (
    <Draggable
      draggableId={column.id}
      index={index}
      isDragDisabled={column.isDragDisabled}
    >
      {(provided) => (
        <StyledColumn
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragDisabled={column.isDragDisabled}
        >
          <h4>
            <span {...provided.dragHandleProps}>{column.title}</span>
            <ActionButton
              dataTestID={TestID.COLUMN_OPTIONS}
              label={LabelText.COLUMN_OPTIONS}
              handler={openColumnMenu}
              icon={BsThreeDots}
              disabled={showMenu}
            />
            {showMenu && (
              <ColumnOptionsMenu
                handleClose={closeColumnOptionsMenu}
                tasks={tasks}
                column={column}
              />
            )}
          </h4>
          <Droppable
            droppableId={column.id}
            type={column.isDropDisabled ? 'done' : 'active'}
          >
            {(providedDrop, snapshot) => (
              <TaskList
                data-testid={column.id}
                ref={providedDrop.innerRef}
                {...providedDrop.droppableProps}
                isDragginOver={snapshot.isDraggingOver}
              >
                {tasks.length === 0 && column.title === 'Tasks' && (
                  <span className="noTasksInfo">
                    you don&apos;t have new tasks
                  </span>
                )}
                {error.msg !== '' && error.column === column.id && (
                  <p className="errorMsgToolTip">{error.msg}</p>
                )}
                {tasks.map((singleTask, ind) => (
                  <Task
                    key={uuid()}
                    task={singleTask}
                    index={ind}
                    column={column.id}
                  />
                ))}
                {providedDrop.placeholder}
              </TaskList>
            )}
          </Droppable>
        </StyledColumn>
      )}
    </Draggable>
  );
};

export default Column;
