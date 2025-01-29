import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./userdashboard.css";
import Navbar from "./Navbar";

function UserDashboard() {
  const [customerDetails, setCustomerDetails] = useState({});
  const [editDetails, setEditDetails] = useState(false);
  const [newDetails, setNewDetails] = useState({
    full_name: "",
    email: "",
    phone_no: "",
    address: "",
    citizenship_no: "",
    district: "",
  });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/UserLogin");
      return;
    }

    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get("http://localhost:8080/customerDetails", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomerDetails(response.data);
      } catch (error) {
        setMessage("Failed to fetch customer details");
      }
    };
    fetchCustomerDetails();
  }, [navigate]);

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setNewDetails({ ...newDetails, [name]: value });
  };

  const handlePasswordChange = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/changePassword",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage(response.data.message || "Password changed successfully");
      setOldPassword("");
      setNewPassword("");
      setShowPasswordFields(false);
      setTimeout(() => {
        setMessage("");
      }, 4000);
    } catch (error) {
      setMessage("Password change failed");
    }
  };

  const handleDetailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:8080/updateDetails",
        newDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage(response.data.message || "Details updated successfully");
      setCustomerDetails({ ...customerDetails, ...newDetails });
      setEditDetails(false);
      setTimeout(() => {
        setMessage("");
      }, 4000);
    } catch (error) {
      setMessage("Failed to update details");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Home");
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      try {
        await axios.delete("http://localhost:8080/deleteAccount", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        localStorage.removeItem("token");
        navigate("/profile");
      } catch (error) {
        setMessage("Failed to delete account");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome to Dashboard</h1>
        {message && <div className="dashboard-message">{message}</div>}
        <div className="dashboard-customer-details">
          <h2>Your Details</h2>
          {editDetails ? (
            <form onSubmit={handleDetailSubmit}>
              
              <div className="dashboard-detail-item">
                <label>Name: </label>
                <input
                  type="text"
                  name="full_name"
                  value={newDetails.full_name}
                  onChange={handleDetailChange}
                />
              </div>
              <div className="dashboard-detail-item">
                <label>Email: </label>
                <input
                  type="email"
                  name="email"
                  value={newDetails.email}
                  onChange={handleDetailChange}
                />
              </div>
              <div className="dashboard-detail-item">
                <label>Phone: </label>
                <input
                  type="text"
                  name="phone_no"
                  value={newDetails.phone_no}
                  onChange={handleDetailChange}
                />
              </div>
              {showPasswordFields ? (
                <>
                  <div className="dashboard-detail-item">
                    <label>Old Password: </label>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="dashboard-detail-item">
                    <label>New Password: </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handlePasswordChange}
                    className="changePassword"
                  >
                    Change Password
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPasswordFields(true)}
                  className="changePassword"
                >
                  Change Password
                </button>
              )}
              <div className="dashboard-buttons">
                <button type="submit">Save</button>
                <button
                  type="button"
                  onClick={() => {
                    setEditDetails(false);
                    setShowPasswordFields(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="dashboard-detail-item">
                <span>Name    : {customerDetails.full_name}</span>
              </div>
              <div className="dashboard-detail-item">
                <span>Email   : {customerDetails.email}</span>
              </div>
              <div className="dashboard-detail-item">
                <span>Phone   : {customerDetails.phone_no}</span>
              </div>
              <div className="dashboard-detail-item">
                <span>
                  Address     :{customerDetails.address} {customerDetails.district}
                </span>
              </div>
              <div className="dashboard-detail-item">
                <span>Citizenship No.: {customerDetails.citizenship_no}</span>
              </div>
              <button
                className="edit-button"
                onClick={() => setEditDetails(true)}
              >
                Edit
              </button>
            </>
          )}
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        <button className="delete-account-button" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>
    </>
  );
}

export default UserDashboard;
