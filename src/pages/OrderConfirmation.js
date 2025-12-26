import '../styles/order-confirmation.css'

const OrderConfirmation = () => {
  return (
    <>
   <nav className="checkout-nav">
          <a href="home.html" aria-label="Go to home"><h2>Perfumes Mists</h2></a>
          <i className="fa-solid fa-bag-shopping"></i>
      </nav>
      
    <div className="order-wrapper">
      <div className="order-left">
        <section className="order-section-price">
          <p>Amount</p>
          <p>154.00$</p>
        </section>

        <section className="order-section-orderno">
          <i className="fa-regular fa-circle-check"></i>
          <div className="orderno">
            <p>Order #28732</p>
            <h1>Thank you, Ali!</h1>
          </div>
        </section>
        <section className="order-section-map">
          <div className="map-image">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107589.51494963268!2d74.00720293853131!3d32.574927565589945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f1b031e43442d%3A0x870fd23543d684c!2sGujrat%2C%20Pakistan!5e0!3m2!1sen!2s!4v1762423284903!5m2!1sen!2s"
              style={{ border: 0 }}
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="location"
            ></iframe>
            <h3>Your order is confirmed</h3>
            <p>
              You'll receive a confirmation email with your order number
              shortly.
            </p>
          </div>
        </section>
      </div>

      <div className="order-right">
        <div className="order-details">
          <h3>Order details</h3>
          <h4>Contact Information</h4>
          <p>abc123@gmail.com</p>

          <h4>Shipping Address</h4>
          <p>Ali Haider</p>
          <p>231-B Block Shadman Rehman Shaheed road, Gujrat.</p>
          <p>231-B Block</p>
          <p>Gujrat</p>
          <p>Pakistan</p>
          <p>+923331234567</p>

          <h4>Shipping Method</h4>
          <p>Standard</p>

          <h4>Payment Method</h4>
          <p>Cash on Delivery - 154.00$</p>

          <h4>Billing Address</h4>
          <p>Ali Haider</p>
          <p>231-B Block Shadman Rehman Shaheed road, Gujrat.</p>
          <p>231-B Block</p>
          <p>Gujrat</p>
          <p>Pakistan</p>
          <p>+923331234567</p>
        </div>
        <a href="products.html"
          ><button className="shopping">Continue Shopping</button></a
        >
      </div>
    </div>
    </>
  )
}

export default OrderConfirmation