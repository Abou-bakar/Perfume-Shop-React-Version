import React from 'react'
import "./ProductCard.css"
const ProductCard = ( {image, title, price, isSale, salePercent, originalPrice, discountedPrice}) => {
  return (
    <div className='swiper-slide'>
        <div className="product-card">
           {/* Image + Sale tag */}
           <div className="image-sale">
            <img src={image} alt="" />

            {isSale && (
            <span className="sale-tag">{salePercent}% OFF</span>
          )}
            </div>

            <div className="product-info">
            <div className="product-details">
                <h3>{title}</h3>

                {/* Price */}
                {!isSale && <p className="price">{price}</p>}
                {isSale && (
                  <div className="price">
                <span className="original">{originalPrice}</span>
                <span className="discounted">{discountedPrice}</span>
              </div>
                )}
            </div>

            <button className='add-to-cart'>+</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard