import React, { useState } from 'react';
import { 
  BarChart3, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Package, 
  Settings, 
  LogOut,
  Search,
  Bell,
  MoreVertical,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';
import { products } from '../data/products';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { title: 'Total Revenue', value: '$124,563.00', change: '+12.5%', isPositive: true, icon: <DollarSign size={24} /> },
    { title: 'Total Orders', value: '8,459', change: '+5.2%', isPositive: true, icon: <ShoppingBag size={24} /> },
    { title: 'Total Products', value: products.length.toString(), change: '-1.5%', isPositive: false, icon: <Package size={24} /> },
    { title: 'New Customers', value: '2,431', change: '+18.2%', isPositive: true, icon: <Users size={24} /> }
  ];

  // Map dummy orders but use actual product data
  const recentOrders = [
    { id: '#ORD-001', customer: 'Emma Watson', product: products[4].name, date: 'Oct 24, 2026', amount: `$${products[4].price.toFixed(2)}`, status: 'Completed' },
    { id: '#ORD-002', customer: 'James Smith', product: products[9].name, date: 'Oct 24, 2026', amount: `$${products[9].price.toFixed(2)}`, status: 'Processing' },
    { id: '#ORD-003', customer: 'Sophia Johnson', product: products[12].name, date: 'Oct 23, 2026', amount: `$${products[12].price.toFixed(2)}`, status: 'Completed' },
    { id: '#ORD-004', customer: 'Michael Brown', product: products[0].name, date: 'Oct 23, 2026', amount: `$${products[0].price.toFixed(2)}`, status: 'Pending' },
    { id: '#ORD-005', customer: 'Olivia Williams', product: products[7].name, date: 'Oct 22, 2026', amount: `$${products[7].price.toFixed(2)}`, status: 'Completed' },
  ];

  const topProducts = [
    { ...products[0], sales: 845, trend: '+5%' },
    { ...products[2], sales: 620, trend: '+12%' },
    { ...products[15], sales: 512, trend: '+2%' }
  ];

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>LUXE<span>ADMIN</span></h2>
        </div>
        
        <nav className="admin-nav">
          <ul>
            <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
              <BarChart3 size={20} />
              <span>Dashboard</span>
            </li>
            <li className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
              <Package size={20} />
              <span>Products</span>
            </li>
            <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
              <ShoppingBag size={20} />
              <span>Orders</span>
            </li>
            <li className={activeTab === 'customers' ? 'active' : ''} onClick={() => setActiveTab('customers')}>
              <Users size={20} />
              <span>Customers</span>
            </li>
          </ul>
        </nav>

        <div className="admin-bottom-nav">
          <ul>
            <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
              <Settings size={20} />
              <span>Settings</span>
            </li>
            <li>
              <Link to="/">
                <LogOut size={20} />
                <span>Storefront</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-search-bar">
            <Search size={20} className="search-icon" />
            <input type="text" placeholder="Search orders, products..." />
          </div>
          
          <div className="admin-header-actions">
            <button className="icon-btn">
              <Bell size={20} />
              <span className="badge">3</span>
            </button>
            <div className="admin-profile">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Admin" />
              <div className="profile-info">
                <span className="name">Alex Carter</span>
                <span className="role">Super Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="admin-content">
          <div className="admin-page-title">
            <h1>Overview</h1>
            <p>Welcome back, here's what's happening deeply today.</p>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
               <div className="stat-card" key={index}>
                <div className="stat-header">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className={`stat-change ${stat.isPositive ? 'positive' : 'negative'}`}>
                    {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {stat.change}
                  </div>
                </div>
                <div className="stat-details">
                  <h3>{stat.value}</h3>
                  <p>{stat.title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-sections">
            {/* Recent Orders */}
            <div className="orders-section section-card">
              <div className="section-header">
                <h2>Recent Orders</h2>
                <button className="btn-secondary">View All</button>
              </div>
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Product</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <tr key={index}>
                        <td className="order-id">{order.id}</td>
                        <td>{order.customer}</td>
                        <td>{order.product}</td>
                        <td>{order.date}</td>
                        <td className="amount">{order.amount}</td>
                        <td>
                          <span className={`status-badge ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <button className="action-btn"><MoreVertical size={18} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Products */}
            <div className="top-products-section section-card">
              <div className="section-header">
                <h2>Top Products</h2>
              </div>
              <div className="top-products-list">
                {topProducts.map((product, i) => (
                  <div className="top-product-item" key={i}>
                    <img src={product.image} alt={product.name} />
                    <div className="product-details">
                      <h4>{product.name}</h4>
                      <p style={{ textTransform: 'capitalize' }}>{product.category} Category</p>
                    </div>
                    <div className="product-sales">
                      <span className="sales">{product.sales} Sales</span>
                      <span className="trend"><TrendingUp size={14} /> {product.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
