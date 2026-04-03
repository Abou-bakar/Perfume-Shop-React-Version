import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import '../styles/checkout.css'
import { image } from 'framer-motion/client';

const Checkout = () => {
    const { cartItems, getCartTotal } = useCart();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        phone: "",
        paymentMethod: 'cod',
        billingAddressType: 'same'
    })

    // Redirect if cart is empty
    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/');
        }
    }, [cartItems, navigate]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const shippingCost = 250;
    const subTotal = getCartTotal();
    const total = subTotal + shippingCost;

    const handleCompleteOrder = async () => {
        // Validate required fields
        if (!formData.email || !formData.firstName || !formData.lastName || !formData.address || !formData.city || !formData.phone) {
            toast.error('Please fill in all required fields');
            return;
        };

        setSubmitting(true);

        try {
            // Generate order number
            const orderNumber = Math.floor(10000 + Math.random() * 90000)

            // Prepare order details for Firestore
            const orderData = {
                orderNumber,
                customerInfo: {
                    email: formData.email,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    address: formData.address,
                    city: formData.city,
                    postalCode: formData.postalCode,
                    phone: formData.phone
                },
                items: cartItems.map(item => ({
                    id: item.id,
                    productName: item.productName,
                    price: item.price,
                    discountedPrice: item.discountedPrice || null,
                    isSale: item.isSale || false,
                    quantity: item.quantity,
                    selectedSize: item.selectedSize || null,
                    image: Array.isArray(item.images) ? item.images[0] : item.image
                })),
                subTotal,
                shipping: shippingCost,
                total,
                paymentMethod: formData.paymentMethod,
                billingAddressType: formData.billingAddressType,
                status: 'pending', // pending, confirmed, shipped, delivered, cancelled
                createdAt: new Date(),
                updatedAt: new Date()
            };

            // Save order to Firestore
            const ordersRef = collection(db, "orders");
            const docRef = await addDoc(ordersRef, orderData);

            console.log("Order saved with ID:", docRef.id);

            // Prepare order details for session storage (for confirmation page)
            const orderDetails = {
                orderNumber,
                items: cartItems,
                formData,
                subTotal,
                shipping: shippingCost,
                total,
                orderData: new Date().toISOString()
            };

            // Save to sessionStorage for confirmation page
            sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));

            // Show success message
            toast.success('Order placed successfully!');

            // Navigate to confirmation page
            navigate('/order-confirmation')

        } catch (error) {
            console.error("Error saving order:", error);
            toast.error('Failed to place order. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (cartItems.length === 0) {
        return null;
    }

    return (
        <>
            <nav className="checkout-nav">
                <Link to="/" aria-label="Go to home">
                    <h2>Perfumes Mists</h2>
                </Link>
                <i className="fa-solid fa-bag-shopping"></i>
            </nav>
            <div className="checkout-wrapper">
                <div className="checkout-left">
                    <section className="checkout-section">
                        <h3>Contact</h3>
                        <input
                            type="text"
                            name='email'
                            placeholder="Email or phone number"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </section>

                    <section className="checkout-section">
                        <h3>Delivery</h3>
                        <div className="name">
                            <input
                                type="text"
                                name='firstName'
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name='lastName'
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <input
                            type="text"
                            name='address'
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="citycode">
                            <input
                                type="text"
                                name='city'
                                placeholder="City"
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name='postalCode'
                                placeholder="Postal Code"
                                value={formData.postalCode}
                                onChange={handleInputChange}
                            />
                        </div>
                        <input
                            type="text"
                            name='phone'
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </section>

                    <section className="checkout-section">
                        <h3>Shipping Method</h3>
                        <div className="accordion-shipping">
                            <label>
                                <input type="radio" name="shipping" defaultChecked />
                                <span>Standard Rs. {shippingCost}</span>
                            </label>
                        </div>
                    </section>

                    <section className="checkout-section accordion">
                        <h3>Payment</h3>

                        {/* COD */}
                        <div className="accordion-item-checkout">
                            <label className="accordion-header-checkout">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cod"
                                    checked={formData.paymentMethod === 'cod'}
                                    onChange={handleInputChange}
                                />
                                <span>Cash on Delivery (COD)</span>
                            </label>

                            <div
                                className={`accordion-content-checkout ${formData.paymentMethod === 'cod' ? 'open' : ''
                                    }`}
                            >
                                <p>You can pay in cash when your order arrives.</p>
                                <p><strong>Estimated Delivery:</strong> 3–5 working days.</p>
                            </div>
                        </div>

                        {/* BANK */}
                        <div className="accordion-item-checkout">
                            <label className="accordion-header-checkout">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="bank"
                                    checked={formData.paymentMethod === 'bank'}
                                    onChange={handleInputChange}
                                />
                                <span>Bank Deposit</span>
                            </label>

                            <div
                                className={`accordion-content-checkout ${formData.paymentMethod === 'bank' ? 'open' : ''
                                    }`}
                            >
                                <p>
                                    Transfer the amount to our bank account and upload payment proof.
                                </p>

                                <ul>
                                    <li><strong>Bank:</strong> Meezan Bank</li>
                                    <li><strong>Account Title:</strong> XYZ</li>
                                    <li><strong>Account No:</strong> 1234567890</li>
                                    <li><strong>IBAN:</strong> PK12MEZN1234567890</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="checkout-section accordion">
                        <h3>Billing Address</h3>

                        <div className="accordion-item-checkout non-expandable">
                            <label className="accordion-header-checkout">
                                <input
                                    type="radio"
                                    name="billingAddressType"
                                    value="same"
                                    checked={formData.billingAddressType === 'same'}
                                    onChange={handleInputChange}
                                />
                                <span>Same as shipping address</span>
                            </label>
                        </div>

                        <div className="accordion-item-checkout">
                            <label className="accordion-header-checkout">
                                <input
                                    type="radio"
                                    name="billingAddressType"
                                    value="different"
                                    checked={formData.billingAddressType === 'different'}
                                    onChange={handleInputChange}
                                />
                                <span>Use a different billing address</span>
                            </label>

                            <div
                                className={`accordion-content-checkout ${formData.billingAddressType === 'different' ? 'open' : ''
                                    }`}
                            >
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

                                    <input type="text" placeholder="Phone" />
                                </form>
                            </div>
                        </div>
                    </section>

                    <button
                        className="complete-order"
                        onClick={handleCompleteOrder}
                        disabled={submitting}
                        style={{
                            opacity: submitting ? 0.6 : 1,
                            cursor: submitting ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {submitting ? 'Processing...' : 'Complete Order'}
                    </button>
                </div>

                <div className="checkout-right">
                    <div className="order-items">
                        {cartItems.map((item) => (
                            <div key={item.id} className='order-item'>
                                <img
                                    src={Array.isArray(item.images) ? item.images[0] : item.image}
                                    alt={item.productName}
                                />
                                <div className='order-item-details'>
                                    <h4>{item.productName}</h4>
                                    {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                                    <p>Qty: {item.quantity}</p>
                                </div>
                                <p className='order-item-price'>
                                    Rs. {((item.isSale ? item.discountedPrice : item.price) * item.quantity).toLocaleString('en-PK')}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="order-summary">
                        <p>Subtotal: Rs. {subTotal.toLocaleString('en-PK')}</p>
                        <p>Shipping: Rs. {shippingCost.toLocaleString('en-PK')}</p>
                        <hr style={{ margin: '10px 0', border: '1px solid #eee' }} />
                        <p style={{ fontWeight: 'bold', fontSize: '18px' }}>
                            Total: Rs. {total.toLocaleString('en-PK')}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout