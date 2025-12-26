import logo from '../../assets/images/logo.png'
import AccordionItem from "./AccordionItem"
import "./Navbar.css"
import "./MobileMenu.css"
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <input type="checkbox" id="menu-toggle" className="menu-toggle" />

      <label htmlFor="menu-toggle" className="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </label>

      {/* Mobile Menu Sidebar */}
      <div className="mobile-menu">
        <div className="mobile-menu-header"></div>
        
        <AccordionItem title="Men">
            <a href="perfumes">Perfumes</a>
            <a href="perfumes">Perfume Oils</a>
            <a href="perfumes">Deodorants</a>
        </AccordionItem>

        <AccordionItem title="Women">
            <a href="perfumes">Perfumes</a>
            <a href="perfumes">Mists</a>
            <a href="perfumes">Deodorants</a>
        </AccordionItem>

        <AccordionItem title="Sale">
            <a href="perfumes">Men's Sale</a>
            <a href="perfumes">Women's Sale</a>
            <a href="perfumes">Clearance</a>
        </AccordionItem>

        <AccordionItem title="Contact">
            <p className="help_text">Need help?</p>

            <div className="cont_info">
            <i className="fa-solid fa-phone"></i>
            <p>+923331234567</p>
            </div>

            <div className="cont_info">
            <i className="fa-solid fa-envelope"></i>
            <p>info@perfumesmists.pk</p>
            </div>
        </AccordionItem>

        <div className="menu_bar_ftr">
            <h4>Perfumes Mists</h4>
            <div className="icons">
                <i className="fa-brands fa-facebook-f"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-x-twitter"></i>
            </div>
        </div>
        </div>

        {/* Desktop Menu */}
         <div className="nav-left">
        <ul>
          <li><NavLink to="/products" className={({ isActive}) => 
          isActive ? "active" : ""}
          >
          Men
          </NavLink>
          </li>
          <li><NavLink to="/products" className={({ isActive }) => 
          isActive ? "active" : ""
          }>Women</NavLink></li>
          <li><NavLink to="/sale" className={({ isActive }) =>
          isActive ? "active" : ""
          }>Sale</NavLink></li>
        </ul>
      </div>

         {/* Logo */}
      <div className="nav-center">
        <Link className="logo-link" to="/" aria-label="Go to home">
          <span className="logo">
            <img src={logo} alt="" />
            <h1>
              Perfumes<br />
              Mists
            </h1>
          </span>
        </Link>
      </div>

      {/* Right Icons */}
      <div className="nav-right">
        <i className="fa-solid fa-bag-shopping" id="cart-icon"></i>
        {/* <span id="cart-count">0</span> */}
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>    

        {/* Cart Sidebar */}
        {/* <div className="cart-container">
        <div className="cart-header">
          <h3>Your Cart</h3>
          <i className="fa-solid fa-xmark"></i>
        </div>

        <div className="cart-items"></div>

        <div className="cart-summary">
          <p>Subtotal: $<span>0</span></p>
          <button>Checkout</button>
        </div>
      </div> */}

        {/* Overlay */}
      <label htmlFor="menu-toggle" className="nav-overlay"></label>

    </nav>
  )
}

export default Navbar