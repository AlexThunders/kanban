import React from 'react';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { BordInfoStyled } from './BordInfostyled';

const BoardInfo: React.FC = () => {
  const { tasks } = useAppSelector((state) => state.board);
  return (
    <BordInfoStyled>
      <div className="info">
        <div className="ticker">
          <div className="infohead">Info</div>
          <div className="infoline">
            {tasks.length === 0 ? (
              <p className="ticker">You don&apos;t have new tasks</p>
            ) : (
              <p className="ticker">
                <span>Number of all tasks: </span> <span>{tasks.length}.</span>{' '}
                <span>Expired tasks are colored in red.</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </BordInfoStyled>
  );
};

export default BoardInfo;
