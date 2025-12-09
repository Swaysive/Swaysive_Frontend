import { useState } from 'react';
import Button from '@mui/material/Button';
import { GlobalStyles } from '../../styles/styles';
import { usersApi } from '../../api/usersApi';

const Onboard = () => {
  const [loading, setLoading] = useState(false);

  const handleOnboard = async () => {
    try {
      setLoading(true);
      const response = await usersApi.userOnboard({ step: 1 });
      console.log('Onboard response:', response);
      
      // Open the Amazon OAuth URL in a new tab
      if (response?.data?.data?.authUrl) {
        window.open(response.data.data.authUrl, '_blank');
      }
    } catch (error) {
      console.error('Onboard error:', error);
      // Handle error (e.g., show error message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={GlobalStyles.card}>
        <h4 className='fw-bold text-center mb-4'>Onboarding</h4>
        <Button 
          variant="contained" 
          size="large" 
          style={GlobalStyles.button}
          onClick={handleOnboard}
          disabled={loading}
          fullWidth
        >
          {loading ? 'Processing...' : 'Onboard'}
        </Button>
      </div>
    </div>
  );
};

export default Onboard;
