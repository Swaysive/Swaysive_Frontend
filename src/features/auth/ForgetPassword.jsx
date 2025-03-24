import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Logo from '../../assets/icons/swaysive-logo.png';
import { GlobalStyles } from '../../styles/styles';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Forget Password Email:', email);
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
            <Button type="submit" variant="contained" size="large" style={GlobalStyles.button} fullWidth>
              Continue
            </Button>
          </div>
        </form>
        <div className="text-center mt-3">
          <a href="/reset-password" style={GlobalStyles.customLink}>Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;