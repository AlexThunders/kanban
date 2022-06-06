import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TestID } from '../../../resources/TestID';
import ActionButton from '../../components/AppSidebar/ActionButton';
import ErrorMsg from '../../components/ErrorMsg';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { fetchIpAddress } from '../../slices/ipAddress';
import { LabelText } from '../../utils/labelText';
import { Intro } from './Intro.styled';

const IntroParagraph: React.FC = () => {
  const { city, country, loading, error } = useAppSelector((state) => state.ip);
  const dispatch = useDispatch();
  const [locationQuestion, setLocationQuestion] = useState('Correct?');
  const [showQuestionBtns, setShowQuestionsBtns] = useState(true);

  useEffect(() => {
    dispatch(fetchIpAddress());
  }, []);

  const newTaskHandler = (correct: boolean) => {
    if (correct) {
      setLocationQuestion('');
      setShowQuestionsBtns(false);
    } else {
      dispatch(fetchIpAddress());
    }
  };

  return (
    <Intro>
      {loading ? (
        <p>Fetching your IP...</p>
      ) : error ? (
        <ErrorMsg msg={error} />
      ) : (
        <p id="requirements">
          You&apos;r current location is {city}, {country}. {locationQuestion}{' '}
          {showQuestionBtns && (
            <>
              <ActionButton
                dataTestID={TestID.CORRECT_CITY}
                text={LabelText.YES}
                label={LabelText.CORRECT_CITY + city}
                handler={() => newTaskHandler(true)}
              />
              <ActionButton
                dataTestID={TestID.CORRECT_CITY}
                text={LabelText.NO}
                label={LabelText.INCORRECT_CITY + city}
                handler={() => newTaskHandler(false)}
              />
            </>
          )}
        </p>
      )}
      <article aria-label="instruction how to use kanban">
        <p>
          Add tasks you need to track down. Grab and move them withing and
          between columns in accordance with progress of their fulfillment. Only
          complete tasks can be moved to DONE column. By default the expiry date
          is set to 7 days, but you can set it to a specific date when create a
          new task. If date of expiry coincides with current date a task will be
          expired and marked with exclamation mark on the board and in it&apos;s
          options. Important tasks are marked with red circle.
        </p>
        <p>
          Choose options button to edit, delete task and make them complete.
        </p>
      </article>
    </Intro>
  );
};

export default IntroParagraph;
