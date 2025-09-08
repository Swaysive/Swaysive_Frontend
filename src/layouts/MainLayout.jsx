// NavbarWithSidebar.jsx
import React from "react";
import { GrHomeRounded } from "react-icons/gr";
import { RiShoppingBag3Line } from "react-icons/ri";
// import PaymentsSvg from "../../src/assets/icons/payments.svg"
import { IoSettingsOutline } from "react-icons/io5";
import { PiVanBold } from "react-icons/pi";
import { TbUsers } from "react-icons/tb";
import { VscGraph } from "react-icons/vsc";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Divider,
  Box,
  Tooltip,
} from "@mui/material";
import {
  Search,
  FilterList,
  Notifications,
  Dashboard,
  Inventory2,
  Store,
  Groups,
  Payments,
  BarChart,
  Settings,
  Menu as MenuIcon,
  ChevronLeft,
} from "@mui/icons-material";
import SwaysiveLogo from "../assets/icons/Swaysive-Icon.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/Auth";

const drawerWidth = 300;

export default function NavbarWithSidebar({ children }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(true);
  const { handleLogout, authData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

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
      navigate("/");
    } catch (error) {
      alert("Logout failed, please try again");
    }
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const sellerMenuItems = [
    {
      text: "Dashboard",
      icon: <GrHomeRounded size={23} />,
      path: "/seller-home/dashboard",
    },
    {
      text: "Brands",
      icon: <PiVanBold size={25} />,
      path: "/seller-home/brands",
    },
    {
      text: "Products",
      icon: <RiShoppingBag3Line size={25} />,
      path: "/seller-home/products",
    },
    {
      text: "Influencer",
      icon: <TbUsers size={25} />,
      path: "/seller-home/influencer",
    },
    {
      text: "Track & Sales",
      icon: <MonetizationOnIcon size={25} />,
      path: "/seller-home/track&sales",
    },

    { text: "Payments", icon: <Payments />, path: "/seller-home/payments" },
    {
      text: "Reports",
      icon: <VscGraph size={25} />,
      path: "/seller-home/reports",
    },
    {
      text: "Settings",
      icon: <IoSettingsOutline size={25} />,
      path: "/seller-home/settings",
    },
  ];

  const influencerMenuItems = [
    {
      text: "Dashboard",
      icon: <GrHomeRounded size={23} />,
      path: "/influencer-home/dashboard",
    },
    {
      text: "Products",
      icon: <RiShoppingBag3Line size={25} />,
      path: "/influencer-home/products",
    },
    { text: "Payments", icon: <Payments />, path: "/influencer-home/payments" },
    {
      text: "Settings",
      icon: <IoSettingsOutline size={25} />,
      path: "/influencer-home/settings",
    },
  ];
  const menuItems =
    authData?.role === "Seller" ? sellerMenuItems : sellerMenuItems;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "#fff",
          color: "#000",
          padding: 2,
        }}
      >
        <Toolbar className="d-flex justify-content-between">
          <Box className="d-flex align-items-center">
            <IconButton onClick={toggleDrawer} edge="start" sx={{ mr: 2 }}>
              {open ? <ChevronLeft /> : <MenuIcon />}
            </IconButton>
            <img
              src={SwaysiveLogo}
              alt="Swaysive Logo"
              className="navbar-logo"
              style={{ height: 30 }}
            />
          </Box>

          <Box className="d-flex align-items-center">
            <Tooltip title="Search">
              <IconButton color="default">
                <Search />
              </IconButton>
            </Tooltip>
            <Tooltip title="Filter">
              <IconButton color="default">
                <FilterList />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton color="default">
                <Notifications />
              </IconButton>
            </Tooltip>
            <IconButton onClick={handleMenuOpen} className="ms-2">
              <Avatar src="/profile.jpg" alt="Profile" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={onLogout} className="text-danger">
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? "240px" : 64,
          flexShrink: 0,
          overflowX: "hidden",
          "& .MuiDrawer-paper": {
            width: open ? "240px" : 64,
            boxSizing: "border-box",
            background: "linear-gradient(90deg, #3c3c3c 0%, #0c0c0c 100%)",
            color: "#fff",
            marginTop: "64px",
          },
        }}
      >
        <Toolbar />
        <Divider />

        <List>
          {menuItems.map(({ text, icon, path }, index) => (
            <ListItem
              button
              key={text}
              onClick={() => navigate(path)}
              sx={{
                px: 2,
                bgcolor: location.pathname === path ? "white" : "transparent",
                borderRadius: 1,
                width: location.pathname === path ? "90%" : "transparent",
                mx: location.pathname === path ? 1 : "transparent",
                "&:hover": {
                  bgcolor: "#434343",
                },
                cursor: "pointer",
              }}
            >
              <ListItemIcon
                sx={{ color: location.pathname === path ? "black" : "white" }}
              >
                {icon}
              </ListItemIcon>
              {open && (
                <ListItemText
                  sx={{
                    color: location.pathname === path ? "black" : "white",
                    fontFamily: "Poppins",
                    fontSize: "24px",
                  }}
                  primary={text}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
