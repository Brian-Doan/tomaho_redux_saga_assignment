import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

const DanhSachDonHang = () => {
  const tableHeader = [
    'ID',
    'Tên',
    'Tổng trước thuế',
    'Tổng thuế',
    'Tổng thành tiền',
  ];

  const donHang = useSelector((state) => state.DonHangReducer.donHang);

  return (
    <div className='pt-2 table-wrapper'>
      <div className='page-header'>
        <div className='header__title'>
          <h1>DANH SÁCH ĐƠN HÀNG</h1>
        </div>
      </div>

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
          {donHang.length > 0 ? (
            donHang.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.ten}</td>
                <td>{item.tongTruocThue.toLocaleString()} VNĐ</td>
                <td>{item.tongThue.toLocaleString()} VNĐ</td>
                <td>{item.tongThanhTien.toLocaleString()} VNĐ</td>
                <td>
                  <Link to={`/orders/${item.id}`}>Chi tiết &rarr;</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>Chưa có đơn hàng nào.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Link to='/products'>
        <Button className='float-end'>VỀ TRANG SẢN PHẨM</Button>
      </Link>
    </div>
  );
};

export default DanhSachDonHang;
