import * as MyCartActions from '../controllers/MyCartActionTypes';

const myCartStorageKey = 'MY_CART_LOCAL_STORAGE_KEY';

const initialState = {
  myCart: JSON.parse(localStorage.getItem(myCartStorageKey)) || [],
};

const MyCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case MyCartActions.ADD_TO_CART:
      return {
        ...state,
        myCart: [...state.myCart, action.payload],
      };
    case MyCartActions.CLEAR_CART:
      console.log('Action CLEAR_CART is triggered by workerCreateNewDonHang');

      localStorage.setItem(myCartStorageKey, JSON.stringify([]));

      return {
        ...state,
        myCart: [],
      };
    default:
      return state;
  }
};

export default MyCartReducer;
