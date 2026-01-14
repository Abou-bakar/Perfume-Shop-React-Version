import React from 'react'
import "./ProductCard.css"
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


const ProductCard = ( {id, image, title, price, isSale, salePercent, originalPrice, discountedPrice}) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
     e.stopPropagation(); // Prevent card click when clicking the + button

       // Make sure id exists and is unique
    if (!id) {
      console.error('Product missing id!');
      return;
    }
    
    const product = {
    id,
    image,
    title,
    price,
    isSale,
    salePercent,
    originalPrice,
    discountedPrice,
  };

  addToCart(product);

  // Optional: Show feedback to user
       toast.success(`${title} added to cart`);
};

  const handleCardClick = () => {
    navigate(`/product/${id}`)
  }

  return (
    <div className='swiper-slide'>
        <div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
           {/* Image + Sale tag */}
           <div className="image-sale">
            <img src={image} alt={title} />

            {isSale && (
            <span className="sale-tag">{salePercent}% OFF</span>
          )}
            </div>

            <div className="product-info">
            <div className="product-details">
                <h3>{title}</h3>

                {/* Price */}
                {!isSale && <p className="price"> Rs. {price.toLocaleString("en-PK")}</p>}
                {isSale && (
                  <div className="price">
                <span className="original">Rs. {originalPrice.toLocaleString("en-PK")}</span>
                <span className="discounted">Rs. {discountedPrice.toLocaleString("en-PK")}</span>
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