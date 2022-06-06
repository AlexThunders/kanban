import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../slices';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  devTools: process.env.NODE_ENV !== 'production',
});

store.subscribe(() => {
  localStorage.setItem('board', JSON.stringify(store.getState().board));
});

sagaMiddleware.run(rootSaga);
