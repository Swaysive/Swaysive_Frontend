// import React from 'react';
import { useEffect,useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import AppRoutes from './routes/AppRoutes';

import { AuthProvider } from './context/Auth';
import { SocketProvider } from './context/SocketContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {


  return (
    <AuthProvider>
      <SocketProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRoutes />
          <ToastContainer/>
        </ThemeProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
