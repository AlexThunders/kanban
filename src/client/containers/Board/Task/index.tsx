import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { BsThreeDots } from 'react-icons/bs';
import { FcCheckmark, FcExpired } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { TestID } from '../../../../resources/TestID';
// import { saveEditedTask } from '../../../actions/task';
import { TaskOptionsMenu } from '../../Portals/TaskOptionMenu';
import { useAppSelector } from '../../../hooks/useTypedSelector';
import {
  editTask,
  updateColumnOrder,
  openPortal,
  closePortal,
  throwError,
} from '../../../slices/tasks';
import { ITask } from '../../../types/board';
import { LabelText } from '../../../utils/labelText';
import ActionButton from '../../../components/AppSidebar/ActionButton';
import Input from '../../../components/Input';
import { Handle, StyledTask } from './Task.styled';
import { trimString } from '../../../utils/helpers';

interface ITaskProps {
  task: ITask;
  index: number;
  column: string;
}

const Task: React.FC<ITaskProps> = ({ task, index, column }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task.content);
  const [showTaskEditor, setShowTaskEditor] = useState(false);
  // const [errorMsg, setErrorMsg] = useState('');
  const [isDragDisabled, setIsDragDisabled] = useState<boolean>(() =>
    task.isDragDisabled ? task.isDragDisabled : false
  );
  const { openedCategory, openedPortals, tasks } = useAppSelector(
    (state) => state.board
  );
  const dispatch = useDispatch();
  // const inpEl = useRef<HTMLInputElement>(null);
  const inpEl = useRef() as MutableRefObject<HTMLInputElement>;
  const handleTaskEdit = () => {
    if (Object.values(openedPortals).some((portal) => portal.length > 0))
      return;
    setShowTaskEditor(true);
    dispatch(throwError({ msg: '' }));
  };

  useEffect(() => {
    if (Object.values(openedPortals).some((portals) => portals.length > 0)) {
      setIsDragDisabled(true);
    }
    if (
      openedPortals.openedTaskPortal.length > 0 &&
      openedPortals.openedTaskPortal[0] === task.content
    ) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }, [openedPortals]);

  const openTaskOptions = () => {
    // setErrorMsg('');
    dispatch(throwError({ msg: '' }));
    dispatch(
      openPortal({ portalTitle: task.content, portalType: 'task-menu' })
    );
  };

  const closeTaskOptionsMenu = () => {
    dispatch(closePortal('task-menu'));
  };

  const switchToNextInput = () => {};

  const saveEditedTask = () => {
    if (
      tasks.some(
        (existingTask) =>
          existingTask.content === trimString(inpEl.current.value) &&
          task.content !== trimString(inpEl.current.value)
      )
    ) {
      // setErrorMsg(`${inpEl.current.value} has been already created`);
      dispatch(
        throwError({
          msg: `${inpEl.current.value} has been already created`,
          column,
        })
      );
      return;
    }

    if (inpEl.current) {
      dispatch(
        editTask({
          id: task.id,
          content: trimString(inpEl.current.value),
          title: task.title,
          category: task.category,
          description: task.description,
        })
      );
    }
  };

  const saveEditedTaskValue = (
    val: string | boolean,
    id: string,
    submitVal: boolean | undefined
  ) => {
    // setErrorMsg('');
    dispatch(throwError({ msg: '' }));

    setUpdatedTask(val as string);
    if (submitVal && typeof val === 'string') {
      if (
        tasks.some((existingTask) => existingTask.content === trimString(val))
      ) {
        // setErrorMsg(`${val as string} has been already created`);
        dispatch(
          throwError({
            msg: `${inpEl.current.value} has been already created`,
            column,
          })
        );
        return;
      }
      saveEditedTask();
    }
  };

  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <StyledTask
          data-testid={task.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
          openedCategory={openedCategory}
          category={task.category}
          title={`${task.content}. Have to complete till ${task.expire} `}
          showTaskEditor={showTaskEditor}
          expired={
            new Date().getDate() >= new Date(task.expire).getDate()
              ? task.expire
              : undefined
          }
        >
          {task.creation === task.expire ? (
            <div {...provided.dragHandleProps}>
              <FcExpired
                style={{
                  fontSize: '24px',
                  margin: 0,
                  position: 'absolute',
                }}
              />
            </div>
          ) : (
            <Handle
              {...provided.dragHandleProps}
              aria-label={task.content}
              important={task.important}
            />
          )}
          {showTaskEditor && !task.isDragDisabled ? (
            <Input
              type="text"
              ref={inpEl}
              id={TestID.INPUT_TO_UPDATE}
              maxInputLength={13}
              value={task.content}
              dataTestID={TestID.INPUT}
              provideInpValue={saveEditedTaskValue}
              switchToNextInput={switchToNextInput}
            />
          ) : (
            <span onDoubleClick={handleTaskEdit}>{task.content}</span>
          )}

          {showTaskEditor && !task.isDragDisabled ? (
            <ActionButton
              dataTestID={TestID.OPTIONS_BUTTON}
              label={LabelText.SAVE_EDITED_VALUE}
              handler={saveEditedTask}
              icon={FcCheckmark}
            />
          ) : (
            <ActionButton
              dataTestID={TestID.OPTIONS_BUTTON}
              label={LabelText.TASK_OPTIONS}
              handler={openTaskOptions}
              icon={BsThreeDots}
            />
          )}
          {showMenu && (
            <TaskOptionsMenu
              handleClose={closeTaskOptionsMenu}
              // submitNewTask={optionsHandler}
              task={task}
              column={column}
            />
          )}
        </StyledTask>
      )}
    </Draggable>
  );
};

export default Task;
