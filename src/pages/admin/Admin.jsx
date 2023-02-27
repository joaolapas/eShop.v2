import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import useProducts from "../../zustand/store";
import AdminSass from "./Admin.module.sass";

const Admin = () => {
  const {auth} = useProducts()

  if (!auth.isAdmin) return <h2>Access Denied!</h2>
  return (
    <div className={AdminSass.container}>
      <nav className={AdminSass.sideBar}>
        <Link className={AdminSass.link} to="dashboard">Dashboard</Link>
        <Link className={AdminSass.link} to="products">Products</Link>
        <Link className={AdminSass.link} to="adminOrders">Orders</Link>
        <Link className={AdminSass.link} to="users">Users</Link>
      </nav>
      <div className={AdminSass.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
