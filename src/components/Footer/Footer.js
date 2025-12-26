import React from 'react'
import FooterColumns from './FooterColumns'
import "./Footer.css"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='ftr'>
        <div className="footer-row">
            <FooterColumns header="SHOP">
             <li><Link to="/products">Men</Link></li>
          <li><Link to="/products">Women</Link></li>
          <li><Link to="/sale">Sale</Link></li>
          <li><Link to="/products">All Products</Link></li>
          <li><Link to="/">Best Selling</Link></li>
          <li><Link to="/">Top Deals</Link></li>
            </FooterColumns>

            <FooterColumns header="CUSTOMER SERVICE">
             <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/contact">Privacy Policy</Link></li>
          <li><Link to="/contact">Shipping Policy</Link></li>
          <li><Link to="/contact">Refund Policy</Link></li>
          <li><Link to="/contact">Terms of Service</Link></li>
            </FooterColumns>

             {/* NEWSLETTER */}
        <div className="footer-col newsletter">
            <h4>NEWSLETTER SIGN UP</h4>
          <p className="news">
            Sign up for exclusive updates, new arrivals & insider only
            discounts.
          </p>

          <form>
            <input type="email" placeholder="Your email" required />
            <button type="submit">Subscribe</button>
          </form>

          <div className="icons">
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-x-twitter"></i>
          </div>
        </div>
        </div>

        <p className="copyright">
        © 2025, Perfumes Mists. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer