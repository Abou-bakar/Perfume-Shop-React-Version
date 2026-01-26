import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/order-confirmation.css';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Get order details from sessionStorage (set from checkout page)
    const savedOrder = sessionStorage.getItem('orderDetails');
    
    if (!savedOrder) {
      // If no order details, redirect to home
      navigate('/');
      return;
    }

    const order = JSON.parse(savedOrder);
    setOrderDetails(order);

    // Clear cart after successful order
    clearCart();

    // Clear order details from sessionStorage after displaying
    // sessionStorage.removeItem('orderDetails'); // Optional: keep for now
  }, [navigate, clearCart]);

  if (!orderDetails) {
    return null;
  }

  const { orderNumber, items, formData, subTotal, shipping, total } = orderDetails;

  return (
    <>
      <nav className="checkout-nav">
        <Link to="/" aria-label="Go to home">
          <h2>Perfumes Mists</h2>
        </Link>
        <i className="fa-solid fa-bag-shopping"></i>
      </nav>

      <div className="order-wrapper">
        <div className="order-left">
          <section className="order-section-price">
            <p>Amount</p>
            <p>Rs. {total.toLocaleString('en-PK')}</p>
          </section>

          <section className="order-section-orderno">
            <i className="fa-regular fa-circle-check"></i>
            <div className="orderno">
              <p>Order #{orderNumber}</p>
              <h1>Thank you, {formData.firstName}!</h1>
            </div>
          </section>

          <section className="order-section-map">
            <div className="map-image">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107589.51494963268!2d74.00720293853131!3d32.574927565589945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f1b031e43442d%3A0x870fd23543d684c!2sGujrat%2C%20Pakistan!5e0!3m2!1sen!2s!4v1762423284903!5m2!1sen!2s"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="location"
              ></iframe>
              <h3>Your order is confirmed</h3>
              <p>
                You'll receive a confirmation email with your order number shortly.
              </p>
            </div>
          </section>

          {/* Order Items */}
          <section className="order-items-section">
            <h3>Order Items</h3>
            <div className="ordered-products">
              {items.map((item, index) => (
                <div key={index} className="ordered-product">
                  <img 
                    src={Array.isArray(item.images) ? item.images[0] : item.image} 
                    alt={item.productName} 
                  />
                  <div className="ordered-product-details">
                    <h4>{item.productName}</h4>
                    {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <p className="ordered-product-price">
                    Rs. {((item.isSale ? item.discountedPrice : item.price) * item.quantity).toLocaleString('en-PK')}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="order-right">
          <div className="order-details">
            <h3>Order Details</h3>

            <h4>Contact Information</h4>
            <p>{formData.email}</p>

            <h4>Shipping Address</h4>
            <p>{formData.firstName} {formData.lastName}</p>
            <p>{formData.address}</p>
            <p>{formData.city} {formData.postalCode}</p>
            <p>Pakistan</p>
            {formData.phone && <p>{formData.phone}</p>}

            <h4>Shipping Method</h4>
            <p>Standard - Rs. {shipping.toLocaleString('en-PK')}</p>

            <h4>Payment Method</h4>
            <p>
              {formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Deposit'} 
              {' - Rs. '}{total.toLocaleString('en-PK')}
            </p>

            <h4>Billing Address</h4>
            {formData.billingAddressType === 'same' ? (
              <>
                <p>{formData.firstName} {formData.lastName}</p>
                <p>{formData.address}</p>
                <p>{formData.city} {formData.postalCode}</p>
                <p>Pakistan</p>
                {formData.phone && <p>{formData.phone}</p>}
              </>
            ) : (
              <p>Different billing address</p>
            )}

            <div className="order-summary-total">
              <p>Subtotal: <span>Rs. {subTotal.toLocaleString('en-PK')}</span></p>
              <p>Shipping: <span>Rs. {shipping.toLocaleString('en-PK')}</span></p>
              <hr />
              <p className="total">Total: <span>Rs. {total.toLocaleString('en-PK')}</span></p>
            </div>
          </div>

          <Link to="/products">
            <button className="shopping">Continue Shopping</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;