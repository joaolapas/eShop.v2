import React, { useEffect } from 'react'
import useProducts from "../../zustand/store";

const CheckoutSuccess = () => {
 const { resetCart } = useProducts();

 useEffect(() => {
    resetCart();
 },[])
  return (
    <div>
      blahblahblah successfully
    </div>
  )
}

export default CheckoutSuccess
