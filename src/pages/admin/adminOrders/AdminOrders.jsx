import React, { useEffect } from "react";
import useProducts from "../../../zustand/store";
import AdminSass from "../Admin.module.sass";

const AdminOrders = () => {
  const { fetchOrders, orders, fetchUsers, users } = useProducts();

  useEffect(() => {
    fetchOrders();
    fetchUsers();
  }, []);

  return (
    <div>
    <div>
    {orders.map((order, index) => {
    
      return (
        <div key={order._id} className={AdminSass.itemCard}>
          <div className={AdminSass.itemName}>{ index + 1 }</div>
          <div className={AdminSass.itemBrand}>{
            users.map(element => {
              if(element._id === order.userId) {
                return <div>{element.name}</div>
              }
            })
          }</div>
          <div className={AdminSass.itemPrice}>
          <div>{
            console.log(order.shipping.email)
          }</div>
          
          
          </div>
          <div className={AdminSass.itemDescription}>
            {order.description}
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

export default AdminOrders;
