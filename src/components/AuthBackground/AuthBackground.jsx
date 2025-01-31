// import React from 'react';
import './AuthBackground.css'; // Import the CSS file for styling
import BubblesRight from '../../assets/images/bubbles-right.png';
import BubblesLeft from '../../assets/images/bubbles-left.png';
import CircleLeft from '../../assets/images/circle-left.png';
import LeftContent from '../../assets/images/left-image.png';


const AuthBackground = ({ children }) => {
  return (
    <div className="auth-background">
      <div className="left-side">
        <img src={BubblesLeft} alt="Top Left" className="top-left-image" />
        <div className="left-content">
        <h1 className="left-heading text-white">Discover a New Revenue Opportunity with Amazon</h1>
        <p className="left-para text-white">Drive high-converting traffic with creators, influencers, and affiliate partnerships</p>
        <img src={LeftContent} alt="Top Left" className="left-image" />
        </div>
        <img src={CircleLeft} alt="Bottom Left" className="bottom-left-image" />
      </div>
      <div className="form-container">
          {children}
        </div>
      <div className="right-side">
        <img src={BubblesRight} alt="Bottom Right" className="bottom-right-image" />
      </div>
    </div>
  );
};

export default AuthBackground;