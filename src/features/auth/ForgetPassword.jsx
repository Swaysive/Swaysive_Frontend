import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Logo from '../../assets/icons/swaysive-logo.png';
import { GlobalStyles } from '../../styles/styles';
import { useAuth } from '../../context/Auth'; // Assuming you have an Auth context for API calls
import { toast } from 'react-toastify'; // Example toast library

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { handleForgotPassword } = useAuth(); // Assuming this function handles the API call
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const requestBody = { email };

      // Call the forget password function from context and capture response
      const response = await handleForgotPassword(requestBody);

      if (response && response.status === "success") {
        toast.success("Verification code sent to your email.");
        // Navigate to OTP verification screen
        navigate('/otp-verify', {
          state: { email, type: 'password-reset' }
        });
      } else {
        toast.error(response?.message || "Failed to send verification code.");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      const errorMessage =
        error?.response?.data?.message || 
        error?.message || 
        "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Set loading to false after the request
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={GlobalStyles.card}>
        <img src={Logo} alt="Logo" style={GlobalStyles.logo} />
        <h3 className="text-center mb-3 pb-4">Forget Password</h3>
        <p className="text-center text-secondary">
          Enter your Email Address below & We’ll send you a Verification code to change your Password
        </p>
        <form onSubmit={handleSubmit} style={GlobalStyles.customForm}>
          <div className="mb-4">
            <label style={GlobalStyles.inputLabel}>Email</label>
            <TextField
              label="Enter Your Email"
              type="email"
              name="email"
              fullWidth
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-grid mt-4">
            <Button type="submit" variant="contained" size="large" style={GlobalStyles.button} fullWidth disabled={loading}>
              {loading ? 'Sending...' : 'Continue'}
            </Button>
          </div>
        </form>
        <div className="text-center mt-3">
          <a href="/" style={GlobalStyles.customLink}>Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;