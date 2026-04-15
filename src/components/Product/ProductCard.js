import "./ProductCard.css"
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useNavigate } from 'react-router-dom';
import { useToast } from "../../context/ToastContext";

const ProductCard = ({ id, images, productName, price, isSale, salePercent, originalPrice, discountedPrice }) => {
  const { addToCart, undoAddToCart } = useCart();
  const { addToast } = useToast();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const wishlisted = isInWishlist(id);

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
    if (!id) return;
    addToCart({ id, images, productName, price, isSale, salePercent, originalPrice, discountedPrice });
    addToast(`${productName} added to cart`, "success", () => {
      undoAddToCart(id);
    });
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();

    const isCurrentlyWishlisted = isInWishlist(id);

    toggleWishlist({ id, images, productName, price, isSale, salePercent, originalPrice, discountedPrice });

    if (isCurrentlyWishlisted) {
      addToast(`${productName} removed`, "info", () => {
        toggleWishlist({ id, images, productName, price, isSale, salePercent, originalPrice, discountedPrice }); // undo
      });
    } else {
      addToast(`${productName} added ♥`, "success", () => {
        toggleWishlist({ id, images, productName, price, isSale, salePercent, originalPrice, discountedPrice }); // undo
      });
    }
  };

  const handleCardClick = () => navigate(`/product/${id}`)

  return (
    <div className='swiper-slide'>
      <div className="product-card" onClick={handleCardClick}>

        {/* Image + badges */}
        <div className="image-sale">
          <img src={images} alt={productName} />

          {isSale && (
            <span className="sale-tag">{salePercent}% OFF</span>
          )}

          {/* Wishlist heart */}
          <button
            className={`wishlist-btn ${wishlisted ? 'wishlisted' : ''}`}
            onClick={handleWishlistToggle}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {wishlisted ? (
              <i className='fa-solid fa-heart'></i>
            ) : (
              <i className='fa-regular fa-heart'></i>
            )}
          </button>
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
  );
};

export default ProductCard