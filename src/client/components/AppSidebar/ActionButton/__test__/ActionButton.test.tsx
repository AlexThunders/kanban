import { render } from '@testing-library/react';
import { FiPlus } from 'react-icons/fi';
import { TestID } from '../../../../../resources/TestID';
import ActionButton, { IActionButtonProps } from '..';

describe('<ActionButton>', () => {
  it('renders <ActionButton/>', () => {
    const enabledProps: IActionButtonProps = {
      dataTestID: TestID.ACTION_BUTTON,
      disabled: false,
      handler: jest.fn,
      icon: FiPlus,
      label: 'Test',
    };
    const component = render(<ActionButton {...enabledProps} />);
    expect(component).toBeTruthy();
  });
});
