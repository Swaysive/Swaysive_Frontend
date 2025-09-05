import React, { useState, useEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import "react-toastify/dist/ReactToastify.css";

function SettingsandAlerts() {
  const [open, setOpen] = useState(false);

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

  return (
    <Box mt={3}>
      <Box p={3} sx={{ border: "1px solid #E2E7EE", borderRadius: "6px" }}>
        <Typography
          variant="h5"
          sx={{ fontFamily: "Poppins", fontSize: "16px", fontWeight: "700" }}
        >
          Auto-Pay Settings
        </Typography>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            mt={3}
            variant="h6"
            sx={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: "400" }}
          >
            Platform Fees
          </Typography>
          <Box>
            <IOSSwitch />
          </Box>
        </Box>
        <Divider sx={{ my: 2, borderBottomWidth: 2 }} />
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            mt={3}
            variant="h6"
            sx={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: "400" }}
          >
            Influencer Payout
          </Typography>
          <Box>
            <IOSSwitch />
          </Box>
        </Box>
        <Divider sx={{ my: 2, borderBottomWidth: 2 }} />
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            mt={3}
            variant="h6"
            sx={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: "400" }}
          >
            Subscription Payment
          </Typography>
          <Box>
            <IOSSwitch />
          </Box>
        </Box>
      </Box>
      <Box
        p={3}
        mt={3}
        sx={{ border: "1px solid #E2E7EE", borderRadius: "6px" }}
      >
        <Typography
          variant="h5"
          sx={{ fontFamily: "Poppins", fontSize: "16px", fontWeight: "700" }}
        >
          Notifications
        </Typography>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            mt={3}
            variant="h6"
            sx={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: "400" }}
          >
            Email me when a payment succeeds
          </Typography>
          <Box>
            <IOSSwitch />
          </Box>
        </Box>
        <Divider sx={{ my: 2, borderBottomWidth: 2 }} />
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            mt={3}
            variant="h6"
            sx={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: "400" }}
          >
            Email me when a payment fails
          </Typography>
          <Box>
            <IOSSwitch />
          </Box>
        </Box>
        <Divider sx={{ my: 2, borderBottomWidth: 2 }} />
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            mt={3}
            variant="h6"
            sx={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: "400" }}
          >
            Email me monthly statements
          </Typography>
          <Box>
            <IOSSwitch />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SettingsandAlerts;
