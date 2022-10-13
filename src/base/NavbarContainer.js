import { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsCart } from 'react-icons/bs';
import { AiOutlineMenu } from 'react-icons/ai';

import { ProductFilteredContext } from '../App';
import { SearchBox } from '../base';
import '../styles/NavbarContainer.scss';

const NavbarContainer = ({ soLuongHangTrongGio }) => {
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);
  const { pathname } = useLocation();
  const [, setProductFiltered] = useContext(ProductFilteredContext);

  useEffect(() => {
    setToggleMobileMenu(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  /**
   * Xử lý logic
   */
  const handleResetProductFiltered = () => {
    setProductFiltered('');
  };

  const handleToggleMobileMenu = () => {
    setToggleMobileMenu(!toggleMobileMenu);
  };

  return (
    <div className='header'>
      <nav className='navbar-container'>
        <div className='navbar-container__logo'>
          <Link to='/products'>
            <img
              src='https://tomahosoft.com/wp-content/uploads/2021/09/LOGO-TOMAHO-FINAL-1.png'
              alt='navbar-logo'
              className='navbar-container__logo-img'
              onClick={handleResetProductFiltered}
            />
          </Link>
        </div>

        <div className='navigation'>
          <Link to='/products' onClick={handleResetProductFiltered}>
            <div />
            Products
          </Link>
          <Link to='/orders' onClick={handleResetProductFiltered}>
            <div />
            Orders
          </Link>
        </div>

        <SearchBox />

        <div className='navbar-container__mobile'>
          <Link to='/my-cart'>
            <div className='navbar-container__cart'>
              <BsCart size={30} />
              <div className='navbar-container__cart-badge'>
                {soLuongHangTrongGio}
              </div>
            </div>
          </Link>

          <div className='navbar-container__mobile-menu'>
            <button
              className='mobile-menu__button'
              onClick={handleToggleMobileMenu}
            >
              <AiOutlineMenu size={30} />
            </button>
          </div>
        </div>
      </nav>

      {toggleMobileMenu && (
        <div className='navigation__mobile'>
          <ul>
            <li>
              <Link to='/products' onClick={handleToggleMobileMenu}>
                Products
              </Link>
            </li>
            <li>
              <Link to='/orders' onClick={handleToggleMobileMenu}>
                Orders
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavbarContainer;
