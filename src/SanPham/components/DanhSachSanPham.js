import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

import * as MyCartActions from '../../MyCart/controllers/MyCartActionTypes';
import { recalculateItemTrueQuantity } from '../../utils';

const myCartStorageKey = 'MY_CART_LOCAL_STORAGE_KEY';

const DanhSachSanPham = () => {
  const dispatch = useDispatch();

  /**
   * Lấy state từ Reducer
   */
  const sanPham = useSelector((state) => state.SanPhamReducer.sanPham);
  const myCart = useSelector((state) => state.MyCartReducer.myCart);

  /**
   * Local states
   */
  const [quantity, setQuantity] = useState(1);
  const [selectedItemId, setSelectedItemId] = useState(0);
  const [myCartStorage, setMyCartStorage] = useState(
    JSON.parse(localStorage.getItem(myCartStorageKey)) || []
  );

  useEffect(() => {
    localStorage.setItem(myCartStorageKey, JSON.stringify(myCartStorage));
  }, [myCartStorage]);

  /**
   * Tính toán lại số lượng sản phẩm thực tế trong giỏ hàng
   */
  const cartItemTrueQuantity = recalculateItemTrueQuantity(myCart);

  /**
   * Xử lý logic
   */
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
      type: MyCartActions.ADD_TO_CART,
      payload: {
        donGia: selectedItem.donGia,
        sanPham: selectedItem,
        soLuong: id === selectedItemId ? parseInt(quantity) : 1,
      },
    });

    setMyCartStorage((prev) => [
      ...prev,
      {
        donGia: selectedItem.donGia,
        sanPham: selectedItem,
        soLuong: id === selectedItemId ? parseInt(quantity) : 1,
      },
    ]);

    setQuantity(id === selectedItemId ? 1 : quantity);
  };

  return (
    <>
      {/* Header */}
      <Container className='mb-4 border-top pt-4'>
        <Row>
          <Col className='col-md-8 col-sm-7 d-flex align-items-end'>
            <h2 className='float-start page-title'>DANH SÁCH SẢN PHẨM</h2>
          </Col>
          <Col>
            <Link to='/add-product'>
              <Button className='float-end'>+ Thêm sản phẩm</Button>
            </Link>
          </Col>
        </Row>
      </Container>

      {/* Content */}
      <Container className='my-4'>
        <Row>
          {sanPham.length > 0 ? (
            sanPham.map((item) => (
              <Col key={item.id} className='col-lg-3 col-md-4 col-sm-6 col-12'>
                <Card
                  style={{ marginBottom: '20px' }}
                  className='ms-auto me-auto'
                >
                  <Card.Img
                    variant='top'
                    src={item.imgUrl}
                    className='img-thumbnail'
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title style={{ height: '48px' }}>
                      {item.ten}
                    </Card.Title>
                    <Card.Text>
                      Giá: {parseInt(item.donGia).toLocaleString()} VNĐ
                    </Card.Text>
                    <Card.Text>
                      Thuế: {parseInt(item.thue).toLocaleString()} VNĐ
                    </Card.Text>
                    {cartItemTrueQuantity.length > 0 ? (
                      cartItemTrueQuantity.map(
                        (cartItem) =>
                          cartItem.sanPham.id === item.id && (
                            <Card.Text
                              key={cartItem.sanPham.id}
                              className='py-1 bg-info text-white'
                            >
                              Đã thêm vào giỏ: {cartItem.soLuong}
                            </Card.Text>
                          )
                      )
                    ) : (
                      <></>
                    )}
                  </Card.Body>

                  {/* Form quản lý hành vi ADD_TO_CART */}
                  <Form onSubmit={handleSubmitForm}>
                    <div className='add-to-cart-form'>
                      <Form.Group>
                        <Form.Control
                          type='number'
                          placeholder={quantity}
                          name='quantity'
                          value={selectedItemId === item.id ? quantity : 1}
                          onChange={(event) =>
                            handleChangeQuantity(event, item.id)
                          }
                          className='w-75'
                        />
                      </Form.Group>
                      <Button
                        variant='success'
                        size='md'
                        className='w-100 mx-auto btn-sm'
                        type='submit'
                        onClick={() => handleAddToCart(item.id)}
                      >
                        Thêm vào Giỏ hàng
                      </Button>
                    </div>
                  </Form>
                </Card>
              </Col>
            ))
          ) : (
            <Col md={10} className='ms-auto me-auto'>
              <Card>
                <Card.Title as='h3' className='mt-2'>
                  Hình như chưa có sản phẩm nào ? &#129300;
                </Card.Title>
                <Card.Text as='h4'>
                  Cùng thêm sản phẩm mới thôi nào! &#128071;
                </Card.Text>
                <Card.Body>
                  <Link to='/add-product'>
                    <Card.Img
                      src='https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_1280.png'
                      className='img-thumbnail'
                      style={{ width: '400px', objectFit: 'cover' }}
                    />
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default DanhSachSanPham;
