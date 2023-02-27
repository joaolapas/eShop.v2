import React from "react";
import { useNavigate, Outlet } from "react-router";
import AdminSass from "../Admin.module.sass";
import useProducts from "../../../zustand/store";
import { useEffect } from "react";

const Products = () => {
  const navigate = useNavigate();
  const { items, fetchProducts, createProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  //console.log(items);
  return (
    <div className={AdminSass.product_container}>
      <div className={AdminSass.product_container_head}>
        <h2>{items.length} products</h2>
        <button onClick={() => navigate("/admin/products/createProduct")}>
          Add new Product
        </button>
      </div>
      <Outlet />
      <div>
        {items.map((item) => {
          return (
            <div key={item._id} className={AdminSass.itemCard}>
              <img src={item.image} alt={item.name} />
              <div className={AdminSass.itemName}>{item.name}</div>
              <div className={AdminSass.itemBrand}>{item.brand}</div>
              <div className={AdminSass.itemPrice}>{item.price}</div>
              <div className={AdminSass.itemDescription}>
                {item.description}
              </div>
              <div className={AdminSass.itemButtons}>
                <button>Edit</button>
                <button>Remove</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
