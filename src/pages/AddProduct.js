import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import '../styles/addproduct.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import logo from "../assets/images/logo.png";

const AddProduct = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    category: 'fragrance',
    for: 'men',
    images: [''],
    sizes: [{ size: '', price: '' }],
    isSale: false,
    discountedPrice: '',
    originalPrice: '',
    salePercent: '',
    description: '',
    stock: ''
  });

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleAddImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }))
  }

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleImageChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }))
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  };

  // Add new size input
  const handleAddSize = () => {
    setFormData(prev => ({
      ...prev,
      sizes: [...prev.sizes, { size: '', price: '' }]
    }))
  };

  // Remove size input
  const handleRemoveSize = (index) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }))
  };

  // Update specific size
  const handleSizeChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.map((s, i) => i === index ? { ...s, [field]: value } : s)
    }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Filter out empty image URLs
      const validImages = formData.images.filter(img => img.trim() !== '');

      if (validImages.length === 0) {
        setMessage('❌ Please add at least one product image')
        setLoading(false)
        return;
      }

      // Filter out empty sizes
      const validSizes = formData.sizes.filter(s => s.size.trim() !== '' && s.price.trim() !== '');

      if (validSizes.length === 0) {
        setMessage('❌ Please add at least one size with price')
        setLoading(false)
        return;
      }

      // Prepare product data
      const productData = {
        productName: formData.productName,
        price: parseInt(validSizes[0].price),
        category: formData.category,
        for: formData.for,
        image: validImages[0], // First image as main image
        images: validImages, // Array of all images
        sizes: validSizes.map(s => ({
          size: s.size,
          price: parseInt(s.price)
        })),
        isSale: formData.isSale,
        description: formData.description || '',
        stock: formData.stock ? parseInt(formData.stock) : 0,
      };

      // Add sale fields only if it's a sale item
      if (formData.isSale) {
        // Apply same discount to all sizes
        const salePercent = parseInt(formData.salePercent)
        productData.saleSizes = validSizes.map(s => {
          const originalPrice = parseInt(s.price);
          const discountedPrice = Math.round(originalPrice * (1 - salePercent / 100))
          return {
            size: s.size,
            originalPrice: originalPrice,
            discountedPrice: discountedPrice
          }
        });
        productData.salePercent = salePercent;
        productData.originalPrice = parseInt(validSizes[0].price);
        productData.discountedPrice = productData.saleSizes[0].discountedPrice;
      } else {
        productData.saleSizes = null;
        productData.originalPrice = null;
        productData.discountedPrice = null;
        productData.salePercent = null;
      }

      // Add to Firestore - Firestore will auto-generate the ID
      const docRef = await addDoc(collection(db, "products"), productData);

      console.log("Product added with ID:", docRef.id);

      setMessage('✅ Product added successfully!');

      // Reset form
      setFormData({
        productName: '',
        price: '',
        category: 'fragrance',
        for: 'men',
        images: [''],
        sizes: [{ size: '', price: '' }],
        isSale: false,
        discountedPrice: '',
        originalPrice: '',
        salePercent: '',
        description: '',
        stock: ''
      })

      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000)

    } catch (error) {
      console.error("Error adding product:", error);
      setMessage('❌ Error adding product: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <>
      <div className="addproduct-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
        <span className="logo">
          <img src={logo} alt="" />
          <h1>Perfumes<br />Mists</h1>
        </span>
        <nav className="admin-menu">
          <Link to="/admin">Dashboard</Link>
          <Link to="/add-product" className="active-link">Add Product</Link>
          <Link to="/manage-products">Manage Products</Link>
          <Link to="/manage-inventory">Manage Inventory</Link>
          <Link to="/manage-orders">Manage Orders</Link>
          <Link to="/analytics">Analytics</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/settings">Settings</Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </nav>
      </aside>

        {/* Main Content */}
        <div className="addproduct-container">
          <div className="addproduct-header">
            <h1>Add New Product</h1>
          </div>

          {message && (
            <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="product-form">
            {/* Basic Info */}
            <div className="form-section">
              <h2>Basic Information</h2>

              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Dior Sauvage"
                />
              </div>

              {/* Sizes & Pricing */}
              <div className="form-section">
                <h2>Sizes & Pricing</h2>
                <small style={{ color: '#666', fontSize: '12px', display: 'block', marginBottom: '15px' }}>
                  Add size options with their respective prices
                </small>

                {formData.sizes.map((sizeObj, index) => (
                  <div key={index} className="form-group size-input-group">
                    <label>Size {index + 1} {index === 0 && '*'}</label>
                    <div className="size-input-wrapper">
                      <input
                        type='text'
                        value={sizeObj.size}
                        onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                        required={index === 0}
                        placeholder="e.g., 50ml, 100ml, Small, Medium"
                        className="size-name-input"
                      />
                      <input
                        type="number"
                        value={sizeObj.price}
                        onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                        required={index === 0}
                        placeholder="Price (PKR)"
                        className="size-price-input"
                      />
                      {index > 0 && (
                        <button
                          type='button'
                          onClick={() => handleRemoveSize(index)}
                          className="remove-img-btn"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type='button'
                  onClick={handleAddSize}
                  className="add-img-btn"
                >
                  + Add Another Size
                </button>
              </div>

              {/* Sale Pricing (only show if isSale is checked) */}
              {/* {formData.isSale && (
                <div className="form-section">
                  <h2>Sale Pricing by Size</h2>

                  {formData.saleSizes.map((sizeObj, index) => (
                    <div key={index} className="form-row">
                      <div className="form-group">
                        <label>{sizeObj.size} - Original Price</label>
                        <input
                          type="number"
                          value={sizeObj.originalPrice}
                          onChange={(e) => handleSaleSizePriceChange(index, 'originalPrice', e.target.value)}
                          placeholder="Original price"
                          required={formData.isSale}
                        />
                      </div>
                      <div className="form-group">
                        <label>{sizeObj.size} - Discounted Price</label>
                        <input
                          type="number"
                          value={sizeObj.discountedPrice}
                          onChange={(e) => handleSaleSizePriceChange(index, 'discountedPrice', e.target.value)}
                          placeholder="Discounted price"
                          required={formData.isSale}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )} */}

              <div className="form-group">
                <label>Price (PKR) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 15000"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="fragrance">Fragrance</option>
                    <option value="body-mist">Body Mist</option>
                    <option value="deodorant">Deodorant</option>
                    <option value="perfume-oil">Perfume Oil</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>For *</label>
                  <select name="for" value={formData.for} onChange={handleChange}>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>
              </div>

              {/* <div className="form-group">
            <label>Image URL *</label>
            <input
              type="url"
              name="image"
              value={formData.images}
              onChange={handleChange}
              required
              placeholder="https://example.com/image.jpg"
            />
            <small style={{color: '#666', fontSize: '12px'}}>
              Tip: Upload to <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer">ImgBB</a> and paste the direct image link
            </small>
            {formData.images && (
              <img 
                src={formData.images} 
                alt="Preview" 
                className="image-preview"
                onError={(e) => e.target.style.display = 'none'}
              />
            )}
          </div> */}

              <div className="form-group">
                <label>Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="e.g., 50"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Product description..."
                />
              </div>
            </div>

            {/* Product Images */}
            <div className="form-section">
              <h2>Product Images</h2>
              <small style={{ color: '#666', fontSize: '12px', display: 'block', marginBottom: '15px' }}>
                Tip: Upload to <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer">ImgBB</a> and paste the direct image link
              </small>

              {formData.images.map((image, index) => (
                <div key={index} className="form-group image-input-group">
                  <label>Image {index + 1} {index === 0 && '*'}</label>
                  <div className="image-input-wrapper">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      required={index === 0}
                      placeholder="https://example.com/image.jpg"
                      className="image-url-input"
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="remove-img-btn"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {image && (
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="image-preview"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddImage}
                className="add-img-btn"
              >
                + Add Another Image
              </button>
            </div>

            {/* Sale Info */}
            <div className="form-section">
              <h2>Sale Information</h2>

              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="isSale"
                    checked={formData.isSale}
                    onChange={handleChange}
                  />
                  This product is on sale
                </label>
              </div>

              {formData.isSale && (
                <>
                  {/* <div className="form-group">
                    <label>Original Price (PKR) *</label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleChange}
                      required={formData.isSale}
                      placeholder="e.g., 20000"
                    />
                  </div>

                  <div className="form-group">
                    <label>Discounted Price (PKR) *</label>
                    <input
                      type="number"
                      name="discountedPrice"
                      value={formData.discountedPrice}
                      onChange={handleChange}
                      required={formData.isSale}
                      placeholder="e.g., 15000"
                    />
                  </div> */}

                  <div className="form-group">
                    <label>Sale Percentage * (applies to all sizes)</label>
                    <input
                      type="number"
                      name="salePercent"
                      value={formData.salePercent}
                      onChange={handleChange}
                      required={formData.isSale}
                      placeholder="e.g., 25"
                      min="1"
                      max="100"
                    />
                    <small style={{ color: '#666', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                      This discount will be applied to all size prices automatically
                    </small>
                  </div>
                </>
              )}
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddProduct