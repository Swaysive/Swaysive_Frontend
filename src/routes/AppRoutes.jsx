// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import OnboardRoutes from './OnboardRoutes';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/*" element={<AuthRoutes />} />
        <Route path="/onboard" element={<OnboardRoutes />} />

        {/* Other routes can go here */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
