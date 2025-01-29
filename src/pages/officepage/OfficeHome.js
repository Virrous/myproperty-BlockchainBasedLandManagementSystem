import React, { useEffect } from "react";
import "./officehome.css";
import { useNavigate } from "react-router-dom";
import OfficeNav from "./OfficeNav";

const OfficeHome = () => {
    const navigate = useNavigate();
  useEffect(() => {

    const token = localStorage.getItem("officeToken");
    if (!token) {
      navigate("/OfficeLogin");
      return;
    }
  }, [navigate]);
  return (
    <>
    <OfficeNav />
    <div className="user-home">
      {/* First Frame */}
      <section className="frame first-frame">
        <div className="container">
          {/* Left Section */}
          <div className="left">
            <div className="header">
              <div className="logo">SmartSpace</div>
            </div>
            <div className="subtitle">RESIDENTIAL & COMMERCIAL LANDMARK</div>
            <div className="title">
              <i>Land is Wealth<br />Build Your Future on Solid Ground</i>
            </div>
            <div className="description">
              Effective land management can drive economic growth, enhance community living standards, and provide sustainable, long-term value. It can optimize energy use, improve security, and transform the way people live and work.
            </div>
          </div>

          {/* Right Section */}
          <div className="right">
            <img
              src="https://media.istockphoto.com/id/1437629749/photo/land-plot-in-aerial-view-in-chiang-mai-of-thailand.jpg?s=612x612&w=0&k=20&c=07y-L9_WJwFGmvvhrZULYbfTfDtUPHnxJhbxWPTiqYg="
              alt="Landmark"
            />
          </div>
        </div>
      </section>

      {/* Second Frame */}
      <section className="frame second-frame">
        <div className="container2">
          <header>
            <h1>Land Property Deals</h1>
          </header>
          <div className="properties">
            <PropertyCard
              type="Residential"
              imgSrc="https://static.vecteezy.com/system/resources/thumbnails/017/508/643/small/house-symbol-with-location-pin-icon-on-round-soil-ground-cross-section-with-earth-land-free-photo.jpg"
            />
            <PropertyCard
              type="Commercial"
              imgSrc="https://media.istockphoto.com/id/1346785913/photo/warehouse-in-milton-keynes-uk.jpg?s=612x612&w=0&k=20&c=mOoLNOGg0j8F3oxa3PyDixw-BB_RS3Yc0DUaSnMX7Hw="
            />
            <PropertyCard
              type="Agricultural"
              imgSrc="https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg"
            />
          </div>
        </div>
        <footer>
          <p>&copy; 2024 Services App. All Rights Reserve.</p>
        </footer>
      </section>
    </div>
    </>
  );
};

const PropertyCard = ({ type, imgSrc }) => {
  return (
    <div className="property-card">
      <span className="badge">
        <b>{type}</b>
      </span>
      <img src={imgSrc} alt={`${type} Property`} />
    </div>
  );
};

export default OfficeHome;
