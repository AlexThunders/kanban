import ReactDOM from 'react-dom';
import React, {
  FormEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { StyledOptionMenu } from './ColumnOptions.styled';
import { ITask } from '../../../types/board';
import Input from '../../../components/Input';
import { TestID } from '../../../../resources/TestID';
import { IColumn } from '../../Board/Column';
import {
  clearColumn,
  renameColumn,
  toggleColumnDrag,
  toggleProhibitDropTasksToColumn,
} from '../../../slices/tasks';

interface IColumnOptionsMenuProps {
  tasks: ITask[];
  handleClose: () => void;
  column: IColumn;
}

export const ColumnOptionsMenu: React.FC<IColumnOptionsMenuProps> = ({
  handleClose,
  tasks,
  column,
}) => {
  const [onDeletion, setOnDeletion] = useState(false);
  const [onDisable, setOnDisable] = useState(false);
  const [onProhibitDrop, setOnProhibitDrop] = useState(false);
  const [inp, setInp] = useState('');
  const inpEl = useRef() as MutableRefObject<HTMLInputElement>;
  const checkEnableEl = useRef() as MutableRefObject<HTMLInputElement>;
  const checkDeleteEl = useRef() as MutableRefObject<HTMLInputElement>;
  const dispatch = useDispatch();

  useEffect(() => {
    inpEl.current.focus();
  }, []);

  const handleInp = (val: boolean | string, id: string) => {
    if (typeof val === 'boolean') {
      // checkbox cases
      if (id === 'clear-column') {
        if (onDeletion === false) {
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
      if (id === 'disable-column-drag') {
        if (onDisable === false) {
          setOnDisable(true);
        } else {
          setOnDisable(false);
        }
      }
      if (id === 'prohibit-drop-tasks') {
        if (onProhibitDrop === false) {
          setOnProhibitDrop(true);
        } else {
          setOnProhibitDrop(false);
        }
      }
    } else {
      // text input cases
      setInp(val);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (onDeletion) {
      dispatch(clearColumn(column.id));
    }
    if (onDisable) {
      dispatch(toggleColumnDrag(column.id));
    }
    if (onProhibitDrop) {
      dispatch(toggleProhibitDropTasksToColumn(column.id));
    }
    if (inp !== '') {
      dispatch(renameColumn({ column: column.id, newTitle: inp }));
    }

    handleClose();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const switchToNextInput = (ref: React.ForwardedRef<HTMLInputElement>) => {};

  return ReactDOM.createPortal(
    <StyledOptionMenu>
      <h3>
        {column.title}
        <AiFillCloseCircle
          className="closeIcon"
          onClick={handleClose}
        />
      </h3>

      <fieldset>
        <legend>column options</legend>
        <form onSubmit={handleSubmit}>
          <section className="columnOptionSection">
            <section>
              <h4>Info:</h4>
              <p style={{ color: '#660000' }}>
                <span>
                  {column.isDragDisabled && 'Column drag is disabled.'}
                </span>
                <br />
                <span>
                  {column.isDropDisabled && 'Tasks can not be moved here.'}{' '}
                </span>
              </p>
              <p>Tasks in column: {tasks.length}</p>
            </section>

            <section>
              <label htmlFor={TestID.RENAME_COLUMN}>Rename column</label>
              <Input
                dataTestID={TestID.RENAME_COLUMN}
                type="text"
                id={TestID.RENAME_COLUMN}
                provideInpValue={handleInp}
                ref={inpEl}
                switchToNextInput={switchToNextInput}
                maxInputLength={13}
              />
            </section>

            <section>
              <label htmlFor={TestID.DISABLE_COLUMN_DRAG}>
                <span>{column.isDragDisabled ? 'Enable' : 'Disable'}</span>{' '}
                column drag
              </label>
              <Input
                dataTestID={TestID.DISABLE_COLUMN_DRAG}
                type="checkbox"
                id={TestID.DISABLE_COLUMN_DRAG}
                provideInpValue={handleInp}
                checked={onDisable}
                ref={checkEnableEl}
                switchToNextInput={switchToNextInput}
              />
            </section>

            <section>
              <label htmlFor={TestID.PROHIBIT_DROP_TASKS_TO_COLUMN}>
                <span>{column.isDropDisabled ? 'Allow' : 'Prohibit'}</span>{' '}
                tasks move here
              </label>
              <Input
                dataTestID={TestID.PROHIBIT_DROP_TASKS_TO_COLUMN}
                type="checkbox"
                id={TestID.PROHIBIT_DROP_TASKS_TO_COLUMN}
                provideInpValue={handleInp}
                checked={onProhibitDrop}
                ref={checkEnableEl}
                switchToNextInput={switchToNextInput}
              />
            </section>

            <section>
              <label
                htmlFor={TestID.CLEAR_COLUMN}
                style={{
                  color: onDeletion ? '#990000' : '#111',
                  fontWeight: onDeletion ? '700' : '400',
                }}
              >
                Delete tasks in column {column.title}
              </label>
              <Input
                dataTestID={TestID.CLEAR_COLUMN}
                type="checkbox"
                id={TestID.CLEAR_COLUMN}
                provideInpValue={handleInp}
                checked={onDeletion}
                ref={checkDeleteEl}
                switchToNextInput={switchToNextInput}
              />
            </section>
          </section>

          <input type="submit" />
        </form>
      </fieldset>
    </StyledOptionMenu>,
    document.getElementById('context-menu') as HTMLElement
  );
};
