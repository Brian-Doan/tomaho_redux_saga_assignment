export default function calculateMyCart(arr) {
  const tongTruocThue = arr.reduce((tongTruocThue, current) => {
    return tongTruocThue + current.donGia * parseInt(current.soLuong);
  }, 0);

  const tongThue = arr.reduce((tongThue, current) => {
    return tongThue + current.sanPham.thue * parseInt(current.soLuong);
  }, 0);

  const tongThanhTien = tongTruocThue + tongThue;

  return {
    tongTruocThue,
    tongThue,
    tongThanhTien,
  };
}
