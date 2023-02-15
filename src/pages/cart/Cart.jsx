import React, { useEffect } from "react";
import useProducts from "../../zustand/store";
import CartSass from "./Cart.module.sass";

const Cart = () => {
  const {
    cart,
    cartTotalPrice,
    updatePrice,
    deleteProduct,
    qtySubtractOne,
    qtyAddOne,
    resetCart,
  } = useProducts();

  useEffect(() => {
    updatePrice();
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className={CartSass.container}>
      {cart.length == 0 ? (
        <h1>Your cart is empty!</h1>
      ) : (
        <div>
          <h1>Shopping Cart</h1>
          <div className={CartSass.productsTable}>
            <div className={CartSass.tableHeading}>
              <h3 className={CartSass.headingProducts}>PRODUCTS</h3>
              <h3 className={CartSass.headingPrice}>PRICE</h3>
              <h3 className={CartSass.headingQuantity}>QUANTITY</h3>
              <h3 className={CartSass.headingTotal}>TOTAL</h3>
            </div>
            <div className={CartSass.tableBody}>
              {cart.map((product) => {
                return (
                  <div className={CartSass.card}>
                    <div className={CartSass.productSection}>
                      <img
                        className={CartSass.image}
                        src={product.image}
                        alt={product.name}
                      />
                      <div className={CartSass.productData}>
                        <h2>{product.name}</h2>
                        <h4>{product.description}</h4>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className={CartSass.removeItem}
                        >
                          remove
                        </button>
                      </div>
                    </div>
                    <h3>{product.price}€</h3>
                    <h3>
                      <button
                        className={CartSass.qtyButton}
                        onClick={() => qtySubtractOne(product.id)}
                      >
                        -
                      </button>
                      {product.quantity}
                      <button
                        className={CartSass.qtyButton}
                        onClick={() => qtyAddOne(product.id)}
                      >
                        +
                      </button>
                    </h3>
                    <h3>{product.price * product.quantity}€</h3>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={CartSass.finalSection}>
            <button className={CartSass.clearCart} onClick={() => resetCart()}>
              CLEAR CART
            </button>
            <div className={CartSass.totalSection}>
              <div className={CartSass.total}>
                <h2>Subtotal</h2>
                <h2>{cartTotalPrice}€</h2>
              </div>
              <div className={CartSass.info}>Taxes and shipping calculated at checkout</div>
              <button className={CartSass.checkout}>check out</button>
              <button className={CartSass.back}>continue shopping</button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
