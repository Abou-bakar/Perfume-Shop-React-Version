import { useWishlist } from "../context/WishlistContext"
import { useCart } from "../context/CartContext"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "../context/ToastContext";
import { Helmet } from "react-helmet-async"
import '../styles/wishlist.css';

const Wishlist = () => {
    const { wishlistItems, removeFromWishlist, addToWishlist } = useWishlist();
    const { addToCart, undoAddToCart } = useCart();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const formatPrice = (price) => {
        if (!price) return 0;
        if (typeof price === 'number') return price.toLocaleString('en-PK');
        const num = parseInt(String(price).replace(/[,\s]/g, ''));
        return isNaN(num) ? '0' : num.toLocaleString('en-PK');
    };

    const handleAddToCart = (item) => {
        try {
            addToCart(item);
            addToast(`${item.productName} added to cart`, "success", () => {
                undoAddToCart(item.id);
            });
        } catch (error) {
            console.error('Error adding to cart:', error);
            addToast('Failed to add item to cart', "error");
        }
    };

    const handleRemove = (item) => {
        removeFromWishlist(item.id);

        addToast(
            `${item.productName} removed`,
            "info",
            () => {
                addToWishlist(item);
            }
        );
    };;

    const handleMoveAllToCart = () => {
        try {
            wishlistItems.forEach(item => addToCart(item));
            addToast('All items added to cart!', "success");
        } catch (error) {
            console.error('Error adding items to cart:', error);
            addToast('Failed to add items to cart', "error");
        }
    };

    return (
        <>
            <Helmet>
                <title>Wishlist - Perfumes Mists</title>
                <meta name="description" content="Your saved fragrances at Perfumes Mists Pakistan." />
            </Helmet>

            <div className="wishlist-container">

                {/* Header */}
                <div className="wishlist-header">
                    <div>
                        <h1 className="wishlist-title">My Wishlist</h1>
                        <p className="wishlist-count">
                            {wishlistItems.length === 0
                                ? 'No saved items'
                                : `${wishlistItems.length} item${wishlistItems.length !== 1 ? 's' : ''} saved`}
                        </p>
                    </div>
                    {wishlistItems.length > 0 && (
                        <button className="wishlist-move-all-btn" onClick={handleMoveAllToCart}>
                            Add All to Cart
                        </button>
                    )}
                </div>

                {/* Empty state */}
                {wishlistItems.length === 0 ? (
                    <div className="wishlist-empty">
                        <i className="fa-regular fa-heart wishlist-empty-icon"></i>
                        <h2>Your wishlist is empty</h2>
                        <p>Save items you love by tapping the ♥ on any product.</p>
                        <Link to="/products">
                            <button className="wishlist-shop-btn">Browse Products</button>
                        </Link>
                    </div>
                ) : (
                    <div className="wishlist-grid">
                        {wishlistItems.map(item => {
                            const currentPrice = item.isSale ? item.discountedPrice : item.price;
                            return (
                                <div key={item.id} className="wishlist-card">

                                    {/* Remove button */}
                                    <button
                                        className="wishlist-remove-btn"
                                        onClick={() => handleRemove(item)}
                                        aria-label="Remove from wishlist"
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>

                                    {/* Image */}
                                    <div
                                        className="wishlist-card-img-wrapper"
                                        onClick={() => navigate(`/product/${item.id}`)}
                                    >
                                        <img src={item.images} alt={item.productName} className="wishlist-card-img" />
                                        {item.isSale && (
                                            <span className="wishlist-sale-tag">{item.salePercent}% OFF</span>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="wishlist-card-info">
                                        <h3
                                            className="wishlist-card-name"
                                            onClick={() => navigate(`/product/${item.id}`)}
                                        >
                                            {item.productName}
                                        </h3>

                                        <div className="wishlist-card-price">
                                            {item.isSale ? (
                                                <>
                                                    <span className="wishlist-original">Rs. {formatPrice(item.originalPrice)}</span>
                                                    <span className="wishlist-discounted">Rs. {formatPrice(item.discountedPrice)}</span>
                                                </>
                                            ) : (
                                                <span>Rs. {formatPrice(item.price)}</span>
                                            )}
                                        </div>

                                        <button
                                            className="wishlist-add-cart-btn"
                                            onClick={() => handleAddToCart(item)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
};

export default Wishlist