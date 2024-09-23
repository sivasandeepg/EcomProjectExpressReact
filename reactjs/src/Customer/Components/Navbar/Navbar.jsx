import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../../Styles/Customer/Navbar.css';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar-container">
      <ul className="navbar-list">
        {/* Left side navigation links */}
        <li className="navbar-item"><Link to='/'>Homepage</Link></li>
        <li className="navbar-item"><Link to='/About'>About</Link></li>
        <li className="navbar-item"><Link to='/Products'>Products</Link></li>
        <li className="navbar-item"><Link to='/Contact'>Contact</Link></li>
      </ul>
      {/* Right side login, register, cart icon and logout button */}
      <ul className="navbar-list navbar-list-right">
        <li className="navbar-item"><Link to='/cart'><FontAwesomeIcon icon={faShoppingCart} /></Link></li>
        <li className="navbar-item dropdown" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="dropdown-toggle">
            <FontAwesomeIcon icon={faUser} />
          </button>
          {dropdownVisible && (
            <ul className="dropdown-menu">
              <li className="dropdown-item"><Link to='/login'>Login</Link></li>
              <li className="dropdown-item"><Link to='/register'>Register</Link></li>
              <li className="dropdown-item"><button className="logout-button">Logout</button></li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
 