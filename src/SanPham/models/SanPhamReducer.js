import * as SanPhamActions from '../controllers/SanPhamActionTypes';

const sanPhamStorageKey = 'SAN_PHAM_LOCAL_STORAGE_KEY';

const initialState = {
  sanPham: JSON.parse(localStorage.getItem(sanPhamStorageKey)) || [],
};

const SanPhamReducer = (state = initialState, action) => {
  switch (action.type) {
    case SanPhamActions.GET_NEW_SAN_PHAM:
      return { ...state };
    case SanPhamActions.CREATE_NEW_SAN_PHAM:
      // console.group('SanPhamReducer');
      // console.log('state inside SanPhamReducer:', state);
      // console.log('payload inside SanPhamReducer:', action.payload);
      // console.groupEnd();

      return {
        ...state,
        sanPham: action.payload,
      };
    default:
      return state;
  }
};

export default SanPhamReducer;
