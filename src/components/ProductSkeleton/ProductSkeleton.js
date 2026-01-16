import React from 'react'
import './ProductSkeleton.css'

const ProductSkeleton = () => {
 return (
    <div className="product-detail-skeleton">
      <div className="skeleton-grid">
        
        {/* Left: Image */}
        <div className="skeleton skeleton-image" />

        {/* Right: Details */}
        <div className="skeleton-content">
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-price" />
          <div className="skeleton skeleton-text" />
          <div className="skeleton skeleton-text short" />
          <div className="skeleton skeleton-button" />
        </div>

      </div>
    </div>
  );
}

export default ProductSkeleton