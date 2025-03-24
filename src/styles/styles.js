// src/styles/styles.js

// import { width } from "@mui/system";

// Theme Colors
export const Colors = {
    primary: '#000000', // Primary color
    secondary: '#4E4B66', // Secondary color
    light: '#FFFFFF', // Light color
    dark: '#333333', // Dark color
    grey: '#F5F5F5', // Grey color
    black: '#000000', // Black color
  };
  
  // Global Styles
  export const GlobalStyles = {
    inputLabel: {
      fontSize: '16px',
      color: Colors.secondary,
      marginBottom: '5px',
      display: 'block',
    },
    card: {
      width: '100%',
      padding: '16px',
      backgroundColor: Colors.light,
      borderRadius: '8px',
      alignItems:'center',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      
    },
    logo: {
      // height: '90px',
      width: '200px'
    },
    customLink: {
      color: Colors.dark,
      textDecoration: 'none' /* Optional to remove underline */
    },
    customForm: {
     width:'100%'
    },
    button: {
      backgroundColor: Colors.dark,
    },
    forgotLink: {
      marginBottom:'15px',
      textAlign:'left',
      color: Colors.secondary,
      // textDecoration: 'none' /* Optional to remove underline */
    }
    // Add more global styles as needed
  };