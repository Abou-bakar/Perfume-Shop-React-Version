import React, { useState, useEffect } from 'react'
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import '../styles/manageproducts.css';
import Loader from '../components/Loader/Loader';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


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
        setEditingProduct({ ...product });
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setEditingProduct(null);
    };

    // Save edited product
    const handleSaveEdit = async () => {
        try {
            const productRef = doc(db, "products", editingProduct.id);
            const updateData = {
                productName: editingProduct.productName,
                price: parseInt(editingProduct.price),
                category: editingProduct.category,
                for: editingProduct.for,
                image: editingProduct.image,
                stock: parseInt(editingProduct.stock) || 0,
                description: editingProduct.description || '',
                isSale: editingProduct.isSale
            };

            if (editingProduct.isSale) {
                updateData.originalPrice = parseInt(editingProduct.originalPrice);
                updateData.discountedPrice = parseInt(editingProduct.discountedPrice);
                updateData.salePercent = parseInt(editingProduct.salePercent);
            } else {
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
        <div className='manage-container'>
            <div className='manage-header'>
                <h1>Manage Products</h1>
                <Link to='/admin' className='back-btn'>← Back to Dashboard</Link>
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
                    className='filter-select'
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
                                            src={product.image}
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
                            <button className='close-btn' onClick={handleCancelEdit}>x</button>
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

                            <div className='form-group'>
                                <label>Image URL</label>
                                <input
                                    type='url'
                                    value={editingProduct.image}
                                    onChange={(e) => handleInputChange('image', e.target.value)}
                                />
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
                                        onChange={(e) => handleInputChange('isSale', e.target.value)}
                                    />
                                    This product is on sale
                                </label>
                            </div>

                            {editingProduct.isSale && (
                                <>
                                    <div className='form-row'>
                                        <div className='form-group'>
                                            <label>Original Price</label>
                                            <input
                                                type='number'
                                                value={editingProduct.originalPrice || ''}
                                                onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                                            />
                                        </div>

                                        <div className='form-group'>
                                            <label>Discounted Price</label>
                                            <input
                                                type='number'
                                                value={editingProduct.discountedPrice || ''}
                                                onChange={(e) => handleInputChange('discountedPrice', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className='form-group'>
                                        <label>Sale Percentage</label>
                                        <input
                                            type='number'
                                            value={editingProduct.salePercent || ''}
                                            onChange={(e) => handleInputChange('salePercent', e.target.value)}
                                            min="1"
                                            max="100"
                                        />
                                    </div>
                                </>
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
    )
}

export default ManageProducts