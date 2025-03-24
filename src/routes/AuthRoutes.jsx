import { Routes, Route } from 'react-router-dom';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import AuthBackground from '../components/AuthBackground/AuthBackground';
import OTPVerification from '../features/auth/OTPVerification';
import ForgetPassword from '../features/auth/ForgetPassword';
import ResetPassword from '../features/auth/ResetPassword';

const AuthRoutes = () => {
  return (
    <AuthBackground>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp-verify" element={<OTPVerification />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </AuthBackground>
  );
};

export default AuthRoutes;
