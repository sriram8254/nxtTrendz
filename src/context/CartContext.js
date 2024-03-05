import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  removeAllCartItems: () => {},
  plusExistItem: () => {},
})

export default CartContext
