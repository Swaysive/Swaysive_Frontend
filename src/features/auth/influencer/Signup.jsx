import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Logo from '../../../assets/icons/swaysive-auth-logo.svg';
import { GlobalStyles } from '../../../styles/styles';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/Auth';

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
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false); // ✅ New state for checkbox
  const { handleRegister } = useAuth();

  const [passwordRequirements, setPasswordRequirements] = useState({
    capital: false,
    small: false,
    number: false,
    special: false,
  });
  const [isTypingPassword, setIsTypingPassword] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedRole = queryParams.get('role');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, password: value });
    setIsTypingPassword(true);
    setPasswordRequirements({
      capital: /[A-Z]/.test(value),
      small: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      special: /[!@#$%^&*]/.test(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { firstName, lastName, email, phoneNumber, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
      toast.error('All fields are required.');
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (!agree) {
      toast.error('You must agree to the Terms and Privacy Policy.');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        firstName,
        lastName,
        role: selectedRole || 'ORG_ADMIN',
        email,
        phoneNumber,
        password,
        confirmPassword,
        agreedToTerms: agree, // ✅ Send to backend if needed
      };

      const response = await handleRegister(payload);

      if (response.status === 'success') {
        toast.success('Registration successful');
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
        
        <form onSubmit={handleSubmit} style={GlobalStyles.customForm}>
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

          {/* Password Field */}
          <div className="mb-3">
            <label style={GlobalStyles.inputLabel}>Password</label>
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              fullWidth
              value={formData.password}
              onChange={handlePasswordChange}
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
            {isTypingPassword && (
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

          {/* Confirm Password Field */}
          <div className="mb-3">
            <label style={GlobalStyles.inputLabel}>Confirm Password</label>
            <TextField
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              fullWidth
              value={formData.confirmPassword}
              onChange={handleChange}
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
          </div>

          {/* ✅ Terms and Privacy Checkbox */}
       <div className="mb-3">
  <FormControlLabel
    control={
      <Checkbox
        checked={agree}
        onChange={(e) => setAgree(e.target.checked)}
      />
    }
    label={
      <span
        style={{
          display: 'inline-block',
          whiteSpace: 'no-wrap', // allows wrapping
          lineHeight: '1.2',    // better readability for 2 lines
          fontSize:'12px'
        }}
      >
        I agree to <strong>Swaysive’s </strong>  Terms and Privacy Policy.
      </span>
    }
    style={{ alignItems: 'center' }} // aligns top with checkbox
  />
</div>


          <div className="d-grid">
            <Button
              type="submit"
              variant="contained"
              size="large"
              style={GlobalStyles.button}
              fullWidth
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Sign Up'}
            </Button>
          </div>
        </form>

        <div className="text-center mt-3">
          <p className="text-secondary">
            Already have an account?{' '}
            <a href="/" style={GlobalStyles.customLink}>
              Login here.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
