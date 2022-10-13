# **_React App with Redux-Saga_**

Web app được tạo bởi ReactJS + Redux + Redux-Saga.

## `Một vài chức năng chính`

- Trang chủ và trang **_Sản phẩm_** hiển thị danh sách sản phẩm (ban đầu rỗng vì chưa có dữ liệu)
- Thanh **_Navbar_** để điều hướng đến các trang, đồng thời thể hiện **_số lượng sản phẩm khác nhau_** đang có trong **_Giỏ hàng của tôi_** (sản phẩm cùng loại nhưng nhiều cái thì vẫn tính là 1 sản phẩm)
- Trang thêm sản phẩm mới gồm một **_Form_** để nhập dữ liệu
- Trang _**Giỏ hàng của tôi**_ hiển thị **_sản phẩm của cùng một đơn hàng_** (đơn hàng chưa được thanh toán thì các sản phẩm được thêm vào giỏ sau đó mặc định thuộc cùng một đơn hàng. Ban đầu rỗng vì chưa có dữ liệu)
- Trang _**Đơn hàng**_ gồm một **_Bảng_** hiển thị danh sách các đơn hàng (ban đầu rỗng vì chưa có dữ liệu)
- Trang _**Chi tiết đơn hàng**_ gồm một **_Bảng_** hiển thị thông tin chi tiết của một đơn hàng
- Trong trang **_Giỏ hàng của tôi_**, sau khi nhấn nút '_THANH TOÁN_' thì đơn hàng sẽ được tạo mới, và giỏ hàng được tự động làm rỗng
- Dữ liệu các sản phẩm, giỏ hàng, đơn hàng và chi tiết đơn hàng không bị xoá khi tắt web server 

## `npm start`

Trong thư mục dự án, dùng lệnh **npm start** để chạy ứng dụng.\
Ứng dụng mặc định chạy ở [http://localhost:3000](http://localhost:3000).
