// import React from 'react';
import './AuthBackground.css'; // Import the CSS file for styling
import BubblesRight from '../assets/images/bubbles-right.png';
import BubblesLeft from '../assets/images/bubbles-left.png';
import CircleLeft from '../assets/images/circle-left.png';

const AuthBackground = ({ children }) => {
  return (
    <div className="auth-background">
      <div className="left-side">
        <img src={BubblesLeft} alt="Top Left" className="top-left-image" />
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