import React, { useEffect } from "react";
import useProducts from "../../zustand/store";
import CartSass from "./Cart.module.sass";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {url} from "../../zustand/api";
import jwtDecode from "jwt-decode";

const Cart = () => {
  const {
    cart,
    cartTotalPrice,
    updatePrice,
    deleteProduct,
    qtySubtractOne,
    qtyAddOne,
    resetCart,
    auth,
    setAuth
  } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.token) {
      const decoded = jwtDecode(localStorage.token);
      //console.log(decoded);
      setAuth({
        email: decoded.email,
        name: decoded.name,
        _id: decoded._id,
        userLoaded: true
      })
    }
  }, []);

  const handleCheckout = () => {
    axios.post(`${url}/stripe/create-checkout-session`, {
      cart,
      user: auth._id
    }).then((res) => {
      if (res.data.url) {
        window.location.href = res.data.url;
      }
      

    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    updatePrice();
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const deleteItem = (id) => {
    deleteProduct(id);
    toast.error("Item removed!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const reset = () => {
    resetCart();
    toast.error("Your cart has been reset", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className={CartSass.container}>
      <ToastContainer
        position="bottom-center"
        autoClose={12}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {cart.length == 0 ? (
        <h1>Your cart is empty!</h1>
      ) : (
        <div>
          <h1>Shopping Cart</h1>
          <div className={CartSass.productsTable}>
            <div className={CartSass.tableHeading}>
              <h3 className={CartSass.headingProducts}>PRODUCTS</h3>
              <h3 className={CartSass.headingPrice}>PRICE</h3>
              <h3 className={CartSass.headingQuantity}>QTY</h3>
              <h3 className={CartSass.headingTotal}>TOTAL</h3>
            </div>
            <div className={CartSass.tableBody}>
              {cart.map((product) => {
                return (
                  <div className={CartSass.card} key={product._id}>
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
                          onClick={() => deleteItem(product._id)}
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
                        onClick={() => qtySubtractOne(product._id)}
                      >
                        -
                      </button>
                      {product.quantity}
                      <button
                        className={CartSass.qtyButton}
                        onClick={() => qtyAddOne(product._id)}
                      >
                        +
                      </button>
                    </h3>
                    <h3>{(product.price * product.quantity).toFixed(2)}€</h3>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={CartSass.finalSection}>
            <button className={CartSass.clearCart} onClick={() => reset()}>
              CLEAR CART
            </button>
            <div className={CartSass.totalSection}>
              <div className={CartSass.total}>
                <h2>Subtotal</h2>
                <h2>{cartTotalPrice}€</h2>
              </div>
              <div className={CartSass.info}>
                Taxes and shipping calculated at checkout
              </div>
              {auth._id ? (
                <button onClick={()=>handleCheckout()} className={CartSass.checkout}>check out</button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className={CartSass.checkout}
                >
                  Log In for Checkout
                </button>
              )}
              <Link to="/" className={CartSass.back}>
                continue shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
