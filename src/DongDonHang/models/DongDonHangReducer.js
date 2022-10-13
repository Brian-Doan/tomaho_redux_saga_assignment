import * as DongDonHangActions from '../controllers/DongDonHangActionTypes';

const dongDonHangStorageKey = 'DONG_DON_HANG_STORAGE_KEY';

const initialState = {
  dongDonHang: JSON.parse(localStorage.getItem(dongDonHangStorageKey)) || [],
};

const DongDonHangReducer = (state = initialState, action) => {
  switch (action.type) {
    case DongDonHangActions.CREATE_NEW_DONG_DON_HANG:
      // console.group('DongDonHangReducer');
      // console.log('payload inside DongDonHangReducer: ', action.payload);
      // console.groupEnd();

      return {
        ...state,
        dongDonHang: [...state.dongDonHang, ...action.payload],
      };
    default:
      return state;
  }
};

export default DongDonHangReducer;
