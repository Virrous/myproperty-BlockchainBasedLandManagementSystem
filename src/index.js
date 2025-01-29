// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home";
import UserLogin from "./pages/userpage/UserLogin";
import UserDashboard from "./pages/userpage/UserDashboard";
import UserDocument from "./pages/userpage/UserDocument";
import Admin from "./pages/adminpage/Admin";
import AdminLogin from "./pages/adminpage/AdminLogin";
import UserNotifications from "./pages/userpage/UserNotifications";
import OfficeDocument from "./pages/officepage/OfficeDocument";
import OfficeLogin from "./pages/officepage/OfficeLogin";
import OfficeProfile from "./pages/officepage/OfficeProfile";
import OfficeAboutUs from "./pages/officepage/OfficeAboutUs";
import UserAboutUs from "./pages/userpage/UserAboutUs";
import OfficeContactUs from "./pages/officepage/OfficeContactUs";
import UserContactUs from "./pages/userpage/UserContactUs";
import UserHome from "./pages/userpage/UserHome";
import OfficeNotify from "./pages/officepage/OfficeNotify";
import OfficeHome from "./pages/officepage/OfficeHome";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router
      future={{
        v7_startTransition: true, // Opt into React Router v7's startTransition behavior
        v7_relativeSplatPath: true, // Opt into v7's splat route behavior
      }}
    >
      <App />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/UserDocument" element={<UserDocument />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/UserNotifications" element={<UserNotifications />} />
        <Route path="/OfficeDocument" element={<OfficeDocument />} />
        <Route path="/OfficeLogin" element={<OfficeLogin />} />
        <Route path="/OfficeProfile" element={<OfficeProfile />} />
        <Route path="/OfficeAboutUs" element={<OfficeAboutUs />} />
        <Route path="/UserAboutUs" element={<UserAboutUs />} />
        <Route path="/OfficeContactUs" element={<OfficeContactUs />} />
        <Route path="/UserContactUs" element={<UserContactUs />} />
        <Route path="/UserHome" element={<UserHome />} />
        <Route path="/OfficeNotify" element={<OfficeNotify />} />
        <Route path="/OfficeHome" element={<OfficeHome />} />
        {/* Example of a splat route */}
        <Route path="/catch-all/*" element={<div>Catch-All Route</div>} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
