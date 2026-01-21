import React, { useState } from "react";
import { toast } from "react-toastify";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import { useCart } from "../../context/CartContext";
import "./ProductInfo.css";

const ProductInfo = ({ product, productName, price, salePrice }) => {
  const { addToCart } = useCart();
  // const sizes = ["50ml", "100ml", "200ml"];
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]?.size || '100ml')
  const [quantity, setQuantity] = useState(1)

  // Get current size pricing
  const getCurrentPrice = () => {
    if (product.isSale && product.saleSizes?.length) {
      const saleSize = product.saleSizes.find(s => s.size === selectedSize);
      return {
        original: saleSize?.originalPrice,
        discounted: saleSize?.discountedPrice,
        isSale: true
      };
    } 
    
    if (product.sizes?.length) {
        const regularSize = product.sizes.find(s => s.size === selectedSize);
        return {
          price: regularSize?.price,
          isSale: false
        }
      }

      if (product.isSale && product.originalPrice && product.discountedPrice) {
        return {
          isSale: true,
          original: product.originalPrice,
          discounted: product.discountedPrice
        }
      }
      return { price: product.price, isSale: false };
  }

  const currentPrice = getCurrentPrice();

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      selectedSize,
      price: currentPrice.isSale ? currentPrice.discountedPrice : currentPrice.price
    };

    for (let i = 0; i < quantity; i++) {
      addToCart(productToAdd);
    }
    toast.success(`${product.productName} (${selectedSize}) added to cart`);
  }

  return (
    <div className="product-info">
      <h1>{product.productName}</h1>

      <div className="delivery">
        <i className="fa-solid fa-truck-fast"></i>
        <p>Delivery Time 3-5 Days</p>
      </div>

      <div className="sale">
        {currentPrice.isSale ? (
          <>
            <h3 style={{ textDecoration: 'line-through', color: '#999' }}>
              Rs. {currentPrice.original?.toLocaleString("en-PK")}
            </h3>
            <h3 id="product-price-sale">
              Rs. {currentPrice.discounted?.toLocaleString("en-PK")}
            </h3>
          </>
        ) : (
          <h3 id="product-price">
            Rs. {currentPrice.price?.toLocaleString("en-PK")}
          </h3>
        )}
      </div>

      <div className="size">
        <p id="size-text">
          Size: <span id="selected-size">{selectedSize}</span>
        </p>

      <div className="size-options">
        {product.sizes?.map((sizeObj, index) => (
          <div
            key={index}
            className={`size-box ${selectedSize === sizeObj.size ? "active" : ""}`}
            onClick={()=> setSelectedSize(sizeObj.size)}
          >
            {sizeObj.size}
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