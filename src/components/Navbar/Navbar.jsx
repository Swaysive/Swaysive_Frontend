import React from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar, Typography } from "@mui/material";
import { Search, FilterList, Notifications } from "@mui/icons-material";
import SwaysiveLogo from "../../assets/icons/Swaysive-Icon.svg"
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { handleLogout, authData } = useAuth();
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onLogout = async () => {
    handleMenuClose();
    try {
        await handleLogout();
        // Navigate to the home screen or any other screen after successful login
        navigate("/"); // Replace with your desired screen
      } catch (error) {
       alert("Error", "Logout failed, please try again");
      }
  };

  return (
    <AppBar position="static" color="light" elevation={0} className="px-3">
      <Toolbar className="d-flex justify-content-between">
        {/* Logo */}
        <img src={SwaysiveLogo} alt="Swaysive Logo" className="navbar-logo" />

        {/* Icons Section */}
        <div className="d-flex align-items-center">
          <IconButton color="default">
            <Search />
          </IconButton>
          <IconButton color="default">
            <FilterList />
          </IconButton>
          <IconButton color="default">
            <Notifications />
          </IconButton>

          {/* Profile Dropdown */}
          <IconButton onClick={handleMenuOpen} className="ms-2">
            <Avatar src="/profile.jpg" alt="Profile" />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={onLogout} className="text-danger">Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
