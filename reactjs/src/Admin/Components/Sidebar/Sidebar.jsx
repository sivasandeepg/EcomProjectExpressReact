// Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../Styles/Admin/Sidebar.css';

const Sidebar = () => {
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  const toggleProductsDropdown = () => {
    setIsProductsDropdownOpen(!isProductsDropdownOpen);
  };

  return (
    <div className="sidebar-container">
      <ul className="Sidebar-list">
        <li className="navbar-item"><Link to='/Admin'>Dashboard</Link></li>
        <li className="navbar-item"><Link to='/Admin/Sitesettings'>Site Settings</Link></li>
        <li className="navbar-item"><Link to='/Admin/Customers'>Customers</Link></li>

        <li className={`navbar-item ${isProductsDropdownOpen ? 'active' : ''}`}>
          <div className="dropdown-toggle" onClick={toggleProductsDropdown}>
            Products
          </div>
          <ul className={`dropdown-menu ${isProductsDropdownOpen ? 'show' : ''}`}>
            <li className="dropdown-item"><Link to='/Admin/Products'>All Products</Link></li>
            <li className="dropdown-item"><Link to='/Admin/Products/CreateProduct'>Create Product</Link></li>
            <li className="dropdown-item"><Link to='/Admin/Products/CreateCategories'>Create Categories</Link></li>
            <li className="dropdown-item"><Link to='/Admin/Products/CreateBrand'>Create Brand</Link></li>
            <li className="dropdown-item"><Link to='/Admin/Products/CreateModel'>Create Model</Link></li>
            <li className="dropdown-item"><Link to='/Admin/Products/CreateSize'>Create Size</Link></li>
          </ul>
        </li>

        <li className={`navbar-item orders-item ${isProductsDropdownOpen ? 'margin-top' : ''}`}>
          <Link to='/Admin/Orders'>Orders</Link>
        </li>
      </ul>
    </div>
  );
};
 
 
export default Sidebar;
 
    
  


// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../../../Styles/Admin/Sidebar.css';  
// const Sidebar = () => {
//   return (
    
// <div className="sidebar-container">
//   <ul className="Sidebar-list">
//     {/* Left side navigation links */}
//     <li className="navbar-item"><Link to='/Admin'>DashBoard</Link></li>  
//     <li className="navbar-item"><Link to='/Admin/Sitesettings'>Site Settings</Link></li>
//     <li className="navbar-item"><Link to='/Admin/Customers'>Customers</Link></li>
//     <li className="navbar-item"><Link to='/Admin/Products'>Products</Link></li>
//     <li className="navbar-item"><Link to='/Admin/Orders'>Orders</Link></li> 
//   </ul>
// </div>    
    
//   );
// };
// export default Sidebar;
 