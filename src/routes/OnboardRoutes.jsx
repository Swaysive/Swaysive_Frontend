import { Routes, Route } from 'react-router-dom';
// import Login from '../features/auth/Login';
import Onboard from '../features/onboarding/Onboard';
import Register from '../features/auth/Register';
import OnboardBackground from '../components/OnboardBackground/OnboardBackground';

const OnboardRoutes = () => {
  return (
    <OnboardBackground>
      <Routes>
        <Route path="/" element={<Onboard />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </OnboardBackground>
  );
};

export default OnboardRoutes;
