import { takeLeading, put } from 'redux-saga/effects';
import * as SanPhamActions from './SanPhamActionTypes';

export function* SanPhamWatcher() {
  yield takeLeading(SanPhamActions.CREATE_NEW_SAN_PHAM, workerCreateNewSanPham);
}

function* workerCreateNewSanPham(action) {
  try {
    yield put({
      type: action,
    });
    console.log(
      'Action CREATE_NEW_SAN_PHAM is triggered by workerCreateNewSanPham'
    );
  } catch (error) {
    console.error(error);
  }
}
