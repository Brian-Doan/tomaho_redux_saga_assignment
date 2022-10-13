import { takeLeading, put, select } from 'redux-saga/effects';

import * as MyCartActions from './MyCartActionTypes';

const myCartStorageKey = 'MY_CART_LOCAL_STORAGE_KEY';

export function* MyCartWatcher() {
  yield takeLeading(
    MyCartActions.GET_SAN_PHAM_ADD_TO_CART,
    workerGetSanPhamAddToCart
  );
}

function* workerGetSanPhamAddToCart(action) {
  try {
    // console.group('workerGetSanPhamAddToCart');
    // console.log('payload inside workerGetSanPhamAddToCart: ', action.payload);
    const myCart = yield select((state) => state.MyCartReducer.myCart);
    // console.log('myCart inside workerGetSanPhamAddToCart: ', myCart);
    // console.groupEnd();

    localStorage.setItem(
      myCartStorageKey,
      JSON.stringify([...myCart, action.payload])
    );

    yield put({
      type: MyCartActions.ADD_TO_CART,
      payload: action.payload,
    });

    // console.log('Action ADD_TO_CART is triggered by workerGetSanPhamAddToCart');
  } catch (err) {
    console.error(err);
  }
}
