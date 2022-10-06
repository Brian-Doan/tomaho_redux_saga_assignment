import * as DongDonHangActions from '../controllers/DongDonHangActionTypes';

const dongDonHangStorageKey = 'DONG_DON_HANG_STORAGE_KEY';

const initialState = {
  dongDonHang: JSON.parse(localStorage.getItem(dongDonHangStorageKey)) || [],
};

const DongDonHangReducer = (state = initialState, action) => {
  switch (action.type) {
    case DongDonHangActions.CREATE_NEW_DONG_DON_HANG:
      const { idDonHang, cartItemTrueQuantity } = action.payload;

      let dongDonHangData = [...cartItemTrueQuantity];

      // Sửa lại dữ liệu
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
          idDonHang,
          tongTruocThue: parseInt(item.donGia) * parseInt(item.soLuong),
          tongThue: item.sanPham.thue * parseInt(item.soLuong),
        };
      });

      localStorage.setItem(
        dongDonHangStorageKey,
        JSON.stringify([...state.dongDonHang, ...dongDonHangData])
      );

      return {
        ...state,
        dongDonHang: [...state.dongDonHang, ...dongDonHangData],
      };
    default:
      return state;
  }
};

export default DongDonHangReducer;
