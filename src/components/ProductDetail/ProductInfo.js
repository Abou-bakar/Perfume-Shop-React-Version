import React from "react";

import "./ProductInfo.css";
import QuantitySelector from "../QuantitySelector/QuantitySelector";

const ProductInfo = ({ title, price, salePrice }) => {
  const sizes = ["50ml", "100ml", "200ml"];

  return (
    <div className="product-info">
      <h1>{title}</h1>

      <div className="delivery">
        <i className="fa-solid fa-truck-fast"></i>
        <p>Delivery Time 3-5 Days</p>
      </div>

      <div className="sale">
        <h3 id="product-price">{price}</h3>
        <h3 id="product-price-sale">{salePrice}</h3>
      </div>

      <div className="size">
        <p id="size-text">
          Size: <span id="selected-size">50ml</span>
        </p>

      <div className="size-options">
        {sizes.map((size, index) => (
          <div
            key={index}
            className={`size-box ${index === 0 ? "active" : ""}`}
          >
            {size}
          </div>
        ))}
      </div>
      </div>

      {/* Quantity + Cart */}
      <div className="qty-cart">
        <QuantitySelector />
        <button className="add-to-cart-detail">Add to Cart</button>
      </div>

      <button className="buy-btn">Buy Now</button>
    </div>
  );
};

export default ProductInfo;
