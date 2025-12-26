import React from 'react'
import "../styles/admin.css";
import QuickActionCards from '../components/QuickActionCards/QuickActionCards';
import Analytics from '../components/Analytics/Analytics';
import LowStockItem from '../components/LowStockItem/LowStockItem';
import logo from "../assets/images/logo.png";
import product1 from '../assets/images/product1.png';
import product2 from '../assets/images/product2.png';
import product3 from '../assets/images/product3.png';

const Admin = () => {
  return (
    <>
    <div className="admin-container">
      <aside className="admin-sidebar">
        <span className="logo">
          <img src={logo} alt="" />
          <h1>
            Perfumes<br />
            Mists
          </h1>
        </span>

        <nav className="admin-menu">
          <a href="">Dashboard</a>
          <a href="">Add Product</a>
          <a href="">Manage Prodcuts</a>
          <a href="">Categories</a>
          <a href="">Sales</a>
          <a href="">Orders</a>
          <a href="">Customers</a>
          <a href="">Settings</a>
        </nav>
      </aside>

      <div className="admin-main">
        <nav className="admin-nav">
          <div className="searchbar-wrapper">
            <div className="searchbar">
              <input type="text" name="" id="" placeholder="Search" />
              <button className="search-btn">
                <svg width="24px" height="30px" viewBox="0 0 24 24">
                  <path
                    fill="#666666"
                    d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="admin-nav-right">
            <i className="fa-regular fa-bell"></i>
            <i className="fa-regular fa-envelope"></i>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-jx7KaqyEK67vo7J94C45lnF4X3wx30lVaA&s"
              alt=""
            />
          </div>
        </nav>

         <section className="admin-section">
          <h1>Quick Actions</h1>
          <div className='cards-container'>
          <QuickActionCards quickaction="Add Product" variant="card1" />
          <QuickActionCards quickaction="Manage Products" variant="card2" />
            <QuickActionCards quickaction="Add Sales" variant="card3" />
            <QuickActionCards quickaction="Create Category" variant="card4" />
            </div>

            <h1>Analytics</h1>
            <div className="boxes-container">
            <Analytics analytic="Total Products" value="750" variant="box1" />
            <Analytics analytic="Total Sales" value="$12,500" variant="box2" />
            <Analytics analytic="Total Orders" value="1,200" variant="box3" />
            <Analytics analytic="Total Customers" value="3,400" variant="box4" />
            </div>

            <h1>Recent Orders</h1>
            <div className="orders-container">
            <div className="order-searchbar-sort">
                <div className="ordersearchbar searchbar">
                 <input type="text" name="" id="" placeholder="Search by Order ID" />
              <button className="search-btn">
                <svg width="24px" height="30px" viewBox="0 0 24 24">
                  <path
                    fill="#666666"
                    d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                  />
                </svg>
              </button>
              </div>
              <div className="order-sort">
                <select name="sort" id="sort">
            <option defaultValue="">Last 7 days</option>
            <option defaultValue="men">Today</option>
            <option defaultValue="women">Yesterday</option>
            <option defaultValue="sale">Last Month</option>
            <option defaultValue="best-selling">Last Year</option>
          </select>
              </div>
            </div>
            <div className="rad-btns">
                <p>Show:</p>
                <input type="radio" />
                <label htmlFor="">All</label>
                <input type="radio" />
                <label htmlFor="">Confirmed</label>
                <input type="radio" />
                <label htmlFor="">In Transit</label>
                <input type="radio" />
                <label htmlFor="">Cancelled</label>
            </div>
            <div className="orders-table">
                <table>
                    <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>#1001</td>
                    <td>2025-06-01</td>
                    <td>PKR 5,000</td>
                    <td><span className="status active">Confirmed</span></td>
                    <td><select name="Actions" id="">
                        <option  selected hidden>Actions</option>
                        <option >Order again</option>
                        <option >Order details</option>
                        <option  style={{color: '#060505ff'}}>Cancel order</option>
                    </select></td>
                </tr>
                <tr>
                    <td>#1002</td>
                    <td>2025-06-02</td>
                    <td>PKR 3,200</td>
                    <td><span className="status in-transit">In Transit</span></td>
                    <td><select name="Actions" id="">
                        <option  selected hidden>Actions</option>
                        <option >Order again</option>
                        <option >Order details</option>
                        <option style={{color: '#d62f2f'}}>Cancel order</option>
                    </select></td>
                </tr>
                <tr>
                    <td>#1003</td>
                    <td>2025-06-03</td>
                    <td>PKR 7,450</td>
                    <td><span className="status expired">Cancelled</span></td>
                    <td><select name="Actions" id="">
                        <option  selected hidden>Actions</option>
                        <option >Order again</option>
                        <option >Order details</option>
                        <option style={{color: '#d62f2f'}}>Cancel order</option>
                    </select></td>
                </tr>
                <tr>
                    <td>#1004</td>
                    <td>2025-06-04</td>
                    <td>PKR 2,300</td>
                    <td><span className="status active">Confirmed</span></td>
                    <td><select name="Actions" id="">
                        <option selected hidden>Actions</option>
                        <option>Order again</option>
                        <option>Order details</option>
                        <option style={{color: '#d62f2f'}}>Cancel order</option>
                    </select></td>
                </tr>
                <tr>
                    <td>#1005</td>
                    <td>2025-06-05</td>
                    <td>PKR 6,750</td>
                    <td><span className="status in-transit">In Transit</span></td>
                    <td><select name="Actions" id="">
                        <option selected hidden>Actions</option>
                        <option>Order again</option>
                        <option>Order details</option>
                        <option style={{color: '#d62f2f'}}>Cancel order</option>
                    </select></td>
                </tr>
                </tbody>
                </table>
            </div>
        </div>

         <h1>Inventory</h1>
         <div className="inventory-container">
           <div className="inventory-searchbar-sort">
                <div className="inventorysearchbar searchbar">
                 <input type="text" name="" id="" placeholder="Search by Product SKU" />
              <button className="search-btn">
                <svg width="24px" height="30px" viewBox="0 0 24 24">
                  <path
                    fill="#666666"
                    d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                  />
                </svg>
              </button>
              </div>
              <div className="inventory-sort">
                <select name="sort" id="sort">
            <option>Perfumes</option>
            <option defaultValue="men">Perfume Oils</option>
            <option defaultValue="women">Mists</option>
            <option defaultValue="sale">Deodorants</option>
          </select>
              </div>
            </div>
             <div className="inventory-table">
                <table>
                    <thead>
                <tr>
                    <th>Product Name</th>
                    <th>SKU</th>
                    <th>Location</th>
                    <th>Stock Quantity</th>
                    <th>Unit Cost</th>
                    <th>Total Value</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>Khamrah</td>
                    <td>SKU001</td>
                    <td>Warehouse 1</td>
                    <td>200</td>
                    <td>Rs.8000</td>
                    <td>Rs.80000</td>
                    </tr>
                <tr>
                    <td>Asad Bourbon</td>
                    <td>SKU002</td>
                    <td>Warehouse 1</td>
                    <td>100</td>
                    <td>Rs.10000</td>
                    <td>Rs.100000</td>
                    </tr>
                <tr>
                    <td>Ameer Al Oud</td>
                    <td>SKU003</td>
                    <td>Warehouse 2</td>
                    <td style={{color: '#d62f2f'}}>10</td>
                    <td>Rs.8000</td>
                    <td>Rs.80000</td>
                    </tr>
                <tr>
                    <td>Kingdom</td>
                    <td>SKU004</td>
                    <td>Warehouse 2</td>
                    <td>200</td>
                    <td>Rs.9000</td>
                    <td>Rs.90000</td>
                    </tr>
                <tr>
                    <td>Badee Al Oud</td>
                    <td>SKU005</td>
                    <td>Warehouse 1</td>
                    <td style={{color: '#d62f2f'}}>Out of Stock</td>
                    <td>Rs.12000</td>
                    <td>Rs.120000</td>
                    </tr>
                </tbody>
              </table>
              </div>
        </div>

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

        <h1>Low Stock</h1>
        <div className="low-stock-container">
            <LowStockItem image={product1} name="Mint" stock="10" />
            <LowStockItem image={product2} name="Pink Floral" stock="5" />
            <LowStockItem image={product3} name="Paradox" stock="8" />
        </div>

        <h1>Top Selling Products</h1>
        <div class="top-sold-container">
            <LowStockItem image="https://lattafapakistan.com/cdn/shop/files/The-Kingdom-for-Men-61521561.png?v=1753977803" name="The Kingdom" />
            <LowStockItem image="https://lattafapakistan.com/cdn/shop/files/Khamrah-61480297.png?v=1753975734" name="Khamrah" />
            <LowStockItem image="https://lattafapakistan.com/cdn/shop/files/Asad-Bourbon-61571337.png?v=1753974640" name="Asad Bourbon" />
            </div>
            </section>
        </div>
      </div>
    </>
  )
}

export default Admin