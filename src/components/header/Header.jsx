import React, { useState } from "react";
import HeaderSass from "./Header.module.sass";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useProducts from "../../zustand/store";

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const { cartCounter } = useProducts()
  return (
    <div className={HeaderSass.header}>
      <div className={HeaderSass.headerContainer}>
        <Link to='/' className={HeaderSass.logo}><span>e</span>Shop</Link>
        <nav className={HeaderSass.navbar}>
          <ul className={HeaderSass.navList}>
            <Link to='/' className={HeaderSass.navItem}>Home</Link>
            <Link to='/contact' className={HeaderSass.navItem}>Contact</Link>
            {isLogged && <Link to='orders' className={HeaderSass.navItem}>Orders</Link>}
            {isAdmin && <Link to='admin' className={HeaderSass.navItemAdmin}>Admin</Link>}
            <Link to='login' className={HeaderSass.navItemLogin}>{isLogged ? 'Logout' : 'Login'}</Link>
            <Link to='/cart' className={HeaderSass.navItem}>
              <div className={HeaderSass.cartIcon}>
                <FaShoppingCart />
                <span className={HeaderSass.cartCount}>{cartCounter}</span>
                </div>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
