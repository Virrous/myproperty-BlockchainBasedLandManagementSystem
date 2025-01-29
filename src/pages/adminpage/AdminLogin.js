import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLogin() {
  const [loginData, setLoginData] = useState({ admin_username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    if (token) {
      navigate("/Admin");
      return;
    }
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [navigate, message]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/adminLogin", loginData);
      localStorage.setItem("admintoken", response.data.admintoken);
      navigate("/Admin");
    } catch (error) {
      setMessage("Login failed: " + (error.response?.data || "Server error"));
    }
  };

  return (
    <div className="hero">
      <div className="form-box">
        {message && <div className="message">{message}</div>}
        <form onSubmit={handleLoginSubmit}>
          <input
            type="text"
            name="admin_username"
            placeholder="Username"
            value={loginData.admin_username}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
