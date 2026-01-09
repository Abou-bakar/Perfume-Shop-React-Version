import logo from "../../assets/images/logo.png";
import AccordionItem from "./AccordionItem";
import "./Navbar.css";
import "./MobileMenu.css";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import MobileMenu from "./MobileMenu";
import CartDrawer from "../CartDrawer/CartDrawer";

const Navbar = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchActive &&
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setSearchActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchActive]);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  useEffect(() => {
  document.body.style.overflow = cartOpen ? "hidden" : "";
  return () => (document.body.style.overflow = "");
}, [cartOpen]);


  return (
    <>
      {/* Blur Overlay - Shows when search is active */}
      {searchActive && <div className="blur-overlay" />}

      <nav>
        <label
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </label>

        {/* Mobile Menu Sidebar */}
        <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

        {/* Desktop Menu */}
        <div className="nav-left">
          <ul>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Men
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Women
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sale"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Sale
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <div className="nav-center">
          <Link className="logo-link" to="/" aria-label="Go to home">
            <span className="logo">
              <img src={logo} alt="" />
              <h1>
                Perfumes
                <br />
                Mists
              </h1>
            </span>
          </Link>
        </div>

        {/* Right Icons */}
        <div className="nav-right">
          <i
            className="fa-solid fa-bag-shopping"
            id="cart-icon"
            onClick={() => setCartOpen(true)}
          ></i>
          {/* <span id="cart-count">0</span> */}
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={() => setSearchActive(true)}
          ></i>
        </div>
      </nav>

        {/* Cart Drawer */}
    <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)}>
      <div className="cart-header">
        <h3>Your Cart</h3>
        <i 
          className="fa-solid fa-xmark" 
          onClick={() => setCartOpen(false)}
        ></i>
      </div>

      <div className="cart-items">
        {/* Your cart items will go here */}
      </div>

      <div className="cart-summary">
        <p>
          Subtotal: $<span>0</span>
        </p>
        <button className="checkout-btn">Checkout</button>
      </div>
    </CartDrawer>

      {/* Search Bar - Shows when searchActive is true */}
      {searchActive && (
        <div className="search-container">
          <div ref={searchRef} className="search-box">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search Products..." autoFocus />
            <button
              className="close-btn"
              onClick={() => setSearchActive(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
