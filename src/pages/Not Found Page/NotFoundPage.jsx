import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const NotFoundPage = () => {
  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center bg-white text-center">
      <h1 className="display-1 fw-bold text-black">404</h1>
      <p className="fs-4 text-black">Oops! The page you're looking for doesn't exist.</p>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button
          variant="outlined"
          style={{
            borderColor: 'black',
            color: 'black',
            textTransform: 'none',
            padding: '8px 24px',
            fontWeight: '500'
          }}
        >
          Go to Homepage
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
