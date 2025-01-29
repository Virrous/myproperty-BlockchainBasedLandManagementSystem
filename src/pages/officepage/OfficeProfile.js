import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./officeprofile.css";
import OfficeNav from "./OfficeNav";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";

const OfficeProfile = () => {
  const [officeDetails, setOfficeDetails] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const officeToken = localStorage.getItem("officeToken");
    if (!officeToken) {
      navigate("/OfficeLogin");
      return;
    }

    const fetchOfficeDetails = async () => {
      try {
        const response = await axios.get("http://localhost:8080/officeDetails", {
          headers: { Authorization: `Bearer ${officeToken}` },
        });
        setOfficeDetails(response.data);
      } catch (error) {
        setMessage("Failed to fetch office details");
      }
    };
    fetchOfficeDetails();
  }, [navigate]);

  if (!officeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <OfficeNav />
      <div className="profile-container">
        {/* Profile Picture */}
        <div className="profile-pic">
          <HiMiniBuildingOffice2 size={50} />
        </div>
        

        {/* Name */}
        <div className="profile-name">{officeDetails.office_name}</div>

        {/* Profile Details Section */}
        <div className="dashboard-detail-item">
          <span>Office Name    : {officeDetails.office_name}</span>
        </div>
        <div className="dashboard-detail-item">
          <span>Office Email   : {officeDetails.office_email}</span>
        </div>
        <div className="dashboard-detail-item">
          <span>Office Phone   : {officeDetails.office_mobile}</span>
        </div>
        <div className="dashboard-detail-item">
          <span>
            Office Address     : {officeDetails.office_location}, {officeDetails.office_district}
          </span>
        </div>
        <div className="dashboard-detail-item">
          <span>Office Department: {officeDetails.office_department}</span>
        </div>
        {/* Action Buttons */}
        <div className="action-buttons">
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("officeToken");
              navigate("/OfficeLogin");
            }}
          >
            Logout
          </button>
        </div>

        {/* App Version */}
        <div className="app-version">App version 2.0.30</div>
      </div>
    </>
  );
};

export default OfficeProfile;
