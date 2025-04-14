import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Logo from '../../assets/icons/swaysive-logo.png';
import { GlobalStyles } from '../../styles/styles';

const passwordRequirements = [
  { label: '8 or more characters', check: (pwd) => pwd.length >= 8 },
  { label: 'At least one upper case letter', check: (pwd) => /[A-Z]/.test(pwd) },
  { label: 'At least one lower case letter', check: (pwd) => /[a-z]/.test(pwd) },
  { label: 'At least one number', check: (pwd) => /\d/.test(pwd) },
  { label: 'At least one special character', check: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) }
];

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => setPassword(e.target.value);
  const handleConfirmChange = (e) => setConfirmPassword(e.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={GlobalStyles.card}>
        <img src={Logo} alt="Logo" style={GlobalStyles.logo} />
        <h3 className="text-center">Reset Password</h3>
        <form style={GlobalStyles.customForm}>
          <div className="mb-3">
            <label style={GlobalStyles.inputLabel}>Password</label>
            <TextField
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={password}
              onChange={handleChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <ul>
            {passwordRequirements.map((req, index) => (
              <li key={index} style={{ color: req.check(password) ? 'green' : 'red' }}>
                {req.check(password) ? '✔' : '✖'} {req.label}
              </li>
            ))}
          </ul>
          <div className="mb-3">
            <label style={GlobalStyles.inputLabel}>Confirm Password</label>
            <TextField
              type={showConfirmPassword ? 'text' : 'password'}
              fullWidth
              value={confirmPassword}
              onChange={handleConfirmChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowConfirmPassword} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="d-grid">
            <Button type="submit" variant="contained" size="large" style={GlobalStyles.button} fullWidth>
              Set Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;