import React, { useState, useEffect } from "react";
import HeaderSass from "./Header.module.sass";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useProducts from "../../zustand/store";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { HiMenu } from "react-icons/hi";

import Hamburger from "../hamburgerMenu/HamburgerMenu.jsx";

const Header = () => {
  //const [isAdmin, setIsAdmin] = useState(false);
  //const [isLogged, setIsLogged] = useState(false);
  const {
    cart,
    cartCounter,
    updateCounter,
    auth,
    setAuth,
    toggleHamburgerMenu,
    hamburgerMenu,
    isLogged,
    setIsLogged,
  } = useProducts();

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.token) {
      setIsLogged(true);
      const decoded = jwtDecode(localStorage.token);
      //console.log(decoded);
      setAuth({
        email: decoded.email,
        name: decoded.name,
        _id: decoded._id,
        isAdmin: decoded.isAdmin,
        userLoaded: true,
      });
    }
  }, []);

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

  useEffect(() => {
    if (auth.userLoaded) {
      setIsLogged(true);
    }
  }, [auth]);

  useEffect(() => {
    updateCounter();
  }, [cart]);

  return (
    <div className={HeaderSass.header}>
      <Hamburger />
      <div className={HeaderSass.headerContainer}>
        <Link to="/" className={HeaderSass.logo}>
          <span>e</span>Shop
        </Link>
        <nav className={HeaderSass.navbar}>
          <ul className={HeaderSass.navList}>
            <Link to="/" className={HeaderSass.navItem}>
              Home
            </Link>
            <Link to="/contact" className={HeaderSass.navItem}>
              Contact
            </Link>
            {isLogged && (
              <Link to="/orders" className={HeaderSass.navItem}>
                Orders
              </Link>
            )}
            {auth.isAdmin && (
              <Link to="/admin/dashboard" className={HeaderSass.navItemAdmin}>
                Admin
              </Link>
            )}
            {isLogged ? (
              <button
                onClick={() => handleLogout()}
                className={HeaderSass.navItemLogin}
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className={HeaderSass.navItemLogin}>
                Login
              </Link>
            )}
            <Link to="/cart" className={HeaderSass.navItem}>
              <div className={HeaderSass.cartIcon}>
                <FaShoppingCart />
                <span className={HeaderSass.cartCount}>{cartCounter}</span>
              </div>
            </Link>
          </ul>
        </nav>
        <div className={HeaderSass.iconsContainer}>
          <Link to="/cart" className={HeaderSass.cartMobile}>
            <div className={HeaderSass.cartIcon}>
              <FaShoppingCart />
              <span className={HeaderSass.cartCount}>{cartCounter}</span>
            </div>
          </Link>
          <HiMenu
            className={HeaderSass.hamburger}
            onClick={() => toggleHamburgerMenu()}
          ></HiMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
