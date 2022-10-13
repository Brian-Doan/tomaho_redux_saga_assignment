import { useState, memo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import * as SanPhamActions from '../controllers/SanPhamActionTypes';
import '../../styles/ThemSanPham.scss';

const ThemSanPham = () => {
  const dispatch = useDispatch();
  const spinnerRef = useRef();
  const fileInput = useRef();

  const sanPham = useSelector((state) => state.SanPhamReducer.sanPham);

  // console.group('ThemSanPham')
  // console.log('sanPham inside ThemSanPham :', sanPham);
  // console.log('fileInput inside ThemSanPham :', fileInput.current);
  // console.groupEnd()

  /**
   * Local states
   */
  const [newProduct, setNewProduct] = useState({
    ten: '',
    imgUrl: '',
    donGia: 0,
    thue: 0,
  });
  const [imgPreview, setImgPreview] = useState();
  const [imgUrl, setImgUrl] = useState();

  /**
   * Xử lý logic
   */
  const handleKeyPress = (event) => {
    // Chỉ cho phép nhập số tự nhiên
    if (event.key.match(/\D/g)) {
      event.preventDefault();
    }
  };

  const handleChangeInput = (event) => {
    setNewProduct({
      ...newProduct,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    const reader = new window.FileReader();
    const imgUrlPreview = URL.createObjectURL(file);

    setImgPreview(imgUrlPreview);

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgUrl(reader.result);
    };

    event.preventDefault();
  };

  // Xoá ảnh preview khi component unmounted
  // tránh bị memory leak vì imgUrlPreview được tạo từ URL.createObjectURL
  // sẽ được lưu trong bộ nhớ cho đến khi tắt trình duyệt
  useEffect(() => {
    return () => {
      imgPreview && URL.revokeObjectURL(imgPreview);
    };
  }, [imgPreview]);

  const handleCreateNewSanPham = (event) => {
    event.preventDefault();

    // Spinner
    spinnerRef.current.style.display = 'flex';
    setTimeout(() => {
      spinnerRef.current.style.display = 'none';
    }, 1000);

    // Dispatch action
    dispatch({
      type: SanPhamActions.GET_NEW_SAN_PHAM,
      payload: {
        id: sanPham.length === 0 ? 1 : sanPham.length + 1,
        ten: newProduct.ten,
        // imgUrl: newProduct.imgUrl || 'https://via.placeholder.com/150',
        imgUrl: imgUrl || 'https://via.placeholder.com/150',
        donGia: newProduct.donGia,
        thue: newProduct.thue,
      },
    });

    // Reset inputs
    setNewProduct({
      ten: '',
      imgUrl: '',
      donGia: 0,
      thue: 0,
    });
    setImgPreview();
    fileInput.current.value = '';
  };

  return (
    <div style={{ flex: 1 }}>
      <h1 className='add-product__title'>THÊM SẢN PHẨM MỚI</h1>

      {/* Custom form */}
      <form onSubmit={handleCreateNewSanPham} className='add-product__form'>
        <div className='form-group'>
          <input
            type='text'
            name='ten'
            id='ten'
            value={newProduct.ten}
            onChange={handleChangeInput}
            required
            className='form-input'
          />
          <label htmlFor='ten' className='form-label'>
            Tên sản phẩm
          </label>
        </div>
        <div className='form-group'>
          <input
            ref={fileInput}
            type='file'
            name='imgUrl'
            id='imgUrl'
            onChange={handleFileInput}
            className='form-input form-input-file'
          />

          <div className='preview-img'>
            {imgPreview ? (
              <img src={imgPreview} alt='preview' />
            ) : (
              <img src='https://via.placeholder.com/100' alt='preview' />
            )}
          </div>
        </div>
        <div className='form-group'>
          <input
            type='number'
            min={0}
            name='donGia'
            id='donGia'
            value={newProduct.donGia || ''}
            onChange={handleChangeInput}
            onKeyPress={handleKeyPress}
            required
            className='form-input'
          />
          <label htmlFor='donGia' className='form-label'>
            Đơn giá
          </label>
        </div>
        <div className='form-group'>
          <input
            type='number'
            min={0}
            name='thue'
            id='thue'
            value={newProduct.thue || ''}
            onChange={handleChangeInput}
            onKeyPress={handleKeyPress}
            required
            className='form-input'
          />
          <label htmlFor='thue' className='form-label'>
            Thuế
          </label>
        </div>

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
      </form>

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
    </div>
  );
};

export default memo(ThemSanPham);
