// import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import AppRoutes from './routes/AppRoutes';

import { AuthProvider } from './context/Auth';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { getSubdomain } from './utils/getSubdomain';

function App() {
  // const subdomain = getSubdomain();
  // console.log('subdomain',subdomain);
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
