import React, { useEffect } from 'react';
import {
  DragDropContext,
  DragUpdate,
  Droppable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import Column, { IColumn } from './Column';
import {
  setCurrentPage,
  updateColumnOrder,
  updateTasksOrder,
} from '../../slices/tasks';
import { StyledBoard } from './Board.styled';
import BoardInfo from '../BoardInfo';
import { getBoardData } from '../../selectors';

const Board: React.FC = () => {
  const { tasks, columns, columnOrder, openedPortals } =
    useSelector(getBoardData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage('/'));
  }, []);

  const onDragStart = (
    start: { source: { index: number } },
    provided: { announce: (arg0: string) => void }
  ) => {
    const allH3s = Array.from(document.querySelectorAll('h3'));
    allH3s.forEach((el) => (el.style.color = 'purple'));

    provided.announce(
      `You have lifted the task in position ${start.source.index + 1}`
    );
  };

  const onDragUpdate = (update: DragUpdate, provided: ResponderProvided) => {
    const message = update.destination
      ? `You have moved the task to position ${update.destination.index + 1}`
      : `You are currently not over a droppable area`;

    provided.announce(message);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    const allH3s = Array.from(document.querySelectorAll('h3'));
    allH3s.forEach((el) => (el.style.color = 'white'));
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // moving columns
    if (type === 'column') {
      const newColumnOrder = Array.from(columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      dispatch(updateColumnOrder(newColumnOrder));
    }
    const home: IColumn = columns[source.droppableId];
    const foreign: IColumn = columns[destination.droppableId];
    // moving tasks within one column
    if (home === foreign && type === 'active') {
      const newTaskIds = Array.from(home.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...home,
        taskIds: newTaskIds,
      };
      const newColumns = {
        ...columns,
        [newColumn.id]: newColumn,
      };
      dispatch(updateTasksOrder(newColumns));
      return;
    }
    // moving task to a different column
    if (home !== foreign && type === 'active') {
      const homeTaskIds = Array.from(home.taskIds);
      homeTaskIds.splice(source.index, 1);
      const newhome = {
        ...home,
        taskIds: homeTaskIds,
      };
      const foreignTaskIds = Array.from(foreign.taskIds);
      foreignTaskIds.splice(destination.index, 0, draggableId);
      const newforeign = {
        ...foreign,
        taskIds: foreignTaskIds,
      };
      const newColumns = {
        ...columns,
        [newhome.id]: newhome,
        [newforeign.id]: newforeign,
      };
      dispatch(updateTasksOrder(newColumns));
    }
  };

  return (
    <>
      <BoardInfo />
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
      >
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <StyledBoard
              className="board"
              ref={provided.innerRef}
              {...provided.droppableProps}
              aria-label="kanban board"
            >
              {columnOrder.map((columnId, index) => {
                const column = columns[columnId];
                const columnTasks = column.taskIds.map((taskId) => {
                  return tasks.filter((task) => task.id === taskId)[0];
                });

                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={columnTasks}
                    index={index}
                    disabled={openedPortals.openedColumnPortal.length > 0}
                  />
                );
              })}
              {provided.placeholder}
            </StyledBoard>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Board;
