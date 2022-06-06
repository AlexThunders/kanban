import '@testing-library/jest-dom';
import { render, screen, waitFor } from '../../../utils/test-utils';
import AppSidebar from '..';
// import AddTaskMenu from '../../Portals/AddTaskMenu';
// import ActionButton from '../../../components/AppSidebar/ActionButton';

describe('<ActionButton>', () => {
  it('opens <AddTaskMenu /> after click Add task', async () => {
    render(<AppSidebar />);
    // const handleClick = jest.fn();

    const addTaskBtn = screen.getByText(/add task/i);
    expect(addTaskBtn).toBeInTheDocument();
    // fireEvent.click(addTaskBtn);
    // expect(handleClick).toHaveBeenCalledTimes(1);
    // expect(screen.getByTestId('Enter a new task')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByTestId('Enter a new task')).toBeInTheDocument()
    );
  });
});
