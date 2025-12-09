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
import React, { useState, useEffect, useCallback } from "react";
import { useSocket, useSocketEvent } from "../../context/SocketContext";
import { fetchMessages } from "../../api/conversationsApi";
import { v4 as uuidv4 } from "uuid";

function ChatScreen({ conversation, user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { emit, isConnected } = useSocket();

  // Fetch messages when conversation changes
  useEffect(() => {
    if (!conversation?.id) return;

    const loadMessages = async () => {
      setLoading(true);
      try {
        const data = await fetchMessages(conversation.id);
        setMessages(data.messages || []);
      } catch (error) {
        console.error("Failed to load messages:", error);
        // If API fails, use empty array
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [conversation?.id]);

  // Listen for incoming messages via socket
  const handleMessageReceive = useCallback((data) => {
    if (data.conversationId === conversation?.id) {
      setMessages((prev) => [...prev, data.message]);
    }
  }, [conversation?.id]);

  useSocketEvent("message:receive", handleMessageReceive);

  // Listen for message delivery confirmations
  const handleMessageDelivered = useCallback((data) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.tempId === data.tempId || msg.id === data.messageId
          ? { ...msg, id: data.messageId, status: "delivered", deliveredAt: data.deliveredAt }
          : msg
      )
    );
  }, []);

  useSocketEvent("message:delivered", handleMessageDelivered);

  const handleSend = () => {
    if (!newMessage.trim() || !conversation?.id) return;

    const tempId = uuidv4();
    const optimisticMessage = {
      id: null,
      tempId,
      text: newMessage,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isSender: true,
      isActive: true,
      img: user?.img,
      status: "sending",
      createdAt: new Date().toISOString(),
    };

    // Optimistic UI update
    setMessages((prev) => [...prev, optimisticMessage]);
    
    // Emit socket event
    if (isConnected) {
      emit("message:send", {
        conversationId: conversation.id,
        text: newMessage,
        tempId,
      });
    } else {
      console.warn("Socket not connected. Message not sent.");
      // Update message status to failed
      setMessages((prev) =>
        prev.map((msg) =>
          msg.tempId === tempId ? { ...msg, status: "failed" } : msg
        )
      );
    }

    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!conversation) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <Typography sx={{ color: "#707070", fontFamily: "Poppins" }}>
          Select a conversation to start messaging
        </Typography>
      </Box>
    );
  }

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
          {conversation.createdAt ? new Date(conversation.createdAt).toLocaleString() : "Today"}
        </Typography>
      </Box>
      <Box sx={{ mt: 2, maxHeight: "400px", overflowY: "auto" }}>
        {loading ? (
          <Typography sx={{ textAlign: "center", color: "#707070", fontFamily: "Poppins" }}>
            Loading messages...
          </Typography>
        ) : messages.length === 0 ? (
          <Typography sx={{ textAlign: "center", color: "#707070", fontFamily: "Poppins" }}>
            No messages yet. Start the conversation!
          </Typography>
        ) : (
          messages.map(({ id, tempId, text, time, isSender, img, isActive, status }) => (
            <Box
              key={id || tempId}
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
                  opacity: status === "sending" ? 0.6 : 1,
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
                  {isSender && (
                    status === "failed" ? (
                      <Typography sx={{ fontSize: "10px", color: "red" }}>✗</Typography>
                    ) : (
                      <BsCheck2All size={14} color={status === "delivered" ? "#4CAF50" : "#565656"} />
                    )
                  )}
                </Box>
              </Box>
            </Box>
          ))
        )}
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
          onKeyPress={handleKeyPress}
          placeholder="Write your message here..."
          variant="outlined"
          disabled={!isConnected}
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
                  color={isConnected ? "#4CAF50" : "#D3D3D3"}
                  style={{ cursor: isConnected ? "pointer" : "not-allowed" }}
                  onClick={handleSend}
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {!isConnected && (
        <Typography sx={{ textAlign: "center", fontSize: "12px", color: "red", mt: 1 }}>
          Disconnected - Trying to reconnect...
        </Typography>
      )}
    </Box>
  );
}

export default ChatScreen;