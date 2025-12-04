import {
  Box,
  Typography,
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  BsThreeDotsVertical,
  BsCheck2All,
  BsCircleFill,
  BsEmojiSmile,
} from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import React, { useState } from "react";

function ChatScreen({ messages, user }) {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    // console.log("Send:", newMessage);
    setNewMessage("");
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pr: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            pl: 3,
          }}
        >
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Box
              component="img"
              src={user?.img}
              alt="Profile"
              sx={{
                width: 45,
                height: 45,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <BsCircleFill
              style={{
                position: "absolute",
                bottom: 2,
                right: 2,
                color: user?.isActive ? "#4CAF50" : "#565656",
                fontSize: "12px",
                border: "2px solid white",
                borderRadius: "50%",
              }}
            />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                fontFamily: "Poppins",
              }}
            >
              {user?.name}
            </Typography>
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: "400",
                fontFamily: "Poppins",
              }}
            >
              {user?.isActive ? "Online" : "Offline"}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: "#F7F7F8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "0.3px solid #D3D3D3",
          }}
        >
          <BsThreeDotsVertical color="#959595" />
        </Box>
      </Box>
      <Divider sx={{ mt: 2, borderBottomWidth: "1.5px" }} />
      <Box sx={{ textAlign: "center", mt: 1 }}>
        <Typography
          sx={{
            color: "#707070",
            fontSize: "13px",
            fontWeight: "500",
          }}
        >
          Sep 13, 2025 15:45
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        {messages.map(({ id, text, time, isSender, img, isActive }) => (
          <Box
            key={id}
            sx={{
              display: "flex",
              justifyContent: isSender ? "flex-end" : "flex-start",
              mb: 2,
              alignItems: "flex-end",
              gap: isSender ? 0 : 1.5,
            }}
          >
            {!isSender && (
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <Box
                  component="img"
                  src={img}
                  alt="Profile"
                  sx={{
                    width: 25,
                    height: 25,
                    borderRadius: "50%",
                    objectFit: "contain",
                  }}
                />
                <BsCircleFill
                  style={{
                    position: "absolute",
                    bottom: -1,
                    right: 1,
                    color: user?.isActive ? "#4CAF50" : "#565656",
                    fontSize: "10px",
                    border: "2px solid white",
                    borderRadius: "50%",
                  }}
                />
              </Box>
            )}
            <Box
              sx={{
                mt: 3,
                display: "inline-block",
                maxWidth: "70%",
                bgcolor: isSender ? "#8EC6EB40" : "#E5E5E5",
                color: "black",
                p: 1.3,
                borderTopLeftRadius: isSender ? "5px" : "5px",
                borderTopRightRadius: isSender ? "0px" : "5px",
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius: "5px",
                position: "relative",
                fontFamily: "Poppins",
                mb: 1,
                "&::after": isSender
                  ? {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      right: -10,
                      width: 0,
                      height: 0,
                      borderTop: "10px solid #8EC6EB40",
                      borderRight: "10px solid transparent",
                    }
                  : {},
              }}
            >
              <Typography sx={{ fontSize: "13px", mb: 1 }}>{text}</Typography>
              <Box
                sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}
              >
                <Typography sx={{ fontSize: "10px", color: "#565656" }}>
                  {time}
                </Typography>
                <BsCheck2All size={14} color="#565656" />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          mt: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 1,
        }}
      >
        <Box>
          <BsEmojiSmile size={20} />
        </Box>
        <TextField
          fullWidth
          size="small"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write your message here..."
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              paddingRight: "8px",
              fontFamily: "Poppins",
              fontSize: "14px",
            },
          }}
          InputProps={{
            startAdornment: (
              <>
                <InputAdornment position="start">
                  <IoAdd size={20} color="black" />
                </InputAdornment>
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              </>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IoMdSend
                  size={22}
                  color="#4CAF50"
                  style={{ cursor: "pointer" }}
                  onClick={handleSend}
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}

export default ChatScreen;