import React, { useEffect } from "react";
import useProducts from "../../zustand/store";
import HomeSass from "./Home.module.sass";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";

const Home = () => {
  const { items, status, fetchProducts, addToCart, cart, setAuth } = useProducts();
  
  useEffect(() => {
    if (localStorage.token) {
      const decoded = jwtDecode(localStorage.token);
      //console.log(decoded);
      setAuth({
        email: decoded.email,
        name: decoded.name,
        _id: decoded._id,
        isAdmin: decoded.isAdmin,
        userLoaded: true
      })
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success("Item added to cart", {
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
    <div className={HomeSass.container}>
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
      {status === "pending" && <p>Loading...</p>}
      {status === "rejected" && <p>Failed to fetch products.</p>}
      <ul className={HomeSass.listContainer}>
        {items.map((item) => (
          <li key={item._id} className={HomeSass.itemCard}>
            <img className={HomeSass.image} src={item.image} alt={item.name} />
            <h3 className={HomeSass.name}>{item.name}</h3>
            <h2 className={HomeSass.price}>{`€${item.price}`}</h2>
            <button
              className={HomeSass.button}
              onClick={() => handleAddToCart(item)}
            >
              ADD TO CART
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Home;
