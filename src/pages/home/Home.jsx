import React, { useEffect } from "react";
import useProducts from "../../zustand/store";
import HomeSass from "./Home.module.sass";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const { items, status, fetch, addToCart, cart, cartCounter } = useProducts();

  useEffect(() => {
    fetch();
  }, []);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart]);

  const handleAddToCart = (item) => {
    addToCart(item)
    toast.success("Item added to cart");
  }

  return (
    <div className={HomeSass.container}>
      <ToastContainer />
      {status === "pending" && <p>Loading...</p>}
      {status === "rejected" && <p>Failed to fetch products.</p>}
      <ul className={HomeSass.listContainer}>
        {items.map((item) => (
          <li key={item.id} className={HomeSass.itemCard}>
            <img className={HomeSass.image} src={item.image} alt={item.name} />
            <h3 className={HomeSass.name}>{item.name}</h3>
            <h2 className={HomeSass.price}>{`€${item.price}`}</h2>
            <button  className={HomeSass.button} onClick={()=>handleAddToCart(item)}>ADD TO CART</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Home;
