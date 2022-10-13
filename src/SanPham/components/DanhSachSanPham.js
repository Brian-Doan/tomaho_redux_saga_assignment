import React, { useEffect, useState, useContext } from 'react';
import { BsCart } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

import { ProductFilteredContext } from '../../App';
import { ProductCardWrapper, Sidebar } from '../../base';
import * as MyCartActions from '../../MyCart/controllers/MyCartActionTypes';
import { recalculateItemTrueQuantity } from '../../utils';
import '../../styles/DanhSachSanPham.scss';

const DanhSachSanPham = () => {
  const dispatch = useDispatch();
  const [productFiltered, setProductFiltered] = useContext(
    ProductFilteredContext
  );

  /**
   * Lấy state từ Reducer
   */
  const sanPham = useSelector((state) => state.SanPhamReducer.sanPham);
  const myCart = useSelector((state) => state.MyCartReducer.myCart);

  let sanPhamCopy = sanPham.filter((item) =>
    item.ten.toLowerCase().includes(productFiltered.toLowerCase())
  );

  // console.group('productFiltered inside DanhSachSanPham');
  // console.log('productFiltered :', productFiltered);
  // console.log('sanPham inside DanhSachSanPham :', sanPham);
  // console.log('sanPhamCopy inside DanhSachSanPham :', sanPhamCopy);
  // console.groupEnd();

  useEffect(() => {
    return () => {
      setProductFiltered('');
    };
    // eslint-disable-next-line
  }, []);

  /**
   * Local states
   */
  const [quantity, setQuantity] = useState(1);
  const [selectedItemId, setSelectedItemId] = useState(0);

  /**
   * Tính toán lại số lượng sản phẩm thực tế trong giỏ hàng
   */
  const cartItemTrueQuantity = recalculateItemTrueQuantity(myCart);

  /**
   * Xử lý logic
   */
  const handleResetProductFiltered = () => {
    setProductFiltered('');
  };

  const handleKeyPress = (event) => {
    // Chỉ cho phép nhập số tự nhiên
    if (event.key.match(/\D/g)) {
      event.preventDefault();
    }
  };

  const handleChangeQuantity = (event, id) => {
    setSelectedItemId(id);
    setQuantity(event.currentTarget.value);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
  };

  const handleAddToCart = (id) => {
    const selectedItem = sanPham.filter((item) => item.id === id)[0];

    dispatch({
      type: MyCartActions.GET_SAN_PHAM_ADD_TO_CART,
      payload: {
        donGia: selectedItem.donGia,
        sanPham: selectedItem,
        soLuong:
          id === selectedItemId
            ? Number.isNaN(quantity)
              ? 1
              : parseInt(quantity)
            : 1,
      },
    });

    setQuantity(id === selectedItemId ? 1 : quantity);
  };

  return (
    <>
      <Sidebar setProductFiltered={(value) => setProductFiltered(value)} />

      <div style={{ flex: 1 }}>
        {/* Custom header */}
        <div className='page-header'>
          <div className='header__title'>
            <h1>DANH SÁCH SẢN PHẨM</h1>
          </div>
          <div className='header__add-product-button'>
            <Link to='/add-product' onClick={handleResetProductFiltered}>
              <button className='header-button'></button>
            </Link>
          </div>
        </div>

        {/* Content container */}
        <div>
          <div className='products'>
            {sanPhamCopy.length > 0 ? (
              sanPhamCopy.map((item) => (
                <div key={item.id} className='product-card'>
                  <ProductCardWrapper
                    item={item}
                    cartItemTrueQuantity={cartItemTrueQuantity}
                  />

                  {/* Form quản lý hành vi ADD_TO_CART */}
                  <Form onSubmit={handleSubmitForm}>
                    <div className='product-card__add-to-cart-form'>
                      <Form.Group>
                        <Form.Control
                          type='number'
                          min={1}
                          placeholder={quantity}
                          name='quantity'
                          value={selectedItemId === item.id ? quantity : 1}
                          onChange={(event) =>
                            handleChangeQuantity(event, item.id)
                          }
                          onKeyPress={handleKeyPress}
                          className='w-75'
                        />
                      </Form.Group>
                      <Button
                        variant='success'
                        size='md'
                        className='w-50 mx-auto btn-sm'
                        type='submit'
                        onClick={() => handleAddToCart(item.id)}
                      >
                        <BsCart />
                      </Button>
                    </div>
                  </Form>
                </div>
              ))
            ) : (
              <Container>
                <Row>
                  <Col md={10} className='ms-auto me-auto'>
                    <Card>
                      <Card.Title as='h3' className='mt-2'>
                        Hình như chưa có sản phẩm nào ? &#129300;
                      </Card.Title>
                      <Card.Text as='h4'>
                        Cùng thêm sản phẩm mới thôi nào! &#128071;
                      </Card.Text>
                      <Card.Body
                        style={{ width: '100%', height: 'fit-content' }}
                      >
                        <Link to='/add-product'>
                          <Card.Img
                            src='https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_1280.png'
                            className='img-thumbnail'
                            style={{ width: '50%', objectFit: 'contain' }}
                          />
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DanhSachSanPham;
