import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import '../styles/addproduct.css';
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo.png";

const AddProduct = () => {
    const [formData, setFormData] = useState({
        productName: '',
        price: '',
        category: 'fragrance',
        for: 'men',
        images: [''],
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Prepare product data
            const productData = {
                productName: formData.productName,
                price: parseInt(formData.price),
                category: formData.category,
                for: formData.for,
                images: formData.images.filter(img => img.trim() !== ''),
                isSale: formData.isSale,
                description: formData.description || '',
                stock: formData.stock ? parseInt(formData.stock) : 0,
            };

            // Add sale fields only if it's a sale item
            if (formData.isSale) {
                productData.originalPrice = parseInt(formData.originalPrice);
                productData.discountedPrice = parseInt(formData.discountedPrice);
                productData.salePercent = parseInt(formData.salePercent);
            } else {
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

  return (
    <>
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <span className="logo">
          <img src={logo} alt="" />
          <h1>
            Perfumes<br />
            Mists
          </h1>
        </span>

        <nav className="admin-menu">
          <Link to="/admin">Dashboard</Link>
          <Link to="/add-product">Add Product</Link>
          <Link to="/manage-products">Manage Products</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/sales">Sales</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/settings">Settings</Link>
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

          <div className="form-group">
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
          </div>

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

        <div className="form-section">
    <h2>Product Images</h2>
    {formData.images.map((image, index) => (
        <div key={index} className="form-group">
            <label>Image {index + 1} {index === 0 && '*'}</label>
            <div style={{display: 'flex', gap: '10px'}}>
                <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    required={index === 0}
                    placeholder="https://example.com/image.jpg"
                    style={{flex: 1}}
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
              <div className="form-group">
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
              </div>

              <div className="form-group">
                <label>Sale Percentage *</label>
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