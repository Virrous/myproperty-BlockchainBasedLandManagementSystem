import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./userlogin.css";

function UserLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ phone_no: "", password: "" });
  const [registerData, setRegisterData] = useState({
    full_name: "",
    email: "",
    phone_no: "",
    password: "",
    citizenship_no: "",
    district: "",
    address: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/UserDashboard");
      return;
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

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", loginData);
      localStorage.setItem("token", response.data.token);
      navigate("/UserDashboard");
    } catch (error) {
      setMessage("Login failed: " + (error.response?.data || "Server error"));
    }
  };

  const validateRegisterData = () => {
    const { email, phone_no, password } = registerData;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const phoneRegex = /^(98|97)[0-9]{8}$/;
    const passwordRegex = /.{8,}/;

    if (!emailRegex.test(email)) {
      setMessage("Email must end with @gmail.com");
      return false;
    }
    if (!phoneRegex.test(phone_no)) {
      setMessage("Phone number must start with 98 or 97 and contain exactly 10 digits");
      return false;
    }
    if (!passwordRegex.test(password)) {
      setMessage("Password must contain at least 8 characters");
      return false;
    }
    return true;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateRegisterData()) return;

    try {
      await axios.post("http://localhost:8080/register", registerData);
      setMessage("Registration successful!");
    } catch (error) {
      setMessage("Registration failed: " + (error.response?.data || "Server error"));
    }
  };

  return (
    <>
    <div className="hero">
      <div className="form-box">
        <div className="buttonBox">
          <button type="button" className="toggle-btn" onClick={() => setIsLogin(true)}>Log In</button>
          <button type="button" className="toggle-btn" onClick={() => setIsLogin(false)}>Register</button>
        </div>
        {message && <div className="message">{message}</div>}
        {isLogin ? (
          <form onSubmit={handleLoginSubmit}>
            <input type="number" name="phone_no" placeholder="Phone Number" value={loginData.phone_no} onChange={handleLoginChange} required />
            <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required />
            <button type="submit">Log In</button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <input type="text" name="full_name" placeholder="Full Name" value={registerData.full_name} onChange={handleRegisterChange} required />
            <input type="email" name="email" placeholder="Email" value={registerData.email} onChange={handleRegisterChange} required />
            <input type="number" name="phone_no" placeholder="Phone Number" value={registerData.phone_no} onChange={handleRegisterChange} required />
            <input type="password" name="password" placeholder="Password" value={registerData.password} onChange={handleRegisterChange} required />
            <input type="number" name="citizenship_no" placeholder="Citizenship No" value={registerData.citizenship_no} onChange={handleRegisterChange} required />
            
            <select name="district" value={registerData.district} onChange={handleRegisterChange} required>
              <option value="">Select District</option>
              <option value="Bhojpur">Bhojpur</option>
              <option value="Dhankuta">Dhankuta</option>
              <option value="Ilam">Ilam</option>
              <option value="Jhapa">Jhapa</option>
              <option value="Khotang">Khotang</option>
              <option value="Morang">Morang</option>
              <option value="Okhaldhunga">Okhaldhunga</option>
              <option value="Panchthar">Panchthar</option>
              <option value="Sankhuwasabha">Sankhuwasabha</option>
              <option value="Solukhumbu">Solukhumbu</option>
              <option value="Sunsari">Sunsari</option>
              <option value="Taplejung">Taplejung</option>
              <option value="Tehrathum">Tehrathum</option>
              <option value="Udayapur">Udayapur</option>
            </select>
            
            <input type="text" name="address" placeholder="Enter your Address" value={registerData.address} onChange={handleRegisterChange} required />
            <button type="submit">Register</button>
          </form>
        )}
      </div>
    </div>
    </>
  );
}

export default UserLogin;