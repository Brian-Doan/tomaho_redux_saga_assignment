import * as DonHangActions from '../controllers/DonHangActionTypes';

const donHangStorageKey = 'DON_HANG_STORAGE_KEY';

const initialState = {
  donHang: JSON.parse(localStorage.getItem(donHangStorageKey)) || [],
};

const DonHangReducer = (state = initialState, action) => {
  switch (action.type) {
    case DonHangActions.GET_NEW_DON_HANG:
      return { ...state };
    case DonHangActions.CREATE_NEW_DON_HANG:
      return {
        ...state,
        donHang: [...state.donHang, action.payload],
      };
    default:
      return state;
  }
};

export default DonHangReducer;
