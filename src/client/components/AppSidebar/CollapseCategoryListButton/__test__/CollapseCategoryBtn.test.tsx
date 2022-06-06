import { render } from '@testing-library/react';
import { TestID } from '../../../../../resources/TestID';
import CollapseCategoryListButton, { ICollapseCategoryListButton } from '..';

describe('<CollapseCategoryListButton>', () => {
  it('renders <CollapseCategoryListButton/>', () => {
    const enabledProps: ICollapseCategoryListButton = {
      dataTestID: TestID.ADD_CATEGORY_BUTTON,
      handler: jest.fn,
      label: 'Test',
      isCategoryListOpen: false,
      showIcon: true,
    };
    const component = render(<CollapseCategoryListButton {...enabledProps} />);
    expect(component).toBeTruthy();
  });
});
