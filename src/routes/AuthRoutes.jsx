import { Routes, Route } from 'react-router-dom';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import AuthBackground from '../components/AuthBackground/AuthBackground';
import OTPVerification from '../features/auth/OTPVerification';
import ForgetPassword from '../features/auth/ForgetPassword';
import ResetPassword from '../features/auth/ResetPassword';
import RegisterRoles from '../features/auth/RegisterRole';
import InfluencerSignup from "../features/auth/influencer/Signup";
import SubscriptionPLans from '../features/auth/SubscriptionPlans';

const AuthRoutes = () => {
  return (
    <AuthBackground>
      <Routes>
      <Route path="/registerRoles" element={<RegisterRoles />} />
        <Route path="/" element={<Login />} />
           <Route path="/signup" element={<InfluencerSignup />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp-verify" element={<OTPVerification />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

            {/* <Route path="/plans" element={<SubscriptionPLans />} />   */}
      </Routes>
    </AuthBackground>
  );
};

export default AuthRoutes;
