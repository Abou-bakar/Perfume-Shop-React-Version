import React, { useState } from "react";

import "./ProductInfo.css";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";

const ProductInfo = ({ product, productName, price, salePrice }) => {
  const { addToCart } = useCart();
  const sizes = ["50ml", "100ml", "200ml"];
  const [selectedSize, setSelectedSize] = useState(sizes[0])
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
     toast.success(`${productName} added to cart`);
  }

  return (
    <div className="product-info">
      <h1>{productName}</h1>

      <div className="delivery">
        <i className="fa-solid fa-truck-fast"></i>
        <p>Delivery Time 3-5 Days</p>
      </div>

      <div className="sale">
        <h3 id="product-price" style={salePrice ? { textDecoration: 'line-through', color: '#999' } : {}}>Rs. {price.toLocaleString("en-PK")}</h3>
        {salePrice && <h3 id="product-price-sale">Rs. {salePrice.toLocaleString("en-PK")}</h3>}
      </div>

      <div className="size">
        <p id="size-text">
          Size: <span id="selected-size">{selectedSize}</span>
        </p>

      <div className="size-options">
        {sizes.map((size, index) => (
          <div
            key={index}
            className={`size-box ${selectedSize === size ? "active" : ""}`}
            onClick={()=> setSelectedSize(size)}
          >
            {size}
          </div>
        ))}
      </div>
      </div>

      {/* Quantity + Cart */}
      <div className="qty-cart">
        <QuantitySelector 
         quantity={quantity}
        onIncrease = {()=> setQuantity(quantity + 1)}
        onDecrease = {()=> setQuantity(quantity - 1)}
        min={1}
        max={10}
        />
       
        <button className="add-to-cart-detail" onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <button className="buy-btn">Buy Now</button>
    </div>
  );
};

export default ProductInfo;