// src/components/Navbar.js
import React from 'react';
import { FaBars } from 'react-icons/fa';
import './Navbar.css';
import SwasiveIcon from '../../../assets/icons/Swaysive-Icon.svg'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg rounded-pill shadow px-4 py-3 my-3 mx-3" style={{backgroundColor:'#F4F4F4'}}>
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <img src={SwasiveIcon} alt="Logo" className="navbar-logo me-2" />
          {/* <span className="navbar-brand fw-bold mb-0">SWAYSIVE</span> */}
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <FaBars />
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item mx-3">
              <a className="nav-link active fw-semibold" href="/">Home</a>
            </li>
            <li className="nav-item mx-3">
              <a className="nav-link fw-semibold" href="#how-it-works">How it Works</a>
            </li>
            <li className="nav-item mx-3">
              <a className="nav-link fw-semibold" href="#our-services">Our Services</a>
            </li>
          </ul>
        </div>
        <div className="d-none d-lg-block">
          <a href="#" className="btn btn-dark rounded-pill px-4">
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
