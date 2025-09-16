import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Divider,
  Button,
} from "@mui/material";
import DashboardHeader from "../Headers/DashboardHeader";
import { IoSearch } from "react-icons/io5";
import { BsCircleFill } from "react-icons/bs";
import ProfilePic from "../../assets/icons/messageprofilepic.svg";
import ProfilePic2 from "../../assets/icons/carolinaprofilepic.svg";
import ChatScreen from "../Messages/ChatScreen";

function MessagesSidebar() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      slogan: "Always ready to chat!",
      img: ProfilePic,
      isActive: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      slogan: "Busy at work!",
      img: ProfilePic,
      isActive: false,
    },
    {
      id: 3,
      name: "Alex Carter",
      slogan: "Available now!",
      img: ProfilePic,
      isActive: true,
    },
    {
      id: 4,
      name: "Carolina",
      slogan: "I have an idea",
      img: ProfilePic2,
      isActive: false,
    },
    {
      id: 5,
      name: "Michael",
      slogan: "Let's connect soon!",
      img: ProfilePic,
      isActive: true,
    },
    {
      id: 6,
      name: "Michael",
      slogan: "Let's connect soon!",
      img: ProfilePic,
      isActive: true,
    },
    {
      id: 7,
      name: "Michael",
      slogan: "Let's connect soon!",
      img: ProfilePic,
      isActive: true,
    },
    {
      id: 8,
      name: "Michael",
      slogan: "Let's connect soon!",
      img: ProfilePic,
      isActive: true,
    },
    {
      id: 9,
      name: "Michael",
      slogan: "Let's connect soon!",
      img: ProfilePic,
      isActive: true,
    },
    {
      id: 10,
      name: "Michael",
      slogan: "Let's connect soon!",
      img: ProfilePic,
      isActive: true,
    },
    {
      id: 11,
      name: "Michael",
      slogan: "Let's connect soon!",
      img: ProfilePic,
      isActive: true,
    },
  ];
  const messages = [
    {
      id: 1,
      text: "Hi Phillip Dias this is a longer test message",
      time: "5:45 PM",
      isSender: true,
      isActive: false,
      img: ProfilePic,
    },
    {
      id: 2,
      text: "I have an idea so let me share it with you.",
      time: "5:46 PM",
      isSender: false,
      isActive: true,
      img: ProfilePic,
    },
    {
      id: 3,
      text: "Sounds great, let’s discuss further!",
      time: "5:47 PM",
      isSender: true,
      isActive: true,
      img: ProfilePic,
    },
    {
      id: 4,
      text: "Yeah sure Let's do a meeting then!",
      time: "5:47 PM",
      isSender: false,
      isActive: true,
      img: ProfilePic,
    },
  ];

  const [visibleCount, setVisibleCount] = useState(10);
  const visibleUsers = users.slice(0, visibleCount);

  return (
    <Box sx={{ marginTop: "50px", marginBottom: "50px" }}>
      <DashboardHeader
        headerText="Messages"
        bodyText="Conversations tied to campaigns will appear here for easy tracking."
      />

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        {/* Left Sidebar */}
        <Box
          sx={{
            width: "30%",
            border: "1px solid #CFCFCF",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header + Search */}
          <Box sx={{ p: 2 }}>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: "500",
                mb: 1,
              }}
            >
              Chat List
            </Typography>

            <TextField
              fullWidth
              size="small"
              placeholder="Search chats..."
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoSearch size={20} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
                fontFamily: "Poppins",
              }}
            />

            <Divider
              sx={{
                mt: 2,
                borderColor: "black",
                borderBottomWidth: "1.5px",
                width: "100%",
              }}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              maxHeight: "400px",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE + Edge
              "&::-webkit-scrollbar": {
                display: "none", // Chrome, Safari
              },
            }}
          >
            {users.map(({ id, name, slogan, img, isActive }) => (
              <Box
                key={id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  p: 1,
                  px: 3,
                  "&:hover": {
                    backgroundColor: "#76767626",
                    cursor: "pointer",
                  },
                }}
              >
                {/* Profile Picture with Active Dot */}
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <Box
                    component="img"
                    src={img}
                    alt={name}
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <BsCircleFill
                    style={{
                      position: "absolute",
                      bottom: 2,
                      right: 2,
                      color: isActive ? "#4CAF50" : "#565656",
                      fontSize: "14px",
                      border: "2px solid white",
                      borderRadius: "50%",
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    {name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "13px",
                      color: "text.secondary",
                    }}
                  >
                    {slogan}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Chat Window */}
        <Box
          sx={{
            width: "65%",
            border: "1px solid #CFCFCF",
            borderRadius: "8px",
            p: 2,
          }}
        >
          <ChatScreen messages={messages} user={users[0]} />
        </Box>
      </Box>
    </Box>
  );
}

export default MessagesSidebar;
