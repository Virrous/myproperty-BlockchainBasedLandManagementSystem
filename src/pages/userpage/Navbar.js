import React, { useState } from 'react';
import './navbar.css';
import { FiAlignJustify, FiX } from 'react-icons/fi';

function Navbar() {
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
        <li><a href="./UserHome">Home</a></li>
        <li><a href="./UserDocument">Documents</a></li>
        <li><a href="./UserNotifications">Notification</a></li>
        <li><a href="./UserAboutUs">About Uss</a></li>
        <li><a href="./UserContactUs">Contact Us</a></li>
        <li><a href="./UserLogin">Profiles</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;