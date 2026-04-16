import "./ProductCard.css"
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ id, images, productName, price, isSale, salePercent, originalPrice, discountedPrice }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const wishlisted = isInWishlist(id);

  const formatPrice = (price) => {
    if (!price) return "0";
    if (typeof price === 'number') return price.toLocaleString("en-PK");
    if (typeof price === 'string') {
      const numPrice = parseInt(price.replace(/[,\s]/g, ''));
      if (!isNaN(numPrice)) return numPrice.toLocaleString("en-PK");
      return price;
    }
    return "0";
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!id) return;
    addToCart({ id, images, productName, price, isSale, salePercent, originalPrice, discountedPrice });
    // cart drawer opens automatically via CartContext
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist({ id, images, productName, price, isSale, salePercent, originalPrice, discountedPrice });
    // heart icon fills/unfills — that's the feedback, no toast needed
  };

  const handleCardClick = () => navigate(`/product/${id}`);

  return (
    <div className='swiper-slide'>
      <div className="product-card" onClick={handleCardClick}>

        <div className="image-sale">
          <img src={images} alt={productName} />

          {isSale && (
            <span className="sale-tag">{salePercent}% OFF</span>
          )}

          <button
            className={`wishlist-btn ${wishlisted ? 'wishlisted' : ''}`}
            onClick={handleWishlistToggle}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {wishlisted
              ? <i className='fa-solid fa-heart'></i>
              : <i className='fa-regular fa-heart'></i>
            }
          </button>
        </div>

        <div className="product-info">
          <div className="product-details">
            <h3>{productName}</h3>
            {!isSale && <p className="price">Rs. {formatPrice(price)}</p>}
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
  );
};

export default ProductCard;