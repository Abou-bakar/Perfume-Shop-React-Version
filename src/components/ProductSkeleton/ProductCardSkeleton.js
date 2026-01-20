import "./ProductCardSkeleton.css";

const ProductCardSkeleton = () => {
  return (
     <div className="product-card skeleton-card">
      
      {/* Image */}
      <div className="skeleton skeleton-image" />

      {/* Info */}
      <div className="product-info">
        <div className="product-details">

          {/* Product Name (2 lines like real card) */}
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-title short" />

          {/* Price */}
          <div className="skeleton skeleton-price" />
        </div>

        {/* Add to cart */}
        <div className="skeleton skeleton-btn" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
