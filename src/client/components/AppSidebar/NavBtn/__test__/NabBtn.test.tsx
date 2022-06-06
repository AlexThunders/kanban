import { render } from '@testing-library/react';
import { BsFillExclamationDiamondFill } from 'react-icons/bs';
import { TestID } from '../../../../../resources/TestID';
import NavBtn, { INavFolderProps } from '..';
import { LabelText } from '../../../../utils/labelText';
import '@testing-library/jest-dom';

describe('<CollapseCategoryListButton>', () => {
  it('renders <CollapseCategoryListButton/> and its title', () => {
    const enabledProps: INavFolderProps = {
      dataTestID: TestID.IMPORTANT_TASKS,
      text: LabelText.MAIN_TASKS,
      label: 'Test',
      icon: BsFillExclamationDiamondFill,
    };
    const component = render(<NavBtn {...enabledProps} />);
    expect(component).toBeTruthy();
    const { getByText } = component;
    expect(getByText('Important')).toBeInstanceOf(Node);
  });
});
