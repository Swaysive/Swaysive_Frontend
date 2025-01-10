import { Routes, Route } from 'react-router-dom';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import AuthBackground from '../components/AuthBackground/AuthBackground';

const AuthRoutes = () => {
  return (
    <AuthBackground>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthBackground>
  );
};

export default AuthRoutes;
