import { useState } from 'react';
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

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      console.log('Register Data:', formData);
      // Handle your form submission logic here
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
              onChange={handleChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-3">
            <label style={GlobalStyles.inputLabel}>Confirm Password</label>
            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              fullWidth
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
          </div>

          <div className="d-grid">
            <Button type="submit" variant="contained" size="large" style={GlobalStyles.button} fullWidth>
              Register
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
