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
import { v4 as uuidv4 } from 'uuid';

function App() {
  useEffect(() => {
    const installationId = localStorage.getItem('x-installation-id');
    
    if (!installationId) {
      const newInstallationId = uuidv4();
      localStorage.setItem('x-installation-id', newInstallationId);
      console.log('Installation ID generated:', newInstallationId);
    } else {
      console.log('Installation ID already exists:', installationId);
    }
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
        <ToastContainer/>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
