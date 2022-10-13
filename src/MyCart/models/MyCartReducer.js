import * as MyCartActions from '../controllers/MyCartActionTypes';

const myCartStorageKey = 'MY_CART_LOCAL_STORAGE_KEY';

const initialState = {
  myCart: JSON.parse(localStorage.getItem(myCartStorageKey)) || [],
};

const MyCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case MyCartActions.ADD_TO_CART:
      // console.group('MyCartReducer');
      // console.log('I run inside MyCartReducer');
      // console.log('payload inside MyCartReducer :', action.payload);
      // console.groupEnd();

      return {
        ...state,
        myCart: [...state.myCart, action.payload],
      };
    case MyCartActions.CLEAR_CART:
      // console.group('MyCartReducer');
      // console.log('Action CLEAR_CART is triggered');
      // console.groupEnd();

      return {
        ...state,
        myCart: action.payload,
      };
    default:
      return state;
  }
};

export default MyCartReducer;
