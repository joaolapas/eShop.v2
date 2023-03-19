import React, { useEffect } from "react";
import useProducts from "../../../zustand/store";
import AdminSass from "../Admin.module.sass";

const AdminOrders = () => {
  const { fetchOrders, orders, fetchUsers, users, items, fetchProducts } = useProducts();

  useEffect(() => {
    fetchOrders();
    fetchUsers();
    fetchProducts();
  }, []);
 console.log(items)
  return (
    <div>
      <div>
        {orders.map((order, index) => {
          return (
            <div key={order._id} className={AdminSass.itemCard}>
              <div className={AdminSass.itemName}>{index + 1}</div>
              <div className={AdminSass.itemBrand}>
                {users.map((element) => {
                  if (element._id === order.userId) {
                    return <div key={element._id}>{element.name}</div>;
                  }
                })}
              </div>

              <div className={AdminSass.itemAddress}>
                {order.shipping && (
                  <div>
                    <p>{order.shipping.address.line1}</p>
                    <p>{order.shipping.address.line2}</p>
                    <p>{order.shipping.address.city}</p>
                    <p>{order.shipping.address.state}</p>
                    <p>{order.shipping.address.postal_code}</p>
                    <p>{order.shipping.address.country}</p>
                  </div>
                )}
              </div>
              <div>
                {order.items.map((item) => {
                  return (
                    <div>
                      {item.quantity} -
                      {items.map((product) => {
                        if (item._id === product._id) {
                          return (<div>{product.name}</div>);
                        }
                      })}
                    </div>
                  );
                })}
              </div>
              <div className={AdminSass.itemPrice}>€{order.total}</div>
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
