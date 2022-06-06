import { all, put, call, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { fetchIpData } from '../api/fetchIP';
import { fetchIpSuccess, fetchIpFailure } from '../slices/ipAddress';
import { IPData } from '../types/ipAddress';

export function* fetchIP() {
  const ipData: IPData = {
    ip: '',
    country: '',
    city: '',
    loading: false,
    error: null,
  };
  try {
    const res: AxiosResponse = yield call(fetchIpData);
    ipData.ip = res.data.ip;
    ipData.country = res.data.country;
    ipData.city = res.data.city;
    ipData.loading = false;
    ipData.error = null;
    yield put(fetchIpSuccess(ipData));
  } catch (err: any) {
    ipData.error = err.message;
    ipData.loading = false;
    yield put(fetchIpFailure(ipData));
  }
}

export function* actionWatcher() {
  yield takeEvery('ipAddress/fetchIpAddress', fetchIP);
}

function* rootSaga() {
  yield all([actionWatcher()]);
}

export default rootSaga;
