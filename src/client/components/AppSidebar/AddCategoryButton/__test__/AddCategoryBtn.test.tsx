import { render } from '@testing-library/react';
import { FiPlus } from 'react-icons/fi';
import { TestID } from '../../../../../resources/TestID';
import AddCategoryButton, { IAddCategoryButtonProps } from '..';

describe('<AddCategoryButton>', () => {
  it('renders addCategoryBtn', () => {
    const enabledProps: IAddCategoryButtonProps = {
      dataTestID: TestID.ADD_CATEGORY_BUTTON,
      disabled: false,
      handler: jest.fn,
      icon: FiPlus,
      label: 'Test',
    };
    const component = render(<AddCategoryButton {...enabledProps} />);
    expect(component).toBeTruthy();
  });
});
