import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { NavbarContainer } from './base';
import { DanhSachSanPham, ThemSanPham } from './SanPham/components';
import { MyCart } from './MyCart/components';
import { DanhSachDonHang } from './DonHang/components';
import { ChiTietDonHang } from './DongDonHang/components';
import { recalculateItemTrueQuantity } from './utils';
import './App.css';

function App() {
  const myCart = useSelector((state) => state.MyCartReducer.myCart);

  /**
   * Tính toán số lượng sản phẩm thực tế trong giỏ hàng
   */
  const cartItemTrueQuantity = recalculateItemTrueQuantity(myCart);

  const soLuongHangTrongGio =
    cartItemTrueQuantity.length > 0 ? cartItemTrueQuantity.length : 0;

  return (
    <>
      <div className='App'>
        {/* Navbar */}
        <>
          <NavbarContainer soLuongHangTrongGio={soLuongHangTrongGio} />
        </>

        {/* Content */}
        <div className='min-vh-100'>
          <Routes>
            <Route path='/' element={<DanhSachSanPham />} />
            <Route path='/products' element={<DanhSachSanPham />} />
            <Route path='/orders' element={<DanhSachDonHang />} />
            <Route path='/orders/:id' element={<ChiTietDonHang />} />
            <Route path='/my-cart' element={<MyCart />} />
            <Route path='/add-product' element={<ThemSanPham />} />
          </Routes>
        </div>
      </div>

      <footer>
        <p>Brian, 2022. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
