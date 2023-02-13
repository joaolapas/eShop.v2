import React, { useEffect } from 'react'
import useProducts from '../../zustand/store'

const Cart = () => {
  const { cart, cartTotalPrice, updatePrice } = useProducts()

  useEffect(() => {
    updatePrice()
  }, [cart])
  return (
    <div>
    <h1>total: {cartTotalPrice}€</h1>
    {cart.map((item) => (<div key={item.id}>{item.name} . {item.quantity}</div>))}
    </div>
  )
}

export default Cart
