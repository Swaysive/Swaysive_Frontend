// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import OnboardRoutes from './OnboardRoutes';
import Home from '../features/website/Home';
import PrivacyPolicy from '../features/website/Privacy Policy/PrivacyPolicy';
import TermsAndConditions from '../features/website/Terms/TermsAndConditions';

const WebsiteRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        {/* Other routes can go here */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default WebsiteRoutes;
