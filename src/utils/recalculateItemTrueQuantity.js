export default function recalculateItemTrueQuantity(myCart) {
  if (myCart.length === 0) {
    return myCart;
  }

  const cartItemTrueQuantity = myCart.sort();

  for (let i = 0; i < cartItemTrueQuantity.length - 1; i++) {
    for (let j = i + 1; j < cartItemTrueQuantity.length; j++) {
      if (
        cartItemTrueQuantity[j].sanPham.id ===
        cartItemTrueQuantity[i].sanPham.id
      ) {
        cartItemTrueQuantity[i].soLuong += cartItemTrueQuantity[j].soLuong;
        cartItemTrueQuantity[j].soLuong = 0;
      }
    }
  }

  return cartItemTrueQuantity.filter((item) => item.soLuong !== 0);
}
