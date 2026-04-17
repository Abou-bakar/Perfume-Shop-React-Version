import React, { useState } from "react";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import "./ProductInfo.css";

const ProductInfo = ({ product, productName, price, salePrice }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]?.size || '100ml')
  const [quantity, setQuantity] = useState(1)

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
      price: currentPrice.isSale ? currentPrice.discounted : currentPrice.price
    };

    for (let i = 0; i < quantity; i++) {
      addToCart(productToAdd);
    }
  }

  const wishlisted = isInWishlist(product.id);

  const handleWishlistToggle = () => {
    toggleWishlist(product);
  };

  return (
    <div className="product-detail">
      <div className="product-info">
        <div className="product-header">
          <h1>{product.productName}</h1>

          <button
            className={`wishlist-btn-large ${wishlisted ? 'wishlisted' : ''}`}
            onClick={handleWishlistToggle}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <i className={wishlisted ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
          </button>
        </div>

        <div className="delivery">
          <i className="fa-solid fa-truck-fast"></i>
          <p>Delivery will be processed within 2-3 business days.</p>
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
                onClick={() => setSelectedSize(sizeObj.size)}
              >
                {sizeObj.size}
              </div>
            ))}
          </div>
        </div>

        <div className="qty-cart">
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => setQuantity(quantity + 1)}
            onDecrease={() => setQuantity(quantity - 1)}
            min={1}
            max={10}
          />
          <button className="add-to-cart-detail" onClick={handleAddToCart}>Add to Cart</button>
        </div>

        <button className="buy-btn">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductInfo;