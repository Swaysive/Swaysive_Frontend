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

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', formData);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={GlobalStyles.card}>
        <img src={Logo} alt="Logo" style={GlobalStyles.logo} />
        <GoogleSignInButton />
        <OrDivider/>
        <form onSubmit={handleSubmit} style={GlobalStyles.customForm}>
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
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className='mb-3 text-end'>
          <a href="/forget-password" style={GlobalStyles.forgotLink}>Forgot Password.</a>
          </div>
          <div className="d-grid">
            <Button type="submit" variant="contained" size="large" style={GlobalStyles.button} fullWidth>
              Login
            </Button>
          </div>
        </form>
        <div className="text-center mt-3">
          <p className='text-secondary'>Not registered yet? <a href="/register" style={GlobalStyles.customLink}>Create an account.</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;