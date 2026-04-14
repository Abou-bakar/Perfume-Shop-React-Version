import { useCart } from '../context/CartContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import '../styles/checkout.css';

// ─── Constants ───────────────────────────────────────────────────────────────

const SHIPPING_COST = 250;

const PHONE_REGEX = /^3[0-9]{9}$/;

// ─── Validation Schema ────────────────────────────────────────────────────────

const checkoutSchema = Yup.object({
    // Contact
    email: Yup.string()
        .required('Email is required')
        .matches(
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            'Enter a valid email'
        ),

    // Delivery
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    postalCode: Yup.string()
        .matches(/^[0-9]{4,6}$/, 'Invalid postal code')
        .nullable(),
    phone: Yup.string()
        .required('Phone is required')
        .matches(PHONE_REGEX, 'Invalid phone number'),

    // Payment
    paymentMethod: Yup.string().required('Select payment method'),

    // Billing
    billingAddressType: Yup.string().required(),
    billingFirstName: Yup.string().when('billingAddressType', {
        is: 'different',
        then: (schema) => schema.required('First name required'),
    }),
    billingLastName: Yup.string().when('billingAddressType', {
        is: 'different',
        then: (schema) => schema.required('Last name required'),
    }),
    billingCity: Yup.string().when('billingAddressType', {
        is: 'different',
        then: (schema) => schema.required('City required'),
    }),
    billingPhone: Yup.string().when('billingAddressType', {
        is: 'different',
        then: (schema) =>
            schema.required('Phone required').matches(PHONE_REGEX, 'Invalid phone'),
    }),
});

// ─── Initial Values ───────────────────────────────────────────────────────────

const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'cod',
    billingAddressType: 'same',
    billingFirstName: '',
    billingLastName: '',
    billingAddress: '',
    billingCity: '',
    billingPostalCode: '',
    billingPhone: '',
};

// ─── Helper ───────────────────────────────────────────────────────────────────

const getItemImage = (item) =>
    Array.isArray(item.images) ? item.images[0] : item.image;

// ─── FieldError Component ─────────────────────────────────────────────────────

const FieldError = ({ touched, error }) =>
    touched && error ? <span className="error">{error}</span> : null;

// ─── Component ────────────────────────────────────────────────────────────────

const Checkout = () => {
    const { cartItems, getCartTotal } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const subTotal = getCartTotal();
    const total = subTotal + SHIPPING_COST;

    // ── Hooks must be called unconditionally ──────────────────────────────────

    const formik = useFormik({
        initialValues,
        validationSchema: checkoutSchema,
        onSubmit: handleSubmit,
    });

    const orderSubmitted = useRef(false)

    // Redirect if cart is empty — after hooks
    useEffect(() => {
        if (cartItems.length === 0) navigate('/');
    }, []);


    // ── Submit handler ────────────────────────────────────────────────────────

    async function handleSubmit(values, { setSubmitting }) {
        try {
            // ── Normalize phone numbers ──────────────────────────────────
            const normalizePhone = (val) =>
                '+92' + val.replace(/^(\+?92|0)/, '');  // arrow, no braces = implicit return

            const normalizedValues = {
                ...values,
                phone: normalizePhone(values.phone),
                billingPhone: values.billingPhone
                    ? normalizePhone(values.billingPhone)
                    : '',
            };
            // ─────────────────────────────────────────────────────────────

            const orderNumber = Math.floor(10000 + Math.random() * 90000);

            const orderData = {
                orderNumber,
                customerInfo: {
                    email: normalizedValues.email,
                    firstName: normalizedValues.firstName,
                    lastName: normalizedValues.lastName,
                    address: normalizedValues.address,
                    city: normalizedValues.city,
                    postalCode: normalizedValues.postalCode || null,
                    phone: normalizedValues.phone,       // ← +92XXXXXXXXXX
                },
                items: cartItems.map((item) => ({
                    id: item.id,
                    productName: item.productName,
                    price: item.price,
                    discountedPrice: item.discountedPrice ?? null,
                    isSale: item.isSale ?? false,
                    quantity: item.quantity,
                    selectedSize: item.selectedSize ?? null,
                    image: getItemImage(item),
                })),
                subTotal,
                shipping: SHIPPING_COST,
                total,
                paymentMethod: normalizedValues.paymentMethod,
                billingAddressType: normalizedValues.billingAddressType,
                status: 'pending',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const ordersRef = collection(db, 'orders');
            const docRef = await addDoc(ordersRef, orderData);
            console.log('Order saved with ID:', docRef.id);

            const orderDetails = {
                orderNumber,
                items: cartItems,
                values: normalizedValues,               // ← confirmation page gets +92
                subTotal,
                shipping: SHIPPING_COST,
                total,
                orderDate: new Date().toISOString(),
            };

            sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));
            toast.success('Order placed successfully!');
            navigate('/order-confirmation', { state: { fromCheckout: true } });
        } catch (error) {
            console.error('Error saving order:', error);
            toast.error('Failed to place order. Please try again.');
        } finally {
            setSubmitting(false);
        }
    }

    const { values, touched, errors, handleChange, handleBlur, handleSubmit: onSubmit, isSubmitting } = formik;
    const isDifferentBilling = values.billingAddressType === 'different';

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <>
            <nav className="checkout-nav">
                <Link to="/" aria-label="Go to home">
                    <h2>Perfumes Mists</h2>
                </Link>
                <i className="fa-solid fa-bag-shopping" />
            </nav>

            <form onSubmit={onSubmit}>
                <div className="checkout-wrapper">

                    {/* ── Left Column ── */}
                    <div className="checkout-left">

                        {/* Email */}
                        <section className="checkout-section">
                            <h3>Email</h3>
                            <div className='floating-input'>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder=""
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="email"
                                />
                                <label>Email</label>
                            </div>
                            <FieldError touched={touched.email} error={errors.email} />
                        </section>

                        {/* Delivery */}
                        <section className="checkout-section">
                            <h3>Delivery</h3>
                            <div className="name">
                                <div className='floating-input'>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder=""
                                        value={values.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        autoComplete="given-name"
                                    />
                                    <label>First Name</label>
                                </div>
                                <FieldError touched={touched.firstName} error={errors.firstName} />
                                <div className='floating-input'>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder=""
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        autoComplete="family-name"
                                    />
                                    <label>Last Name</label>
                                </div>
                                <FieldError touched={touched.lastName} error={errors.lastName} />
                            </div>
                            <div className='floating-input'>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder=""
                                    value={values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="street-address"
                                />
                                <label>Address</label>
                            </div>
                            <FieldError touched={touched.address} error={errors.address} />

                            <div className="citycode">
                                <div className='floating-input'>
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder=""
                                        value={values.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        autoComplete="address-level2"
                                    />
                                    <label>City</label>
                                </div>
                                <FieldError touched={touched.city} error={errors.city} />
                                <div className='floating-input'>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        placeholder=""
                                        value={values.postalCode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        autoComplete="postal-code"
                                    />
                                    <label>Postal Code</label>
                                </div>
                                <FieldError touched={touched.postalCode} error={errors.postalCode} />
                            </div>
                            <div className='floating-input phone-input'>
                                <span className='phone-prefix'>+92</span>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder=""
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="tel"
                                />
                                {/* <label>Phone</label> */}
                            </div>
                            <FieldError touched={touched.phone} error={errors.phone} />
                        </section>

                        {/* Shipping Method */}
                        <section className="checkout-section">
                            <h3>Shipping Method</h3>
                            <div className="accordion-shipping">
                                <label>
                                    <input type="radio" name="shipping" defaultChecked readOnly />
                                    <span>Standard — Rs. {SHIPPING_COST}</span>
                                </label>
                            </div>
                        </section>

                        {/* Payment */}
                        <section className="checkout-section accordion">
                            <h3>Payment</h3>

                            {/* COD */}
                            <div className="accordion-item-checkout">
                                <label className="accordion-header-checkout">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={values.paymentMethod === 'cod'}
                                        onChange={handleChange}
                                    />
                                    <span>Cash on Delivery (COD)</span>
                                </label>
                                <div className={`accordion-content-checkout ${values.paymentMethod === 'cod' ? 'open' : ''}`}>
                                    <p>You can pay in cash when your order arrives.</p>
                                    <p><strong>Estimated Delivery:</strong> 3–5 working days.</p>
                                </div>
                            </div>

                            {/* Bank */}
                            <div className="accordion-item-checkout">
                                <label className="accordion-header-checkout">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="bank"
                                        checked={values.paymentMethod === 'bank'}
                                        onChange={handleChange}
                                    />
                                    <span>Bank Deposit</span>
                                </label>
                                <div className={`accordion-content-checkout ${values.paymentMethod === 'bank' ? 'open' : ''}`}>
                                    <p>Transfer the amount to our bank account and upload payment proof.</p>
                                    <ul>
                                        <li><strong>Bank:</strong> Meezan Bank</li>
                                        <li><strong>Account Title:</strong> XYZ</li>
                                        <li><strong>Account No:</strong> 1234567890</li>
                                        <li><strong>IBAN:</strong> PK12MEZN1234567890</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Billing Address */}
                        <section className="checkout-section accordion">
                            <h3>Billing Address</h3>

                            <div className="accordion-item-checkout non-expandable">
                                <label className="accordion-header-checkout">
                                    <input
                                        type="radio"
                                        name="billingAddressType"
                                        value="same"
                                        checked={values.billingAddressType === 'same'}
                                        onChange={handleChange}
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
                                        checked={isDifferentBilling}
                                        onChange={handleChange}
                                    />
                                    <span>Use a different billing address</span>
                                </label>

                                <div className={`accordion-content-checkout ${isDifferentBilling ? 'open' : ''}`}>
                                    <div className="billing-form">
                                        <div className="name">
                                            <div className='floating-input'>
                                                <input
                                                    type="text"
                                                    name="billingFirstName"
                                                    placeholder=""
                                                    value={values.billingFirstName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <label>First Name</label>
                                            </div>
                                            <FieldError touched={touched.billingFirstName} error={errors.billingFirstName} />
                                            <div className='floating-input'>
                                                <input
                                                    type="text"
                                                    name="billingLastName"
                                                    placeholder=""
                                                    value={values.billingLastName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <label>Last Name</label>
                                            </div>
                                            <FieldError touched={touched.billingLastName} error={errors.billingLastName} />
                                        </div>
                                        <div className='floating-input'>
                                            <input
                                                type="text"
                                                name="billingAddress"
                                                placeholder=""
                                                value={values.billingAddress}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <label>Address</label>
                                        </div>
                                        <FieldError touched={touched.billingAddress} error={errors.billingAddress} />

                                        <div className="citycode">
                                            <div className='floating-input'>
                                                <input
                                                    type="text"
                                                    name="billingCity"
                                                    placeholder=""
                                                    value={values.billingCity}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <label>City</label>
                                            </div>
                                            <FieldError touched={touched.billingCity} error={errors.billingCity} />
                                            <div className='floating-input'>
                                                <input
                                                    type="text"
                                                    name="billingPostalCode"
                                                    placeholder=""
                                                    value={values.billingPostalCode}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <label>Postal Code</label>
                                            </div>
                                            <FieldError touched={touched.billingPostalCode} error={errors.billingPostalCode} />
                                        </div>
                                        <div className='floating-input phone-input'>
                                            <span className='phone-prefix'>+92</span>
                                            <input
                                                type="tel"
                                                name="billingPhone"
                                                placeholder=""
                                                value={values.billingPhone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {/* <label>Phone</label> */}
                                        </div>
                                        <FieldError touched={touched.billingPhone} error={errors.billingPhone} />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <button
                            type="submit"
                            className="complete-order"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Processing...' : 'Complete Order'}
                        </button>
                    </div>

                    {/* ── Right Column ── */}
                    <div className="checkout-right">
                        <div className="order-items">
                            {cartItems.map((item) => {
                                const itemPrice = item.isSale ? item.discountedPrice : item.price;
                                return (
                                    <div key={item.id} className="order-item">
                                        <img
                                            src={getItemImage(item)}
                                            alt={item.productName}
                                            loading="lazy"
                                        />
                                        <div className="order-item-details">
                                            <h4>{item.productName}</h4>
                                            {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                                            <p>Qty: {item.quantity}</p>
                                        </div>
                                        <p className="order-item-price">
                                            Rs. {(itemPrice * item.quantity).toLocaleString('en-PK')}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="order-summary">
                            <p>Subtotal: Rs. {subTotal.toLocaleString('en-PK')}</p>
                            <p>Shipping: Rs. {SHIPPING_COST.toLocaleString('en-PK')}</p>
                            <hr style={{ margin: '10px 0', border: '1px solid #eee' }} />
                            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>
                                Total: Rs. {total.toLocaleString('en-PK')}
                            </p>
                        </div>
                    </div>

                </div>
            </form>
        </>
    );
};

export default Checkout;