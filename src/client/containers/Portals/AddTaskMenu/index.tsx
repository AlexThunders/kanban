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
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { StyledAddTaskMenu } from './AddTaskMenu.styled';
import { ITask } from '../../../types/board';
import { useAppSelector } from '../../../hooks/useTypedSelector';
import { TestID } from '../../../../resources/TestID';
import Input from '../../../components/Input';
import { addTask } from '../../../slices/tasks';
import { setMinDateInCalendar, trimString } from '../../../utils/helpers';

interface IAddTaskMenuProps {
  handleClose: () => void;
}

const AddTaskMenu: React.FC<IAddTaskMenuProps> = ({ handleClose }) => {
  const [contentInput, setContentInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [taskCategory, setTaskCategory] = useState('All');
  const [errorMsg, setErrorMsg] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [importantTask, setImportantTask] = useState(false);
  const { categories, tasks } = useAppSelector((state) => state.board);
  const dispatch = useDispatch();
  const inpEl = useRef() as MutableRefObject<HTMLInputElement>;
  const textAreaEl = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const selectRef = useRef() as MutableRefObject<HTMLSelectElement>;

  useEffect(() => {
    inpEl.current.focus();
  }, []);

  const saveEditedTaskValue = (val: string | boolean) => {
    if (typeof val === 'string') {
      setContentInput(typeof val === 'string' ? trimString(val) : val);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (tasks.some((task) => task.content === contentInput)) {
      setErrorMsg(`${contentInput} has been already created`);
      return;
    }

    const taskId = uuid();
    const creation = new Date().toDateString();
    const expire =
      expireDate === ''
        ? new Date(new Date().setDate(new Date().getDate() + 7)).toDateString()
        : expireDate;

    const task: ITask = {
      id: taskId,
      title: taskId,
      content: trimString(contentInput),
      description:
        descriptionInput === ''
          ? `${trimString(contentInput)} created: ${new Date().toDateString()}`
          : descriptionInput,
      creation,
      expire,
      category: taskCategory,
      isDragDisabled: false,
      important: importantTask,
    };

    dispatch(addTask(task));
    handleClose();
  };

  const switchToNextInput = (ref: React.ForwardedRef<HTMLInputElement>) => {
    if (ref === inpEl) {
      textAreaEl.current.focus();
    }
  };

  const handleTextAreaSubmit = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13) {
      selectRef.current.focus();
    }
  };

  const saveExpireDate = (e: ChangeEvent<HTMLInputElement>) => {
    setExpireDate(new Date(e.target.value).toDateString());
  };

  const handleImportantCheck = (val: string | boolean) => {
    if (typeof val === 'boolean') {
      setImportantTask(val);
    }
  };

  return ReactDOM.createPortal(
    <StyledAddTaskMenu>
      <h3>
        Enter a new task{' '}
        <AiFillCloseCircle
          className="closeIcon"
          onClick={handleClose}
        />
      </h3>
      <p className="errorMsg">{errorMsg}</p>

      <fieldset>
        <legend>Task description</legend>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor={TestID.ADD_NEW_TASK}>Title</label>
            <Input
              type="text"
              ref={inpEl}
              value={contentInput}
              id={TestID.ADD_NEW_TASK}
              dataTestID={TestID.INPUT}
              provideInpValue={saveEditedTaskValue}
              switchToNextInput={switchToNextInput}
              maxInputLength={13}
              required
            />
          </section>

          <section>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
              maxLength={200}
              rows={4}
              cols={25}
              placeholder="Describe task here..."
              ref={textAreaEl}
              onKeyDown={handleTextAreaSubmit}
            />
          </section>

          <section>
            <label htmlFor={TestID.EXPIRE_DATE}>Set expire date</label>
            <input
              type="date"
              id={TestID.EXPIRE_DATE}
              onChange={saveExpireDate}
              min={setMinDateInCalendar()}
            />
          </section>

          <section>
            <label htmlFor="category">Category</label>
            <select
              onChange={(e) => setTaskCategory(e.target.value)}
              ref={selectRef}
              value={taskCategory}
            >
              {categories.map((category) => (
                <option
                  value={category}
                  key={uuid()}
                >
                  {category}
                </option>
              ))}
            </select>
          </section>

          <section>
            <label htmlFor={TestID.IMPORTANT}>Important</label>
            <Input
              dataTestID={TestID.IMPORTANT}
              type="checkbox"
              id={TestID.IMPORTANT}
              provideInpValue={handleImportantCheck}
              checked={importantTask}
              switchToNextInput={switchToNextInput}
            />
          </section>

          <input type="submit" />
        </form>
      </fieldset>
    </StyledAddTaskMenu>,
    document.getElementById('context-menu') as HTMLElement
  );
};

export default AddTaskMenu;
