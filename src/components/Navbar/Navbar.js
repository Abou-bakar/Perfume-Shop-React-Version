import logo from "../../assets/images/logo.png";
import AccordionItem from "./AccordionItem";
import "./Navbar.css";
import "./MobileMenu.css";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import MobileMenu from "./MobileMenu";
import Drawer from "../Drawer/Drawer";
import { useCart } from "../../context/CartContext";
import QuantitySelector from "../QuantitySelector/QuantitySelector";

const Navbar = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
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

        <Drawer
  isOpen={menuOpen}
  onClose={() => setMenuOpen(false)}
  position="left"
  width="90%"
>
  <MobileMenu onClose={() => setMenuOpen(false)} />
</Drawer>


        {/* Desktop Menu */}
        <div className="nav-left">
          <ul>
            <li>
              <NavLink
                to="/men"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Men
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/women"
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
<Drawer
  isOpen={cartOpen}
  onClose={() => setCartOpen(false)}
  position="right"
  width="380px"
>
  <div className="cart-header">
    <h3>Your Cart ({getCartCount()})</h3>
    <i
      className="fa-solid fa-xmark"
      onClick={() => setCartOpen(false)}
    ></i>
  </div>

  <div className="cart-items">
   {cartItems.length === 0 ? (
    <p  style={{ textAlign: 'center', padding: '20px', color: '#666' }}>Your Cart is empty</p>
   ) : (
    cartItems.map((item) => (
      <div key={item.id} className="cart-item">
        <img src={item.image} alt={item.title} />
        <div className="item-details">
          <h4>{item.title}</h4>
          <p className="item-price">{item.isSale ? item.discountedPrice : item.price}</p>
          <div style={{ transform: 'scale(0.8)', transformOrigin: 'left' }}>
          <QuantitySelector
        quantity={item.quantity}
        onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
        onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
        min={1}
        max={10}
      />
      </div>
        </div>

        <button
          className="remove-item"
            onClick={()=> removeFromCart(item.id)}
        ><i className="fa-solid fa-trash"></i>
        </button>
        </div>
    ))
    )}
  </div>

  <div className="cart-summary">
    <p>
      Subtotal: Rs. {getCartTotal().toLocaleString("en-PK")}
    </p>
    <button className="checkout-btn">Checkout</button>
  </div>
</Drawer>


      {/* Search Bar - Shows when searchActive is true */}
      
        <div className={`search-container ${searchActive ? "active" : ""}`}>
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
     
    </>
  );
};

export default Navbar;
