import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./officelogin.css";

const OfficeLogin = () => {
  const [loginData, setLoginData] = useState({ phone_no: "", password: "" });
  const [message, setMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("officeToken");
    if (token) {
      navigate("/OfficeProfile");
    }
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [navigate, message]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/officeLogin", loginData);

      // Correctly save the token
      localStorage.setItem("officeToken", response.data.officeToken);

      setMessage("Login Successful");
      navigate("/OfficeProfile"); // Navigate to profile page after successful login
    } catch (error) {
      const errorMsg = error.response?.data || "Server error";
      setMessage(`Login failed: ${errorMsg}`);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="office-login">
      <div className="office-login-container">
        <img className="office-login-logo" src="https://www.shutterstock.com/image-vector/user-icon-vector-trendy-flat-600nw-1720665448.jpg" alt="Citizen Portal Logo" />
        <h2 className="office-login-title">OFFICE PORTAL</h2>

        {message && <div className="office-login-message">{message}</div>}

        <form onSubmit={handleLoginSubmit}>
          {/* Mobile Number Input */}
          <div className="office-login-input-group">
            <i className="fas fa-phone-alt office-login-icon"></i>
            <input
              className="office-login-input"
              type="text"
              name="phone_no"
              value={loginData.phone_no}
              onChange={handleLoginChange}
              placeholder="Mobile Number"
              required
            />
          </div>

          {/* Password Input */}
          <div className="office-login-input-group office-login-password-group">
            <input
              className="office-login-input"
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              placeholder="Password"
              required
            />
            <i
              className={`fas ${passwordVisible ? "fa-eye" : "fa-eye-slash"} office-login-password-toggle`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>

          {/* Show Password Checkbox */}
          <div className="office-login-checkbox-group">
            <input
              className="office-login-checkbox"
              type="checkbox"
              id="showPassword"
              checked={passwordVisible}
              onChange={togglePasswordVisibility}
            />
            <label className="office-login-checkbox-label" htmlFor="showPassword">
              Show Password
            </label>
          </div>

          {/* Login Button */}
          <button type="submit" className="office-login-button">
            LOGIN <i className="fas fa-sign-in-alt office-login-button-icon"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default OfficeLogin;
