import '../styles/contact.css'

const Contact = () => {
  return (
    <>

     <section className="contact-container">
      <div className="content">
        <h1>CONTACT US</h1>
        <br></br>
        <br></br>
        <p className="intro-text">
          Thank you for your interest in Afnan Perfumes! We’re excited to hear
          from you. Please use the form below to get in touch with us. Whether
          you’re looking to become a distributor, explore job opportunities,
          collaborate with us as an influencer, or have questions about online
          orders, we’re eager to connect.
        </p>
        <div className="form-container">
          <form action="" className="frm">
            <div className="two-column-section">
              <div className="field">
                <label className="label" for="business-area">Business Area *</label>
                <select
                  className="select"
                  id="business-area"
                  name="business-area"
                  required
                >
                  <option value="dept-1">Sales & Distribution</option>
                  <option value="dept-2">Marketing & Partnerships</option>
                  <option value="dept-3">Customer Service</option>
                </select>
              </div>

              <div className="field">
                <label className="label" for="request-type"
                  >Type of Request *</label
                >
                <select
                  className="select"
                  id="request-type"
                  name="request-type"
                  required
                >
                  <option value="product-inquiry">Product Inquiry</option>
                  <option value="purchase-request">Purchase Request</option>
                  <option value="general-inquiry">General Inquiry</option>
                </select>
              </div>

              <div className="field">
                <label className="label" for="title">Title *</label>
                <select className="select" id="title" name="title" required>
                  <option value="mr">Mr</option>
                  <option value="ms">Ms</option>
                  <option value="ms">Mrs</option>
                </select>
              </div>

              <div className="field">
                <label className="label" for="name">Name *</label>
                <input
                  className="input"
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="field">
                <label className="label" for="email">Email *</label>
                <input
                  className="input"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="field">
                <label className="label" for="country">Country *</label>
                <input
                  className="input"
                  id="country"
                  name="country"
                  placeholder="Your country"
                  required
                />
              </div>

              <div className="field">
                <label className="label" for="country">City *</label>
                <input
                  className="input"
                  id="country"
                  name="country"
                  placeholder="Your city"
                  required
                />
              </div>

              <div className="field">
                <label className="label" for="phone-number">Phone Number</label>
                <input
                  className="input"
                  id="phone-number"
                  name="phone-number"
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>

            <div className="field col-span-full">
              <label className="label" for="message">Your Message *</label>
              <textarea
                className="textarea"
                id="message"
                name="message"
                placeholder="Tell us more about your inquiry..."
                required
              ></textarea>
            </div>

            <div className="checkbox-field col-span-full">
              <div className="checkbox-wrapper">
                <input
                  aria-describedby="dpa-consent-description"
                  className="checkbox"
                  id="dpa-consent"
                  name="dpa-consent"
                  required
                  type="checkbox"
                  value="consent"
                />
              </div>
              <div>
                <label className="label" for="dpa-consent">
                  Declaration of consent for data processing *
                </label>
                <p className="description" id="dpa-consent-description">
                  You agree that your data from the form will be collected and
                  processed to answer your request. You can revoke your consent
                  at any time for the future by e-mail to info@perfumes.com.
                  Detailed information on the handling of user data can be found
                  in our data protection declaration.
                </p>
              </div>
            </div>

            <div className="button-group">
              <button className="button" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </section>

    </>
  )
}

export default Contact