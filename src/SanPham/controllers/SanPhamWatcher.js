import { takeLeading, put, select } from 'redux-saga/effects';

import * as SanPhamActions from './SanPhamActionTypes';

const sanPhamStorageKey = 'SAN_PHAM_LOCAL_STORAGE_KEY';

export function* SanPhamWatcher() {
  yield takeLeading(SanPhamActions.GET_NEW_SAN_PHAM, workerGetNewSanPham);
}

function* workerGetNewSanPham(action) {
  try {
    const sanPham = yield select((state) => state.SanPhamReducer.sanPham);

    // console.group('workerGetNewSanPham');
    // console.log('I run inside workerGetNewSanPham');
    // console.log('action :', action);
    // console.log('sanPham inside workerGetNewSanPham :', sanPham);
    // console.groupEnd();

    sanPham.unshift(action.payload);
    localStorage.setItem(sanPhamStorageKey, JSON.stringify(sanPham));

    yield put({
      type: SanPhamActions.CREATE_NEW_SAN_PHAM,
      payload: sanPham,
    });
  } catch (err) {
    console.error(err);
  }
}
