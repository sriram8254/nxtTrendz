import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({
      cartList: [],
    })
  }

  addCartItem = product => {
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (id === each.id) {
          return {
            ...each,
            quantity: each.quantity + 1,
          }
        }
        return each
      }),
    }))
  }

  plusExistItem = (id, quantity) => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (id === each.id) {
          return {
            ...each,
            quantity: each.quantity + quantity,
          }
        }
        return each
      }),
    }))
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(each => each.id !== id)
    this.setState({cartList: filteredList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(each => each.id === id)
    const {quantity} = filteredList[0]
    if (quantity === 1) {
      this.removeCartItem(id)
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === id && each.quantity > 1) {
            return {
              ...each,
              quantity: each.quantity - 1,
            }
          }
          return each
        }),
      }))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            removeCartItem: this.removeCartItem,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
            removeAllCartItems: this.removeAllCartItems,
            plusExistItem: this.plusExistItem,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
