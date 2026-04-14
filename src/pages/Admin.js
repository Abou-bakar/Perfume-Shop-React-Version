import React, { useEffect, useState } from 'react'
import QuickActionCards from '../components/QuickActionCards/QuickActionCards';
import Analytics from '../components/Analytics/Analytics';
import LowStockItem from '../components/LowStockItem/LowStockItem';
import logo from "../assets/images/logo.png";
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { collection, getDocs, query, orderBy, limit, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/admin.css";

const LOW_STOCK_THRESHOLD = 10;

const Admin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Orders state
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('last7days');
  const [statusFilter, setStatusFilter] = useState('all');

  // Inventory state
  const [products, setProducts] = useState([]);
  const [inventoryLoading, setInventoryLoading] = useState(true);
  const [inventorySearch, setInventorySearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingStock, setEditingStock] = useState({});
  const [savingStock, setSavingStock] = useState({});

  useEffect(() => {
    fetchRecentOrders();
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [orders, searchTerm, dateFilter, statusFilter]);

  // ─── Fetch Orders ───────────────────────────────────────────────
  const fetchRecentOrders = async () => {
    try {
      setLoading(true);
      const ordersQuery = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc"),
        limit(20)
      );
      const querySnapshot = await getDocs(ordersQuery);
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // ─── Fetch Products ─────────────────────────────────────────────
  const fetchProducts = async () => {
    try {
      setInventoryLoading(true);
      const productsQuery = query(
        collection(db, "products"),
        orderBy("productName", "asc")
      );
      const querySnapshot = await getDocs(productsQuery);
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load inventory");
    } finally {
      setInventoryLoading(false);
    }
  };

  // ─── Update Stock in Firestore ───────────────────────────────────
  const handleSaveStock = async (productId) => {
    const newStock = editingStock[productId];
    if (newStock === undefined || newStock === '') return;

    const stockValue = parseInt(newStock);
    if (isNaN(stockValue) || stockValue < 0) {
      toast.error("Please enter a valid stock quantity");
      return;
    }

    try {
      setSavingStock(prev => ({ ...prev, [productId]: true }));
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, { stock: stockValue });

      setProducts(prev =>
        prev.map(p => p.id === productId ? { ...p, stock: stockValue } : p)
      );
      setEditingStock(prev => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });
      toast.success("Stock updated successfully");
    } catch (error) {
      console.error("Error updating stock:", error);
      toast.error("Failed to update stock");
    } finally {
      setSavingStock(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleCancelEdit = (productId) => {
    setEditingStock(prev => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
  };

  // ─── Filtered Inventory ──────────────────────────────────────────
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.productName
      ?.toLowerCase()
      .includes(inventorySearch.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || product.for === categoryFilter || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const lowStockProducts = products.filter(
    p => p.stock !== undefined && p.stock <= LOW_STOCK_THRESHOLD
  );

  // ─── Orders Filter ───────────────────────────────────────────────
  const applyFilters = () => {
    let filtered = [...orders];
    const now = new Date();

    switch (dateFilter) {
      case 'today':
        filtered = filtered.filter(order =>
          new Date(order.createdAt).toDateString() === now.toDateString()
        );
        break;
      case 'yesterday':
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        filtered = filtered.filter(order =>
          new Date(order.createdAt).toDateString() === yesterday.toDateString()
        );
        break;
      case 'last7days':
        const last7days = new Date(now);
        last7days.setDate(last7days.getDate() - 7);
        filtered = filtered.filter(order => new Date(order.createdAt) >= last7days);
        break;
      case 'lastMonth':
        const lastMonth = new Date(now);
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        filtered = filtered.filter(order => new Date(order.createdAt) >= lastMonth);
        break;
      default:
        break;
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderNumber.toString().includes(searchTerm) ||
        order.customerInfo.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerInfo.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  const handleViewDetails = (orderId) => {
    navigate(`/manage-orders`, { state: { orderId } });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed': return 'active';
      case 'shipped': return 'in-transit';
      case 'cancelled': return 'expired';
      default: return '';
    }
  };

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
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <>
      <div className="admin-container">
        <aside className="admin-sidebar">
          <span className="logo">
            <img src={logo} alt="" />
            <h1>Perfumes<br />Mists</h1>
          </span>
          <nav className="admin-menu">
            <Link to="/admin" className="active-link">Dashboard</Link>
            <Link to="/add-product">Add Product</Link>
            <Link to="/manage-products">Manage Products</Link>
            <Link to="/manage-inventory">Manage Inventory</Link>
            <Link to="/manage-orders">Manage Orders</Link>
            <Link to="/analytics">Analytics</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/sales">Sales</Link>
            <Link to="/customers">Customers</Link>
            <Link to="/settings">Settings</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </nav>
        </aside>

        <div className="admin-main">
          <nav className="admin-nav">
            <div className="searchbar-wrapper">
              <div className="searchbar">
                <input type="text" placeholder="Search" />
                <button className="search-btn">
                  <svg width="24px" height="30px" viewBox="0 0 24 24">
                    <path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="admin-nav-right">
              <i className="fa-regular fa-bell"></i>
              <i className="fa-regular fa-envelope"></i>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-jx7KaqyEK67vo7J94C45lnF4X3wx30lVaA&s" alt="" />
            </div>
          </nav>

          <section className="admin-section">

            {/* ── Quick Actions ── */}
            <h1>Quick Actions</h1>
            <div className='cards-container'>
              <QuickActionCards quickaction="Add Product" variant="card1" link="/add-product" />
              <QuickActionCards quickaction="Manage Products" variant="card2" link="/manage-products" />
              <QuickActionCards quickaction="View Orders" variant="card3" link="/manage-orders" />
              <QuickActionCards quickaction="Create Category" variant="card4" />
            </div>

            {/* ── Analytics ── */}
            <h1>Analytics</h1>
            <div className="boxes-container">
              <Analytics analytic="Total Products" value={products.length.toString()} variant="box1" />
              <Analytics analytic="Total Sales" value="$12,500" variant="box2" />
              <Analytics analytic="Total Orders" value={orders.length.toString()} variant="box3" />
              <Analytics analytic="Total Customers" value="3,400" variant="box4" />
            </div>

            {/* ── Recent Orders ── */}
            <h1>Recent Orders</h1>
            <div className="orders-container">
              <div className="order-searchbar-sort">
                <div className="ordersearchbar searchbar">
                  <input
                    type="text"
                    placeholder="Search by Order ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="search-btn">
                    <svg width="24px" height="30px" viewBox="0 0 24 24">
                      <path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                    </svg>
                  </button>
                </div>
                <div className="order-sort">
                  <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
                    <option value="last7days">Last 7 days</option>
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="lastMonth">Last Month</option>
                    <option value="all">All Time</option>
                  </select>
                </div>
              </div>

              <div className="rad-btns">
                <p>Show:</p>
                <input type="radio" name='status' checked={statusFilter === 'all'} onChange={() => setStatusFilter('all')} />
                <label>All</label>
                <input type="radio" name='status' checked={statusFilter === 'confirmed'} onChange={() => setStatusFilter('confirmed')} />
                <label>Confirmed</label>
                <input type="radio" name='status' checked={statusFilter === 'shipped'} onChange={() => setStatusFilter('shipped')} />
                <label>Shipped</label>
                <input type="radio" name='status' checked={statusFilter === 'cancelled'} onChange={() => setStatusFilter('cancelled')} />
                <label>Cancelled</label>
              </div>

              <div className="orders-table">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan="6" className="table-empty-msg">Loading orders...</td></tr>
                    ) : filteredOrders.length === 0 ? (
                      <tr><td colSpan="6" className="table-empty-msg">No orders found</td></tr>
                    ) : (
                      filteredOrders.slice(0, 10).map((order) => (
                        <tr key={order.id}>
                          <td>#{order.orderNumber}</td>
                          <td>{order.customerInfo.firstName} {order.customerInfo.lastName}</td>
                          <td>{order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-PK') : 'N/A'}</td>
                          <td>PKR {order.total?.toLocaleString('en-PK')}</td>
                          <td>
                            <span className={`status ${getStatusClass(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                          <td>
                            <button className="btn-view" onClick={() => handleViewDetails(order.id)}>
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {filteredOrders.length > 10 && (
                <div className="view-all-wrapper">
                  <Link to="/manage-orders">
                    <button className="btn-view-all">View All Orders →</button>
                  </Link>
                </div>
              )}
            </div>

            {/* ── Inventory (Dynamic) ── */}
            <h1>Inventory</h1>
            <div className="inventory-container">
              <div className="inventory-searchbar-sort">
                <div className="inventorysearchbar searchbar">
                  <input
                    type="text"
                    placeholder="Search by Product Name"
                    value={inventorySearch}
                    onChange={(e) => setInventorySearch(e.target.value)}
                  />
                  <button className="search-btn">
                    <svg width="24px" height="30px" viewBox="0 0 24 24">
                      <path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                    </svg>
                  </button>
                </div>
                <div className="inventory-sort">
                  <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                  </select>
                </div>
              </div>

              <div className="inventory-table">
                <table>
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock Quantity</th>
                      <th>Stock Value</th>
                      <th>Update Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryLoading ? (
                      <tr><td colSpan="6" className="table-empty-msg">Loading inventory...</td></tr>
                    ) : filteredProducts.length === 0 ? (
                      <tr><td colSpan="6" className="table-empty-msg">No products found</td></tr>
                    ) : (
                      filteredProducts.map(product => {
                        const isEditing = editingStock[product.id] !== undefined;
                        const currentPrice = product.isSale ? product.discountedPrice : product.price;
                        const stockValue = (product.stock || 0) * (currentPrice || 0);

                        return (
                          <tr key={product.id}>
                            <td className="inventory-product-cell">
                              {product.images?.[0] && (
                                <img
                                  src={product.images[0]}
                                  alt={product.productName}
                                  className="inventory-product-img"
                                />
                              )}
                              {product.productName}
                            </td>
                            <td className="capitalize">{product.for || product.category || '—'}</td>
                            <td>Rs. {currentPrice?.toLocaleString('en-PK')}</td>
                            <td className={getStockClass(product.stock)}>
                              {getStockLabel(product.stock)}
                              {product.stock > 0 && product.stock <= LOW_STOCK_THRESHOLD && (
                                <span className="low-stock-badge">Low</span>
                              )}
                            </td>
                            <td>Rs. {stockValue.toLocaleString('en-PK')}</td>
                            <td>
                              {isEditing ? (
                                <div className="stock-edit-controls">
                                  <input
                                    type="number"
                                    min="0"
                                    value={editingStock[product.id]}
                                    onChange={(e) => setEditingStock(prev => ({ ...prev, [product.id]: e.target.value }))}
                                    className="stock-input"
                                  />
                                  <button
                                    onClick={() => handleSaveStock(product.id)}
                                    disabled={savingStock[product.id]}
                                    className="btn-save-stock"
                                  >
                                    {savingStock[product.id] ? 'Saving...' : 'Save'}
                                  </button>
                                  <button
                                    onClick={() => handleCancelEdit(product.id)}
                                    className="btn-cancel-stock"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setEditingStock(prev => ({ ...prev, [product.id]: product.stock || 0 }))}
                                  className="btn-edit-stock"
                                >
                                  Edit
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Coupon Management ── */}
            <h1>Coupon Management</h1>
            <div className="coupon-container">
              <div className="coupon-table">
                <table>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Discount</th>
                      <th>Type</th>
                      <th>Start Date</th>
                      <th>Expiry Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>WINTER20</td>
                      <td>20%</td>
                      <td>Percentage</td>
                      <td>01 Nov 2025</td>
                      <td>31 Nov 2025</td>
                      <td><span className="status active">Active</span></td>
                      <td className="coupon-actions">
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td>FLAT500</td>
                      <td>Rs 500</td>
                      <td>Flat</td>
                      <td>05 Oct 2025</td>
                      <td>10 Oct 2025</td>
                      <td><span className="status expired">Expired</span></td>
                      <td className="coupon-actions">
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Low Stock (Dynamic) ── */}
            <h1>Low Stock</h1>
            <div className="low-stock-container">
              {inventoryLoading ? (
                <p>Loading...</p>
              ) : lowStockProducts.length === 0 ? (
                <p className="all-stocked-msg">✅ All products are well stocked!</p>
              ) : (
                lowStockProducts.map(product => (
                  <LowStockItem
                    key={product.id}
                    image={product.images?.[0] || ''}
                    name={product.productName}
                    stock={product.stock}
                  />
                ))
              )}
            </div>

            {/* ── Top Selling Products ── */}
            <h1>Top Selling Products</h1>
            <div className="top-sold-container">
              <LowStockItem image="https://lattafapakistan.com/cdn/shop/files/The-Kingdom-for-Men-61521561.png?v=1753977803" name="The Kingdom" />
              <LowStockItem image="https://lattafapakistan.com/cdn/shop/files/Khamrah-61480297.png?v=1753975734" name="Khamrah" />
              <LowStockItem image="https://lattafapakistan.com/cdn/shop/files/Asad-Bourbon-61571337.png?v=1753974640" name="Asad Bourbon" />
            </div>

          </section>
        </div>
      </div>
    </>
  );
};

export default Admin;