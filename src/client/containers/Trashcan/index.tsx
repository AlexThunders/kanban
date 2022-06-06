import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { clearTrashcan, setCurrentPage } from '../../slices/tasks';
import { mainDevPath, mainProdPath } from '../App';
import { StyledTrashcan } from './Trash.styled';

const Trashcan: React.FC = () => {
  const { trashcan } = useAppSelector((state) => state.board);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage('trashcan'));
  }, []);

  const handleClear = () => {
    dispatch(clearTrashcan());
  };

  return (
    <StyledTrashcan>
      <section>
        <Link to={mainDevPath}>Back to board</Link>
        {/* <Link to={mainProdPath}>Back to board</Link> */}
        <button
          type="button"
          onClick={handleClear}
        >
          Clean trash
        </button>
      </section>
      <p>All deleted tasks:</p>
      <ul>
        {trashcan.map((task) => (
          <li
            key={uuid()}
            title={`was created ${task.creation}, expired ${task.expire}`}
          >
            {task.content}
          </li>
        ))}
      </ul>
    </StyledTrashcan>
  );
};

export default Trashcan;
