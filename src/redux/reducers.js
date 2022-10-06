import { combineReducers } from 'redux';

import SanPhamReducer from '../SanPham/models/SanPhamReducer';
import MyCartReducer from '../MyCart/models/MyCartReducer';
import DonHangReducer from '../DonHang/models/DonHangReducer';
import DongDonHangReducer from '../DongDonHang/models/DongDonHangReducer';

const rootReducer = combineReducers({
  SanPhamReducer,
  DonHangReducer,
  DongDonHangReducer,
  MyCartReducer,
});

export default rootReducer;
