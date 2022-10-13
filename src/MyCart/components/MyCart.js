import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import uuid from 'react-uuid';

import * as DonHangActions from '../../DonHang/controllers/DonHangActionTypes';
import { calculateMyCart, recalculateItemTrueQuantity } from '../../utils';

const MyCart = () => {
  const dispatch = useDispatch();
  const tableHeader = ['Tên sản phẩm', 'Đơn giá', 'Số lượng', 'Thành tiền'];

  /**
   * Lấy state từ Reducer
   */
  const myCart = useSelector((state) => state.MyCartReducer.myCart);

  /**
   * Tính toán số lượng thực tế của các sản phẩm trong giỏ hàng
   */
  const cartItemTrueQuantity = recalculateItemTrueQuantity(myCart);

  /**
   * Tính toán tiền và thuế của các sản phẩm trong giỏ hàng
   */
  const { tongTruocThue, tongThue, tongThanhTien } = calculateMyCart(myCart);

  /**
   * Xử lý logic
   */
  const handleCreateNewDonHang = () => {
    // Tạo id cho từng đơn hàng
    const id = uuid().split('-')[0];

    dispatch({
      type: DonHangActions.GET_NEW_DON_HANG,
      payload: {
        id,
        ten: `Đơn hàng ${id}`,
        tongTruocThue,
        tongThue,
        tongThanhTien,
      },
    });

    window.scrollTo(0, 0);
  };

  return (
    <div className='pt-2 table-wrapper'>
      <div className='page-header'>
        <div className='header__title'>
          <h1>MY CART</h1>
        </div>
      </div>

      {/* Bảng thống kê */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            {tableHeader.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cartItemTrueQuantity.length > 0 ? (
            cartItemTrueQuantity.map((item, index) => (
              <tr key={item.sanPham.id + '-' + index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={item.sanPham.imgUrl}
                    alt={item.sanPham.ten}
                    width='80'
                    height='80'
                    style={{ objectFit: 'cover' }}
                  />
                </td>
                <td>{item.sanPham.ten}</td>
                <td>{parseInt(item.donGia).toLocaleString()} VNĐ</td>
                <td>{item.soLuong}</td>
                <td>
                  {(
                    parseInt(item.soLuong) * parseInt(item.donGia)
                  ).toLocaleString()}{' '}
                  VNĐ
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>
                Chưa có sản phẩm trong giỏ.{' '}
                <Link to='/products' style={{ color: '#0a58ca' }}>
                  Vào đây để thêm sản phẩm nhé!
                </Link>
              </td>
            </tr>
          )}
        </tbody>
        <tfoot className='fw-bold'>
          <tr>
            <td colSpan={4}>Tổng trước thuế</td>
            <td colSpan={2}>{tongTruocThue.toLocaleString()} VNĐ</td>
          </tr>
          <tr>
            <td colSpan={4}>Tổng thuế</td>
            <td colSpan={2}>{tongThue.toLocaleString()} VNĐ</td>
          </tr>
          <tr>
            <td colSpan={4}>Tổng thành tiền</td>
            <td colSpan={2}>{tongThanhTien.toLocaleString()} VNĐ</td>
          </tr>
        </tfoot>
      </Table>

      <Container className='mx-0 px-0 mw-100'>
        <Row className='mb-2'>
          <Col>
            <Button
              className='d-block ms-auto'
              onClick={handleCreateNewDonHang}
              variant='success'
            >
              THANH TOÁN
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className='d-flex gap-2 justify-content-end'>
            <Link to='/orders'>
              <Button className='d-block ms-auto text-white' variant='info'>
                XEM ĐƠN HÀNG
              </Button>
            </Link>
            <Link to='/products'>
              <Button className='d-block ms-auto' variant='secondary'>
                VỀ TRANG SẢN PHẨM
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyCart;
