// import React from 'react';
import './AuthBackground.css'; // Import the CSS file for styling
import BubblesRight from '../../assets/images/bubbles-right.png';
import BubblesLeft from '../../assets/images/bubbles-left.png';
import CircleLeft from '../../assets/images/circle-left.png';
import LeftContent from '../../assets/images/left-image.png';
import { useLocation } from 'react-router-dom';


const AuthBackground = ({ children }) => {
  const { pathname } = useLocation();

  let headingText = 'Discover a New Revenue Opportunity with Amazon';
  let paragraphText = 'Drive high-converting traffic with creators, influencers, and affiliate partnerships';

  if (pathname.includes('reset-password')) {
    headingText = 'Now Change Your Password in a few steps';
    paragraphText = 'Drive high-converting traffic with creators, influencers, and affiliate partnerships';

  } else if (pathname.includes('forget-password')) {
    headingText = 'Now Change Your Password in a few steps';
    paragraphText = 'Drive high-converting traffic with creators, influencers, and affiliate partnerships';

  } else if (pathname.includes('otp-verify')) {
     headingText = 'Now Change Your Password in a few steps';
    paragraphText = 'Drive high-converting traffic with creators, influencers, and affiliate partnerships';
  }

  return (
    <div className="auth-background">
      <div className="left-side">
        <img src={BubblesLeft} alt="Top Left" className="top-left-image" />
        <div className="left-content">
        <h1 className="left-heading text-white">{headingText}</h1>
        <p className="left-para text-white">{paragraphText}</p>
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