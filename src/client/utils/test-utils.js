import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/index';
import { BrowserRouter } from 'react-router-dom';

const ReduxRouterProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

const reduxRender = (ui, options) => {
  render(ui, { wrapper: ReduxRouterProvider }, options);
};

export * from '@testing-library/react';

export { reduxRender as render };
