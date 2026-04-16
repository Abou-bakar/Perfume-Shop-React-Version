import logo from "../../assets/images/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import AccordionItem from "./AccordionItem";
import MobileMenu from "./MobileMenu";
import Drawer from "../Drawer/Drawer";
import "./Navbar.css";
import "./MobileMenu.css";

const Navbar = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount, cartOpen, openCart, closeCart } = useCart();
  const { getWishlistCount, wishlistBump } = useWishlist();

  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // ── Fetch products once when search opens ────────────────────────
  const fetchProducts = useCallback(async () => {
    if (allProducts.length > 0) return;
    try {
      setSearchLoading(true);
      const snapshot = await getDocs(collection(db, "products"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAllProducts(data);
    } catch (err) {
      console.error("Search fetch error:", err);
    } finally {
      setSearchLoading(false);
    }
  }, [allProducts]);

  const openSearch = () => {
    setSearchActive(true);
    fetchProducts();
  };

  const closeSearch = () => {
    setSearchActive(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  // ── Live filter on every keystroke ───────────────────────────────
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) { setSearchResults([]); return; }
    const matches = allProducts
      .filter(p =>
        p.productName?.toLowerCase().includes(q) ||
        p.for?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      )
      .slice(0, 8);
    setSearchResults(matches);
  }, [searchQuery, allProducts]);

  // ── Close search on outside click ────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchActive && searchRef.current && !searchRef.current.contains(e.target)) {
        closeSearch();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchActive]);

  useEffect(() => {
    if (searchActive && inputRef.current) inputRef.current.focus();
  }, [searchActive]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeSearch();
  };

  const handleResultClick = (productId) => {
    closeSearch();
    navigate(`/product/${productId}`);
  };

  const highlight = (text, query) => {
    if (!query || !text) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="search-highlight">{text.slice(idx, idx + query.length)}</mark>
        {text.slice(idx + query.length)}
      </>
    );
  };

  return (
    <>
      {searchActive && <div className="blur-overlay" onClick={closeSearch} />}

      <nav>
        <label
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </label>

        <Drawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} position="left" width="90%">
          <MobileMenu onClose={() => setMenuOpen(false)} />
        </Drawer>

        {/* Desktop Menu */}
        <div className="nav-left">
          <ul>
            <li><NavLink to="/men" className={({ isActive }) => isActive ? "active" : ""}>Men</NavLink></li>
            <li><NavLink to="/women" className={({ isActive }) => isActive ? "active" : ""}>Women</NavLink></li>
            <li><NavLink to="/sale" className={({ isActive }) => isActive ? "active" : ""}>Sale</NavLink></li>
          </ul>
        </div>

        {/* Logo */}
        <div className="nav-center">
          <Link className="logo-link" to="/" aria-label="Go to home">
            <span className="logo">
              <img src={logo} alt="" />
              <h1>Perfumes<br />Mists</h1>
            </span>
          </Link>
        </div>

        {/* Right Icons */}
        <div className="nav-right">
          <div className="nav-icon-wrapper" onClick={() => navigate('/wishlist')}>
            <i
              className={`fa-regular fa-heart ${wishlistBump ? "wishlist-bump" : ""}`}
            />
            {getWishlistCount() > 0 && <span className="nav-badge">{getWishlistCount()}</span>}
          </div>

          <div className="nav-icon-wrapper cart-wrapper" onClick={openCart}>
            <i className="fa-solid fa-bag-shopping"></i>
            {getCartCount() > 0 && <span className="nav-badge">{getCartCount()}</span>}
          </div>

          <i className="fa-solid fa-magnifying-glass" onClick={openSearch}></i>
        </div>
      </nav>

      {/* Cart Drawer — controlled by CartContext */}
      <Drawer isOpen={cartOpen} onClose={closeCart} position="right" width="380px">
        <div className="cart-header">
          <h3>Your Cart ({getCartCount()})</h3>
          <i className="fa-solid fa-xmark" onClick={closeCart}></i>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>Your Cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.images} alt={item.productName} />
                <div className="item-details">
                  <h4>{item.productName}</h4>
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
                <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <p>Subtotal: Rs. {getCartTotal().toLocaleString("en-PK")}</p>
          <button
            className="checkout-btn"
            onClick={() => { closeCart(); navigate('/checkout'); }}
            disabled={cartItems.length === 0}
            style={{ opacity: cartItems.length === 0 ? 0.5 : 1, cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer' }}
          >
            Checkout
          </button>
        </div>
      </Drawer>

      {/* Live Search */}
      <div className={`search-container ${searchActive ? "active" : ""}`}>
        <div ref={searchRef} className="search-box">
          <div className="search-input-row">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => { setSearchQuery(''); setSearchResults([]); inputRef.current?.focus(); }}
              >
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            )}
            <button type="button" className="close-btn" onClick={closeSearch}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {searchQuery.trim() && (
            <div className="search-dropdown">
              {searchLoading ? (
                <div className="search-dropdown-loading"><span>Loading...</span></div>
              ) : searchResults.length === 0 ? (
                <div className="search-no-results">
                  <i className="fa-regular fa-face-frown"></i>
                  <span>No products found for "<strong>{searchQuery}</strong>"</span>
                </div>
              ) : (
                <>
                  <p className="search-dropdown-label">
                    {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                  </p>
                  <ul className="search-results-list">
                    {searchResults.map(product => {
                      const img = Array.isArray(product.images) ? product.images[0] : product.images;
                      return (
                        <li
                          key={product.id}
                          className="search-result-item"
                          onClick={() => handleResultClick(product.id)}
                        >
                          <img src={img} alt={product.productName} className="search-result-img" />
                          <div className="search-result-info">
                            <p className="search-result-name">
                              {highlight(product.productName, searchQuery.trim())}
                            </p>
                            <p className="search-result-category capitalize">
                              {product.for || product.category || ''}
                            </p>
                          </div>
                          <div className="search-result-price">
                            {product.isSale ? (
                              <>
                                <span className="search-price-original">
                                  Rs. {Number(product.originalPrice).toLocaleString('en-PK')}
                                </span>
                                <span className="search-price-sale">
                                  Rs. {Number(product.discountedPrice).toLocaleString('en-PK')}
                                </span>
                              </>
                            ) : (
                              <span>Rs. {Number(product.price).toLocaleString('en-PK')}</span>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;