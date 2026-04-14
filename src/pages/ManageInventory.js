import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import logo from "../assets/images/logo.png";
import '../styles/manageinventory.css';

const LOW_STOCK_THRESHOLD = 10;

const ManageInventory = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [editingStock, setEditingStock] = useState({});
  const [savingStock, setSavingStock] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalStock, setModalStock] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'products'), orderBy('productName', 'asc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // ─── Inline stock update ─────────────────────────────────────────
  const handleSaveStock = async (productId) => {
    const val = parseInt(editingStock[productId]);
    if (isNaN(val) || val < 0) {
      toast.error('Enter a valid stock quantity');
      return;
    }
    try {
      setSavingStock(prev => ({ ...prev, [productId]: true }));
      await updateDoc(doc(db, 'products', productId), { stock: val });
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: val } : p));
      setEditingStock(prev => { const u = { ...prev }; delete u[productId]; return u; });
      toast.success('Stock updated');
    } catch (err) {
      toast.error('Failed to update stock');
    } finally {
      setSavingStock(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleCancelEdit = (productId) => {
    setEditingStock(prev => { const u = { ...prev }; delete u[productId]; return u; });
  };

  // ─── Modal stock update ──────────────────────────────────────────
  const openModal = (product) => {
    setSelectedProduct(product);
    setModalStock(product.stock ?? 0);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalStock('');
  };

  const handleModalSave = async () => {
    const val = parseInt(modalStock);
    if (isNaN(val) || val < 0) {
      toast.error('Enter a valid stock quantity');
      return;
    }
    try {
      await updateDoc(doc(db, 'products', selectedProduct.id), { stock: val });
      setProducts(prev => prev.map(p => p.id === selectedProduct.id ? { ...p, stock: val } : p));
      toast.success('Stock updated');
      closeModal();
    } catch (err) {
      toast.error('Failed to update stock');
    }
  };

  // ─── Filtering ───────────────────────────────────────────────────
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.productName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.for === categoryFilter || p.category === categoryFilter;
    const matchesStock =
      stockFilter === 'all' ? true :
        stockFilter === 'out' ? (p.stock === 0 || p.stock === undefined) :
          stockFilter === 'low' ? (p.stock > 0 && p.stock <= LOW_STOCK_THRESHOLD) :
            stockFilter === 'ok' ? (p.stock > LOW_STOCK_THRESHOLD) : true;
    return matchesSearch && matchesCategory && matchesStock;
  });

  // ─── Stats ───────────────────────────────────────────────────────
  const totalProducts = products.length;
  const outOfStock = products.filter(p => p.stock === 0 || p.stock === undefined).length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= LOW_STOCK_THRESHOLD).length;
  const totalStockValue = products.reduce((sum, p) => {
    const price = p.isSale ? p.discountedPrice : p.price;
    return sum + ((p.stock || 0) * (price || 0));
  }, 0);

  const getStockClass = (stock) => {
    if (stock === 0 || stock === undefined) return 'stock-out';
    if (stock <= LOW_STOCK_THRESHOLD) return 'stock-low';
    return 'stock-ok';
  };

  const getStockLabel = (stock) => {
    if (stock === 0 || stock === undefined) return 'Out of Stock';
    return stock;
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch {
      toast.error('Failed to logout');
    }
  };

  return (
    <div className="admin-layout">

      {/* ── Sidebar ── */}
      <aside className="admin-sidebar">
        <span className="logo">
          <img src={logo} alt="" />
          <h1>Perfumes<br />Mists</h1>
        </span>
        <nav className="admin-menu">
          <Link to="/admin">Dashboard</Link>
          <Link to="/add-product">Add Product</Link>
          <Link to="/manage-products">Manage Products</Link>
          <Link to="/manage-inventory" className="active-link">Manage Inventory</Link>
          <Link to="/manage-orders">Manage Orders</Link>
          <Link to="/analytics">Analytics</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/sales">Sales</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/settings">Settings</Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </nav>
      </aside>

      {/* ── Main ── */}
      <div className="inv-main">

        {/* Header */}
        <div className="inv-header">
          <div>
            <h1 className="inv-title">Inventory Management</h1>
            <p className="inv-subtitle">Track and update your product stock levels</p>
          </div>
          <button className="btn-refresh" onClick={fetchProducts}>↻ Refresh</button>
        </div>

        {/* Stats Cards */}
        <div className="inv-stats">
          <div className="inv-stat-card stat-total">
            <span className="stat-icon">📦</span>
            <div>
              <p className="stat-value">{totalProducts}</p>
              <p className="stat-label">Total Products</p>
            </div>
          </div>
          <div className="inv-stat-card stat-out">
            <span className="stat-icon">🚫</span>
            <div>
              <p className="stat-value">{outOfStock}</p>
              <p className="stat-label">Out of Stock</p>
            </div>
          </div>
          <div className="inv-stat-card stat-low">
            <span className="stat-icon">⚠️</span>
            <div>
              <p className="stat-value">{lowStock}</p>
              <p className="stat-label">Low Stock</p>
            </div>
          </div>
          <div className="inv-stat-card stat-value-card">
            <span className="stat-icon">💰</span>
            <div>
              <p className="stat-value">Rs. {totalStockValue.toLocaleString('en-PK')}</p>
              <p className="stat-label">Total Stock Value</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="inv-controls">
          <div className="inv-searchbar">
            <svg width="18px" height="18px" viewBox="0 0 24 24" className="inv-search-icon">
              <path fill="#999" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="inv-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>

          <select
            className="inv-select"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <option value="all">All Stock</option>
            <option value="ok">In Stock</option>
            <option value="low">Low Stock</option>
            <option value="out">Out of Stock</option>
          </select>

          <span className="inv-count">{filteredProducts.length} products</span>
        </div>

        {/* Table */}
        <div className="inv-table-wrapper">
          <table className="inv-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock Qty</th>
                <th>Stock Value</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="inv-empty">Loading inventory...</td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="inv-empty">No products found</td>
                </tr>
              ) : (
                filteredProducts.map(product => {
                  const isEditing = editingStock[product.id] !== undefined;
                  const currentPrice = product.isSale ? product.discountedPrice : product.price;
                  const stockValue = (product.stock || 0) * (currentPrice || 0);

                  return (
                    <tr key={product.id} className="inv-row">
                      <td>
                        <div className="inv-product-cell">
                          {product.images?.[0] && (
                            <img
                              src={product.images[0]}
                              alt={product.productName}
                              className="inv-product-img"
                            />
                          )}
                          <span className="inv-product-name">{product.productName}</span>
                        </div>
                      </td>
                      <td className="capitalize">{product.for || product.category || '—'}</td>
                      <td>Rs. {currentPrice?.toLocaleString('en-PK')}</td>
                      <td>
                        {isEditing ? (
                          <div className="inv-edit-controls">
                            <input
                              type="number"
                              min="0"
                              className="inv-stock-input"
                              value={editingStock[product.id]}
                              onChange={(e) => setEditingStock(prev => ({ ...prev, [product.id]: e.target.value }))}
                              autoFocus
                            />
                            <button
                              className="btn-save"
                              onClick={() => handleSaveStock(product.id)}
                              disabled={savingStock[product.id]}
                            >
                              {savingStock[product.id] ? '...' : '✓'}
                            </button>
                            <button className="btn-cancel-x" onClick={() => handleCancelEdit(product.id)}>✕</button>
                          </div>
                        ) : (
                          <span className={`inv-stock-qty ${getStockClass(product.stock)}`}>
                            {getStockLabel(product.stock)}
                          </span>
                        )}
                      </td>
                      <td>Rs. {stockValue.toLocaleString('en-PK')}</td>
                      <td>
                        <span className={`inv-status-badge ${getStockClass(product.stock)}`}>
                          {product.stock === 0 || product.stock === undefined
                            ? 'Out of Stock'
                            : product.stock <= LOW_STOCK_THRESHOLD
                              ? 'Low Stock'
                              : 'In Stock'}
                        </span>
                      </td>
                      <td>
                        <div className="inv-action-btns">
                          <button
                            className="btn-inline-edit"
                            onClick={() => setEditingStock(prev => ({ ...prev, [product.id]: product.stock ?? 0 }))}
                            title="Quick edit"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="btn-details"
                            onClick={() => openModal(product)}
                            title="View details"
                          >
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ── Product Detail Modal ── */}
        {selectedProduct && (
          <div className="inv-modal-overlay" onClick={closeModal}>
            <div className="inv-modal" onClick={(e) => e.stopPropagation()}>
              <div className="inv-modal-header">
                <h2>Update Stock</h2>
                <button className="inv-modal-close" onClick={closeModal}>×</button>
              </div>

              <div className="inv-modal-body">
                <div className="inv-modal-product">
                  {selectedProduct.images?.[0] && (
                    <img src={selectedProduct.images[0]} alt={selectedProduct.productName} className="inv-modal-img" />
                  )}
                  <div className="inv-modal-info">
                    <h3>{selectedProduct.productName}</h3>
                    <p className="inv-modal-meta">Category: <strong className="capitalize">{selectedProduct.for || selectedProduct.category || '—'}</strong></p>
                    <p className="inv-modal-meta">Price: <strong>Rs. {(selectedProduct.isSale ? selectedProduct.discountedPrice : selectedProduct.price)?.toLocaleString('en-PK')}</strong></p>
                    {selectedProduct.isSale && (
                      <p className="inv-modal-meta">On Sale: <strong>{selectedProduct.salePercent}% off</strong></p>
                    )}
                  </div>
                </div>

                <div className="inv-modal-stock-section">
                  <div className="inv-modal-current">
                    <p>Current Stock</p>
                    <span className={`inv-modal-stock-val ${getStockClass(selectedProduct.stock)}`}>
                      {getStockLabel(selectedProduct.stock)}
                    </span>
                  </div>

                  <div className="inv-modal-update">
                    <label>New Stock Quantity</label>
                    <input
                      type="number"
                      min="0"
                      value={modalStock}
                      onChange={(e) => setModalStock(e.target.value)}
                      className="inv-modal-input"
                      placeholder="Enter quantity"
                    />
                  </div>
                </div>
              </div>

              <div className="inv-modal-footer">
                <button className="btn-modal-cancel" onClick={closeModal}>Cancel</button>
                <button className="btn-modal-save" onClick={handleModalSave}>Save Changes</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageInventory;