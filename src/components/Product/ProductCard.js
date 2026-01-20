import React from 'react'
import "./ProductCard.css"
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const ProductCard = ( {id, images, productName, price, isSale, salePercent, originalPrice, discountedPrice}) => {

   console.log('Product:', productName, {
    isSale,
    originalPrice,
    discountedPrice,
    price
  });
  
  const { addToCart } = useCart();
  const navigate = useNavigate();

const formatPrice = (price) => {
  if (!price) return "0";
  
  // If it's a number, format it
  if (typeof price === 'number') {
    return price.toLocaleString("en-PK");
  }
  
  // If it's a string, convert to number first, then format
  if (typeof price === 'string') {
    // Remove any commas and spaces, then convert to number
    const numPrice = parseInt(price.replace(/[,\s]/g, ''));
    if (!isNaN(numPrice)) {
      return numPrice.toLocaleString("en-PK");
    }
    // If it already has commas formatted nicely, just return it
    return price;
  }
  
  return "0";
}


  const handleAddToCart = (e) => {
     e.stopPropagation(); // Prevent card click when clicking the + button

       // Make sure id exists and is unique
    if (!id) {
      console.error('Product missing id!');
      return;
    }
    
    const product = {
    id,
    images,
    productName,
    price,
    isSale,
    salePercent,
    originalPrice,
    discountedPrice,
  };

  addToCart(product);

  // Optional: Show feedback to user
       toast.success(`${productName} added to cart`);
};

  const handleCardClick = () => {
    navigate(`/product/${id}`)
  }

  return (
    <div className='swiper-slide'>
        <div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
           {/* Image + Sale tag */}
           <div className="image-sale">
            <img src={images} alt={productName} />

            {isSale && (
            <span className="sale-tag">{salePercent}% OFF</span>
          )}
            </div>

            <div className="product-info">
            <div className="product-details">
                <h3>{productName}</h3>

                {/* Price */}
                {!isSale && <p className="price"> Rs. {formatPrice(price)}</p>}
                {isSale && (
                  <div className="price">
                <span className="original">Rs. {formatPrice(originalPrice)}</span>
                <span className="discounted">Rs. {formatPrice(discountedPrice)}</span>
              </div>
                )}
            </div>

            <button className='add-to-cart' onClick={handleAddToCart}>+</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard