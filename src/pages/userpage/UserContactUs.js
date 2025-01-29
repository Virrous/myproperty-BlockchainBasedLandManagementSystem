import { useNavigate } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import Navbar from "./Navbar";
import emailjs from "@emailjs/browser";
import "./usercontactus.css";

const UserContactUs = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/UserLogin");
      return;
    }
  }, [navigate]);
  const form = useRef();
  const [submitMessage, setSubmitMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_ldwvo1p", "template_xvt0f1p", form.current, {
        publicKey: "ruc7vUP_OZXLtmGgA",
      })
      .then(
        () => {
          setSubmitMessage(
            "Thanks for your response, we will get back to you soon."
          );
          setTimeout(() => {
            setSubmitMessage("");
          }, 6000); // 6 seconds
        },
        (error) => {
          setSubmitMessage("Failed to send mail, please try again.");
          setTimeout(() => {
            setSubmitMessage("");
          }, 6000);
        }
      );
    form.current.reset();
  };

  return (
    <>
      <Navbar />
      <div className="cont">
        <h1>Contact Us</h1>
        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="from_name" className="name" required />
          <label>Email</label>
          <input type="email" name="from_email" className="email" required />
          <label>Message</label>
          <textarea name="message" required />
          

          <input type="submit" value="Send" />
        </form>
        {submitMessage && (
          <p style={{ color: "green" }}>
            <b>{submitMessage}</b>
          </p>
        )}
      </div>
    </>
  );
};

export default UserContactUs;