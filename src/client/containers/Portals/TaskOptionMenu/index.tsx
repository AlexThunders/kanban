import ReactDOM from 'react-dom';
import React, {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FcExpired } from 'react-icons/fc';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { StyledOptionMenu } from './TaskOptionMenu.styled';
import { ITask } from '../../../types/board';
import { useAppSelector } from '../../../hooks/useTypedSelector';
import { deleteTask, disableTask, editTask } from '../../../slices/tasks';
import Input from '../../../components/Input';
import { TestID } from '../../../../resources/TestID';

interface ITaskOptionsMenuProps {
  task: ITask;
  handleClose: () => void;
  submitNewTask?: (task: ITask) => void;
  column: string;
}

export const TaskOptionsMenu: React.FC<ITaskOptionsMenuProps> = ({
  handleClose,
  task,
  column,
}) => {
  const [onDeletion, setOnDeletion] = useState(false);
  const [onDisable, setOnDisable] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState(task.description);
  const [taskCategory, setTaskCategory] = useState(task.category);
  const [updatedTaskContent, setUpdatedTaskContent] = useState(task.content);
  const [errorMsg, setErrorMsg] = useState('');
  const { categories, tasks } = useAppSelector((state) => state.board);
  const inpEl = useRef() as MutableRefObject<HTMLInputElement>;
  const textAreaEl = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const selectRef = useRef() as MutableRefObject<HTMLSelectElement>;
  const checkEnableEl = useRef() as MutableRefObject<HTMLInputElement>;
  const checkDeleteEl = useRef() as MutableRefObject<HTMLInputElement>;
  const dispatch = useDispatch();

  useEffect(() => {
    inpEl.current.focus();
  }, []);

  const handleInp = (val: boolean | string, id: string) => {
    if (typeof val === 'boolean') {
      // checkbox cases
      if (id === 'delete-task') {
        if (onDeletion === false) {
          // eslint-disable-next-line no-alert
          switch (window.confirm("You won't be able to restore this task")) {
            case true:
              setOnDeletion(true);
              break;
            case false:
              setOnDeletion(false);
              break;
            default:
              setOnDeletion(false);
          }
        } else {
          setOnDeletion(false);
        }
      }
      if (id === 'disable-task') {
        if (onDisable === false) {
          setOnDisable(true);
        } else {
          setOnDisable(false);
        }
      }
    } else {
      // text input cases
      // setInp(val);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      tasks.some(
        (existingTask) =>
          existingTask.content === updatedTaskContent &&
          task.content !== updatedTaskContent
      )
    ) {
      setErrorMsg(`${updatedTaskContent} has been already created`);
      return;
    }

    if (onDeletion) {
      dispatch(deleteTask({ id: task.id, column }));
    }
    if (onDisable && task.isDragDisabled === false) {
      dispatch(disableTask({ id: task.id, val: true }));
    }
    if (onDisable && task.isDragDisabled === true) {
      dispatch(disableTask({ id: task.id, val: false }));
    }

    const updatedTask: ITask = {
      id: task.id,
      title: task.title,
      content: updatedTaskContent,
      description: descriptionInput,
      creation: task.creation,
      expire: task.expire,
      category: taskCategory,
      isDragDisabled: task.isDragDisabled,
      important: task.important,
    };
    dispatch(editTask(updatedTask));
    handleClose();
  };

  const saveEditedTaskValue = (val: string | boolean) => {
    setUpdatedTaskContent(val as string);
  };

  const switchToNextInput = (ref: React.ForwardedRef<HTMLInputElement>) => {
    if (ref === inpEl) {
      textAreaEl.current.focus();
    }
    if (ref === checkEnableEl) {
      // checkDeleteEl.current.focus();
    }
  };

  const handleTextAreaSubmit = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13) {
      selectRef.current.focus();
    }
  };

  const handleSelectSubmit = (e: ChangeEvent<HTMLSelectElement>) => {
    setTaskCategory(e.target.value);
    checkEnableEl.current.focus();
  };

  return ReactDOM.createPortal(
    <StyledOptionMenu expired={task.creation === task.expire}>
      <h3>
        {task.creation === task.expire && (
          <FcExpired
            style={{
              fontSize: '36px',
              margin: 0,
              position: 'absolute',
              left: '20px',
              top: '2px',
            }}
          />
        )}
        {task.content}{' '}
        <AiFillCloseCircle
          className="closeIcon"
          onClick={handleClose}
        />
      </h3>

      <p className="errMsg">{errorMsg}</p>

      <fieldset>
        <legend>task options</legend>
        <h4>created: {task.creation}</h4>
        <h4>expire: {task.expire}</h4>
        <hr />
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor={TestID.INPUT_IN_OPTIONS}>Change title</label>
            <Input
              type="text"
              ref={inpEl}
              value={updatedTaskContent}
              id={TestID.INPUT_IN_OPTIONS}
              dataTestID={TestID.INPUT_IN_OPTIONS}
              provideInpValue={saveEditedTaskValue}
              switchToNextInput={switchToNextInput}
              maxInputLength={20}
              disabled={task.isDragDisabled}
            />
          </section>

          <section>
            <label htmlFor="content">Edit content</label>
            <textarea
              ref={textAreaEl}
              id="content"
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
              maxLength={200}
              rows={4}
              cols={25}
              onKeyDown={handleTextAreaSubmit}
              disabled={task.isDragDisabled}
            />
          </section>

          <section>
            <label htmlFor="category">Change category</label>
            <select
              onChange={handleSelectSubmit}
              value={taskCategory}
              ref={selectRef}
              disabled={task.isDragDisabled}
            >
              {categories.map((category) => (
                <option
                  key={uuid()}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>
          </section>

          <section className="taskOptionSection">
            <section>
              <label htmlFor={TestID.DISABLE_TASK}>
                {task.isDragDisabled ? 'Enable' : 'Disable'} task
              </label>
              <Input
                dataTestID={TestID.DISABLE_TASK}
                type="checkbox"
                id={TestID.DISABLE_TASK}
                provideInpValue={handleInp}
                checked={onDisable}
                ref={checkEnableEl}
                switchToNextInput={switchToNextInput}
              />
            </section>

            <section>
              <label
                htmlFor={TestID.DELETE_TASK}
                style={{
                  color: onDeletion ? '#990000' : '#111',
                  fontWeight: onDeletion ? '700' : '400',
                }}
              >
                Delete task
              </label>
              <Input
                dataTestID={TestID.DELETE_TASK}
                type="checkbox"
                id={TestID.DELETE_TASK}
                provideInpValue={handleInp}
                checked={onDeletion}
                ref={checkDeleteEl}
                switchToNextInput={switchToNextInput}
              />
            </section>
          </section>

          <hr />
          <input type="submit" />
        </form>
      </fieldset>
    </StyledOptionMenu>,
    document.getElementById('context-menu') as HTMLElement
  );
};
