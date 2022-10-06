import { takeLeading, delay } from 'redux-saga/effects';
import * as MyCartActions from './MyCartActionTypes';

export function* MyCartWatcher() {
  yield takeLeading(MyCartActions.ADD_TO_CART, workerAddToCart);
}

function* workerAddToCart(action) {
  try {
    yield delay(0);

    console.log('Action ADD_TO_CART is triggered by workerAddToCart');
  } catch (error) {
    console.error(error);
  }
}
