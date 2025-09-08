import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Logo from "../../../assets/icons/swaysive-auth-logo.svg";
import { GlobalStyles } from "../../../styles/styles";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/Auth";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";

const Register = () => {
  const [formData, setFormData] = useState({
    // firstName: "",
    // lastName: "",
    email: "",
    // phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const { handleRegister } = useAuth();

  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    capital: false,
    small: false,
    number: false,
    special: false,
  });
  const [isTypingPassword, setIsTypingPassword] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedRole = queryParams.get("role");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, password: value });
    setIsTypingPassword(true);
    setPasswordRequirements({
      length: value.length >= 8,
      capital: /[A-Z]/.test(value),
      small: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      special: /[!@#$%^&*]/.test(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      // firstName,
      // lastName,
      email,
      // phoneNumber,
      password,
      confirmPassword,
    } = formData;

    if (
      // !firstName ||
      // !lastName ||
      !email ||
      // !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      toast.error("All fields are required.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords does not match.");
      setLoading(false);
      return;
    }

    if (!agree) {
      toast.error("You must agree to the Terms and Privacy Policy.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        // firstName,
        // lastName,
        role: selectedRole || "ORG_ADMIN",
        email,
        // phoneNumber,
        password,
        confirmPassword,
        agreedToTerms: agree,
      };

      const response = await handleRegister(payload);

      if (response.status === "success") {
        toast.success("Registration successful");
      } else {
        toast.error("Registration failed, please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
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
          <div className="mb-3">
            <label style={GlobalStyles.inputLabel}>Password</label>
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              fullWidth
              value={formData.password}
              onChange={handlePasswordChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {isTypingPassword && (
              <ul style={{ listStyleType: "none", padding: 0, marginTop:"15px" }}>
                <li style={{ display: "flex", alignItems: "center" }}>
                  {passwordRequirements.length ? (
                    <IoIosCheckmarkCircleOutline color="green" size={18} />
                  ) : (
                    <IoCloseCircleOutline color="red" size={18} />
                  )}
                  <span
                    style={{
                      marginLeft: "6px",
                      color: passwordRequirements.length ? "green" : "red",
                    }}
                  >
                    Password must be at least 8 characters
                  </span>
                </li>

                <li style={{ display: "flex", alignItems: "center" }}>
                  {passwordRequirements.capital ? (
                    <IoIosCheckmarkCircleOutline color="green" size={18} />
                  ) : (
                    <IoCloseCircleOutline color="red" size={18} />
                  )}
                  <span
                    style={{
                      marginLeft: "6px",
                      color: passwordRequirements.capital ? "green" : "red",
                    }}
                  >
                    Contains at least one uppercase
                  </span>
                </li>

                <li style={{ display: "flex", alignItems: "center" }}>
                  {passwordRequirements.small ? (
                    <IoIosCheckmarkCircleOutline color="green" size={18} />
                  ) : (
                    <IoCloseCircleOutline color="red" size={18} />
                  )}
                  <span
                    style={{
                      marginLeft: "6px",
                      color: passwordRequirements.small ? "green" : "red",
                    }}
                  >
                    Contains at least one lowercase
                  </span>
                </li>

                <li style={{ display: "flex", alignItems: "center" }}>
                  {passwordRequirements.number ? (
                    <IoIosCheckmarkCircleOutline color="green" size={18} />
                  ) : (
                    <IoCloseCircleOutline color="red" size={18} />
                  )}
                  <span
                    style={{
                      marginLeft: "6px",
                      color: passwordRequirements.number ? "green" : "red",
                    }}
                  >
                    Contains at least one number (0-9)
                  </span>
                </li>

                <li style={{ display: "flex", alignItems: "center" }}>
                  {passwordRequirements.special ? (
                    <IoIosCheckmarkCircleOutline color="green" size={18} />
                  ) : (
                    <IoCloseCircleOutline color="red" size={18} />
                  )}
                  <span
                    style={{
                      marginLeft: "6px",
                      color: passwordRequirements.special ? "green" : "red",
                    }}
                  >
                    Contains at least one special character (@, #, *, %, etc)
                  </span>
                </li>
              </ul>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-3">
            <label style={GlobalStyles.inputLabel}>Confirm Password</label>
            <TextField
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              fullWidth
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
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
                    display: "inline-block",
                    whiteSpace: "no-wrap",
                    lineHeight: "1.2",
                    fontSize: "12px",
                  }}
                >
                  I agree to <strong>Swaysive’s </strong> Terms and Privacy
                  Policy.
                </span>
              }
              style={{ alignItems: "center" }}
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
              {loading ? "Registering..." : "Create Account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
