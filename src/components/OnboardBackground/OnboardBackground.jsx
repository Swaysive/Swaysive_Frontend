// import React from 'react';
import './OnboardBackground.css'; // Import the CSS file for styling
import BubblesTop from '../../assets/images/bubbles-top.png';
import BubblesBottom from '../../assets/images/bubbles-bottom.png';
import Logo from '../../assets/icons/swaysive-logo.png';
// import LeftContent from '../../assets/images/left-image.png';


const OnboardBackground = ({ children }) => {
  return (
    <div className="auth-background">
      
      <div className="top-side">
        <img src={BubblesTop} alt="Bottom Right" className="top-right-image" />
      </div>
      <div className="form-container">
          {children}
        </div>
        <img src={Logo} alt="Swasive Logo" className="center-logo" />
        <div className="bottom-side">
        
        <img src={BubblesBottom} alt="Top Left" className="bottom-left-image" />
        {/* <div className="left-content">
        <h1 className="left-heading text-white">Discover a New Revenue Opportunity with Amazon</h1>
        <p className="left-para text-white">Drive high-converting traffic with creators, influencers, and affiliate partnerships</p>
        <img src={LeftContent} alt="Top Left" className="left-image" />
        </div> */}
      </div>
    </div>
  );
};

export default OnboardBackground;