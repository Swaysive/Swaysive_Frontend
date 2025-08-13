import { Routes, Route } from 'react-router-dom';
// import Login from '../features/auth/Login';
import Onboard from '../features/onboarding/Onboard';
import OnboardBackground from '../components/OnboardBackground/OnboardBackground';
import HelloHorizontal from '../pages/HelloHorizontal/HelloHorizontal';


const OnboardRoutes = () => {
  return (
    <OnboardBackground>
      <Routes>
        <Route index element={<Onboard />} />
        <Route path="hello" element={<HelloHorizontal />} />
      </Routes>
    </OnboardBackground>
  );
};

export default OnboardRoutes;
