import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarContainer = ({ soLuongHangTrongGio }) => {
  return (
    <Navbar bg='white' expand='lg' className='my-2'>
      <Container>
        <Nav.Item className='me-3'>
          <Link to='/products'>
            <img
              src='https://tomahosoft.com/wp-content/uploads/2021/09/LOGO-TOMAHO-FINAL-1.png'
              alt='logo'
              width={160}
              height={60}
            />
          </Link>
        </Nav.Item>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto fs-5'>
            <Nav.Item className='mt-2 me-md-3 me-sm-0 mt-lg-0 mt-xl-0 mt-xxl-0'>
              <Link to='/products' className='d-block w-100'>
                Sản phẩm
              </Link>
            </Nav.Item>
            <Nav.Item className='mt-2 me-md-3 me-sm-0 mt-lg-0 mt-xl-0 mt-xxl-0'>
              <Link to='/orders' className='d-block w-100'>
                Đơn hàng
              </Link>
            </Nav.Item>
            <Nav.Item className='mt-2 me-md-3 me-sm-0 mt-lg-0 mt-xl-0 mt-xxl-0'>
              <Link to='/my-cart' className='d-block w-100'>
                Giỏ hàng của tôi ({soLuongHangTrongGio})
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarContainer;
