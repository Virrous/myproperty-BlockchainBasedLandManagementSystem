import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./usernotifications.css";
import Navbar from "./Navbar";

const UserNotifications = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/UserLogin");
      return;
    }
  }, [navigate]);
  const [activeSection, setActiveSection] = useState("brought");

  const showSection = (section) => {
    setActiveSection(section);
  };

  return (
    <>
    <Navbar />
    <div className="user-notifications">
      <div className="button-container">
        <button
          className={`toggle-button ${
            activeSection === "brought" ? "active" : "inactive"
          }`}
          onClick={() => showSection("brought")}
        >
          Brought
        </button>
        <button
          className={`toggle-button ${
            activeSection === "sold" ? "active" : "inactive"
          }`}
          onClick={() => showSection("sold")}
        >
          Sold
        </button>
      </div>

      <div
        className={`table-container ${
          activeSection === "brought" ? "active" : ""
        }`}
      >
        <h2>Brought Details</h2>
        <table>
          <thead>
            <tr>
              <th>Seller Name</th>
              <th>Seller No.</th>
              <th>Land Type</th>
              <th>Land Area (sq ft)</th>
              <th>Land Address</th>
              <th>Brought Price</th>
              <th>Brought Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nabin</td>
              <td>234567</td>
              <td>Agricultural</td>
              <td>1200 sq.ft</td>
              <td>BTM</td>
              <td>1200</td>
              <td>01/12/2012</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        className={`table-container ${
          activeSection === "sold" ? "active" : ""
        }`}
      >
        <h2>Sold Details</h2>
        <table>
          <thead>
            <tr>
              <th>Buyer Name</th>
              <th>Buyer No.</th>
              <th>Land Type</th>
              <th>Land Area (sq ft)</th>
              <th>Land Address</th>
              <th>Sold Price</th>
              <th>Sold Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nabin</td>
              <td>234567</td>
              <td>Agricultural</td>
              <td>1200 sq.ft</td>
              <td>BTM</td>
              <td>1200</td>
              <td>01/12/2012</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default UserNotifications;
