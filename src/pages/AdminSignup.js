import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adminsignup.css";

function AdminSignup() {
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/registerAdmin", registerData);
      setMessage("Registration successful!");
    } catch (error) {
      setMessage("Registration failed: try again this is not your fault " + (error.response?.data || "Server error"));
    }
  };

  return (
    <div className="hero">
      <div className="form-box">
        {message && <div className="message">{message}</div>}
        <form onSubmit={handleRegisterSubmit}>
          <input type="text" name="username" placeholder="username" value={registerData.username} onChange={handleRegisterChange} required />
          <input type="password" name="password" placeholder="Password" value={registerData.password} onChange={handleRegisterChange} required />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default AdminSignup;
