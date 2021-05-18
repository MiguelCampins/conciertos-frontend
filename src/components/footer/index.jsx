import React from "react";
import logo from "../../assets/images/logo.png";
import "./index.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-logo">
        <img alt="logo" src={logo} />
        <h3>TicketClick</h3>
      </div>
      <div className="footer-info">
        <p>info</p>
        <p>info</p>
        <p>info</p>
      </div>
      <div className="footer-info">
        <p>info</p>
        <p>info</p>
        <p>info</p>
      </div>
      <div className="footer-info">
        <p>info</p>
        <p>info</p>
        <p>info</p>
      </div>
    </div>
  );
};

export default Footer;
