import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import logo from "../assets/images/logo.png";
import '../styles/manageorders.css';

const ManageOrders = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch all orders
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const ordersQuery = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(ordersQuery);
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() // Convert Firestore timestamp
      }));
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        status: newStatus,
        updatedAt: new Date()
      });

      // Update local state
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));

      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order status");
    }
  };

  // View order details
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  // Close order details modal
  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch =
      order.orderNumber.toString().includes(searchTerm) ||
      order.customerInfo.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Get status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'confirmed':
        return 'status-confirmed';
      case 'shipped':
        return 'status-shipped';
      case 'delivered':
        return 'status-delivered';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="manage-container">
        <p style={{ textAlign: 'center', padding: '100px 20px', fontSize: '18px' }}>
          Loading orders...
        </p>
      </div>
    );
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
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <span className="logo">
          <img src={logo} alt="" />
          <h1>Perfumes<br />Mists</h1>
        </span>
        <nav className="admin-menu">
          <Link to="/admin">Dashboard</Link>
          <Link to="/add-product">Add Product</Link>
          <Link to="/manage-products">Manage Products</Link>
          <Link to="/manage-inventory">Manage Inventory</Link>
          <Link to="/manage-orders" className="active-link">Manage Orders</Link>
          <Link to="/analytics">Analytics</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/sales">Sales</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/settings">Settings</Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </nav>
      </aside>

      <div className="manage-container">
        <div className="manage-header">
          <h1>Manage Orders</h1>
        </div>

        {/* Search and Filter */}
        <div className="manage-controls">
          <input
            type="text"
            placeholder="Search by order number, name, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <span className="product-count">{filteredOrders.length} orders</span>
        </div>

        {/* Orders Table */}
        <div className="orders-table-container">
          <table className="main-orders-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px' }}>
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id}>
                    <td>#{order.orderNumber}</td>
                    <td>
                      {order.createdAt ?
                        new Date(order.createdAt).toLocaleDateString('en-PK', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) : 'N/A'}
                    </td>
                    <td>
                      <div>
                        <strong>{order.customerInfo.firstName} {order.customerInfo.lastName}</strong>
                        <br />
                        <small style={{ color: '#666' }}>{order.customerInfo.email}</small>
                      </div>
                    </td>
                    <td>{order.items.length} item(s)</td>
                    <td>Rs. {order.total?.toLocaleString('en-PK')}</td>
                    <td>
                      <span className={`payment-badge ${order.paymentMethod}`}>
                        {order.paymentMethod === 'cod' ? 'COD' : 'Bank'}
                      </span>
                    </td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                        className={`status-select ${getStatusClass(order.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => handleViewOrder(order)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content order-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Order Details - #{selectedOrder.orderNumber}</h2>
                <button className="close-btn" onClick={handleCloseModal}>×</button>
              </div>

              <div className="modal-body">
                {/* Customer Information */}
                <div className="order-section">
                  <h3>Customer Information</h3>
                  <p><strong>Name:</strong> {selectedOrder.customerInfo.firstName} {selectedOrder.customerInfo.lastName}</p>
                  <p><strong>Email:</strong> {selectedOrder.customerInfo.email}</p>
                  <p><strong>Phone:</strong> {selectedOrder.customerInfo.phone}</p>
                  <p><strong>Address:</strong> {selectedOrder.customerInfo.address}, {selectedOrder.customerInfo.city} {selectedOrder.customerInfo.postalCode}</p>
                </div>

                {/* Order Items */}
                <div className="order-section">
                  <h3>Order Items</h3>
                  <div className="order-items-list">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="order-item-row">
                        <img src={item.image} alt={item.productName} />
                        <div className="item-info">
                          <h4>{item.productName}</h4>
                          {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                          <p>Qty: {item.quantity}</p>
                        </div>
                        <div className="item-price">
                          Rs. {((item.isSale ? item.discountedPrice : item.price) * item.quantity).toLocaleString('en-PK')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="order-section">
                  <h3>Order Summary</h3>
                  <div className="order-summary-details">
                    <p>Subtotal: <span>Rs. {selectedOrder.subTotal?.toLocaleString('en-PK')}</span></p>
                    <p>Shipping: <span>Rs. {selectedOrder.shipping?.toLocaleString('en-PK')}</span></p>
                    <hr />
                    <p className="total"><strong>Total:</strong> <span>Rs. {selectedOrder.total?.toLocaleString('en-PK')}</span></p>
                  </div>
                </div>

                {/* Payment & Status */}
                <div className="order-section">
                  <h3>Payment & Status</h3>
                  <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Deposit'}</p>
                  <p><strong>Order Status:</strong> <span className={`status-badge ${getStatusClass(selectedOrder.status)}`}>{selectedOrder.status}</span></p>
                  <p><strong>Order Date:</strong> {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString('en-PK') : 'N/A'}</p>
                </div>
              </div>

              <div className="modal-footer">
                <button className="cancel-btn" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;