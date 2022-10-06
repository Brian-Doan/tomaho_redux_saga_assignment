import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

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
    <div className='border-top pt-2'>
      <h3>DANH SÁCH ĐƠN HÀNG</h3>

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
    </div>
  );
};

export default DanhSachDonHang;
