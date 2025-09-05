import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";



const ChangePasswordModal = ({ open, handleClose }) => {
  const [fields, setFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({});

  const handleCancel = () => {
    setFields({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setErrors({});
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((p) => ({ ...p, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateNewPassword = (password) => {
    return {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };
  };

  const handleSave = () => {
    let newErrors = {};
    const validations = validateNewPassword(fields.newPassword);

    if (!fields.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!fields.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (
      !(
        validations.length &&
        validations.lowercase &&
        validations.uppercase &&
        validations.number &&
        validations.special
      )
    ) {
      newErrors.newPassword = "Password does not meet all requirements";
    }

    if (!fields.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (fields.confirmPassword !== fields.newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    handleClose();
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const passwordChecks = validateNewPassword(fields.newPassword);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid #E0E3EB",
          bgcolor: "#FFFFFF",
          boxShadow: 24,
          borderRadius: "12px",
          p: 3,
          width: 534,
          maxWidth: "90vw",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "18px" }}
        >
          Change Password
        </Typography>

        <Box mt={3} display="flex" flexDirection="column" gap={2.5}>
          {/* Current Password */}
          <Typography
            sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "12px" }}
          >
            Current Password
            <TextField
              label="Enter Current Password"
              type={showPassword.currentPassword ? "text" : "password"}
              name="currentPassword"
              value={fields.currentPassword}
              onChange={handleChange}
              fullWidth
              size="small"
              error={!!errors.currentPassword}
              helperText={errors.currentPassword}
              sx={{
                mt: 1,
                backgroundColor: "#FFFF",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePassword("currentPassword")}
                      edge="end"
                    >
                      {showPassword.currentPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Typography>

          {/* New Password */}
          <Typography
            sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "12px" }}
          >
            New Password
            <TextField
              label="At least 8 characters, upper & lower case, number & symbol"
              type={showPassword.newPassword ? "text" : "password"}
              name="newPassword"
              value={fields.newPassword}
              onChange={handleChange}
              fullWidth
              size="small"
              error={!!errors.newPassword}
              helperText={errors.newPassword}
              sx={{
                mt: 1,
                backgroundColor: "#FFFF",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePassword("newPassword")}
                      edge="end"
                    >
                      {showPassword.newPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Password requirements list */}
            <Box mt={1}>
              {[
                { label: "At least 8 characters", valid: passwordChecks.length },
                { label: "One lowercase letter", valid: passwordChecks.lowercase },
                { label: "One uppercase letter", valid: passwordChecks.uppercase },
                { label: "One number", valid: passwordChecks.number },
                { label: "One special character", valid: passwordChecks.special },
              ].map((req, idx) => (
                <Box
                  key={idx}
                  display="flex"
                  gap={0.5}
                  alignItems="center"
                  sx={{ color: req.valid ? "green" : "red", fontSize: "12px", fontFamily:"Poppins" }}
                >
                  {req.valid ? (
                    <IoIosCheckmarkCircleOutline size={15}  fontSize="small" sx={{ mr: 0.5 }} />
                  ) : (
                    <IoCloseCircleOutline size={15} fontSize="small" sx={{ mr: 0.5 }} />
                  )}
                  {req.label}
                </Box>
              ))}
            </Box>
          </Typography>

          {/* Confirm New Password */}
          <Typography
            sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "12px" }}
          >
            Confirm New Password
            <TextField
              label="Re-enter your new password"
              type={showPassword.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={fields.confirmPassword}
              onChange={handleChange}
              fullWidth
              size="small"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              sx={{
                mt: 1,
                backgroundColor: "#FFFF",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePassword("confirmPassword")}
                      edge="end"
                    >
                      {showPassword.confirmPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Typography>
        </Box>

        {/* Buttons */}
        <Box mt={4} display="flex" justifyContent="center" gap={2}>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: "#2A2A2A",
              fontFamily: "Poppins",
              width: "50%",
              p: 1,
              borderRadius: "15px",
            }}
          >
            Update Password
          </Button>
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{
              fontFamily: "Poppins",
              width: "50%",
              color: "#2A2A2A",
              border: "1px solid #2A2A2A",
              p: 1,
              borderRadius: "15px",
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;
