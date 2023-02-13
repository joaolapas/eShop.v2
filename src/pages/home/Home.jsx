import React, { useEffect } from "react";
import useProducts from "../../zustand/store";
import HomeSass from "./Home.module.sass";

const Home = () => {
  const { items, status, fetch, addToCart, cart, cartCounter } = useProducts();

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className={HomeSass.container}>
      {status === "pending" && <p>Loading...</p>}
      {status === "rejected" && <p>Failed to fetch products.</p>}
      <ul className={HomeSass.listContainer}>
        {items.map((item) => (
          <li key={item.id} className={HomeSass.itemCard}>
            <img className={HomeSass.image} src={item.image} alt={item.name} />
            <h3 className={HomeSass.name}>{item.name}</h3>
            <h2 className={HomeSass.price}>{`€${item.price}`}</h2>
            <button  className={HomeSass.button} onClick={()=>addToCart(item)}>ADD TO CART</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Home;
