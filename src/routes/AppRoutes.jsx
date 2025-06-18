// AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import OnboardRoutes from './OnboardRoutes';
import Home from '../features/dashboard/Home';
import BrandTable from '../features/dashboard/Brands/BrandTable';
import { useAuth } from '../context/Auth';
import ProductTable from '../features/dashboard/Products/ProductTable';
import LayoutRoute from './LayoutRoute'; // import layout wrapper
import InfluencerTable from '../features/dashboard/Influencers/InfluencerTable';
import ProductDetailsPage from '../features/dashboard/Products/ProductDetailsPage';
import InfluencerDetails from '../features/dashboard/Influencers/InfluencerDetails';
import PaymentTable from '../features/dashboard/Payments/PaymentTable';
import ReportTable from '../features/dashboard/Reports/ReportTable';
import NotFoundPage from '../pages/Not Found Page/NotFoundPage';
import Session from '../pages/Session/Session';

const AppRoutes = () => {
  const { authData } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        {authData ? (
          <>
            {/* MainLayout wrapped routes */}
            <Route element={<LayoutRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/brands" element={<BrandTable />} />
              <Route path="/products" element={<ProductTable />} />
              <Route path="/payments" element={<PaymentTable />} />
              <Route path="/reports" element={<ReportTable />} />
              <Route path="/products/details" element={<ProductDetailsPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/influencers" element={<InfluencerTable />} />
              <Route path="/influencers/details" element={<InfluencerDetails />} />
              {/* Add more layout-wrapped routes here */}
            </Route>
          </>
          
        ) : (
        <Route path="/*" element={<AuthRoutes />} />
          
        )}

        <Route path="/session" element={<Session />} />
        <Route path="/onboard" element={<OnboardRoutes />} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
