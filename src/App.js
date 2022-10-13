import { useState, createContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { AiOutlineArrowUp } from 'react-icons/ai';

import { NavbarContainer, Footer } from './base';
import { useStore } from './base/store';
import { DanhSachSanPham, ThemSanPham } from './SanPham/components';
import { MyCart } from './MyCart/components';
import { DanhSachDonHang } from './DonHang/components';
import { ChiTietDonHang } from './DongDonHang/components';
import { recalculateItemTrueQuantity } from './utils';
import './App.scss';

const ProductFilteredContext = createContext();

function App() {
  const myCart = useSelector((state) => state.MyCartReducer.myCart);
  const [state] = useStore();
  const { searchInput } = state;
  const [productFiltered, setProductFiltered] = useState(searchInput);
  const [toggleScrollTop, setToggleScrollTop] = useState(false);

  // console.group('Search input inside App');
  // console.log('searchInput :', searchInput);
  // console.log('productFiltered :', productFiltered);
  // console.groupEnd();

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setToggleScrollTop(true);
    } else if (scrolled <= 500) {
      setToggleScrollTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
  }, []);

  /**
   * Tính toán số lượng sản phẩm thực tế trong giỏ hàng
   */
  const cartItemTrueQuantity = recalculateItemTrueQuantity(myCart);

  const soLuongHangTrongGio =
    cartItemTrueQuantity.length > 0 ? cartItemTrueQuantity.length : 0;

  return (
    <ProductFilteredContext.Provider
      value={[productFiltered, setProductFiltered]}
    >
      <div className='App'>
        {/* Navbar */}
        <NavbarContainer soLuongHangTrongGio={soLuongHangTrongGio} />

        {/* Scroll to Top button */}
        <button
          type='button'
          className='scroll-top'
          style={{ display: toggleScrollTop ? 'block' : 'none' }}
          onClick={scrollToTop}
        >
          <AiOutlineArrowUp size={20} />
        </button>

        {/* Content */}
        <div className='min-vh-100 main-content'>
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

      <Footer />
    </ProductFilteredContext.Provider>
  );
}

export { ProductFilteredContext };
export default App;
