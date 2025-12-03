import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { LuPencil } from "react-icons/lu";
import { IoMdLock } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { LuSave } from "react-icons/lu";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import ChangePasswordModal from "./ChangePasswordModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InfluencerSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    phoneNumber: "+1 555-123-4567",
    email: "john.doe@example.com",
    socialUrl: "https://instagram.com/johndoe",
  });

  const [backupData, setBackupData] = useState(formData);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = () => {
    setBackupData(formData);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(backupData);
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "#0A0A0A",
          opacity: 1,
          border: 0,
          ...theme.applyStyles("dark", {
            backgroundColor: "#0A0A0A",
          }),
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.grey[100],
        ...theme.applyStyles("dark", {
          color: theme.palette.grey[600],
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.7,
        ...theme.applyStyles("dark", {
          opacity: 0.3,
        }),
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: "#E9E9EA",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
      ...theme.applyStyles("dark", {
        backgroundColor: "#39393D",
      }),
    },
  }));

  const DummyNotifications = [
    {
      title: "Notify me when a new product is assigned",
      description: "Get notified when new products are available for promotion",
    },
    {
      title: "Notify me when my commission rate changes",
      description: "Stay informed about changes to your commission structure",
    },
    {
      title: "Notify me when my campaign ends",
      description: "Never miss when a campaign is completed or stopped",
    },
    {
      title: "Notify me when a payout is processed",
      description: "Receive confirmation when your earnings are processed",
    },
  ];

  // ✅ initialize switches state from localStorage OR default true
  const [switchStates, setSwitchStates] = useState(() => {
    const saved = localStorage.getItem("notificationSwitches");
    return saved ? JSON.parse(saved) : Array(DummyNotifications.length).fill(true);
  });

  // ✅ keep localStorage updated when switchStates change
  useEffect(() => {
    localStorage.setItem("notificationSwitches", JSON.stringify(switchStates));
  }, [switchStates]);

  const handleSwitchToggle = (index, checked) => {
    const updatedStates = [...switchStates];
    updatedStates[index] = checked;
    setSwitchStates(updatedStates);

    if (checked) {
      toast.success(
        <div>
          <strong style={{ color: "black", fontSize: "12px", fontWeight: "500", fontFamily: "Poppins" }}>
            Preference Updated
          </strong>
          <div style={{ fontSize: "10px", fontFamily: "Poppins", color: "#828797" }}>
            Platform update the notifications enabled
          </div>
        </div>,
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          icon: false,
        }
      );
    } else {
      toast.info(
        <div>
          <strong style={{ color: "black", fontSize: "12px", fontWeight: "500", fontFamily: "Poppins" }}>
            Preference Updated
          </strong>
          <div style={{ fontSize: "10px", fontFamily: "Poppins", color: "#828797" }}>
            Platform update the notifications disabled
          </div>
        </div>,
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          icon: false,
        }
      );
    }
  };

  const handleResetDefaults = () => {
    const resetStates = Array(DummyNotifications.length).fill(true);
    setSwitchStates(resetStates);
    localStorage.setItem("notificationSwitches", JSON.stringify(resetStates));
    toast.success(
      <div>
        <strong style={{ color: "black", fontSize: "12px", fontWeight: "500", fontFamily: "Poppins" }}>
          Preferences Reset
        </strong>
        <div style={{ fontSize: "10px", fontFamily: "Poppins", color: "#828797" }}>
          All notification preferences set to default (enabled)
        </div>
      </div>,
      {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        icon: false,
      }
    );
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(180deg, #FCFCFC 0%, #F0F7FF 100%)",
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" fontWeight={700} sx={{ fontFamily: "Poppins", fontSize: "28px" }}>
          Settings
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3} sx={{ fontFamily: "Poppins", fontSize: "14px" }}>
          Manage your account details and preferences.
        </Typography>
        <Box display="flex" gap={2} justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<IoMdLock size={20} />}
            sx={{
              backgroundColor: "#2A2A2A",
              fontFamily: "Poppins",
              fontSize: "12px",
            }}
            onClick={() => setOpen(true)}
          >
            Change Password
          </Button>
          <ChangePasswordModal open={open} handleClose={() => setOpen(false)} />
        </Box>
      </Box>

      {/* Personal Information */}
      <Box p={3} sx={{ border: "1px solid #E0E0E0", mt: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={700} sx={{ fontFamily: "Poppins", fontSize: "18px" }}>
            Personal Information
          </Typography>
          {!isEditing && (
            <Typography
              sx={{
                backgroundColor: "#EDEDED",
                px: 2,
                py: 1,
                borderRadius: "10px",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={handleEdit}
            >
              <LuPencil />
            </Typography>
          )}
          {isEditing && (
            <Box display="flex" gap={2} justifyContent="flex-end">
              <Button
                startIcon={<LuSave />}
                variant="contained"
                color="success"
                onClick={handleSave}
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  color: "white",
                  backgroundColor: "#2A2A2A",
                  px: 3,
                  py: 1.5,
                  borderRadius: "15px",
                }}
              >
                Save
              </Button>
              <Button
                startIcon={<RxCross2 />}
                variant="outlined"
                onClick={handleCancel}
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  color: "#8E1308",
                  borderColor: "#8E1308",
                  px: 3,
                  py: 1.5,
                  borderRadius: "15px",
                }}
              >
                Cancel
              </Button>
            </Box>
          )}
        </Box>

        {/* Form Fields */}
        <Box display="flex" flexDirection="column" gap={6} mt={3}>
          <Box display="flex" gap={4} width="100%">
            <Box width="50%">
              <Typography sx={{ fontFamily: "Poppins", fontWeight: 500, fontSize: "13px" }}>
                Full Name
              </Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  size="small"
                  sx={{ backgroundColor: "#FBFAFF" }}
                />
              ) : (
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: "13px",
                    color: "#151619B0",
                  }}
                >
                  {formData.fullName}
                </Typography>
              )}
            </Box>

            <Box width="50%">
              <Typography sx={{ fontFamily: "Poppins", fontWeight: 500, fontSize: "13px" }}>
                Phone Number
              </Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  size="small"
                  sx={{ backgroundColor: "#FBFAFF" }}
                />
              ) : (
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: "13px",
                    color: "#151619B0",
                  }}
                >
                  {formData.phoneNumber}
                </Typography>
              )}
            </Box>
          </Box>

          <Box display="flex" gap={4} width="100%">
            <Box width="50%">
              <Typography sx={{ fontFamily: "Poppins", fontWeight: 500, fontSize: "13px" }}>
                Email Address
              </Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  size="small"
                  sx={{ backgroundColor: "#EFF1F5" }}
                />
              ) : (
                <Typography
                  sx={{
                    width: 200,
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: "13px",
                    color: "#151619B0",
                    backgroundColor: "#EFF1F5",
                    p: 1,
                    borderRadius: 2,
                  }}
                >
                  {formData.email}
                </Typography>
              )}
            </Box>

            <Box width="50%">
              <Typography sx={{ fontFamily: "Poppins", fontWeight: 500, fontSize: "13px" }}>
                Social Profile URL
              </Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  name="socialUrl"
                  value={formData.socialUrl}
                  onChange={handleChange}
                  size="small"
                  sx={{ backgroundColor: "#FBFAFF" }}
                />
              ) : (
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: "13px",
                    color: "#151619B0",
                  }}
                >
                  {formData.socialUrl}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Notification Preferences */}
      {/* <Box p={3} sx={{ border: "1px solid #E0E0E0", mt: 3, borderRadius: 2 }}>
        <Typography sx={{ fontFamily: "Poppins", fontSize: "18px", fontWeight: "700" }}>
          Notification Preferences
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "12px",
            fontWeight: "400",
            color: "#828797",
          }}
        >
          Manage how you receive notifications about your account activity
        </Typography>

        {DummyNotifications.map((notification, index) => (
          <Box key={index} mt={3} display={"flex"} justifyContent={"space-between"}>
            <Box>
              <Typography sx={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: "400" }}>
                {notification.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "10px",
                  fontWeight: "400",
                  color: "#828797",
                }}
              >
                {notification.description}
              </Typography>
            </Box>
            <Box>
              <IOSSwitch
                checked={switchStates[index]}
                onChange={(e) => handleSwitchToggle(index, e.target.checked)}
              />
            </Box>
          </Box>
        ))}

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleResetDefaults}
            sx={{
              fontFamily: "Poppins",
              fontSize: "12px",
              color: "#828797",
              borderColor: "#E6E6E6",
              backgroundColor: "#E6E6E6",
              px: 3,
              py: 1.5,
              borderRadius: "4px",
            }}
          >
            Reset to Defaults
          </Button>
        </Box>
      </Box> */}

      <ToastContainer />
    </Box>
  );
}

export default InfluencerSettings;
