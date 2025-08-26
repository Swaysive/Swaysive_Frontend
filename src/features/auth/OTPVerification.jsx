import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Logo from "../../assets/icons/swaysive-logo.png";
import { GlobalStyles, Colors } from "../../styles/styles";
import { useAuth } from "../../context/Auth";
import { toast } from "react-toastify"; // Make sure react-toastify is installed

const OTPVerification = () => {
  const otpLength = 6;
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const [timer, setTimer] = useState(30); // 30 seconds
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const { handleResendEmail, handleVerifyEmail, handleVerifyForgotPasswordEmail } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { email, type } = location.state || {};

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
    } else {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleChange = (index, value) => {
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if a digit is entered
      if (value && index < otpLength - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = async () => {
    if (canResend) {
      setTimer(30);
      setOtp(new Array(otpLength).fill(""));
      setCanResend(false);
      try {
        const response = await handleResendEmail({ email });
        if (response.status === 'success') {
          toast.success("A new OTP has been sent to your email.");
        } else {
          toast.error(response);
        }
      } catch (error) {
        toast.error(error.message || 'Failed to resend OTP. Please check your network.');
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const verificationCode = otp.join('');
    if (verificationCode.length !== otpLength) {
      toast.error('Please enter the complete verification code.');
      return;
    }
    try {
      let response;
      if (type === 'email-verification') {
        response = await handleVerifyEmail({ email, otp: verificationCode });
      } else {
        response = await handleVerifyForgotPasswordEmail({ email, otp: verificationCode });
      }
      if (response.status === 'success') {
        toast.success("Email verified successfully!");
        navigate('/');
        // if (type === 'email-verification') {
        //   navigate('/auth/login');
        // } else if (type === 'password-reset') {
        //   navigate('/auth/reset-password', {
        //     state: { email, otpCode: verificationCode },
        //   });
        // }
      } else {
        toast.error(response || 'Verification failed. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to verify OTP. Please check your network.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={GlobalStyles.card}>
        <img src={Logo} alt="Logo" style={GlobalStyles.logo} />
        <h2 className="text-center">Enter OTP Code</h2>
        <p className="text-center text-secondary">
          Please enter OTP Code sent to<br /> your email {email}
        </p>
        <form
          onSubmit={handleVerify}
          className="d-flex flex-column align-items-center"
        >
          <Box display="flex" justifyContent="center" gap={3} mb={3}>
            {otp.map((digit, index) => (
              <TextField
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                inputRef={(el) => (inputRefs.current[index] = el)}
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center", fontSize: "20px" },
                }}
                sx={{ width: "3.5rem" }}
              />
            ))}
          </Box>
          <div className="mb-2 text-center" style={{ width: "100%" }}>
            <span style={{ color: Colors.primary }}>
              {canResend
                ? "Didn't receive code?"
                : `Resend code in ${formatTime()}`}
            </span>
          </div>
          <div className="d-flex gap-2 w-100">
            <Button
              type="submit"
              variant="contained"
              size="large"
              style={{
                ...GlobalStyles.button,
                backgroundColor: Colors.primary,
              }}
              fullWidth
            >
              Continue
            </Button>
            <Button
              variant="outlined"
              size="large"
              style={{ borderColor: Colors.primary, color: Colors.primary }}
              fullWidth
              onClick={handleResendCode}
              disabled={!canResend}
            >
              Resend Code
            </Button>
          </div>
        </form>
        <div className="text-center mt-3">
          <p className="text-secondary">
            Not registered yet?{" "}
            <a href="/register" style={GlobalStyles.customLink}>
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
