import CartContext from '../../context/CartContext'

// Write your code here
const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const getSumValue = () => {
        const sumValuesList = cartList.map(each => each.price * each.quantity)
        const sumValue = sumValuesList.reduce((a, b) => a + b)
        return sumValue
      }
      return (
        <div className="checkout-container">
          <h1 className="order-heading">
            Order Total:
            <span className="total-amt"> Rs {getSumValue()}/-</span>
          </h1>
          <p className="items-in-cart-desc">{cartList.length} Items in cart</p>
          <button type="button" className="check-out-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
