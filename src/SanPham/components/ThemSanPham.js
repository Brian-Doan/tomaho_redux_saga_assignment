import { useState, memo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import * as SanPhamActions from '../controllers/SanPhamActionTypes';

const sanPhamStorageKey = 'SAN_PHAM_LOCAL_STORAGE_KEY';

const ThemSanPham = () => {
  const dispatch = useDispatch();
  const spinnerRef = useRef();

  /**
   * Local states
   */
  const [newProduct, setNewProduct] = useState({
    ten: '',
    imgUrl: '',
    donGia: '',
    thue: '',
  });
  const [storageSanPham, setStorageSanPham] = useState(
    JSON.parse(localStorage.getItem(sanPhamStorageKey)) || []
  );

  useEffect(() => {
    localStorage.setItem(sanPhamStorageKey, JSON.stringify(storageSanPham));
  }, [storageSanPham]);

  /**
   * Xử lý logic
   */
  const handleChangeInput = (event) => {
    setNewProduct({
      ...newProduct,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleCreateNewSanPham = (event) => {
    event.preventDefault();

    spinnerRef.current.style.display = 'flex';
    setTimeout(() => {
      spinnerRef.current.style.display = 'none';
    }, 1000);

    dispatch({
      type: SanPhamActions.CREATE_NEW_SAN_PHAM,
      payload: {
        id: storageSanPham.length === 0 ? 1 : storageSanPham.length + 1,
        ten: newProduct.ten,
        imgUrl: newProduct.imgUrl,
        donGia: newProduct.donGia,
        thue: newProduct.thue,
      },
    });

    setStorageSanPham((prev) => [
      {
        id: storageSanPham.length === 0 ? 1 : storageSanPham.length + 1,
        ten: newProduct.ten,
        imgUrl: newProduct.imgUrl,
        donGia: newProduct.donGia,
        thue: newProduct.thue,
      },
      ...prev,
    ]);

    setNewProduct({
      ten: '',
      imgUrl: '',
      donGia: '',
      thue: '',
    });
  };

  return (
    <>
      {/* Form thêm sản phẩm mới */}
      <Form onSubmit={handleCreateNewSanPham}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Tên sản phẩm</Form.Label>
          <Form.Control
            type='text'
            placeholder='Nhập tên sản phẩm. VD: iPhone 69...'
            name='ten'
            value={newProduct.ten}
            onChange={handleChangeInput}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Link hình ảnh</Form.Label>
          <Form.Control
            type='text'
            placeholder='Nhập link hình ảnh. VD: https://some-random-page.com/image-url...'
            name='imgUrl'
            value={newProduct.imgUrl}
            onChange={handleChangeInput}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Đơn giá</Form.Label>
          <Form.Control
            type='text'
            placeholder='Nhập đơn giá. VD: 1000000...'
            name='donGia'
            value={newProduct.donGia}
            onChange={handleChangeInput}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Tiền thuế</Form.Label>
          <Form.Control
            type='text'
            placeholder='Nhập tiền thuế. VD: 1000000...'
            name='thue'
            value={newProduct.thue}
            onChange={handleChangeInput}
            required
          />
        </Form.Group>

        <div className='d-flex gap-2 justify-content-end'>
          <Link to='/products'>
            <Button variant='secondary' type='submit'>
              Về trang sản phẩm
            </Button>
          </Link>
          <Button variant='primary' type='submit'>
            Thêm sản phẩm
          </Button>
        </div>
      </Form>

      {/* Spinner */}
      <div
        ref={spinnerRef}
        style={{ display: 'none' }}
        className='position-fixed top-0 bottom-0 start-0 end-0 align-items-center justify-content-center bg-secondary bg-opacity-50'
      >
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </div>
    </>
  );
};

export default memo(ThemSanPham);
