import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { LuPencil } from "react-icons/lu";
import { IoMdLock } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { LuSave } from "react-icons/lu";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
function InfluencerSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    phoneNumber: "+1 555-123-4567",
    email: "john.doe@example.com",
    socialUrl: "https://instagram.com/johndoe",
  });
  const [backupData, setBackupData] = useState(formData);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = () => {
    setBackupData(formData); // save backup before editing
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(backupData); // restore backup
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false); // keep updated formData
  };

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
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
      title: "Notify me when my commission rate changes",
      description: "Stay informed about changes to your commission structure",
    },
  ];
  return (
    <Box>
      <Box
        sx={{
          background: "linear-gradient(180deg, #FCFCFC 0%, #F0F7FF 100%)",
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ fontFamily: "Poppins", fontSize: "28px" }}
        >
          Settings
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          mb={3}
          sx={{ fontFamily: "Poppins", fontSize: "14px" }}
        >
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
          >
            Change Password
          </Button>
        </Box>
      </Box>

      <Box p={3} sx={{ border: "1px solid #E0E0E0", mt: 3, borderRadius: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pr={5}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ fontFamily: "Poppins", fontSize: "18px" }}
          >
            Personal Information
          </Typography>
          {!isEditing && (
            <Typography
              sx={{
                backgroundColor: "#EDEDED",
                px: 2,
                py: 1,
                borderRadius: "15px",
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
                  borderColor: "#2A2A2A",
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
        <Box display="flex" flexDirection="column" gap={6} mt={3}>
          <Box display="flex" gap={4} width="100%">
            <Box width="50%">
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontSize: "13px",
                }}
              >
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
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontSize: "13px",
                }}
              >
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
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontSize: "13px",
                }}
              >
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
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontSize: "13px",
                }}
              >
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
      <Box p={3} sx={{ border: "1px solid #E0E0E0", mt: 3, borderRadius: 2 }}>
        <Typography
          sx={{ fontFamily: "Poppins", fontSize: "18px", fontWeight: "700" }}
        >
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
          <Box
            key={index}
            mt={3}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
              >
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
              <IOSSwitch />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default InfluencerSettings;
