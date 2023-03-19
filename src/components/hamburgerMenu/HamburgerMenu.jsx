import React, { useState } from "react";
import HamburgerSass from "./HamburgerMenu.module.sass";
import useProducts from "../../zustand/store";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Hamburger = () => {
  const { hamburgerMenu, toggleHamburgerMenu, isLogged, setIsLogged, auth, setAuth, } = useProducts();

  const handleClose = () => {
    toggleHamburgerMenu()
  }

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logout");
    setAuth({
      name: "",
      email: "",
      _id: "",
      isAdmin: false,
      userLoaded: false,
      
    });
    localStorage.removeItem("token");
    setIsLogged(false);
    toast.error("Logged out");
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div
      className={
        hamburgerMenu
          ? HamburgerSass.slidingMenuIsOpen
          : HamburgerSass.slidingMenu
      }
    >
      <IoClose
        className={HamburgerSass.closeIcon}
        onClick={toggleHamburgerMenu}
      />

      <nav className={HamburgerSass.menuNav}>
        <ul className={HamburgerSass.navList}>
          <Link to="/" onClick={()=>handleClose()} className={HamburgerSass.menuNavLink}>
            Home
          </Link>
          <Link to="/contact" onClick={()=>handleClose()} className={HamburgerSass.menuNavLink}>
            Contact
          </Link>
          {isLogged && (
            <Link to="/orders" onClick={()=>handleClose()} className={HamburgerSass.menuNavLink}>
              Orders
            </Link>
          )}
          {auth.isAdmin && (
            <Link to="/admin/dashboard" onClick={()=>handleClose()} className={HamburgerSass.menuNavLink}>
              Admin
            </Link>
          )}
          {isLogged ? (
            <Link
              onClick={() => {
                handleLogout()
                handleClose()
              }}
              className={HamburgerSass.menuNavLink}
            >
              Logout
            </Link>
          ) : (
            <Link to="/login" onClick={()=>handleClose()} className={HamburgerSass.menuNavLink}>
              Login
            </Link>
          )}
          
        </ul>
      </nav>
    </div>
  );
};

export default Hamburger;
