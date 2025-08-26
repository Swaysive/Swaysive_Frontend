// AppRoutes.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import OnboardRoutes from "./OnboardRoutes";
import Home from "../features/dashboard/Home";
import BrandTable from "../features/dashboard/Brands/BrandTable";
import { useAuth } from "../context/Auth";
import ProductTable from "../features/dashboard/Products/ProductTable";
import LayoutRoute from "./LayoutRoute"; // import layout wrapper
import InfluencerTable from "../features/dashboard/Influencers/InfluencerTable";
import ProductDetailsPage from "../features/dashboard/Products/ProductDetailsPage";
import InfluencerDetails from "../features/dashboard/Influencers/InfluencerDetails";
import PaymentTable from "../features/dashboard/Payments/PaymentTable";
import ReportTable from "../features/dashboard/Reports/ReportTable";
import NotFoundPage from "../pages/Not Found Page/NotFoundPage";
import Session from "../pages/Session/Session";
import BrandDetailsPage from "../features/dashboard/Brands/BrandsDetail";
import SubscriptionPLans from "../features/auth/SubscriptionPlans";
import CreateDiscountCode from "../features/dashboard/Discount Code/CreateDiscountCode";
// import { useAuth } from "../context/Auth";

import InfluencerHome from "../features/influencerDashboard/Home";
import MyProductsPage from "../features/dashboard/Influencers/MyProducts";

const AppRoutes = () => {
  const { authData, onboard, loading, step } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        {authData ? (
          <>
            {onboard ? (
              <Route element={<LayoutRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/brands" element={<BrandTable />} />
                <Route path="/brands/details/:brandId" element={<BrandDetailsPage />} />
                <Route path="/products" element={<ProductTable />} />
                <Route path="/payments" element={<PaymentTable />} />
                <Route path="/reports" element={<ReportTable />} />
                <Route
                  path="/create-discount-code"
                  element={<CreateDiscountCode />}
                />
                <Route
                  path="/products/details/:id"
                  element={<ProductDetailsPage />}
                />
                <Route path="/home" element={<Home />} />

                {/* <Route path="/plans" element={<SubscriptionPLans />} />   */}

                {/* Influencer routes */}
                <Route path="/influencers" element={<InfluencerTable />} />
                <Route
                  path="/influencers/details/:id"
                  element={<InfluencerDetails />}
                />

                <Route path="/influencer-home" element={<InfluencerHome />} />
                <Route path="/myproducts" element={<MyProductsPage />} />

                {/* Add more layout-wrapped routes here */}
              </Route>
            ) : (
              <Route path="/" element={<SubscriptionPLans />} />
            )}
          </>
        ) : (
          <Route path="/*" element={<AuthRoutes />} />
        )}

        <Route path="/session" element={<Session />} />
        <Route path="/onboard/*" element={<OnboardRoutes />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
