import React from 'react';
import './Footer.css';
// import { FaLinkedinIn, FaTwitter, FaFacebookF, FaYoutube, FaInstagram } from 'react-icons/fa';
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md';
import SwaysiveLogo from '../../../assets/icons/Swaysive-Icon.svg'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">

        {/* Left section */}
        <div className="footer-column">
          <h1 className="footer-logo">
            <img src={SwaysiveLogo} alt="Swaysive Logo" className="logo-icon" />
            
          </h1>
          <p className="footer-description">
            CryptoEase means choosing a partner dedicated to revolutionizing your cryptocurrency journey
          </p>
          {/* <div className="footer-socials">
            <FaLinkedinIn />
            <FaTwitter />
            <FaFacebookF />
            <FaYoutube />
            <FaInstagram />
          </div> */}
        </div>

        {/* Quick Links */}
        {/* <div className="footer-column">
          <h4>Quick Lnnks</h4>
          <ul>
            <li>Product</li>
            <li>Pricing</li>
            <li>Documentation</li>
            <li>Affiliate Login</li>
            <li>Support</li>
          </ul>
        </div> */}

        {/* Legal */}
        <div className="footer-column">
          <h4>Legal</h4>
          <ul>
            <li><Link to={'/privacy-policy'} style={{textDecoration:'none',color:'#2b2b2b'}}>Privacy Policy</Link></li>
            <li><Link to={'/terms-and-conditions'} style={{textDecoration:'none',color:'#2b2b2b'}}>Terms & Conditions</Link></li>
            {/* <li>Cookie Preferences</li> */}
          </ul>
        </div>

        {/* Social & Contact */}
        {/* <div className="footer-column">
          <h4>Social Icons</h4>
          <ul>
            <li><FaLinkedinIn /> LinkedIn</li>
            <li><FaTwitter /> Twitter</li>
            <li><FaYoutube /> Youtube</li>
          </ul>
        </div> */}
        <div className="footer-column">
          <h4>Contact</h4>
          <ul>
            <li><MdLocationOn /> 12345 California, Amerika, OR 97103</li>
            <li><MdEmail /> contact@swaysive.com</li>
            {/* <li><MdPhonee /> (802) 509–9504</li> */}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © Copyright Swaysive2025
      </div>
    </footer>
  );
};

export default Footer;
