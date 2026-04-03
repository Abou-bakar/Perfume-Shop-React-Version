import React, { useState, useEffect } from 'react'
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import '../styles/manageproducts.css';
import Loader from '../components/Loader/Loader';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import logo from "../assets/images/logo.png";

const ManageProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingProduct, setEditingProduct] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterCategory, setFilterCategory] = useState('all')

    // Fetch all products
    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const querySnapshot = await getDocs(collection(db, "products"));
            const productsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setProducts(productsData)
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false)
        }
    };

    // Delete product
    const handleDelete = async (productId, productName) => {
        if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
            try {
                await deleteDoc(doc(db, "products", productId));
                setProducts(products.filter(p => p.id !== productId));
                toast.success('Product deleted successfully');
            } catch (error) {
                console.error("Error deleting product:", error);
                toast.error(`Error deleting product: ${error.message}`);
            }
        }
    };

    // Start editing
    const handleEdit = (product) => {
        const images = Array.isArray(product.images) ? product.images : [product.image || '']
        const sizes = Array.isArray(product.sizes) ? product.sizes : [{ size: '', price: product.price || '' }]
        setEditingProduct({ ...product, images, sizes });
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setEditingProduct(null);
    };

    const handleAddImage = () => {
        setEditingProduct(prev => ({
            ...prev,
            images: [prev.images, '']
        }))
    }

    const handleRemoveImage = (index) => {
        setEditingProduct(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }))
    }

    const handleImageChange = (index, value) => {
        setEditingProduct(prev => ({
            ...prev,
            images: prev.images.map((img, i) => i === index ? value : img)
        }))
    }

    // Size handlers
    const handleAddSize = () => {
        setEditingProduct(prev => ({
            ...prev,
            sizes: [...prev.sizes, { size: '', price: '' }]
        }))
    }

    const handleRemoveSize = (index) => {
        setEditingProduct(prev => ({
            ...prev,
            sizes: prev.sizes.filter((_, i) => i !== index)
        }))
    }

    const handleSizeChange = (index, field, value) => {
        setEditingProduct(prev => ({
            ...prev,
            sizes: prev.sizes.map((s, i) => i === index ? { ...s, [field]: value } : s)
        }))
    }

    // Save edited product
    const handleSaveEdit = async () => {
        try {
            // Filter out empty image URLs
            const validImages = editingProduct.images.filter(img => img.trim() !== '');

            if (validImages.length === 0) {
                toast.error('Please add at least one product image');
                return;
            }

            const validSizes = editingProduct.sizes.filter(s => s.size.trim() !== '' && s.price);

            if (validSizes.length === 0) {
                toast.error('Please add at least one size with price');
                return;
            }

            const productRef = doc(db, "products", editingProduct.id);
            const updateData = {
                productName: editingProduct.productName,
                price: parseInt(validSizes[0].price),
                category: editingProduct.category,
                for: editingProduct.for,
                image: validImages[0], // First image as main image
                images: validImages, // Array of all images
                sizes: validSizes.map(s => ({
                    size: s.size,
                    price: parseInt(s.price)
                })),
                stock: parseInt(editingProduct.stock) || 0,
                description: editingProduct.description || '',
                isSale: editingProduct.isSale
            };

            if (editingProduct.isSale) {
                const salePercent = parseInt(editingProduct.salePercent);
                updateData.saleSizes = validSizes.map(s => {
                    const originalPrice = parseInt(s.price)
                    const discountedPrice = Math.round(originalPrice * (1 - salePercent / 100))
                    return {
                        size: s.size,
                        originalPrice: originalPrice,
                        discountedPrice: discountedPrice
                    }
                })
                updateData.salePercent = salePercent;
                updateData.originalPrice = parseInt(validSizes[0].price);
                updateData.discountedPrice = updateData.saleSizes[0].discountedPrice;
            } else {
                updateData.saleSizes = null;
                updateData.originalPrice = null;
                updateData.discountedPrice = null;
                updateData.salePercent = null;
            }

            await updateDoc(productRef, updateData);

            // Update local state
            setProducts(products.map(p => p.id === editingProduct.id ? { ...editingProduct, ...updateData } : p));
            setEditingProduct(null);
            toast.success('Product updated successfully!');
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error(`Error updating product: ${error.message}`);
        }
    };

    // Handle input changes in edit mode
    const handleInputChange = (field, value) => {
        setEditingProduct({
            ...editingProduct,
            [field]: value
        });
    };

    // Filter products
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
        return matchesSearch && matchesCategory;
    })

    if (loading) {
        return <Loader />
    }

    return (
        
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

            <div className='manage-container'>
                <div className='manage-header'>
                    <h1>Manage Products</h1>
                </div>

                {/* Search and Filter */}
                <div className='manage-controls'>
                    <input
                        type='text'
                        placeholder='Search Products...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='search-input'
                    />
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className='filter-sel'
                    >
                        <option value="all">All Categories</option>
                        <option value="fragrance">Fragrance</option>
                        <option value="body-mist">Body Mist</option>
                        <option value="deodorant">Deodorant</option>
                        <option value="perfume-oil">Perfume Oil</option>
                    </select>
                    <span className='product-count'>{filteredProducts.length} products</span>
                </div>

                {/* Products Table */}
                <div className='products-table-container'>
                    <table className='products-table'>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>For</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Sale</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan='8' style={{ textAlign: 'center', padding: '40px' }}>
                                        No products found
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map(product => (
                                    <tr key={product.id}>
                                        <td>
                                            <img
                                                src={Array.isArray(product.images) ? product.images[0] : product.image}
                                                alt={product.productName}
                                                className='product-thumbnail'
                                            />
                                        </td>
                                        <td>{product.productName}</td>
                                        <td>{product.category}</td>
                                        <td>{product.for}</td>
                                        <td>Rs. {product.price?.toLocaleString('en-PK')}</td>
                                        <td>{product.stock || 0}</td>
                                        <td>
                                            {product.isSale ? (
                                                <span className='badge sale-badge'>
                                                    {product.salePercent}% OFF
                                                </span>
                                            ) : (
                                                <span className='badge'>-</span>
                                            )}
                                        </td>
                                        <td className='action-buttons'>
                                            <button
                                                className='edit-btn'
                                                onClick={() => handleEdit(product)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className='delete-btn'
                                                onClick={() => handleDelete(product.id, product.productName)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Edit Modal */}
                {editingProduct && (
                    <div className='modal-overlay' onClick={handleCancelEdit}>
                        <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                            <div className='modal-header'>
                                <h2>Edit Product</h2>
                                <button className='close-btn' onClick={handleCancelEdit}><i class="fa-solid fa-x"></i></button>
                            </div>

                            <div className='modal-body'>
                                <div className='form-group'>
                                    <label>Product Name</label>
                                    <input
                                        type='text'
                                        value={editingProduct.productName}
                                        onChange={(e) => handleInputChange('productName', e.target.value)}
                                    />
                                </div>

                                <div className='form-row'>
                                    <div className='form-group'>
                                        <label>Category</label>
                                        <select
                                            value={editingProduct.category}
                                            onChange={(e) => handleInputChange('category', e.target.value)}
                                        >
                                            <option value="fragrance">Fragrance</option>
                                            <option value="body-mist">Body Mist</option>
                                            <option value="deodorant">Deodorant</option>
                                            <option value="perfume-oil">Perfume Oil</option>
                                        </select>
                                    </div>

                                    <div className='form-group'>
                                        <label>For</label>
                                        <select
                                            value={editingProduct.for}
                                            onChange={(e) => handleInputChange('for', e.target.value)}
                                        >
                                            <option value="men">Men</option>
                                            <option value="women">Women</option>
                                            <option value="unisex">unisex</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='form-row'>
                                    <div className='form-group'>
                                        <label>Price (PKR)</label>
                                        <input
                                            type='number'
                                            value={editingProduct.price}
                                            onChange={(e) => handleInputChange('price', e.target.value)}
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>Stock</label>
                                        <input
                                            type='number'
                                            value={editingProduct.stock}
                                            onChange={(e) => handleInputChange('stock', e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Product Images */}
                                <div className='form-group'>
                                    <label style={{ fontWeight: 600, marginBottom: '10px', display: 'block' }}>Product Images</label>

                                    {editingProduct.images.map((image, index) => (
                                        <div key={index} className="form-group image-input-group">
                                            <label>Image {index + 1}</label>
                                            <div>
                                                <input
                                                    type='url'
                                                    value={image}
                                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                                    placeholder='https://example.com/image.jpg'
                                                    className="image-url-input"
                                                />
                                                {index > 0 && (
                                                    <button
                                                        type='button'
                                                        onClick={() => handleRemoveImage(index)}
                                                        className="remove-img-btn-small"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                            {image && (
                                                <img
                                                    src={image}
                                                    alt={`Preview ${index + 1}`}
                                                    className="image-preview-small"
                                                    onError={(e) => e.target.style.display = 'none'}
                                                />
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type='button'
                                        onClick={handleAddImage}
                                        className="add-img-btn-small"
                                    >
                                        + Add Another Image
                                    </button>
                                </div>

                                {/* Sizes & Pricing */}
                                <div className='form-section'>
                                    <label style={{ fontWeight: 600, marginBottom: '10px', display: 'block' }}>Sizes & Pricing</label>

                                    {editingProduct.sizes.map((sizeObj, index) => (
                                        <div key={index} className='form-group size-input-group'>
                                            <label>Size {index + 1}</label>
                                            <div className='size-input-wrapper'>
                                                <input
                                                    type='text'
                                                    value={sizeObj.size}
                                                    onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                                                    placeholder="e.g., 50ml"
                                                    className="size-name-input"
                                                />
                                                <input
                                                    type='number'
                                                    value={sizeObj.price}
                                                    onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                                                    placeholder="Price (PKR)"
                                                    className="size-price-input"
                                                />
                                                {index > 0 && (
                                                    <button
                                                        type='button'
                                                        onClick={() => handleRemoveSize(index)}
                                                        className="remove-img-btn-small"
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
                                        className="add-img-btn-small"
                                    >
                                        + Add Another Size
                                    </button>
                                </div>

                                <div className='form-group'>
                                    <label>Description</label>
                                    <textarea
                                        value={editingProduct.description || ''}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        rows="3"
                                    />
                                </div>

                                <div className='form-group checkbox'>
                                    <label>
                                        <input
                                            type='checkbox'
                                            checked={editingProduct.isSale}
                                            onChange={(e) => handleInputChange('isSale', e.target.checked)}
                                        />
                                        This product is on sale
                                    </label>
                                </div>

                                {editingProduct.isSale && (
                                    <div className='form-group'>
                                        <label>Sale Percentage (applies to all sizes)</label>
                                        <input
                                            type='number'
                                            value={editingProduct.salePercent || ''}
                                            onChange={(e) => handleInputChange('salePercent', e.target.value)}
                                            min="1"
                                            max="100"
                                            placeholder="e.g., 25"
                                        />
                                        <small style={{ color: '#666', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                                            This discount will be applied to all size prices automatically
                                        </small>
                                    </div>
                                )}
                            </div>

                            <div className='modal-footer'>
                                <button className='cancel-btn' onClick={handleCancelEdit}>
                                    Cancel
                                </button>
                                <button className='save-btn' onClick={handleSaveEdit}>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}

export default ManageProducts