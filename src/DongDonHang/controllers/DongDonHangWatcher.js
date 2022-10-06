import { takeLeading, delay } from 'redux-saga/effects';
import * as DongDonHangActions from './DongDonHangActionTypes';

export function* DongDonHangWatcher() {
  yield takeLeading(
    DongDonHangActions.CREATE_NEW_DONG_DON_HANG,
    workerCreateNewDongDonHang
  );
}
function* workerCreateNewDongDonHang(action) {
  try {
    yield delay(0);
    console.log(
      'DongDonHangWatcher is calling action CREATE_NEW_DONG_DON_HANG via workerCreateNewDongDonHang'
    );
  } catch (error) {
    console.error(error);
  }
}
