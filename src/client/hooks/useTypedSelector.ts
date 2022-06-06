import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../slices';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
