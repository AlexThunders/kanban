import { combineReducers, Reducer } from 'redux';
import { IBoardData } from '../types/board';
import boardReducer from './tasks';
import ipAddressSlice from './ipAddress';
import { IPData } from '../types/ipAddress';

export interface RootState {
  board: IBoardData;
  ip: IPData;
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  board: boardReducer,
  ip: ipAddressSlice,
});

export default rootReducer;
