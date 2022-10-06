import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

import { calculateMyCart } from '../../utils';

const ChiTietDonHang = () => {
  const { id } = useParams();
  const tableHeader = [
    'ID sản phẩm',
    'Sản phẩm',
    'Số lượng',
    'Đơn giá',
    'Tổng trước thuế',
    'Tổng thuế',
  ];

  /**
   * Lấy state từ Reducer
   */
  const dongDonHang = useSelector(
    (state) => state.DongDonHangReducer.dongDonHang
  );

  const chiTietDonHang = dongDonHang.filter((item) => item.idDonHang === id);

  /**
   * Tính toán tiền và thuế của các sản phẩm trong giỏ hàng
   */
  const { tongTruocThue, tongThue, tongThanhTien } =
    calculateMyCart(chiTietDonHang);

  return (
    <div className='border-top pt-2'>
      {/* Header */}
      <div className='position-relative'>
        <Link to='/orders' className='position-absolute start-0'>
          &larr; Quay lại
        </Link>
        <h3 className='text-end d-block me-auto ms-auto text-sm-end text-md-center text-lg-center text-xl-center'>
          CHI TIẾT ĐƠN HÀNG #{id.toUpperCase()}
        </h3>
      </div>

      {/* Content */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            {tableHeader.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chiTietDonHang.map((dong, index) => (
            <tr key={dong.sanPham.id}>
              <td>{index + 1}</td>
              <td>{dong.sanPham.id}</td>
              <td>{dong.sanPham.ten}</td>
              <td>{dong.soLuong}</td>
              <td>{parseInt(dong.donGia).toLocaleString()} VNĐ</td>
              <td>{dong.tongTruocThue.toLocaleString()} VNĐ</td>
              <td>{dong.tongThue.toLocaleString()} VNĐ</td>
            </tr>
          ))}
        </tbody>
        <tfoot className='fw-bold'>
          <tr>
            <td colSpan={5}>Tổng trước thuế</td>
            <td colSpan={2}>{tongTruocThue.toLocaleString()} VNĐ</td>
          </tr>
          <tr>
            <td colSpan={5}>Tổng thuế</td>
            <td colSpan={2}>{tongThue.toLocaleString()} VNĐ</td>
          </tr>
          <tr>
            <td colSpan={5}>Tổng thành tiền</td>
            <td colSpan={2}>{tongThanhTien.toLocaleString()} VNĐ</td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default ChiTietDonHang;
