// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import OnboardRoutes from './OnboardRoutes';
import Home from '../features/dashboard/Home';
import { useAuth } from '../context/Auth';

const AppRoutes = () => {
   const { authData } = useAuth();
   console.log('auth',authData)
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        {authData ? (<Route path="/" element={<Home />} />):(
          <Route path="/*" element={<AuthRoutes />} />)}
        
        <Route path="/onboard" element={<OnboardRoutes />} />
        

        {/* Other routes can go here */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
