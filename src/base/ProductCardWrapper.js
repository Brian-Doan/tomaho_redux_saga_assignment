import { BsCart } from 'react-icons/bs';

import '../styles/ProductCard.scss';

const ProductCardWrapper = ({ item, cartItemTrueQuantity }) => {
  return (
    <div className='product-card__wrapper'>
      <div className='product-card__img-wrapper'>
        <img src={item.imgUrl} alt={item.ten} />
      </div>
      <div className='product-card__desc'>
        <h4 className='product-card__name'>{item.ten}</h4>
        <p className='product-card__price'>
          <b>Giá:</b> {parseInt(item.donGia).toLocaleString()} VNĐ
        </p>
        <p className='product-card__tax'>
          <b>Thuế:</b> {parseInt(item.thue).toLocaleString()} VNĐ
        </p>

        {cartItemTrueQuantity.length > 0 ? (
          cartItemTrueQuantity.map(
            (cartItem) =>
              cartItem.sanPham.id === item.id && (
                <div
                  key={cartItem.sanPham.id}
                  className='product-card__cart-quantity'
                >
                  <BsCart />
                  {' : '}
                  {cartItem.soLuong}
                </div>
              )
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ProductCardWrapper;
