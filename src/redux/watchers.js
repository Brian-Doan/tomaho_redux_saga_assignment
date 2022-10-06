import { all } from 'redux-saga/effects';

import { SanPhamWatcher } from '../SanPham/controllers/SanPhamWatcher';
import { MyCartWatcher } from '../MyCart/controllers/MyCartWatcher';
import { DonHangWatcher } from '../DonHang/controllers/DonHangWatcher';
import { DongDonHangWatcher } from '../DongDonHang/controllers/DongDonHangWatcher';

export default function* rootSaga() {
  yield all([
    SanPhamWatcher(),
    DonHangWatcher(),
    DongDonHangWatcher(),
    MyCartWatcher(),
  ]);
}
