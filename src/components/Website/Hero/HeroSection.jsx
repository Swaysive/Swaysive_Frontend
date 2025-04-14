// src/components/HeroSection.js
import React from 'react';
import './HeroSection.css';
import HeroImage from '../../../assets/images/Website-HeroImg.png'

const HeroSection = () => {
  return (
    <div className="hero-section container py-5 d-flex flex-column flex-lg-row align-items-center justify-content-between">
      <div className="hero-text mb-5 mb-lg-0 ">
        <h1 className="hero-title">
          <span className="highlight-black">Revolutionize</span>{" "}
          <span className="highlight-blue">Your Amazon</span>{" "}
          <span className="highlight-orange">Affiliate Campaigns</span>
        </h1>
        <h5 className="text-muted mt-3 fw-normal">
          With Discount Codes That Actually Convert And Last.
        </h5>
        <p className="hero-description mt-4">
          Swaysive is the only platform that empowers affiliates and store
          owners to generate trackable Amazon discount codes, track conversions,
          and boost revenue beyond Amazon’s limitations.
        </p>
        <div className="d-flex gap-3 mt-4 flex-wrap">
          <a href="#" className="btn btn-dark btn-lg rounded">
            Get Started Free
          </a>
          <a href="#" className="btn btn-outline-dark btn-lg rounded text-white bg-transparent custom-outline">
            See How it Works
          </a>
        </div>
      </div>
      <div className="hero-image">
        <img src={HeroImage} alt="Dashboard" className="img-fluid rounded-4" />
      </div>
    </div>
  );
};

export default HeroSection;
