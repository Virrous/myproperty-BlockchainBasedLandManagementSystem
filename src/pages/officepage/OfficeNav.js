import React, { useState } from 'react';
import './officenav.css';
import { FiAlignJustify, FiX } from 'react-icons/fi';

function OfficeNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">MyApp</div>
      <div className={`menu-icon ${isOpen ? 'move-right' : ''}`} onClick={toggleMenu}>
        {isOpen ? <FiX /> : <FiAlignJustify />}
      </div>
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><a href="./OfficeHome">Home</a></li>
        <li><a href="./OfficeDocument">Documents</a></li>
        <li><a href="./OfficeNotify">Notification</a></li>
        <li><a href="./OfficeAboutUs">About Us</a></li>
        <li><a href="./OfficeContactUs">Contact Us</a></li>
        <li><a href="./OfficeLogin">Profile</a></li>
      </ul>
    </nav>
  );
}

export default OfficeNav;