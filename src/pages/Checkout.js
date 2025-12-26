import '../styles/checkout.css'

const Checkout = () => {
  return (
    <>
    <nav className="checkout-nav">
          <a href="home.html" aria-label="Go to home"><h2>Perfumes Mists</h2></a>
          <i className="fa-solid fa-bag-shopping"></i>
      </nav>
      <div className="checkout-wrapper">
              <div className="checkout-left">
                  <section className="checkout-section">
                      <h3>Contact</h3>
                      <input type="text" placeholder="Email or phone number" />
                  </section>

                  <section className="checkout-section">
                      <h3>Delivery</h3>
                      <div className="name">
                          <input type="text" placeholder="First Name" />
                          <input type="text" placeholder="Last Name" />
                      </div>
                      <input type="text" placeholder="Address" />
                      <div className="citycode">
                          <input type="text" placeholder="City" />
                          <input type="text" placeholder="Postal Code" />
                      </div>
                      <input type="text" placeholder="Phone(optional)" />
                  </section>

                  <section className="checkout-section">
                      <h3>Shipping Method</h3>
                      <div className="accordion-shipping">
                          <label>
                              <input type="radio" name="shipping" checked />
                              <span>Standard $5</span>
                          </label>
                      </div>
                  </section>

                  <section className="checkout-section accordion">
                      <h3>Payment</h3>
                      <div className="accordion-item-checkout">
                          <label className="accordion-header-checkout">
                              <input type="radio" name="payment" value="cod" checked />
                              <span>Cash on Delivery (COD)</span>
                          </label>
                          <div className="accordion-content-checkout">
                              <p>You can pay in cash when your order arrives.</p>
                              <br></br>
                              <p><strong>Estimated Delivery:</strong> 3–5 working days.</p>
                          </div>
                      </div>

                      <div className="accordion-item-checkout">
                          <label className="accordion-header-checkout">
                              <input type="radio" name="payment" value="bank" />
                              <span>Bank Deposit</span>
                          </label>
                          <div className="accordion-content-checkout">
                              <p>
                                  Transfer the amount to our bank account and upload payment
                                  proof.
                              </p>
                              <br></br>
                              <br></br>
                              <ul>
                                  <li><strong>Bank:</strong>Meezan Bank</li>
                                  <br></br>
                                  <br></br>
                                  <li><strong>Account Title:</strong>XYZ</li>
                                  <br></br>
                                  <br></br>
                                  <li><strong>Account No:</strong> 1234567890</li>
                                  <br></br>
                                  <br></br>
                                  <li><strong>IBAN:</strong> PK12MEZN1234567890</li>
                              </ul>
                          </div>
                      </div>
                  </section>

                  <section className="checkout-section accordion">
                      <h3>Billing Address</h3>
                      <div className="accordion-item-checkout non-expandable">
                          <label className="accordion-header-checkout">
                              <input type="radio" name="billing" value="same" checked />
                              <span>Same as shipping address</span>
                          </label>
                      </div>

                      <div className="accordion-item-checkout">
                          <label className="accordion-header-checkout">
                              <input type="radio" name="billing" value="different" />
                              <span>Use a different billing address</span>
                          </label>
                          <div className="accordion-content-checkout">
                              <form className="billing-form">
                                  <div className="name">
                                      <input type="text" placeholder="First Name" />
                                      <input type="text" placeholder="Last Name" />
                                  </div>
                                  <input type="text" placeholder="Address" />
                                  <div className="citycode">
                                      <input type="text" placeholder="City" />
                                      <input type="text" placeholder="Postal Code" />
                                  </div>
                                  <input type="text" placeholder="Phone(optional)" />
                              </form>
                          </div>
                      </div>
                  </section>
                  <a href="order-confirmation.html"
                  ><button className="complete-order">Complete Order</button></a>
              </div>

              <div className="checkout-right">
                  <div className="order-items" id="order-items"></div>

                  <div className="order-summary">
                      <p>Subtotal: $<span id="summary-subtotal">0</span></p>
                      <p>Shipping: $<span id="summary-shipping">0</span></p>
                      <p>Total: $<span id="summary-total">0</span></p>
                  </div>
              </div>
          </div>
          </>

  )
}

export default Checkout