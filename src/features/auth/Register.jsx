import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access URL parameters
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Logo from '../../assets/icons/swaysive-logo.png';
import OrDivider from '../../components/Divider/OrDivider';
import GoogleSignInButton from '../../components/GoogleButton/GoogleSignInButton';
import { GlobalStyles } from '../../styles/styles';
import { toast } from 'react-toastify'; // Example toast library
import { useAuth } from '../../context/Auth'; // Assuming you have an Auth context for API calls

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { handleRegister } = useAuth(); // Assuming this function handles the API call

  const [passwordRequirements, setPasswordRequirements] = useState({
    capital: false,
    small: false,
    number: false,
    special: false,
  });
  const [isTypingPassword, setIsTypingPassword] = useState(false); // New state to track typing

  const location = useLocation(); // Get the current location
  const queryParams = new URLSearchParams(location.search);
  const selectedRole = queryParams.get('role'); // Extract the role from the URL parameters

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, password: value });
    setIsTypingPassword(true); // Set typing state to true
    setPasswordRequirements({
      capital: /[A-Z]/.test(value), // At least one uppercase letter
      small: /[a-z]/.test(value),   // At least one lowercase letter
      number: /[0-9]/.test(value),  // At least one number
      special: /[!@#$%^&*]/.test(value), // At least one special character
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNumber || !formData.password) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: selectedRole || 'ORG_ADMIN', // Default to ORG_ADMIN if no role is provided
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      };

      const response = await handleRegister(payload);
      if (response.status === 'success') {
        toast.success('Registration successful');
        // Handle successful registration (e.g., redirect)
      } else {
        toast.error('Registration failed, please try again.');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={GlobalStyles.card}>
        <img src={Logo} alt="Logo" style={GlobalStyles.logo} />
        <GoogleSignInButton />
        <OrDivider />
        <form onSubmit={handleSubmit} style={GlobalStyles.customForm}>
          {/* First Name and Last Name Fields */}
          <div className="d-flex mb-3">
            <div className="me-2" style={{ flex: 1 }}>
              <label style={GlobalStyles.inputLabel}>First Name</label>
              <TextField
                label="First Name"
                type="text"
                name="firstName"
                fullWidth
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={GlobalStyles.inputLabel}>Last Name</label>
              <TextField
                label="Last Name"
                type="text"
                name="lastName"
                fullWidth
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          {/* Email Field */}
          <div className="mb-3">
            <label style={GlobalStyles.inputLabel}>Email</label>
            <TextField
              label="Email"
              type="email"
              name="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone Number Field */}
          <div className="mb-3">
            <label style={GlobalStyles.inputLabel}>Phone Number</label>
            <TextField
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              fullWidth
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label style={GlobalStyles.inputLabel}>Password</label>
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              fullWidth
              value={formData.password}
              onChange={handlePasswordChange} // Use the new handler
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* Password Requirements */}
            {isTypingPassword && ( // Show requirements only if typing
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li className={passwordRequirements.capital ? 'text-success' : 'text-danger'}>
                  One uppercase letter
                </li>
                <li className={passwordRequirements.small ? 'text-success' : 'text-danger'}>
                  One lowercase letter
                </li>
                <li className={passwordRequirements.number ? 'text-success' : 'text-danger'}>
                  One number
                </li>
                <li className={passwordRequirements.special ? 'text-success' : 'text-danger'}>
                  One special character
                </li>
              </ul>
            )}
          </div>

          <div className="d-grid">
            <Button type="submit" variant="contained" size="large" style={GlobalStyles.button} fullWidth disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </div>
        </form>
        <div className="text-center mt-3">
          <p className="text-secondary">
            Already have an account?
            <a href="/login" style={GlobalStyles.customLink}>
              Login here.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;