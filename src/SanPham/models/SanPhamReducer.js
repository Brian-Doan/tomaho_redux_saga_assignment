import * as SanPhamActions from '../controllers/SanPhamActionTypes';

const sanPhamStorageKey = 'SAN_PHAM_LOCAL_STORAGE_KEY';

const initialState = {
  sanPham: JSON.parse(localStorage.getItem(sanPhamStorageKey)) || [],
};

const SanPhamReducer = (state = initialState, action) => {
  switch (action.type) {
    case SanPhamActions.CREATE_NEW_SAN_PHAM:
      const copyOfSanPham = [...state.sanPham];

      copyOfSanPham.splice(0, 0, action.payload);

      return {
        ...state,
        sanPham: copyOfSanPham,
      };
    default:
      return state;
  }
};

export default SanPhamReducer;
