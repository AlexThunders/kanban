import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPData } from '../types/ipAddress';

export const initialState: IPData = {
  ip: '',
  country: '',
  city: '...',
  loading: false,
  error: null,
};

const ipAddressSlice = createSlice({
  name: 'ipAddress',
  initialState,
  reducers: {
    fetchIpAddress: (state) => {
      state.loading = true;
    },

    fetchIpSuccess: (state, { payload }: PayloadAction<IPData>) => {
      state.ip = payload.ip;
      state.country = payload.country;
      state.city = payload.city;
      state.loading = payload.loading;
      state.error = payload.error;
    },
    fetchIpFailure: (state, { payload }: PayloadAction<IPData>) => {
      state.error = payload.error;
      state.loading = payload.loading;
    },
  },
});

export const { fetchIpAddress, fetchIpSuccess, fetchIpFailure } =
  ipAddressSlice.actions;

export default ipAddressSlice.reducer;
