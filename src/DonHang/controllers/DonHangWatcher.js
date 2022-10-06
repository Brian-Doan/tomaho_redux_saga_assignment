import { takeLeading, select, put } from 'redux-saga/effects';

import * as DonHangActions from './DonHangActionTypes';
import * as DongDonHangActions from '../../DongDonHang/controllers/DongDonHangActionTypes';
import * as MyCartActions from '../../MyCart/controllers/MyCartActionTypes';
import { recalculateItemTrueQuantity } from '../../utils';

export function* DonHangWatcher() {
  yield takeLeading(DonHangActions.CREATE_NEW_DON_HANG, workerCreateNewDonHang);
}

function* workerCreateNewDonHang(action) {
  try {
    /**
     * Truy xuất dữ liệu trong reducer
     */
    const donHang = yield select((state) => state.DonHangReducer.donHang);
    const myCart = yield select((state) => state.MyCartReducer.myCart);

    const cartItemTrueQuantity = recalculateItemTrueQuantity(myCart);

    let idDonHang = donHang.map((item) => item.id);

    yield put({
      type: DongDonHangActions.CREATE_NEW_DONG_DON_HANG,
      payload: {
        // ID của đơn hàng mới nhất được thêm vào cuối chuỗi
        // --> dùng pop() để lấy ID
        idDonHang: idDonHang.pop(),
        cartItemTrueQuantity,
      },
    });

    yield put({ type: MyCartActions.CLEAR_CART });
  } catch (error) {
    console.error(error);
  }
}
