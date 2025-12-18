// AppRoutes.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import OnboardRoutes from "./OnboardRoutes";
import Home from "../features/dashboard/Home";
import BrandTable from "../features/dashboard/Brands/BrandTable";
import { useAuth } from "../context/Auth";
import ProductTable from "../features/dashboard/Products/ProductTable";
import LayoutRoute from "./LayoutRoute";
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
import InfluencerPayments from "../features/influencerDashboard/InfluencerPayments";
import InfluencerSettings from "../features/influencerDashboard/InfluencerSettings";
import Pricing from "../components/New Pricing/Pricing";

// import { useAuth } from "../context/Auth";
import TrackandSales from "../components/Seller Track&Sales/TrackandSales";

import InfluencerHome from "../features/influencerDashboard/Home";
import MyProductsPage from "../features/dashboard/Influencers/MyProducts";
import Messages from "../features/dashboard/Messages/Messages";

const AppRoutes = () => {
  const { authData, onboard, step } = useAuth();
  const role = authData?.user?.role; // 👈 extract role safely

  return (
    <Router>
      <Routes>
        {authData ? (
          <>
            {/* ✅ Step-based routing for sellers */}
            {role === "seller" && step === 0 ? (
              <Route path="/*" element={<OnboardRoutes />} />
            ) : role === "seller" && step === 1 ? (
              <Route path="/*" element={<SubscriptionPLans />} />
            ) : (
              <Route element={<LayoutRoute />}>
                {/* ✅ Seller role routes */}
                {role === "seller" && (
                  <>
                    <Route path="/" element={<Home />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/seller-home/dashboard" element={<Home />} />
                    <Route
                      path="/seller-home/brands"
                      element={<BrandTable />}
                    />
                    <Route
                      path="/brands/details/:brandId"
                      element={<BrandDetailsPage />}
                    />
                    <Route
                      path="/seller-home/products"
                      element={<ProductTable />}
                    />
                    <Route
                      path="/seller-home/payments"
                      element={<PaymentTable />}
                    />
                    <Route
                      path="/seller-home/reports"
                      element={<ReportTable />}
                    />
                    <Route
                      path="/seller-home/trackandsales"
                      element={<TrackandSales />}
                    />
                    <Route
                      path="/create-discount-code"
                      element={<CreateDiscountCode />}
                    />
                    <Route
                      path="/products/details/:id"
                      element={<ProductDetailsPage />}
                    />
                    <Route
                      path="/seller-home/influencer"
                      element={<InfluencerTable />}
                    />
                    <Route
                      path="/seller-home/messages"
                      element={<Messages/>}
                    />
                    <Route
                      path="/seller-home/influencers/details/:id"
                      element={<InfluencerDetails />}
                    />
                  </>
                )}

                {/* ✅ Influencer role routes */}
                {role === "influencer" && (
                  <>
                    <Route path="/" element={<InfluencerHome />} />
                    <Route
                      path="/influencer-home/dashboard"
                      element={<InfluencerHome />}
                    />
                    <Route
                      path="/influencer-home/products"
                      element={<MyProductsPage />}
                    />
                    <Route
                      path="/influencer-home/payments"
                      element={<InfluencerPayments />}
                    />
                    <Route
                      path="/influencer-home/settings"
                      element={<InfluencerSettings />}
                    />
                    <Route
                      path="/influencer-home/messages"
                      element={<Messages />}
                    />
                  </>
                )}
              </Route>
            )}
          </>
        ) : (
          <Route path="/*" element={<AuthRoutes />} />
        )}

        {/* Common routes (accessible to all) */}
        <Route path="/session" element={<Session />} />
        <Route path="/onboard/*" element={<OnboardRoutes />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
