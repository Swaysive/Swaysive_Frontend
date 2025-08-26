// import React from 'react';
import { useEffect,useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import AppRoutes from './routes/AppRoutes';

import { AuthProvider } from './context/Auth';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deviceApi } from './api/deviceApi';
import { getDeviceModel } from './utils/deviceModel';
// import { getSubdomain } from './utils/getSubdomain';

function App() {
  // const subdomain = getSubdomain();
  // console.log('subdomain',subdomain);

  useEffect(() => {
    const alreadyRegistered = localStorage.getItem('deviceRegistered');
    console.log('Device already registered:', alreadyRegistered);

    if (!alreadyRegistered) {
      const payload = {
        device_model: getDeviceModel(),
      };
      deviceApi.deviceRegister()
        .then(() => {
          console.log('Device registered');
          localStorage.setItem('deviceRegistered', 'true');
        })
        .catch((err) => {
          console.error('Device registration failed:', err);
        });
    }
  }, []);

  return (
    <AuthProvider>
    <ThemeProvider theme={theme}>
      
      <CssBaseline />
      <AppRoutes />
      <ToastContainer/>
      {/* <AppRoutes /> */}
    </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
