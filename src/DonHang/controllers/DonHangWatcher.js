import { takeLeading, select, put, call } from 'redux-saga/effects';

import * as MyCartActions from '../../MyCart/controllers/MyCartActionTypes';
import * as DonHangActions from './DonHangActionTypes';
import * as DongDonHangActions from '../../DongDonHang/controllers/DongDonHangActionTypes';
import { recalculateItemTrueQuantity } from '../../utils';

const myCartStorageKey = 'MY_CART_LOCAL_STORAGE_KEY';
const donHangStorageKey = 'DON_HANG_STORAGE_KEY';
const dongDonHangStorageKey = 'DONG_DON_HANG_STORAGE_KEY';

export function* DonHangWatcher() {
  yield takeLeading(DonHangActions.GET_NEW_DON_HANG, workerGetNewDonHang);
}

function* workerGetNewDonHang(action) {
  try {
    const donHang = yield select((state) => state.DonHangReducer.donHang);
    // console.group('workerGetNewDonHang');
    // console.log('payload inside workerGetNewDonHang: ', action.payload);
    // console.log('donHang inside workerGetSanPhamAddToCart: ', donHang);

    localStorage.setItem(
      donHangStorageKey,
      JSON.stringify([...donHang, action.payload])
    );

    yield put({
      type: DonHangActions.CREATE_NEW_DON_HANG,
      payload: action.payload,
    });

    // console.log(
    //   'Action CREATE_NEW_DON_HANG is triggered by workerGetNewDonHang'
    // );
    // console.groupEnd();

    yield call(workerCreateNewDongDonHang);
  } catch (err) {
    console.error(err);
  }
}

function* workerCreateNewDongDonHang(action) {
  try {
    /**
     * Truy xuất dữ liệu trong reducer
     */
    const donHang = yield select((state) => state.DonHangReducer.donHang);
    const myCart = yield select((state) => state.MyCartReducer.myCart);
    const dongDonHang = yield select(
      (state) => state.DongDonHangReducer.dongDonHang
    );

    const cartItemTrueQuantity = recalculateItemTrueQuantity(myCart);
    let idDonHang = donHang.map((item) => item.id);

    // console.group('workerCreateNewDongDonHang');
    // console.log('idDonHang inside DonHangWatcher :', idDonHang);

    let dongDonHangData = [...cartItemTrueQuantity];

    /**
     * Sửa lại dữ liệu
     */
    dongDonHangData = dongDonHangData.map((item) => {
      return {
        ...item,
        sanPham: {
          id: item.sanPham.id,
          ten: item.sanPham.ten,
          thue: item.sanPham.thue,
        },
      };
    });

    dongDonHangData = dongDonHangData.map((item) => {
      return {
        ...item,
        // ID đơn hàng mới được thêm vào cuối mảng
        // --> truy xuất đến phẩn tử cuối để lấy ra ID đơn hàng mới nhất
        // mà không làm thay đổi mảng gốc
        idDonHang: idDonHang[idDonHang.length - 1],
        tongTruocThue: parseInt(item.donGia) * parseInt(item.soLuong),
        tongThue: item.sanPham.thue * parseInt(item.soLuong),
      };
    });

    // console.log(
    //   'dongDonHangData inside workerCreateNewDongDonHang:',
    //   dongDonHangData
    // );
    // console.groupEnd();

    localStorage.setItem(
      dongDonHangStorageKey,
      JSON.stringify([...dongDonHang, ...dongDonHangData])
    );

    yield put({
      type: DongDonHangActions.CREATE_NEW_DONG_DON_HANG,
      payload: dongDonHangData,
    });

    /**
     * Clear MyCart sau khi thực hiện thành công action CREATE_NEW_DONG_DON_HANG
     */
    localStorage.setItem(myCartStorageKey, JSON.stringify([]));
    yield put({ type: MyCartActions.CLEAR_CART, payload: [] });
  } catch (error) {
    console.error(error);
  }
}
