import { useState,useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Logo from "../../assets/icons/swaysive-logo.png";
import { GlobalStyles, Colors } from "../../styles/styles";

const OTPVerification = () => {
  const otpLength = 6;
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if a digit is entered
      if (value && index < otpLength - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    alert(`Entered OTP: ${otp.join("")}`);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={GlobalStyles.card}>
        <img src={Logo} alt="Logo" style={GlobalStyles.logo} />
        <h2 className="text-center">Enter OTP Code</h2>
        <p className="text-center text-secondary">
          Please enter OTP Code sent to<br></br> your email johndoe@swaysive.com
        </p>
        <form
          onSubmit={handleSubmit}
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
