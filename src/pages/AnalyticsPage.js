import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/logo.png';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  BarChart, Bar
} from 'recharts';
import '../styles/analyticspage.css';

const COLORS = {
  pending:   '#f59e0b',
  confirmed: '#3b82f6',
  shipped:   '#8b5cf6',
  delivered: '#22c55e',
  cancelled: '#ef4444',
};

const PIE_COLORS = ['#f59e0b', '#3b82f6', '#8b5cf6', '#22c55e', '#ef4444'];

const AnalyticsPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ordersSnap, productsSnap] = await Promise.all([
        getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc'))),
        getDocs(collection(db, 'products'))
      ]);

      const ordersData = ordersSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));
      const productsData = productsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setOrders(ordersData);
      setProducts(productsData);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  // ─── Filter orders by date range ────────────────────────────────
  const filteredOrders = orders.filter(order => {
    if (dateRange === 'all') return true;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - parseInt(dateRange));
    return order.createdAt >= cutoff;
  });

  // ─── Summary stats ───────────────────────────────────────────────
  const totalRevenue = filteredOrders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const totalOrders = filteredOrders.length;

  const avgOrderValue = totalOrders > 0
    ? Math.round(totalRevenue / filteredOrders.filter(o => o.status !== 'cancelled').length) || 0
    : 0;

  const deliveredOrders = filteredOrders.filter(o => o.status === 'delivered').length;

  // ─── Revenue over time (line chart) ─────────────────────────────
  const revenueByDay = (() => {
    const days = parseInt(dateRange) || 30;
    const map = {};

    // Pre-fill all days with 0
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toLocaleDateString('en-PK', { month: 'short', day: 'numeric' });
      map[key] = 0;
    }

    filteredOrders
      .filter(o => o.status !== 'cancelled')
      .forEach(order => {
        if (!order.createdAt) return;
        const key = new Date(order.createdAt).toLocaleDateString('en-PK', { month: 'short', day: 'numeric' });
        if (map[key] !== undefined) map[key] += (order.total || 0);
      });

    return Object.entries(map).map(([date, revenue]) => ({ date, revenue }));
  })();

  // ─── Orders by status (pie chart) ───────────────────────────────
  const ordersByStatus = (() => {
    const map = {};
    filteredOrders.forEach(o => {
      map[o.status] = (map[o.status] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  })();

  // ─── Payment method split (bar chart) ───────────────────────────
  const paymentData = (() => {
    const cod = filteredOrders.filter(o => o.paymentMethod === 'cod').length;
    const bank = filteredOrders.filter(o => o.paymentMethod === 'bank' || o.paymentMethod === 'bankDeposit').length;
    return [
      { method: 'Cash on Delivery', count: cod },
      { method: 'Bank Deposit', count: bank },
    ];
  })();

  // ─── Products by category (bar chart) ───────────────────────────
  const categoryData = (() => {
    const map = {};
    products.forEach(p => {
      const cat = p.for || p.category || 'Other';
      map[cat] = (map[cat] || 0) + 1;
    });
    return Object.entries(map).map(([category, count]) => ({ category, count }));
  })();

  // ─── Top 5 products by revenue ───────────────────────────────────
  const topProducts = (() => {
    const map = {};
    filteredOrders
      .filter(o => o.status !== 'cancelled')
      .forEach(order => {
        (order.items || []).forEach(item => {
          const name = item.productName || 'Unknown';
          const revenue = (item.isSale ? item.discountedPrice : item.price) * item.quantity;
          map[name] = (map[name] || 0) + revenue;
        });
      });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, revenue]) => ({ name, revenue }));
  })();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch {
      toast.error('Failed to logout');
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((p, i) => (
            <p key={i} style={{ color: p.color }}>
              {p.name}: {p.name === 'revenue' || p.name === 'Revenue'
                ? `Rs. ${p.value.toLocaleString('en-PK')}`
                : p.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
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
          <Link to="/manage-inventory">Manage Inventory</Link>
          <Link to="/manage-orders">Manage Orders</Link>
          <Link to="/analytics" className="active-link">Analytics</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/settings">Settings</Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </nav>
      </aside>

      {/* ── Main ── */}
      <div className="an-main">

        {/* Header */}
        <div className="an-header">
          <div>
            <h1 className="an-title">Analytics</h1>
            <p className="an-subtitle">Track your store performance</p>
          </div>
          <div className="an-range-btns">
            {[
              { label: '7 Days', value: '7' },
              { label: '30 Days', value: '30' },
              { label: '90 Days', value: '90' },
              { label: 'All Time', value: 'all' },
            ].map(r => (
              <button
                key={r.value}
                className={`an-range-btn ${dateRange === r.value ? 'active' : ''}`}
                onClick={() => setDateRange(r.value)}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="an-loading">Loading analytics...</div>
        ) : (
          <>
            {/* ── Summary Cards ── */}
            <div className="an-stats">
              <div className="an-stat-card">
                <div className="an-stat-icon" style={{ background: '#eff6ff' }}>💰</div>
                <div>
                  <p className="an-stat-label">Total Revenue</p>
                  <p className="an-stat-value">Rs. {totalRevenue.toLocaleString('en-PK')}</p>
                  <p className="an-stat-sub">Excluding cancelled orders</p>
                </div>
              </div>
              <div className="an-stat-card">
                <div className="an-stat-icon" style={{ background: '#f0fdf4' }}>📦</div>
                <div>
                  <p className="an-stat-label">Total Orders</p>
                  <p className="an-stat-value">{totalOrders}</p>
                  <p className="an-stat-sub">{deliveredOrders} delivered</p>
                </div>
              </div>
              <div className="an-stat-card">
                <div className="an-stat-icon" style={{ background: '#fefce8' }}>📊</div>
                <div>
                  <p className="an-stat-label">Avg Order Value</p>
                  <p className="an-stat-value">Rs. {avgOrderValue.toLocaleString('en-PK')}</p>
                  <p className="an-stat-sub">Per non-cancelled order</p>
                </div>
              </div>
              <div className="an-stat-card">
                <div className="an-stat-icon" style={{ background: '#fdf4ff' }}>🛍️</div>
                <div>
                  <p className="an-stat-label">Total Products</p>
                  <p className="an-stat-value">{products.length}</p>
                  <p className="an-stat-sub">
                    {products.filter(p => (p.stock || 0) === 0).length} out of stock
                  </p>
                </div>
              </div>
            </div>

            {/* ── Revenue Over Time ── */}
            <div className="an-chart-card an-chart-wide">
              <h2 className="an-chart-title">Revenue Over Time</h2>
              <p className="an-chart-sub">Daily revenue (Rs.) — cancelled orders excluded</p>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={revenueByDay} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: '#999' }}
                    interval={dateRange === '7' ? 0 : dateRange === '30' ? 4 : 9}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#999' }}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* ── Row: Pie + Bar ── */}
            <div className="an-chart-row">

              {/* Orders by Status */}
              <div className="an-chart-card">
                <h2 className="an-chart-title">Orders by Status</h2>
                <p className="an-chart-sub">Distribution of order statuses</p>
                {ordersByStatus.length === 0 ? (
                  <p className="an-no-data">No order data available</p>
                ) : (
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie
                        data={ordersByStatus}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {ordersByStatus.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[entry.name] || PIE_COLORS[index % PIE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [value, name.charAt(0).toUpperCase() + name.slice(1)]} />
                      <Legend
                        formatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
                        iconType="circle"
                        iconSize={8}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Payment Method */}
              <div className="an-chart-card">
                <h2 className="an-chart-title">Payment Methods</h2>
                <p className="an-chart-sub">COD vs Bank Deposit</p>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={paymentData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis dataKey="method" tick={{ fontSize: 12, fill: '#777' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#999' }} allowDecimals={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" name="Orders" radius={[6, 6, 0, 0]}>
                      <Cell fill="#3b82f6" />
                      <Cell fill="#8b5cf6" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ── Row: Top Products + Category ── */}
            <div className="an-chart-row">

              {/* Top 5 Products */}
              <div className="an-chart-card">
                <h2 className="an-chart-title">Top Products by Revenue</h2>
                <p className="an-chart-sub">Based on items in non-cancelled orders</p>
                {topProducts.length === 0 ? (
                  <p className="an-no-data">No product data available</p>
                ) : (
                  <div className="an-top-products">
                    {topProducts.map((p, i) => (
                      <div key={i} className="an-top-product-row">
                        <span className="an-rank">#{i + 1}</span>
                        <div className="an-product-bar-wrapper">
                          <div className="an-product-name">{p.name}</div>
                          <div className="an-product-bar-track">
                            <div
                              className="an-product-bar-fill"
                              style={{ width: `${(p.revenue / topProducts[0].revenue) * 100}%` }}
                            />
                          </div>
                        </div>
                        <span className="an-product-revenue">
                          Rs. {p.revenue.toLocaleString('en-PK')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Products by Category */}
              <div className="an-chart-card">
                <h2 className="an-chart-title">Products by Category</h2>
                <p className="an-chart-sub">Count of products per category</p>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={categoryData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis dataKey="category" tick={{ fontSize: 12, fill: '#777' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#999' }} allowDecimals={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" name="Products" fill="#22c55e" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;